import axios from 'axios';
import type { AxiosInstance } from 'axios';
import type {
	IOpensearchGetAllPipelinesResponse,
	IProcessor
} from '$infrastructure/model/pipeline.model';
import {
	type IDeploymentLogs,
	type OpenSearchErrorResponse,
	type OpenSearchOperationResponse,
	type OpensearchSearchResponse
} from './types';
import type { APIResult } from '$core/axios/types';
import { env } from '$env/dynamic/private';
import { ErrorHandlerService } from '$core/errors/error-handler';

export class OpenSearchController {
	private static axiosInstance: AxiosInstance = axios.create({
		baseURL: env.OPENSEARCH_URL
	});
	private static errorHandler: ErrorHandlerService = new ErrorHandlerService();

	static async createPipeline({
		description,
		key,
		processors
	}: {
		key: string;
		description: string;
		processors: Array<IProcessor>;
	}): Promise<APIResult<OpenSearchOperationResponse | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.put<OpenSearchOperationResponse>(
				`/_ingest/pipeline/${key}`,
				{
					description,
					processors
				}
			);
			return {
				isSuccess: true,
				data: response.data,
				statusCode: response.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	static async simulatePipeline({ payload, pipelineId }: { pipelineId: string; payload: JSON }) {
		return await this.axiosInstance.post(`_ingest/pipeline/${pipelineId}/_simulate`, payload);
	}

	static async getAllPipelines(): Promise<
		APIResult<IOpensearchGetAllPipelinesResponse | OpenSearchErrorResponse>
	> {
		try {
			const pipelines =
				await this.axiosInstance.get<IOpensearchGetAllPipelinesResponse>('/_ingest/pipeline');

			return {
				isSuccess: true,
				data: pipelines.data,
				statusCode: pipelines.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	static async getPipelineById(
		id: string
	): Promise<APIResult<IOpensearchGetAllPipelinesResponse | OpenSearchErrorResponse>> {
		try {
			const pipeline = await this.axiosInstance.get<IOpensearchGetAllPipelinesResponse>(
				`/_ingest/pipeline/${id}`
			);

			return {
				isSuccess: true,
				data: pipeline.data,
				statusCode: pipeline.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	static async createDeploymentHistoryIndex({ indexName }: { indexName: string }) {
		try {
			const deploymentsHistoryIndex = await this.axiosInstance.put(`/${indexName}`, {
				settings: {
					number_of_shards: 1,
					number_of_replicas: 0
				},
				mappings: {
					properties: {
						pipeline_id: { type: 'keyword' },
						ingest_pipeline: { type: 'object' },
						timestamp: { type: 'date' },
						deployment_status: { type: 'keyword' },
						is_rollback: { type: 'boolean' }
					}
				}
			});
			return {
				isSuccess: true,
				data: deploymentsHistoryIndex.data,
				statusCode: deploymentsHistoryIndex.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	static async insertDeploxymentRecord({
		indexName,
		pipelineId,
		ingestPipeline,
		deploymentStatus,
		isRollback
	}: {
		indexName: string;
		pipelineId: string;
		ingestPipeline: { description: string; processors: Array<IProcessor> };
		deploymentStatus: string;
		isRollback: boolean;
	}) {
		try {
			const response = await this.axiosInstance.post(`/${indexName}/_doc?refresh=wait_for`, {
				pipeline_id: pipelineId,
				ingest_pipeline: ingestPipeline,
				is_rollback: isRollback,
				timestamp: new Date().toISOString(),
				deployment_status: deploymentStatus
			});
			return {
				isSuccess: true,
				data: response.data,
				statusCode: response.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	static async getDeploymentsLogs({ index }: { index: string }) {
		try {
			const response = await this.axiosInstance.get<OpensearchSearchResponse<IDeploymentLogs>>(
				`/ingesta-${index}-deployment-logs/_search`,
				{
					data: {
						sort: [
							{
								timestamp: {
									order: 'desc'
								}
							}
						],

						query: { match_all: {} }
					}
				}
			);

			return {
				isSuccess: true,
				data: response.data,
				statusCode: response.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}
}

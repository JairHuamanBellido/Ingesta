import axios, { AxiosError } from 'axios';
import type { AxiosInstance } from 'axios';
import https from 'node:https';
import type { IProcessor } from '$infrastructure/model/pipeline.model';
import type { OpenSearchErrorResponse, OpenSearchOperationResponse } from './types';
import type { APIResult } from '$core/axios/types';
import {   OPENSEARCH_PASSWORD, OPENSEARCH_URL,OPENSEARCH_USERNAME } from '$env/static/private';

export class OpenSearchController {
	private static axiosInstance: AxiosInstance = axios.create({
		baseURL: OPENSEARCH_URL,
		auth: {
			username: OPENSEARCH_USERNAME || '',
			password: OPENSEARCH_PASSWORD || ''
		},
		httpsAgent: new https.Agent({
			rejectUnauthorized: false
		})
	});

	private static handleError(error: unknown): APIResult<OpenSearchErrorResponse> {
		if (error instanceof AxiosError) {
			const openSearchError: AxiosError<OpenSearchErrorResponse> = error;
			return {
				isSuccess: false,
				data: {
					error: {
						reason: openSearchError.response?.data.error.reason ?? '',
						type: openSearchError.response?.data.error.type ?? '',
						processor_type: openSearchError.response?.data.error.processor_type ?? '',
						property_name: openSearchError.response?.data.error.property_name ?? '',
						root_cause: openSearchError.response?.data.error.root_cause ?? []
					}
				},
				statusCode: openSearchError.response?.status || 500
			};
		}
		return {
			isSuccess: false,
			data: {
				error: {
					reason: error as string,
					type: 'Internal Server Error',
					property_name: 'create_pipeline',
					root_cause: []
				}
			},
			statusCode: 500
		};
	}

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
			return this.handleError(error);
		}
	}

	static async simulatePipeline({ payload, pipelineId }: { pipelineId: string; payload: JSON }) {
		return await this.axiosInstance.post(`_ingest/pipeline/${pipelineId}/_simulate`, payload);
	}
}

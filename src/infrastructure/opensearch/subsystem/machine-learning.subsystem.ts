import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { env } from '$env/dynamic/private';
import type { OpenSearchErrorResponse, OpensearchSearchResponse } from '../types';
import type {
	MachineLearningConnectorCreateResponse,
	MachineLearningConnectorOpensearch,
	MachineLearningConnectorRegisterResponse,
	MachineLearningDeployModelResponse,
	MachineLearningModelGroupCreateResponse,
	MachineLearningModelGroupOpensearch
} from '../types/machine-learning.types';
import { ErrorHandlerService } from '$core/errors/error-handler';
import type { APIResult } from '$core/axios/types';
import type { MLConnectorPayload } from '$domain/machine-learning/ml-connectors/ml-connectors.interface';

/**
 * Facade Design Pattern
 *
 * This class provides a simplified interface to interact with OpenSearch Machine Learning subsystem.
 * It encapsulates complex operations and provides easy-to-use methods for ML-related tasks.
 */
export class MachineLearningSubsystem {
	private axiosInstance: AxiosInstance = axios.create({
		baseURL: env.OPENSEARCH_URL
	});

	private errorHandler: ErrorHandlerService = new ErrorHandlerService();

	async getMLConnectors(
		from: number = 0,
		size: number = 10
	): Promise<
		APIResult<
			OpensearchSearchResponse<MachineLearningConnectorOpensearch> | OpenSearchErrorResponse
		>
	> {
		try {
			const response = await this.axiosInstance.post<
				OpensearchSearchResponse<MachineLearningConnectorOpensearch>
			>('/_plugins/_ml/connectors/_search', {
				query: {
					match_all: {}
				},
				from,
				size
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

	async createMlConnector(
		payload: MLConnectorPayload
	): Promise<APIResult<MachineLearningConnectorCreateResponse | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.post('/_plugins/_ml/connectors/_create', payload);
			return {
				isSuccess: true,
				data: response.data,
				statusCode: response.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	async registerModelConnector({
		name,
		description,
		connector_id,
		model_group_id
	}: {
		name: string;
		description?: string;
		connector_id: string;
		model_group_id?: string;
	}): Promise<APIResult<MachineLearningConnectorRegisterResponse | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.post<MachineLearningConnectorRegisterResponse>(
				'/_plugins/_ml/models/_register',
				{
					name,
					description,
					function_name: 'remote',
					connector_id,
					model_group_id
				}
			);

			console.log('resposne	', response.data);
			return {
				isSuccess: true,
				data: response.data,
				statusCode: response.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}

	async deployModel(
		modelId: string
	): Promise<APIResult<MachineLearningDeployModelResponse | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.post<MachineLearningDeployModelResponse>(
				`/_plugins/_ml/models/${modelId}/_deploy`,
				{}
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

	async predictModel(
		modelId: string,
		payload: JSON
	): Promise<APIResult<any | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.post(
				`/_plugins/_ml/models/${modelId}/_predict`,
				payload
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

	async getAllModelGroups(
		from: number = 0,
		size: number = 10
	): Promise<
		APIResult<
			OpensearchSearchResponse<MachineLearningModelGroupOpensearch> | OpenSearchErrorResponse
		>
	> {
		try {
			const response = await this.axiosInstance.post<
				OpensearchSearchResponse<MachineLearningModelGroupOpensearch>
			>('/_plugins/_ml/model_groups/_search', {
				query: {
					match_all: {}
				},
				from,
				size
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

	async createModelGroup({
		name,
		description
	}: {
		name: string;
		description?: string;
	}): Promise<APIResult<MachineLearningModelGroupCreateResponse | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.post<MachineLearningModelGroupCreateResponse>(
				'/_plugins/_ml/model_groups/_register',
				{
					name,
					description
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

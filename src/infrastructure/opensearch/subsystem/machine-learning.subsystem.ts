import axios from 'axios';
import type { AxiosInstance } from 'axios';
import { env } from '$env/dynamic/private';
import type { OpenSearchErrorResponse, OpensearchSearchResponse } from '../types';
import type {
	MachineLearningConnectorOpensearch,
	MachineLearningModelGroupOpensearch
} from '../types/machine-learning.types';
import { ErrorHandlerService } from '$core/errors/error-handler';
import type { APIResult } from '$core/axios/types';

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
}

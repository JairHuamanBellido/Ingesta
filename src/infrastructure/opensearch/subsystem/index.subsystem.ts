import axios, { type AxiosInstance } from 'axios';
import { env } from '$env/dynamic/private';
import { ErrorHandlerService } from '$core/errors/error-handler';
import type { APIResult } from '$core/axios/types';
import type { OpenSearchErrorResponse } from '../types';
export class IndexSubsystem {
	private axiosInstance: AxiosInstance = axios.create({
		baseURL: env.OPENSEARCH_URL
	});

	private errorHandler: ErrorHandlerService = new ErrorHandlerService();

	async isIndexExist(indexName: string): Promise<APIResult<void | OpenSearchErrorResponse>> {
		try {
			const response = await this.axiosInstance.head(`${indexName}`);

			return {
				data: undefined,
				isSuccess: response.status === 200,
				statusCode: response.status
			};
		} catch (error) {
			return this.errorHandler.handleError(error);
		}
	}
}

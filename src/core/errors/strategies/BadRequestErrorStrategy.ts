import { AxiosError } from 'axios';
import type { ErrorStrategy } from '../error-strategy';
import type { OpenSearchErrorResponse } from '$infrastructure/opensearch/types';
import type { APIResult } from '$core/axios/types';

export class BadRequestErrorStrategy implements ErrorStrategy {
	canHanddle(error: unknown): boolean {
		if (!(error instanceof AxiosError && 'isAxiosError' in error)) return false;

		const axiosError = error.toJSON() as AxiosError;
		return axiosError.code === 'ERR_BAD_REQUEST';
	}
	handle(error: AxiosError): APIResult<OpenSearchErrorResponse> {
		const axiosError = error as AxiosError<OpenSearchErrorResponse>;
		return {
			isSuccess: false,
			data: {
				error: {
					reason: axiosError.response?.data.error.reason ?? '',
					type: axiosError.response?.data.error.type ?? '',
					processor_type: axiosError.response?.data.error.processor_type ?? '',
					property_name: axiosError.response?.data.error.property_name ?? '',
					root_cause: axiosError.response?.data.error.root_cause ?? []
				}
			},
			statusCode: axiosError.response?.status || 500
		};
	}
}

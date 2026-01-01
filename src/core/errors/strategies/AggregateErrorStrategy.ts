import { AxiosError } from 'axios';
import type { ErrorStrategy } from '../error-strategy';
import type { APIResult } from '$core/axios/types';
import type { OpenSearchErrorResponse } from '$infrastructure/opensearch/types';

export class AggregateErrorStrategy implements ErrorStrategy {
	canHanddle(error: unknown): boolean {
		if (!(error instanceof AxiosError && 'isAxiosError' in error)) return false;

		const axiosError = error.toJSON() as AxiosError;
		return axiosError.name === 'AggregateError';
	}

	handle(error: AxiosError): APIResult<OpenSearchErrorResponse> {
		const axiosError = error.toJSON() as AxiosError;

		return {
			isSuccess: false,
			data: {
				error: {
					code: axiosError.code,
					description: 'Multiple connection attempts failed',
					reason: 'Connection refused',
					type: axiosError.name,
					processor_type: '',
					property_name: '',
					root_cause: []
				}
			},
			statusCode: 500
		};
	}
}

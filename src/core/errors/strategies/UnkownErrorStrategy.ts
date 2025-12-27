import type { APIResult } from '$core/axios/types';
import type { OpenSearchErrorResponse } from '$infrastructure/opensearch/types';
import type { ErrorStrategy } from '../error-strategy';

export class UnknownErrorStrategy implements ErrorStrategy {
	canHanddle(error: unknown): boolean {
		return true;
	}

	handle(error: unknown): APIResult<OpenSearchErrorResponse> {
		const errorMessage = error instanceof Error ? error.message : String(error);

		return {
			isSuccess: false,
			statusCode: 500,
			data: {
				error: {
					reason: errorMessage || 'An unexpected error occurred',
					type: 'Internal Server Error',
					processor_type: '',
					property_name: '',
					root_cause: []
				}
			}
		};
	}
}

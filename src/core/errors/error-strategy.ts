import type { APIResult } from '$core/axios/types';
import type { OpenSearchErrorResponse } from '$infrastructure/opensearch/types';

export interface ErrorContext {
	operation?: string;
}

export interface ErrorStrategy {
	canHanddle(error: unknown): boolean;
	handle(error: unknown): APIResult<OpenSearchErrorResponse>;
}

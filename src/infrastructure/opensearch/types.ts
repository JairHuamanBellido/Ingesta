/**
 * OpenSearch Error Details
 */
export interface OpenSearchErrorDetail {
	root_cause: Array<{
		type: string;
		reason: string;
	}>;
	type: string;
	reason: string;
	processor_type?: string;
	property_name?: string;
	[key: string]: any; // Allow additional error properties
}

/**
 * OpenSearch Error Response
 */
export interface OpenSearchErrorResponse {
	error: OpenSearchErrorDetail;
}

/**
 * OpenSearch Operation Response
 */
export interface OpenSearchOperationResponse {
	acknowledged: boolean;
}


/**
 * Opensearch Simulate Response
 */
export interface OpenSearchSimulateResponse {
	docs: Array<{
		doc: any;
	}>;
}
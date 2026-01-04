import type { IProcessor } from '$infrastructure/model/pipeline.model';

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

export interface IDeploymentLogs {
	pipeline_id: string;
	ingest_pipeline: {
		description?: string;
		processors: Array<IProcessor>;
	};
	deployment_status: string;
	is_rollback: boolean;
	timestamp: Date;
}

/**
 * Opensearch Search Response
 */

export interface OpensearchSearchResponse<T> {
	hits: {
		total: {
			value: number;
		};
		hits: Array<{
			_id: string;
			_source: T;
		}>;
	};
}

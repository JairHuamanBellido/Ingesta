import type { IPipeline } from '$infrastructure/model/pipeline.model';
import { OpenSearchController } from '$infrastructure/opensearch';

const openSearchController = new OpenSearchController();
export const createPipeline = async (payload: IPipeline) => {
	try {
		const openSearchResponse = await openSearchController.ingest_pipeline.createPipeline({
			key: payload.key,
			description: payload.description ?? '',
			processors: payload.processors
		});

		if (payload.deployment_logs_index_name) {
			const response =
				await openSearchController.ingest_pipeline.createDeploymentHistoryIndex({
					indexName: payload.deployment_logs_index_name
				});

			if (!response.isSuccess) {
				return { success: false, error: response.data };
			}
		}

		if (!openSearchResponse.isSuccess) {
			return { success: false, error: openSearchResponse.data };
		}

		return { success: true, data: payload };
	} catch (error) {
		return { success: false, error };
	}
};

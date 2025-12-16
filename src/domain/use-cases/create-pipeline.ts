import type { IPipeline } from '$infrastructure/model/pipeline.model';
import { OpenSearchController } from '$infrastructure/opensearch';

export const createPipeline = async (payload: IPipeline) => {
	try {
		const openSearchResponse = await OpenSearchController.createPipeline({
			key: payload.key,
			description: payload.description ?? '',
			processors: payload.processors
		});

		return { success: true, data: payload };
	} catch (error) {
		return { success: false, error };
	}
};

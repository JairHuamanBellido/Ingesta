import type { IPipeline } from '$infrastructure/model/pipeline.model';
import { db } from '$infrastructure/dexie/db';

export const updatePipeline = async (pipelineId: string, payload: IPipeline) => {
	try {
		const updatedPipeline = await db.pipelines.update(pipelineId, {
			description: payload.description,
			name: payload.name,
			processors: payload.processors,
			tests: payload.tests,
			edges: payload.edges,
			nodes: payload.nodes,
			key: payload.key,
			simulation_input_payload: payload.simulation_input_payload,
			deployment_logs_index_name: payload.deployment_logs_index_name
		});
		if (!updatedPipeline) {
			return { success: false, error: 'Pipeline not found' };
		}
		return { success: true, data: updatedPipeline };
	} catch (error) {
		console.error('Error updating pipeline:', error);
		return { success: false, error };
	}
};

import type { Edge, Node } from '@xyflow/svelte';
import { db } from '$infrastructure/dexie/db';
import type { IProcessor } from '$infrastructure/model/pipeline.model';

export const saveNodesAndEdgesAndProcessors = async ({
	edges,
	nodes,
	pipelineId,
	processors,
	simulation_input_payload
}: {
	pipelineId: string;
	nodes: Array<Node>;
	edges: Array<Edge>;
	processors: Array<IProcessor>;
	simulation_input_payload: string;
}) => {
	const findPipeline = await db.pipelines.get(pipelineId);

	if (!findPipeline) {
		throw new Error('Pipeline not found');
	}

	const updatePipeline = await db.pipelines.update(pipelineId, {
		nodes,
		edges,
		processors,
		simulation_input_payload
	});

	return updatePipeline;
};

import { db } from '$infrastructure/dexie/db';

export const getPipelineById = async (pipelineId: string) => {
	const pipeline = await db.pipelines.get(pipelineId);

	pipeline?.tests.sort((a, b) => +b.timestamp - +a.timestamp);
	return pipeline;
};

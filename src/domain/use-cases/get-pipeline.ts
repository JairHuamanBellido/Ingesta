import { db } from '$infrastructure/dexie/db';

export const getPipelineById = async (pipelineId: string) => {
	return await db.pipelines.get(pipelineId);
};

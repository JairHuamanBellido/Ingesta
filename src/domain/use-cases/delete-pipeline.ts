import { db } from '$infrastructure/dexie/db';

export const deletePipeline = async (pipelineId: string) => {
	try {
		await db.pipelines.delete(pipelineId);
		return { success: true };
	} catch (error) {
		console.error('Error deleting pipeline:', error);
		return { success: false, error };
	}
};

import { db } from "$infrastructure/dexie/db";

export const getAllPipelines = async () => {
	return await db.pipelines.toArray();
};

import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const opensearchController = new OpenSearchController();

export async function GET() {
	const modelGroups = await opensearchController.machine_learning.getAllModelGroups();
	return json(modelGroups.data, {
		status: modelGroups.statusCode || 200
	});
}

import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const opensearchController = new OpenSearchController();

export async function GET() {
	const modelGroups = await opensearchController.machine_learning.getAllModelGroups();
	return json(modelGroups.data, {
		status: modelGroups.statusCode || 200
	});
}

export async function POST({ request }) {
	const { name, description } = await request.json();
	const modelGroup = await opensearchController.machine_learning.createModelGroup({
		name,
		description
	});
	return json(modelGroup.data, {
		status: modelGroup.statusCode || 500
	});
}

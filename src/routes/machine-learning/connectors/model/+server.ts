import { OpenSearchController } from '$infrastructure/opensearch/index.js';
import { json } from '@sveltejs/kit';

const opensearchController = new OpenSearchController();
export async function POST({ request }) {
	const { name, description, model_group_id, connector_id } = await request.json();

	const response = await opensearchController.machine_learning.registerModelConnector({
		connector_id,
		name,
		description,
		model_group_id
	});

	return json(response.data, {
		status: response.statusCode || 500
	});
}

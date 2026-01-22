import { json } from '@sveltejs/kit';
import { OpenSearchController } from '$infrastructure/opensearch/index.js';

const opensearchController = new OpenSearchController();

export async function POST({ request }) {
	const { model_id } = await request.json();

	const response = await opensearchController.machine_learning.deployModel(model_id);
	return json(response.data, {
		status: response.statusCode || 500
	});
}

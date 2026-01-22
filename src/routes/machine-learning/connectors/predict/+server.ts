import { OpenSearchController } from '$infrastructure/opensearch/index.js';
import { json } from '@sveltejs/kit';

const openssearchController = new OpenSearchController();

export async function POST({ request }) {
	const body = await request.json();
	const modelId = body.modelId;
	const payload = body.payload;
	const response = await openssearchController.machine_learning.predictModel(modelId, payload);
	return json(response.data, {
		status: response.statusCode || 500
	});
}

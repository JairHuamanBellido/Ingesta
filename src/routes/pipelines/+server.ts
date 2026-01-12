import { OpenSearchController } from '$infrastructure/opensearch/index.js';
import { json } from '@sveltejs/kit';

export async function POST({ request }) {
	const payload = await request.json();
	const response = await OpenSearchController.createPipeline(payload);

	return json(response, {
		status: response.statusCode || 500
	});
}

export async function GET() {
	const response = await OpenSearchController.getAllPipelines();

	return json(response.data, {
		status: response.statusCode || 500
	});
}
import { OpenSearchController } from '$infrastructure/opensearch/index.js';
import { json } from '@sveltejs/kit';

const openSearchController = new OpenSearchController();
export async function POST({ request }) {
	const payload = await request.json();
	const response = await openSearchController.ingest_pipeline.createPipeline(payload);

	return json(response, {
		status: response.statusCode || 500
	});
}

export async function GET() {
	const response = await openSearchController.ingest_pipeline.getAllPipelines();

	return json(response.data, {
		status: response.statusCode || 500
	});
}

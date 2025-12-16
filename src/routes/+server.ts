import { json } from '@sveltejs/kit';
import { OpenSearchController } from '../infrastructure/opensearch';

export async function POST({ request }) {
	const payload = await request.json();
	const response = await OpenSearchController.createPipeline(payload);

	return json(response, {
		status: response.statusCode || 500
	});
}

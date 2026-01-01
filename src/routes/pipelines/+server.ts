import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

export async function GET() {
	const response = await OpenSearchController.getAllPipelines();

	return json(response.data, {
		status: response.statusCode || 500
	});
}

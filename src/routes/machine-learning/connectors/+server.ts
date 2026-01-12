import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const opensearchController = new OpenSearchController();

export async function GET() {
	const connectors = await opensearchController.machine_learning.getMLConnectors();
	return json(connectors.data, {
		status: connectors.statusCode || 500
	});
}
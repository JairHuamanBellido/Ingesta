import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const openSearchController = new OpenSearchController();

export async function PUT({ request }: { request: Request }) {
	const body = await request.json();

	const pipelineKey = body.pipelineKey;

	const indexExist = await openSearchController.index.isIndexExist(
		`ingesta-${pipelineKey}-deployment-logs`
	);

	if (indexExist.isSuccess) {
		return json(indexExist.data, {
			status: indexExist.statusCode || 500
		});
	}
	const deploymentIndex = await openSearchController.ingest_pipeline.createDeploymentHistoryIndex({
		indexName: `ingesta-${pipelineKey}-deployment-logs`
	});

	return json(deploymentIndex.data, {
		status: deploymentIndex.statusCode || 500
	});
}

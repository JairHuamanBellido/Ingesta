import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const openSearchController = new OpenSearchController();
export async function GET({ params }: { params: { slug: string } }) {
	const deploymentLogs = await openSearchController.ingest_pipeline.getDeploymentsLogs({ index: params.slug });
	return json(deploymentLogs.data, {
		status: deploymentLogs.statusCode || 500
	});
}

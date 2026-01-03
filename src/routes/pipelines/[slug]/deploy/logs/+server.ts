import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

export async function GET({ params }: { params: { slug: string } }) {
	const deploymentLogs = await OpenSearchController.getDeploymentsLogs({ index: params.slug });
	return json(deploymentLogs.data, {
		status: deploymentLogs.statusCode || 200
	});
}

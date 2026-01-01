import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

export async function GET({ params }: { params: { slug: string } }) {
	const pipeline = await OpenSearchController.getPipelineById(params.slug);
	return json(pipeline.data, {
		status: pipeline.statusCode || 500
	});
}

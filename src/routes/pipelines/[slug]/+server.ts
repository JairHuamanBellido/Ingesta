import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const openSearchController = new OpenSearchController();
export async function GET({ params }: { params: { slug: string } }) {
	const pipeline = await openSearchController.ingest_pipeline.getPipelineById(params.slug);
	return json(pipeline.data, {
		status: pipeline.statusCode || 500
	});
}

export async function DELETE({ params }: { params: { slug: string } }) {
	const pipeline = await openSearchController.ingest_pipeline.deletePipeline({
		pipelineId: params.slug
	});
	return json(pipeline.data, {
		status: pipeline.statusCode || 500
	});
}

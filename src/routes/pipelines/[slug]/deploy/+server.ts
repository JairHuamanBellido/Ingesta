import type { IProcessor } from '$infrastructure/model/pipeline.model';
import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

export async function POST({ request }: { request: Request }) {
	const body = (await request.json()) as {
		deploy_index_name: string;
		pipeline_id: string;
		deployment_status: string;
		ingest_pipeline: { description: string; processors: Array<IProcessor> };
		is_rollback: boolean;
	};

	const { deploy_index_name, pipeline_id, deployment_status, ingest_pipeline, is_rollback } = body;

	const new_doc = await OpenSearchController.insertDeploxymentRecord({
		indexName: `ingesta-${deploy_index_name}-deployment-logs`,
		pipelineId: pipeline_id,
		ingestPipeline: ingest_pipeline,
		deploymentStatus: deployment_status,
		isRollback: is_rollback
	});

	return json(new_doc.data, { status: new_doc.statusCode || 500 });
}

import { createPipeline } from '../domain/use-cases/create-pipeline';
import type { Actions } from './$types';
import { redirect } from '@sveltejs/kit';

export const actions = {
	createPipeline: async (event) => {
		const data = await event.request.formData();

		const pipelineId = data.get('pipelineId') as string;
		const description = data.get('description') as string;
		const name = data.get('name') as string;

		const createPipelineResponse = await createPipeline({
			edges: [],
			nodes: [],
			key: pipelineId,
			description,
			processors: [],
			name,
			tests: []
		});

		if (createPipelineResponse.success) {
			redirect(302, `/pipelines/${pipelineId}`);
		}
	}
} satisfies Actions;

import { fail } from '@sveltejs/kit';
import { AxiosError } from 'axios';
import { OpenSearchController } from '../../../infrastructure/opensearch';

export const actions = {
	simulate: async (event) => {
		try {
			const data = await event.request.formData();
			const payload = data.get('request-payload') as string;
			const pipelineId = data.get('pipelineId') as string;

			const request_start_at = Date.now();
			const simulateResponse = await OpenSearchController.simulatePipeline({
				payload: JSON.parse(payload),
				pipelineId
			});

			const request_end_at = Date.now();
			const request_duration = request_end_at - request_start_at;
			const openSearchResponse = simulateResponse.data;
			if (!!simulateResponse.data.docs[0]['error']) {
				return fail(400, { error: openSearchResponse, request_duration });
			}

			const statusCode = simulateResponse.status;

			return { statusCode, openSearchResponse, request_duration, isSuccess: true };
		} catch (error) {
			if (error instanceof AxiosError) {
				return fail(error.response?.status ?? 500, { error: error.response?.data.error.reason });
			}
			return fail(500, { error });
		}
	}
};

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MLConnectorBuilder } from '..';
import { OpenAIEmbeddingModel } from '../connectors/openai-ml-connector';

describe('Ml Connector builder', () => {
	beforeEach(() => {
		vi.restoreAllMocks();
	});

	it('should create an OpenAI Connector', () => {
		// Act
		const OPENAIConnector = new MLConnectorBuilder().selectProvider('openai').build({
			credential: {
				api_key: 'apikey'
			},
			description: 'ml connector description',
			name: 'ml connector name',
			parameters: {
				model: OpenAIEmbeddingModel.TEXT_EMBEDDING_ADA_002
			},
			protocol: 'http',
			version: '1.0'
		});

		// Assert
		expect(OPENAIConnector).toBeDefined();
		expect(OPENAIConnector).toEqual({
			name: 'ml connector name',
			description: 'ml connector description',
			version: '1.0',
			protocol: 'http',
			parameters: {
				model: OpenAIEmbeddingModel.TEXT_EMBEDDING_ADA_002
			},
			credential: {
				api_key: 'apikey'
			},
			actions: [
				{
					action_type: 'predict',
					method: 'POST',
					url: 'https://api.openai.com/v1/embeddings',
					headers: {
						Authorization: 'Bearer ${credential.api_key}'
					},
					request_body: '{ "input": ${parameters.input}, "model": "${parameters.model}" }'
				}
			]
		});
	});
});

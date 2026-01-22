import type { MLConnectorPayload, MLConnectorStrategy } from '../ml-connectors.interface';

export enum OpenAIEmbeddingModel {
	TEXT_EMBEDDING_ADA_002 = 'text-embedding-ada-002',
	TEXT_EMBEDDING_3_SMALL = 'text-embedding-3-small',
	TEXT_EMBEDDING_3_LARGE = 'text-embedding-3-large'
}

/**
 * Design Pattern: Strategy
 */
export class OpenAIMLConnector implements MLConnectorStrategy {
	build(payload: MLConnectorPayload): MLConnectorPayload {
		return {
			name: payload.name,
			description: payload.description,
			version: payload.version,
			protocol: payload.protocol,
			parameters: payload.parameters,
			credential: payload.credential,
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
		};
	}
}

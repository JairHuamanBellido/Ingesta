import { OpenAIEmbeddingModel } from './connectors/openai-ml-connector';

export const ML_CONNECTOR_OPTIONS = [
	{
		provider: 'openai',
		model: OpenAIEmbeddingModel.TEXT_EMBEDDING_ADA_002
	},
	{
		provider: 'openai',
		model: OpenAIEmbeddingModel.TEXT_EMBEDDING_3_SMALL
	},
	{
		provider: 'openai',
		model: OpenAIEmbeddingModel.TEXT_EMBEDDING_3_LARGE
	}
] as const;

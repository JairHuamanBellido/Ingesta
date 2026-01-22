/**
 * Design Pattern: Strategy
 */

import type { MLConnectorPayload, MLConnectorStrategy } from './ml-connectors.interface';
import { OpenAIMLConnector } from './connectors/openai-ml-connector';

class MLConnectorsFactory {
	private static strategies: Map<string, () => MLConnectorStrategy> = new Map([
		['openai', () => new OpenAIMLConnector()]
	]);

	static createStrategy(provider: string): MLConnectorStrategy {
		const creator = this.strategies.get(provider);
		if (!creator) {
			throw new Error(`Strategy not found for provider: ${provider}`);
		}
		return creator();
	}
}

export class MLConnectorBuilder {
	private strategy?: MLConnectorStrategy;

	selectProvider(provider: string): this {
		this.strategy = MLConnectorsFactory.createStrategy(provider);
		return this;
	}

	build(payload: Omit<MLConnectorPayload, 'actions'>) {
		return this.strategy?.build(payload);
	}
}

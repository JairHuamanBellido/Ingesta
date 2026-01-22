import { MLConnectorBuilder } from '$domain/machine-learning/ml-connectors';
import { ML_CONNECTOR_OPTIONS } from '$domain/machine-learning/ml-connectors/ml-connector-list.js';
import { OpenSearchController } from '$infrastructure/opensearch';
import { json } from '@sveltejs/kit';

const opensearchController = new OpenSearchController();

export async function GET() {
	const connectors = await opensearchController.machine_learning.getMLConnectors();
	return json(connectors.data, {
		status: connectors.statusCode || 500
	});
}

export async function POST({ request }) {
	const { name, description, version, model, api_key } = await request.json();

	const provider = ML_CONNECTOR_OPTIONS.find((connector) => connector.model === model)?.provider;
	if (!provider) {
		return json({ error: 'Provider not found' }, { status: 404 });
	}

	const mlConnectorBuilder = new MLConnectorBuilder();
	const mlConnectorPayload = mlConnectorBuilder.selectProvider(provider).build({
		name,
		description,
		credential: {
			api_key
		},
		parameters: {
			model
		},
		protocol: 'http',
		version
	});
	if (!mlConnectorPayload) {
		return json({ error: 'ML connector payload not found' }, { status: 404 });
	}

	const response =
		await opensearchController.machine_learning.createMlConnector(mlConnectorPayload);

	return json(response.data, {
		status: response.statusCode || 500
	});
}

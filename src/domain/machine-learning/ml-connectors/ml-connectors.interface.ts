export interface MLConnectorAction {
	action_type: string;
	method: string;
	url: string;
	headers: Record<string, any>;
	request_body: string;
}
export interface MLConnectorPayload {
	name: string;
	description: string;
	version: string;
	protocol: string;
	parameters: Record<string, any>;
	credential: Record<string, any>;
	actions: MLConnectorAction[];
}

export interface MLConnectorStrategy {
	build(payload: Omit<MLConnectorPayload, 'actions'>): MLConnectorPayload;
}

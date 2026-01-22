export interface MachineLearningConnectorOpensearch {
	protocol: string;
	last_update_time: number;
	name: string;
	description: string;
	version: string;
	parameters: {
		model: string;
	};
}

export interface MachineLearningModelGroupOpensearch {
	access: string;
	latest_version: number;
	name: string;
	description: string;
	created_time: number;
	last_updated_time: number;
}

export interface MachineLearningModelGroupCreateResponse {
	model_group_id: string;
	status: string;
}

export interface MachineLearningConnectorCreateResponse {
	connector_id: string;
}

export interface MachineLearningConnectorRegisterResponse {
	model_id: string;
	status: string;
	task_id: string;
}

export interface MachineLearningDeployModelResponse {
	task_id: string;
	task_type: string;
	status: string;
}

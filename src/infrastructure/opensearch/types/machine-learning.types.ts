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
}

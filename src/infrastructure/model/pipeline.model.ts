import type { Node, Edge } from '@xyflow/svelte';

export interface IPipeline {
	key: string;
	name: string;
	description?: string;
	nodes: Array<Node>;
	edges: Array<Edge>;
	processors: Array<IProcessor>;
	tests: Array<ITest>;
}

export interface IProcessor {
	[key: string]: { [key: string]: string | boolean } | IProcessor;
}

export interface ITest {
	id: string;
	input_payload: JSON;
	result_payload: JSON;
	timestamp: Date;
	status_code: number;
	request_duration: number;
}

export interface IOpensearchGetAllPipelinesResponse {
	[key: string]: {
		description?: string;
		processors: Array<IProcessor>;
	};
}

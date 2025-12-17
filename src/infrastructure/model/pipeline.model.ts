import type { Node, Edge } from '@xyflow/svelte';

export interface IPipeline {
	key: string;
	name: string;
	description?: string;
	nodes: Array<Node>;
	edges: Array<Edge>;
	processors: Array<IProcessor>;
	tests: Array<ITests>;
}

export interface IProcessor {
	[key: string]: { [key: string]: string | boolean };
}

export interface ITests {
	id: string;
	payload: JSON;
	result: JSON;
	timestamp: Date;
	status_code: number;
}

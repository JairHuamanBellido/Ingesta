import type { ConditionalNodeData, ProcessorsNodeData } from '$core/processors/node.type';
import type { IPipeline, IProcessor } from '$infrastructure/model/pipeline.model';
import { nodeStore } from '@/stores/nodeStore';
import type { Node, Edge } from '@xyflow/svelte';
import { getOutgoers } from '@xyflow/svelte';

export class PipelineBuilder {
	public pipeline: Pick<IPipeline, 'description' | 'processors'>;
	private nodes: Array<Node>;
	private edges: Array<Edge>;

	private nodesConnected: Node[];
	constructor(description: string, nodes: Array<Node>, edges: Array<Edge>) {
		this.pipeline = {
			description,
			processors: []
		};
		this.edges = edges;
		this.nodes = nodes;
		this.nodesConnected = getOutgoers({ id: 'nodestart', type: 'source' }, nodes, edges);
	}

	private addProcessor(node: Node): IProcessor {
		const nodeKey = node.data.key as string;

		const sourcesNodes = getOutgoers({ id: `${node.id}`, type: 'source' }, this.nodes, this.edges);

		const getConditionalNode = sourcesNodes.find(
			(n) => n.type === 'nodeConditional'
		) as Node<ConditionalNodeData>;
		const getOnFailureNode = sourcesNodes.filter(
			(n) => n.type !== 'nodeConditional'
		) as Node<ProcessorsNodeData>[];

		const ifField = (node.data as ProcessorsNodeData).fields.find((f) => f.key === 'if');

		const payload = (node.data as ProcessorsNodeData).fields.reduce(
			(
				acc: {
					[key: string]: string | boolean | string[] | IProcessor[];
				},
				{ key, value, required }
			) => {
				const isAStringValue = typeof value === 'string';
				const isAnArrayAndFirstValueIsNotEmpty = Array.isArray(value) && value[0];
				const isObjectNotEmpty =
					typeof value === 'object' && value !== null && Object.keys(value).length > 0;
				const isBooleanValue = typeof value === 'boolean';
				if (
					(isAStringValue && value) ||
					isAnArrayAndFirstValueIsNotEmpty ||
					isObjectNotEmpty ||
					isBooleanValue
				) {
					if (key === 'pattern_definitions' || key === 'params') {
						acc[key] = Object.fromEntries(
							(value as { key: string; value: string }[]).map((v) => {
								if (v.key && v.value) {
									return [v.key, v.value];
								}
								return [];
							})
						);
					} else {
						if (Array.isArray(value) && value.every((v) => typeof v === 'string')) {
							acc[key] = value.filter(Boolean);
						} else {
							acc[key] = value as string;
						}
					}
				} else if (required) {
					nodeStore.update((nodes) => ({
						...nodes,
						[node.id]: { ...nodes[node.id], [key]: { hasError: true } }
					}));
				}
				return acc;
			},
			{}
		);

		if (ifField && getConditionalNode?.data?.condition) {
			payload['if'] = getConditionalNode?.data.condition;
		}

		payload.on_failure = [];

		getOnFailureNode.forEach((onFailureNode) => {
			if (Array.isArray(payload.on_failure)) {
				const failureNode = this.addProcessor(onFailureNode);
				(payload.on_failure as IProcessor[]).push(failureNode);
			}
		});

		if (Array.isArray(payload.on_failure) && payload.on_failure.length === 0) {
			delete payload.on_failure;
		}

		return { [nodeKey]: payload };
	}

	public build() {
		this.nodesConnected.forEach((node) => {
			const result = this.addProcessor(node);

			this.pipeline.processors.push(result);
		});
	}
}

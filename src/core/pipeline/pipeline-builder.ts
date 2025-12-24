import type { IPipeline } from '$infrastructure/model/pipeline.model';
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

	private addProcessor(node: Node) {
		const nodeKey = node.data.key as string;

		const sourcesNodes = getOutgoers({ id: `${node.id}`, type: 'source' }, this.nodes, this.edges);

		const getConditionalNode = sourcesNodes.find((n) => n.type === 'nodeConditional');
		const getOnFailureNode = sourcesNodes.filter((n) => n.type !== 'nodeConditional');

		const ifField = (node.data as any).fields.find((f: any) => f.key === 'if');

		const payload = (node.data as any).fields.reduce((acc: any, { key, value, required }: any) => {
			const isAStringValue = typeof value === 'string';
			const isAnArrayAndFirstValueIsNotEmpty = Array.isArray(value) && value[0];

			if ((isAStringValue && value) || isAnArrayAndFirstValueIsNotEmpty) {
				if (key === 'pattern_definitions') {
					acc[key] = Object.fromEntries(
						(value as string[]).map((v: any) => {
							if (v.field && v.regex) {
								return [v.field, v.regex];
							}
							return [];
						})
					);
				} else {
					if (Array.isArray(value)) {
						acc[key] = value.filter(Boolean);
					} else {
						acc[key] = value;
					}
				}
			} else if (required) {
				nodeStore.update((nodes) => ({
					...nodes,
					[node.id]: { ...nodes[node.id], [key]: { hasError: true } }
				}));
			}
			return acc;
		}, {});

		if (ifField && getConditionalNode?.data?.condition) {
			payload.if = getConditionalNode?.data?.condition;
		}

		payload.on_failure = [];
		getOnFailureNode.forEach((onFailureNode) => {
			payload.on_failure.push(this.addProcessor(onFailureNode));
		});

		if (payload.on_failure.length === 0) {
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

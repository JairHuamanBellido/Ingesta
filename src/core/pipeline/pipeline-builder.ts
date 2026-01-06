import type {
	ConditionalNodeData,
	ProcessorsNodeData,
	ProcessorValue
} from '$core/processors/node.type';
import type { IPipeline, IProcessor } from '$infrastructure/model/pipeline.model';
import { nodeStore } from '@/stores/nodeStore';
import type { Node, Edge } from '@xyflow/svelte';
import { getOutgoers } from '@xyflow/svelte';

type ProcessorPayload = Record<string, ProcessorValue>;
const GROK_PROCESSOR_PATTERN_DEFINTIONS_KEY = 'pattern_definitions';
const SCRIPT_PROCESSOR_PARAMS_KEY = 'params';

class ProcessorPayloadBuilder {
	private payload: ProcessorPayload = {};

	constructor(
		private readonly node: Node<ProcessorsNodeData>,
		private readonly conditionalNode?: Node<ConditionalNodeData>
	) {}

	build() {
		this.addFields();
		this.addCondition();
		return this.payload;
	}
	private addFields() {
		for (const field of this.node.data.fields) {
			// console.log("field.key",field.key);
			const value = this.normalizeValue(field.key, field.value);
			if (value !== undefined) {
				this.payload[field.key] = value;
			} else if (field.required) {
				this.markFieldAsError(field.key);
			}
		}
	}

	private markFieldAsError(key: string) {
		nodeStore.update((nodes) => ({
			...nodes,
			[this.node.id]: {
				...nodes[this.node.id],
				[key]: { hasError: true }
			}
		}));
	}

	private normalizeValue(key: string, value: ProcessorValue) {
		if (typeof value === 'string') {
			return value;
		}

		if (typeof value === 'boolean') {
			return value;
		}

		if (Array.isArray(value)) {
			if (key === GROK_PROCESSOR_PATTERN_DEFINTIONS_KEY || key === SCRIPT_PROCESSOR_PARAMS_KEY) {
				return Object.fromEntries(
					(value as { key: string; value: string }[]).map((v) => [v.key, v.value])
				);
			}
			const isStringsArray = value.every((v) => typeof v === 'string');
			if (isStringsArray) {
				return value.filter(Boolean);
			}
		}

		if (typeof value === 'object' && value && Object.keys(value).length > 0) {
			return value;
		}
		return undefined;
	}

	private addCondition() {
		if (this.conditionalNode?.data?.condition) {
			this.payload['if'] = this.conditionalNode?.data.condition;
		}
	}
}

export class ProcessorFactory {
	constructor(
		private readonly nodes: Node[],
		private readonly edges: Edge[]
	) {}

	create(node: Node<ProcessorsNodeData>): IProcessor {
		const outgoers = getOutgoers(node, this.nodes, this.edges);
		const conditionalNode = outgoers.find((n) => n.type === 'nodeConditional') as
			| Node<ConditionalNodeData>
			| undefined;

		const onFailureNodes = outgoers.filter(
			(n) => n.type !== 'nodeConditional'
		) as Node<ProcessorsNodeData>[];

		const payloadBuilder = new ProcessorPayloadBuilder(node, conditionalNode);

		const payload = payloadBuilder.build();

		const failures = onFailureNodes.map((n) => this.create(n));

		if (failures.length) {
			payload.on_failure = failures;
		}

		return { [node.data.key]: payload };
	}
}

export class PipelineBuilder {
	private readonly pipeline: Pick<IPipeline, 'description' | 'processors'>;
	private readonly processorsFactory: ProcessorFactory;
	private readonly entryNodes: Node[];

	constructor(description: string, nodes: Node[], edges: Edge[]) {
		this.pipeline = {
			description,
			processors: []
		};
		this.processorsFactory = new ProcessorFactory(nodes, edges);
		this.entryNodes = getOutgoers({ id: 'nodestart', type: 'source' }, nodes, edges);
	}

	build(): IPipeline['processors'] {
		for (const node of this.entryNodes) {
			this.pipeline.processors.push(
				this.processorsFactory.create(node as Node<ProcessorsNodeData>)
			);
		}
		return this.pipeline.processors;
	}
}

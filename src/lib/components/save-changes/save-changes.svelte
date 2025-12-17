<script lang="ts">
	import { useSvelteFlow, getOutgoers, type Node } from '@xyflow/svelte';
	import axios from 'axios';
	import type { IPipeline, IProcessor } from '$infrastructure/model/pipeline.model';
	import type { ConditionalNodeData } from '$core/processors/node.type';
	import { saveNodesAndEdgesAndProcessors } from '$domain/use-cases/save-nodes-and-edges';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { nodeStore } from '@/stores/nodeStore';

	const { getNodes, getEdges } = useSvelteFlow();

	let { pipeline }: { pipeline: IPipeline } = $props();
	let nodeStoreData = $derived($nodeStore);
	const onClick = async () => {
		try {
			nodeStore.clear();
			const nodesConnected = getOutgoers(
				{ id: 'nodestart', type: 'source' },
				getNodes(),
				getEdges()
			);
			const processors: IProcessor[] = [];
			nodesConnected.forEach((node) => {
				const nodeKey = node.data.key as string;

				// get conditional node
				const conditionalNode = getOutgoers(
					{ id: `${node.id}`, type: 'source' },
					getNodes(),
					getEdges()
				).find((n) => n.type === 'nodeConditional') as Node<ConditionalNodeData>;

				// get if field
				const ifField = (node.data as any).fields.find((f: any) => f.key === 'if');

				if (ifField) {
					ifField.value = conditionalNode?.data?.condition || undefined;
				}

				// sanitize processor fields or parameters
				const objected = (node.data as any).fields.reduce(
					(acc: any, { key, value, required }: any) => {
						if (value) acc[key] = value;
						else if (required) {
							nodeStore.update((nodes) => ({
								...nodes,
								[node.id]: { ...nodes[node.id], [key]: { hasError: true } }
							}));
						}
						return acc;
					},
					{}
				);

				processors.push({
					[nodeKey]: objected
				});
			});

			if (Object.keys(nodeStoreData).length > 0) {
				toast.error('Please fill all required fields');
				return;
			}

			await saveNodesAndEdgesAndProcessors({
				edges: getEdges(),
				nodes: getNodes(),
				pipelineId: pipeline.key,
				processors
			});

			await axios('/', {
				method: 'POST',
				data: {
					key: pipeline.key,
					description: pipeline.description,
					processors
				}
			});

			toast.success('Saved successfully');
		} catch (error) {
			toast.error('Something went wrong');
		}
	};
</script>

<Button onclick={onClick}>Save</Button>

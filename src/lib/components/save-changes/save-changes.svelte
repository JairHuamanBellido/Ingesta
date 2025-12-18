<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import axios from 'axios';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import { saveNodesAndEdgesAndProcessors } from '$domain/use-cases/save-nodes-and-edges';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { nodeStore } from '@/stores/nodeStore';
	import { PipelineBuilder } from '$core/pipeline/pipeline-builder';

	const { getNodes, getEdges } = useSvelteFlow();

	let { pipeline }: { pipeline: IPipeline } = $props();
	let nodeStoreData = $derived($nodeStore);
	const onClick = async () => {
		try {
			nodeStore.clear();
			const pipelineBuilder = new PipelineBuilder(
				pipeline.description || '',
				getNodes(),
				getEdges()
			);
			pipelineBuilder.build();
			if (Object.keys(nodeStoreData).length > 0) {
				toast.error('Please fill all required fields');
				return;
			}

			await saveNodesAndEdgesAndProcessors({
				edges: getEdges(),
				nodes: getNodes(),
				pipelineId: pipeline.key,
				processors: pipelineBuilder.pipeline.processors
			});

			await axios('/', {
				method: 'POST',
				data: {
					key: pipeline.key,
					description: pipeline.description,
					processors: pipelineBuilder.pipeline.processors
				}
			});

			toast.success('Saved successfully');
		} catch (error) {
			toast.error('Something went wrong');
		}
	};
</script>

<Button onclick={onClick}>Save</Button>

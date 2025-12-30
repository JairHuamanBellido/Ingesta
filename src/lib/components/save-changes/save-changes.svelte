<script lang="ts">
	import { useSvelteFlow } from '@xyflow/svelte';
	import axios, { AxiosError } from 'axios';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import { saveNodesAndEdgesAndProcessors } from '$domain/use-cases/save-nodes-and-edges';
	import Button from '$lib/components/ui/button/button.svelte';
	import { toast } from 'svelte-sonner';
	import { nodeStore } from '@/stores/nodeStore';
	import { PipelineBuilder } from '$core/pipeline/pipeline-builder';
	import ErrorToast from '../custom-toast/error-toast.svelte';
	import { hasUnsavedChanges } from '@/stores/dirty';

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
				processors: pipelineBuilder.pipeline.processors,
				simulation_input_payload: pipeline.simulation_input_payload
			});

			await axios('/', {
				method: 'POST',
				data: {
					key: pipeline.key,
					description: pipeline.description,
					processors: pipelineBuilder.pipeline.processors
				}
			});
			$hasUnsavedChanges = false;

			toast.success('Saved successfully');
		} catch (error) {
			if (error instanceof AxiosError) {
				const rootCause = error.response?.data?.data?.error.root_cause?.[0];

				toast(ErrorToast, {
					style: 'padding: 0px; border:none; position:relative; width: fit-content !important;',
					componentProps: {
						title: `[${rootCause.processor_type.toUpperCase()}] ${rootCause?.type}`,
						description: `${rootCause?.reason}`,
						code: error.code ?? ''
					},
					closeButton: true
				});
			} else {
				toast.error('Something went wrong');
			}
		}
	};
</script>

<Button onclick={onClick}>Save</Button>

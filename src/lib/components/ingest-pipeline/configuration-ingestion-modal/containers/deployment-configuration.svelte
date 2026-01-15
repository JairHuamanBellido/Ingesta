<script lang="ts">
	import { updatePipeline } from '$domain/use-cases/update-pipeline';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import Button from '@/components/ui/button/button.svelte';
	import Switch from '@/components/ui/switch/switch.svelte';
	import { delay } from '@/utils';
	import axios from 'axios';
	import SpinnerGap from 'phosphor-svelte/lib/SpinnerGap';
	import { toast } from 'svelte-sonner';

	let { pipeline }: { pipeline: IPipeline } = $props();

	let isEnableDeploymentLogs = $derived<boolean>(
		pipeline.deployment_logs_index_name ? true : false
	);
	let loading = $state(false);

	const onSave = async () => {
		loading = true;
		try {
			await delay(1500);
			if (!isEnableDeploymentLogs) {
				await updatePipeline(pipeline.key, {
					...pipeline,
					deployment_logs_index_name: undefined
				});
			} else {
				await updatePipeline(pipeline.key, {
					...pipeline,
					deployment_logs_index_name: `ingesta-${pipeline.key}-deployment-logs`
				});

				await axios.put(`/pipelines/${pipeline.key}/deploy`, {
					pipelineKey: pipeline.key
				});
			}
			toast.success('Configuration saved successfully');
		} catch (error) {
			console.error(error);
			toast.error('Failed to save configuration');
		} finally {
			loading = false;
		}
	};
</script>

<div class="overflow-auto flex flex-col h-full justify-between">
	<div>
		<h3 class="font-semibold text-2xl">Deployment</h3>
		<div class="flex justify-between items-center space-y-2 mt-4">
			<div>
				<p class="text-foreground font-medium">Deployment logs</p>
				<p class="text-sm text-muted-foreground">Record deployment history to the index.</p>
			</div>
			<Switch bind:checked={isEnableDeploymentLogs} />
		</div>
	</div>
	<div class="flex justify-end">
		<Button onclick={onSave} disabled={loading}>
			{#if loading}
				<SpinnerGap class="animate-spin" size={16} />
				<span>Saving...</span>
			{:else}
				<span>Save</span>
			{/if}
		</Button>
	</div>
</div>

<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog';
	import Button from '@/components/ui/button/button.svelte';
	import Trash from 'phosphor-svelte/lib/Trash';
	import SpinnerGap from 'phosphor-svelte/lib/SpinnerGap';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
	import { deletePipeline } from '$domain/use-cases/delete-pipeline';
	import { delay } from '@/utils';

	let { pipelineKey }: { pipelineKey: string } = $props();
	let isOpen= $state(false)
	let loading = $state(false);
	const onDeletePipeline = async () => {
		try {
			loading = true;

			await delay(1500)
			const opensearch_response = await axios.delete(`/pipelines/${pipelineKey}`);
			if (opensearch_response.status !== 200) {
				toast.error('Failed to delete pipeline');
				return;
			}

			await deletePipeline(pipelineKey);
			isOpen = false
			toast.success('Pipeline deleted successfully');
		} catch (error) {
			console.error(error);
			toast.error('Something went wrong while deleting the pipeline');
		} finally {
			loading = false;
		}
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="space-x-2 flex items-center">
		<Trash class="dark:text-red-300 text-red-600" size={16} />
		<span> Delete</span>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Delete Pipeline</Dialog.Title>
			<Dialog.Description>Are you sure you want to delete this pipeline?</Dialog.Description>
		</Dialog.Header>

		<div
			class="border p-4 rounded bg-red-200/40 text-red-700/80 dark:bg-red-500/10 dark:border-red-500/20 dark:text-red-400 text-sm"
		>
			<p class="text-foreground">You are about to permanently delete the pipeline</p>
			<p class="font-semibold font-mono">{pipelineKey}</p>

			<ul class="mt-3 space-y-1.5 text-foreground text-sm">
				<li class="flex items-center gap-2">
					<span class="text-lg dark:text-red-400 text-red-600 ">•</span>
					<span>Pipeline will be permanently removed from OpenSearch</span>
				</li>
				<li class="flex items-center gap-2">
					<span class="text-lg dark:text-red-400 text-red-600 ">•</span>
					<span>All pipeline records will be deleted from local database</span>
				</li>
			</ul>
		</div>
		<Dialog.Footer>
			<Button disabled={loading} variant="ghost" onclick={() => (isOpen = false)}>Cancel</Button>
			<Button disabled={loading} variant="destructive" onclick={onDeletePipeline}>
				{#if loading}
					<SpinnerGap class="animate-spin" size={16} />
					<span>Deleting...</span>
				{:else}
					<span>Delete</span>
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

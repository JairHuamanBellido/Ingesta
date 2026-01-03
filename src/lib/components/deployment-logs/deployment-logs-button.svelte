<script lang="ts">
	import axios from 'axios';
	import { toast } from 'svelte-sonner';
	import {
		type IDeploymentLogs,
		type OpensearchSearchResponse
	} from '$infrastructure/opensearch/types';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import Button from '../ui/button/button.svelte';
	import { formatDate } from '@/utils';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import * as Accordion from '$shadcn-components/accordion/index.js';
	import JsonView from '../json-viewer/json-view.svelte';
	import ClockCounterClockwise from 'phosphor-svelte/lib/ClockCounterClockwise';
	import SpinnerGap from 'phosphor-svelte/lib/SpinnerGap';

	let pipeline: { key: string } = $props();
	let isOpen = $state(true);
	let loading = $state(false);
	let deploymentLogs = $state<OpensearchSearchResponse<IDeploymentLogs>>({
		hits: { hits: [], total: { value: 0 } }
	});

	async function fetchDeploymentLogs() {
		const res = await axios.get(`/pipelines/${pipeline.key}/deploy/logs`);
		deploymentLogs = res.data;
	}
	$effect(() => {
		if (isOpen) {
			fetchDeploymentLogs();
		}
	});

	const rollback = async (log: IDeploymentLogs) => {
		try {
			loading = true;
			await axios.post(`/pipelines/${pipeline.key}/deploy`, {
				pipeline_id: log.pipeline_id,
				ingest_pipeline: log.ingest_pipeline,
				deployment_status: 'rollback',
				is_rollback: true,
				deploy_index_name: pipeline.key
			});

			await axios.post('/', {
				key: log.pipeline_id,
				description: log.ingest_pipeline.description,
				processors: log.ingest_pipeline.processors
			});
			await fetchDeploymentLogs();
			toast.success('Pipeline rolled back successfully');
		} catch (error) {
			console.log(error);
		} finally {
			loading = false;
		}
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger>
		<Button variant="outline">View Logs</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-[600px]! max-h-[90dvh] w-full overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Deployment History ({deploymentLogs.hits.total.value})</Dialog.Title>
			<Dialog.Description
				>View the deployment history and logs for your pipelines</Dialog.Description
			>
		</Dialog.Header>
		<div class="mt-4">
			{#if deploymentLogs.hits.hits.length === 0}
				<p>No deployment logs found.</p>
			{:else}
				<Accordion.Root type="single" class="space-y-4">
					{#each deploymentLogs.hits.hits as log, index}
						<Accordion.Item value={log._id} class="bg-card p-4  space-x-2 rounded-lg border ">
							<div class="space-y-2 text-sm w-full">
								<div class="flex justify-between items-center">
									<div class="flex space-x-2">
										<CheckCircle size={24} class="text-green-500" />
										<div class="flex flex-col -mt-1">
											<div class="flex items-center space-x-2">
												<p class="font-semibold text-lg">
													{log._source.pipeline_id}
												</p>

												{#if index === 0}
													<span
														class="bg-primary text-primary-foreground text-xs px-2 font-semibold py-0.5 rounded"
														>Current</span
													>
												{/if}
												{#if log._source.deployment_status === 'rollback'}
													<div
														class="bg-purple-600 text-white text-xs px-2 font-semibold py-0.5 rounded flex items-center space-x-1"
													>
														<ClockCounterClockwise size={12} class="shrink-0" />
														<span class="shrink-0">Rollback</span>
													</div>
												{/if}
											</div>

											<p class=" text-base text-muted-foreground">
												{formatDate(new Date(log._source.timestamp))}
											</p>
										</div>
									</div>
									{#if index !== 0}
										<div class="flex justify-end -mt-2">
											<Button
												onclick={() => rollback(log._source)}
												variant="ghost"
												class="text-sm h-fit! p-2"
												disabled={loading}
											>
												{#if loading}
													<SpinnerGap size={16} class="animate-spin" />
													<span>Loading...</span>
												{:else}
													<ClockCounterClockwise size={16} class="shrink-0" />
													<span>Rollback</span>
												{/if}
											</Button>
										</div>
									{/if}
								</div>
								<p>{log._source.ingest_pipeline.processors.length} processors(s)</p>

								<Accordion.Trigger class="py-2 pb-0">Details</Accordion.Trigger>
								<Accordion.Content class="mt-4 space-y-2 border-t pt-4">
									<p>PIPELINE CONFIGURATION</p>
									<JsonView json={JSON.parse(JSON.stringify(log._source.ingest_pipeline))} />
								</Accordion.Content>
							</div></Accordion.Item
						>
					{/each}
				</Accordion.Root>
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>

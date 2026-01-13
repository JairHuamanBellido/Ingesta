<script lang="ts">
	import { toast } from 'svelte-sonner';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import Pencil from 'phosphor-svelte/lib/Pencil';
	import { Checkbox } from '$shadcn-components/checkbox/index.js';
	import { Input } from '$shadcn-components/input/index.js';
	import { Label } from '$shadcn-components/label/index.js';
	import { Button } from '$shadcn-components/button/index.js';
	import Info from 'phosphor-svelte/lib/Info';
	import { updatePipeline } from '$domain/use-cases/update-pipeline';
	import { delay } from '@/utils';

	let { pipeline }: { pipeline: IPipeline } = $props();

	let isOpen = $state(false);
	let name = $derived(pipeline.name);
	let description = $derived(pipeline.description);
	let enableDeploymentLogging = $derived(!!pipeline.deployment_logs_index_name);
	let loading = $state(false);

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		loading = true;

		try {
			const formData = new FormData(e.target as HTMLFormElement);

			const name = formData.get('name') as string;
			const description = formData.get('description') as string;
			const enableDeploymentLogging = formData.get('enableDeploymentLogging') as string;
			await delay(1000);
			const response = await updatePipeline(pipeline.key, {
				...pipeline,
				name,
				description,
				deployment_logs_index_name: enableDeploymentLogging
					? pipeline.deployment_logs_index_name
					: undefined
			});

			if (!response.success) {
				toast.error((response as { error: string })?.error || 'Failed to update pipeline');
				return;
			}
			isOpen = false;

			toast.success('Pipeline updated successfully');
		} catch (error) {
			toast.error('Failed to update pipeline');
		} finally {
			loading = false;
		}
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class="text-muted-foreground hover:bg-transparent! hover:text-foreground cursor-pointer py-2 px-3">
		<Pencil size={16} />
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Edit Pipeline</Dialog.Title>
			<Dialog.Description>Edit a pipeline</Dialog.Description>
		</Dialog.Header>
		<form class="space-y-4" method="POST" onsubmit={onSubmit}>
			<div class="space-y-2">
				<Label for="pipelineId">Pipeline ID</Label>
				<Input
					id="pipelineId"
					name="pipelineId"
					type="text"
					value={pipeline.key}
					required
					disabled
				/>
			</div>
			<div class="space-y-2">
				<Label for="name">Name</Label>
				<Input
					id="name"
					bind:value={name}
					name="name"
					type="text"
					required
					placeholder="First pipeline"
				/>
			</div>
			<div class="space-y-2">
				<Label for="description">Description</Label>
				<Input
					id="description"
					bind:value={description}
					name="description"
					type="text"
					placeholder="This pipeline is for..."
				/>
			</div>

			<div class="flex items-start space-x-2 my-6 border-t pt-6">
				<Checkbox
					class="cursor-pointer"
					bind:checked={enableDeploymentLogging}
					id="enableDeploymentLogging"
					name="enableDeploymentLogging"
				/>
				<div class="-mt-1 space-y-2">
					<label class="font-semibold text-sm cursor-pointer" for="enableDeploymentLogging"
						>Enable deployment logging</label
					>
					<p class="text-xs">
						Store deployment history in an index to track all pipeline updates and changes
					</p>

					{#if enableDeploymentLogging}
						<div class="space-y-4">
							<div
								class="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3 flex gap-2"
							>
								<Info size={16} class="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0" />
								<p class="text-sm text-blue-800 dark:text-blue-200">
									Each deployment will create a document with pipeline_id, ingest_pipeline
									configuration, timestamp and deployment_status
								</p>
							</div>
							<div class="space-y-2">
								<Label>Log index name</Label>
								<div>
									<Input
										id="deployment_logs_index_name"
										name="deployment_logs_index_name"
										type="text"
										value={`ingesta-${pipeline.key}-deployment-logs`}
										required
										placeholder="pipeline-deployment-logs-my-first-pipeline"
										disabled
									/>
								</div>
							</div>
						</div>
					{/if}
				</div>
			</div>

			<Button disabled={loading} type="submit">{loading ? 'Loading...' : 'Create'}</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

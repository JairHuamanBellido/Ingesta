<script lang="ts">
	import { toast } from 'svelte-sonner';
	import type { DexieError } from 'dexie';
	import type { SubmitFunction } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import { db } from '$infrastructure/dexie/db';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import Button from '$shadcn-components/button/button.svelte';
	import Input from '$shadcn-components/input/input.svelte';
	import Label from '$shadcn-components/label/label.svelte';
	import Checkbox from '$shadcn-components/checkbox/checkbox.svelte';
	import PipelinesTemplate from './pipelines-template.svelte';
	import { PIPELINES_TEMPLATE } from '$core/pipeline/pipeline-template';
	import ErrorToast from '../custom-toast/error-toast.svelte';
	import type { OpenSearchErrorDetail } from '$infrastructure/opensearch/types';
	import { basic_template } from '../simulation-sheet/simulation-list';
	import Info from 'phosphor-svelte/lib/Info';
	let loading = $state(false);
	let selectedTemplate = $state<string>('blank');
	let pipelineKey = $state<string>('');
	let enableDeploymentLogging = $state<boolean>(false);

	const handler: SubmitFunction<any, { error: OpenSearchErrorDetail }> = ({ formData }) => {
		const pipelineId = formData.get('pipelineId') as string;
		const name = formData.get('name') as string;
		const description = formData.get('description') as string;

		loading = true;
		const TEMPLATE = PIPELINES_TEMPLATE.find((template) => template.key === selectedTemplate);

		return async ({ update, result }) => {
			if (TEMPLATE && result.type === 'redirect') {
				try {
					await db.pipelines.add({
						...TEMPLATE.pipeline,
						key: pipelineId,
						description,
						name,
						tests: [],
						simulation_input_payload: basic_template,
						...(enableDeploymentLogging
							? { deployment_logs_index_name: `ingesta-${pipelineId}-deployment-logs` }
							: {})
					});
					await update();
				} catch (error) {
					const errorDexie: DexieError = error as DexieError;
					toast(ErrorToast, {
						style: 'padding: 0px; border:none; position:relative; width: fit-content !important;',
						componentProps: {
							title: errorDexie.name,
							description: errorDexie.message,
							code: errorDexie.inner.code
						},
						closeButton: true
					});
				} finally {
					loading = false;
				}
			} else if (result.type === 'failure') {
				loading = false;
				const serverError = result.data;

				toast(ErrorToast, {
					style: 'padding: 0px; border:none; position:relative; width: fit-content !important;',
					componentProps: {
						title: serverError?.error.reason ?? '',
						description: serverError?.error.description ?? '',
						code: serverError?.error.code ?? ''
					},
					closeButton: true
				});
			}
		};
	};
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button class="w-[100px]">+Create</Button>
	</Dialog.Trigger>
	<Dialog.Content class="max-w-[600px]! max-h-[90dvh] w-full overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title>Create Pipeline</Dialog.Title>
			<Dialog.Description>Create a new pipeline</Dialog.Description>
		</Dialog.Header>
		<form class="space-y-4" method="POST" action="?/createPipeline" use:enhance={handler}>
			<PipelinesTemplate bind:selectedTemplate />
			<div class="space-y-2">
				<Label for="pipelineId">Pipeline ID</Label>
				<Input
					id="pipelineId"
					name="pipelineId"
					type="text"
					bind:value={pipelineKey}
					required
					placeholder="my-first-pipeline"
				/>
			</div>
			<div class="space-y-2">
				<Label for="name">Name</Label>
				<Input id="name" name="name" type="text" required placeholder="First pipeline" />
			</div>
			<div class="space-y-2">
				<Label for="description">Description</Label>
				<Input
					id="description"
					name="description"
					type="text"
					placeholder="This pipeline is for..."
				/>
			</div>
			<Input
				class="hidden"
				id="key"
				name="key"
				type="text"
				required
				placeholder="Key"
				value={selectedTemplate}
			/>

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
										value={`ingesta-${pipelineKey}-deployment-logs`}
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

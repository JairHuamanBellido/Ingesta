<script lang="ts">
	import { enhance } from '$app/forms';
	import { db } from '$infrastructure/dexie/db';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import Button from '$shadcn-components/button/button.svelte';
	import Input from '$shadcn-components/input/input.svelte';
	import Label from '$shadcn-components/label/label.svelte';
	import PipelinesTemplate from './pipelines-template.svelte';
	import { PIPELINES_TEMPLATE } from '$core/pipeline/pipeline-template';

	let loading = $state(false);
	let selectedTemplate = $state<string>('blank');
</script>

<Dialog.Root>
	<Dialog.Trigger>
		<Button class="w-[100px]">+Create</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Create Pipeline</Dialog.Title>
			<Dialog.Description>Create a new pipeline</Dialog.Description>
		</Dialog.Header>
		<form
			class="space-y-4"
			method="POST"
			action="?/createPipeline"
			use:enhance={({ formData }) => {
				const pipelineId = formData.get('pipelineId') as string;
				const name = formData.get('name') as string;
				const description = formData.get('description') as string;

				loading = true;
				const TEMPLATE = PIPELINES_TEMPLATE.find((template) => template.key === selectedTemplate);

				return async ({ update }) => {
					if (TEMPLATE) {
						await db.pipelines.add({
							...TEMPLATE.pipeline,
							key: pipelineId,
							description,
							name,
							tests: []
						});
					}
					await update();
					loading = false;
				};
			}}
		>
			<PipelinesTemplate bind:selectedTemplate />
			<div class="space-y-2">
				<Label for="pipelineId">Pipeline ID</Label>
				<Input
					id="pipelineId"
					name="pipelineId"
					type="text"
					required
					placeholder="my-first-pipeline"
				/>
			</div>
			<div>
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
			<Button disabled={loading} type="submit">{loading ? 'Loading...' : 'Create'}</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

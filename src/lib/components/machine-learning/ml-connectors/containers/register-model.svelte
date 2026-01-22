<script lang="ts">
	import type { MachineLearningModelGroupOpensearch } from '$infrastructure/opensearch/types/machine-learning.types';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import axios from 'axios';
	import Check from 'phosphor-svelte/lib/Check';
	import * as Select from '$shadcn-components/select/index.js';
	import type { OpensearchSearchResponse } from '$infrastructure/opensearch/types';
	import Button from '@/components/ui/button/button.svelte';
	import { createConnectorStore } from '@/stores/create-connector';
	import IconsDictionary from '@/components/icons/icons-dictionary.svelte';
	import { toast } from 'svelte-sonner';

	let modelGroups = $state<OpensearchSearchResponse<MachineLearningModelGroupOpensearch> | null>();
	let selectedModelGroup = $state('');
	let loading = $state(false);
	let store = createConnectorStore;

	const fetchModelGroups = async () => {
		const response = await axios.get('/machine-learning/model-groups');

		if (response.status !== 200) {
			console.error(response.data);
			return;
		}

		modelGroups = response.data;
	};
	$effect(() => {
		fetchModelGroups();
	});

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		loading = true;

		try {
			const formData = new FormData(e.target as HTMLFormElement);
			const name = formData.get('name') as string;
			const description = formData.get('description') as string;
			const model_group_id = formData.get('model_group_id') as string;
			const connector_id = $store.connector_id;

			const response = await axios.post('/machine-learning/connectors/model', {
				name,
				description,
				model_group_id,
				connector_id
			});

			if (response.status !== 200) {
				console.error(response.data);
				toast.error('Failed to register model');
				return;
			}
			$store.model_id = response.data.model_id;
			$store.currentStep = 4;
		} catch (error) {
			console.error(error);
			toast.error('Failed to register model');
		} finally {
			loading = false;
		}
	};
</script>

<div>
	<h3 class="text-3xl font-semibold">Register Model</h3>
	<p class="text-muted-foreground">Register your ML model using the created connector</p>
</div>

<div class="mt-6 space-y-8">
	<div
		class="px-3 py-2.5 bg-green-200/40 dark:bg-green-800/20 text-green-700 dark:text-green-400 flex rounded-lg space-x-2"
	>
		<Check size={20} weight="bold" />
		<p class="font-semibold">Connector Created!</p>
		<p>Connector ID: <span class="ml-1font-mono"> {$store.connector_id} </span></p>
	</div>

	<form class="space-y-4 w-[600px]" onsubmit={onSubmit}>
		<div class="space-y-2">
			<Label class="required" for="name">Name</Label>
			<Input type="text" id="name" name="name" required />
		</div>
		<div class="space-y-2">
			<Label for="description">Description</Label>
			<Input type="text" id="description" name="description" />
		</div>

		<div class="space-y-2">
			<Label>Model Group</Label>
			<Select.Root name="model_group_id" type="single" bind:value={selectedModelGroup}>
				{@const modelGroup = modelGroups?.hits.hits.find(
					(modelGroup) => modelGroup._id === selectedModelGroup
				)}
				<Select.Trigger class="w-full">
					{modelGroup?._source.name || 'Select a model group'}
				</Select.Trigger>
				<Select.Content>
					{#if modelGroups}
						{#each modelGroups.hits.hits as modelGroup}
							<Select.Item value={modelGroup._id}>{modelGroup._source.name}</Select.Item>
						{/each}
					{/if}
				</Select.Content>
			</Select.Root>
		</div>

		<div class="flex items-center justify-end space-x-2">
			<Button
				onclick={() => {
					$store.currentStep = 2;
				}}
				variant="outline">Back</Button
			>
			<Button disabled={loading} type="submit">
				{#if loading}
					<IconsDictionary className="animate-spin" key="loading" size={16} weight="regular" />
					<span>Registering...</span>
				{:else}
					<span>Register Model</span>
				{/if}
			</Button>
		</div>
	</form>
</div>

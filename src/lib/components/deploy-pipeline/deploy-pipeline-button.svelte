<script lang="ts">
	import { onMount } from 'svelte';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';
	import Info from 'phosphor-svelte/lib/Info';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import Button from '$shadcn-components/button/button.svelte';
	import RocektLaunch from 'phosphor-svelte/lib/RocketLaunch';
	import * as RadioGroup from '$lib/components/ui/radio-group/index.js';
	import Label from '$shadcn-components/label/label.svelte';
	import Input from '$shadcn-components/input/input.svelte';
	import * as Select from '$shadcn-components/select/index.js';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import SpinnerGap from 'phosphor-svelte/lib/SpinnerGap';
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import SuccessToastDeployPipeline from './success-toast-deploy-pipeline.svelte';
	import SuccessModalDeployPipeline from './success-modal-deploy-pipeline.svelte';
	import { delay } from '@/utils';

	let { pipeline }: { pipeline: IPipeline } = $props();

	let optionSelected = $state('new-pipeline');
	let existingPipelineSelected = $state<string>('');
	let newPipelineName = $state<string>('');

	let deployedPipelineId = $state('');
	let successModalOpen = $state<boolean>(false);
	let openModal = $state<boolean>(false);
	let pipelines = $state<Array<string>>([]);
	let loading = $state<boolean>(false);
	let hasError = $state<boolean>(false);

	onMount(async () => {
		const response = await axios.get(`/pipelines`);
		pipelines = Object.keys(response.data);
	});

	const resetValues = () => {
		optionSelected = 'new-pipeline';
		existingPipelineSelected = '';
		newPipelineName = '';
		successModalOpen = false;
		openModal = false;
	};

	const deployPipeline = async () => {
		try {
			loading = true;
			hasError = false;

			if (
				(optionSelected === 'new-pipeline' && !newPipelineName) ||
				(optionSelected === 'existing-pipeline' && !existingPipelineSelected)
			) {
				hasError = true;
				return;
			}

			await delay(1000);

			await axios.post('/', {
				key: optionSelected === 'new-pipeline' ? newPipelineName : existingPipelineSelected,
				description: pipeline.description || '',
				processors: pipeline.processors
			});
			deployedPipelineId =
				optionSelected === 'new-pipeline' ? newPipelineName : existingPipelineSelected;
			toast(SuccessToastDeployPipeline, {
				position: 'bottom-right',
				componentProps: { pipeline: { ...pipeline, key: deployedPipelineId } },
				closeButton: true
			});
			resetValues();
			successModalOpen = true;
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			loading = false;
		}
	};

	$effect(() => {
		optionSelected;
		hasError = false;
	});
</script>

{#if successModalOpen}
	<SuccessModalDeployPipeline
		bind:open={successModalOpen}
		pipeline={{
			...pipeline,
			key: deployedPipelineId
		}}
	/>
{/if}
<Dialog.Root
	onOpenChange={(isOpen) => {
		if (!isOpen) {
			resetValues();
		}
	}}
	bind:open={openModal}
>
	<Dialog.Trigger>
		<Button>
			<span>Deploy</span>
			<RocektLaunch size={16} />
		</Button>
	</Dialog.Trigger>
	<Dialog.Content>
		<Dialog.Header>
			<Dialog.Title>Deploy Pipeline</Dialog.Title>
			<Dialog.Description
				>Deploy your current pipeline configuration to OpenSearch. You can create a new pipeline or
				update an existing one.
			</Dialog.Description>
		</Dialog.Header>
		<RadioGroup.Root class="space-y-3" bind:value={optionSelected}>
			<div class="flex flex-col space-y-3">
				<div class="flex items-start space-x-3 w-full relative">
					<RadioGroup.Item class="mt-1" value="new-pipeline" id="new-pipeline" />
					<Label class="block cursor-pointer w-full!" for="new-pipeline">
						<div class="flex flex-col">
							<p class="text-base font-medium">Create new pipeline</p>
							<p class="text-sm text-muted-foreground">
								Deploy configuration to a new ingest pipeline
							</p>
							{#if optionSelected === 'new-pipeline'}
								<Input
									bind:value={newPipelineName}
									class="mt-3"
									placeholder="Enter pipeline name"
								/>
							{/if}
						</div>
					</Label>
				</div>
			</div>
			<div class="flex items-start space-x-3 w-full relative">
				<RadioGroup.Item class="mt-1" value="existing-pipeline" id="existing-pipeline" />
				<Label class="block cursor-pointer w-full!" for="existing-pipeline">
					<div class="flex flex-col">
						<p class="text-base font-medium">Create new pipeline</p>
						<p class="text-sm text-muted-foreground">
							Deploy configuration to a new ingest pipeline
						</p>
						{#if optionSelected === 'existing-pipeline'}
							<Select.Root type="single" bind:value={existingPipelineSelected}>
								<Select.Trigger
									class={`bg-transparent py-2 px-3 w-full rounded-md text-sm! mt-3`}
									placeholder="Select an option"
								>
									{existingPipelineSelected || 'Select an option'}
								</Select.Trigger>
								<Select.Content>
									{#each pipelines as pipeline}
										<Select.Item value={pipeline}>{pipeline}</Select.Item>
									{/each}
								</Select.Content>
							</Select.Root>
						{/if}
					</div>
				</Label>
			</div>
		</RadioGroup.Root>
		{#if optionSelected === 'existing-pipeline' && existingPipelineSelected}
			<div
				class="flex w-full rounded-lg bg-amber-50 dark:bg-amber-200/5 text-amber-700 dark:text-orange-400 p-4 text-sm space-y-3"
			>
				<Info size={20} />
				<p class="ml-3">
					This will replace the existing configuration of <span class="font-semibold"
						>{existingPipelineSelected}</span
					>. This action cannot be undone.
				</p>
			</div>
		{/if}
		{#if hasError}
			<div
				class="px-3 py-2 rounded-lg text-sm bg-red-200/40 text-red-700/80 dark:bg-red-800/20 dark:text-red-400 flex items-center space-x-2"
			>
				<WarningCircle size={20} />
				{#if optionSelected === 'new-pipeline'}
					<p>Please enter a pipeline name</p>
				{:else}
					<p>Please select an existing pipeline</p>
				{/if}
			</div>
		{/if}

		<Dialog.Footer class="mt-4">
			<Button disabled={loading} class="font-semibold" variant="outline">Cancel</Button>
			<Button
				disabled={loading}
				onclick={deployPipeline}
				class="font-semibold flex w-32 items-center"
			>
				{#if loading}
					<SpinnerGap class="animate-spin" size={16} />
					<span>Deploying...</span>
				{:else}
					<span>Deploy Pipeline</span>
				{/if}
			</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

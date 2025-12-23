<script lang="ts">
	import { onDestroy } from 'svelte';
	import { toast } from 'svelte-sonner';
	import axios from 'axios';
	import SpinnerGap from 'phosphor-svelte/lib/SpinnerGap';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import * as Accordion from '$shadcn-components/accordion/index.js';
	import Button from '$shadcn-components/button/button.svelte';

	import { delay } from '@/utils';
	import JsonView from '../json-viewer/json-view.svelte';

	let { pipeline, open = $bindable() }: { open: boolean; pipeline: IPipeline } = $props();

	let loading = $state<boolean>(false);
	let success = $state<boolean>(false);

	const verifyPipeline = async () => {
		try {
			loading = true;

			await delay(1000);

			const { data: opensearchPipeline } = await axios.get(`/pipelines/${pipeline.key}`);

			if (
				JSON.stringify(opensearchPipeline[pipeline.key]) ===
				JSON.stringify({ description: pipeline.description, processors: pipeline.processors })
			) {
				success = true;
			}
		} catch (error) {
			toast.error('Pipeline verification failed');
		} finally {
			loading = false;
		}
	};

	onDestroy(() => {
		open = false;
	});
</script>

<Dialog.Root
	{open}
	onOpenChange={(isOpen) => {
		if (!isOpen) {
			open = false;
		}
	}}
>
	<Dialog.Content class="max-w-[600px]! max-h-[90dvh] w-full overflow-y-auto">
		<Dialog.Header>
			<Dialog.Title class="flex items-center space-x-2">
				<CheckCircle size={24} class="text-green-600" weight="bold" />
				<span class="text-lg font-semibold"> Pipeline deployed successfully </span>
			</Dialog.Title>
		</Dialog.Header>
		<div class="mt-1">
			<div>
				<p class="text-sm text-foreground/70">Your pipeline configuration has been deployed to:</p>
				<p class="font-semibold">{pipeline.key}</p>
			</div>

			<div class="bg-muted rounded-lg p-4 text-sm space-y-3 mt-4">
				<p class="font-medium">Pipeline Configuration</p>
				<div class="space-y-0.5">
					<p>Description</p>
					<p>{pipeline.description || 'No description provided'}</p>
				</div>

				<div class="border-t pt-2">
					<p>Deployed at <span class="font-semibold"> {new Date().toLocaleString()}</span></p>
				</div>
			</div>

			<Accordion.Root type="single" class="mt-4">
				<Accordion.Item value="item-1">
					<Accordion.Trigger class="hover:no-underline px-4 py-3 bg-muted border cursor-pointer"
						>View Pipeline JSON</Accordion.Trigger
					>
					<Accordion.Content
						class="flex flex-col gap-4 text-balance border max-h-[300px] rounded-lg  overflow-auto mt-4 pb-0"
					>
						<JsonView
							json={{
								description: pipeline.description,
								processors: pipeline.processors
							} as unknown as JSON}
						/>
					</Accordion.Content>
				</Accordion.Item>
			</Accordion.Root>

			<div class="p-4 border space-y-2 mt-4 rounded-lg text-sm">
				<div class="flex justify-between items-center">
					<p class="font-medium">Verify Deployment</p>
					{#if !success}
						<Button
							disabled={loading}
							variant="ghost"
							class="font-semibold bg-primary/10 w-28 text-primary hover:text-primary"
							onclick={verifyPipeline}
						>
							{#if loading}
								<SpinnerGap class="animate-spin" size={16} />
								<span>Verifying...</span>
							{:else}
								<span>Verify now</span>
							{/if}
						</Button>
					{/if}
				</div>
				<p class="text-foreground/70">
					Fetch the pipeline from OpenSearch and confirm the processors and description match your
					deployment.
				</p>
				{#if success}
					<div
						class="px-3 py-2.5 bg-green-200/40 dark:bg-green-800/20 text-green-700 dark:text-green-400 flex rounded-lg space-x-3"
					>
						<CheckCircle size={20} weight="bold" />
						<div>
							<p class="font-semibold">Verification successful</p>
							<p class="text-green-700/80 dark:text-green-400/70">
								Pipeline configuration in OpenSearch matches your deployed configuration.
							</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
		<Dialog.Footer>
			<Dialog.Close>
				<Button
					onclick={() => {
						open = false;
					}}>Close</Button
				>
			</Dialog.Close>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>

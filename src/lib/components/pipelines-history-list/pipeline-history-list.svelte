<script lang="ts">
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	import Clock from 'phosphor-svelte/lib/Clock';
	import { type IPipeline, type ITest } from '$infrastructure/model/pipeline.model';
	import * as Accordion from '$shadcn-components/accordion/index.js';
	import Label from '$lib/components/ui/label/label.svelte';
	import JsonView from '$lib/components/json-viewer/json-view.svelte';
	import { formatDate } from '@/utils';
	import Button from '../ui/button/button.svelte';
	import { getContext } from 'svelte';
	import { updatePipeline } from '$domain/use-cases/update-pipeline';
	import { getPipelineById } from '$domain/use-cases/get-pipeline';

	let { tests }: { tests: Array<ITest> } = $props();

	const pipeline = getContext<IPipeline>('pipeline');

	const onDeletePipeline = async (targetId: string) => {
		const pipeline_db = await getPipelineById(pipeline.key);

		if (pipeline_db) {
			await updatePipeline(pipeline.key, {
				...pipeline,
				tests: pipeline_db.tests.filter((test) => test.id !== targetId)
			});
		}
	};
</script>

<Accordion.Root class="w-full p-4" type="multiple">
	{#each tests as test, index (`pipeline-history-${test.id}`)}
		<Accordion.Item value={test.id}>
			<Accordion.Trigger class="hover:no-underline no-underline cursor-pointer">
				<div class="flex flex-col space-y-2">
					<div class="flex items-center space-x-3 text-sm">
						<div
							class={`size-3 rounded-full 
                        ${test.status_code === 200 && 'bg-green-700 dark:bg-green-400'}
                        ${test.status_code === 400 && 'bg-red-700 dark:bg-red-400'}
                        `}
						></div>

						<p>Test #{tests.length - index}</p>
						<div class="flex items-center space-x-1 text-muted-foreground">
							<Clock size={12} />
							<p class="">{test.request_duration}ms</p>
						</div>
					</div>
					<div class="flex items-center space-x-2 text-muted-foreground">
						<p>{formatDate(test.timestamp)}</p>
						{#if test.status_code === 200}
							<span
								class="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full"
							>
								<CheckCircle size={12} />
								{test.status_code} OK
							</span>
						{/if}
						{#if test.status_code === 400}
							<span
								class="flex items-center gap-1 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full"
							>
								<WarningCircle size={12} />
								{test.status_code} BAD REQUEST
							</span>
						{/if}
					</div>
				</div>
			</Accordion.Trigger>
			<Accordion.Content class="space-y-4">
				<div class="w-full flex justify-end">
					<Button size="sm" variant="outline" onclick={async () => onDeletePipeline(test.id)}
						>Delete</Button
					>
				</div>
				<div class="space-y-2">
					<Label class="font-semibold">Input Payload</Label>
					<JsonView json={test.input_payload} />
				</div>

				<div class="space-y-2">
					<Label class="font-semibold">Output Payload</Label>
					<JsonView json={test.result_payload} />
				</div>
			</Accordion.Content>
		</Accordion.Item>
	{/each}
</Accordion.Root>

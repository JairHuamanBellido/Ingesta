<script>
	import { liveQuery } from 'dexie';
	import { resolve } from '$app/paths';
	import { getAllPipelines } from '../domain/use-cases/get-all-pipelines';
	import CreatePipelineModal from '@/components/create-pipeline-modal/create-pipeline-modal.svelte';

	let pipelines = liveQuery(() => getAllPipelines());
</script>

<div class="flex flex-col space-y-4">
	<CreatePipelineModal />
	{#if $pipelines && $pipelines.length > 0}
		{#each $pipelines as pipeline (pipeline.key)}
			<a href={resolve(`/pipelines/${pipeline.key}`)}>
				<div>{pipeline.name}</div>
			</a>
		{/each}
	{/if}
</div>

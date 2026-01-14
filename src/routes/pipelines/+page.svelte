<script>
	import { liveQuery } from 'dexie';
	import TableIngestPipeline from '@/components/ingest-pipeline/table-ingest-pipeline/index.svelte';
	import { getAllPipelines } from '$domain/use-cases/get-all-pipelines';
	import CreatePipelineModal from '@/components/ingest-pipeline/create-pipeline-modal/create-pipeline-modal.svelte';

	let pipelines = liveQuery(() => getAllPipelines());
</script>

<div class="flex flex-col space-y-4 w-full max-w-[1440px] mx-auto py-12">
	<div class="flex items-center justify-between h-[104px] border-b border-b-muted">
		<div>
			<h2 class="text-2xl font-semibold">Ingest Pipelines</h2>
			<p class="text-muted-foreground">Manage your OpenSearch Ingest Pipelines</p>
		</div>

		<CreatePipelineModal />
	</div>
	{#if $pipelines && $pipelines.length > 0}
		<TableIngestPipeline pipelines={$pipelines} />
	{/if}
</div>

<script lang="ts">
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import { Info, Settings, TestTube } from '@lucide/svelte';
	let { pipeline }: { pipeline: IPipeline } = $props();
</script>

<div class="bg-white dark:bg-background border-l h-full w-[400px] p-4 space-y-4">
	<div>
		<h2 class="text-lg font-semibold">{pipeline.name}</h2>
		<p class="text-xs mt-1 text-foreground/70">Key: {pipeline.key}</p>
	</div>

	<div>
		<div class="flex items-center gap-2 py-3">
			<Info class="w-4 h-4" />
			<p class="font-semibold text-sm">Pipeline Info</p>
		</div>
		<div>
			<p class="text-xs font-medium">Description</p>
			<p class="text-sm text-muted-foreground mt-1">
				{pipeline.description || 'No description provided'}
			</p>
		</div>
	</div>

	<div>
		<div class="flex items-center gap-2 py-3">
			<Settings class="w-4 h-4" />
			<p class="font-semibold text-sm">Processors ({pipeline.processors.length})</p>
		</div>
		<div>
			{#each pipeline.processors as processor(`pipeline-processor-${processor.type}`)}
				<div class="bg-muted p-2 rounded">
					<p>{Object.keys(processor)[0]}</p>
				</div>
			{/each}
		</div>
	</div>

    <div>
		<div class="flex items-center gap-2 py-3">
			<TestTube class="w-4 h-4" />
			<p class="font-semibold text-sm">Tests ({pipeline.tests.length})</p>
		</div>
		<div>
			{#each pipeline.tests as test(`pipeline-test-${test.id}`)}
				<div class="bg-muted p-2 rounded">
					<p>{test.id}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

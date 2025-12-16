<script lang="ts">
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import Gear from 'phosphor-svelte/lib/Gear';
	import Button from '../ui/button/button.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import Copy from 'phosphor-svelte/lib/Copy';
	let { pipeline }: { pipeline: IPipeline } = $props();

	let copiedInput = $state(false);
	let copiedOutput = $state(false);

	const copyToClipboard = (text: string, type: 'input' | 'output') => {
		navigator.clipboard.writeText(text);
		if (type === 'input') {
			copiedInput = true;
			setTimeout(() => (copiedInput = false), 2000);
		} else {
			copiedOutput = true;
			setTimeout(() => (copiedOutput = false), 2000);
		}
	};
</script>

<div
	class="flex flex-col bg-card/50 backdrop-blur-lg border w-[500px] h-[85vh] absolute right-4 top-4 rounded-lg"
>
	<!-- Header -->
	<div class="flex items-center justify-between px-4 py-3 border-b">
		<div class="flex items-center gap-2">
			<Gear class="w-5 h-5 text-primary" />
			<h3 class="font-semibold">Configuration</h3>
		</div>
	</div>

	<div class="overflow-auto">
		<div class="flex flex-col items-end px-4 mt-4">
			<Button
				variant="outline"
				onclick={() =>
					copyToClipboard(
						JSON.stringify(
							{ description: pipeline.description, processors: pipeline.processors },
							null,
							2
						),
						'input'
					)}
				class="flex w-fit items-center gap-1 px-2 h-6 py-1 text-xs rounded transition-colors text-muted-foreground"
			>
				{#if copiedInput}
					<Check class="w-3 h-3 text-green-600" />
					<span class="text-green-600">Copied</span>
				{:else}
					<Copy class="w-3! h-3!" />
					Copy
				{/if}
			</Button>
		</div>

		<div class="p-4">
			<pre
				class="font-mono text-sm border bg-transparent dark:bg-input/30 rounded-lg p-4 overflow-auto"><code
					>{JSON.stringify(
						{ description: pipeline.description, processors: pipeline.processors },
						null,
						2
					)}</code
				></pre>
		</div>
	</div>
</div>

<script lang="ts">
	import JsonView from '@/components/json-viewer/json-view.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import Copy from 'phosphor-svelte/lib/Copy';
	let { pipeline } = $props();
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

<div class="overflow-auto">
	<h3 class="font-semibold text-2xl">General</h3>
	<div class="flex justify-between items-center space-y-2 mt-4">
        <div>
            <p class="text-foreground font-medium">JSON Payload</p>
            <p class="text-sm text-muted-foreground">Copy the JSON payload to use in your OpenSearch ingestion pipeline</p>
        </div>
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

	<div >
		<JsonView
			json={{
				description: pipeline.description,
				processors: pipeline.processors
			} as unknown as JSON}
		/>
	</div>
</div>

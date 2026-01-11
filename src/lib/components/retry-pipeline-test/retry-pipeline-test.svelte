<script lang="ts">
	import { enhance } from '$app/forms';
	import type { IPipeline, ITest } from '$infrastructure/model/pipeline.model';
	import { getContext } from 'svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import ArrowCounterClockwise from 'phosphor-svelte/lib/ArrowCounterClockwise';
	import Button from '$lib/components/ui/button/button.svelte';

	let loading = $state(false);
	const pipeline = getContext<IPipeline>('pipeline');
	let props: { test: ITest } = $props();
</script>

<form
	method="POST"
	action="?/simulate"
	use:enhance={() => {
		loading = true;
		return async ({ update }) => {
			await update();
			loading = false;
		};
	}}
>
	<Textarea
		class="hidden h-0"
		name="request-payload"
		value={JSON.stringify(props.test.input_payload, null, 2)}
	/>
	<Input type="hidden" name="pipelineId" value={pipeline.key} />

	<Button size="sm" variant="ghost" type="submit" disabled={loading}>
		{#if loading}
			<span class="ml-2">Retrying...</span>
		{:else}
			<ArrowCounterClockwise class="w-4 h-4" />
			<span>Retry</span>
		{/if}
	</Button>
</form>

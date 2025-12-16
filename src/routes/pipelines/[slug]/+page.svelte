<script lang="ts">
	import type { PageProps } from './$types';
	import { liveQuery } from 'dexie';
	import { getPipelineById } from '../../../domain/use-cases/get-pipeline';
	import FlowBuilder from '$lib/components/flow-builder/index.svelte';

	let { data }: PageProps = $props();

	const pipeline = liveQuery(() => getPipelineById(data.pipelineId));
</script>

{#if $pipeline}
	<div class="w-screen h-screen overflow-hidden relative flex">
		<FlowBuilder pipeline={$pipeline} />
	</div>
{/if}

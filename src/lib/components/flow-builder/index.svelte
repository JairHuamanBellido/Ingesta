<script lang="ts">
	import { setContext } from 'svelte';
	import { SvelteFlowProvider } from '@xyflow/svelte';
	import Board from './board.svelte';
	import DnDProvider from './dnd-provider.svelte';
	import type { IPipeline } from '../../../infrastructure/model/pipeline.model';

	let props: { pipeline: IPipeline } = $props();
	setContext('pipeline', props.pipeline);
</script>

<SvelteFlowProvider>
	<DnDProvider>
		<Board pipeline={props.pipeline} />
	</DnDProvider>
</SvelteFlowProvider>

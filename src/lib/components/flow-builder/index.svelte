<script lang="ts">
	import { SvelteFlowProvider, type Edge, type Node } from '@xyflow/svelte';
	import Board from './board.svelte';
	import DnDProvider from './dnd-provider.svelte';
	import type { IPipeline } from '../../../infrastructure/model/pipeline.model';

	let {  pipeline }: { pipeline: IPipeline } = $props();
</script>

<SvelteFlowProvider>
	<DnDProvider>
		<Board {pipeline} />
	</DnDProvider>
</SvelteFlowProvider>

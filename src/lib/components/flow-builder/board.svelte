<script lang="ts">
	import '@xyflow/svelte/dist/style.css';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import {
		SvelteFlow,
		useSvelteFlow,
		Background,
		type Node,
		type ColorMode,
		type Edge,
		type Connection
	} from '@xyflow/svelte';
	import Play from 'phosphor-svelte/lib/Play';
	import Gear from 'phosphor-svelte/lib/Gear';
	import { useDnD } from './dnd-provider.svelte';
	import NodeStart from '$components-nodes/node-start.svelte';
	import NodeConditional from '$components-nodes/node-conditional.svelte';
	import Sidebar from '$lib/components/sidebar/index.svelte';
	import SaveChanges from '$lib/components/save-changes/save-changes.svelte';
	import SimulationSheet from '$lib/components/simulation-sheet/simulation-sheet.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import ConfigurationIngestionSheet from '../configuration-ingestion-sheet/configuration-ingestion-sheet.svelte';
	import NodeProcessorBase from '../nodes/node-processor-base.svelte';
	import { createDeletionValidationChain } from '$core/validators/deletion';
	import type { DeletionContext } from '$core/validators/types';
	import { createConnectionValidationChain } from '$core/validators/connection';
	import NodeProcessorPipeline from '../nodes/node-processor-pipeline.svelte';

	let { pipeline }: { pipeline: IPipeline } = $props();

	let nodes = $derived(pipeline.nodes);
	let edges = $derived(pipeline.edges);
	let name = $derived(pipeline.name);
	let currentSheetOpen = $state<string>('');

	const deletionValidator = createDeletionValidationChain({
		allowStartNodeDeletion: false
	});

	const connectionValidator = createConnectionValidationChain();

	const nodeTypes = {
		nodeProcessorAppend: NodeProcessorBase,
		nodeProcessorSet: NodeProcessorBase,
		nodeProcessorCopy: NodeProcessorBase,
		nodeProcessorRename: NodeProcessorBase,
		nodeProcessorConvert: NodeProcessorBase,
		nodeProcessorGsub: NodeProcessorBase,
		nodeProcessorLowercase: NodeProcessorBase,
		nodeProcessorUppercase: NodeProcessorBase,
		nodeProcessorSplit: NodeProcessorBase,
		nodeProcessorTrim: NodeProcessorBase,
		nodeProcessorPipeline: NodeProcessorPipeline,
		nodeProcessorGrok: NodeProcessorBase,
		nodeProcessorJson: NodeProcessorBase,
		nodeProcessorCsv: NodeProcessorBase,
		nodeProcessorDate: NodeProcessorBase,
		nodeProcessorUserAgent: NodeProcessorBase,
		nodeProcessorDrop: NodeProcessorBase,
		nodeProcessorRemove: NodeProcessorBase,
		nodeProcessorFail: NodeProcessorBase,
		nodeProcessorFingerprint: NodeProcessorBase,
		nodeProcessorBytes: NodeProcessorBase,
		nodeConditional: NodeConditional,
		nodeStart: NodeStart
	};

	const { screenToFlowPosition } = useSvelteFlow();

	const type = useDnD();

	const onDragOver = (event: DragEvent) => {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'move';
		}
	};

	const onDrop = (event: DragEvent) => {
		event.preventDefault();

		if (!type.current) {
			return;
		}

		const position = screenToFlowPosition({
			x: event.clientX,
			y: event.clientY
		});

		const newNode = {
			id: `${window.crypto.randomUUID()}`,
			type: type.current,
			position,
			data: type.data,
			origin: [0.5, 0.0]
		} satisfies Node;

		nodes = [...nodes, newNode];
	};

	let colorMode: ColorMode = $state('system');

	function onBeforeDelete({
		nodes: nodesToDelete,
		edges
	}: {
		nodes: Node[];
		edges: Edge[];
	}): Promise<boolean> {
		for (const node of nodesToDelete) {
			const context: DeletionContext = {
				edges,
				nodes,
				node
			};

			const result = deletionValidator.validate(context);

			if (!result.success) {
				return Promise.resolve(false);
			}
		}

		return Promise.resolve(true);
	}

	function onBeforeConnect(connection: Connection) {
		const result = connectionValidator.validate({ connection });

		if (!result.success) {
			return false;
		}
		return connection;
	}
</script>

<Sidebar />
<div class="w-[calc(100vw_-_300px)] relative">
	<div
		class="h-16 border-b border-border/50 flex items-center justify-between px-8 py-4 bg-white dark:bg-background"
	>
		<h2 class="font-semibold text-lg">{name}</h2>
		<div class="flex items-center space-x-4">
			<Button
				variant="outline"
				class="flex items-center justify-center"
				onclick={() =>
					(currentSheetOpen = currentSheetOpen === 'configuration' ? '' : 'configuration')}
			>
				<Gear size={12} />
				<span>Configuration</span>
			</Button>
			<Button
				variant="outline"
				class="flex items-center justify-center"
				onclick={() => (currentSheetOpen = currentSheetOpen === 'simulation' ? '' : 'simulation')}
			>
				<Play size={12} />
				<span>Simulate</span>
			</Button>
			<SaveChanges {pipeline} />
		</div>
	</div>
	<div class="w-full relative h-full flex">
		<SvelteFlow
			class="flex-1 h-full"
			fitView
			bind:nodes
			bind:edges
			maxZoom={2}
			minZoom={0.25}
			{colorMode}
			{nodeTypes}
			ondragover={onDragOver}
			ondrop={onDrop}
			onbeforedelete={onBeforeDelete}
			onbeforeconnect={onBeforeConnect}
		>
			<Background size={1} />
		</SvelteFlow>
		<!-- <PipelineDetailSheet {pipeline} /> -->
		{#if currentSheetOpen === 'simulation'}
			<SimulationSheet {pipeline} />
		{/if}
		{#if currentSheetOpen === 'configuration'}
			<ConfigurationIngestionSheet {pipeline} />
		{/if}
	</div>
</div>

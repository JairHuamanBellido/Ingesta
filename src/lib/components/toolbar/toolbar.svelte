<script lang="ts">
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import { Button } from '$lib/components/ui/button/index.js';
	import { hasUnsavedChanges } from '@/stores/dirty';
	import Gear from 'phosphor-svelte/lib/Gear';
	import Play from 'phosphor-svelte/lib/Play';
	import SaveChanges from '../save-changes/save-changes.svelte';
	import DeployPipelineButton from '../deploy-pipeline/deploy-pipeline-button.svelte';
	import DeploymentLogsButton from '../deployment-logs/deployment-logs-button.svelte';

	let {
		pipeline,
		currentSheetOpen = $bindable()
	}: { pipeline: IPipeline; currentSheetOpen: string } = $props();
</script>

<div class="flex items-center space-x-4">
	<Button
		size="sm"
		variant="outline"
		class="flex items-center justify-center"
		onclick={() => (currentSheetOpen = currentSheetOpen === 'configuration' ? '' : 'configuration')}
	>
		<Gear size={12} />
		<span>Configuration</span>
	</Button>
	<Button
		size="sm"
		disabled={$hasUnsavedChanges}
		variant="outline"
		class="flex items-center justify-center"
		onclick={() => (currentSheetOpen = currentSheetOpen === 'simulation' ? '' : 'simulation')}
	>
		<Play size={12} />
		<span>Simulate</span>
	</Button>
	<div class="h-6 w-px bg-border"></div>
	<SaveChanges {pipeline} />
	<DeployPipelineButton {pipeline} />
	<DeploymentLogsButton key={pipeline.key} />
</div>

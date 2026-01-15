<script lang="ts">
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import Gear from 'phosphor-svelte/lib/Gear';
	import { buttonVariants } from '../../ui/button/button.svelte';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import { INGEST_PIPELINE_CONFIGURATIONS } from './data';
	import IconsDictionary from '@/components/icons/icons-dictionary.svelte';
	import { cn } from '@/utils';
	import IngestPipelineJsonConfiguration from './containers/ingest-pipeline-json-configuration.svelte';
	import DeploymentConfiguration from './containers/deployment-configuration.svelte';
	let { pipeline }: { pipeline: IPipeline } = $props();

	let activeConfiguration = $state(INGEST_PIPELINE_CONFIGURATIONS[0]);
</script>

<Dialog.Root>
	<Dialog.Trigger class={buttonVariants({ variant: 'outline' })}>
		<Gear size={16} />
		<span>Configuration</span>
	</Dialog.Trigger>
	<Dialog.Content
		class="w-[1000px]! max-w-[calc(100vw_-_100px)]! h-[calc(100vh-100px)]! max-h-[750px] p-0! flex overflow-hidden"
	>
		<!-- Sidebar-->
		<ul class="w-64 bg-sidebar p-2 space-y-1">
			<li class="h-8 p-2 flex rounded-md gap-2 items-center text-xs text-sidebar-foreground/70">
				General
			</li>
			{#each INGEST_PIPELINE_CONFIGURATIONS as config}
				<li
					class={cn('h-8 p-2 flex rounded-md gap-2 items-center cursor-pointer', {
						'bg-sidebar-primary text-sidebar-primary-foreground font-medium':
							activeConfiguration.key === config.key
					})}
				>
					<div
						tabindex={0}
						role="button"
						class="w-full h-full"
						onclick={() => {
							activeConfiguration = config;
						}}
						onkeydown={(e) => {
							if (e.key === 'Enter') {
								activeConfiguration = config;
							}
						}}
					>
						<IconsDictionary key={config.icon} size={16} weight="bold" />

						<span class="text-sm">
							{config.name}
						</span>
					</div>
				</li>
			{/each}
		</ul>
		<div class="h-full overflow-y-auto w-full py-8 px-4">
			{#if activeConfiguration.key === 'general'}
				<IngestPipelineJsonConfiguration {pipeline} />
			{/if}
			{#if activeConfiguration.key === 'deployment'}
				<DeploymentConfiguration {pipeline} />
			{/if}
		</div>
	</Dialog.Content>
</Dialog.Root>

<script lang="ts">
	import IconsDictionary from '@/components/icons/icons-dictionary.svelte';
	import Check from 'phosphor-svelte/lib/Check';
	import ArrowLeft from 'phosphor-svelte/lib/ArrowLeft';
	import { cn } from '@/utils';
	import { createConnectorStore } from '@/stores/create-connector';
	import SelectProvider from '../../../../lib/components/machine-learning/ml-connectors/containers/select-provider.svelte';
	import ConfigurationProvider from '../../../../lib/components/machine-learning/ml-connectors/containers/configuration-provider.svelte';
	import CreateConnector from '../../../../lib/components/machine-learning/ml-connectors/containers/create-connector.svelte';
	import RegisterModel from '../../../../lib/components/machine-learning/ml-connectors/containers/register-model.svelte';
	import DeployModel from '@/components/machine-learning/ml-connectors/containers/deploy-model.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import { onDestroy } from 'svelte';

	const store = createConnectorStore;

	onDestroy(() => {
		store.clear();
		console.log('destroyed');
	});
</script>

<div class="w-screen h-screen overflow-hidden relative bg-muted dark:bg-background">
	<div class="flex flex-col justify-between w-[400px] relatice h-full p-8">
		<div class="">
			<h2 class="text-lg font-semibold">ML Connector Setup {$store.provider}</h2>
			<p class="text-sm text-muted-foreground">
				Create, register, deploy, and test your OpenSearch ML connector in minutes currentStep {$store.currentStep}
			</p>

			<div class="mt-8 space-y-4">
				{#each $store.steps as option, index}
					<div
						class={cn(
							'flex items-center justify-between transition-all rounded-md px-3 py-2 space-x-3 text-muted-foreground',
							{
								'text-foreground bg-foreground/5': index === $store.currentStep,
								' text-green-700 dark:text-green-400 flex items-center space-x-1':
									index < $store.currentStep
							}
						)}
					>
						<div class="flex items-center space-x-3">
							<IconsDictionary key={option.icon} size={20} weight="duotone" />
							<p>{option.name}</p>
						</div>
						{#if index < $store.currentStep}
							<div class="text-green-700 dark:text-green-400 flex items-center space-x-1">
								<Check size={16} weight="bold" />
							</div>
						{/if}
					</div>
				{/each}
			</div>
		</div>
		<div>
			<Button variant="ghost" href="/machine-learning">
				<ArrowLeft size={20} weight="bold" />
				Back
			</Button>
		</div>
	</div>

	<div
		class="w-[calc(100%_-_424px)] h-[calc(100%_-_48px)] bg-background dark:bg-muted/20 absolute left-[400px] top-[24px] rounded-2xl p-8 shadow-foreground/50"
	>
		{#if $store.currentStep === 0}
			<SelectProvider />
		{/if}
		{#if $store.currentStep === 1}
			<ConfigurationProvider />
		{/if}
		{#if $store.currentStep === 2}
			<CreateConnector />
		{/if}
		{#if $store.currentStep === 3}
			<RegisterModel />
		{/if}
		{#if $store.currentStep === 4}
			<DeployModel />
		{/if}
	</div>
</div>

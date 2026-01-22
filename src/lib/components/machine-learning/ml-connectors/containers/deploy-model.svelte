<script lang="ts">
	import axios from 'axios';
	import Check from 'phosphor-svelte/lib/Check';
	import Info from 'phosphor-svelte/lib/Info';
	import Play from 'phosphor-svelte/lib/Play';
	import { toast } from 'svelte-sonner';
	import Button from '@/components/ui/button/button.svelte';
	import { createConnectorStore } from '@/stores/create-connector';
	import IconsDictionary from '@/components/icons/icons-dictionary.svelte';

	const store = createConnectorStore;

	let loading = $state(false);
	let isSuccess = $state(false);
	const onDeploy = async () => {
		try {
			loading = true;
			const response = await axios.post('/machine-learning/connectors/deploy', {
				model_id: $store.model_id
			});
			if (response.status >= 400) {
				console.log(response.data);
				toast.error('Failed to deploy model');
				return;
			}
			isSuccess = true;
		} catch (error) {
			console.log(error);
			toast.error('Failed to deploy model');
		} finally {
			loading = false;
		}
	};
</script>

<div>
	<h3 class="text-3xl font-semibold">Deploy</h3>
	<p class="text-muted-foreground">Deploy your model</p>
</div>

<div class="mt-6 space-y-4">
	<div
		class="px-3 py-2.5 bg-green-200/40 dark:bg-green-800/20 text-green-700 dark:text-green-400 flex rounded-lg space-x-2"
	>
		<Check size={20} weight="bold" />
		<p class="font-semibold">Model Registered!</p>
		<p>Model ID: <span class="ml-1font-mono"> {$store.model_id} </span></p>
	</div>
	{#if !isSuccess}
		<div
			class="px-3 py-4 bg-blue-200/40 dark:bg-blue-800/20 text-blue-700 dark:text-blue-400 flex space-x-2 rounded-lg"
		>
			<Info size={20} weight="bold" />
			<div class="items-center space-y-2">
				<p>Deploy your model to start making predictions</p>
				<Button disabled={loading} onclick={onDeploy} class="w-fit">
					{#if loading}
						<IconsDictionary className="animate-spin" key="loading" size={16} weight="regular" />
						Deploying...
					{:else}
						<Play size={20} weight="bold" />
					{/if}
					Deploy Model</Button
				>
			</div>
		</div>
	{:else}
		<div
			class="px-3 py-2.5 bg-green-200/40 dark:bg-green-800/20 text-green-700 dark:text-green-400 flex rounded-lg space-x-2"
		>
			<Check size={20} weight="bold" />
			<p class="font-semibold">Model Deployed!</p>
			<p>Ready for predictions</p>
		</div>
		<div class="flex items-center space-x-2">
			<Button
				variant="outline"
				onclick={() => {
					$store.currentStep = 3;
				}}>Back</Button
			>
			<Button
				onclick={() => {
					window.location.href = '/machine-learning';
					store.clear();
				}}>Finish</Button
			>
		</div>
	{/if}
</div>

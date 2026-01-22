<script lang="ts">
	import IconsDictionary from '@/components/icons/icons-dictionary.svelte';
	import JsonView from '@/components/json-viewer/json-view.svelte';
	import Button from '@/components/ui/button/button.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { createConnectorStore } from '@/stores/create-connector';
	import { delay } from '@/utils';
	import axios from 'axios';
	import { toast } from 'svelte-sonner';

	let store = createConnectorStore;
	let loading = $state(false);

	const onCreateConnector = async () => {
		loading = true;
		try {
			await delay(1500);
			const name = $store.configuration.name;
			const description = $store.configuration.description;
			const version = $store.configuration.version;
			const api_key = $store.configuration.api_key;
			const model = $store.configuration.model;

			const response = await axios.post('/machine-learning/connectors', {
				name,
				description,
				version,
				api_key,
				model
			});

			if (response.status !== 200) {
				console.error(response.data);
				toast.error('Error creating connector');
				return;
			}

			$store.connector_id = response.data.connector_id;
			$store.currentStep = 3;
		} catch (error) {
			console.log(error);
			toast.error('Error creating connector');
		} finally {
			loading = false;
		}
	};
</script>

<div>
	<h3 class="text-3xl font-semibold">Create Connector</h3>
	<p class="text-muted-foreground">Review and create your ML connector in OpenSearch</p>
</div>

<div class="space-y-2 mt-6">
	<Label>Connector Payload</Label>
	<JsonView json={JSON.parse($store.connectorPayload)} />

	<div class="flex items-center justify-end space-x-2">
		<Button
			onclick={() => {
				$store.currentStep = 1;
			}}
			variant="outline">Back</Button
		>
		<Button disabled={loading} onclick={onCreateConnector}>
			{#if loading}
				<IconsDictionary className="animate-spin" key="loading" size={16} weight="regular" />
				<span>Creating...</span>
			{:else}
				<span>Create Connector</span>
			{/if}
		</Button>
	</div>
</div>

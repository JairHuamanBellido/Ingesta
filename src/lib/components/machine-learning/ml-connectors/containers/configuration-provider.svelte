<script lang="ts">
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { createConnectorStore } from '@/stores/create-connector';
	import * as Select from '$shadcn-components/select/index.js';
	import { ML_CONNECTOR_OPTIONS } from '$domain/machine-learning/ml-connectors/ml-connector-list';
	import { delay } from '@/utils';
	import { MLConnectorBuilder } from '$domain/machine-learning/ml-connectors';
	import { toast } from 'svelte-sonner';

	const store = createConnectorStore;
	let loading = $state(false);
	let isDisabled = $derived(() => {
		return (
			!$store.configuration.name ||
			!$store.configuration.version ||
			!$store.configuration.api_key ||
			!$store.configuration.model
		);
	});

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		loading = true;
		try {
			await delay(700);
			const formData = new FormData(e.target as HTMLFormElement);
			const name = formData.get('name') as string;
			const description = formData.get('description') as string;
			const api_key = formData.get('api_key') as string;
			const model = formData.get('model') as string;
			const version = formData.get('version') as string;

			const builder = new MLConnectorBuilder();

			const payload = builder.selectProvider($store.provider).build({
				credential: { api_key },
				name,
				description,
				version,
				protocol: 'http',
				parameters: { model }
			});

			$store.connectorPayload = JSON.stringify(payload);
			$store.currentStep = 2;
			$store.steps[1].isDone = true;
		} catch (error) {
			console.error(error);
			toast.error('Failed to create connector');
		} finally {
			loading = false;
		}
	};
</script>

<div class="flex flex-col space-y-2 justify-between h-full">
	<div>
		<h3 class="text-3xl font-semibold">Configure {$store.provider}</h3>
		<p class="text-muted-foreground">Enter your connector details and credentials</p>
	</div>
	<div class="flex-1 py-6">
		<form onsubmit={(e) => onSubmit(e)} class="space-y-4 w-[600px]">
			<div class="space-y-2">
				<Label class="required" for="name">Connector Name</Label>
				<Input
					bind:value={$store.configuration.name}
					id="name"
					name="name"
					placeholder="Enter connector name"
					required
				/>
			</div>
			<div class="space-y-2">
				<Label for="description">Description</Label>
				<Input
					bind:value={$store.configuration.description}
					id="description"
					name="description"
					placeholder="Enter description"
				/>
			</div>
			<div class="space-y-2">
				<Label class="required" for="version">Version</Label>
				<Input
					bind:value={$store.configuration.version}
					id="version"
					name="version"
					placeholder="1.0"
					required
				/>
			</div>
			<div class="space-y-2">
				<Label class="required" for="api_key">API Key</Label>
				<Input
					bind:value={$store.configuration.api_key}
					id="api_key"
					name="api_key"
					placeholder="Enter API key"
					required
				/>
			</div>

			<div class="space-y-2">
				<Label class="required" for="model">Model</Label>
				<Select.Root required name="model" type="single" bind:value={$store.configuration.model}>
					<Select.Trigger
						class={`bg-transparent py-2 px-3 w-full rounded-md text-sm!`}
						placeholder="Select a model connector"
					>
						{$store.configuration.model || 'Select a model connector'}
					</Select.Trigger>
					<Select.Content>
						{#each ML_CONNECTOR_OPTIONS as ml_connector}
							{@const image_url = `/images/${ml_connector.provider}-logo.png`}
							<Select.Item value={ml_connector.model}>
								<img class="rounded-md" src={image_url} alt="" width="24" height="24" />
								{ml_connector.model}
							</Select.Item>
						{/each}
					</Select.Content>
				</Select.Root>
			</div>
			<div class="flex items-center justify-end space-x-2">
				<Button
					onclick={() => {
						$store.currentStep = 0;
						$store.configuration = {};
					}}
					variant="outline">Back</Button
				>
				<Button disabled={isDisabled() || loading} type="submit">Next</Button>
			</div>
		</form>
	</div>
</div>

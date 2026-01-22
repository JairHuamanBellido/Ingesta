<script lang="ts">
	import { OpenAIEmbeddingModel } from '$domain/machine-learning/ml-connectors/connectors/openai-ml-connector';
	import { createConnectorStore } from '@/stores/create-connector';

	const store = createConnectorStore;
	const onSelectProvider = (provider: string) => {
		$store.provider = provider;
		$store.currentStep = 1;
		$store.steps[0].isDone = true;
	};
</script>

<div>
	<h3 class="text-3xl font-semibold">Choose your ML Provider</h3>

	<div
		role="button"
		tabindex={0}
		onclick={() => {
			onSelectProvider('openai');
		}}
		onkeydown={(e) => {
			if (e.key === 'Enter') {
				onSelectProvider('openai');
			}
		}}
		class="flex flex-col space-y-2 border p-6 mt-6 rounded-lg w-full cursor-pointer transition-all hover:bg-muted-foreground/5"
	>
		<img class="rounded-lg overflow-hidden size-12" src="/images/openai-logo.png" alt="" />

		<p class="text-lg font-semibold">OpenAI</p>
		<div class="flex items-center text-sm text-muted-foreground space-x-2">
			{#each Object.values(OpenAIEmbeddingModel) as model}
				<p>{model}</p>
			{/each}
		</div>
	</div>
</div>

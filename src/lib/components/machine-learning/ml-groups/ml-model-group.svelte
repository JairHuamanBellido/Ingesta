<script lang="ts">
	import axios from 'axios';
	import type { OpensearchSearchResponse } from '$infrastructure/opensearch/types';
	import type { MachineLearningModelGroupOpensearch } from '$infrastructure/opensearch/types/machine-learning.types';
	import { formatDate } from '@/utils';
	import CreateModelGroup from './create-model-group.svelte';

	let modelGroup = $state<OpensearchSearchResponse<MachineLearningModelGroupOpensearch> | null>();

	async function fetchModelGroup() {
		const response = await axios.get(`/machine-learning/model-groups`);

		modelGroup = response.data;
	}
	$effect(() => {
		fetchModelGroup();
	});
</script>

<div class="flex flex-col space-y-12">
	<div class="w-full flex justify-end">
		<CreateModelGroup onCreated={() => fetchModelGroup()} />
	</div>
	<div class="grid grid-cols-[repeat(auto-fill,minmax(400px,4fr))] gap-4">
		{#if modelGroup}
			{#each modelGroup.hits.hits as model_group}
				<div class="border rounded-lg p-4">
					<h3 class="text-lg font-semibold">{model_group._source.name}</h3>
					<p class="text-muted-foreground">{model_group._source.description}</p>
					<div class="mt-2">
						<p class="text-xs">Created: {formatDate(new Date(model_group._source.created_time))}</p>
						<p class="text-xs">
							Updated: {formatDate(new Date(model_group._source.last_updated_time))}
						</p>
					</div>
				</div>
			{/each}
		{/if}
	</div>
</div>

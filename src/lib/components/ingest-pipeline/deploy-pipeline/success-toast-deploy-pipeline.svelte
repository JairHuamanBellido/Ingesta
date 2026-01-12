<script lang="ts">
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	let { pipeline }: { pipeline: IPipeline } = $props();
</script>

<div class="rounded-lg">
	<div class="flex items-start space-x-3">
		<CheckCircle weight="bold" class="text-green-600 mt-1" size={20} />
		<div class="space-y-2">
			<p class="font-semibold text-base">Pipeline deployed successfully</p>
			<p class="text-sm text-foreground/70">
				<span class="font-medium text-foreground">{pipeline.key}</span> is now active in OpenSearch
			</p>
		</div>
	</div>
</div>

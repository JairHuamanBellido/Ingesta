<script lang="ts">
	import { PIPELINES_TEMPLATE } from '$core/pipeline/pipeline-template';
	import IconsDictionary from '../icons/icons-dictionary.svelte';
	import Label from '../ui/label/label.svelte';
	let { selectedTemplate = $bindable() }: { selectedTemplate: string } = $props();
</script>

<div class="space-y-2">
	<Label for="pipeline-template">Template</Label>
	<div class="grid grid-cols-2 gap-2">
		{#each PIPELINES_TEMPLATE as template}
			{@const isSelected = selectedTemplate === template.key}
			<div
				tabindex={0}
				role="button"
				onclick={() => {
					selectedTemplate = template.key;
				}}
				onkeydown={(e) => {
					if (e.key === 'Enter') {
						selectedTemplate = template.key;
					}
				}}
				class={`rounded-lg border px-3 py-2.5 space-x-2 flex items-center text-sm cursor-pointer text-foreground ${isSelected ? 'bg-primary/10 text-primary border-primary' : ''}`}
			>
				<IconsDictionary key={template.key} size={16} weight="regular" />
				<span>{template.name}</span>
			</div>
		{/each}
	</div>
</div>

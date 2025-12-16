<script lang="ts">
	import type { ProcessorsNodeData } from '$core/processors/node.type';
	import { Handle, Position, useSvelteFlow, type Node, type NodeProps } from '@xyflow/svelte';
	import TextAA from 'phosphor-svelte/lib/TextAa';
	import Label from '$shadcn-components/label/label.svelte';
	import Input from '$shadcn-components/input/input.svelte';
	import Switch from '$shadcn-components/switch/switch.svelte';

	let { data: nodeData, isConnectable, id }: NodeProps<Node<ProcessorsNodeData>> = $props();

	const { updateNodeData } = useSvelteFlow();

	function updateFieldValue(fieldKey: string, newValue: string | boolean) {
		const updatedFields = nodeData.fields.map((field) =>
			field.key === fieldKey ? { ...field, value: newValue } : field
		);
		updateNodeData(id, { ...nodeData, fields: updatedFields });
	}
</script>

<div class="bg-card rounded-lg w-[300px] border-[1px] border-border">
	<div class="font-medium py-3 border-border/50 border-b px-4 space-y-1 relative">
		<Handle type="target" position={Position.Left} {isConnectable} />
		<div class="flex items-center space-x-2">
			<TextAA class="w-4 h-4 text-data-transformation " />
			<p>{nodeData.label}</p>
		</div>
		<p class="text-xs text-muted-foreground">{nodeData.description}</p>
	</div>
	<div class="p-4 space-y-4">
		{#each nodeData.fields as field (`${field.key}-${id}`)}
			<div class="space-y-2">
				{#if field.type === 'string'}
					<div class="space-y-1">
						<Label for={field.key} class="text-xs  font-medium text-foreground">{field.label}</Label
						>
						<Input
							class="bg-card py-2 px-3 rounded-md text-sm!"
							placeholder="Enter value"
							name={field.key}
							value={field.value}
							oninput={(e) => updateFieldValue(field.key, e.currentTarget.value)}
						/>
					</div>
				{/if}
				{#if field.type === 'boolean'}
					<div class="flex items-center justify-between">
						<Label for={field.key} class="text-xs  font-medium text-foreground">{field.label}</Label
						>
						<Switch
							checked={field?.value?.toString() === 'true' || false}
							onCheckedChange={(e) => {
								updateFieldValue(field.key, e);
							}}
						/>
					</div>
				{/if}
				{#if field.type === 'node'}
					<div class="flex items-center justify-between relative">
						<Label for={field.key} class="text-xs  font-medium text-foreground">{field.label}</Label
						>
						<Handle
							type="source"
							id={`${id}-conditional-source`}
							class="left-[275px] bg-conditional! border-conditional! "
							{isConnectable}
							position={Position.Right}
						/>
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

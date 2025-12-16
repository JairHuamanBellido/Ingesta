<script lang="ts">
	import { Handle, Position, useSvelteFlow, type Node, type NodeProps } from '@xyflow/svelte';
	import { ListPlus } from '@lucide/svelte';
	import Label from '$shadcn-components/label/label.svelte';
	import Input from '$shadcn-components/input/input.svelte';
	import { Root, Item, Trigger, Content } from '$shadcn-components/accordion/index.js';
	import Switch from '$shadcn-components/switch/switch.svelte';
	import type { ProcessorsNodeData } from '$core/processors/node.type';

	let { data: nodeData, isConnectable, id }: NodeProps<Node<ProcessorsNodeData>> = $props();


	console.log(nodeData)
	const { updateNodeData } = useSvelteFlow();

	const requiredFields = $derived(
		nodeData.fields.filter((field: { required: boolean }) => field.required)
	);
	const optionalFields = $derived(
		nodeData.fields.filter((field: { required: boolean }) => !field.required)
	);

	function updateFieldValue(fieldKey: string, newValue: string) {
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
			<ListPlus strokeWidth={1.5} class="w-4 h-4 text-foreground " />
			<p>Append</p>
		</div>
		<p class="text-xs text-muted-foreground">
			Adds values to an existing array field. If the field doesn't exist, it creates it.
		</p>
	</div>
	<div class="p-4 pb-0 space-y-4">
		{#each requiredFields as field (`${field.key}-${id}`)}
			<div class="space-y-2">
				<Label for={field.key} class="text-xs  font-medium text-foreground">{field.label}</Label>
				<Input
					class="bg-card py-2 px-3 rounded-md text-sm!"
					placeholder="Enter value"
					name={field.key}
					required
					value={field.value}
					oninput={(e) => updateFieldValue(field.key, e.currentTarget.value)}
				/>
			</div>
		{/each}
		<Root type="single">
			<Item value="item-1">
				<Trigger class="rounded-none py-1 mb-2">Optional fields</Trigger>
				<Content class="space-y-4">
					{#each optionalFields as field}
						{#if field.type === 'string'}
							<div class="space-y-1">
								<Label for={field.key} class="text-xs  font-medium text-foreground"
									>{field.label}</Label
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
								<Label for={field.key} class="text-xs  font-medium text-foreground"
									>{field.label}</Label
								>
								<Switch
									value={field.value}
									name={field.key}
									oninput={(e) => updateFieldValue(field.key, e.currentTarget.value)}
								/>
							</div>
						{/if}
					{/each}
				</Content>
			</Item>
		</Root>
	</div>
</div>

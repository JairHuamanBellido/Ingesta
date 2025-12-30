<script lang="ts">
	import { Handle, Position, useSvelteFlow, type Node, type NodeProps } from '@xyflow/svelte';
	import ArrowsSplit from 'phosphor-svelte/lib/ArrowsSplit';
	import Input from '$shadcn-components/input/input.svelte';
	import Label from '$shadcn-components/label/label.svelte';
	import type { ConditionalNodeData } from '$core/processors/node.type';
	import { hasUnsavedChanges } from '@/stores/dirty';

	let { data: nodeData, isConnectable, id }: NodeProps<Node<ConditionalNodeData>> = $props();

	const { updateNodeData } = useSvelteFlow();

	function updateFieldValue(fieldKey: string, newValue: string) {
		updateNodeData(id, { ...nodeData, [fieldKey]: newValue });
		$hasUnsavedChanges = true;
	}
</script>

<div class="bg-card rounded-lg w-[300px] border-[1px] border-border conditional-node">
	<div class="font-medium py-3 border-border/50 border-b px-4 space-y-1 relative">
		<Handle
			id="node-conditional-target-handle"
			class="bg-conditional!"
			type="target"
			position={Position.Left}
			{isConnectable}
		/>
		<div class="flex items-center space-x-2">
			<ArrowsSplit size={20} color="var(--conditional)" />
			<p>Conditional</p>
		</div>
		<p class="text-xs text-muted-foreground">Conditional Group</p>
	</div>
	<div class="p-4 space-y-4">
		<div class="space-y-1">
			<Label for="condition" class="text-xs  font-medium text-foreground">Condition</Label>
			<Input
				class="bg-card py-2 px-3 rounded-md text-sm!"
				placeholder="ctx.name != 'jhon'"
				name="condition"
				value={nodeData.condition}
				oninput={(e) => updateFieldValue('condition', e.currentTarget.value)}
			/>
		</div>
	</div>
</div>

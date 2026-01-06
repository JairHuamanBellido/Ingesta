<script lang="ts">
	import type { ProcessorsNodeData } from '$core/processors/node.type';
	import {
		Handle,
		Position,
		useNodeConnections,
		useSvelteFlow,
		type Node,
		type NodeProps
	} from '@xyflow/svelte';
	import Label from '$shadcn-components/label/label.svelte';
	import Input from '$shadcn-components/input/input.svelte';
	import Switch from '$shadcn-components/switch/switch.svelte';
	import IconsDictionary from '../icons/icons-dictionary.svelte';
	import { nodeStore } from '@/stores/nodeStore';
	import Button from '../ui/button/button.svelte';
	import Trash from 'phosphor-svelte/lib/Trash';
	import Plus from 'phosphor-svelte/lib/Plus';
	import { hasUnsavedChanges } from '@/stores/dirty';

	let props: NodeProps<Node<ProcessorsNodeData>> = $props();

	const { updateNodeData } = useSvelteFlow();
	let patternsCount = $state(0);
	$effect(() => {
		patternsCount = Object.keys(
			(props.data.fields.find((f) => f.key === 'patterns')?.value || {}) as {
				[key: string]: string;
			}
		).length;
	});
	const connectionsConditionals = useNodeConnections({
		handleType: 'source',
		handleId: `node-processor-${props.id}-conditional-source`
	});

	function updateFieldValue(
		fieldKey: string,
		newValue: string | boolean | Array<string> | { key: string; value: string }[]
	) {
		const updatedFields = props.data.fields.map((field) =>
			field.key === fieldKey
				? {
						...field,
						value: newValue
					}
				: field
		);

		updateNodeData(props.id, { ...props.data, fields: updatedFields });
		$hasUnsavedChanges = true;
	}

	const connectionsConditionalsCount = $derived(connectionsConditionals.current.length);
	let targetNodeStore = $derived($nodeStore[props.id]);
</script>

<div class={`bg-card rounded-lg w-[300px] border-[1px] border-border ${props.data.groupKey}`}>
	<div class="font-medium py-3 border-border/50 border-b px-4 space-y-1 relative">
		<Handle
			id={`node-processor-${props.id}-target-handle`}
			type="target"
			position={Position.Left}
			isConnectable={props.isConnectable}
		/>
		<div class="flex items-center space-x-2">
			<IconsDictionary
				style={`color: var(--${props.data.groupKey})`}
				key={props.data.key}
				weight="regular"
				size={20}
			/>
			<p>{props.data.label}</p>
		</div>
		<p class="text-xs text-muted-foreground">{props.data.description}</p>
	</div>
	<div class="p-4 space-y-4">
		{#each props.data.fields as field (`${field.key}-${props.id}`)}
			{@const hasError = targetNodeStore && targetNodeStore[field.key]?.hasError}
			<div class="space-y-2">
				{#if field.type === 'string'}
					<div class="space-y-1">
						<Label
							for={field.key}
							class={`text-xs  font-medium text-foreground ${hasError && 'text-red-500'}`}
							>{field.label}</Label
						>
						<Input
							class={`bg-card py-2 px-3 rounded-md text-sm! ${hasError && 'border-red-500'}`}
							placeholder="Enter value"
							name={field.key}
							value={field.value}
							oninput={(e) => updateFieldValue(field.key, e.currentTarget.value)}
						/>
						{#if hasError}
							<p class="text-xs text-red-500">Please enter a value</p>
						{/if}
					</div>
				{/if}
				{#if field.type === 'array'}
					<div class="space-y-1">
						<div class="flex items-center justify-between">
							<Label
								for={field.key}
								class={`text-xs font-medium text-foreground ${hasError && 'text-red-500'}`}
								>{field.label}</Label
							>
							<Button
								size="sm"
								variant="ghost"
								class="lg:text-xs! p-2! text-primary hover:bg-transparent! hover:text-primary"
								onclick={() => {
									if (field.value) {
										updateFieldValue(field.key, [...(field.value as string[]), '']);
									} else {
										updateFieldValue(field.key, ['']);
									}
								}}
							>
								<Plus />
								Add
							</Button>
						</div>
						<div class="flex flex-col space-y-4">
							{#each (field.value as Array<unknown>) || field.defaultValue as pattern, index}
								<div class="flex space-x-2 items-center">
									<Input
										oninput={(e) => {
											if (field.value) {
												updateFieldValue(
													field.key,
													(field.value as string[]).map((p, i) =>
														i === index ? e.currentTarget.value : p
													)
												);
											} else {
												updateFieldValue(field.key, [e.currentTarget.value]);
											}
										}}
										value={pattern}
										class={`bg-card ${hasError && index === 0 && 'border-red-500'}`}
										placeholder={`^%{IPORHOST:clientip}`}
									/>
									{#if index > 0}
										<Button
											size="sm"
											variant="ghost"
											onclick={() => {
												updateFieldValue(
													field.key,
													(field.value as string[]).filter((_, i) => i !== index)
												);
											}}
										>
											<Trash />
										</Button>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}
				{#if field.type === 'boolean'}
					<div class="flex items-center justify-between">
						<Label
							for={field.key}
							class={`text-xs  font-medium text-foreground ${hasError && 'text-red-500'}`}
							>{field.label}</Label
						>
						<Switch
							checked={field?.value?.toString() === 'true' || false}
							onCheckedChange={(e) => {
								updateFieldValue(field.key, e);
							}}
						/>
						{#if hasError}
							<p class="text-xs text-red-500">Please enter a value</p>
						{/if}
					</div>
				{/if}
				{#if field.type === 'object'}
					<div class="space-y-1">
						<div class="flex items-center justify-between">
							<Label for={field.key} class="text-xs  font-medium text-foreground "
								>{field.label}</Label
							>
							<Button
								size="sm"
								variant="ghost"
								class="lg:text-xs! p-2! text-primary hover:bg-transparent! hover:text-primary"
								onclick={() => {
									if (field.value) {
										updateFieldValue(field.key, [
											...(field.value as { key: string; value: string }[]),
											{ key: '', value: '' }
										]);
									} else {
										updateFieldValue(field.key, [{ key: '', value: '' }]);
									}
								}}
							>
								<Plus />
								Add
							</Button>
						</div>
						<div class="flex flex-col space-y-4">
							{#each field.value as { key: string; value: string }[] as pattern, index}
								<div class="flex items-center space-x-2">
									<Input
										oninput={(e) => {
											updateFieldValue(
												field.key,
												(field.value as { key: string; value: string }[]).map((p, i) =>
													i === index ? { ...p, key: e.currentTarget.value } : p
												)
											);
										}}
										value={pattern.key}
										class="bg-card"
										placeholder="NUMBER"
									/>
									<Input
										oninput={(e) =>
											updateFieldValue(
												field.key,
												(field.value as { key: string; value: string }[]).map((p, i) =>
													i === index ? { ...p, value: e.currentTarget.value } : p
												)
											)}
										value={pattern.value}
										class={'bg-card'}
										placeholder={`REGEX (\\d{3,4})`}
									/>
									<Button
										size="sm"
										variant="ghost"
										onclick={() => {
											updateFieldValue(
												field.key,
												(field.value as { key: string; value: string }[]).filter(
													(_, i) => i !== index
												)
											);
										}}
									>
										<Trash />
									</Button>
								</div>
							{/each}
						</div>
					</div>
				{/if}
				{#if field.type === 'node'}
					<div class="flex items-center justify-between relative">
						<Label for={field.key} class="text-xs  font-medium text-foreground">{field.label}</Label
						>
						{#if field.key === 'if'}
							<Handle
								type="source"
								id={`node-processor-${props.id}-conditional-source`}
								class="left-[267px] bg-conditional! border-[1.5px] border-background! "
								isConnectable={connectionsConditionalsCount < 1}
								position={Position.Right}
							/>
						{/if}
						{#if field.key === 'on_failure'}
							<Handle
								type="source"
								id={`node-processor-${props.id}-on-failure-source`}
								class="left-[267px] "
								position={Position.Right}
							/>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

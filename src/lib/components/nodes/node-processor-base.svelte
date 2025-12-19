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
	import * as Select from '$shadcn-components/select/index.js';
	import IconsDictionary from '../icons/icons-dictionary.svelte';
	import { nodeStore } from '@/stores/nodeStore';
	import * as Tooltip from '$shadcn-components/tooltip/index.js';
	import Info from 'phosphor-svelte/lib/Info';
	import DateFormatMultiSelect from '../date/date-format-multi-select.svelte';

	let props: NodeProps<Node<ProcessorsNodeData>> = $props();

	const { updateNodeData } = useSvelteFlow();
	const connectionsConditionals = useNodeConnections({
		handleType: 'source',
		handleId: `node-processor-${props.id}-conditional-source`
	});

	let selectedOption = $state('Select an option');

	function updateFieldValue(fieldKey: string, newValue: string | boolean | Array<string>) {
		const updatedFields = props.data.fields.map((field) =>
			field.key === fieldKey ? { ...field, value: newValue } : field
		);

		updateNodeData(props.id, { ...props.data, fields: updatedFields });
	}

	const connectionsConditionalsCount = $derived(connectionsConditionals.current.length);
	let targetNodeStore = $derived($nodeStore[props.id]);
</script>

{#snippet tooltip(text: string, link: string)}
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger>
				<Info />
			</Tooltip.Trigger>
			<Tooltip.Content>
				<p>{text}</p>
				<a class="underline" href={link} target="_blank" rel="noopener noreferrer">Link</a>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
{/snippet}

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

				{#if field.key === 'formats'}
					<div class="space-y-1">
						<div class="flex items-center space-x-1">
							<Label
								for={field.key}
								class={`text-xs  font-medium text-foreground ${hasError && 'text-red-500'}`}
								>{field.label}</Label
							>
							{#if field.helperText}
								{@render tooltip(field.helperText.text, field.helperText.link)}
							{/if}
						</div>
						<DateFormatMultiSelect {field} {updateFieldValue} {hasError} id={props.id} />
						{#if hasError}
							<p class="text-xs text-red-500">Please enter a value</p>
						{/if}
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
				{#if field.type === 'select'}
					{@const options = (field as any).value}
					<div class="space-y-1">
						<Label
							for={field.key}
							class={`text-xs  font-medium text-foreground ${hasError && 'text-red-500'}`}
							>{field.label}</Label
						>
						<Select.Root
							type="single"
							value={field.value as string}
							onValueChange={(value) => {
								selectedOption = value;
								updateFieldValue(field.key, value);
							}}
						>
							<Select.Trigger
								class={`bg-card py-2 px-3 w-full rounded-md text-sm! ${hasError && 'border-red-500'}`}
								placeholder="Select an option"
								name={field.key}
							>
								{options || selectedOption}
							</Select.Trigger>
							<Select.Content>
								{#each (field as any).options as option}
									<Select.Item value={option}>{option}</Select.Item>
								{/each}
							</Select.Content>
						</Select.Root>
						{#if hasError}
							<p class="text-xs text-red-500">Please enter a value</p>
						{/if}
					</div>
				{/if}
			</div>
		{/each}
	</div>
</div>

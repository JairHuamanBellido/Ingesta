<script lang="ts">
	import { DATE_FORMAT_LIST } from '$core/processors/date/date-format-list';
	import * as Select from '$shadcn-components/select/index.js';
	import Input from '$shadcn-components/input/input.svelte';
	import Button from '../ui/button/button.svelte';
	let {
		field,
		updateFieldValue,
		hasError,
		id
	}: { field: any; updateFieldValue: any; hasError: any; id: string } = $props();
</script>

<Select.Root
	type="multiple"
	value={(field.value as string[]) || []}
	onValueChange={(value) => {
		updateFieldValue(field.key, value);
	}}
>
	<Select.Trigger
		class={`bg-card py-2 px-3 w-full text-ellipsis overflow-x-auto rounded-md text-sm! ${hasError && 'border-red-500'}`}
		placeholder="Select an option"
		name={field.key}
	>
		{((field.value as string[]) || []).length > 0
			? `${field.value.length} selected`
			: 'Select an option'}
	</Select.Trigger>
	<Select.Content>
		<div class="flex items-center space-x-2 px-1">
			<Input
				id={`custom-format-date-input-${id}-${field.key}`}
				placeholder="Custom Format yyyy/MM/dd"
			/>
			<Button
				onclick={() => {
					const input = document.getElementById(
						`custom-format-date-input-${id}-${field.key}`
					) as HTMLInputElement;
					const value = input.value;
					if (value) {
						updateFieldValue(field.key, [...field.value, value]);
						input.value = '';
					}
				}}>+</Button
			>
		</div>
		{#if ((field.value as string[]) || []).filter((value) => !DATE_FORMAT_LIST.includes(value)).length > 0}
			<p class="text-muted-foreground text-xs mt-2 px-1">Custom Formats</p>
			{#each ((field.value as string[]) || []).filter((value) => !DATE_FORMAT_LIST.includes(value)) as custom_date_format}
				<Select.Item value={custom_date_format}>{custom_date_format}</Select.Item>
			{/each}
		{/if}
		<p class="text-muted-foreground text-xs mt-2 px-1">OR</p>
		{#each DATE_FORMAT_LIST as date_format}
			<Select.Item value={date_format}>{date_format}</Select.Item>
		{/each}
	</Select.Content>
</Select.Root>

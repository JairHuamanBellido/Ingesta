<script lang="ts">
	import axios from 'axios';
	import * as Dialog from '$shadcn-components/dialog/index.js';
	import { buttonVariants } from '@/components/ui/button';
	import Button from '@/components/ui/button/button.svelte';
	import Input from '@/components/ui/input/input.svelte';
	import Label from '@/components/ui/label/label.svelte';
	import { toast } from 'svelte-sonner';
	import SpinnerGap from 'phosphor-svelte/lib/SpinnerGap';
	import { delay } from '@/utils';
	let loading = $state(false);
	let isOpen = $state(false);
    let  { onCreated }: { onCreated: () => void } = $props();

	const onSubmit = async (e: SubmitEvent) => {
		e.preventDefault();
		loading = true;
		try {
            await delay(1500);
            const formData = new FormData(e.target as HTMLFormElement);

            const name = formData.get('name') as string;
            const description = formData.get('description') as string;
            const response = await axios.post(`/machine-learning/model-groups`, {
                name,
                description
            });

            if (response.status !== 200) {
                console.error(response.data);
                toast.error(response.data.message);
                return;
            }
            
            toast.success('Model group created successfully');
			onCreated();
            isOpen = false;
		} catch (error) {
			console.error(error);
			toast.error('Failed to create model group');
		} finally {
			loading = false;
		}
	};
</script>

<Dialog.Root bind:open={isOpen}>
	<Dialog.Trigger class={buttonVariants({ variant: 'default' })}>+ Create</Dialog.Trigger>
	<Dialog.Content class="">
		<Dialog.Header>
			<Dialog.Title>Create Model Group</Dialog.Title>
			<Dialog.Description>Create a new model group</Dialog.Description>
		</Dialog.Header>

		<form class="space-y-4" onsubmit={onSubmit}>
			<div class="space-y-2">
				<Label for="name">Name</Label>
				<Input id="name" name="name" type="text" required placeholder="First model group" />
			</div>
			<div class="space-y-2">
				<Label for="description"
					>Description <span class="text-muted-foreground">(Optional)</span></Label
				>
				<Input
					id="description"
					name="description"
					type="text"
					placeholder="Description of the model group"
				/>
			</div>
			<Button type="submit" disabled={loading}>
				{#if loading}
					<SpinnerGap class="animate-spin" size={16} />
					<span>Loading...</span>
				{:else}
					Create
				{/if}
			</Button>
		</form>
	</Dialog.Content>
</Dialog.Root>

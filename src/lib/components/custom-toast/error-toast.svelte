<script lang="ts">
	import WarningCircle from 'phosphor-svelte/lib/WarningCircle';
	let { title, description, code }: { title: string; description: string; code: string } = $props();
</script>

<div
	class="rounded-lg w-[356px] border-destructive p-4 border bg-destructive/5 dark:bg-destructive/15 text-base flex items-start space-x-2"
>
	<div class="size-6 relative text-red-600 dark:text-red-300">
		<WarningCircle size={24} weight="regular" />
	</div>
	<div class=" relative max-w-[300px] flex flex-col space-y-2">
		<p class="dark:text-red-300 text-red-600">{title}</p>
		<p class=" text-sm text-red-900 dark:text-red-100">{description}</p>
		<p class="font-mono text-sm bg-destructive/20 px-2 py-1 rounded w-fit">Code: {code}</p>
	</div>
</div>

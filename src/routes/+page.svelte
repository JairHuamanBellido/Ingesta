<script>
	import FlowBuilder from '$lib/components/flow-builder/index.svelte';
	import Sidebar from '$lib/components/sidebar/index.svelte';
</script>

<div class="w-screen h-screen overflow-hidden relative flex">
	<Sidebar />
	<div class="flex-1 flex flex-col" >
        <div class="h-16 border-b border-border/50 flex items-center px-4 bg-white dark:bg-background">
            Header
        </div>
		<FlowBuilder />
	</div>
</div>

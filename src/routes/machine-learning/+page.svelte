<script lang="ts">
	import * as Tabs from '$lib/components/ui/tabs/index.js';
</script>

<div class="flex flex-col space-y-4 w-full max-w-[1440px] mx-auto py-12">
	<div class="flex items-center justify-between h-[104px]">
		<div>
			<h1 class="text-2xl font-semibold">Machine Learning</h1>
			<p class="text-muted-foreground">Manage your OpenSearch Machine Learning</p>
		</div>
	</div>
	<Tabs.Root value="ml-connectors">
		<Tabs.List>
			<Tabs.Trigger value="ml-connectors">ML Connectors</Tabs.Trigger>
			<Tabs.Trigger value="model-groups">Model Groups</Tabs.Trigger>
		</Tabs.List>
		<Tabs.Content value="ml-connectors">Content for ML Connectors</Tabs.Content>
		<Tabs.Content value="model-groups">Content for Model Groups</Tabs.Content>
	</Tabs.Root>
</div>

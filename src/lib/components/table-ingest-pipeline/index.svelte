<script lang="ts">
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import Button from '$lib/components/ui/button/button.svelte';
	import DropSlash from 'phosphor-svelte/lib/DropSlash';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircle';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import PencilSimple from 'phosphor-svelte/lib/PencilSimple';
	import DotsThreeVertical from 'phosphor-svelte/lib/DotsThreeVertical';
	import Trash from 'phosphor-svelte/lib/Trash';
	let { pipelines }: { pipelines: IPipeline[] } = $props();
</script>

<div class=" rounded-lg border overflow-hidden">
	<Table.Root>
		<Table.Header>
			<Table.Row class="bg-muted">
				<Table.Head class="px-6 py-3 font-medium text-muted-foreground">PIPELINE NAME</Table.Head>
				<Table.Head class="px-6 py-3 font-medium text-muted-foreground max-w-[200px]"
					>DESCRIPTION</Table.Head
				>
				<Table.Head class="px-6 py-3 font-medium text-muted-foreground">DEPLOYMENT LOGS</Table.Head>
				<Table.Head class="px-6 py-3 font-medium text-muted-foreground">PROCESSORS</Table.Head>
				<Table.Head class="px-6 py-3 font-medium text-muted-foreground">TESTS</Table.Head>
				<Table.Head class="px-6 py-3 font-medium text-muted-foreground">ACTIONS</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each pipelines as pipeline}
				<Table.Row>
					<Table.Cell class="px-6 py-4">
						<p class="font-medium text-base">{pipeline.name}</p>
						<p class="text-xs text-muted-foreground font-mono">{pipeline.key}</p>
					</Table.Cell>
					<Table.Cell class="px-6 py-4 max-w-[200px] ">
						{#if pipeline.description}
							<p class="text-wrap">{pipeline.description}</p>
						{:else}
							<span class="text-muted-foreground">No description</span>
						{/if}
					</Table.Cell>
					<Table.Cell class="px-6 py-4">
						{#if pipeline.deployment_logs_index_name}
							<p
								class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border bg-green-50 text-green-700 border-green-200 dark:bg-green-800/20 dark:text-green-400 dark:border-green-800"
							>
								<CheckCircle size={16} />
								<span>Enabled</span>
							</p>
						{:else}
							<p
								class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border bg-muted/20 text-muted-foreground border-muted-foreground/20 dark:border-muted"
							>
								<DropSlash size={16} />
								<span>Disabled</span>
							</p>
						{/if}
					</Table.Cell>
					<Table.Cell class="px-6 py-4">{pipeline.processors.length}</Table.Cell>
					<Table.Cell class="px-6 py-4">{pipeline.tests.length}</Table.Cell>
					<Table.Cell class="px-6 py-4">
						<Button variant="ghost" class="text-muted-foreground hover:bg-transparent!">
							<PencilSimple size={16} />
						</Button>
						<Button
							href={`/pipelines/${pipeline.key}`}
							variant="ghost"
							class="text-muted-foreground hover:bg-transparent!"
						>
							<ArrowRight size={16} />
						</Button>
						<DropdownMenu.Root>
							<DropdownMenu.Trigger>
								<Button variant="ghost" class="text-muted-foreground hover:bg-transparent!">
									<DotsThreeVertical weight="bold" size={16} />
								</Button>
							</DropdownMenu.Trigger>
							<DropdownMenu.Content>
								<DropdownMenu.Item
									class="dark:text-red-300 dark:hover:text-red-300! dark:hover:bg-red-900/20! text-red-600 hover:text-red-600! hover:bg-red-50!"
								>
									<Trash class="dark:text-red-300 text-red-600" size={16} />
									<span> Delete</span>
								</DropdownMenu.Item>
							</DropdownMenu.Content>
						</DropdownMenu.Root>
					</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>

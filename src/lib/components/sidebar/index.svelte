<script lang="ts">
	import { useDnD } from '../flow-builder/dnd-provider.svelte';
	import { GripVertical } from '@lucide/svelte';

	import { Root, Item, Trigger, Content } from '$shadcn-components/accordion/index.js';
	import { PROCESSORS_BY_CATEGORY, PROCESSORS } from '$core/processors/list-processors';
	import IconsDictionary from '../icons/icons-dictionary.svelte';
	const type = useDnD();

	const processors = $derived(PROCESSORS);
	const onDragStart = (event: DragEvent, nodeType: string) => {
		if (!event.dataTransfer) {
			return null;
		}

		type.current = nodeType;

		type.data = structuredClone(processors).find((p) => p.type === nodeType);
		event.dataTransfer.effectAllowed = 'move';
	};
</script>

<div
	class="w-[300px] bg-white h-full border-border/50 border-r dark:bg-background px-4 py-8 overflow-auto"
>
	<div class="nodes-list">
		<p class="font-semibold text-lg mb-4">Processors</p>
		<ul class="space-y-2">
			{#each PROCESSORS_BY_CATEGORY as category(`sidebar-${category.key}`)}
				<Root value={[category.key]} type="multiple">
					<Item value={category.key}>
						<Trigger class="flex items-center hover:no-underline cursor-pointer">
							<div class="flex items-center space-x-2">
								<IconsDictionary
									key={category.key}
									size={20}
									weight="duotone"
									style={`fill:${category.color}`}
								/>
								<p>{category.label}</p>
								<p class="bg-muted rounded-full py-0.5 px-2 text-xs text-muted-foreground">
									{category.processors.length}
								</p>
							</div>
						</Trigger>
						<Content class="space-y-4">
							{#each category.processors as processor(`sidebar-processor-${processor.type}`)}
								<div
									class="w-full group border rounded-lg hover:bg-muted py-2 px-3 cursor-grab flex items-center justify-between"
									draggable="true"
									ondragstart={(event) => onDragStart(event, processor.type)}
									role="button"
									tabindex={1}
								>
									<div class="flex items-start space-x-2">
										<div class="size-8 flex items-center justify-center rounded">
											<IconsDictionary key={processor.key} size={20} weight="duotone" />
										</div>
										<div class="flex-1">
											<p>{processor.label}</p>
											<p class="text-xs text-muted-foreground">{processor.description}</p>
										</div>
									</div>
									<GripVertical
										class="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
									/>
								</div>
							{/each}
						</Content>
					</Item>
				</Root>
			{/each}
		</ul>
	</div>
</div>

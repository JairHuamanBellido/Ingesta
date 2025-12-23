<script lang="ts">
	import { Handle, Position, type Node, type NodeProps, useNodeConnections } from '@xyflow/svelte';

	let props: NodeProps<Node<any>> = $props();

	const connections = useNodeConnections({ id: props.id, handleId: 'source-handle' });

	const isConnected = $derived(connections.current.length > 0);
</script>

<div class="bg-card px-8 py-2 text-foreground rounded-lg border-[1px] border-border">
	<p>Ingestion</p>

	<Handle
		class={isConnected ? ['node-connected'] : []}
		id="node-start-source-handle"
		type="source"
		position={Position.Right}
		isConnectable={props.isConnectable}
	/>
</div>

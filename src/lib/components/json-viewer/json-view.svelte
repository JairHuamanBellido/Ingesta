<script lang="ts">
	let { json }: { json: JSON } = $props();
</script>

<pre
	class="font-mono text-sm border bg-transparent dark:bg-input/30 rounded-lg p-4 overflow-auto"><code
		>{JSON.stringify(json, null, 2)}</code
	></pre>

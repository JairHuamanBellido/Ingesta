<script module>
	import { getContext } from 'svelte';

	export const useDnD = (): any => {
		return getContext('dnd');
	};
</script>

<script lang="ts">
	import { onDestroy, setContext, type Snippet } from 'svelte';

	let { children }: { children: Snippet } = $props();

	let dndType = $state(null);

	setContext('dnd', {
		set current(value) {
			dndType = value;
		},
		get current() {
			return dndType;
		}
	});

	onDestroy(() => {
		if (dndType) {
			(dndType as unknown as { set: (value: string | null) => void }).set(null);
		}
	});
</script>

{@render children()}

import { writable } from 'svelte/store';

interface NodeStore {
	[nodeId: string]: {
		[key: string]: {
			hasError: boolean;
		};
	};
}

function createStore() {
	const { set, subscribe, update } = writable<NodeStore>({});

	return {
		clear: () => update(() => ({})),
		subscribe,
		update,
		set
	};
}

export const nodeStore = createStore();

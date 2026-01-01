import { writable } from 'svelte/store';

export const hasUnsavedChanges = writable<boolean>(false);

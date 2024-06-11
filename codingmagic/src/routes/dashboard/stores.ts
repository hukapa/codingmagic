// stores.ts
import { writable } from 'svelte/store';
export const coursesStore = writable<any[]>([]); // Explicitly type the store as an array of any

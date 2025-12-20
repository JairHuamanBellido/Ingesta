<script lang="ts">
	import ListPlusIcon from 'phosphor-svelte/lib/ListPlus';
	import Sparkle from 'phosphor-svelte/lib/Sparkle';
	import ArrowsClockWise from 'phosphor-svelte/lib/ArrowsClockwise';
	import Scan from 'phosphor-svelte/lib/Scan';
	import Funnel from 'phosphor-svelte/lib/Funnel';
	import Gear from 'phosphor-svelte/lib/Gear';
	import PencilSimple from 'phosphor-svelte/lib/PencilSimple';
	import CopySimple from 'phosphor-svelte/lib/CopySimple';
	import TextAA from 'phosphor-svelte/lib/TextAa';
	import PencilSimpleLine from 'phosphor-svelte/lib/PencilSimpleLine';
	import ArrowsSplit from 'phosphor-svelte/lib/ArrowsSplit';
	import ArrowRight from 'phosphor-svelte/lib/ArrowRight';
	import Swap from 'phosphor-svelte/lib/Swap';
	import ArrowUp from 'phosphor-svelte/lib/ArrowUp';
	import GitFork from 'phosphor-svelte/lib/GitFork';
	import Backspace from 'phosphor-svelte/lib/Backspace';
	import ArrowSquareRight from 'phosphor-svelte/lib/ArrowSquareRight';
	import BracketsCurly from 'phosphor-svelte/lib/BracketsCurly';
	import FileCSV from 'phosphor-svelte/lib/FileCsv';
	import CalendarBlank from 'phosphor-svelte/lib/CalendarBlank';
	import Browser from 'phosphor-svelte/lib/Browser';
	import Drop from 'phosphor-svelte/lib/Drop';
	import Trash from 'phosphor-svelte/lib/Trash';
	import ExclamationMark from 'phosphor-svelte/lib/ExclamationMark';
	import Fingerprint from 'phosphor-svelte/lib/Fingerprint';
	import Binary from 'phosphor-svelte/lib/Binary';
	import FlowArrow from 'phosphor-svelte/lib/FlowArrow';
	import type { IconWeight } from 'phosphor-svelte';

	const IconsPerSection = {
		'data-enrichment': Sparkle,
		'data-transformation': ArrowsClockWise,
		'parsing-and-extraction': Scan,
		'filtering-and-cleanup': Funnel,
		advanced: Gear,
		append: ListPlusIcon,
		uppercase: ArrowUp,
		set: PencilSimple,
		copy: CopySimple,
		rename: PencilSimpleLine,
		conditional: ArrowsSplit,
		convert: ArrowRight,
		gsub: Swap,
		lowercase: TextAA,
		split: GitFork,
		trim: Backspace,
		pipeline: FlowArrow,
		grok: ArrowSquareRight,
		json: BracketsCurly,
		csv: FileCSV,
		date: CalendarBlank,
		user_agent: Browser,
		drop: Drop,
		remove: Trash,
		fail: ExclamationMark,
		fingerprint: Fingerprint,
		bytes: Binary
	};

	let {
		key,
		size = 20,
		style,
		weight = 'duotone',
		className = ''
	}: {
		key: string;
		size: number;
		style?: string;
		weight: IconWeight;
		className?: string;
	} = $props();
	const IconComponent = $derived(IconsPerSection[key as keyof typeof IconsPerSection]);
</script>

{#if IconComponent}
	<IconComponent {size} {style} {weight} class={className} />
{/if}

<script lang="ts">
	import { enhance } from '$app/forms';
	import type { IPipeline } from '$infrastructure/model/pipeline.model';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';
	import { Play, Copy, Check, ChevronDown, AlertCircle, CheckCircle2, Clock } from '@lucide/svelte';
	import { basic_template } from './simulation-list';

	type ResultType = 'success' | 'failure' | 'redirect' | 'error';

	interface SuccessResult {
		type: 'success';
		status: number;
		data: {
			statusCode: number;
			openSearchResponse: Object;
			request_duration: number;
			isSuccess: boolean;
		};
	}

	interface FailureResult {
		type: 'failure';
		status: number;
		data: { error: string };
	}

	interface RedirectResult {
		type: 'redirect';
		status: number;
		data: { url: string };
	}

	interface ErrorResult {
		type: 'error';
		status: number;
		data: { error: string };
	}

	interface Example {
		name: string;
		payload: string;
	}

	let { pipeline }: { pipeline: IPipeline } = $props();
	let loading = $state(false);
	let jsonPayload = $state(basic_template);
	let result = $state<SuccessResult | FailureResult | ErrorResult | RedirectResult | null>(null);
	let copiedInput = $state(false);
	let copiedOutput = $state(false);
	let showExamples = $state(false);

	// const examples: Example[] = [];

	const copyToClipboard = (text: string, type: 'input' | 'output') => {
		navigator.clipboard.writeText(text);
		if (type === 'input') {
			copiedInput = true;
			setTimeout(() => (copiedInput = false), 2000);
		} else {
			copiedOutput = true;
			setTimeout(() => (copiedOutput = false), 2000);
		}
	};

	const formatJSON = () => {
		try {
			const formatted = JSON.stringify(JSON.parse(jsonPayload), null, 2);
			jsonPayload = formatted;
		} catch (e) {
			// Invalid JSON, do nothing
		}
	};

	const clearPayload = () => {
		jsonPayload = '{\n  \n}';
		result = null;
	};

	const loadExample = (example: Example) => {
		jsonPayload = example.payload;
		showExamples = false;
		result = null;
	};
</script>

<div
	class="flex flex-col bg-card/50 backdrop-blur-lg border w-[500px] h-[85vh] absolute right-4 top-4 rounded-lg"
>
	<!-- Header -->
	<div class="flex items-center justify-between px-4 py-3 border-b dark:border-gray-800">
		<div class="flex items-center gap-2">
			<Play class="w-5 h-5 text-primary" />
			<h3 class="font-semibold text-gray-900 dark:text-gray-100">Pipeline Simulator</h3>
		</div>
	</div>

	<!-- Actions Bar -->
	<div class="flex items-center gap-2 px-4 py-2 border-b">
		<!-- <div class="relative">
			<button
				type="button"
				onclick={() => (showExamples = !showExamples)}
				class="flex items-center gap-1 px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded transition-colors"
			>
				Examples <ChevronDown class="w-3 h-3" />
			</button>
			{#if showExamples}
				<div
					class="absolute top-full left-0 mt-1 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-10"
				>
					{#each examples as example}
						<button
							type="button"
							onclick={() => loadExample(example)}
							class="w-full px-3 py-2 text-left text-sm hover:bg-gray-50 dark:hover:bg-gray-700 first:rounded-t-lg last:rounded-b-lg transition-colors"
						>
							{example.name}
						</button>
					{/each}
				</div>
			{/if}
		</div> -->
		<button
			type="button"
			onclick={formatJSON}
			class="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded transition-colors"
		>
			Format
		</button>
		<button
			type="button"
			onclick={clearPayload}
			class="px-3 py-1.5 text-sm text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded transition-colors"
		>
			Clear
		</button>
	</div>

	<div class="flex flex-col overflow-hidden">
		<!-- Input Section -->
		<div class="flex flex-col bg-muted">
			<div class="flex items-center justify-between px-4 py-2 border-b">
				<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Input Payload</span>
				<Button
					variant="ghost"
					onclick={() => copyToClipboard(jsonPayload, 'input')}
					class="flex items-center gap-1 px-2 h-6 py-1 text-xs rounded transition-colors text-muted-foreground"
				>
					{#if copiedInput}
						<Check class="w-3 h-3 text-green-600" />
						<span class="text-green-600">Copied</span>
					{:else}
						<Copy class="w-3! h-3!" />
						Copy
					{/if}
				</Button>
			</div>
		</div>

		<!-- Simulate Button -->
		<form
			method="POST"
			action="?/simulate"
			class="px-4 py-3 border-b border-border"
			use:enhance={({ formData }) => {
				loading = true;
				return async ({ update, result: response }) => {
					const type = response.type as ResultType;
					const status = response.status as number;
					const data = (response as unknown as { data: any }).data;
					result = {
						type,
						status,
						data
					};
					update({ reset: false });
					loading = false;
				};
			}}
		>
			<div class="flex-1 overflow-auto mb-4">
				<Textarea
					bind:value={jsonPayload}
					class="w-full h-full min-h-[200px] font-mono text-sm "
					placeholder="Enter your JSON payload here..."
					id="request-payload"
					name="request-payload"
					required
				/>
			</div>
			<Input type="hidden" name="pipelineId" value={pipeline.key} />
			<Button
				type="submit"
				disabled={loading}
				class="w-full flex items-center justify-center gap-2"
			>
				{#if loading}
					<div
						class="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"
					></div>
					Simulating...
				{:else}
					<Play class="w-4 h-4" />
					Simulate Pipeline
				{/if}
			</Button>
		</form>

		<!-- Output Section -->
		<div class="flex flex-col min-h-0">
			<div class="flex items-center justify-between px-4 py-2 border-b bg-muted">
				<div class="flex items-center gap-2">
					<span class="text-sm font-medium text-gray-700 dark:text-gray-300">Output</span>
					{#if result}
						<div class="flex items-center gap-2">
							{#if result.type === 'success'}
								<span
									class="flex items-center gap-1 px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 text-xs font-medium rounded-full"
								>
									<CheckCircle2 class="w-3 h-3" />
									{result.status} OK
								</span>
							{:else}
								<span
									class="flex items-center gap-1 px-2 py-0.5 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 text-xs font-medium rounded-full"
								>
									<AlertCircle class="w-3 h-3" />
									{result.status} ERROR
								</span>
							{/if}
							{#if result.type === 'success'}
								<span class="flex items-center text-muted-foreground gap-1 text-xs">
									<Clock class="w-3 h-3" />
									{result.data.request_duration}ms
								</span>
							{/if}
						</div>
					{/if}
				</div>
				{#if result}
					<Button
						variant="ghost"
						onclick={() =>
							copyToClipboard(
								JSON.stringify(
									result?.type === 'success' ? result.data.openSearchResponse : result?.data,
									null,
									2
								),
								'output'
							)}
						class="flex items-center h-6 gap-1 px-2! py-1! text-xs! text-muted-foreground transition-colors"
					>
						{#if copiedOutput}
							<Check class="w-3! h-3! text-green-600" />
							<span class="text-green-600">Copied</span>
						{:else}
							<Copy class="w-3! h-3!" />
							Copy
						{/if}
					</Button>
				{/if}
			</div>
			<div class="overflow-auto p-4">
				{#if result}
					{#if result.type === 'success'}
						<pre
							class="font-mono text-sm border bg-transparent dark:bg-input/30 rounded-lg p-4 overflow-auto"><code
								>{JSON.stringify(result.data.openSearchResponse, null, 2)}</code
							></pre>
					{:else}
						<pre class="font-mono text-sm bg-transparent rounded-lg p-4 overflow-auto"><code
								class="text-gray-800 dark:text-gray-200"
								>{JSON.stringify(result.data, null, 2)}</code
							></pre>
					{/if}
				{:else}
					<div class="flex items-center justify-center h-full text-gray-400 mt-8">
						<div class="text-center">
							<Play class="w-12 h-12 mx-auto mb-2 opacity-50" />
							<p class="text-sm">Run simulation to see output</p>
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>
</div>

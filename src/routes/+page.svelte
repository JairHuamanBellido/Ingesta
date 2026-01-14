<script lang="ts">
	import GitBranch from 'phosphor-svelte/lib/GitBranch';
	import Brain from 'phosphor-svelte/lib/Brain';
</script>

<div class="w-screen h-[100dvh] flex flex-col py-12 items-center">
	<div class="w-full max-w-[1440px] mx-auto space-y-12">
		<!-- Header-->
		<div>
			<h1 class="text-4xl font-bold">Welcome to Ingesta</h1>
			<p class="text-muted-foreground">
				Design and deploy OpenSearch pipelines with visual workflow builders
			</p>
		</div>

		<!-- Modules-->
		<div class="grid grid-cols-[repeat(auto-fill,minmax(300px,4fr))] gap-4">
			<a href="/pipelines" class="border border-border/50 rounded-lg p-4 space-y-4 cursor-pointer hover:border-border">
				<div class="bg-muted size-12 rounded-lg flex items-center justify-center">
					<GitBranch size={32} />
				</div>
				<div class="space-y-2">
					<h2 class="text-xl font-bold">Ingestion Pipelines</h2>
					<p class="text-muted-foreground">Transform and process data during indexing</p>
				</div>
			</a>
			<a href="/machine-learning" class="border border-border/50 rounded-lg p-4 space-y-4 cursor hover:border-border">
				<div class="bg-muted size-12 rounded-lg flex items-center justify-center">
					<Brain size={32}  />
				</div>
				<div class="space-y-2">
					<h2 class="text-xl font-bold">Machine Learning</h2>
					<p class="text-muted-foreground">ML Models and Inference</p>
				</div>
			</a>
		</div>
	</div>
</div>

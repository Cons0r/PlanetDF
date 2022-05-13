<script>
	import '../app.css';
	import { SvelteToast } from '@zerodevx/svelte-toast'
</script>

<svelte:head>
	<title>
		DFTools
	</title>
</svelte:head>
<div class="h-full bg-gray-50">
	<slot />
	<div id="wrap">
		<SvelteToast options={{ initial: 0, next: 0, intro: { y: -64 } }}></SvelteToast>
	</div>
</div>
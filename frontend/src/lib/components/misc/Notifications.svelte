<script lang="ts">
	import { notification } from '$lib/store';
	export let message: string = 'Message par defaut';
	export let type: string = 'success';

	$: if ($notification.show) {
		// scroll to top
		window.scrollTo(0, 0);
		setTimeout(() => {
			$notification.show = false;
		}, 3000);
	}
</script>

<section>
	{#if $notification.show}
		<div class="p-4">
			<div class="alert text-white {$notification.type} shadow-lg">
				<div>
					<span>{$notification.body}</span>
				</div>
			</div>
		</div>
	{/if}
</section>

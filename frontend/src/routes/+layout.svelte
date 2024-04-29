<script>
	import '../app.css';
	import { onMount } from 'svelte';
	import {currentUser, watchUserChange } from '../lib/store';
	import Notifications from '$lib/components/misc/Notifications.svelte';
	import { goto } from '$app/navigation';
	import { logout } from '../lib/utils/auth';
	import VerifyBanner from '../lib/components/account/VerifyBanner.svelte';

	onMount(async () => {
		if (!$currentUser) {
			goto('/account/login');
		}
		watchUserChange();
	});

</script>

<html lang="fr" data-theme="dark">
	<Notifications />
	{#if $currentUser}
	<body class="w-full min-h-screen h-screen">
		<div class="drawer lg:drawer-open">
			<input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
			<div class="drawer-content flex flex-col">
				<div class="flex justify-between p-1">
			  <label for="my-drawer-2" class="btn btn-primary drawer-button lg:hidden">Open drawer</label>
					 
				</div>
				<div class="p-4  h-full">
					<VerifyBanner />
					<slot />
				</div>
			
			</div> 
			<div class="drawer-side">
			  <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label> 
			  <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
				<!-- Sidebar content here -->
				<div class="flex items-center justify-center mb-8">
                    <p class="pl-4 uppercase text-1xl font-bold text-white">Alpaca Tinder</p>
                </div>
				<li><a on:click={logout}>Logout</a></li>
				
			  </ul>
			</div>
		  </div>
	</body>
	{:else}
		<slot/>
	{/if}

</html>

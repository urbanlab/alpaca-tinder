<script>
	import '../app.css';
	import { onDestroy, onMount } from 'svelte';
	import {currentUser, watchUserChange } from '../lib/store';
	import Notifications from '$lib/components/misc/Notifications.svelte';
	import { goto } from '$app/navigation';
	import { logout } from '../lib/utils/auth';
	import VerifyBanner from '../lib/components/account/VerifyBanner.svelte';
	import Fa from 'svelte-fa';
	import { faBars } from '@fortawesome/free-solid-svg-icons';

	onMount(() => {
		if (!$currentUser) {
			goto('/account/login');
		}
		//watchUserChange();
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
			  <label for="my-drawer-2" class="absolute btn btn-primary drawer-button lg:hidden"><Fa icon={faBars}/></label>
					 
				</div>
				<div class="h-full">
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

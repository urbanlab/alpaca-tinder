<script lang="ts">
	import Fa from 'svelte-fa';
	import { faEnvelope, faLock, faStore, faUser } from '@fortawesome/free-solid-svg-icons';
	import Title from '$lib/components/misc/Title.svelte';
	import { notification } from '$lib/store';
	import { signup } from '$lib/utils/auth';
	import PasswordStrength from '$lib/components/PasswordStrength.svelte';

	let password: string;
	let passwordConfirm: string;
	let email: string;
	let username: string;

	async function checkPassword(password: string, passwordConfirm: string) {
		if (!password || !passwordConfirm) {
			$notification = {
				body: 'Veuillez remplir tous les champs',
				type: 'alert-warning',
				show: true
			};
			return false;
		}
		// password does contain a space
		if (password.includes(' ')) {
			$notification = {
				body: "Le mot de passe ne doit pas contenir d'espace",
				type: 'alert-warning',
				show: true
			};
			return false;
		}
		if (password == passwordConfirm) {
			//is at least 8 characters
			if (password.length < 8) {
				$notification = {
					body: 'Le mot de passe doit contenir au moins 8 caractères',
					type: 'alert-warning',
					show: true
				};
				return false;
			}
			return true;
		}

		return false;
	}

	async function register() {
		console.log('register');
		const isPasswordValid = await checkPassword(password, passwordConfirm);
		console.log(isPasswordValid);
		if (isPasswordValid) {
			console.log('registering');
			await signup(username, email, password, passwordConfirm);
		}
	}
</script>

<section>
		<!--Disable form redirect-->
		<form on:submit|preventDefault class="space-y-4">
			<Title text={'Inscription'} />
			<div class="form-control w-full max-w-xs space-y-4">
				<!-- svelte-ignore a11y-label-has-associated-control -->
				<label class="flex items-center"
					><Fa icon={faUser} />
					<p class="ml-2">Nom utilisateur</p></label
				>
				<input
					type="text"
					placeholder="Votre Nom d'utilisateur"
					class="input input-bordered w-full max-w-xs"
					bind:value={username}
				/>
				<label class="flex items-center"
					><Fa icon={faEnvelope} />
					<p class="ml-2">Email</p></label
				>
				<input
					type="text"
					placeholder="Votre Email"
					class="input input-bordered w-full max-w-xs"
					bind:value={email}
				/>
				<label class="flex items-center"
					><Fa icon={faLock} />
					<p class="ml-2">Mot de passe</p></label
				>
				<input
					type="password"
					placeholder="Mot de passe"
					class="input input-bordered w-full max-w-xs"
					bind:value={password}
				/>
				<input
					type="password"
					placeholder="Confirmer le mot de passe"
					class="input input-bordered w-full max-w-xs"
					bind:value={passwordConfirm}
				/>
				<PasswordStrength {password} />

				<button
					type="submit"
					class="btn btn-primary"
					on:click={() => {
						register();
					}}>Create account</button
				>
			</div>
		</form>
</section>

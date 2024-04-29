<script>
	export let password;
	import checkPasswordStrength from 'check-password-strength';
	import Fa from 'svelte-fa';
	let strengthValue = 'faible';

	$: strength = checkPasswordStrength.passwordStrength(password);

	$: {
		if (strength.value == 'Too weak') {
			strengthValue = 'trop faible';
		}
		if (strength.value == 'Weak') {
			strengthValue = 'faible';
		}
		if (strength.value == 'Strong') {
			strengthValue = 'fort';
		}
	}
</script>

<div id="color-indicators">
	<span class="rounded-md" class:valid={strength.id >= 0} />
	<span class="rounded-md" class:valid={strength.id >= 1} />
	<span class="rounded-md" class:valid={strength.id >= 2} />
	<span class="rounded-md" class:valid={strength.id >= 3} />
</div>
<ul>
	<li class:valid={strength.contains.includes('lowercase')}>Au moins une minuscule</li>
	<li class:valid={strength.contains.includes('uppercase')}>Au moin une majuscule</li>
	<li class:valid={strength.contains.includes('number')}>Minimum 8 Caractères</li>
	<li class:valid={strength.contains.includes('symbol')}>Minimum un Caractère spécial</li>
</ul>
<h1>
	Votre mot de passe est {strengthValue}
</h1>

<style>
	#color-indicators {
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		column-gap: 0.2rem;
	}
	#color-indicators span {
		height: 5px;
	}
	span.valid:nth-child(1) {
		background-color: red;
	}
	span.valid:nth-child(2) {
		background-color: orange;
	}
	span.valid:nth-child(3) {
		background-color: yellow;
	}
	span.valid:nth-child(4) {
		background-color: green;
	}

	li.valid {
		color: green;
	}
</style>

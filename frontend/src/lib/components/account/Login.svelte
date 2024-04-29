<script lang="ts">
    import { login } from "$lib/utils/auth";
    let email = "";
    let password = "";
</script>

<section>
    <!--Disable form redirect-->
    <form on:submit|preventDefault class="space-y-4 p-4">
        <h2 class="text-4xl font-bold">Login into your account</h2>
        <div class="form-control max-w-xs space-y-4">
            <!-- svelte-ignore a11y-label-has-associated-control -->
            <input type="text" placeholder="Your Email" class="input input-bordered w-full max-w-xs" bind:value={email} />
            <input type="password" placeholder="Password" class="input input-bordered w-full max-w-xs" bind:value={password} />
            <button type="submit" class="btn btn-primary" on:click={login(email,password)} >Log in</button>
        </div>
    </form>
</section>
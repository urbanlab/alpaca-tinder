<script lang="ts">
	import Login from "../../../lib/components/account/Login.svelte";
	import Register from "../../../lib/components/account/Register.svelte";

    let mode = "login";
</script>

<section>
    <div class="flex flex-row mt-2">
        <div class="flex">
            <div class="flex flex-col justify-normal h-full  md:w-1/2 p-4">
                <div class="flex items-center p-4">
                    <p class="uppercase text-1xl font-bold text-white">Alpaca Tinder - Console</p>
                </div>
                {#if mode === "register"}
                <Register />
                {/if}
                {#if mode === "login"}
                <Login />
                {/if}
                <div class="flex flex-col">
                    {#if mode === "login"}
                        <a href="#" class="text-blue-500" on:click={() => {mode = "register"}}>Create an account</a>
                        <a href="/account/forgot-password" class="text-blue-500">Forgot password</a>
                    {/if}
                    {#if mode === "register"}
                        <a href="#" class="text-blue-500" on:click={() => {mode = "login"}}>Already have an account</a>
                    {/if}
                </div>
            </div>
            <div class="w-1/2 bg-cover h-screen bg-center" >
            </div>
        </div>
    </div>    
</section>
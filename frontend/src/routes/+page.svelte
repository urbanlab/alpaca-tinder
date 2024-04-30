<script lang="ts">
    import { onMount } from 'svelte';
	import Title from '../lib/components/misc/Title.svelte';
	import { currentUser, pb } from '$lib/store';
	import type { ConversationsResponse, DatasetsResponse } from '$lib/types/pocketbase-types';


    let datasets: Array<DatasetsResponse>;
    let currentConversation: ConversationsResponse;
    let convIndex = 0;
	
    onMount(async () => {
        datasets = await pb.collection("datasets").getFullList({expand: "conversations"});
        currentConversation = datasets[0].expand.conversations[convIndex];
    });

    async function upVote() {
        console.log(currentConversation);
        console.log($currentUser);
        await pb.collection("conversations").update(currentConversation.id, {"eval+":1});
        await pb.collection("users").update($currentUser.id, {"seen+": currentConversation.id});
        currentConversation = datasets[0].expand.conversations[++convIndex];
    }

    async function downVote() {
        await pb.collection("conversations").update(currentConversation.id, {"eval+":1});
        await pb.collection("users").update($currentUser.id, {"seen+": currentConversation.id});
        currentConversation = datasets[0].expand.conversations[++convIndex];
    }



    $: console.log(datasets);
</script>

<section>
	<Title text="Evaluation" />
    {#if currentConversation}
        <div>
                 <div class="chat chat-start">
            <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div class="chat-header">
                Utilisateurice
            </div>
            <div class="chat-bubble">{currentConversation.data.instruction}</div>
            </div>
            <div class="chat chat-end">
            <div class="chat-image avatar">
                <div class="w-10 rounded-full">
                <img alt="Tailwind CSS chat bubble component" src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                </div>
            </div>
            <div class="chat-header">
                Chatbotmet
            </div>
            <div class="chat-bubble">{currentConversation.data.output}</div>
            </div>
        </div>
        <div class="flex justify-center item-center mt-4">
            <button class="p-4 mr-2 rounded-full bg-primary" on:click={upVote}>👍</button>
            <button class=" p-4 rounded-full bg-primary" on:click={downVote}>👎</button>
        </div>
    {/if}
</section>

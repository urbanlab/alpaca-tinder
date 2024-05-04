<script lang="ts">
    import { onMount } from 'svelte';
	import Title from '../lib/components/misc/Title.svelte';
	import { currentUser, pb } from '$lib/store';
	import type { ConversationsResponse, DatasetsResponse } from '$lib/types/pocketbase-types';


    let datasets: Array<DatasetsResponse>;
    let currentConversation: ConversationsResponse;
    let progress = 0;
    let convIndex = 0;
	let datasetIndex = 0;
    let currentDataset:DatasetsResponse;

    let userSeenLength = 0;
    onMount(async () => {
        datasets = await pb.collection("datasets").getFullList({expand: "conversations"});
        filterConvs();
        updateProgress()
    });

    function filterConvs(){
        const userSeen = $currentUser.seen;
        currentDataset = datasets[datasetIndex];
        // filter out conversations that the user has already seen
        currentConversation = currentDataset.expand.conversations.find((conv) => !userSeen.includes(conv.id));
    }

    async function updateProgress(){
        const length = datasets[datasetIndex].expand.conversations.length;
        // only keep the seenid that are in the current dataset
        const conversationsIds = datasets[datasetIndex].expand.conversations.map((conv) => conv.id)
        userSeenLength = $currentUser.seen.filter((seenId) => conversationsIds.includes(seenId)).length;
        progress = (userSeenLength / length) * 100;
        filterConvs();
    }

    async function changeDataset(){
        await updateProgress();
    }

    async function upVote() {
        console.log(currentConversation);
        console.log($currentUser);
        await pb.collection("conversations").update(currentConversation.id, {"eval+":1});
        await pb.collection("users").update($currentUser.id, {"seen+": currentConversation.id});
        // set timeout 0.5s to let the progress bar update
        setTimeout(() => {
            updateProgress()
        }, 100);
        //await updateProgress()
    }


    async function downVote() {
        await pb.collection("conversations").update(currentConversation.id, {"eval-":1});
        await pb.collection("users").update($currentUser.id, {"seen+": currentConversation.id});
        setTimeout(() => {
            updateProgress()
        }, 100);
    }



    $: console.log(datasets);
</script>

<section>
	<Title text="Evaluation" />
    {#if datasets}
        <select class="select select-bordered w-full max-w-xs" bind:value={datasetIndex} on:change={changeDataset}>
            {#each datasets as dataset, index}
            {#if datasetIndex === index}
                <option value={index} selected>{dataset.name}</option>
            {:else}
                <option value={index}>{dataset.name}</option>
            {/if}
            {/each}
        </select>
    {/if}
    {#if currentConversation}
        <div>
                 <div class="chat chat-start">
            <div class="chat-image avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                    <span>U</span>
                </div>
            </div> 
            <div class="chat-header">
                Utilisateurice
            </div>
            <div class="chat-bubble">{currentConversation.data.instruction}</div>
            </div>
            <div class="chat chat-end">
            <div class="chat-image avatar placeholder">
                <div class="bg-neutral text-neutral-content rounded-full w-12">
                    <span>CB</span>
                </div>
                </div> 
            <div class="chat-header">
                Chatbotmet
            </div>
            <div class="chat-bubble">{currentConversation.data.output}</div>
            </div>
        </div>
        <div class="mt-24"></div>
        <div class="fixed bottom-0 w-full bg-base-300 pb-4">
            <div class="flex justify-center item-center mt-4">
                <button class="p-4 mr-2 rounded-full bg-success" on:click={async () => upVote()}>👍</button>
                <button class=" p-4 rounded-full bg-error" on:click={async () => downVote()}>👎</button>
            </div>
            <div class="flex justify-center item-center mt-4">
                <progress class="progress progress-primary w-56" value={progress} max="100"></progress>
                <p class="text-center"> {userSeenLength}/ {datasets[datasetIndex].conversations?.length}</p>
            </div>
        </div>
    {/if}
</section>

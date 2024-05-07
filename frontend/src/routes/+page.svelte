<script lang="ts">
    import { onMount } from 'svelte';
	import Title from '../lib/components/misc/Title.svelte';
	import { currentUser, pb } from '$lib/store';
	import type { ConversationsResponse, DatasetsResponse, UsersRecord } from '$lib/types/pocketbase-types';


    let datasets: Array<DatasetsResponse>;
    let currentConversation: ConversationsResponse;
    let progress = 0;
    let convIndex = 0;
	let datasetIndex = 0;
    let currentDataset:DatasetsResponse;
    let lastCurrentUser:UsersRecord;
    let totalDatsetsLength = 0;
    let userSeenLength = 0;
    let alreadyVote = false;
    onMount(async () => {
        datasets = await pb.collection("datasets").getFullList({expand: "conversations"});
        filterConvs();
        updateProgress()
        lastCurrentUser = $currentUser;
    });

    function filterConvs(){
        const userSeen = $currentUser.seen;
        currentDataset = datasets[datasetIndex];
        // filter out conversations that the user has already seen
        currentConversation = currentDataset.expand.conversations.find((conv) => !userSeen.includes(conv.id));
        if(alreadyVote){
            console.log("alreadyVote filter");
            // filter out conversations that have an eval above > 0
            currentConversation = currentDataset.expand.conversations.find((conv) => !userSeen.includes(conv.id) && conv.eval > 0);
        }
    }

    async function updateProgress(){
        const length = datasets[datasetIndex].expand.conversations.length;
        totalDatsetsLength = length;
        // only keep the seenid that are in the current dataset
        const conversationsIds = datasets[datasetIndex].expand.conversations.map((conv) => conv.id)
        userSeenLength = $currentUser.seen.filter((seenId) => conversationsIds.includes(seenId)).length;
        progress = (userSeenLength / length) * 100;
        if(alreadyVote){
            const length = datasets[datasetIndex].expand.conversations.filter((conv) => conv.eval > 0).length;
            totalDatsetsLength = length;
            // only compare with the conversations that have an eval above 0
            const conversationsIds = datasets[datasetIndex].expand.conversations.filter((conv) => conv.eval > 0).map((conv) => conv.id)
            userSeenLength = $currentUser.seen.filter((seenId) => conversationsIds.includes(seenId)).length;
            progress = (userSeenLength / length) * 100;
        }
        filterConvs();
    }

    async function changeDataset(){
        await updateProgress();
        alreadyVote = false;
    }

    async function upVote() {
        console.log(currentConversation);
        console.log($currentUser);
        await pb.collection("conversations").update(currentConversation.id, {"eval+":1});
        await pb.collection("users").update($currentUser.id, {"seen+": currentConversation.id});
        // set timeout 0.5s to let the progress bar update
        //await updateProgress()
    }


    async function downVote() {
        await pb.collection("conversations").update(currentConversation.id, {"eval-":1});
        await pb.collection("users").update($currentUser.id, {"seen+": currentConversation.id});
    }

    async function refreshFilters(){
        alreadyVote = !alreadyVote;
        console.log(alreadyVote);
        await filterConvs();
        await updateProgress();
    }

    $: {
        if(lastCurrentUser !== $currentUser){
            updateProgress();
            lastCurrentUser = $currentUser;
        }
    }


    $: console.log(datasets);
</script>

<section>
    <div class="p-4">
        <Title text="Evaluation" />
        {#if datasets}
        <label class="divider">Choisissez un dataset</label>
            <select class="select select-bordered w-full max-w-xs" bind:value={datasetIndex} on:change={changeDataset}>
                {#each datasets as dataset, index}
                {#if datasetIndex === index}
                    <option value={index} selected>{dataset.name}</option>
                {:else}
                    <option value={index}>{dataset.name}</option>
                {/if}
                {/each}
            </select>
            <div class="divider"></div>
            <div class="flex justify-center items-center mb-4">
                <!-- Checkbox-->
                <input type="checkbox" class="checkbox mr-2" id="checkbox" on:click={refreshFilters}>
                <label for="checkbox">Filtrer par "Déjà voté"</label>
            </div>
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
            <div class="mt-36"></div>
        {/if}
    </div>
    {#if datasets}
        <div class="fixed bottom-0 w-full bg-base-300 pb-4">
            <div class="flex justify-center item-center mt-4">
                <button class="p-4 mr-3 rounded-full bg-success active:scale-125" on:click={async () => upVote()}>👍</button>
                <button class=" p-4 rounded-full bg-error active:scale-125" on:click={async () => downVote()}>👎</button>
            </div>
            <div class="flex justify-center item-center mt-4">
                <progress class="progress progress-primary w-56" value={progress} max="100"></progress>
                <p class="text-center"> {userSeenLength}/ {totalDatsetsLength}</p>
            </div>
        </div>
    {/if}
</section>

<script lang="ts">
	import Title from "$lib/components/misc/Title.svelte";
	import { pb } from "$lib/store";
	import type { DatasetsResponse } from "$lib/types/pocketbase-types";
	import { onMount } from "svelte";
    let datasets: Array<DatasetsResponse>;
    let datasetIndex = 0;
    let minNote = 0;
    let maxNote = 5;

    let downloadUrl: HTMLAnchorElement;


    interface AlpacaFormat {
        instruction: string,
        input: string,
        output: string,
    }

    onMount(async () => {
        datasets = await pb.collection("datasets").getFullList({expand: "conversations"});
    });


    async function exportDataset() {
        const dataset = datasets[datasetIndex];
        const conversations = dataset.expand.conversations;
        const filteredConversations = conversations.filter((conv) => conv.eval >= minNote && conv.eval <= maxNote);
        // format the data to alpaca format
        const alpacaFormat: Array<AlpacaFormat> = filteredConversations.map((conv) => {
            return {
                instruction: conv.data.instruction,
                input: "",
                output: conv.data.output,
            }
        });
        // save the file as a json
        const blob = new Blob([JSON.stringify(alpacaFormat)], {type: "application/json"});
        const url = URL.createObjectURL(blob);
        //  save the file to the user's computer
        downloadUrl.href = url;
        downloadUrl.click();

    }


</script>
<section class="p-4 flex flex-col items-center justify-center">
    <Title text="Export" />
    <div class="card">

        {#if datasets}
            <div class="divider">Choisissez un dataset</div>
            <select class="select select-bordered w-full max-w-xs" bind:value={datasetIndex}>
            {#each datasets as dataset, index}
                {#if datasetIndex === index}
                        <option value={index} selected>{dataset.name}</option>
                    {:else}
                        <option value={index}>{dataset.name}</option>
                {/if}
            {/each}
            </select> 
            <div class="divider">Filter par note</div>
            <label>Note min</label>
            <input type="number" class="input input-bordered w-full max-w-xs" bind:value={minNote} />
            <label>Note max</label>
            <input type="number" class="input input-bordered w-full max-w-xs" bind:value={maxNote} />
            <button class="btn btn-primary" on:click={exportDataset}>Exporter Dataset</button>
            <a href="#" download="dataset.json" bind:this={downloadUrl}></a>
        {/if}          
    </div>
    
</section>
<script lang="ts">
    import { FastForward } from "lucide-svelte";
    import { nodes, type GraphNode } from "../store/graph";
  import { onMount } from "svelte";

    let cont = 0;

    let currentId = "0";
    let currentNode: GraphNode | undefined;
    $: currentNode = $nodes.find((n) => n.id === currentId);
    let hasTheGameEnded = false;

    $: hasTheGameEnded = currentNode?.data.isLeaf ?? false

    onMount(() => {
        currentId = $nodes.find((n) => n.data.parentId === "0")?.id || ""
    })
</script>

 {#if (hasTheGameEnded)}
    <h1 class="h1"> Aqui está a solução para seu problema:</h1>
    <h3 class="question">{currentNode?.data.label}</h3>
{/if}

{#if (currentNode)}
    <h1 class="h1"> Pergunta nº {cont}</h1>
    <h3 class="question">{currentNode.data.label}</h3>
     {#each currentNode.data.options as option}
        <button on:click={() => {currentId = option.nextId; cont++}}>
            {option.label}
        </button>
    {/each}
    <pre>
        {JSON.stringify(currentNode, null, 2)}
    </pre>
{/if} 

<style>
    .h1 {
        color: black;
        font-size: clamp(2.5rem,4vw,4rem);
        font-weight: 100;
    }
    .question {
        padding: 1rem;
    }
    button {
        padding: 1rem 2rem;
        font-size: 1.3rem;
        border: none;
        border-radius: 1rem;
        background-color: rgb(0,200,100);
        color: white;
        z-index: 999;
        transform-origin: center;
        box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25),
        inset 0px -2px 3px rgba(0, 0, 0, 0.25);
        cursor: pointer;
        line-height: 2rem;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .input {
        border-radius: 25px;
        border: 2px solid rgb(0,200,100);
        padding: 20px;
        width: 200px;
        height: 150px;
    }
</style>

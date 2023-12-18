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
    <h1 class="h1">Então considere como solução:</h1>
    <h3 class="question">{currentNode?.data.label}</h3>
{/if}

{#if (currentNode && !hasTheGameEnded)}
    <h1 class="h1"> Pergunta nº {cont}</h1>
    <p class="question">
        <span class="small">

            Você quer que o algoritmo tenha esta propriedade:
        </span>
        <br>
        <strong>    
            {currentNode.data.label}
        </strong>
        ?
    </p>
     {#each currentNode.data.options as option}
        <!-- {#if (option.label !== "Não sei")} -->
        <!-- não sei tá implementado errado -->
        <button on:click={() => {currentId = option.nextId; cont++}}>
            {option.label}
        </button>
        <!-- {/if} -->
    {/each}
    <!-- <pre>
        {JSON.stringify(currentNode, null, 2)}
    </pre> -->
{/if}

<style>
    .small {
        font-size: 0.9rem;
    }

    .h1 {
        color: black;
        font-size: 3rem;
        font-weight: 100;
    }
    .question {
        padding: 1rem;
        margin-bottom: auto;
    }
    button {
        padding: 1rem 2rem;
        font-size: 1.3rem;
        border: none;
        margin-block: 1rem;
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
</style>

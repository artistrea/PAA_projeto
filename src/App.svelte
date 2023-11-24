<script lang="ts">
  import Akinator from './components/Akinator.svelte';
  import EditingNode from './components/EditingNode.svelte';
  import TreeView from './components/TreeView.svelte';
  import { ArrowLeft, Edit } from 'lucide-svelte';
  
  let shownView:  "viewTree" | "akinator" | "editingNode" = "akinator";

  let selectedNodeId: string | undefined = '1';
</script>

{#if (shownView === "akinator")}
<section class="wrapper">
  <Akinator />
  <button class="open-button" on:click={() => shownView = "viewTree"}>
    <Edit /> Editar árvore
  </button>
</section>
{/if}

{#if (shownView === "viewTree")}
<main class="wrapper">
  <TreeView bind:selectedNodeId bind:shownView />
  <button class="back-button" on:click={() => shownView = "akinator"}>
    <ArrowLeft size={24} />
  </button>
</main>
{/if}

{#if (shownView === "editingNode")}
<section class="wrapper">
  <EditingNode nodeId={selectedNodeId} />
  <button class="back-button" on:click={() => shownView = "viewTree"}>
    <ArrowLeft size={24} />
  </button>
</section>
{/if}

<style>
  .wrapper {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0;
  }

  .back-button {
    position: absolute;
    top: 0;
    left: 0;
    height: 2rem;
    width: 2rem;
    font-size: 1.3rem;
    border: none;
    background-color: black;
    color: blanchedalmond;
    z-index: 999;
  }

  .open-button {
    padding: 1rem;
    font-size: 1.3rem;
    border: none;
    background-color: rgb(0,200,100);
    color: blanchedalmond;
    z-index: 999;
  }
</style>

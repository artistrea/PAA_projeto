<script lang="ts">
  import Akinator from './components/Akinator.svelte';
  import EditingNode from './components/EditingNode.svelte';
  import TreeView from './components/TreeView.svelte';

  let shownView:  "viewTree" | "akinator" | "editingNode" = "akinator";

  let selectedNodeId: string | undefined = '1';
</script>

{#if (shownView === "akinator")}
<section class="wrapper">
  <button class="open-button" on:click={() => shownView = "viewTree"}>
    Edit
  </button>
  <Akinator />
</section>
{/if}

{#if (shownView === "viewTree")}
<main class="wrapper">
  <TreeView bind:selectedNodeId bind:shownView />
  <button class="close-button" on:click={() => shownView = "akinator"}>
    x
  </button>
</main>
{/if}

{#if (shownView === "editingNode")}
<section class="wrapper">
  <EditingNode nodeId={selectedNodeId} />
  <button class="close-button" on:click={() => shownView = "viewTree"}>
    x
  </button>
</section>
{/if}

<style>
  .wrapper {
    position: relative;
    padding: 0;
  }

  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    height: 2rem;
    width: 2rem;
    font-size: 1.3rem;
    border: none;
    background-color: black;
    color: blanchedalmond;
    z-index: 999;
  }

  .open-button {
    height: 2rem;
    width: 2rem;
    font-size: 1.3rem;
    border: none;
    background-color: blue;
    color: blanchedalmond;
    z-index: 999;
  }
</style>

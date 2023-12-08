<script lang="ts">
    import Akinator from './components/Akinator.svelte';
    import EditingNode from './components/EditingNode.svelte';
    import TreeView from './components/TreeView.svelte';
    import { ArrowLeft, Edit, HelpCircle } from 'lucide-svelte';
    
    let shownView:  "menu" | "viewTree" | "akinator" | "editingNode" = "menu";
  
    let selectedNodeId: string | undefined = '1';
  </script>
  
  {#if (shownView === "menu")}
  <section class="menu">
    <h1 class="h1"> Boas-vindas </h1>
    <p class="p">Escolha qual opção deseja testar:</p>
    <div class="button-container">
      <button class="open-button2" on:click={() => shownView = "akinator"}>
        <HelpCircle /> Akinator
      </button>
      <button class="open-button1" on:click={() => shownView = "viewTree"}>
        <Edit /> Editar árvore
      </button>
    </div>
  </section>
  {/if}
  
  {#if (shownView === "akinator")}
  <section >
    <Akinator/>
    <button class="back-button" on:click={() => shownView = "menu"}>
      <ArrowLeft size={24} />
    </button>
  </section>
  {/if}
  
{#if (shownView === "viewTree")}
<main >
  <TreeView bind:selectedNodeId bind:shownView />
  <button class="back-button" on:click={() => shownView = "menu"}>
    <ArrowLeft size={24} />
  </button>
</main>
{/if}

{#if (shownView === "editingNode")}
<section >
  <EditingNode nodeId={selectedNodeId} />
  <button class="back-button" on:click={() => shownView = "viewTree"}>
    <ArrowLeft size={24} />
  </button>
</section>
{/if}
  
  <style>
    .menu {
          height: 100vh;
          min-width: 100%;
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          font-family: sans-serif;
          background-color: rgb(229, 230, 221);
      }
  
    .h1 {
          color: #ff3e00;
          text-transform: uppercase;
          font-size: clamp(2.5rem,5vw,4rem);
          font-weight: 100;
      }
  
    .p {
          font-size: 2rem;
          color: #222;
          margin: 2rem 0 1rem;
      }
  
    .button-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 400px;
      }
    
    .wrapper {
      display: flex;
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
      color: white;
      z-index: 999;
    }
  
    .open-button1 {
      padding: 1rem;
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
      line-height: 1.5; 
      display: flex; 
      align-items: center;
    }
  
    .open-button2 {
      padding: 1rem;
      font-size: 1.3rem;
      border: none;
      border-radius: 1rem;
      background-color: rgb(200, 43, 0);
      color: white;
      z-index: 999;
      transform-origin: center;
      box-shadow: 0px 3px 3px rgba(0, 0, 0, 0.25),
      inset 0px -2px 3px rgba(0, 0, 0, 0.25);
      cursor: pointer;
      line-height: 1.5; 
      display: flex; 
      align-items: center;
    }
  </style>
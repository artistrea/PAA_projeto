<script lang="ts">
  import { FastForward } from "lucide-svelte";
  import QuestionCard from "./QuestionCard.svelte";
  import { textToInfoParser } from "../tree/parser";
  import { buildDecisionTree } from "../tree/builder";

  let shownView:  "inicio" | "perguntas" | "pensando" | "resposta" = "inicio";

  let cont= 1

  let rules = textToInfoParser("");
  // console.log(rules);
  let tree = buildDecisionTree(rules);
  console.log(tree);
</script>

<main class="menu">
  <section class="card">
    {#if (shownView === "inicio")}
      <h1 class="h1"> Como funciona ?</h1>
      <p class="p"> Pense em um algoritmo de ordenação (exemplo: Mergesort, Quicksort, etc). Em seguida, faremos perguntas sobre
        o algoritmo em questão e, ao final, advinharei qual que você está pensando!</p>
      <button class="button" on:click={() => shownView = "perguntas"}>
        Aceito o desafio!
      </button>
    {/if}
    {#if (shownView === "perguntas")}
      <!-- <h1 class="h1"> Pergunta nº {cont}</h1>
      <button class="button" on:click={() => cont+=1}>
        Próxima pergunta <FastForward/>
      </button> -->
      <QuestionCard />
    {/if}
  </section>
</main>

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

  .card {
    background-color: rgb(156, 223, 232);
    height: 80vh;
    width: 40%;
    position: relative;
    display: flex;
    border-radius: 1rem;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }

  .h1 {
    color: black;
    font-size: clamp(2.5rem,4vw,4rem);
    font-weight: 100;
  }

  .p {
      font-size: 2rem;
      color: black;
      margin: 0rem 0 1rem;
      padding: 3rem;
      text-align: center;
  }

  .button {
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
    }
</style>


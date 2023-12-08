<script>
    import { FastForward } from "lucide-svelte";
    import { treeBuilder } from "../tree/builder";

    let nodes = treeBuilder("");
    // Estrutura dos Nós:
    // data: {
    //     label: string;
    //     options: string[];
    //     parentId?: string;
    //     route?: string;
    // };
    let cont = 0;
    let question = nodes[cont].data.label;
    let answer = '';

    function submitAnswer() {
        // swicth(answer): case options[algo] {vai pra certo id do builder}
        cont++;
        question = nodes[cont].data.label;
        answer = '';
    }
</script>


    <h1 class="h1"> Pergunta nº {cont}</h1>
    <h3>{question}</h3>
    <!-- <button class="button" on:click={() => cont+=1}>
    Próxima pergunta <FastForward/>
    </button> -->
    <form on:submit|preventDefault={submitAnswer}>
        <input class="input" type="text" bind:value={answer} placeholder="Sua resposta:" />
        <button class="button" type="submit">Próxima pergunta <FastForward/></button>
    </form>

<style>
    .h1 {
        color: black;
        font-size: clamp(2.5rem,4vw,4rem);
        font-weight: 100;
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
    .input {
        border-radius: 25px;
        border: 2px solid rgb(0,200,100);
        padding: 20px;
        width: 200px;
        height: 150px;
    }
</style>

<script lang="ts">
    import { FastForward } from "lucide-svelte";
    import { treeBuilder } from "../tree/builder";
    import type { Node } from "@xyflow/svelte";

    type OurNode = Omit<Node, "position"> & {
        data: {
            label: string;
            options: string[];
            parentId?: string;
            route?: string;
        };
    };

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
    let End = false;

    function isEnd(options: string[]) {
        if (options.length === 0) {
            End = true;
        }
    }

    function traverseNodes(nodesMock: OurNode[], answer: string): string | null {
        let count = 0;
        let question = nodesMock[count];

        while (question.data.options.length > 0) {
            if (question.data.options.includes(answer)) {
                const nextQuestion = nodesMock.find(node => node.data.route === answer);
                if (nextQuestion) {
                    question = nextQuestion;
                    count = nodesMock.indexOf(nextQuestion);
                }
            }

            isEnd(question.data.options); // Update End value
            // if (question.data.options.length === 0) {
            if (End) {
                return question.data.label;
            }

            count++;
            if (count >= nodesMock.length) {
                return null; // return null if we've gone through all nodes without finding a match
            }

            question = nodesMock[count];
        }

        return null; // return null if we've gone through all nodes without finding a match
    }

    function submitAnswer() {
        // isEnd(nodes[cont+1].data.options); // Muda o valor de End caso seja uma folha
        let result = traverseNodes(nodes, answer);
        if (End) {
            // cont++;
            // question = nodes[cont].data.label;
            question = result;
            return;
        }
        cont++;
        question = nodes[cont].data.label;
        answer = '';
    }
</script>

{#if (End)}
    <h1 class="h1"> Aqui está a solução para seu problema:</h1>
    <h3 class="question">{question}</h3>
{/if}

{#if (!End)}
    <h1 class="h1"> Pergunta nº {cont}</h1>
    <h3 class="question">{question}</h3>
    <!-- <button class="button" on:click={() => cont+=1}>
    Próxima pergunta <FastForward/>
    </button> -->
    <form on:submit|preventDefault={submitAnswer}>
        <input class="input" type="text" bind:value={answer} placeholder="Sua resposta:" />
        <button class="button" type="submit">Próxima pergunta <FastForward/></button>
    </form>
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
    .button {
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

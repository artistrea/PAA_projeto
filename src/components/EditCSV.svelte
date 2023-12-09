<script lang="ts">
  import { onMount } from "svelte";
    import { CSVText } from "../store/graph";

    let files: FileList = [] as unknown as FileList;
    let selectedFile: File;

    $: selectedFile = files[0]

    $: if (selectedFile) {
        async function getText() {
            $CSVText = await selectedFile.text();
        }
        getText();
    }

    onMount(() => {

    })
</script>

<div class="page-wrapper">
    <h1>
        Adicione o seu CSV para gerar a árvore:
    </h1>
    
    <main>
        <label for="file">
            <p class="text">
                Escolha um arquivo
            </p>
            {#if selectedFile}
                <p class="filename">
                    {selectedFile.name} ({selectedFile.size} bytes)
                </p>
            {/if}
            <input type='file' id='file' bind:files class="">
        </label>
        <div>
            <h2>Regras atuais:</h2>
            <pre>{$CSVText}</pre>
        </div>
    </main>
</div>
    
<style>
    pre {
        font-family: inherit;
        line-height: 1.6;
    }
    h1 {
        padding: 2rem;
    }

    main {
        display: flex;
        align-items: center;
        flex-direction: column;
    }
    .page-wrapper {
        min-height: 99vh;
    }

    input[type='file'] {
        display: none;
    }

    label .text {
        margin: 0;
        font-size: 0.9rem;
        position: absolute;
        top: 0.3rem;
        left: 0.3rem;
    }
    label .filename {
        margin: 0;
        font-size: 0.9rem;
        position: absolute;
        bottom: 0.3rem;
        right: 0.3rem;
    }
    label {
        position: relative;
        display: block;
        width: 10rem;
        height: 8rem;
        background-color: rgb(0,200,0, 0.1);
        border-radius: 10px;
        border: dotted gray 1px;
        padding: 1rem 2rem;
    }
</style>
<script lang="ts">
  import {
    SvelteFlow,
    Controls,
    Background,
    MiniMap,
    type Node,
    type Edge,
  } from '@xyflow/svelte';

  import '@xyflow/svelte/dist/style.css';
  import { writable } from 'svelte/store';

  import {nodes, edges} from "../store/graph"

  const internalNodes = writable<Node[]>($nodes);
  
  const internalEdges = writable<Edge[]>($edges);

  export let selectedNodeId: string | undefined;

  export let shownView:  "viewTree" | "akinator" | "editingNode";

  function onNodeClick(e: CustomEvent<{
    node: Node<any, string | undefined>;
    event: MouseEvent | TouchEvent;
  }>) {
    selectedNodeId = e.detail.node.id;
    shownView = "editingNode"
  }
</script>

<div style:height="100vh">
    <SvelteFlow  nodes={internalNodes} edges={internalEdges} fitView on:nodeclick={onNodeClick} >
        <Controls />
        <Background />
        <MiniMap />
    </SvelteFlow>
</div>

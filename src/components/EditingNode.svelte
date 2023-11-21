<script lang="ts">
  import {  type Node, type Edge } from "@xyflow/svelte";

  import { nodes, edges } from "../store/graph";
  
  export let nodeId: string | undefined;

  console.log($nodes)

  let node: Node | undefined;
  $: node = $nodes.find(n => n.id === '1');
</script>

<div>
  Editing node {nodeId}.
  {JSON.stringify($nodes)}
  {JSON.stringify(node)}
  
</div>

<style>
  
</style>

<script lang="ts">
  import { nodes, type Node } from "../store/graph";
  
  export let nodeId: string | undefined;

  console.log($nodes)

  let node: Node | undefined;
  $: node = $nodes.find(n => n.id === nodeId);
</script>

<div>
  Editing node {nodeId}.
  <!-- {JSON.stringify($nodes)} -->
  {JSON.stringify(node)}
  
</div>

<style>
  
</style>

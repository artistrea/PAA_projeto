<script lang="ts">
    import { Handle, Position } from '@xyflow/svelte';
  
    export let data: any;
</script>

<Handle
    type="target"
    position={Position.Top}
/>

{data.label}

<Handle
    type="source"
    position={Position.Bottom}
    id="a"
/>

<style>
    :global(.svelte-flow__node-selectorNode) {
        font-size: 12px;
        background: #eee;
        border: 1px solid #555;
        border-radius: 5px;
        text-align: center;
    }
</style>
  
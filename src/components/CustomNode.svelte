<script lang="ts">
    import { Handle, Position, type NodeProps } from '@xyflow/svelte';
  
    type $$Props = NodeProps;
  
    export let data: $$Props['data'];
</script>

<Handle
    type="target"
    position={Position.Top}
/>

{data.label}
epa

<Handle
    type="source"
    position={Position.Bottom}
    id="a"
/>

<style>
    :global(.svelte-flow__node-selectorNode) {
        font-size: 12px;
        height: 10px;
        width: 10px;
        background: red;
        border: 1px solid #555;
        border-radius: 5px;
        text-align: center;
    }
</style>
  
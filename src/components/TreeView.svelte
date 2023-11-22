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

  import { nodes, treeStructure, type TreeNode} from "../store/graph"
  import CustomNode from './CustomNode.svelte';

  function calcTreeHeightNMaxSons(tree: TreeNode): [number, number] {
    if (!tree.children) return [1, 0];

    const [ch, cs] = tree.children.reduce((p, c) => {
      const [cch, ccs] = calcTreeHeightNMaxSons(c)
      return [Math.max(p[0], cch), Math.max(p[0], ccs)]
    }, [1, 0]);

    console.log("height", ch);
    return [ch + 1, Math.max(cs, tree.children.length)];
  }

  function mapTree(tree: TreeNode, height: number, maxSons: number, acc: Node[] = [], x = 0, y = 0, offset = 0): [Edge[], Node[]] {
    const curNode = {...$nodes.find(n => n.id === tree.id)!, position: {x, y}};

    if (!tree.children)
      return [[], [...acc, curNode]]

    const rootEdges = tree.children.map(c => 
        ({
          id: `${tree.id}-${c.id}`,
          source: tree.id,
          target: c.id,
          label: c.route,
          type: c.type
        })
      );

    // [TODO]: CONSERTAR SAPORRA AQUI PRA ALTURAS DIFERENTES:
    if (offset === 0) offset = Math.pow(maxSons-1, height)*6;

    const [childrenEdges, childrenNodes] = tree.children.reduce((p, c, i) => {
      const [childEdges, childNodes] = mapTree(c, height-1, maxSons, acc, x + i * offset - offset, y+150, offset/(maxSons-1))
      return [[...p[0], ...childEdges], [...p[1], ...childNodes]] satisfies [Edge[], Node[]];
    }, [[], []] as [Edge[], Node[]])

    return [[...rootEdges, ...childrenEdges], [curNode, ...childrenNodes]];
  }

  const internalNodes = writable<Node[]>([]);
  
  const internalEdges = writable<Edge[]>([]);

  $: [$internalEdges, $internalNodes] = mapTree($treeStructure, ...calcTreeHeightNMaxSons($treeStructure))

  export let selectedNodeId: string | undefined;

  export let shownView:  "viewTree" | "akinator" | "editingNode";

  function onNodeClick(e: CustomEvent<{
    node: Node<any, string | undefined>;
    event: MouseEvent | TouchEvent;
  }>) {
    selectedNodeId = e.detail.node.id;
    shownView = "editingNode"
  }

  const nodeTypes = {
    "": CustomNode
  }
</script>

<div style:height="100vh">
    <SvelteFlow nodes={internalNodes} {nodeTypes} edges={internalEdges} fitView on:nodeclick={onNodeClick} >
        <Controls />
        <Background />
        <MiniMap />
    </SvelteFlow>
</div>

<!-- h=10 -->
<!-- s=3 -->

<!-- 3*10 -->
<!-- 10 -->
<!-- 3 -->
<!-- 1 -->

<!-- 0 -->
<!-- -10, 0, 10 -->
<!-- -10, 0, 10 -->
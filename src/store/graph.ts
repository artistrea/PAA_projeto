import type { Node } from "@xyflow/svelte";

export type { OurNode as Node };

import { writable } from "svelte/store";
import { initialTreeData } from "../tree";

type OurNode = Omit<Node, "position"> & {
  data: {
    label: string;
    options: string[];
    parentId?: string;
    route?: string;
  };
};
export const nodes = writable<OurNode[]>(initialTreeData);

export type TreeNode = {
  id: string;
  parentId: string;
  route: string;
  type: "step";
  children?: TreeNode[];
};

function createTreeStructure(ns: OurNode[]): TreeNode {
  const newNs: TreeNode[] = ns.map((n) => ({
    id: n.id,
    children: undefined,
    parentId: n.data.parentId,
    route: n.data.route,
    type: "step",
  }));

  newNs.forEach((n) => {
    n.children = newNs.filter((nn) => nn.parentId === n.id);
  });

  return newNs.find((n) => typeof n.parentId === "undefined")!;
}

export const treeStructure = writable<TreeNode>();

nodes.subscribe((n) => {
  treeStructure.set(createTreeStructure(n));
});

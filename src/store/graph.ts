import type { Node } from "@xyflow/svelte";

export type { GraphNode as Node };

import { writable } from "svelte/store";
import { buildTreeFromText, initialTreeData } from "../tree";

export type TreeNode = {
  symptom: string;
  id: string;
  parentId: string;
  type: "step" | "leaf";
  children?: {  no: TreeNode
                yes: TreeNode
                dontknow: TreeNode}

};

export type Atom = {
  type: "cause" | "symptom";
  label: string;
};

export type LogicSentence = {
  consequence: Atom;
  parameters: (Atom & { value: boolean })[]; // ignore cause
  probability: number;
};

type GraphNode = Omit<Node, "position"> & {
  data: {
    label: string;
    options: string[];
    parentId?: string;
    route?: string;
    children?: { no: string, yes: string, dontknow: string }
  };
};

export const nodes = writable<GraphNode[]>(initialTreeData);
export const CSVText = writable<string>("");
export const treeStructure = writable<TreeNode>();

function createNodeStructure(ns: TreeNode): GraphNode[] {
  const newNode: GraphNode = {
    id: ns.id,
    data: {
      label: ns.symptom,
      options: ["Sim", "Não", "Não sei"],
      parentId: ns.parentId,
      route: ns.symptom,
      children: ns.children ? { no: ns.children.no.id, yes: ns.children.yes.id, dontknow: ns.children.dontknow.id } : undefined
    },
  };

  let nodes: GraphNode[] = [newNode];
  if (ns.children) {
    nodes = nodes.concat(createNodeStructure(ns.children.no));
    nodes = nodes.concat(createNodeStructure(ns.children.yes));
    nodes = nodes.concat(createNodeStructure(ns.children.dontknow));
  }
}

treeStructure.subscribe((n) => {
  nodes.set(createNodeStructure(n));
});

CSVText.subscribe((txt) => {
  nodes.set(buildTreeFromText(txt));
});

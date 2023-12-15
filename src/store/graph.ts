import type { Node } from "@xyflow/svelte";

export type { GraphNode as Node };

import { writable } from "svelte/store";
import { buildTreeFromText, initialTreeData } from "../tree";

export type TreeNode = {
  symptom: string;
  id: string;
  parentId: string;
  type: "step" | "leaf";
  children?: { no: TreeNode; yes: TreeNode; dontknow: TreeNode };
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

export type GraphNode = Omit<Node, "position" | "data"> & {
  data: {
    label: string;
    options: { label: string; nextId: string }[];
    parentId?: string;
    route?: string;
    isLeaf: boolean;
  };
};

export const nodes = writable<GraphNode[]>();

const data =
  "“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3 \n“C causa 1”, (“S sintoma 1”, “S sintoma 2”), 0.5 \n“S sintoma 2”, NOT (“S sintoma 4”, NOT “S sintoma 3”), 0.3";

export const CSVText = writable<string>(data);
export const treeStructure = writable<TreeNode | undefined>(initialTreeData);

function createNodeStructure(ns: TreeNode): GraphNode[] {
  const newNode: GraphNode = {
    id: ns.id,
    data: {
      label: ns.symptom,
      options: ns.children
        ? [
            {
              label: "Sim",
              nextId: ns.children.yes.id,
            },
            {
              label: "Não",
              nextId: ns.children.no.id,
            },
            {
              label: "Não sei",
              nextId: ns.children.dontknow.id,
            },
          ]
        : [],
      parentId: ns.parentId,
      route: ns.symptom,
      isLeaf: ns.type === "leaf",
    },
  };

  let nodes: GraphNode[] = [newNode];
  if (ns.children) {
    nodes = nodes.concat(createNodeStructure(ns.children.no));
    nodes = nodes.concat(createNodeStructure(ns.children.yes));
    nodes = nodes.concat(createNodeStructure(ns.children.dontknow));
  }
  console.log("nodes", nodes);
  return nodes;
}

treeStructure.subscribe((n) => {
  if (n) nodes.set(createNodeStructure(n));
});

CSVText.subscribe((txt) => {
  treeStructure.set(buildTreeFromText(txt));
});

// curId = "0"
// curNode = nodes[curId]

// Sua cor é azul?

// Sim
// Não
// Não sei

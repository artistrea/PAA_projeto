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

const data = `“C Insertion Sort”, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Estável”, “S Eficiente para dados pequenos”), 0.33
“C Insertion Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Estável“, “S Complexidade temporal linear”), 0.6
“C Insertion Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Complexidade espacial constante“, “S Complexidade temporal quadratica”), 0.2
“C Selection Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Ordenação simples“, NOT “S Estável”), 0.9
“C Selection Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Ordenação simples“, “S Eficiente para dados pequenos”), 0.5
“C Selection Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Complexidade espacial constante“, “S Complexidade temporal quadratica”), 0.4
“C Quick Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Divisão e conquista“, NOT “S Eficiente para dados pequenos”), 0.5
“C Quick Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, NOT “S Estável“,”S Complexidade temporal quadratica”), 0.3
“C Quick Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Complexidade espacial linear”, “S Complexidade temporal igual a N LOGN”), 0.2
“C Merge Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Complexidade espacial linear”, “S Complexidade temporal igual a N LOGN”), 0.4
“C Merge Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Divisão e conquista”, NOT “S Eficiente para dados pequenos”), 0.8
“C Merge Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Estável”, “S Complexidade temporal igual a N LOGN”), 0.4
“C Counting Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Estável”, “S Eficiente para dados pequenos”), 0.33
“C Counting Sort“, (“S Usa Vetor“, “S Problema de Ordenacao“, “S Estável”, “S Complexidade temporal igual a N + M”), 0.3
”C Busca Binária”, (”S Usa Arvore”, ”S Problema de Busca”, ”S Requer lista ordenada”, ”S Complexidade temporal logarítmica”), 0.8
”C Busca Binária”, (”S Usa Vetor”, ”S Problema de Busca”, ”S Requer lista ordenada”, ”S Complexidade temporal logarítmica”), 0.8
”C Árvore de Decisão”, (”S Usa Grafos”, ”S Problema de Classificação”, ”S Robusto a outliers”, ”S Não lida com dados categóricos”), 0.2
”C Árvore de Decisão”, (”S Usa Arvore”, ”S Problema de Classificação”, ”S Robusto a outliers”, ”S Não lida com dados categóricos”), 0.7
”C Algoritmo de Dijkstra”, (”S Usa Grafos”, ”S Problema de Busca”, ”S Menor caminho em grafos ponderados”, ”S Não lida com arestas negativas”), 0.4
”C A-Estrela”, (NOT ”C Algoritmo de Dijkstra”, ”S Usa Grafos”, ”S Problema de Busca”, ”S Menor caminho em grafos ponderados”, ”S Não lida com arestas negativas”), 0.4
”C Algoritmo de Floyd-Warshall”, (”S Usa Grafos”, ”S Problema de Busca”, ”S Todos os pares de menor caminho”, ”S Lida com arestas negativas”), 0.1
”C Algoritmo de Kruskal”, (”S Usa Grafos”, ”S Árvore geradora mínima”, ”S Lida com grafos não conectados”, ”NOT S Eficiente em grafos densos”), 0.2
”C Algoritmo de Prim”, (”S Usa Grafos”, ”S Árvore geradora mínima”, ”S Eficiente em grafos densos”,  ”NOT S Lida com grafos não conectados”), 0.3
”C Exponenciação Binária”, (”S Problema de Algebra”, ”S Otimiza a complexidade de multiplicação/cálculo matemático repetitivo”), 0.7
”C Sivo de Erastóstenes”, (”S Problema de Algebra”, ”S Encontrar todos os primos”), 0.3
”C Knapsack”, (”S Problema de Programacao Dinamica”, ”S Selecionar itens para maximizar valor”, ”S Selecionar itens respeitando um limite”), 0.3
”C Busca Pega/Não pega”, (”S Problema de Programacao Dinamica”, ”S Selecionar itens para maximizar valor”, NOT ”S Selecionar itens respeitando um limite”), 0.3
”C Busca Completa”, (”S Problema de Programacao Dinamica”, ”S É necessário verificar todas as possibilidades”), 0.3`;

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

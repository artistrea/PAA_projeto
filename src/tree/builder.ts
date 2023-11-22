import type { Node, TreeNode } from "../store/graph";

const nodesMock: Node[] = [
  {
    id: "1",
    data: {
      label: "É um problema de qual tipo?",
      options: ["arvores", "grafos", "geometria computacional"],
    },
  },
  {
    id: "2",
    data: {
      label: "Qual o subproblema?",
      options: ["montar a estrutura de dados", "utilizar a estrutura de dados"],
      parentId: "1",
      route: "grafos",
    },
  },
  {
    id: "3",
    data: {
      label: "Qual o subproblema?",
      options: ["montar a estrutura de dados", "utilizar a estrutura de dados"],
      parentId: "1",
      route: "arvores",
    },
  },
  {
    id: "4",
    data: {
      label: "Qual o subproblema?",
      options: ["montar a estrutura de dados", "utilizar a estrutura de dados"],
      parentId: "1",
      route: "geometria computacional",
    },
  },
  {
    id: "5",
    data: {
      label:
        "Ao mexer com pontos, pode ser usada uma representação de coordenadas, sendo ela polar, euclidiana, etc. Para representar formas geométricas, podem ser anotados pontos específicos e atributos da forma, ou utilizado uma matriz e anotado ponto a ponto o espaço ocupado pelo formato. Algumas vezes problemas de geometria nem precisam de representação, e podem ser resolvidos algebricamente, usando propriedades geométricas, então fique atento!",
      options: [],
      parentId: "4",
      route: "montar a estrutura de dados",
    },
  },
  {
    id: "6",
    data: {
      label: "a",
      options: [],
      parentId: "4",
      route: "utilizar a estrutura de dados",
    },
  },
  {
    id: "7",
    data: {
      label: "a",
      options: [],
      parentId: "3",
      route: "montar a estrutura de dados",
    },
  },
  {
    id: "8",
    data: {
      label: "a",
      options: ["busca de um nó", "busca de um caminho"],
      parentId: "3",
      route: "utilizar a estrutura de dados",
    },
  },
  {
    id: "9",
    data: {
      label: "a",
      options: [],
      parentId: "8",
      route: "busca de um nó",
    },
  },
  {
    id: "10",
    data: {
      label: "a",
      options: [],
      parentId: "8",
      route: "busca de um caminho",
    },
  },
  {
    id: "11",
    data: {
      label: "a",
      options: [],
      parentId: "3",
      route: "busca de um caminho",
    },
  },
];

export function treeBuilder(currentInfo: any): Node[] {
  // id3 algo build decision tree
  // calculate information gain or Gini Index
  // select attribute to compare on node
  // repeat process recursively for its children paths
  // return tree

  return nodesMock;
}

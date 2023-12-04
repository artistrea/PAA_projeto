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

function calculateInformationGain(data: any[], feature: string): number {
  // Implement your information gain calculation logic here
  // You'll need to calculate entropy before and after the split
  // Return the information gain value
  // This depends on your specific use case and dataset structure
  // For simplicity, you can refer to standard algorithms for calculating information gain
  // such as ID3 or C4.5
  return 0;
}

export type TreeNode = {
  feature: string;
  id: string;
  parentId: string;
  route: string;
  type: "step";
  children?: TreeNode[];
};


function buildDecisionTree(data: any[]): TreeNode {
  // Base case: If all instances have the same class, create a leaf node
  const uniqueClasses = Array.from(new Set(data.map((item) => item.label)));
  if (uniqueClasses.length === 1) {
    return { type: "leaf", label: uniqueClasses[0] };
  }else if (evaluateProbability(data)){
    return { type: "leaf", label: mostProbable(data) };
  }
  
    //Get list of features -- Decidir se isso vem antes ou eh feito para cada construcao 
    const uniqueFeatures = new Set<string>();

    for (const dataPoint of data) {
      for (const feature in dataPoint) {
        if (feature[2] == 'C ' || feature[2] == 'S ') {
          uniqueFeatures.add(feature);
        }
      }
  
  // Find the best split based on information gain
  let bestGain = -1;
  let bestFeature: string | undefined;

  // Iterate through each feature
  for (const feature in uniqueFeatures) {
      const gain = calculateInformationGain(data, feature);

      if (gain > bestGain) {
        bestGain = gain;
        bestFeature = feature;
      }

  }

  // Base case: If no split improves information gain, create a leaf node
  if (bestGain === 0) {
    const majorityClass = uniqueClasses.reduce((a, b) =>
      data.filter((item) => item.label === a).length >
      data.filter((item) => item.label === b).length
        ? a
        : b
    );
    return { type: "leaf", label: majorityClass };
  }

  // Split the data based on the best feature and threshold
  const leftData = data.filter((item) => item[bestFeature!] <= bestThreshold!);
  const rightData = data.filter((item) => item[bestFeature!] > bestThreshold!);

  // Recursively build the left and right subtrees
  const left = buildDecisionTree(leftData);
  const right = buildDecisionTree(rightData);

  return {
    type: "step",
    feature: bestFeature!,
    left,
    right,
  };
}


function evaluateProbability(data: any[]): boolean {
  return true }

function mostProbable(data: any[]): string {
  return "feature escolhida" } 



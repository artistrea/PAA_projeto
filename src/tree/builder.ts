import type { Node } from "../store/graph";

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

function calculateInformationGain(data: LogicSentence[], feature: string): number {
  // Implement your information gain calculation logic here
  // You'll need to calculate entropy before and after the split
  // Return the information gain value
  // This depends on your specific use case and dataset structure
  // For simplicity, you can refer to standard algorithms for calculating information gain
  // such as ID3 or C4.5
  return 0;
}

function evaluateProbability(data: LogicSentence[]): boolean {
  return true }

function mostProbable(data: LogicSentence[]): string {
  return "feature escolhida" } 



export type TreeNode = {
  symptom: string;
  id: string;
  parentId: string;
  type: "step" | "leaf";
  children?: TreeNode[]
};


type Atom = {
  type: "cause" | "symptom";
  label: string;
};

type LogicSentence = {
  consequence: Atom;
  parameters: (Atom & { value: boolean })[]; // ignore cause
  probability: number;
};

function buildDecisionTree(data: LogicSentence[], parentId: string): TreeNode {
  // Base case: If all instances have the same class, create a leaf node
  const id = Date.now().toString()
  const uniqueClasses = Array.from(new Set(data.map((item) => item.consequence.label)));
  if (uniqueClasses.length === 1) {
    return {symptom: uniqueClasses[0] , id: id, parentId: parentId, type: "leaf" };
  }else if (evaluateProbability(data)){ 
    return { symptom: mostProbable(data) , id: id, parentId: parentId, type: "leaf" };
  }
  

  // Find the best split based on information gain
  let bestGain = -1;
  let bestSymptom : string = ""


  //Get list of features -- Decidir se isso vem antes ou eh feito para cada construcao 
  
  const uniqueParametersSet = new Set<Atom>();

  data.forEach((sentence) => {
    sentence.parameters.forEach((parameter) => {
      uniqueParametersSet.add(parameter);
    })});


  // Iterate through each feature
  for (const symptom in uniqueParametersSet) {
      const gain = calculateInformationGain(data, symptom);

      if (gain > bestGain) {
        bestGain = gain;
        bestSymptom = symptom;
      }
  }

  // Base case: If no split improves information gain, create a leaf node
  if (bestGain === 0) {
    return { symptom: mostProbable(data) , id: id, parentId: parentId, type: "leaf" };
  }

  // Split the data based on the best feature 
  const leftData = data.filter((item) => item.parameters.some( parameter => parameter.label == bestSymptom && !parameter.value ) 
                                || !item.parameters.some( parameter => parameter.label == bestSymptom));
  const rightData = data.filter((item) => item.parameters.some( parameter => parameter.label == bestSymptom && parameter.value ) 
                                || !item.parameters.some( parameter => parameter.label == bestSymptom));

  // Recursively build the left and right subtrees
  const left = buildDecisionTree(leftData, parentId);
  const right = buildDecisionTree(rightData, parentId);

  return {
    symptom: bestSymptom , id: id, parentId: parentId, type: "step", children: [left, right]
  };
}


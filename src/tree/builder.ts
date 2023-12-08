import { Weight } from "lucide-svelte";
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


function mostProbable(data: LogicSentence[]): string {
  if (data.length === 0) {
    return ""; // Return null for an empty array
  }

  // Sort the logic sentences in descending order based on probability
  const sortedSentences = [...data].sort((a, b) => b.probability - a.probability);

  // The sentence with the highest probability is now at the beginning of the sorted array
  return sortedSentences[0].consequence.label; } 

function calculateEntropy(leftData: LogicSentence[], rightData: LogicSentence[]): number {
  let sets  : LogicSentence[][] = [];
  sets.push(leftData, rightData);
  let set1 = sets[1]

  let totalLength = 0;

  // Iterate over the array of arrays and add the length of each sub-array
  for (const set of sets) {
    totalLength += set.length;
}

let totalEntropy = 0;
for (const set of sets) {
  let weight = set.length/totalLength;
  const setInstances = set.length;

    // Count the number of instances for each class
    const classCounts: { [key: string]: number } = set.reduce((counts, obj) => {
      const classValue = obj.consequence.label as string; // Type assertion
      counts[classValue] = (counts[classValue] || 0) + 1;
      return counts;
    }, {}as { [key: string]: number });

    const entropy = Object.values(classCounts).reduce((result, count) => {
      const probability = count / setInstances;
      return result - probability * Math.log2(probability);
    }, 0);

    // Calculate the weighted entropy and accumulate the result
    totalEntropy += (setInstances / totalLength) * entropy;

  }
  return totalEntropy;
}
  


export type TreeNode = {
  symptom: string;
  id: string;
  parentId: string;
  type: "step" | "leaf";
  children?: {  no: TreeNode
                yes: TreeNode
                dontknow: TreeNode}

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

export function buildDecisionTree(data: LogicSentence[], parentId: string, dk: boolean, seenSymptoms: string[]): TreeNode {
  // Base case: If all instances have the same class, create a leaf node
  const id = Date.now().toString()
  const uniqueClasses = Array.from(new Set(data.map((item) => item.consequence.label)));
  if (uniqueClasses.length === 1) {
    return {symptom: uniqueClasses[0] , id: id, parentId: parentId, type: "leaf" };
  }
  // Find the best split based on information gain
  let bestGain = -1;
  let bestSymptom : string = ""
  let bestEntropyAfter = -1;

  //Get list of features -- Decidir se isso vem antes ou eh feito para cada construcao 
  
  const uniqueParametersSet = new Set<Atom>();

  data.forEach((sentence) => {
    sentence.parameters.forEach((parameter) => {
      uniqueParametersSet.add(parameter);
    })});

  const entropyBefore = calculateEntropy(data, [])
  let leftData : LogicSentence[] = [];
  let rightData: LogicSentence[] = [];
  // Iterate through each feature
  //informationGain = entropyBefore - entropyAfter
  for (const symptom in uniqueParametersSet) {
    //check if symptom has already been answered
    if (!seenSymptoms.includes(symptom)){
      // Split the data based on the best feature 
        const tryLeftData = data.filter((item) => item.parameters.some( parameter => parameter.label == bestSymptom && !parameter.value ) 
                                    || !item.parameters.some( parameter => parameter.label == bestSymptom));
        const tryRightData = data.filter((item) => item.parameters.some( parameter => parameter.label == bestSymptom && parameter.value ) 
                                    || !item.parameters.some( parameter => parameter.label == bestSymptom));
        let entropyAfter = calculateEntropy(tryLeftData, tryRightData);
        let gain = entropyBefore - entropyAfter
        if (gain > bestGain) {
          bestGain = gain;
          bestEntropyAfter = entropyAfter
          bestSymptom = symptom; // checar esse tipo
          leftData = tryLeftData;
          rightData = tryRightData;
        }
   }
  }
  // Base case: If no split improves information gain or if all symptoms were seen, create a leaf node
  if (bestGain === 0 || bestGain < 0) {
    return { symptom: mostProbable(data) , id: id, parentId: parentId, type: "leaf" };
  } else if (bestEntropyAfter/entropyBefore == 1 ){ // decidir esse numero
      return { symptom: mostProbable(data) , id: id, parentId: parentId, type: "leaf" };
  }
  

  // Recursively build the left and right subtrees
  const left = buildDecisionTree(leftData, parentId, false, seenSymptoms);
  const right = buildDecisionTree(rightData, parentId, false, seenSymptoms);
  const dontknow = buildDecisionTree(rightData, parentId, true, [...seenSymptoms, bestSymptom]);
  return {
    symptom: bestSymptom , id: id, parentId: parentId, type: "step", children: {no: left, yes: right, dontknow: dontknow  }
  };
}


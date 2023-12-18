import { buildDecisionTree } from "./builder";
import { textToInfoParser } from "./parser";

const info = textToInfoParser("");

//const initialTreeData = buildDecisionTree(info, 1);
const initialTreeData = buildDecisionTree(info);

export function buildTreeFromText(text: string) {
  console.log("TREEEEEE", buildDecisionTree(textToInfoParser(text)));
  return buildDecisionTree(textToInfoParser(text));
}

export { initialTreeData };

import { treeBuilder, buildDecisionTree } from "./builder";
import { textToInfoParser } from "./parser";

const info = textToInfoParser("");

//const initialTreeData = buildDecisionTree(info, 1);
const initialTreeData = treeBuilder(info);

export function buildTreeFromText(text: string) {
  return treeBuilder(textToInfoParser(text));
}

export { initialTreeData };

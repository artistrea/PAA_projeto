import { treeBuilder, buildDecisionTree } from "./builder";
import { textToInfoParser } from "./parser";

const info = textToInfoParser("");

//const initialTreeData = buildDecisionTree(info, 1);
const initialTreeData = treeBuilder(info);

export { initialTreeData };

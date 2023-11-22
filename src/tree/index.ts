import { treeBuilder } from "./builder";
import { textToInfoParser } from "./parser";

const info = textToInfoParser("");

const initialTreeData = treeBuilder(info);

export { initialTreeData };

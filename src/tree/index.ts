import { treeBuilder } from "./builder";
import { textToInfoParser } from "./parser";

const info = textToInfoParser("");

const initialTreeData = treeBuilder(info);

export function buildTreeFromText(text: string) {
  return treeBuilder(textToInfoParser(text));
}

export { initialTreeData };

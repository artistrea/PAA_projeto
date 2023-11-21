import type { Edge, Node } from "@xyflow/svelte";
import { writable } from "svelte/store";

export const nodes = writable<Node[]>([
  {
    id: "1",
    data: { label: "Hello" },
    position: { x: 0, y: 0 },
  },
  {
    id: "2",
    data: { label: "World" },
    position: { x: 150, y: 150 },
  },
]);

export const edges = writable<Edge[]>([
  {
    id: "1-2",
    source: "1",
    target: "2",
  },
]);

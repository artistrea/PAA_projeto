import { writable } from "svelte/store";
import { nodes, treeStructure } from "../store/graph";

export function traverseTree() {
    const currentTreeStructure = [null];//treeStructure;
    const currentNodeId = writable<string | null>(null);
    let currentNodeIndex = 0;

    const getCurrentNode = () => {
        //const tree = $currentTreeStructure;
        const tree = currentTreeStructure;
        const nodes = tree.filter((node) => node.parentId === currentNodeId);

        // Sort nodes or pick the first node based on your logic
        // You can also implement logic to track which question has been answered
        // to determine the next node to display to the user

        const currentNode = nodes[currentNodeIndex];
        return currentNode;
    };

    const nextQuestion = () => {
        const currentNode = getCurrentNode();
        if (currentNode) {
            //$currentNodeId = currentNode.id;
            currentNodeId.set(currentNode.id);
            // Implement logic to display the current question to the user
            // based on currentNode.data.label and currentNode.data.options
        } else {
            // Logic for handling when there are no more questions
            // or paths in the decision tree
        }
    };

    const previousQuestion = () => {
        // Implement logic to go back to the previous question
        // based on the user's interaction
    };

    // Logic for initializing the tree traversal

    //$currentNodeId = null;
    currentNodeId.set(null);

    return {
        currentNodeId,
        nextQuestion,
        previousQuestion,
    };
}

// src/store/useGraphStore.ts
import create from "zustand";
import { v4 as uuidv4 } from "uuid"; // For generating unique node/edge IDs

interface Node {
  id: string;
  label: string;
  type?: string;
  position?: { x: number; y: number };
  style?: { color?: string };
}

interface Edge {
  id: string;
  source: string;
  target: string;
  label?: string;
  style?: { color?: string };
}

interface GraphState {
  nodes: Node[];
  edges: Edge[];
  setGraph: (nodes: Node[], edges: Edge[]) => void;
  addNode: (label: string, position: { x: number; y: number }) => void;
  addEdge: (source: string, target: string, label?: string) => void;
  removeNode: (id: string) => void;
  removeEdge: (id: string) => void;
  updateNode: (id: string, label: string, position: { x: number; y: number }) => void;
  updateEdge: (id: string, label: string) => void;
  resetGraph: () => void;
}

export const useGraphStore = create<GraphState>((set) => ({
  nodes: [
    { id: "one", label: "Node 1", position: { x: 100, y: 100 }, style: { color: "#FF5733" } },
    { id: "two", label: "Node 2", position: { x: 300, y: 200 }, style: { color: "#33FF57" } }
  ],
  edges: [
    { id: "edge1", source: "one", target: "two", label: "Edge 1", style: { color: "#333" } }
  ],

  setGraph: (nodes, edges) => set({ nodes, edges }),

  addNode: (label, position) =>
    set((state) => ({
      nodes: [
        ...state.nodes,
        { id: uuidv4(), label, position, type: "default", style: { color: "#666" } },
      ],
    })),

  addEdge: (source, target, label) =>
    set((state) => ({
      edges: [
        ...state.edges,
        { id: uuidv4(), source, target, label, style: { color: "#333" } },
      ],
    })),

  removeNode: (id) =>
    set((state) => ({
      nodes: state.nodes.filter((node) => node.id !== id),
      edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id), // Remove edges connected to the node
    })),

  removeEdge: (id) =>
    set((state) => ({
      edges: state.edges.filter((edge) => edge.id !== id),
    })),

  updateNode: (id, label, position) =>
    set((state) => ({
      nodes: state.nodes.map((node) =>
        node.id === id ? { ...node, label, position } : node
      ),
    })),

  updateEdge: (id, label) =>
    set((state) => ({
      edges: state.edges.map((edge) => (edge.id === id ? { ...edge, label } : edge)),
    })),

  resetGraph: () => set({ nodes: [], edges: [] }),
}));

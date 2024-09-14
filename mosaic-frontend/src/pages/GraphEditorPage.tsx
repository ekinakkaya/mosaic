// src/pages/GraphEditorPage.tsx
import React, { useEffect, useRef, useState } from "react";
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from "cytoscape";
import { useGraphStore } from "@/store/useGraphStore"; // Zustand store for graph state
import { useParams } from "react-router-dom"; // Use to fetch graph ID from URL

const GraphEditorPage: React.FC = () => {
  const { graphId } = useParams<{ graphId: string }>(); // Get graph ID from URL
  const cyRef = useRef<cytoscape.Core | null>(null);
  const { nodes, edges, setGraph } = useGraphStore(); // Get graph state and actions from Zustand
  const [cytoscapeInitialized, setCytoscapeInitialized] = useState(false); // Track initialization

  useEffect(() => {
    if (cyRef.current && !cytoscapeInitialized) {
      setGraph(nodes, edges); // Set initial graph state once
      setCytoscapeInitialized(true); // Mark as initialized to prevent further updates
    }
  }, [cyRef, cytoscapeInitialized, nodes, edges, setGraph]); // Run effect only once

  useEffect(() => {
    if (cyRef.current) {
      cyRef.current.on("tap", "node", (evt) => {
        console.log("Node clicked", evt.target);
      });
      cyRef.current.on("tap", (evt) => {
        if (evt.target === cyRef.current) {
          console.log("Background clicked");
        }
      });
    }
  }, []);

  useEffect(() => {
    // Fetch graph data by ID from backend or Zustand store (if not already present)
    console.log(`Fetching data for graph with ID: ${graphId}`);
    // Simulate fetching data logic here; in real use case, fetch from backend or local storage
  }, [graphId]);

  // Transform nodes and edges to Cytoscape elements
  const elements = [
    ...nodes.map((node) => ({ data: { id: node.id, label: node.label } })),
    ...edges.map((edge) => ({ data: { id: edge.id, source: edge.source, target: edge.target, label: edge.label } })),
  ];

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <CytoscapeComponent
        elements={elements}
        style={{ width: "100%", height: "100%" }}
        cy={(cy) => {
          cyRef.current = cy;
          if (!cytoscapeInitialized) {
            setGraph(nodes, edges); // Initialize Cytoscape with current graph state only once
            setCytoscapeInitialized(true); // Prevent further updates
          }
        }}
        layout={{ name: "grid" }}
        stylesheet={[
          {
            selector: "node",
            style: {
              content: "data(label)",
              "background-color": "#666",
              "text-valign": "center",
              "color": "#fff",
              "width": 50,
              "height": 50,
            },
          },
          {
            selector: "edge",
            style: {
              width: 3,
              "line-color": "#ccc",
              "target-arrow-color": "#ccc",
              "target-arrow-shape": "triangle",
              "curve-style": "bezier",
            },
          },
        ]}
      />
    </div>
  );
};

export default GraphEditorPage;

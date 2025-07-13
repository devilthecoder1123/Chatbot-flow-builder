import React, { useState, useCallback, useRef } from "react";
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Connection,
  Edge,
  Node,
  BackgroundVariant,
  ConnectionLineType,
} from "reactflow";
import "reactflow/dist/style.css";

import { MessageSquare } from "lucide-react";
import CustomTextNode from "./CustomTextNode";
import NodesPanel from "./NodesPanel";
import SettingsPanel from "./SettingsPanel";
import { NodeData, NodeTypeConfig } from "../types";

// Define available node types for extensibility
const nodeTypes = {
  textNode: CustomTextNode,
};

// Configuration for available node types (easily extensible)
const availableNodeTypes: NodeTypeConfig[] = [
  {
    type: "textNode",
    label: "Message",
    icon: MessageSquare,
    defaultData: {
      label: "Send Message",
      text: "",
    },
  },
];

/**
 * Main Flow Builder component
 * Manages the entire chatbot flow creation interface
 */
const FlowBuilder: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<NodeData>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [error, setError] = useState<string>("");

  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  /**
   * Handle node selection to show settings panel
   */
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  }, []);

  /**
   * Handle clicking on empty canvas to deselect nodes
   */
  const onPaneClick = useCallback(() => {
    setSelectedNodeId(null);
  }, []);

  /**
   * Handle edge connections with validation
   * Source handles can only have one outgoing edge
   */
  const onConnect = useCallback(
    (params: Connection) => {
      // Check if source handle already has a connection
      const sourceHasConnection = edges.some(
        (edge) => edge.source === params.source
      );

      if (sourceHasConnection) {
        setError("Each source handle can only have one outgoing connection");
        setTimeout(() => setError(""), 3000);
        return;
      }

      setEdges((eds) => addEdge(params, eds));
      setError("");
    },
    [edges, setEdges]
  );

  /**
   * Handle drag start for node creation
   */
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  /**
   * Handle drag over to allow drop
   */
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  /**
   * Handle drop to create new nodes
   */
  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      const type = event.dataTransfer.getData("application/reactflow");

      if (typeof type === "undefined" || !type || !reactFlowBounds) {
        return;
      }

      const nodeConfig = availableNodeTypes.find((nt) => nt.type === type);
      if (!nodeConfig) return;

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode: Node<NodeData> = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: { ...nodeConfig.defaultData },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Update selected node data
   */
  const onUpdateNode = useCallback(
    (data: NodeData) => {
      if (!selectedNodeId) return;

      setNodes((nds) =>
        nds.map((node) =>
          node.id === selectedNodeId ? { ...node, data } : node
        )
      );
    },
    [selectedNodeId, setNodes]
  );

  /**
   * Validate and save the flow
   * Error if more than one node exists and more than one node has empty target handles
   */
  const onSave = useCallback(() => {
    if (nodes.length <= 1) {
      setError("");
      alert("Flow saved successfully!");
      return;
    }

    // Find nodes without incoming connections (empty target handles)
    const nodesWithoutIncoming = nodes.filter((node) => {
      return !edges.some((edge) => edge.target === node.id);
    });

    if (nodesWithoutIncoming.length > 1) {
      setError("Cannot save Flow: More than one node has empty target handles");
      return;
    }

    setError("");
    alert("Flow saved successfully!");
  }, [nodes, edges]);

  const selectedNode = selectedNodeId
    ? nodes.find((node) => node.id === selectedNodeId)
    : null;

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Main flow area */}
      <div className="flex-1 relative">
        <ReactFlowProvider>
          <div ref={reactFlowWrapper} className="w-full h-full">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              nodeTypes={nodeTypes}
              connectionLineType={ConnectionLineType.SmoothStep}
              fitView
            >
              <Controls className="bg-white shadow-lg" />
              <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
            </ReactFlow>
          </div>
        </ReactFlowProvider>

        {/* Save button */}
        <button
          onClick={onSave}
          className="absolute top-4 right-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
        >
          Save Changes
        </button>

        {/* Error message */}
        {error && (
          <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg shadow-lg">
            {error}
          </div>
        )}
      </div>

      {/* Right sidebar - Nodes Panel or Settings Panel */}
      {selectedNode ? (
        <SettingsPanel
          selectedNodeData={selectedNode.data}
          onUpdateNode={onUpdateNode}
          onBack={() => setSelectedNodeId(null)}
        />
      ) : (
        <NodesPanel nodeTypes={availableNodeTypes} onDragStart={onDragStart} />
      )}
    </div>
  );
};

export default FlowBuilder;

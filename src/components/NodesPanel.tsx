import React from "react";
import { NodeTypeConfig } from "../types";

interface NodesPanelProps {
  nodeTypes: NodeTypeConfig[];
  onDragStart: (event: React.DragEvent, nodeType: string) => void;
}

/**
 * Extensible Nodes Panel component
 * Displays available node types that can be dragged onto the canvas
 */
const NodesPanel: React.FC<NodesPanelProps> = ({ nodeTypes, onDragStart }) => {
  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Nodes Panel</h3>

      <div className="space-y-3">
        {nodeTypes.map((nodeType) => {
          const IconComponent = nodeType.icon;

          return (
            <div
              key={nodeType.type}
              className="border-2 border-dashed border-gray-300 rounded-lg p-4 cursor-grab hover:border-teal-400 hover:bg-teal-50 transition-all duration-200 active:cursor-grabbing"
              draggable
              onDragStart={(event) => onDragStart(event, nodeType.type)}
            >
              <div className="flex items-center gap-2 text-gray-700">
                <IconComponent />
                <span className="font-medium">{nodeType.label}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NodesPanel;

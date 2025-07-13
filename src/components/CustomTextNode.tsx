import React from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { MessageSquare } from 'lucide-react';
import { NodeData } from '../types';

/**
 * Custom Text Node component for the chatbot flow
 * Features source and target handles with proper styling
 */
const CustomTextNode: React.FC<NodeProps<NodeData>> = ({ data, selected }) => {
  return (
    <div className={`bg-white rounded-lg shadow-md border-2 transition-all duration-200 ${
      selected ? 'border-blue-400 shadow-lg' : 'border-gray-200'
    }`}>
      {/* Target Handle - allows multiple incoming connections */}
      <Handle
        type="target"
        position={Position.Left}
        className="w-3 h-3 bg-gray-400 border-2 border-white shadow-sm"
        style={{ left: -6 }}
      />
      
      {/* Node Header */}
      <div className="bg-teal-400 text-white px-4 py-2 rounded-t-lg flex items-center gap-2">
        <MessageSquare size={16} />
        <span className="text-sm font-medium">{data.label}</span>
      </div>
      
      {/* Node Content */}
      <div className="p-4 min-h-[60px] bg-white rounded-b-lg">
        <p className="text-gray-700 text-sm whitespace-pre-wrap">
          {data.text || 'Enter your message...'}
        </p>
      </div>
      
      {/* Source Handle - allows only one outgoing connection */}
      <Handle
        type="source"
        position={Position.Right}
        className="w-3 h-3 bg-gray-400 border-2 border-white shadow-sm"
        style={{ right: -6 }}
      />
    </div>
  );
};

export default CustomTextNode;
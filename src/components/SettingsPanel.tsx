import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { NodeData } from '../types';

interface SettingsPanelProps {
  selectedNodeData: NodeData;
  onUpdateNode: (data: NodeData) => void;
  onBack: () => void;
}

/**
 * Settings Panel component for editing selected node properties
 * Replaces the Nodes Panel when a node is selected
 */
const SettingsPanel: React.FC<SettingsPanelProps> = ({
  selectedNodeData,
  onUpdateNode,
  onBack,
}) => {
  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onUpdateNode({
      ...selectedNodeData,
      text: event.target.value,
    });
  };

  return (
    <div className="w-64 bg-white border-l border-gray-200 p-4">
      {/* Header with back button */}
      <div className="flex items-center gap-2 mb-4">
        <button
          onClick={onBack}
          className="p-1 hover:bg-gray-100 rounded transition-colors duration-200"
        >
          <ArrowLeft size={18} className="text-gray-600" />
        </button>
        <h3 className="text-lg font-semibold text-gray-800">
          {selectedNodeData.label}
        </h3>
      </div>
      
      {/* Text input field */}
      <div className="space-y-2">
        <label htmlFor="node-text" className="block text-sm font-medium text-gray-700">
          Text
        </label>
        <textarea
          id="node-text"
          value={selectedNodeData.text}
          onChange={handleTextChange}
          className="w-full h-32 px-3 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          placeholder="Enter your message..."
        />
      </div>
    </div>
  );
};

export default SettingsPanel;
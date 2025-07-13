// Type definitions for the flow builder
export interface NodeData {
  label: string;
  text: string;
}
export interface NodeTypeConfig {
  type: string;
  label: string;
  icon: React.ComponentType;
  defaultData: NodeData;
}

# 🤖 Chatbot Flow Builder

A beautiful and extensible visual flow builder for creating chatbot conversations using React and React Flow.

![Chatbot Flow Builder](https://img.shields.io/badge/React-18.3.1-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.5.3-blue?logo=typescript)
![React Flow](https://img.shields.io/badge/React%20Flow-11.11.4-green?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4.1-blue?logo=tailwindcss)

## ✨ Features

- 🎯 **Drag & Drop Interface** - Intuitive node creation from the sidebar panel
- 🔗 **Smart Connections** - Visual edge connections with validation rules
- ⚙️ **Settings Panel** - Edit node content with a clean interface
- 🎨 **Beautiful UI** - Modern design with smooth animations and hover effects
- 🔧 **Extensible Architecture** - Easy to add new node types and features
- ✅ **Flow Validation** - Smart save validation for proper flow connectivity

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/yourusername/chatbot-flow-builder.git

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🎮 How to Use

1. **Add Nodes** - Drag "Message" nodes from the right panel onto the canvas
2. **Connect Nodes** - Click and drag from the right handle (source) to left handle (target)
3. **Edit Content** - Click on any node to open the settings panel
4. **Save Flow** - Use the "Save Changes" button to validate and save your flow

## 🏗️ Architecture

- **Extensible Node System** - Add new node types by updating the `availableNodeTypes` configuration
- **Type Safety** - Full TypeScript support with proper React Flow integration
- **Component Structure** - Clean separation of concerns with reusable components

## 🛠️ Tech Stack

- **React 18** - Modern React with hooks and functional components
- **TypeScript** - Type-safe development experience
- **React Flow** - Powerful flow diagram library
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Beautiful icon library
- **Vite** - Fast build tool and development server

## 📁 Project Structure

```
src/
├── components/
│   ├── FlowBuilder.tsx      # Main flow builder component
│   ├── CustomTextNode.tsx   # Custom node implementation
│   ├── NodesPanel.tsx       # Draggable nodes sidebar
│   └── SettingsPanel.tsx    # Node editing interface
├── types/
│   └── index.ts             # TypeScript type definitions
└── App.tsx                  # Root application component
```

<div align="center">
  <p>Built with ❤️ using React Flow</p>
</div>

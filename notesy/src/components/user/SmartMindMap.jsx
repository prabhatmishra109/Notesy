import React, { useCallback, useEffect } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { useLocation } from 'react-router-dom';

const nodeTypes = {}; // Default nodes use karenge simplicity ke liye

const MindMap = () => {
  const location = useLocation();
  const summary = location.state?.summary || "";
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  useEffect(() => {
    if (!summary) return;

    const lines = summary.split('\n').filter(l => l.trim() !== "");
    const initialNodes = [];
    const initialEdges = [];

    // 1. CENTER HUB (Main Topic)
    initialNodes.push({
      id: 'root',
      data: { label: '🎯 MAIN IDEA' },
      position: { x: 0, y: 0 },
      style: { 
        background: '#111827', color: '#fff', padding: '20px', 
        borderRadius: '50px', width: 180, fontWeight: 'bold', fontSize: '16px' 
      },
    });

    const topics = lines.filter(l => l.match(/^\d+\./) || l.includes(':')).slice(0, 6); // Limit to 6 topics for clarity
    
    topics.forEach((line, index) => {
      const topicId = `topic-${index}`;
      const angle = (index / topics.length) * 2 * Math.PI;
      const x = Math.cos(angle) * 300; // Controlled Distance
      const y = Math.sin(angle) * 300;

      // 2. MAJOR TOPIC NODES
      initialNodes.push({
        id: topicId,
        data: { 
          label: line.replace(/[#*]/g, '').trim(),
          childLines: lines.filter(l => !l.match(/^\d+\./) && !l.includes(':')).slice(index * 2, (index+1) * 2) 
        },
        position: { x, y },
        style: { 
          background: '#3b82f6', color: '#fff', padding: '15px', 
          borderRadius: '12px', width: 200, textAlign: 'center', border: 'none', cursor: 'pointer' 
        },
      });

      initialEdges.push({
        id: `e-root-${topicId}`,
        source: 'root',
        target: topicId,
        style: { stroke: '#94a3b8', strokeWidth: 2 },
      });
    });

    setNodes(initialNodes);
    setEdges(initialEdges);
    setTimeout(() => fitView({ padding: 0.5 }), 200);
  }, [summary, fitView]);

  // CLICK TO SHOW DETAILS (Simple logic)
  const onNodeClick = useCallback((_, clickedNode) => {
    if (clickedNode.id === 'root') return;

    setNodes((nds) => {
      // Check if already expanded
      const hasChildren = nds.some(n => n.id.startsWith(`sub-${clickedNode.id}`));
      if (hasChildren) {
        // Collapse: Remove sub-nodes
        return nds.filter(n => !n.id.startsWith(`sub-${clickedNode.id}`));
      }

      // Expand: Add sub-nodes
      const subNodes = (clickedNode.data.childLines || []).map((text, i) => ({
        id: `sub-${clickedNode.id}-${i}`,
        data: { label: text.replace(/[#*]/g, '').trim() },
        position: { x: clickedNode.position.x + (i % 2 === 0 ? 250 : -250), y: clickedNode.position.y + 100 + (i * 60) },
        style: { background: '#fff', color: '#333', padding: '10px', borderRadius: '5px', width: 250, border: '1px solid #ddd', fontSize: '12px' }
      }));

      return [...nds, ...subNodes];
    });

    setEdges((eds) => {
      const hasChildren = eds.some(e => e.id.startsWith(`e-sub-${clickedNode.id}`));
      if (hasChildren) {
        return eds.filter(e => !e.id.startsWith(`e-sub-${clickedNode.id}`));
      }

      const subEdges = (clickedNode.data.childLines || []).map((_, i) => ({
        id: `e-sub-${clickedNode.id}-${i}`,
        source: clickedNode.id,
        target: `sub-${clickedNode.id}-${i}`,
        style: { stroke: '#cbd5e1', strokeDasharray: '5,5' }
      }));

      return [...eds, ...subEdges];
    });
  }, [setNodes, setEdges]);

  return (
    <div style={{ width: '100%', height: '100vh', background: '#f8fafc' }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodeClick={onNodeClick}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background variant="dots" color="#e2e8f0" />
        <Controls />
        <div style={{ position: 'absolute', top: 20, left: 20, zIndex: 10, fontFamily: 'sans-serif' }}>
          <div style={{ background: 'white', padding: '10px', borderRadius: '8px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
            <strong>Simple View</strong><br/>
            <small>Click a Blue box to see its details.</small>
          </div>
        </div>
      </ReactFlow>
    </div>
  );
};

export default function SmartMindMap() {
  return (
    <ReactFlowProvider>
      <MindMap />
    </ReactFlowProvider>
  );
}
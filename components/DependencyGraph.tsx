'use client';

import { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import { GraphData, getNodeColor, GraphNode } from '@/lib/mockGraphData';

// Dynamically import ForceGraph2D with no SSR
const ForceGraph2D = dynamic(() => import('react-force-graph-2d'), {
    ssr: false,
    loading: () => <div className="flex items-center justify-center h-full text-[var(--cyan-neon)]">Loading Neural Net...</div>
});

interface DependencyGraphProps {
    data: GraphData;
}

export default function DependencyGraph({ data }: DependencyGraphProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 800, height: 600 });

    useEffect(() => {
        const updateDimensions = () => {
            if (containerRef.current) {
                setDimensions({
                    width: containerRef.current.clientWidth,
                    height: containerRef.current.clientHeight
                });
            }
        };

        window.addEventListener('resize', updateDimensions);
        updateDimensions();

        return () => window.removeEventListener('resize', updateDimensions);
    }, []);

    return (
        <div ref={containerRef} className="w-full h-full min-h-[600px] bg-[var(--bg-primary)] relative overflow-hidden rounded-xl border border-[var(--cyan-neon)]/20 shadow-[0_0_30px_rgba(0,243,255,0.1)]">
            {/* Cyber Grid Background Overlay */}
            <div className="absolute inset-0 pointer-events-none opacity-20"
                style={{
                    backgroundImage: 'linear-gradient(var(--cyan-neon) 1px, transparent 1px), linear-gradient(90deg, var(--cyan-neon) 1px, transparent 1px)',
                    backgroundSize: '40px 40px'
                }}
            />

            <ForceGraph2D
                width={dimensions.width}
                height={dimensions.height}
                graphData={data}
                nodeLabel="name"
                nodeColor={(node: any) => getNodeColor(node)}
                nodeRelSize={6}
                linkColor={() => 'rgba(0, 243, 255, 0.2)'}
                linkWidth={1}
                linkDirectionalParticles={2}
                linkDirectionalParticleWidth={2}
                linkDirectionalParticleSpeed={0.005}
                backgroundColor="transparent"
                onNodeClick={(node: any) => {
                    // Center view on node
                    // ref.current?.centerAt(node.x, node.y, 1000);
                    // ref.current?.zoom(8, 2000);
                }}
                nodeCanvasObject={(node: any, ctx, globalScale) => {
                    const label = node.name;
                    const fontSize = 12 / globalScale;
                    ctx.font = `${fontSize}px Sans-Serif`;
                    const textWidth = ctx.measureText(label).width;
                    const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2);

                    // Draw Node
                    ctx.beginPath();
                    ctx.arc(node.x, node.y, 5, 0, 2 * Math.PI, false);
                    ctx.fillStyle = getNodeColor(node);
                    ctx.fill();

                    // Glow effect
                    ctx.shadowBlur = 15;
                    ctx.shadowColor = getNodeColor(node);

                    // Draw Label
                    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
                    ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2 - 10, bckgDimensions[0], bckgDimensions[1]);

                    ctx.textAlign = 'center';
                    ctx.textBaseline = 'middle';
                    ctx.fillStyle = getNodeColor(node);
                    ctx.fillText(label, node.x, node.y - 10);

                    ctx.shadowBlur = 0;
                }}
            />

            {/* Overlay UI */}
            <div className="absolute top-4 left-4 p-4 bg-black/80 backdrop-blur-md border border-[var(--cyan-neon)]/30 rounded-lg">
                <h3 className="text-[var(--cyan-neon)] font-bold mb-2">Dependency Neural Net</h3>
                <div className="flex flex-col gap-2 text-xs text-[var(--text-secondary)]">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--cyan-neon)]"></span> Root Crate
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--green-neon)]"></span> Healthy
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--warning)]"></span> Warning
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[var(--danger)]"></span> Risky
                    </div>
                </div>
            </div>
        </div>
    );
}

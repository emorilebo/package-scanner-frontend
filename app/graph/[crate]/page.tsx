'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Share2, Download } from 'lucide-react';
import DependencyGraph from '@/components/DependencyGraph';
import { GraphData } from '@/lib/mockGraphData';

export default function GraphPage() {
    const params = useParams();
    const router = useRouter();
    const crateName = params.crate as string;
    const [graphData, setGraphData] = useState<GraphData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (crateName) {
            const fetchData = async () => {
                try {
                    setLoading(true);
                    const res = await fetch(`/api/graph?crate=${encodeURIComponent(crateName)}`);
                    if (!res.ok) throw new Error('Failed to fetch graph data');
                    const data = await res.json();
                    setGraphData(data);
                } catch (err) {
                    console.error(err);
                    setError('Failed to load dependency graph. Please try again.');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [crateName]);

    if (loading) {
        return (
            <div className="h-screen w-full bg-black flex items-center justify-center text-[var(--cyan-neon)] font-mono">
                LOADING NEURAL NET...
            </div>
        );
    }

    if (error || !graphData) {
        return (
            <div className="h-screen w-full bg-black flex flex-col items-center justify-center text-[var(--danger)] font-mono gap-4">
                <div>{error || 'Crate not found'}</div>
                <button
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-[var(--cyan-neon)] text-[var(--cyan-neon)] rounded hover:bg-[var(--cyan-neon)]/10"
                >
                    RETURN
                </button>
            </div>
        );
    }

    return (
        <main className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col">
            {/* Header */}
            <header className="z-10 p-4 sm:p-6 flex justify-between items-center bg-black/50 backdrop-blur-md border-b border-[var(--cyan-neon)]/20">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => router.back()}
                        className="p-2 rounded-full hover:bg-[var(--cyan-neon)]/10 text-[var(--cyan-neon)] transition-colors"
                    >
                        <ArrowLeft size={24} />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-[var(--text-primary)]">
                            <span className="text-[var(--cyan-neon)]">{decodeURIComponent(crateName)}</span> Dependency Graph
                        </h1>
                        <p className="text-sm text-[var(--text-secondary)]">Interactive Neural Net Visualization</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <button className="p-2 rounded-lg border border-[var(--text-muted)]/30 hover:border-[var(--cyan-neon)] text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-all">
                        <Share2 size={20} />
                    </button>
                    <button className="p-2 rounded-lg border border-[var(--text-muted)]/30 hover:border-[var(--cyan-neon)] text-[var(--text-secondary)] hover:text-[var(--cyan-neon)] transition-all">
                        <Download size={20} />
                    </button>
                </div>
            </header>

            {/* Graph Container */}
            <div className="flex-1 relative w-full h-full p-4">
                <motion.div
                    className="w-full h-full"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                >
                    <DependencyGraph data={graphData} />
                </motion.div>
            </div>
        </main>
    );
}

'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Globe, Activity, AlertTriangle, ArrowUpRight, Search, Terminal, Box, Coffee, Smartphone } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

// Mock Data for "Live" Stats
const stats = [
    { label: 'Total Packages Scanned', value: '4,281,093', color: '#00D9FF' },
    { label: 'Vulnerabilities Detect', value: '12,402', color: '#FF3E9D' },
    { label: 'Critical Risks', value: '892', color: '#FF0055' },
    { label: 'Secure Packages', value: '96.4%', color: '#00FF94' },
];

const ecosystemHealth = [
    { name: 'Rust', score: 98, color: '#00D9FF', icon: Shield },
    { name: 'NPM', score: 64, color: '#FF3E9D', icon: Box },
    { name: 'PyPI', score: 78, color: '#FFD43B', icon: Terminal },
    { name: 'Maven', score: 82, color: '#C71A36', icon: Coffee },
];

const recentThreats = [
    { pkg: 'react-dom-server-core', eco: 'NPM', type: 'Malicious Code', time: '2m ago' },
    { pkg: 'tokio', eco: 'Rust', type: 'Supply Chain Alert', time: '14m ago' },
    { pkg: 'requests-http', eco: 'PyPI', type: 'Typosquatting', time: '32m ago' },
];

export default function Dashboard() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <main className="min-h-screen w-full bg-[#050810] text-white overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] h-[80vh] bg-[radial-gradient(circle_at_center,_var(--cyan-neon)_0%,_transparent_70%)] opacity-[0.03]" />
                <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-[#FF3E9D]/5 rounded-full blur-3xl opacity-20" />
            </div>

            <div className="relative z-10 container mx-auto px-6 py-12 md:py-20 max-w-7xl">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-6 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>
                        <span className="text-xs font-mono text-gray-400 uppercase tracking-wider">Global Threat Monitor Live</span>
                    </div>

                    <h1 className="text-4xl md:text-7xl font-bold tracking-tight mb-6">
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
                            GLOBAL PACKAGE
                        </span>
                        <br />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#FF3E9D]">
                            INTEGRITY DASHBOARD
                        </span>
                    </h1>

                    <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                        Real-time security analytics across the world's largest software ecosystems.
                        Detect, analyze, and neutralize supply chain threats before they execute.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full">

                    {/* Main Map / Visualizer (Mock) */}
                    <motion.div
                        className="col-span-1 md:col-span-8 row-span-2 relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden border border-white/10 bg-[#0A0E18]/50 backdrop-blur-sm group"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                    >
                        {/* Grid Overlay */}
                        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
                        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

                        {/* Content centered */}
                        <div className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            <div className="relative w-64 h-64 md:w-96 md:h-96">
                                {/* Abstract Globe Representation */}
                                <div className="absolute inset-0 rounded-full border border-white/5 animate-[spin_10s_linear_infinite]" />
                                <div className="absolute inset-4 rounded-full border border-[#00D9FF]/20 animate-[spin_15s_linear_infinite_reverse]" />
                                <div className="absolute inset-12 rounded-full border border-[#FF3E9D]/20 animate-[spin_20s_linear_infinite]" />

                                {/* Center Pulse */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                    <Shield size={64} className="text-white/80" strokeWidth={1} />
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 flex gap-4">
                                <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                                    <p className="text-xs text-gray-400">Nodes Active</p>
                                    <p className="text-xl font-mono text-[#00D9FF]">2,492</p>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-black/40 border border-white/10 backdrop-blur-md">
                                    <p className="text-xs text-gray-400">Throughput</p>
                                    <p className="text-xl font-mono text-[#00FF94]">45 GB/s</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Cards */}
                    {stats.map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            className="col-span-1 md:col-span-4 h-full p-6 rounded-3xl bg-[#0A0E18]/50 border border-white/10 backdrop-blur-sm flex flex-col justify-center"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + i * 0.1 }}
                        >
                            <h3 className="text-sm text-gray-400 font-medium mb-2">{stat.label}</h3>
                            <p className="text-4xl font-bold tracking-tight" style={{ color: stat.color }}>
                                {stat.value}
                            </p>
                        </motion.div>
                    ))}

                    {/* Ecosystem Health */}
                    <motion.div
                        className="col-span-1 md:col-span-4 row-span-2 p-6 rounded-3xl bg-[#0A0E18]/50 border border-white/10 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                            <Activity size={20} className="text-[#00D9FF]" />
                            Ecosystem Health
                        </h3>
                        <div className="space-y-6">
                            {ecosystemHealth.map((eco) => (
                                <div key={eco.name} className="group">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm font-medium text-gray-300 flex items-center gap-2">
                                            <eco.icon size={16} style={{ color: eco.color }} />
                                            {eco.name}
                                        </span>
                                        <span className="text-sm font-bold" style={{ color: eco.score > 90 ? '#00FF94' : eco.score > 70 ? '#FFD43B' : '#FF3E9D' }}>
                                            {eco.score}%
                                        </span>
                                    </div>
                                    <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full rounded-full"
                                            style={{ backgroundColor: eco.color }}
                                            initial={{ width: 0 }}
                                            animate={{ width: `${eco.score}%` }}
                                            transition={{ duration: 1, delay: 0.8 }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Live Feed */}
                    <motion.div
                        className="col-span-1 md:col-span-8 p-6 rounded-3xl bg-[#0A0E18]/50 border border-white/10 backdrop-blur-sm"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                    >
                        <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                            <AlertTriangle size={20} className="text-[#FF3E9D]" />
                            Recent Interceptions
                        </h3>
                        <div className="grid gap-3">
                            {recentThreats.map((threat, i) => (
                                <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-red-500/10 text-red-500">
                                            <AlertTriangle size={16} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white">{threat.pkg}</p>
                                            <p className="text-xs text-gray-500">{threat.type} • {threat.eco}</p>
                                        </div>
                                    </div>
                                    <span className="text-xs font-mono text-gray-500">{threat.time}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                </div>

                {/* CTA */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                >
                    <div className="flex flex-wrap items-center justify-center gap-4">
                        <Link href="/rust">
                            <button className="px-8 py-4 rounded-xl bg-[#00D9FF] text-black font-bold hover:bg-[#00c2e3] transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(0,217,255,0.3)]">
                                <Shield size={20} />
                                Scan Rust Ecosystem
                            </button>
                        </Link>
                        <Link href="/npm">
                            <button className="px-8 py-4 rounded-xl bg-[#0A0E18] text-white font-bold border border-white/10 hover:bg-white/5 transition-colors flex items-center gap-2">
                                <Box size={20} className="text-[#FF3E9D]" />
                                Explore NPM Registry
                            </button>
                        </Link>
                    </div>
                </motion.div>

            </div>
        </main>
    );
}

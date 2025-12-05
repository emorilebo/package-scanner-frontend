'use client';

import { motion } from 'framer-motion';
import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { HealthGauge, LicenseChart, RiskRadar, BusFactorAlert } from '@/components/DashboardComponents';
import { TrendChart } from '@/components/TrendChart';
import Navigation from '@/components/Navigation';
import { DashboardData } from '@/lib/mockDashboardData';

function DashboardContent() {
    const searchParams = useSearchParams();
    const crateName = searchParams.get('crate') || 'tokio'; // Default to tokio for demo
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const res = await fetch(`/api/dashboard?crate=${encodeURIComponent(crateName)}`);
                if (!res.ok) throw new Error('Failed to fetch dashboard data');
                const dashboardData = await res.json();
                setData(dashboardData);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [crateName]);

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-black flex items-center justify-center text-[var(--cyan-neon)] font-mono pt-20">
                INITIALIZING COMMAND CENTER...
            </div>
        );
    }

    if (!data) return null;

    return (
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-32 sm:pt-40">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 sm:mb-12"
            >
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
                    <span className="text-[var(--cyan-neon)] text-glow-cyan">COMMAND CENTER</span>
                    {crateName && <span className="text-white text-2xl ml-4 opacity-50">/ {crateName}</span>}
                </h1>
                <p className="text-[var(--text-secondary)] max-w-2xl">
                    Executive summary of your software supply chain health, risk metrics, and compliance status.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Health Gauge */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 }}
                    className="lg:col-span-1 cyber-border p-6 bg-[var(--bg-secondary)]/50"
                >
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--green-neon)] rounded-full"></span>
                        Project Health
                    </h2>
                    <HealthGauge score={data.overallHealth} />
                </motion.div>

                {/* Security Trend - New Feature */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.15 }}
                    className="lg:col-span-2 cyber-border p-6 bg-[var(--bg-secondary)]/50"
                >
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--cyan-neon)] rounded-full"></span>
                        Security Trend (6 Months)
                    </h2>
                    <TrendChart data={data.trendData} />
                </motion.div>

                {/* Risk Radar */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="lg:col-span-1 cyber-border p-6 bg-[var(--bg-secondary)]/50"
                >
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--cyan-neon)] rounded-full"></span>
                        Risk Analysis
                    </h2>
                    <RiskRadar data={data.riskMetrics} />
                </motion.div>

                {/* License Distribution */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="lg:col-span-1 cyber-border p-6 bg-[var(--bg-secondary)]/50"
                >
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--purple-neon)] rounded-full"></span>
                        License Compliance
                    </h2>
                    <LicenseChart data={data.licenseDistribution} />
                </motion.div>

                {/* Bus Factor Alerts */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 cyber-border p-6 bg-[var(--bg-secondary)]/50"
                >
                    <h2 className="text-xl font-bold mb-6 text-[var(--text-primary)] flex items-center gap-2">
                        <span className="w-2 h-6 bg-[var(--danger)] rounded-full"></span>
                        Bus Factor Risks
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                        These critical dependencies have only <strong>one maintainer</strong>. Consider contributing or finding alternatives.
                    </p>
                    <BusFactorAlert data={data.busFactor} />
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-1 cyber-border p-6 bg-[var(--bg-secondary)]/50 flex flex-col justify-center gap-4"
                >
                    <h2 className="text-xl font-bold mb-4 text-[var(--text-primary)]">Actions</h2>
                    <button className="w-full py-3 rounded-lg bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)] text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)] hover:text-black transition-all font-bold">
                        Export Audit Report
                    </button>
                    <button className="w-full py-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--text-muted)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)] transition-all">
                        Configure Policies
                    </button>
                </motion.div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <main className="min-h-screen w-full bg-black text-white pb-20">
            <Navigation />
            <Suspense fallback={<div className="pt-40 text-center text-[var(--cyan-neon)]">LOADING...</div>}>
                <DashboardContent />
            </Suspense>
        </main>
    );
}

'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';
import { motion } from 'framer-motion';
import { AlertTriangle, Users } from 'lucide-react';
import { DashboardData } from '@/lib/mockDashboardData';

export function HealthGauge({ score }: { score: number }) {
    const color = score >= 80 ? '#00FF66' : score >= 60 ? '#FFB800' : '#FF00F7';

    return (
        <div className="relative flex flex-col items-center justify-center h-64">
            <div className="text-6xl font-bold font-mono" style={{ color }}>
                {score}
            </div>
            <div className="text-[var(--text-secondary)] mt-2 text-sm uppercase tracking-widest">Overall Health</div>
            {/* Simple SVG Gauge Ring */}
            <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#333" strokeWidth="8" />
                <circle
                    cx="50" cy="50" r="40" fill="none" stroke={color} strokeWidth="8"
                    strokeDasharray={`${score * 2.51} 251`}
                    strokeLinecap="round"
                    className="transition-all duration-1000 ease-out"
                />
            </svg>
        </div>
    );
}

export function LicenseChart({ data }: { data: DashboardData['licenseDistribution'] }) {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                        itemStyle={{ color: '#fff' }}
                    />
                </PieChart>
            </ResponsiveContainer>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
                {data.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-2 text-xs">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }} />
                        <span className="text-[var(--text-secondary)]">{entry.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

export function RiskRadar({ data }: { data: DashboardData['riskMetrics'] }) {
    return (
        <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#333" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#888', fontSize: 12 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Risk Score"
                        dataKey="A"
                        stroke="var(--cyan-neon)"
                        fill="var(--cyan-neon)"
                        fillOpacity={0.3}
                    />
                    <Tooltip
                        contentStyle={{ backgroundColor: '#000', borderColor: '#333', borderRadius: '8px' }}
                        itemStyle={{ color: 'var(--cyan-neon)' }}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}

export function BusFactorAlert({ data }: { data: DashboardData['busFactor'] }) {
    return (
        <div className="flex flex-col gap-3">
            {data.map((crate, index) => (
                <motion.div
                    key={crate.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--danger)]/10 border border-[var(--danger)]/30"
                >
                    <div className="flex items-center gap-3">
                        <AlertTriangle size={18} className="text-[var(--danger)]" />
                        <div>
                            <div className="font-mono text-sm font-bold text-[var(--danger)]">{crate.name}</div>
                            <div className="text-xs text-[var(--text-secondary)]">{crate.downloads} downloads</div>
                        </div>
                    </div>
                    <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
                        <Users size={14} />
                        <span>{crate.maintainers} maintainer</span>
                    </div>
                </motion.div>
            ))}
        </div>
    );
}

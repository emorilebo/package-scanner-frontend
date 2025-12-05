export interface DashboardData {
    overallHealth: number;
    licenseDistribution: { name: string; value: number; color: string }[];
    riskMetrics: { subject: string; A: number; fullMark: number }[];
    busFactor: { name: string; maintainers: number; downloads: string }[];
    trendData: { date: string; score: number }[];
}

export function generateMockDashboardData(): DashboardData {
    return {
        overallHealth: 78,
        licenseDistribution: [
            { name: 'MIT', value: 45, color: '#00F3FF' }, // Cyan
            { name: 'Apache-2.0', value: 30, color: '#00FF66' }, // Green
            { name: 'BSD', value: 15, color: '#B620E0' }, // Purple
            { name: 'GPL', value: 5, color: '#FFB800' }, // Yellow
            { name: 'Unknown', value: 5, color: '#FF00F7' }, // Pink
        ],
        riskMetrics: [
            { subject: 'Maintenance', A: 85, fullMark: 100 },
            { subject: 'Community', A: 90, fullMark: 100 },
            { subject: 'Security', A: 65, fullMark: 100 },
            { subject: 'Popularity', A: 70, fullMark: 100 },
            { subject: 'Size', A: 80, fullMark: 100 },
        ],
        busFactor: [
            { name: 'critical-lib-x', maintainers: 1, downloads: '1.2M' },
            { name: 'legacy-parser', maintainers: 1, downloads: '500K' },
            { name: 'unsafe-wrapper', maintainers: 1, downloads: '250K' },
        ],
        trendData: [
            { date: 'Jan', score: 65 },
            { date: 'Feb', score: 68 },
            { date: 'Mar', score: 72 },
            { date: 'Apr', score: 70 },
            { date: 'May', score: 75 },
            { date: 'Jun', score: 78 },
        ],
    };
}

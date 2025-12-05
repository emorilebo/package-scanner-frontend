import { NextResponse } from 'next/server';

const USER_AGENT = 'PackageScannerFrontend/1.0 (contact@example.com)';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const crateName = searchParams.get('crate');

    if (!crateName) {
        // Return default/mock data if no crate specified (or handle as error)
        // For the dashboard, we want to show *something* even if just landing there.
        // But the plan says we'll pass ?crate=name.
        return NextResponse.json({ error: 'Crate name is required' }, { status: 400 });
    }

    try {
        // 1. Fetch Crate Metadata
        const res = await fetch(`https://crates.io/api/v1/crates/${crateName}`, {
            headers: { 'User-Agent': USER_AGENT },
        });

        if (!res.ok) throw new Error('Crate not found');

        const data = await res.json();
        const crate = data.crate;

        // 2. Calculate Metrics
        // Health: Based on downloads and maintenance
        const daysSinceUpdate = (new Date().getTime() - new Date(crate.updated_at).getTime()) / (1000 * 3600 * 24);
        const maintenanceScore = Math.max(0, 100 - Math.min(daysSinceUpdate / 3, 50)); // Penalize if > 1 year old
        const popularityScore = Math.min(100, (crate.recent_downloads || 0) / 1000); // Cap at 100k downloads

        const overallHealth = Math.round((maintenanceScore + popularityScore) / 2);

        // License (Mocked distribution for now as we only have 1 crate)
        // In a real app, we'd scan the dependency tree for this.
        const licenseDistribution = [
            { name: 'MIT', value: 60, color: '#00F3FF' },
            { name: 'Apache-2.0', value: 30, color: '#00FF66' },
            { name: 'Other', value: 10, color: '#FF00F7' },
        ];

        // Risk Metrics
        const riskMetrics = [
            { subject: 'Maintenance', A: Math.round(maintenanceScore), fullMark: 100 },
            { subject: 'Community', A: Math.round(popularityScore), fullMark: 100 },
            { subject: 'Security', A: 85, fullMark: 100 }, // Placeholder
            { subject: 'Popularity', A: Math.min(100, Math.round(crate.downloads / 10000)), fullMark: 100 },
            { subject: 'Size', A: 90, fullMark: 100 }, // Placeholder
        ];

        // Bus Factor (Mocked for single crate view)
        const busFactor = [
            { name: crateName, maintainers: 1, downloads: crate.downloads.toLocaleString() }, // We'd need to fetch /owners to be accurate
        ];

        // Trend Data (Mocked history based on current score)
        const trendData = [
            { date: 'Jan', score: Math.max(0, overallHealth - 10) },
            { date: 'Feb', score: Math.max(0, overallHealth - 5) },
            { date: 'Mar', score: overallHealth },
            { date: 'Apr', score: Math.min(100, overallHealth + 2) },
            { date: 'May', score: Math.min(100, overallHealth + 5) },
            { date: 'Jun', score: overallHealth },
        ];

        return NextResponse.json({
            overallHealth,
            licenseDistribution,
            riskMetrics,
            busFactor,
            trendData,
        });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
    }
}

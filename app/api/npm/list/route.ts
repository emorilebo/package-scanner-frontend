import { NextRequest, NextResponse } from 'next/server';

const NPM_REGISTRY_SEARCH = 'https://registry.npmjs.org/-/v1/search';

interface NpmSearchResult {
    objects: {
        package: {
            name: string;
            version: string;
            description: string;
            date: string;
            publisher: { username: string; email: string };
            maintainers: { username: string; email: string }[];
            links: {
                npm: string;
                homepage?: string;
                repository?: string;
                bugs?: string;
            };
            keywords?: string[];
        };
        score: {
            final: number;
            detail: {
                quality: number;
                popularity: number;
                maintenance: number;
            };
        };
    }[];
    total: number;
}

function calculateHealthScore(pkg: any, npmScore: any): number {
    // NPM provides its own scores (0-1), we can scale and adjust them
    // quality, popularity, maintenance

    // Base score from NPM (weighted average)
    const baseScore = (npmScore.detail.quality * 0.4 + npmScore.detail.maintenance * 0.35 + npmScore.detail.popularity * 0.25) * 100;

    // Adjustments
    let score = Math.round(baseScore);

    // Penalize deprecated (if we had that info, strictly typically in metadata, handled by quality)

    return Math.min(100, Math.max(0, score));
}

function getHealthStatus(score: number): { label: string; color: string; emoji: string } {
    if (score >= 80) return { label: 'Healthy', color: 'green', emoji: '🟢' };
    if (score >= 60) return { label: 'Warning', color: 'yellow', emoji: '🟡' };
    if (score >= 40) return { label: 'Stale', color: 'orange', emoji: '🟠' };
    return { label: 'Risky', color: 'red', emoji: '🔴' };
}

function formatDownloads(score: number): string {
    // NPM search doesn't give exact download counts in the search object easily without extra calls
    // But popularity score is a proxy.
    // For listing, we might mock or use the score as a proxy if we want to avoid N+1 calls for every item in list
    // OR we can fetch download counts for top items. 
    // For speed, let's just return a placeholder or "High" based on popularity for now
    // UPDATE: We can actually fetch point stats like https://api.npmjs.org/downloads/point/last-month/{package}
    // But that is rate limited. Let's rely on popularity score for the list view or generic "Popularity: X%"

    return `${Math.round(score * 100)}% Pop.`;
}

export async function GET(request: NextRequest) {
    try {
        const searchParams = request.nextUrl.searchParams;
        const query = searchParams.get('q') || 'keywords:popular'; // default to popular packages
        const page = parseInt(searchParams.get('page') || '1');
        const perPage = parseInt(searchParams.get('per_page') || '20');

        // NPM API uses 'from' for pagination
        const from = (page - 1) * perPage;

        const url = `${NPM_REGISTRY_SEARCH}?text=${encodeURIComponent(query)}&size=${perPage}&from=${from}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`NPM API error: ${response.status}`);
        }

        const data: NpmSearchResult = await response.json();

        const packagesWithScores = data.objects.map(obj => {
            const pkg = obj.package;
            const score = calculateHealthScore(pkg, obj.score);
            const status = getHealthStatus(score);

            return {
                name: pkg.name,
                version: pkg.version,
                description: pkg.description || 'No description',
                repository: pkg.links.repository,
                downloads: formatDownloads(obj.score.detail.popularity), // Using popularity as proxy for list view
                totalDownloads: 0, // Not available in search view efficiently
                score: score,
                status: status.label,
                statusColor: status.color,
                statusEmoji: status.emoji,
                lastUpdated: new Date(pkg.date).toLocaleDateString(),
                dependencies: 0, // Not in search view
                securityIssues: { critical: 0, high: 0, medium: 0, low: 0 }, // Requires deep scan
                features: pkg.keywords || [],
                versionCount: 0,
                authors: pkg.maintainers.map(m => m.username),
                license: 'Unknown', // Often not in search result top level
                createdAt: pkg.date, // Approx
                updatedAt: pkg.date
            };
        });

        // Sort by score ascending (worst health first)
        const sortedPackages = packagesWithScores.sort((a, b) => a.score - b.score);

        return NextResponse.json({
            packages: sortedPackages,
            meta: {
                total: data.total,
                page,
                per_page: perPage,
                totalPages: Math.ceil(data.total / perPage)
            }
        });

    } catch (error: any) {
        console.error('Error fetching npm packages:', error);
        return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
    }
}

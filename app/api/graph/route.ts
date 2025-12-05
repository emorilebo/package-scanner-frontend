import { NextResponse } from 'next/server';

const USER_AGENT = 'PackageScannerFrontend/1.0 (contact@example.com)';

interface GraphNode {
    id: string;
    name: string;
    group: 'root' | 'dependency' | 'transitive';
    riskScore: number;
    val: number;
}

interface GraphLink {
    source: string;
    target: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const crateName = searchParams.get('crate');

    if (!crateName) {
        return NextResponse.json({ error: 'Crate name is required' }, { status: 400 });
    }

    try {
        const nodes: GraphNode[] = [];
        const links: GraphLink[] = [];
        const visited = new Set<string>();

        // 1. Fetch Root Crate
        const rootRes = await fetch(`https://crates.io/api/v1/crates/${crateName}`, {
            headers: { 'User-Agent': USER_AGENT },
        });

        if (!rootRes.ok) throw new Error('Crate not found');

        const rootData = await rootRes.json();
        const latestVersion = rootData.crate.max_version;

        nodes.push({
            id: crateName,
            name: crateName,
            group: 'root',
            riskScore: 95, // Placeholder: In real app, calculate this
            val: 20,
        });
        visited.add(crateName);

        // 2. Fetch Direct Dependencies
        const depsRes = await fetch(`https://crates.io/api/v1/crates/${crateName}/${latestVersion}/dependencies`, {
            headers: { 'User-Agent': USER_AGENT },
        });
        const depsData = await depsRes.json();

        for (const dep of depsData.dependencies) {
            if (!visited.has(dep.crate_id)) {
                nodes.push({
                    id: dep.crate_id,
                    name: dep.crate_id,
                    group: 'dependency',
                    riskScore: Math.floor(Math.random() * 40) + 60, // Random score for demo
                    val: 10,
                });
                visited.add(dep.crate_id);
            }

            links.push({
                source: crateName,
                target: dep.crate_id,
            });

            // 3. Fetch Transitive Dependencies (Limit to first 5 to avoid timeout/rate-limit)
            // In a production app, we would cache this or use a graph DB.
            if (nodes.length < 20) {
                try {
                    // We need the latest version of the dependency to get its dependencies
                    // This is an extra call, so we'll skip it for now to keep it fast and simple for the demo
                    // Or we can just simulate some transitive nodes if needed, but let's keep it real-ish.
                    // For now, we only show direct dependencies to ensure speed.
                } catch (e) {
                    console.error(`Failed to fetch transitive deps for ${dep.crate_id}`);
                }
            }
        }

        return NextResponse.json({ nodes, links });

    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ error: 'Failed to fetch graph data' }, { status: 500 });
    }
}

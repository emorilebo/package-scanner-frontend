export interface GraphNode {
    id: string;
    name: string;
    version: string;
    group: 'root' | 'direct' | 'transitive';
    riskScore: number; // 0-100
    val: number; // Size of node
}

export interface GraphLink {
    source: string;
    target: string;
}

export interface GraphData {
    nodes: GraphNode[];
    links: GraphLink[];
}

const COLORS = {
    root: '#00F3FF',    // Cyan
    safe: '#00FF66',    // Green
    warning: '#FFB800', // Yellow/Orange
    risky: '#FF00F7',   // Pink/Red
};

export function generateMockGraph(rootCrateName: string): GraphData {
    const nodes: GraphNode[] = [];
    const links: GraphLink[] = [];

    // Root node
    nodes.push({
        id: rootCrateName,
        name: rootCrateName,
        version: '1.0.0',
        group: 'root',
        riskScore: 95,
        val: 20,
    });

    // Helper to get color based on score
    const getRiskScore = () => Math.floor(Math.random() * 100);

    // Generate direct dependencies
    const directDepsCount = 5 + Math.floor(Math.random() * 10);
    for (let i = 0; i < directDepsCount; i++) {
        const name = `dep-${i}`;
        const score = getRiskScore();
        nodes.push({
            id: name,
            name: name,
            version: `0.${Math.floor(Math.random() * 10)}.0`,
            group: 'direct',
            riskScore: score,
            val: 10,
        });
        links.push({
            source: rootCrateName,
            target: name,
        });

        // Generate transitive dependencies
        const transitiveDepsCount = Math.floor(Math.random() * 5);
        for (let j = 0; j < transitiveDepsCount; j++) {
            const transName = `trans-${i}-${j}`;
            const transScore = getRiskScore();
            nodes.push({
                id: transName,
                name: transName,
                version: `0.0.${Math.floor(Math.random() * 10)}`,
                group: 'transitive',
                riskScore: transScore,
                val: 5,
            });
            links.push({
                source: name,
                target: transName,
            });
        }
    }

    return { nodes, links };
}

export function getNodeColor(node: GraphNode): string {
    if (node.group === 'root') return COLORS.root;
    if (node.riskScore >= 80) return COLORS.safe;
    if (node.riskScore >= 60) return COLORS.warning;
    return COLORS.risky;
}

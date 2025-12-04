import { NextRequest, NextResponse } from 'next/server';

const CRATES_IO_API = 'https://crates.io/api/v1';

interface CratesIoCrate {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
  downloads: number;
  recent_downloads: number | null;
  max_version: string;
  repository: string | null;
  homepage: string | null;
  documentation: string | null;
  exact_match: boolean;
}

interface CratesIoResponse {
  crates: CratesIoCrate[];
  meta: {
    total: number;
  };
}

interface CrateVersion {
  num: string;
  created_at: string;
  updated_at: string;
  downloads: number;
  yanked: boolean;
}

interface CrateDetailResponse {
  crate: {
    name: string;
    description: string | null;
    repository: string | null;
    homepage: string | null;
    documentation: string | null;
    downloads: number;
    recent_downloads: number | null;
    max_version: string;
    created_at: string;
    updated_at: string;
    categories: string[];
    keywords: string[];
    keywords: string[];
    authors: string[];
    license: string | null;
  };
  versions: CrateVersion[];
}

// Health scoring algorithm
function calculateHealthScore(crate: CratesIoCrate, version: CrateVersion | null): number {
  const now = new Date();
  const updatedAt = new Date(version?.updated_at || crate.updated_at);
  const daysSinceUpdate = Math.floor((now.getTime() - updatedAt.getTime()) / (1000 * 60 * 60 * 24));

  // Recency (40%)
  let recencyScore = 0;
  if (daysSinceUpdate <= 30) recencyScore = 100;
  else if (daysSinceUpdate <= 90) recencyScore = 90;
  else if (daysSinceUpdate <= 180) recencyScore = 80;
  else if (daysSinceUpdate <= 365) recencyScore = 60;
  else if (daysSinceUpdate <= 730) recencyScore = 30;
  else recencyScore = 10;

  // Maintenance (30%) - Simplified (would need GitHub API for full analysis)
  let maintenanceScore = 50; // Base score
  if (crate.repository) maintenanceScore += 25; // Has repository
  if (daysSinceUpdate <= 90) maintenanceScore += 25; // Recent activity

  // Community (20%) - Based on downloads
  let communityScore = 0;
  const totalDownloads = crate.downloads;
  if (totalDownloads > 10_000_000) communityScore = 100;
  else if (totalDownloads > 1_000_000) communityScore = 80;
  else if (totalDownloads > 100_000) communityScore = 60;
  else if (totalDownloads > 10_000) communityScore = 40;
  else if (totalDownloads > 1_000) communityScore = 20;
  else communityScore = 10;

  // Stability (10%) - Based on version count and downloads
  let stabilityScore = 50; // Base score
  if (version && !version.yanked) stabilityScore += 30;
  if (totalDownloads > 100_000) stabilityScore += 20;

  // Weighted calculation
  const finalScore = Math.round(
    recencyScore * 0.4 +
    maintenanceScore * 0.3 +
    communityScore * 0.2 +
    stabilityScore * 0.1
  );

  return Math.min(100, Math.max(0, finalScore));
}

function getHealthStatus(score: number): { label: string; color: string; emoji: string } {
  if (score >= 80) return { label: 'Healthy', color: 'green', emoji: '🟢' };
  if (score >= 60) return { label: 'Warning', color: 'yellow', emoji: '🟡' };
  if (score >= 40) return { label: 'Stale', color: 'orange', emoji: '🟠' };
  return { label: 'Risky', color: 'red', emoji: '🔴' };
}

function formatDownloads(downloads: number): string {
  if (downloads >= 1_000_000) return `${(downloads / 1_000_000).toFixed(1)}M`;
  if (downloads >= 1_000) return `${(downloads / 1_000).toFixed(1)}K`;
  return downloads.toString();
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const query = searchParams.get('q') || '';
    const page = parseInt(searchParams.get('page') || '1');
    const perPage = parseInt(searchParams.get('per_page') || '20');

    let url = `${CRATES_IO_API}/crates`;
    if (query) {
      url += `?q=${encodeURIComponent(query)}&per_page=${perPage}&page=${page}`;
    } else {
      url += `?per_page=${perPage}&page=${page}&sort=downloads`;
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'rust_secure_dependency_audit_web/1.0',
      },
    });

    if (!response.ok) {
      throw new Error(`Crates.io API error: ${response.status}`);
    }

    const data: CratesIoResponse = await response.json();

    // Fetch detailed info for crates (with rate limiting)
    const cratesWithScores = await Promise.allSettled(
      data.crates.slice(0, perPage).map(async (crate, index) => {
        // Add delay to respect rate limits
        if (index > 0 && index % 5 === 0) {
          await new Promise(resolve => setTimeout(resolve, 200));
        }

        try {
          const detailResponse = await fetch(`${CRATES_IO_API}/crates/${crate.name}`, {
            headers: {
              'User-Agent': 'rust_secure_dependency_audit_web/1.0',
            },
          });

          if (!detailResponse.ok) {
            throw new Error(`Failed to fetch details for ${crate.name}`);
          }

          const detailData: CrateDetailResponse = await detailResponse.json();
          const latestVersion = detailData.versions[0];
          const score = calculateHealthScore(crate, latestVersion);
          const status = getHealthStatus(score);

          return {
            name: crate.name,
            version: crate.max_version,
            description: crate.description || 'No description available',
            repository: crate.repository,
            downloads: formatDownloads(crate.downloads),
            totalDownloads: crate.downloads,
            score,
            status: status.label,
            statusColor: status.color,
            statusEmoji: status.emoji,
            lastUpdated: new Date(latestVersion?.updated_at || crate.updated_at).toLocaleDateString(),
            dependencies: 0, // Would need to fetch Cargo.toml or use dependency API
            securityIssues: {
              critical: 0,
              high: 0,
              medium: 0,
              low: 0,
            },
            features: [],
            versionCount: detailData.versions.length,
            authors: detailData.crate.authors || [],
            license: detailData.crate.license || 'Unknown',
            createdAt: crate.created_at,
            updatedAt: latestVersion?.updated_at || crate.updated_at,
          };
        } catch (error) {
          console.error(`Error processing crate ${crate.name}:`, error);
          // Return basic info with default score
          const score = calculateHealthScore(crate, null);
          const status = getHealthStatus(score);
          return {
            name: crate.name,
            version: crate.max_version,
            description: crate.description || 'No description available',
            repository: crate.repository,
            downloads: formatDownloads(crate.downloads),
            totalDownloads: crate.downloads,
            score,
            status: status.label,
            statusColor: status.color,
            statusEmoji: status.emoji,
            lastUpdated: new Date(crate.updated_at).toLocaleDateString(),
            dependencies: 0,
            securityIssues: {
              critical: 0,
              high: 0,
              medium: 0,
              low: 0,
            },
            features: [],
            versionCount: 0,
            versionCount: 0,
            authors: [],
            license: 'Unknown',
            createdAt: crate.created_at,
            updatedAt: crate.updated_at,
          };
        }
      })
    );

    // Extract successful results
    const successfulCrates = cratesWithScores
      .filter((result): result is PromiseFulfilledResult<any> => result.status === 'fulfilled')
      .map(result => result.value);

    return NextResponse.json({
      crates: successfulCrates,
      meta: {
        total: data.meta.total,
        page,
        perPage,
        totalPages: Math.ceil(data.meta.total / perPage),
      },
    });
  } catch (error) {
    console.error('Error fetching crates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch crates', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}


import { z } from 'zod';

export interface Vulnerability {
    type: 'suspect-script' | 'malicious-file' | 'metadata-risk';
    severity: 'critical' | 'high' | 'medium' | 'low';
    description: string;
    location: string;
}

export interface AnalysisResult {
    packageName: string;
    version?: string;
    vulnerabilities: Vulnerability[];
    meta: {
        registryAgeDays?: number;
        lastModified?: string;
    };
    score?: number; // Added for frontend health scoring
}

export const PackageJsonSchema = z.object({
    name: z.string().optional(),
    version: z.string().optional(),
    scripts: z.record(z.string(), z.string()).optional(),
    dependencies: z.record(z.string(), z.string()).optional(),
    devDependencies: z.record(z.string(), z.string()).optional(),
}).passthrough();

export type PackageJson = z.infer<typeof PackageJsonSchema>;

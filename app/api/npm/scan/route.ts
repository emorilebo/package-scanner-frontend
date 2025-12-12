import { NextRequest, NextResponse } from 'next/server';
import { AnalyzerService } from '@/lib/npm-sentinel/AnalyzerService';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { exec } from 'child_process';
import util from 'util';

const execAsync = util.promisify(exec);

export async function POST(req: NextRequest) {
    const { packageName, version } = await req.json();

    if (!packageName) {
        return NextResponse.json({ error: 'Package name is required' }, { status: 400 });
    }

    const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'npm-scan-'));
    const targetDir = path.join(tempDir, 'package');

    try {
        // 1. Download Package using npm pack
        // We assume npm is installed in the environment (Vercel usually has it)
        const versionTag = version ? `@${version}` : '@latest';
        await execAsync(`npm pack ${packageName}${versionTag}`, { cwd: tempDir });

        // Find the .tgz file
        const files = await fs.readdir(tempDir);
        const tgzFile = files.find(f => f.endsWith('.tgz'));

        if (!tgzFile) {
            throw new Error('Failed to download package');
        }

        // 2. Extract
        await execAsync(`tar -xzf ${tgzFile}`, { cwd: tempDir });

        // 3. Analyze
        // npm pack usually extracts to a 'package' folder
        const analyzer = new AnalyzerService();
        const result = await analyzer.analyze(targetDir);

        // 4. Cleanup
        await fs.remove(tempDir);

        return NextResponse.json({ success: true, report: result });

    } catch (error: any) {
        // Ensure cleanup
        try { await fs.remove(tempDir); } catch (e) { }

        console.error("Scan error:", error);
        return NextResponse.json({
            success: false,
            error: error.message || 'Scan failed'
        }, { status: 500 });
    }
}

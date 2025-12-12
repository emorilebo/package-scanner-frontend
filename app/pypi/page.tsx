'use client';

import { FileCode, Terminal } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

export default function PyPiPage() {
    return (
        <ComingSoon
            platform="PyPI"
            description="Advanced security analysis for Python packages. Detect malicious code, typo-squatting, and dependency confusion attacks."
            icon={Terminal}
            color="#FFD43B" // PyPI Yellow
        />
    );
}

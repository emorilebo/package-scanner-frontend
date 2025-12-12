'use client';

import { Zap } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

export default function GoPage() {
    return (
        <ComingSoon
            platform="Go Modules"
            description="Fast and reliable vulnerability detection for Go modules. Ensure your Go codebase remains secure and compliant."
            icon={Zap} // Using Zap as Go is fast
            color="#00ADD8" // Go Cyan
        />
    );
}

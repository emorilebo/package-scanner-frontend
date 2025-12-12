'use client';

import { Coffee } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

export default function MavenPage() {
    return (
        <ComingSoon
            platform="Maven"
            description="Enterprise-grade security scanning for Java and JVM artifacts. Deep analysis of JARs, WARs, and transitive dependencies."
            icon={Coffee}
            color="#C71A36" // Java/Maven Red
        />
    );
}

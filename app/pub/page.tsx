'use client';

import { Smartphone } from 'lucide-react';
import ComingSoon from '@/components/ComingSoon';

export default function PubPage() {
    return (
        <ComingSoon
            platform="Pub.dev"
            description="Secure your Flutter and Dart applications. Comprehensive auditing for pub packages and cross-platform dependencies."
            icon={Smartphone}
            color="#0175C2" // Dart Blue
        />
    );
}

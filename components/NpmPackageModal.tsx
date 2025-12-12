'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, AlertTriangle, CheckCircle, Box, Download, ExternalLink, Play, Loader2 } from 'lucide-react';
import { NpmPackageData } from './NpmPackageCard';
import RankBadge from './RankBadge';
import { useState } from 'react';

interface NpmPackageModalProps {
    packageData: NpmPackageData | null;
    onClose: () => void;
}

export default function NpmPackageModal({ packageData, onClose }: NpmPackageModalProps) {
    const [scanning, setScanning] = useState(false);
    const [scanResult, setScanResult] = useState<any>(null);

    if (!packageData) return null;

    const handleDeepScan = async () => {
        setScanning(true);
        try {
            const res = await fetch('/api/npm/scan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packageName: packageData.name, version: packageData.version })
            });
            const data = await res.json();
            if (data.success) {
                setScanResult(data.report);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setScanning(false);
        }
    };

    // Use scan result if available, otherwise original data
    const currentScore = scanResult ? scanResult.score : packageData.score;
    const vulns = scanResult ? scanResult.vulnerabilities : (packageData.securityIssues ? [] : []); // Assuming original data doesn't have deep vulns yet
    const hasBeenScanned = !!scanResult;

    return (
        <AnimatePresence>
            <motion.div
                className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            >
                <div className="absolute inset-0 bg-black/40" />

                <motion.div
                    className="relative cyber-border max-w-4xl w-full max-h-[90vh] overflow-y-auto bg-[var(--bg-secondary)] border-[var(--pink-neon)]/30"
                    initial={{ scale: 0.95, opacity: 0, y: 30 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    exit={{ scale: 0.95, opacity: 0, y: 30 }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 p-2 text-[var(--text-secondary)] hover:text-[var(--pink-neon)] hover:bg-[var(--pink-neon)]/10 rounded-lg transition-colors"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex flex-col md:flex-row gap-8">
                        {/* Left Column: Info */}
                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-4">
                                <Box size={32} className="text-[var(--pink-neon)]" />
                                <div>
                                    <h2 className="text-3xl font-bold font-mono text-[var(--pink-neon)] text-glow-pink">
                                        {packageData.name}
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm px-2 py-0.5 rounded bg-[var(--pink-neon)]/10 text-[var(--pink-neon)] border border-[var(--pink-neon)]/20">
                                            v{packageData.version}
                                        </span>
                                        <span className="text-sm text-[var(--text-secondary)]">by {packageData.authors?.[0] || 'Unknown'}</span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-[var(--text-primary)] text-lg mb-6 leading-relaxed">
                                {packageData.description}
                            </p>

                            <div className="flex gap-4 mb-8">
                                <a href={`https://npmjs.com/package/${packageData.name}`} target="_blank" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--pink-neon)] transition-colors">
                                    <ExternalLink size={16} /> View on NPM
                                </a>
                                {packageData.repository && (
                                    <a href={packageData.repository} target="_blank" className="flex items-center gap-2 text-sm text-[var(--text-secondary)] hover:text-[var(--pink-neon)] transition-colors">
                                        <ExternalLink size={16} /> Repository
                                    </a>
                                )}
                            </div>

                            {/* Deep Scan Action */}
                            {!hasBeenScanned && (
                                <div className="p-6 rounded-2xl bg-[var(--bg-elevated)] border border-[var(--pink-neon)]/20 mb-6">
                                    <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Security Analysis</h3>
                                    <p className="text-sm text-[var(--text-secondary)] mb-4">
                                        Perform a deep recursive scan of the package contents to detect hidden malware, Base64 payloads, and suspicious scripts.
                                    </p>
                                    <button
                                        onClick={handleDeepScan}
                                        disabled={scanning}
                                        className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[var(--pink-neon)] to-red-600 text-white font-bold hover:shadow-[0_0_20px_var(--pink-glow)] transition-all disabled:opacity-50"
                                    >
                                        {scanning ? <Loader2 className="animate-spin" /> : <Play size={18} fill="currentColor" />}
                                        {scanning ? 'Analyzing Tarball...' : 'Run Deep Scan'}
                                    </button>
                                </div>
                            )}

                            {/* Scan Results */}
                            {(hasBeenScanned) && (
                                <div className="space-y-4">
                                    <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <Shield className="text-[var(--pink-neon)]" />
                                        Deep Scan Results
                                    </h3>

                                    {vulns.length === 0 ? (
                                        <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center gap-3">
                                            <CheckCircle className="text-green-500" />
                                            <div>
                                                <div className="font-bold text-green-400">Analysis Clean</div>
                                                <div className="text-sm opacity-80">No suspicious patterns found in scripts or files.</div>
                                            </div>
                                        </div>
                                    ) : (
                                        vulns.map((v: any, i: number) => (
                                            <div key={i} className="p-4 rounded-xl bg-[var(--bg-elevated)] border-l-4 border-red-500">
                                                <div className="flex justify-between">
                                                    <span className="font-bold text-red-400">{v.type}</span>
                                                    <span className="text-xs bg-red-500/20 text-red-500 px-2 rounded uppercase">{v.severity}</span>
                                                </div>
                                                <p className="text-sm mt-1">{v.description}</p>
                                                <div className="text-xs font-mono opacity-50 mt-2">{v.location}</div>
                                            </div>
                                        ))
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Right Column: Stats */}
                        <div className="w-full md:w-64 flex-shrink-0">
                            <div className="mb-6 flex justify-center">
                                <RankBadge score={currentScore} size="lg" />
                            </div>

                            <div className="space-y-4">
                                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--text-muted)]/20">
                                    <div className="text-xs text-[var(--text-muted)] uppercase mb-1">Downloads</div>
                                    <div className="text-xl font-mono font-bold">{packageData.downloads}</div>
                                </div>
                                <div className="p-4 rounded-xl bg-[var(--bg-elevated)] border border-[var(--text-muted)]/20">
                                    <div className="text-xs text-[var(--text-muted)] uppercase mb-1">Last Update</div>
                                    <div className="text-lg font-mono">{packageData.lastUpdated}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}

'use client';

import { motion } from 'framer-motion';
import { Shield, Zap, Lock, TrendingUp } from 'lucide-react';
import SearchTerminal from '@/components/SearchTerminal';
import CyberCard from '@/components/CyberCard';
import GlitchText from '@/components/GlitchText';
import RankBadge from '@/components/RankBadge';
import CrateCard, { CrateData } from '@/components/CrateCard';
import PackageModal from '@/components/PackageModal';
import Navigation from '@/components/Navigation';
import { useState } from 'react';

// Mock data for demonstration
const mockTopCrates = [
  {
    name: 'tokio',
    score: 95,
    downloads: '150M',
    description: 'Asynchronous runtime for Rust',
    version: '1.35.0',
    repository: 'https://github.com/tokio-rs/tokio',
    lastUpdated: '2 days ago',
    dependencies: 12,
    securityIssues: { critical: 0, high: 0, medium: 0, low: 0 },
    features: ['Async I/O', 'Multi-threaded runtime', 'Timer utilities', 'TCP/UDP support']
  },
  {
    name: 'serde',
    score: 92,
    downloads: '200M',
    description: 'Serialization framework',
    version: '1.0.195',
    repository: 'https://github.com/serde-rs/serde',
    lastUpdated: '1 week ago',
    dependencies: 0,
    securityIssues: { critical: 0, high: 0, medium: 1, low: 0 },
    features: ['Derive macros', 'Zero-copy deserialization', 'Data formats', 'Custom serializers']
  },
  {
    name: 'reqwest',
    score: 88,
    downloads: '80M',
    description: 'HTTP client',
    version: '0.11.23',
    repository: 'https://github.com/seanmonstar/reqwest',
    lastUpdated: '3 days ago',
    dependencies: 24,
    securityIssues: { critical: 0, high: 1, medium: 2, low: 1 },
    features: ['Async/blocking clients', 'JSON support', 'Cookie jar', 'Proxy support']
  },
  {
    name: 'actix-web',
    score: 85,
    downloads: '45M',
    description: 'Web framework',
    version: '4.4.1',
    repository: 'https://github.com/actix/actix-web',
    lastUpdated: '1 week ago',
    dependencies: 18,
    securityIssues: { critical: 0, high: 0, medium: 3, low: 2 },
    features: ['Middleware', 'WebSockets', 'HTTP/2', 'Request routing']
  },
  {
    name: 'diesel',
    score: 82,
    downloads: '30M',
    description: 'ORM and query builder',
    version: '2.1.4',
    repository: 'https://github.com/diesel-rs/diesel',
    lastUpdated: '2 weeks ago',
    dependencies: 15,
    securityIssues: { critical: 0, high: 1, medium: 4, low: 3 },
    features: ['Type-safe queries', 'Migration system', 'Connection pooling', 'Multiple backends']
  },
  {
    name: 'clap',
    score: 90,
    downloads: '90M',
    description: 'Command line parser',
    version: '4.4.12',
    repository: 'https://github.com/clap-rs/clap',
    lastUpdated: '5 days ago',
    dependencies: 8,
    securityIssues: { critical: 0, high: 0, medium: 1, low: 1 },
    features: ['Derive API', 'Auto-generated help', 'Subcommands', 'Shell completions']
  },
];

const features = [
  {
    icon: Shield,
    title: 'Security Audit',
    description: 'Comprehensive vulnerability scanning and security analysis',
    color: 'cyan'
  },
  {
    icon: Zap,
    title: 'Real-time Rankings',
    description: 'Live updates on crate security scores and rankings',
    color: 'pink'
  },
  {
    icon: Lock,
    title: 'Dependency Check',
    description: 'Deep analysis of dependency trees and potential risks',
    color: 'green'
  },
  {
    icon: TrendingUp,
    title: 'Trend Analysis',
    description: 'Track security trends and improvements over time',
    color: 'purple'
  }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<CrateData | null>(null);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handlePackageClick = (pkg: CrateData) => {
    setSelectedPackage(pkg);
  };

  // Filter crates based on search query
  const filteredCrates = searchQuery.trim()
    ? mockTopCrates.filter(crate =>
      crate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      crate.description.toLowerCase().includes(searchQuery.toLowerCase())
    )
    : mockTopCrates;

  return (
    <div className="relative min-h-screen">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section */}
      <section className="relative z-10 pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          {/* Title */}
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold mb-6">
              <GlitchText glitchOnHover className="text-glow-cyan">
                RUST
              </GlitchText>
              <br />
              <span className="text-[var(--pink-neon)] text-glow-pink">
                SECURITY
              </span>
              <br />
              <span className="text-[var(--green-neon)] text-glow-green">
                SCANNER
              </span>
            </h1>
            <motion.p
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-[var(--text-secondary)] font-mono max-w-3xl mx-auto px-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              Real-time security analysis for Rust crates.
              <br />
              Protect your dependencies. Build with confidence.
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <motion.div
            className="mb-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <SearchTerminal
              onSearch={handleSearch}
              placeholder="$ cargo search <crate_name>"
            />
          </motion.div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
              >
                <CyberCard
                  glowColor={feature.color as any}
                  className="h-full"
                >
                  <feature.icon
                    size={40}
                    className="mb-4"
                    style={{ color: `var(--${feature.color}-neon)` }}
                  />
                  <h3 className="text-xl font-bold mb-2 text-[var(--text-primary)]">
                    {feature.title}
                  </h3>
                  <p className="text-[var(--text-secondary)] text-sm">
                    {feature.description}
                  </p>
                </CyberCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Ranked Crates */}
      <section className="relative z-10 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-12 text-[var(--cyan-neon)] text-glow-cyan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            {searchQuery ? 'Search Results' : 'Top Ranked Crates'}
          </motion.h2>

          {filteredCrates.length === 0 ? (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <p className="text-2xl text-[var(--text-secondary)] mb-4">No crates found</p>
              <p className="text-[var(--text-muted)]">Try searching for something else</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCrates.map((crate, index) => (
                <CrateCard
                  key={crate.name}
                  crate={crate}
                  onClick={handlePackageClick}
                  index={index}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0
                ? 'var(--cyan-neon)'
                : i % 3 === 1
                  ? 'var(--pink-neon)'
                  : 'var(--green-neon)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Package Detail Modal */}
      <PackageModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </div>
  );
}

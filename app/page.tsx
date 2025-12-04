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
import HeroCarousel from '@/components/HeroCarousel';
import LoadingSpinner from '@/components/LoadingSpinner';
import { useState, useEffect, useRef, useCallback } from 'react';


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
  const [crates, setCrates] = useState<CrateData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchCrates = async (query: string = '', pageNum: number = 1) => {
    try {
      setLoading(true);
      setError(null);
      const url = `/api/crates?q=${encodeURIComponent(query)}&page=${pageNum}&per_page=20`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Failed to fetch crates');
      }

      const data = await response.json();
      const mappedCrates: CrateData[] = data.crates.map((crate: any) => ({
        name: crate.name,
        score: crate.score,
        downloads: crate.downloads,
        description: crate.description,
        version: crate.version,
        repository: crate.repository,
        lastUpdated: crate.lastUpdated,
        dependencies: crate.dependencies,
        securityIssues: crate.securityIssues,
        features: crate.features,
        status: crate.status,
        statusColor: crate.statusColor,
        statusEmoji: crate.statusEmoji,
      }));

      if (pageNum === 1) {
        setCrates(mappedCrates);
      } else {
        setCrates(prev => [...prev, ...mappedCrates]);
      }

      setHasMore(pageNum < data.meta.totalPages);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load crates');
      console.error('Error fetching crates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCrates(searchQuery, 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const [debounceTimer, setDebounceTimer] = useState<NodeJS.Timeout | null>(null);

  const handleSearch = (query: string) => {
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    const timer = setTimeout(() => {
      setSearchQuery(query);
      setPage(1);
    }, 500);

    setDebounceTimer(timer);
  };

  const handlePackageClick = (pkg: CrateData) => {
    setSelectedPackage(pkg);
  };

  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchCrates(searchQuery, nextPage);
    }
  }, [loading, hasMore, page, searchQuery]);

  // Infinite scroll observer
  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [loadMore]);

  const filteredCrates = crates;

  return (
    <main className="relative min-h-screen w-full">
      {/* Navigation */}
      <Navigation />

      {/* Hero Section - Proper spacing for fixed navbar (h-16 = 64px) + extra padding */}
      <section className="relative z-10 pb-28 overflow-hidden" style={{ paddingTop: 'calc(4rem + 80px)' }}>
        {/* Background gradient overlay */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-[var(--cyan-neon)]/8 rounded-full blur-3xl" />
          <div className="absolute top-1/3 right-1/4 w-[700px] h-[700px] bg-[var(--pink-neon)]/6 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 left-1/4 w-[600px] h-[600px] bg-[var(--green-neon)]/6 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto max-w-6xl flex flex-col items-center text-center px-4 sm:px-6 lg:px-8 w-full">
          {/* Badge */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <span className="inline-block px-5 py-2.5 text-sm font-semibold text-[var(--cyan-neon)] bg-[var(--cyan-neon)]/10 border border-[var(--cyan-neon)]/40 rounded-full backdrop-blur-sm">
              Rust Dependency Security Platform
            </span>
          </motion.div>

          {/* Main Title - Single Line with Animation */}
          <motion.div
            className="mb-10 w-full flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="relative px-4 sm:px-6 md:px-8 py-4 w-full">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-center">
                <motion.span
                  className="inline-block bg-gradient-to-r from-[var(--cyan-neon)] via-[var(--pink-neon)] to-[var(--green-neon)] bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  RUST SECURITY SCANNER
                </motion.span>
              </h1>

              {/* Animated underline instead of scanning through text */}
              <motion.div
                className="absolute bottom-0 left-1/2 h-1 bg-gradient-to-r from-[var(--cyan-neon)] via-[var(--pink-neon)] to-[var(--green-neon)] rounded-full"
                initial={{ width: 0, x: '-50%' }}
                animate={{
                  width: ['0%', '100%', '0%'],
                  x: '-50%'
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{ boxShadow: '0 0 15px var(--cyan-neon)' }}
              />
            </div>

            <motion.p
              className="text-lg sm:text-xl md:text-2xl text-[var(--text-primary)] font-light max-w-3xl leading-relaxed mt-8 mb-4 text-center px-4 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Comprehensive health scoring and security analysis for Rust crates
            </motion.p>

            <motion.p
              className="text-sm sm:text-base text-[var(--text-secondary)] max-w-2xl leading-relaxed text-center px-4 mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Analyze recency, maintenance status, community engagement, and stability metrics to make informed dependency decisions
            </motion.p>
          </motion.div>

          {/* Search Bar - More Prominent */}
          <motion.div
            className="w-full max-w-3xl mb-16 mt-8"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <SearchTerminal
              onSearch={handleSearch}
              placeholder="Search for Rust crates (e.g., tokio, serde, reqwest)..."
            />
          </motion.div>

          {/* Hero Carousel */}
          <motion.div
            className="w-full max-w-5xl mt-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.7 }}
          >
            <HeroCarousel />
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto mb-20 mt-8 w-full px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--cyan-neon)] mb-1">100K+</div>
              <div className="text-sm text-[var(--text-secondary)]">Crates Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--green-neon)] mb-1">Real-time</div>
              <div className="text-sm text-[var(--text-secondary)]">Health Scores</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--pink-neon)] mb-1">4 Metrics</div>
              <div className="text-sm text-[var(--text-secondary)]">Scoring Factors</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[var(--purple-neon)] mb-1">100%</div>
              <div className="text-sm text-[var(--text-secondary)]">Open Source</div>
            </div>
          </motion.div>

          {/* Features Grid */}
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mt-8 px-4">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                <CyberCard
                  glowColor={feature.color as any}
                  className="h-full"
                >
                  <div className="flex flex-col items-start">
                    <div className="mb-4 p-3 rounded-lg bg-[var(--bg-elevated)] border border-[var(--text-muted)]/20">
                      <feature.icon
                        size={28}
                        style={{ color: `var(--${feature.color}-neon)` }}
                      />
                    </div>
                    <h3 className="text-lg font-semibold mb-2 text-[var(--text-primary)]">
                      {feature.title}
                    </h3>
                    <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </CyberCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Ranked Crates */}
      <section className="relative z-10 py-16 w-full">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-[var(--cyan-neon)] text-glow-cyan">
              {searchQuery ? 'Search Results' : 'All Rust Crates'}
            </h2>
            {!searchQuery && (
              <p className="text-[var(--text-secondary)] text-sm sm:text-base max-w-2xl mx-auto">
                Discover and analyze all Rust crates with health scores
              </p>
            )}
          </motion.div>

          {loading && filteredCrates.length === 0 ? (
            <motion.div
              className="flex justify-center items-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--text-muted)]/20">
                <p className="text-xl text-[var(--text-secondary)]">Loading crates...</p>
              </div>
            </motion.div>
          ) : error ? (
            <motion.div
              className="flex justify-center items-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--danger)]/30">
                <p className="text-xl text-[var(--danger)] mb-2">Error loading crates</p>
                <p className="text-sm text-[var(--text-muted)]">{error}</p>
              </div>
            </motion.div>
          ) : filteredCrates.length === 0 ? (
            <motion.div
              className="flex justify-center items-center py-24"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <div className="text-center p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--text-muted)]/20">
                <p className="text-2xl text-[var(--text-secondary)] mb-2">No crates found</p>
                <p className="text-[var(--text-muted)] text-sm">Try searching for something else</p>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-8">
                {filteredCrates.map((crate, index) => (
                  <CrateCard
                    key={`${crate.name}-${index}`}
                    crate={crate}
                    onClick={handlePackageClick}
                    index={index}
                  />
                ))}
              </div>
              {/* Infinite Scroll Observer */}
              <div ref={observerTarget} className="mt-12">
                {loading && <LoadingSpinner />}
              </div>

              {!hasMore && filteredCrates.length > 0 && (
                <motion.div
                  className="text-center mt-12 py-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="inline-block px-6 py-3 rounded-full bg-[var(--bg-secondary)] border border-[var(--cyan-neon)]/30">
                    <span className="text-[var(--text-secondary)] text-sm">
                      🎯 You've reached the end
                    </span>
                  </div>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Floating Particles - More Subtle */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 h-0.5 rounded-full"
            style={{
              background: i % 3 === 0
                ? 'var(--cyan-neon)'
                : i % 3 === 1
                  ? 'var(--pink-neon)'
                  : 'var(--green-neon)',
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3,
            }}
            animate={{
              y: [0, -150, 0],
              opacity: [0, 0.4, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
              ease: "easeInOut",
            }}
          />
        ))}

        {/* Data Stream Effects */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`stream-${i}`}
            className="absolute w-px"
            style={{
              height: '100px',
              background: `linear-gradient(to bottom, transparent, ${i % 2 === 0 ? 'var(--cyan-neon)' : 'var(--pink-neon)'}, transparent)`,
              left: `${10 + i * 12}%`,
              opacity: 0,
            }}
            animate={{
              y: ['-100px', '100vh'],
              opacity: [0, 0.3, 0.5, 0.3, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Package Detail Modal */}
      <PackageModal
        packageData={selectedPackage}
        onClose={() => setSelectedPackage(null)}
      />
    </main>
  );
}

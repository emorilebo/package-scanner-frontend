'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

const carouselSlides = [
    {
        title: 'Security Scanning',
        description: 'Real-time vulnerability analysis and comprehensive security audits for Rust crates',
        gradient: 'from-cyan-500/20 via-transparent to-transparent',
        icon: '🔒'
    },
    {
        title: 'Dependency Analysis',
        description: 'Deep inspection of dependency trees and potential security risks in your packages',
        gradient: 'from-pink-500/20 via-transparent to-transparent',
        icon: '🔗'
    },
    {
        title: 'Health Monitoring',
        description: 'Track security scores, download metrics, and real-time health status of crates',
        gradient: 'from-green-500/20 via-transparent to-transparent',
        icon: '📊'
    }
];

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
        }, 5000); // Auto-rotate every 5 seconds

        return () => clearInterval(interval);
    }, [isPaused]);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % carouselSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + carouselSlides.length) % carouselSlides.length);
    };

    return (
        <div
            className="relative w-full max-w-5xl mx-auto mb-16"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
        >
            {/* Main Carousel Container */}
            <div className="relative h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] border border-[var(--cyan-neon)]/20">

                {/* Animated Background Effects */}
                <div className="absolute inset-0 opacity-30">
                    <div className="absolute inset-0 security-grid" />
                    <motion.div
                        className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--cyan-neon)] to-transparent"
                        animate={{
                            x: ['-100%', '200%']
                        }}
                        transition={{
                            duration: 3,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />
                </div>

                {/* Slides */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentSlide}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute inset-0 flex items-center justify-center p-12"
                    >
                        <div className={`absolute inset-0 bg-gradient-to-br ${carouselSlides[currentSlide].gradient}`} />

                        <div className="relative z-10 text-center max-w-2xl">
                            {/* Icon */}
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.6, ease: "easeOut" }}
                                className="text-8xl mb-6 filter drop-shadow-[0_0_20px_rgba(0,217,255,0.5)]"
                            >
                                {carouselSlides[currentSlide].icon}
                            </motion.div>

                            {/* Title */}
                            <motion.h3
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-4xl font-bold mb-4 bg-gradient-to-r from-[var(--cyan-neon)] via-[var(--pink-neon)] to-[var(--green-neon)] bg-clip-text text-transparent"
                                style={{ fontFamily: 'var(--font-display)' }}
                            >
                                {carouselSlides[currentSlide].title}
                            </motion.h3>

                            {/* Description */}
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="text-lg text-[var(--text-secondary)] leading-relaxed"
                            >
                                {carouselSlides[currentSlide].description}
                            </motion.p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[var(--bg-elevated)]/80 border border-[var(--cyan-neon)]/40 text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)]/20 hover:border-[var(--cyan-neon)] transition-all backdrop-blur-sm z-20"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>

                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-[var(--bg-elevated)]/80 border border-[var(--cyan-neon)]/40 text-[var(--cyan-neon)] hover:bg-[var(--cyan-neon)]/20 hover:border-[var(--cyan-neon)] transition-all backdrop-blur-sm z-20"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>

                {/* Indicators */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
                    {carouselSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-2 rounded-full transition-all ${index === currentSlide
                                    ? 'w-12 bg-[var(--cyan-neon)] shadow-[0_0_10px_var(--cyan-glow)]'
                                    : 'w-2 bg-[var(--text-muted)]/50 hover:bg-[var(--text-muted)]'
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* Subtle glow effect */}
            <div className="absolute -inset-4 bg-[var(--cyan-neon)]/5 rounded-3xl blur-2xl -z-10" />
        </div>
    );
}

import type { Metadata } from "next";
import { Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";

const rajdhani = Rajdhani({
  variable: "--font-rajdhani",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Package Sentinel | Universal Dependency Security",
  description: "Real-time security rankings for Rust, NPM, Python, and more. Search, analyze, and verify dependencies with comprehensive security audits.",
  keywords: ["rust", "crates", "npm", "pypi", "security", "dependency audit", "cargo", "vulnerability scanner", "supply chain"],
  icons: {
    icon: '/icon.svg',
  },
};

import PlatformSidebar from "@/components/PlatformSidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <meta name="theme-color" content="#0A0E1A" />
      </head>
      <body
        className={`${rajdhani.variable} ${spaceGrotesk.variable} antialiased bg-[var(--bg-primary)] text-[var(--text-primary)]`}
      >
        <div id="root" className="min-h-screen w-full flex">
          <PlatformSidebar />
          <div className="flex-1 w-full md:pl-20 transition-all duration-300">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}

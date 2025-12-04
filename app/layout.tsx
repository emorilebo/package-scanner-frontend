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
  title: "Rust Crate Security Scanner | Dependency Audit",
  description: "Real-time security rankings for Rust crates. Search, analyze, and verify dependencies with comprehensive security audits.",
  keywords: ["rust", "crates", "security", "dependency audit", "cargo", "vulnerability scanner"],
  icons: {
    icon: '/icon.svg',
  },
};

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
        className={`${rajdhani.variable} ${spaceGrotesk.variable} antialiased`}
      >
        <div id="root" className="min-h-screen w-full">
          {children}
        </div>
      </body>
    </html>
  );
}

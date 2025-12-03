# Rust Secure Dependency Audit - Web Interface

A futuristic, cyber-themed web interface for viewing Rust crate security rankings based on the [rust_secure_dependency_audit](https://crates.io/crates/rust_secure_dependency_audit) tool.

## Features

- 🔮 **Futuristic Cyber UI** - Dark mode with neon accents, animated grids, and scanline effects
- 🔍 **Interactive Search** - Terminal-style search bar with real-time animations  
- 📊 **Security Rankings** - Visual security scores with hexagonal badges
- 🎯 **Package Details** - Comprehensive modal views with vulnerability analysis
- ⚡ **Smooth Animations** - Framer Motion powered transitions and micro-interactions
- 📱 **Fully Responsive** - Mobile-first design that works on all devices

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS v4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone or navigate to the project directory

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Deployment on Vercel

This project is optimized for Vercel deployment:

1. Push your code to GitHub
2. Go to [Vercel](https://vercel.com) and import your repository
3. Vercel will automatically detect Next.js and configure the build
4. Click "Deploy"

That's it! Your app will be live in seconds.

### Environment Variables

Currently uses mock data. To integrate with actual Rust audit API:
- `NEXT_PUBLIC_API_URL` - Your API endpoint (set in Vercel dashboard)

## Project Structure

```
rust_secure_dependency_audit_web/
├── app/
│   ├── globals.css          # Design system and animations
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/
│   ├── CyberCard.tsx         # Reusable card component
│   ├── CrateCard.tsx         # Crate display card
│   ├── GlitchText.tsx        # Animated text effect
│   ├── Navigation.tsx        # Header navigation
│   ├── PackageModal.tsx      # Package detail modal
│   ├── RankBadge.tsx         # Security score badge
│   └── SearchTerminal.tsx    # Search input
└── public/                   # Static assets
```

## Design System

### Colors
- **Cyber Cyan**: `#00F3FF`
- **Neon Pink**: `#FF00F7`
- **Electric Green**: `#00FF66`
- **Purple Neon**: `#B620E0`

### Typography
- **Sans-serif**: Inter
- **Monospace**: JetBrains Mono

## Future Enhancements

- [ ] Real-time API integration with rust_secure_dependency_audit
- [ ] Advanced filtering and sorting
- [ ] Historical trend charts
- [ ] Dependency graph visualization
- [ ] User accounts and watchlists

## Related Projects

- [rust_secure_dependency_audit](https://crates.io/crates/rust_secure_dependency_audit) - The underlying security audit tool

## Author

**emorilebo**
- GitHub: [@emorilebo](https://github.com/emorilebo)
- Crates.io: [emorilebo](https://crates.io/users/emorilebo)

## License

MIT

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Svetlanna documentation site built with Next.js 16 and Nextra 4 (docs theme). Static site export for GitHub Pages deployment.

## Commands

```bash
pnpm dev          # Start development server (http://localhost:3000)
pnpm build        # Build static site to out/ (runs pagefind postbuild)
pnpm lint         # Run ESLint
npx serve out     # Serve built static site locally
```

## Architecture

- **Framework**: Next.js 16 App Router + Nextra 4
- **Output**: Static export (`output: "export"` in next.config.ts)
- **Search**: Pagefind (generates index in `out/_pagefind` after build)
- **Styling**: Tailwind CSS 4 + nextra-theme-docs styles

## Key Files

- `app/layout.tsx` - Root layout with Nextra theme components (Navbar, Footer, Layout)
- `app/docs/` - Documentation pages as MDX files
- `next.config.ts` - Next.js + Nextra configuration
- `mdx-components.js` - MDX component customization

## Adding Documentation

Create `.mdx` files in `app/docs/`. Use `_meta.js` files to customize sidebar ordering and titles.

## Standalone Pages (outside Nextra)

Pages like `/course` are standalone TSX pages that bypass Nextra Layout but inherit theme sync.

To create a standalone page:
1. Create folder in `app/` (e.g., `app/course/`)
2. Add `layout.tsx` with `x:isolate` wrapper to bypass Nextra Layout
3. Add `page.tsx` with Tailwind `dark:` classes for theme support

## Dark Mode

- Nextra uses `next-themes` with `class` attribute on `<html>`
- Tailwind 4 configured via `@custom-variant dark` in `globals.css`
- Use `dark:` prefix in Tailwind classes to support theme switching

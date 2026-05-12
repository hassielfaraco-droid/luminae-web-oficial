# Luminae Web UI Kit

## Overview
High-fidelity click-through prototype for the Luminae web app (Next.js e-commerce). Recreates the core shopping flow: Homepage → Catalog → Product Detail Page.

## Files
- `index.html` — Interactive prototype (React + Babel). Main entry point.
- `Header.jsx` — Sticky header with announce bar, centered logo, nav, cart icon
- `Footer.jsx` — Dark footer with brand quote, links, social icons, payment pills
- `Hero.jsx` — Full-screen homepage hero with headline + CTAs
- `CategoryBar.jsx` — Dark category strip navigation
- `ProductCard.jsx` — Product card with hover add-to-cart + wishlist
- `CartDrawer.jsx` — Slide-in cart drawer with line items

## Screens
1. **Homepage** — Hero + category bar + featured products grid
2. **Catalog** — Filterable product grid by category
3. **Product Detail** — Image gallery (placeholder), variant selector, add to cart

## Design Notes
- Fonts: Cormorant Garamond (display) + Jost (body), from Google Fonts
- Colors: all from `--color-*` tokens defined in `colors_and_type.css`
- Icons: Lucide (via CDN unpkg)
- No border-radius on interactive elements (buttons, cards, inputs)
- Cart state is managed in React state (not persisted — prototype only)

# Luminae Design System

## Overview
**Luminae** is a curated beauty and wellness e-commerce platform targeting the Venezuelan and Latin American market. The product lineup spans skincare, makeup, facial care, hair care, body care, and perfumery — positioned as a premium "everyday luxury" destination.

**Tagline:** *"Donde la luz se encuentra con tu piel."*
**Brand essence:** curaduría · claridad · ritual · lujo cotidiano

### Sources
- **Codebase:** `hassielfaraco-droid/luminae-web` (private GitHub repo, Next.js 15 + Tailwind CSS + Shopify Storefront API)
  - Key files: `app/globals.css`, `components/layout/Header.tsx`, `components/layout/Footer.tsx`, `components/product/ProductCard.tsx`, `components/cart/CartDrawer.tsx`
- **Reference screenshots:** Sephora.com (visual inspiration, provided by user — not a direct copy)
- **Brand brief:** Provided inline (color palette, typography, visual style)

### Products / Surfaces
1. **Web App** (Next.js) — primary shopping surface: homepage, catalog, product detail, checkout, account, blog, AI skin diagnosis
2. **WhatsApp integration** — customer service + order coordination
3. **AI Skin** — skin diagnosis feature powered by AI (`/ai` route)
4. **Blog** — skincare education content in Spanish

---

## CONTENT FUNDAMENTALS

### Language & Tone
- **Language:** Spanish (Latin American, Venezuela-centric)
- **Voice:** Warm, elegant, trustworthy. Poetic without being excessive.
- **Person:** Speaks directly to the reader: *"Tu piel merece…"*, *"Descubre tu ritual"*
- **Casing:** Sentence case for headlines; ALL CAPS for labels and navigation items
- **Emoji use:** Minimal and purposeful — 🌿 (nature/wellness), ✦ (star/special). Never decorative noise.
- **Punctuation:** Clean; uses `·` (middle dot) as separator in announcements
- **Formality:** Informal but elevated. Uses *tú* not *usted*. Approachable luxury.

### Copy Examples
- Hero H1: *"Tu piel merece la luz que siempre buscaste"*
- Sub: *"Skincare curado, perfumería consciente y wellness para la piel venezolana y latina. Ingredientes reales. Resultados reales."*
- Announce bar: *"🌿 Envíos a toda Venezuela · Paga con Zelle, Binance o transferencia USD · Envío gratis en pedidos +$60"*
- Empty cart: *"Tu carrito está vacío — Descubre nuestra selección curada de skincare y perfumería"*
- Footer brand quote: *"Donde la luz se encuentra con tu piel."* (italic, serif)
- CTA labels: **UPPERCASE**, tightly tracked — e.g. `Explorar catálogo →`, `Agregar al carrito`, `Finalizar compra →`

### Navigation Labels
Left: Skin · Perfumería · Wellness · Marcas  
Right: Ofertas · Sets · IA Skin · Blog

### Payment Copy
Venezuela-specific: Zelle · Binance · Zinli · PayPal · USD

---

## VISUAL FOUNDATIONS

### Colors
All from `app/globals.css` (source of truth over brand book where they differ):

| Token | Hex | Role |
|-------|-----|------|
| `--deep` | `#2C2416` | Primary brand dark, text, buttons |
| `--deep2` | `#1A150D` | Footer background, deepest dark |
| `--cream` | `#F7F2EB` | Page background, primary surface |
| `--beige` | `#E8DDD0` | Secondary surface, image bg |
| `--light` | `#F0E8DA` | Tertiary warm light |
| `--earth` | `#C4A882` | Muted text, placeholders, borders |
| `--sand` | `#D4B896` | Scrollbar thumb, neutral accents |
| `--warm` | `#6A5A42` | Body copy, secondary text |
| `--gold` | `#B8975A` | Premium accent, CTA hover, eyebrow |
| `--gold-lt` | `#D4AD6A` | Lighter gold variant |
| `--moss` | `#7A8C6E` | Bestseller tag, success/shipping states |

### Typography
**Display / Headings:** `Cormorant Garamond` (Light 300, Regular 400, Medium 500; Italic variants)  
**Body / UI:** `Jost` (ExtraLight 200, Light 300, Regular 400, Medium 500, SemiBold 600)

> ⚠️ **Note:** The brand book specifies Satoshi + Plus Jakarta Sans + Inter. The actual codebase uses **Cormorant Garamond + Jost**. The design system follows the codebase. Font files not included; loaded from Google Fonts CDN.

| Scale | Font | Weight | Size | Tracking | Leading |
|-------|------|--------|------|----------|---------|
| H1 | Cormorant Garamond | 300 | clamp(3rem, 6vw, 6rem) | normal | 1.05 |
| H2 | Cormorant Garamond | 300 | ~2.5rem | normal | 1.1 |
| H3 | Cormorant Garamond | 300 | ~1.05rem | normal | snug |
| label-xs | Jost | 400 | 0.6rem | 0.3em | — |
| label-sm | Jost | 400 | 0.68rem | 0.2em | — |
| body | Jost | 300 | 1rem | normal | 1.6 |
| eyebrow | Jost | 400 | 0.6rem | 0.3em | — |

### Spacing & Layout
- Page max-width: `1280px`
- Horizontal padding: `24px` (mobile) → `40px` (md) → `64px` (lg)
- Header height: `64px` (mobile) → `72px` (desktop)
- Section padding: generous, breathing room between sections

### Buttons
- **btn-primary:** `bg #2C2416`, `color --cream`, `border 1px transparent`, `padding 16px 32px`, uppercase, 0.68rem, tracking 0.22em. Hover: `bg --gold`, `color --deep`
- **btn-secondary:** Transparent bg, `border rgba(44,36,22,0.25)`, uppercase. Hover: `bg --deep`, `color --cream`
- **btn-gold:** `bg --gold`, `color --deep`. Hover: `bg --deep`, `color --cream`
- No border-radius on buttons (sharp corners)

### Cards (Product)
- Background: `--cream`
- Outline border: `1px solid rgba(196,168,130,0.15)` (very subtle)
- No border-radius
- Hover: `translateY(-4px)` lift
- Image hover: `scale(1.05)` zoom
- Add-to-cart overlay slides up from bottom on hover

### Shadows
- `shadow-sm`: `0 2px 12px rgba(44,36,22,0.06)`
- `shadow-md`: `0 8px 32px rgba(44,36,22,0.10)`
- `shadow-lg`: `0 20px 60px rgba(44,36,22,0.14)` — used for cart drawer

### Animations & Transitions
- **Default transition:** `all 0.3s cubic-bezier(0.4,0,0.2,1)` (smooth ease)
- **Reveal:** `opacity 0→1` + `translateY(28px→0)` over `0.8s ease`
- **Cart drawer:** `slideLeft` from translateX(100%) in `0.35s cubic-bezier(0.4,0,0.2,1)`
- **Marquee:** `25s linear infinite`
- **Float:** `4s ease-in-out infinite` with 10px Y drift
- Hover states: color shifts, gold underline scale-x on nav links, opacity on icons

### Borders & Dividers
- `divider-gold`: `height 1px`, `linear-gradient(transparent → --earth → transparent)`, `opacity 0.3`
- Border for inputs/subtle dividers: `rgba(196,168,130,0.2)` or `rgba(196,168,130,0.3)`
- No excessive rounding — either 0 or very minimal (`3px` on scrollbar only)

### Header Behavior
- Sticky top; on scroll: `backdrop-filter: blur(12px)`, slight shadow, `rgba(247,242,235,0.97)` background
- Contains announcement bar above in `--deep2` background

### Imagery & Photography
- Warm, natural light tones matching the cream/beige palette
- Clean compositions, minimal backgrounds
- Product images on `--beige` background

### Iconography (Lucide React)
- Icon set: **Lucide React** (`ShoppingBag`, `Search`, `Heart`, `Menu`, `X`, `Plus`, `Minus`, `Trash2`)
- Size: typically `18–20px` in header/UI, `40–48px` for empty states
- Color: `--warm` default, `--deep` on hover, `--gold` for badges/accents
- Style: thin stroke, no fill

### Corner Radii
- Buttons: `0` (sharp)
- Cards: `0` (sharp)
- Inputs: `0` (sharp)
- Cart drawer: `0`
- Wishlist button: `rounded-full` (circle only)
- Scrollbar thumb: `3px`

### Tags / Badges
- `.tag-new`: `bg --deep`, `color --gold`, uppercase, 0.6rem, tracking 0.3em
- `.tag-sale`: `bg #8B2020` (dark red), white
- `.tag-best`: `bg --moss`, white
- `.tag-soldout`: `rgba(44,36,22,0.6)` bg, `--cream` text

---

## ICONOGRAPHY
Icons sourced from **Lucide React** (CDN available: `https://unpkg.com/lucide@latest`).
- No custom icon font
- No PNG icons; pure SVG via Lucide
- Emoji: only 🌿 and ✦ in specific announce/hero contexts
- Social media in footer rendered as text abbreviations (IG, TK, WA, YT) styled as square buttons

---

## File Index

```
README.md                    ← This file
SKILL.md                     ← Agent skill definition
colors_and_type.css          ← All CSS variables, typography, utility classes
assets/                      ← Brand assets (logos, icons)
preview/                     ← Design System tab cards (HTML)
  colors-brand.html
  colors-semantic.html
  type-display.html
  type-body.html
  type-labels.html
  spacing-tokens.html
  spacing-shadows.html
  components-buttons.html
  components-inputs.html
  components-cards.html
  components-tags.html
  components-header.html
  components-cart.html
  components-footer.html
  brand-logo.html
  brand-eyebrow.html
ui_kits/
  web/
    README.md
    index.html               ← Interactive UI kit (homepage + catalog + PDP)
    Header.jsx
    Footer.jsx
    ProductCard.jsx
    CartDrawer.jsx
    Hero.jsx
    CategoryBar.jsx
```

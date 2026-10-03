# MindBridge Design System & Architecture Specification

## 1. Visual & Emotional Philosophy
MindBridge is designed to feel like **"A calm digital home for students"** — not a corporate SaaS dashboard, not an institutional hospital portal, and not a wall of boxed cards.

### Core Tenets:
- **Calm Editorial Presence**: Refined typography, generous whitespace, natural proportions.
- **Organic Sanctuary Atmosphere**: Seamlessly blended illustration assets representing a peaceful student bedroom sanctuary (morning sunlight for light mode, gentle lamplight and moonlit window for dark mode).
- **Restrained Box Usage**: Content flows naturally using whitespace and subtle tonal surfaces rather than heavy borders, stacked cards, and sharp boxes.
- **Signature Accent Balance**:
  - **60–70%**: Warm neutrals / background canvas (`#F7F2E9` light, `#201F1B` dark)
  - **15–20%**: Ivory & charcoal surfaces (`#FFFDF8` light, `#2B2924` dark)
  - **8–12%**: Sage interaction system (`#445B49` light, `#A4B69F` dark)
  - **3–5%**: Warm terracotta accent (`#8E4B22` light, `#C99773` dark)
  - **1–3%**: Lavender / purple identity accents (`#75639A` light, `#A89BCB` dark) for MIRA identity and active indicators.

---

## 2. Global Design Tokens

### Color Palette (CSS Variables)

#### Light Theme (Warm Sanctuary Canvas)
```css
:root {
  --color-bg: #F7F2E9;              /* Warm ivory page canvas */
  --color-surface: #FFFDF8;         /* Crisp soft white surface */
  --color-surface-soft: #EDE8DF;    /* Secondary tonal surface */
  --color-surface-raised: #FFFDF8;  /* Elevated surface */

  --color-text: #141612;            /* Deep rich warm black for headlines (high contrast) */
  --color-text-secondary: #2B2D27;  /* Grounded dark charcoal for body copy */
  --color-text-muted: #5C5A51;      /* Reserved for captions & subtle metadata */

  --color-primary: #445B49;         /* Signature calm sage green */
  --color-primary-hover: #36493A;
  --color-primary-light: #E8EFE6;
  --color-primary-text: #FFFDF8;

  --color-brand: #445B49;
  --color-brand-hover: #36493A;
  --color-brand-soft: #D7E1D0;

  --color-secondary: #D7E1D0;
  --color-accent: #8E4B22;          /* Rich warm terracotta */
  --color-accent-hover: #753B18;
  --color-accent-purple: #75639A;   /* MIRA / lavender accent */
  --color-lavender: #75639A;

  --color-border: #E4DCD0;
  --color-border-strong: #D5CDC0;

  --color-success: #5F8065;
  --color-warning: #B88745;
  --color-error: #B55F58;
  --color-info: #5F7893;
}
```

#### Dark Theme (Warm Night Sanctuary)
```css
.dark, [data-theme="dark"] {
  --color-bg: #201F1B;              /* Warm night charcoal canvas */
  --color-surface: #2B2924;         /* Soft warm wood/slate surface */
  --color-surface-soft: #34322C;    /* Subtle tonal secondary */
  --color-surface-raised: #3B3831;  /* Elevated surface */

  --color-text: #F3EEE5;            /* Warm linen white primary text */
  --color-text-secondary: #D4CDC0;  /* Soft sand secondary text */
  --color-text-muted: #9E9789;      /* Muted night metadata */

  --color-primary: #A4B69F;         /* Luminous sage */
  --color-primary-hover: #B8C8B3;
  --color-primary-light: #2C352D;
  --color-primary-text: #201F1B;

  --color-brand: #A4B69F;
  --color-brand-hover: #B8C8B3;
  --color-brand-soft: #3B463C;

  --color-secondary: #3B463C;
  --color-accent: #C99773;          /* Warm night amber */
  --color-accent-hover: #DBA884;
  --color-accent-purple: #A89BCB;   /* Soft lavender */
  --color-lavender: #A89BCB;

  --color-border: #49463F;
  --color-border-strong: #5B574F;
}
```

---

## 3. Responsive Layout System

- **Desktop Max Content Width**: `1440px` (with capability for `1560px` where appropriate).
- **Responsive Padding**: `clamp(24px, 5vw, 88px)` ensures zero dead borders on ultrawide monitors while keeping comfortable gutters on mobile.
- **No Box Incarceration**: Illustrations blend seamlessly into background canvases using dual linear/radial masks (`mask-image: linear-gradient(to right, transparent 0%, black 32%)`) and gradient feathering pseudo-elements.

---

## 4. Motion & Transition System

- **Page Transitions**: Client-side SPA navigation via `navigateSeamlessly` in `js/shared-layout.js`:
  - Outgoing view: `opacity: 0.3`, `y: 6px` (180ms)
  - Incoming view: `opacity: 1`, `y: 0px` (350ms with `power3.out`)
  - Permanent persistent header (no flickering navbar reloads).
- **GSAP Timelines**:
  - Hero staggered entrance (`power3.out`).
  - ScrollTrigger viewport reveals with progressive enhancement.
- **Accessibility**: All animations strictly respect `prefers-reduced-motion: reduce`.

---

## 5. Security & Engineering Hardening

1. **XSS Protection**: HTML sanitization applied to user-supplied text (such as `localStorage` currentUser data and chat messaging).
2. **Secrets Protection**: API keys and environment credentials kept in `.env` and excluded from version control via `.gitignore`.
3. **Resilient SPA Fallback**: Network failures or unhandled route requests gracefully fall back to full standard page loads.
4. **Clean Code Structure**: Standardized global layout in `js/shared-layout.js`, centralized theme engine in `js/dark-mode.js`.

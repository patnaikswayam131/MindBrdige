# MindBridge — Design System

**Version:** 1.0  
**Design direction:** Calm, minimal, warm, trustworthy, modern  
**Primary visual motif:** Lotus + bridge  
**Brand personality:** Quiet confidence, safety, human warmth, clarity, reassurance

---

## 1. Brand Foundation

### 1.1 Brand idea

MindBridge is a mental-health platform designed to make emotional support feel approachable, safe, and human.

The visual identity should communicate:

- Calm rather than clinical
- Warmth rather than childishness
- Trust rather than authority
- Simplicity rather than emptiness
- Privacy rather than surveillance
- Hope without becoming overly cheerful
- Modernity without looking like generic AI/wellness branding

The identity should feel appropriate for a mental-health product, but it should **not** look like a hospital, meditation app, yoga studio, or generic wellness startup.

### 1.2 Core visual metaphor

The logo combines two ideas:

**Lotus**
- Growth
- Renewal
- Resilience
- Quiet transformation
- A sense of emerging from difficulty

**Bridge**
- Connection
- Transition
- Support
- Moving from one emotional state to another
- Connecting a person with the right form of help

The bridge should remain subtle. It should read as a graceful curved form beneath the lotus rather than as a literal architectural bridge.

### 1.3 Brand keywords

Use these words as a visual filter:

> Calm · Safe · Human · Gentle · Clear · Grounded · Private · Hopeful · Modern · Quiet

Avoid:

> Clinical · Corporate · Loud · Futuristic · Neon · Childish · Overly spiritual · Luxury-fashion · Generic AI

---

# 2. Logo System

## 2.1 Primary logo

The primary MindBridge logo consists of:

1. Layered lotus emblem
2. Subtle bridge/wave element beneath the lotus
3. `MindBridge` wordmark

The logo should normally appear without the tagline.

### Primary structure

```text
        /\ 
      /    \
   /\   /\   /\
  /  \ /  \ /  \
      \____/
    ~~~~~~~~~~~
      MindBridge
```

The actual mark should remain smooth and refined; this diagram is only conceptual.

## 2.2 Logo variants

Maintain four production variants.

### A. Light-background primary

Use on:

- White
- Warm off-white
- Very pale lavender
- Light beige
- Light neutral UI surfaces

Wordmark:
`#332B45` or another sufficiently dark plum.

Lotus:
- `#6E5B8F`
- `#A78CBE`
- `#DCCEE7`
- subtle pale pink accent `#F3DDE8`

### B. Dark-background primary

Use on:

- Deep plum
- Deep indigo
- Near-black purple
- Dark application shells

Wordmark:
`#F7F3F8`

Lotus:
- `#A78CBE`
- `#BFA8D5`
- `#DCCEE7`
- restrained pink/lilac highlights

### C. Monochrome dark

Single-color dark logo.

Use for:

- Documents
- Formal presentations
- Black-and-white printing
- Embossing
- Stamps
- Small physical applications

Preferred color:
`#332B45`

### D. Monochrome light

Single-color white logo.

Use on:

- Dark hero sections
- Dark photography
- Dark app screens
- Video overlays

Color:
`#FFFFFF`

---

# 3. Logo Construction

## 3.1 Shape language

The logo should use:

- Smooth Bézier curves
- Rounded transitions
- Moderate symmetry
- Soft pointed petals
- Low visual complexity
- No hard geometric corners
- No unnecessary outlines
- No literal bridge pillars
- No brain icon
- No heart icon
- No medical cross

The mark should be identifiable even when reduced to approximately 24 px.

## 3.2 Petal hierarchy

The lotus should have a clear hierarchy.

Recommended:

- 1 central tall petal
- 2 inner side petals
- 2 outer side petals
- 2 lower petals / supporting forms
- 1 bridge/wave base

Do not add excessive petals.

The mark should feel designed rather than illustrated.

## 3.3 Bridge element

The bridge element is a defining part of the identity.

It should:

- Sit below the lotus
- Use one or two smooth curves
- Suggest a bridge without literally depicting one
- Maintain enough negative space to remain readable
- Never overpower the lotus

The bridge can also be interpreted as:

- A horizon
- A wave
- A path
- A connection between two points

This ambiguity is intentional.

---

# 4. Clear Space

Maintain a minimum clear space around the logo.

### Recommended clear-space rule

Use the height of the lowercase `d` in `MindBridge` as the minimum clear-space unit.

```text
       [ clear space ]

          LOGO

       [ clear space ]
```

Never place:

- Text directly against the logo
- Decorative objects inside the clear-space area
- UI controls touching the mark
- Photography with high-detail content immediately behind the mark

For a large brand lockup, use approximately **1× logo height** as a comfortable minimum surrounding space.

---

# 5. Minimum Size

### Digital

Full logo:
- Recommended minimum: **120 px wide**
- Absolute minimum: **96 px wide**

Symbol-only:
- Recommended minimum: **32 px**
- Absolute minimum: **24 px**

### Print

Full logo:
- Recommended minimum: **30 mm wide**

Symbol-only:
- Recommended minimum: **8 mm**

If the mark becomes unclear at small sizes, switch to the simplified monochrome symbol.

---

# 6. Incorrect Logo Usage

Never:

- Stretch the logo horizontally or vertically
- Rotate the logo
- Add drop shadows
- Add glow effects
- Add 3D bevels
- Add outlines around the entire logo
- Change individual petals randomly
- Use neon purple
- Place the full-color logo over visually busy photography
- Add the old tagline to production versions
- Put the logo inside an unnecessary circle
- Add a brain or medical symbol
- Use multiple competing gradients
- Reduce opacity so far that the mark loses contrast

The logo should feel effortless.

---

# 7. Color System

The palette is intentionally restrained.

The core palette is based on muted lavender, dusty purple, warm cream, and soft neutral tones.

## 7.1 Primary palette

| Token | Hex | Role |
|---|---|---|
| `purple-900` | `#332B45` | Primary text, dark logo |
| `purple-800` | `#4D3F68` | Strong headings |
| `purple-700` | `#6E5B8F` | Primary brand color |
| `purple-600` | `#826DA4` | Interactive states |
| `purple-500` | `#A78CBE` | Secondary brand color |
| `purple-300` | `#DCCEE7` | Soft surfaces |
| `purple-200` | `#E9E0F0` | Light accents |
| `purple-100` | `#F3EEF6` | Brand-tinted background |

## 7.2 Warm neutral palette

| Token | Hex | Role |
|---|---|---|
| `cream-100` | `#FAF8F5` | Main light background |
| `cream-200` | `#F3EFE9` | Secondary surface |
| `sand-300` | `#EDE6DE` | Borders / warm accents |
| `warm-gray-500` | `#8B8580` | Secondary text |
| `warm-gray-700` | `#5E5955` | Strong secondary text |

The warm neutral palette prevents the product from feeling like a stereotypical purple-only wellness application.

## 7.3 Dark palette

| Token | Hex | Role |
|---|---|---|
| `night-950` | `#14121D` | Deepest background |
| `night-900` | `#1B1830` | Primary dark background |
| `night-800` | `#25203D` | Elevated surface |
| `night-700` | `#332B50` | Card / section surface |
| `night-600` | `#4A3F63` | Borders / subtle controls |
| `night-text` | `#F7F3F8` | Primary dark text |
| `night-muted` | `#C9C0D1` | Secondary dark text |

---

# 8. Semantic Color Tokens

Do not hard-code raw hex values throughout the application.

Use semantic tokens.

```css
:root {
  --color-bg: #FAF8F5;
  --color-surface: #FFFFFF;
  --color-surface-soft: #F3EEF6;

  --color-text: #332B45;
  --color-text-secondary: #5E5955;
  --color-text-muted: #8B8580;

  --color-brand: #6E5B8F;
  --color-brand-hover: #5F4E7B;
  --color-brand-soft: #DCCEE7;

  --color-border: #E6DFE8;
  --color-border-strong: #D4CADB;

  --color-success: #65836D;
  --color-warning: #A98252;
  --color-error: #A65F67;
  --color-info: #667A93;
}

[data-theme="dark"] {
  --color-bg: #14121D;
  --color-surface: #1B1830;
  --color-surface-soft: #25203D;

  --color-text: #F7F3F8;
  --color-text-secondary: #C9C0D1;
  --color-text-muted: #9E95A8;

  --color-brand: #A78CBE;
  --color-brand-hover: #B9A3CE;
  --color-brand-soft: #4A3F63;

  --color-border: #3A334A;
  --color-border-strong: #4A3F63;

  --color-success: #8BAE93;
  --color-warning: #D0A76B;
  --color-error: #D58A92;
  --color-info: #93A7C1;
}
```

---

# 9. Color Usage Ratio

Do not make the interface entirely purple.

Recommended visual distribution:

- **60%** warm neutral / background
- **25%** white or elevated surfaces
- **10%** muted purple
- **5%** accent color

Purple should guide attention, not cover everything.

Avoid:

```text
Purple background
+ Purple cards
+ Purple buttons
+ Purple illustrations
+ Purple text
```

This quickly becomes visually tiring.

Instead:

```text
Warm neutral background
      ↓
White surface
      ↓
Dark plum text
      ↓
Purple accent
      ↓
Small lilac highlights
```

---

# 10. Gradient System

Gradients should be extremely subtle.

### Primary logo gradient

Suggested range:

```text
#6E5B8F
    ↓
#A78CBE
    ↓
#DCCEE7
```

Optional highlight:

```text
#F3DDE8
```

### Background atmospheric gradient

Use only for hero areas:

```text
#FAF8F5
    →
#F3EEF6
    →
#EDE6DE
```

Dark:

```text
#14121D
    →
#1B1830
    →
#25203D
```

Do not use:

- saturated purple
- electric violet
- rainbow gradients
- strong radial glows
- glassmorphism everywhere

The gradient should feel almost unnoticed.

---

# 11. Typography

The typography should balance editorial elegance with digital readability.

## 11.1 Primary typeface

Recommended:

**DM Sans**

Use for:

- Navigation
- Buttons
- Body text
- Forms
- Labels
- UI
- Data
- System messages

Characteristics:

- Clean
- Friendly
- Modern
- Highly readable
- Neutral enough for a mental-health product

## 11.2 Display typeface

Recommended:

**DM Serif Display**

Use sparingly for:

- Hero headings
- Brand statements
- Emotional editorial moments
- Large section introductions

Do not use it for:

- Buttons
- Forms
- Long paragraphs
- Dense dashboards
- Navigation

## 11.3 Type scale

```text
Display XL   64 / 68 px   Serif
Display L    52 / 58 px   Serif
Display M    44 / 50 px   Serif

H1           36 / 44 px
H2           30 / 38 px
H3           24 / 32 px
H4           20 / 28 px

Body L       18 / 28 px
Body M       16 / 25 px
Body S       14 / 21 px

Label        13 / 18 px
Caption      12 / 17 px
```

For mobile:

```text
Display      40 / 46 px
H1           32 / 40 px
H2           26 / 34 px
H3           22 / 30 px
Body         16 / 25 px
Small        14 / 21 px
```

---

# 12. Typography Rules

Use sentence case.

Prefer:

> How are you feeling today?

Avoid:

> HOW ARE YOU FEELING TODAY?

Avoid excessive uppercase text.

For labels, small uppercase text may be used with generous letter spacing:

```css
letter-spacing: 0.08em;
```

Do not use overly wide tracking on normal body copy.

---

# 13. Spacing System

Use a 4 px base unit.

```text
4   — micro
8   — tight
12  — compact
16  — standard
20  — comfortable
24  — component
32  — section
40  — large
48  — major
64  — hero
80  — large section
96  — page-level
```

Recommended UI spacing:

- Button internal padding: 12–16 px
- Card padding: 20–24 px
- Form field spacing: 16 px
- Section spacing: 48–80 px
- Hero spacing: 64–96 px

Do not compress every element into a dense dashboard.

Mental-health interfaces should breathe.

---

# 14. Grid

### Desktop

Maximum content width:

**1200–1280 px**

Recommended:

- 12-column grid
- 24 px gutters
- 24–40 px page margins

### Tablet

- 8-column grid
- 20 px gutters
- 24 px margins

### Mobile

- 4-column conceptual grid
- 16 px side margins
- 16 px gutters

Content should never touch the viewport edges.

---

# 15. Border Radius

Use soft but controlled rounding.

```text
XS     6 px
SM     10 px
MD     14 px
LG     18 px
XL     24 px
Pill   999 px
```

Recommended:

- Input: 12 px
- Button: 12–14 px
- Card: 18 px
- Modal: 20–24 px
- Avatar: 50%
- Tags: pill

Avoid excessive `9999px` rounding on every component.

---

# 16. Shadows

Shadows should be nearly invisible.

### Light theme

```css
box-shadow:
  0 2px 8px rgba(51, 43, 69, 0.04),
  0 8px 24px rgba(51, 43, 69, 0.05);
```

### Elevated modal

```css
box-shadow:
  0 16px 48px rgba(51, 43, 69, 0.12);
```

### Dark theme

Use borders and surface contrast more than shadows.

```css
border: 1px solid #3A334A;
```

Avoid floating everything.

---

# 17. Components

## 17.1 Buttons

### Primary

Background:
`#6E5B8F`

Text:
`#FFFFFF`

Hover:
`#5F4E7B`

Shape:
12–14 px radius.

### Secondary

Background:
transparent or `#F3EEF6`

Border:
`#D4CADB`

Text:
`#4D3F68`

### Ghost

No background.

Text:
`#6E5B8F`

Hover:
`#F3EEF6`

### Dark theme

Primary button:

```text
Background: #A78CBE
Text: #1B1830
```

Do not use bright white buttons unless they are necessary for a high-priority action.

---

# 18. Cards

Cards should feel like calm surfaces, not containers competing for attention.

Recommended:

```text
Background: #FFFFFF
Border: #E6DFE8
Radius: 18px
Padding: 24px
```

Dark:

```text
Background: #1B1830
Border: #3A334A
Radius: 18px
Padding: 24px
```

Use cards primarily for:

- Therapist profiles
- Mood insights
- Journal entries
- Resources
- Appointments
- Recommendations

Do not put every text block inside a card.

---

# 19. Forms

Forms should feel supportive and non-judgmental.

### Input

Height:
**48–52 px**

Background:
`#FFFFFF`

Border:
`#D4CADB`

Focus:
`#6E5B8F`

Focus ring:

```css
box-shadow: 0 0 0 3px rgba(110, 91, 143, 0.16);
```

Placeholder:
`#8B8580`

Avoid red validation states for minor mistakes.

Use calm explanatory language.

Instead of:

> Invalid input.

Prefer:

> Please check this field and try again.

---

# 20. Mood / Emotional States

Avoid overly clinical red-yellow-green emotional scales.

Use muted colors.

Example:

```text
Very low      #9A7D88
Low           #A98FA7
Neutral       #A78CBE
Good          #8E9B86
Very good     #6F8B78
```

These should not imply that one emotional state is morally or medically better.

Use them as descriptive states.

---

# 21. Illustrations

Illustrations should follow the logo's visual language.

### Style

- Minimal linework
- Soft organic forms
- Large areas of negative space
- Muted lavender
- Warm cream
- Dusty pink
- Sage accents
- Gentle asymmetry

Characters should feel human and diverse.

Avoid:

- Cartoon therapy stereotypes
- Giant brains
- Floating hearts
- Medical coats
- Generic AI robots
- Excessive smiling
- Stock-photo-like illustrations

---

# 22. Photography

Photography should feel real and quiet.

Preferred:

- Natural light
- Soft shadows
- Home environments
- Warm interiors
- People in reflective moments
- Close crops
- Authentic expressions
- Muted colors

Avoid:

- Overly posed therapist photographs
- Excessive white medical environments
- Corporate stock photography
- Aggressive motivational imagery
- Highly saturated colors

Image treatment:

```text
Saturation: slightly reduced
Contrast: moderate-low
Temperature: slightly warm
```

---

# 23. Iconography

Use simple line icons.

Recommended characteristics:

- 1.5–2 px stroke
- Rounded line caps
- Rounded joins
- Minimal detail
- Consistent optical weight

Icons should feel closer to:

```text
○  calm
⌁  flow
♡  care
◌  reflection
→  progress
```

than medical symbols.

Avoid mixing icon families.

---

# 24. Navigation

Navigation should be quiet.

Desktop:

```text
[ MindBridge ]     Home   Support   Journal   Resources     [Profile]
```

Use:

- 16 px body text
- Medium font weight
- Minimal separators
- No excessive pills

Active state:

```text
color: #6E5B8F
background: #F3EEF6
```

Do not use heavy underlines or neon indicators.

---

# 25. Hero Sections

A MindBridge hero should feel like a calm room.

Recommended structure:

```text
Small contextual label

A place to pause,
understand, and move forward.

Short supporting paragraph.

[ Get started ]  [ Explore support ]

                         lotus / abstract visual
```

Use generous negative space.

The lotus should not occupy the entire screen.

Avoid:

- Huge gradients
- Floating glass cards everywhere
- Excessive decorative blobs
- 3D objects
- AI-generated abstract landscapes

---

# 26. Dashboard Direction

The dashboard should prioritize emotional clarity over data density.

Example:

```text
Good evening, Swayam.

How are you feeling today?

[ mood check-in ]

--------------------------------

Your recent patterns

   Sleep       Mood       Stress

--------------------------------

Continue where you left off

[ Journal ] [ Resources ]

--------------------------------

Support

[ Find a professional ]
```

The dashboard should not resemble a financial analytics dashboard.

---

# 27. Mental-Health Safety Visual Language

MindBridge should never visually trivialize distress.

For sensitive states:

- Reduce decorative elements
- Increase whitespace
- Use calm neutral surfaces
- Keep text highly readable
- Make support actions obvious
- Avoid alarmist red interfaces

Emergency or crisis actions may use a restrained error color when necessary, but the rest of the interface should remain calm.

The design must clearly distinguish:

**general wellness support**
from
**professional or emergency support.**

---

# 28. Dark Mode

Dark mode is a first-class theme, not a color inversion.

### Background hierarchy

```text
Page       #14121D
Surface    #1B1830
Raised     #25203D
Border     #3A334A
```

### Text hierarchy

```text
Primary    #F7F3F8
Secondary  #C9C0D1
Muted      #9E95A8
```

### Brand

```text
Primary    #A78CBE
Soft       #4A3F63
Highlight  #DCCEE7
```

Do not use pure black `#000000`.

Do not use pure white for large areas.

---

# 29. Accessibility

Target **WCAG 2.2 AA** for normal interface text.

Important rule:

The light lavender logo gradient should not be relied upon as the only contrast-bearing element.

For text, use dark plum or near-white text depending on theme.

Recommended:

```text
Light theme primary text:
#332B45

Dark theme primary text:
#F7F3F8
```

Interactive controls must have:

- Visible keyboard focus
- Clear hover state
- Clear pressed state
- At least 44 × 44 px touch target
- Text or icon meaning that does not rely only on color

Never communicate emotional or clinical status through color alone.

---

# 30. Motion

Motion should be slow and subtle.

Recommended durations:

```text
Micro interaction    120–160 ms
Component            180–240 ms
Page transition      250–350 ms
Ambient animation    4–8 s
```

Use:

```css
cubic-bezier(0.22, 1, 0.36, 1)
```

for gentle entrances.

Preferred motion:

- Fade
- Small vertical movement
- Soft scale from 0.98 → 1
- Gentle opacity changes

Avoid:

- Bounce
- Elastic overshoot
- Fast zoom
- Aggressive parallax
- Constant animated gradients

Respect:

```css
@media (prefers-reduced-motion: reduce)
```

---

# 31. Design Tokens — JSON Reference

```json
{
  "brand": {
    "purple900": "#332B45",
    "purple800": "#4D3F68",
    "purple700": "#6E5B8F",
    "purple600": "#826DA4",
    "purple500": "#A78CBE",
    "purple300": "#DCCEE7",
    "purple200": "#E9E0F0",
    "purple100": "#F3EEF6"
  },
  "neutral": {
    "cream100": "#FAF8F5",
    "cream200": "#F3EFE9",
    "sand300": "#EDE6DE",
    "warmGray500": "#8B8580",
    "warmGray700": "#5E5955"
  },
  "dark": {
    "night950": "#14121D",
    "night900": "#1B1830",
    "night800": "#25203D",
    "night700": "#332B50",
    "night600": "#4A3F63",
    "text": "#F7F3F8",
    "muted": "#C9C0D1"
  }
}
```

---

# 32. CSS Starter

```css
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap');

:root {
  --font-body: "DM Sans", sans-serif;
  --font-display: "DM Serif Display", serif;

  --bg: #FAF8F5;
  --surface: #FFFFFF;
  --surface-soft: #F3EEF6;

  --text: #332B45;
  --text-secondary: #5E5955;
  --text-muted: #8B8580;

  --brand: #6E5B8F;
  --brand-hover: #5F4E7B;
  --brand-soft: #DCCEE7;

  --border: #E6DFE8;

  --radius-sm: 10px;
  --radius-md: 14px;
  --radius-lg: 18px;
  --radius-xl: 24px;

  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
}

[data-theme="dark"] {
  --bg: #14121D;
  --surface: #1B1830;
  --surface-soft: #25203D;

  --text: #F7F3F8;
  --text-secondary: #C9C0D1;
  --text-muted: #9E95A8;

  --brand: #A78CBE;
  --brand-hover: #B9A3CE;
  --brand-soft: #4A3F63;

  --border: #3A334A;
}
```

---

# 33. Figma Organization

Recommended Figma pages:

```text
01 — Cover
02 — Brand Foundations
03 — Logo
04 — Colour
05 — Typography
06 — Icons
07 — Components
08 — Patterns
09 — Light Theme
10 — Dark Theme
11 — Mobile
12 — Desktop
13 — Accessibility
14 — Marketing
15 — Handoff
```

Recommended component naming:

```text
Button / Primary
Button / Secondary
Button / Ghost

Input / Default
Input / Focus
Input / Error
Input / Disabled

Card / Default
Card / Elevated
Card / Interactive

Navigation / Desktop
Navigation / Mobile

Modal / Default
Toast / Success
Toast / Error

Mood / Very Low
Mood / Low
Mood / Neutral
Mood / Good
Mood / Very Good
```

---

# 34. Product Personality

Every screen should pass this test:

### Does it feel calm?

If not, reduce visual noise.

### Does it feel human?

If not, reduce sterile UI language.

### Does it feel trustworthy?

If not, improve hierarchy, spacing, and consistency.

### Does it feel modern?

If not, simplify rather than adding decoration.

### Does it feel like MindBridge?

If not, introduce the restrained purple/lavender system or the lotus/bridge language.

---

# 35. What Makes This Identity Distinctive

The goal is **not** to make the most decorative mental-health interface.

The identity should be recognizable through a small number of consistent choices:

1. Muted purple/lavender palette
2. Warm cream neutrals
3. Lotus + subtle bridge mark
4. Editorial serif display typography
5. Clean sans-serif UI typography
6. Generous whitespace
7. Soft but restrained rounding
8. Very subtle gradients
9. Quiet photography
10. Human, non-clinical language

These elements should remain consistent across:

- Website
- Mobile app
- Dashboard
- Presentation decks
- Pitch decks
- Social media
- Posters
- Reports
- Email
- Merchandise
- Favicon
- App icon

---

# 36. Brand Anti-Patterns

Do not allow the design to drift into:

### Generic AI startup

Symptoms:
- purple-blue neon gradient
- glowing blobs
- glassmorphism
- floating 3D objects
- excessive rounded cards

### Generic meditation app

Symptoms:
- mountains
- moon
- incense
- candles
- excessive spiritual imagery

### Hospital / clinical product

Symptoms:
- medical cross
- sterile blue
- doctor stock photography
- clinical dashboards
- excessive diagnostic terminology

### Children's wellness app

Symptoms:
- cartoon characters
- saturated colors
- oversized playful typography
- excessive illustrations

### Luxury wellness brand

Symptoms:
- black + gold
- extreme serif typography
- editorial fashion imagery
- excessive minimalism that reduces usability

MindBridge should sit between these categories:

**warm + modern + credible + human.**

---

# 37. Final Visual Rule

When uncertain between two design choices:

**Choose the quieter one.**

If an element can be removed without reducing usability or meaning, remove it.

If a gradient can be made 30% more subtle, make it subtler.

If a card can become whitespace, use whitespace.

If an illustration can become a simple shape, use the simple shape.

The MindBridge identity should feel like entering a quiet, well-designed room.

Not like opening a technology demo.

---

# 38. One-Line Design Brief

> **MindBridge is a calm, human mental-health experience built around muted lavender, warm neutrals, generous whitespace, and a refined lotus-and-bridge symbol — modern enough for technology, gentle enough to feel safe.**

# Avrah Brand Guidelines

> These guidelines define the visual and verbal identity of Avrah. They exist to keep things consistent, not to constrain. If something feels right but breaks a rule, question the rule first.

---

## 1. Brand Foundation

### The Name

**Avrah** comes from the Aramaic *avra k'davra* — "I create as I speak." It's the origin of *abracadabra*. The idea that articulating something is the first step to making it real.

A client describes a problem. A conversation becomes an architecture. An architecture becomes a product in someone's hands. That transformation is what Avrah does.

### Brand Attributes

| Attribute | What it means | What it doesn't mean |
|-----------|--------------|----------------------|
| **Playful** | Warmth, personality, a little magic | Frivolous, jokey, unserious |
| **Confident** | Comfortable, assured, quiet competence | Loud, boastful, aggressive |
| **Precise** | Detail-obsessed, production-ready, thorough | Cold, clinical, inhuman |
| **Human** | Direct, honest, personal | Corporate, performative, scripted |
| **Whimsical** | Studio Ghibli, not Cartoon Network | Childish, immature, silly |

### Position

Avrah is a product design studio at the intersection of hardware and software. Most work involves a physical thing in the world, talking to a system in the cloud, talking to a person through a screen.

We are not a dev shop, not an agency, not a startup, not a big consultancy. We are engineers who remember that real people use the things we build.

---

## 2. Voice & Tone

### Writing Principles

**Say it plainly.** No jargon where plain language works. "We build the firmware" not "We deliver embedded systems solutions." If a sentence doesn't add information, cut it.

**Be direct.** "We don't know" over "We'd need to explore that further." "That won't work" over "There may be some challenges with that approach." Directness is respect.

**Show the human.** First person. Contractions. The founder's name when it's relevant. "We got burned by this once" is better than "Industry experience has shown."

**Technical when it matters.** We don't dumb things down when the audience is technical. BLE, MQTT, FreeRTOS — use the real terms. But when explaining to a broader audience, lead with what the thing *does* before how it works.

**Warm, not cute.** The voice has personality but never tries too hard. A wry aside is fine. A pun in a section header is fine. A joke that undermines the seriousness of the work is not.

### Tone Examples

| Context | Tone | Example |
|---------|------|---------|
| Homepage headline | Confident, clear | "We take you from concept to prototype. Prototype to production. Production to scale." |
| Case study | Matter-of-fact, specific | "65,000+ units deployed. Zero vulnerabilities in pen testing." |
| Error page | Playful, self-aware | "Signal lost. The page you're looking for has gone off the grid." |
| Technical blog | Precise, conversational | "Here's the thing about BLE on ESP32: the stack is good, but the documentation lies to you sometimes." |
| Email to prospect | Human, direct | "Happy to jump on a call. I'll be straight about whether this is something we can help with." |

### Do / Don't

| Do | Don't |
|----|-------|
| "We build connected products" | "We deliver IoT solutions across the value chain" |
| "The firmware handles OTA updates" | "Our embedded platform enables over-the-air update capabilities" |
| "You talk to the people who do the work" | "Our lean organizational structure ensures direct stakeholder engagement" |
| "We've shipped 65,000 devices" | "We have extensive experience in high-volume deployments" |
| "That's outside our area — here's who I'd call" | "While that falls outside our current service offering..." |

---

## 3. Logo System

### The Mark

The Avrah mark is the **pinched spark** — a four-pointed star with concave curves between its points. It represents the moment of creation: *avra k'davra*, the instant an idea becomes real. The inward pinch gives it tension, like energy being released outward.

No letterform. No monogram. Just the spark. Paired with the AVRAH wordmark, there's no ambiguity. Alone, it's distinctive and scalable from favicon to building signage.

**Construction:**
- Four points extending to the edges of a square bounding box (top, right, bottom, left)
- Concave quadratic curves between each point, creating the pinched silhouette
- Perfectly symmetrical on both axes
- Single path, no compound shapes

**Files:**
- `logo-mark-gold.svg` — Primary (gold on transparent)
- `logo-mark-dark.svg` — For light backgrounds (obsidian on transparent)
- `logo-mark-light.svg` — For dark photography/busy backgrounds (warm white on transparent)

### The Wordmark

**AVRAH** set in Inter Bold (700 weight) with widened letter-spacing (0.12em). Always uppercase. The strong, repeated A letterforms give it natural rhythm.

**Files:**
- `logo-wordmark-gold.svg` — Primary
- `logo-wordmark-dark.svg` — For light backgrounds

**Note:** For production use, the wordmark text should be converted to outlined paths to remove font dependency. The SVG files use live text as a specification reference.

### Lockups

**Horizontal lockup:** Spark mark + wordmark side by side. Primary lockup for most uses — navigation bars, document headers, email signatures.

**Stacked lockup:** Mark above wordmark, with "PRODUCT DESIGN STUDIO" descriptor below in JetBrains Mono. For square formats — social avatars, app icons, compact placements.

**Files:**
- `logo-lockup-horizontal.svg`
- `logo-lockup-stacked.svg`

### The Spark Motif

The mark *is* the spark. At smaller sizes and as a decorative element, `spark.svg` provides the same pinched four-pointed star scaled for inline use. Use it for:

- List markers and bullet points
- Section dividers
- Loading/transition states
- Hover and interaction feedback
- Wherever something is being created or transformed

**File:** `spark.svg`

### Favicon

The pinched spark on an obsidian background with rounded corners. Optimized for 16x16 and 32x32.

**File:** `favicon.svg`

### Logo Usage Rules

**Clear space:** Minimum clear space around the mark = half the mark's width on all sides.

**Minimum size:**
- Mark: 24px height (digital), 8mm (print)
- Wordmark: 80px width (digital), 25mm (print)
- Horizontal lockup: 160px width (digital), 50mm (print)

**Do:**
- Use on solid backgrounds (dark preferred)
- Use approved color variants only
- Let the mark breathe — respect clear space

**Don't:**
- Rotate or skew the mark
- Change the proportions between mark and wordmark in lockups
- Alter the curve of the pinch — use the source path
- Place on busy backgrounds without sufficient contrast
- Add drop shadows, glows, or other effects
- Recreate or approximate the mark — always use the source files
- Lock the wordmark to a different typeface

---

## 4. Color System

### Core Palette

The palette is restrained and warm. Obsidian and gold anchor the brand. Not startup neons. Not corporate navy.

#### Primary

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| **Avrah Gold** | `#c9a55a` | 201, 165, 90 | Primary accent. Links, highlights, the mark, interactive elements. |
| **Obsidian** | `#0a0a0a` | 10, 10, 10 | Primary background. The default canvas. |

#### Gold Scale

For depth, hierarchy, and illustration use. The gold extends into a warm scale:

| Token | Hex | Usage |
|-------|-----|-------|
| Gold 100 (Glow) | `#f5ecd6` | Lightest tint. Illustration highlights, hover glows. |
| Gold 200 (Pale) | `#e8d5a8` | Light backgrounds in illustrations, soft highlights. |
| Gold 300 (Light) | `#d4b876` | Secondary text on dark, lighter accent variant. |
| Gold 400 (Primary) | `#c9a55a` | **The gold.** Primary accent color. |
| Gold 500 (Deep) | `#a8874a` | Pressed/active states, shadows on gold elements. |
| Gold 600 (Dark) | `#8a6e3a` | Darkest gold. Borders, subtle accents on dark. |

#### Warm Neutrals

Avrah's neutrals lean warm, never blue. Even in a dark UI, the grays carry warmth.

| Token | Hex | Usage |
|-------|-----|-------|
| Warm White | `#faf8f4` | Text on dark backgrounds (when not using #e5e5e5). Print backgrounds. |
| Bone | `#f0ebe0` | Light mode surfaces, illustration backgrounds. |
| Parchment | `#ddd5c4` | Borders on light, muted illustration fills. |
| Sand | `#b8a88e` | Tertiary text, disabled states on light. |
| Stone | `#888888` | Muted text (current --text-muted). |
| Smoke | `#555555` | Subtle borders, disabled text on dark. |
| Graphite | `#333333` | Hover borders on dark. |
| Charcoal | `#1a1a1a` | Hover surfaces on dark (current --bg-card-hover). |
| Midnight | `#141414` | Card surfaces on dark (current --bg-card). |
| Obsidian | `#0a0a0a` | Base background (current --bg). |

#### Illustration Accent Palette

These colors are **only for illustrations and data visualization**. They do not appear in the UI or brand materials outside of illustrated content. Each has a purpose tied to Avrah's work domains:

| Name | Hex | Domain | Feeling |
|------|-----|--------|---------|
| **Amber** | `#d4865a` | Hardware, physical things, warmth | Craft, tangibility |
| **Sage** | `#7a9e7e` | Health, status, nature, PCBs | Growth, reliability |
| **Copper** | `#b87333` | Electronics, circuit traces, metalwork | Precision, materiality |
| **Dusk** | `#8b7ec8` | Wireless signals, data, digital | Invisible layers, connectivity |
| **Sky** | `#6b9ec4` | Cloud systems, connectivity, calm | Openness, infrastructure |
| **Rose** | `#c47878` | Alerts, attention, warmth | Care, urgency |

**Illustration color rules:**
- Gold remains the dominant accent even in illustrations
- Illustration accents are always slightly muted — never fully saturated
- Backgrounds in illustrations use the neutral scale, not pure white or pure black
- Each illustration should use 3-4 accent colors maximum, not all six

#### Semantic Colors

| Name | Hex | Usage |
|------|-----|-------|
| Success | `#7a9e7e` | Positive states, confirmations |
| Warning | `#d4865a` | Caution, attention needed |
| Error | `#c45c5c` | Error states, destructive actions |
| Info | `#6b9ec4` | Informational, neutral highlights |

#### Backgrounds & Surfaces (CSS Custom Properties)

These map directly to the current site implementation:

```css
:root {
  --bg:             #0a0a0a;
  --bg-card:        #141414;
  --bg-card-hover:  #1a1a1a;
  --border:         #222222;
  --text:           #e5e5e5;
  --text-muted:     #888888;
  --accent:         #c9a55a;
  --accent-dim:     rgba(201, 165, 90, 0.12);
}
```

### Color Accessibility

- Gold (#c9a55a) on Obsidian (#0a0a0a): contrast ratio **7.8:1** — passes WCAG AAA
- Primary text (#e5e5e5) on Obsidian (#0a0a0a): contrast ratio **16.5:1** — passes WCAG AAA
- Muted text (#888888) on Obsidian (#0a0a0a): contrast ratio **5.1:1** — passes WCAG AA
- Never use gold text on Bone or lighter backgrounds without checking contrast
- Illustration accent colors are decorative; they should not carry meaning alone

---

## 5. Typography System

### Typefaces

**Inter** — Primary typeface. Used for all body text, headings, UI elements, and marketing copy. Clean, functional, and highly legible at all sizes. A workhorse that gets out of the way.

**JetBrains Mono** — Technical accent typeface. Used for code, labels, technical annotations, tags, and small-caps section markers. Signals precision and engineering context. The monospace rhythm gives technical content its own visual register.

Both are open-source and available via Google Fonts.

### Type Scale

| Token | Font | Size | Weight | Tracking | Line Height | Usage |
|-------|------|------|--------|----------|-------------|-------|
| Display | Inter | clamp(40px, 6vw, 72px) | 700 | -0.02em | 1.1 | Hero headlines only |
| H1 | Inter | clamp(28px, 4vw, 40px) | 700 | -0.02em | 1.15 | Section titles |
| H2 | Inter | 22px | 600 | 0 | 1.3 | Card titles, subsections |
| H3 | Inter | 18px | 600 | 0 | 1.4 | Card headings |
| Body | Inter | 16px | 400 | 0 | 1.65 | Default body text |
| Body Small | Inter | 15px | 400 | 0 | 1.6 | Card descriptions, secondary text |
| Caption | Inter | 14px | 500 | 0 | 1.5 | UI labels, metadata |
| Mono Label | JetBrains Mono | 12px | 400 | 0.15em | 1.4 | Section labels (uppercase), tags |
| Mono Code | JetBrains Mono | 14px | 400 | 0 | 1.6 | Inline code, technical specs |
| Mono Stat | JetBrains Mono | 32px | 700 | 0 | 1.2 | Large numbers, process steps |

### Typography Rules

**Headings:**
- Always Inter. Tight tracking (-0.02em) at Display and H1 sizes.
- Never all-caps for headings — sentence case or title case.
- Gold color only for Display-size headlines on dark backgrounds.

**Body:**
- Default 16px / 1.65 line-height. Generous line height is intentional — it makes dense technical content breathable.
- Max line length: 640px (~65 characters). Never let body text run wider.
- Paragraph spacing: 16px (1em).

**Monospace:**
- Always uppercase with wide tracking (0.15em) for labels.
- Gold color for section labels and category tags.
- Used with `--accent-dim` background for inline tags/pills.

**Font loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet">
```

---

## 6. Web & Digital Patterns

### Component Patterns

These patterns are established in the current site and should persist as the brand evolves:

**Cards:**
- Background: `--bg-card` with 1px `--border` border
- Border-radius: 10px
- Padding: 28-40px depending on content density
- Hover: background shifts to `--bg-card-hover`, border lightens to #333
- Transition: 0.2s ease on background and border

**Buttons (Primary CTA):**
- Background: `--accent` (gold)
- Text: `--bg` (obsidian) — dark text on gold
- Font: 15px / 600 weight
- Padding: 14px 32px
- Border-radius: 6px
- Hover: opacity 0.85

**Tags/Pills:**
- Font: JetBrains Mono, 11px
- Color: `--accent`
- Background: `--accent-dim`
- Padding: 4px 10px
- Border-radius: 4px

**Navigation:**
- Fixed, glass-morphism (blur backdrop + semi-transparent background)
- 64px height
- Logo left, links right
- Links in muted text, hover to primary text

### Motion Principles

- **Subtle and purposeful.** Motion communicates state change, not decoration.
- **Fast.** 0.2s for micro-interactions (hover, focus). 0.3s for layout shifts. Never longer than 0.5s for UI motion.
- **Ease-out.** Default easing for entrances. Ease-in-out for cycling/looping animations.
- **The hero cycle** (concept/prototype/production/scale) is the primary brand animation. Keep it smooth and unhurried — 9s full cycle with cubic-bezier easing.

### Dark-First Design

Avrah's digital presence is dark-first. If a light mode is ever introduced:
- Swap Obsidian → Warm White (#faf8f4) for backgrounds
- Swap primary text to Obsidian (#0a0a0a)
- Gold accent stays the same
- Cards become Bone (#f0ebe0)
- Borders become Parchment (#ddd5c4)
- Illustrations should work on both — design them on a neutral Bone/Parchment ground when possible

---

## 7. Quick Reference

### File Inventory

```
brand/
  BRAND_GUIDELINES.md          ← This document
  ILLUSTRATION_GUIDE.md        ← Detailed illustration direction
  assets/
    logo-mark-gold.svg         ← Primary mark (gold)
    logo-mark-dark.svg         ← Mark for light backgrounds
    logo-mark-light.svg        ← Mark for dark photography
    logo-wordmark-gold.svg     ← Primary wordmark (gold)
    logo-wordmark-dark.svg     ← Wordmark for light backgrounds
    logo-lockup-horizontal.svg ← Mark + wordmark side-by-side
    logo-lockup-stacked.svg    ← Mark above wordmark + descriptor
    favicon.svg                ← Browser favicon
    spark.svg                  ← Spark motif element
404.html                       ← The 404 page (brand demonstration)
```

### Quick Color Reference

```
Gold:      #c9a55a    Obsidian:  #0a0a0a    Midnight:  #141414
Charcoal:  #1a1a1a    Stone:     #888888    Text:      #e5e5e5
Amber:     #d4865a    Sage:      #7a9e7e    Copper:    #b87333
Dusk:      #8b7ec8    Sky:       #6b9ec4    Rose:      #c47878
```

### Quick Type Reference

```
Headings:  Inter 700           Body:   Inter 400 / 16px / 1.65
Labels:    JetBrains Mono 400  Code:   JetBrains Mono 400 / 14px
```

# ebike_shop2

Portfolio project: UI/UX design work for **ReCycle**, a fictional premium refurbished e-bike shop based in Lyon, France targeting EU urban commuters.

## Source files

| File | Purpose |
|------|---------|
| `ReCycle.html` | Full desktop storefront mockup — pure HTML/CSS, no JS |
| `Sell Card Options.html` | Design exploration: 6 layout variants for a "sell your bike" card (React + Babel) |
| `design-canvas.jsx` | Custom Figma-like canvas utility used by the above — pan/zoom, artboard management |

## Additional files

| Path | Purpose |
|------|---------|
| `site/ebikeshop.html` | Saved snapshot of **Upway.fr** — the real French refurbished e-bike shop that ReCycle.html is designed to reimagine. Primary visual/UX reference. Shopify-based, French-language (VAE reconditionné), brand color `#4733FF`, `#FF8A57`. |
| `site/ebikeshop_files/` | Assets bundled with the Upway snapshot (JS, images). Also referenced directly by `Sell Card Options.html` for card images. |
| `uploads/` | Image assets |

---

## ReCycle.html

A complete, single-file desktop storefront page (viewport fixed at 1440px). Pure HTML/CSS — no JavaScript.

### Page sections (top to bottom)
1. **Announcement strip** — free EU delivery, language selector, help/track links
2. **Sticky nav** — logo (`R/`), links (Shop / Categories / Sell yours / Refurbishment / Warranty), search/account/cart icon buttons
3. **Hero** — headline, lede, primary CTA ("Shop the lineup") + ghost CTA ("Trade in yours"), 3-stat bar (24,180+ bikes / 71-point check / 4.8 rating), hero stage with placeholder + floating spec cards
4. **Trust strip** — 4-column: 71-point inspection / 12-month warranty / 14-day returns / Free EU delivery
5. **Categories** — 4-card grid: City / Cargo / Road / Folding (each with inline SVG bike silhouette, stock count, price-from)
6. **Product grid** — 8 cards (tabs: All 359 / City 186 / Cargo 42 / Road 73 / Folding 58), sort control. Brands: Riese & Müller, Tern, Specialized, Brompton, Cowboy, Urban Arrow, Trek, GoCycle
7. **Trade-in section** — dark blue bg, 4-step process, live quote example (VanMoof S3 → €1,180)
8. **Footer** — brand blurb, 4 link columns (Shop / Workshop / Sell / Company), legal bar

### Design system

**Colors (CSS custom properties):**
- `--blue`: `oklch(52% 0.17 248)` — primary action
- `--blue-deep`: `oklch(36% 0.13 250)` — hover state
- `--blue-ink`: `oklch(22% 0.06 250)` — dark section backgrounds
- `--blue-tint`: `oklch(94% 0.03 248)` — subtle fills
- `--bg`: `#F4F2EC` — page background (warm off-white)
- `--bg-warm`: `#ECE8DE` — card/section fills
- `--ink`: `#111418` / `--ink-2`: `#4A4F57` / `--ink-3`: `#8A8F97` — text hierarchy
- `--rule`: `#D9D5C9` / `--rule-2`: `#E6E2D6` — dividers
- Green pill: `oklch(58% 0.13 145)` — Grade A / savings
- Amber pill: `oklch(73% 0.13 80)` — Grade B

**Typography:**
- Sans: `"Helvetica Neue", Helvetica, Arial, sans-serif` (body)
- Mono: `"IBM Plex Mono"` via Google Fonts (prices, specs, labels, badges)
- `.label` class: mono, 11px, 500, 0.12em tracking, uppercase — section labels

**Component patterns:**
- `.btn` — pill-shaped (border-radius: 999px), variants: `btn-primary` (blue), `btn-ghost` (outlined), `btn-white`; size modifier `btn-lg`
- `.pill` — mono badge, variants: `.blue`, `.green`, `.amber`
- `.card` — product card with `.card-art` (4:3 SVG placeholder), `.card-body`, `.card-foot` (price block + add button)
- `.cat` — category card with 4:5 aspect ratio SVG art
- `.stage-card` — floating spec overlay on the hero image
- `.cond` — condition dot indicator (green = Excellent, amber = Very good)
- Corner registration marks (`.reg`) on the hero stage for the design-mockup aesthetic

---

## Sell Card Options.html

Design comparison page (React 18 + Babel standalone, French-language copy). Shows 6 layout variants for a promotional "Vendre mon vélo" (sell your bike) card at 440×260px each.

| Option | Layout |
|--------|--------|
| A | Mobile photo as full cover image |
| B | Desktop banner image |
| C | Purple gradient + bike cutout PNG + icon list + CTA button |
| D | Orange gradient, split: text left / photo right |
| E | Mobile photo, contained with padding |
| F | Dark bg + photo at 30% opacity + purple overlay + icon list |

Colors used here differ from ReCycle.html: `#4733FF` (purple) and `#FF8A57` (orange). References the `'Gradient Premium'` font family (falls back to system-ui). Asset images sourced from `./site/ebikeshop_files/`.

---

## design-canvas.jsx

A self-contained Figma-like canvas (no external deps beyond React). Exported as globals: `DesignCanvas`, `DCSection`, `DCArtboard`, `DCPostIt`.

**Features:**
- Infinite pan/zoom viewport (trackpad pinch, scroll, mouse wheel, middle-drag)
- Artboards: drag-to-reorder, inline label rename, delete, PNG/HTML export
- Fullscreen focus overlay with ←/→ (within section) and ↑/↓ (across sections) keyboard nav
- State persisted to `.design-canvas.state.json` sidecar via `window.omelette.writeFile`
- Viewport position persisted to `localStorage`

**Usage pattern:**
```jsx
<DesignCanvas title="...">
  <DCSection id="s1" title="Section name">
    <DCArtboard id="a" label="Variant A" width={440} height={260}>
      {/* content */}
    </DCArtboard>
  </DCSection>
</DesignCanvas>
```

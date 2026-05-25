# ebike_shop2

Portfolio piece showing UI/UX upgrades to **Upway.fr**, a real French refurbished e-bike retailer (VAE reconditionné). The repo holds a saved snapshot of the live site and modifies it progressively in place — visitors can compare original Upway behavior to the upgraded version.

## Files

| Path | Purpose |
|------|---------|
| `site/ebikeshop.html` | Primary deliverable. Saved-page snapshot of `https://upway.fr/` (~12k lines), edited directly to implement the upgrades. |
| `site/ebikeshop_files/` | Assets the snapshot loads: JS, CSS, images, embedded widgets. |
| `site/ebikeshop_files/index.html` | Trustpilot reviews widget loaded via iframe by the main page. Also modified (mobile responsiveness). |
| `uploads/` | Design-exploration sketches and reference screenshots accumulated during the upgrade work. Not user-facing. |

## Brand context

- Upway = French refurbished e-bike retailer.
- Brand colors: `#4733FF` (purple), `#FF8A57` (orange).
- All copy is in French.

## Upgrade themes (so far)

Mobile responsiveness fixes on carousels (arrow hiding on touch devices, swipe support), dead-script cleanup (e.g. Klaviyo newsletter), layout tightening, and arrow-direction corrections. See `git log` for the running history.

## Deployment

Manual upload to Hostinger at `olivier-portfolio.fr/upway-upgrade/`, so the portfolio site (separate repo) can link to it. No build step — the snapshot ships as-is.

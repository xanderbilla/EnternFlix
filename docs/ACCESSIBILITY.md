# Accessibility

EnternFlix targets WCAG 2.1 AA. Accessibility is enforced through component primitives, ESLint rules, and a manual checklist script.

## Tools

| Tool                            | Purpose                                                 |
| ------------------------------- | ------------------------------------------------------- |
| `eslint-plugin-jsx-a11y`        | Static checks (alt text, roles, key handlers)           |
| `scripts/a11y-qa-checklist.mjs` | Prints the manual QA checklist; run before each release |
| Browser axe DevTools (manual)   | Per-page audit during PR review                         |

Run the checklist:

```bash
npm run a11y:checklist
```

## Semantic HTML

- Use `<button>` for actions, `<a>` for navigation. Never put a click handler on a `<div>`.
- Landmarks: one `<header>`, one `<main>`, one `<footer>` per route. Navigation goes inside `<nav>`.
- Headings are sequential (`h1` → `h2` → `h3`); do not skip levels.
- Lists use `<ul>` / `<ol>` / `<li>`.

## Images

`src/components/UI/RemoteImage.tsx` requires `alt`. Pass:

- A description for meaningful images (poster, person photo).
- Empty string `alt=""` for purely decorative images.

Never write `alt="image"` or `alt={title}` for posters where the title is already in adjacent text — that creates redundant screen reader output. Prefer `alt={\`${title} poster\`}` only when the title is not visible nearby.

## Keyboard

| Surface                  | Behavior                                                       |
| ------------------------ | -------------------------------------------------------------- |
| Navbar links and buttons | Tabbable in DOM order; visible focus ring                      |
| Carousel cards           | Tab-stops; Enter activates                                     |
| Dialogs (`BaseDialog`)   | Focus trapped inside; `Esc` closes; focus returns to trigger   |
| Dropdowns                | Open with Enter/Space; arrow keys navigate; Esc closes         |
| Search input             | Visible label or `aria-label`; submit on Enter                 |
| Player                   | Space/K toggles play, F fullscreen, M mute, arrows seek/volume |

Focus styles come from Tailwind `focus-visible:` utilities. Never `outline: none` without a visible replacement.

## ARIA

- Use ARIA only when semantic HTML is insufficient.
- `aria-label` for icon-only buttons (`IconButton`, `ActionButton` accept it as a prop).
- `aria-expanded` / `aria-controls` on dropdown triggers.
- `aria-current="page"` on active navigation links.
- Dialogs set `role="dialog"`, `aria-modal="true"`, `aria-labelledby`.
- Live regions: status messages use `role="status"` (polite); errors use `role="alert"`.

## Color and Contrast

- Body text contrast ≥ 4.5:1 against background.
- Large text (≥ 18 px or bold ≥ 14 px) ≥ 3:1.
- Focus indicators ≥ 3:1 against adjacent colors.
- Do not encode meaning with color alone — pair with icon or text.

Tailwind tokens in `tailwind.config.js` are tuned for the dark theme. Audit any new color with a contrast tool.

## Motion

- Page transitions (`TransitionContext`, 500 ms fade) are subtle and respect user attention.
- The watch banner autoplays muted; full playback requires user gesture.
- Respect `prefers-reduced-motion` — long animations should be conditional:

```css
@media (prefers-reduced-motion: reduce) {
  .animate-fade {
    animation: none;
  }
}
```

## Forms

The only form is the navbar search. It has a visible label or `aria-label`, submits on Enter, and exposes errors via `aria-describedby` if validation is added.

## Manual QA Checklist

`scripts/a11y-qa-checklist.mjs` prints the full list. Highlights:

- [ ] Tab through every interactive element on a page; confirm visible focus.
- [ ] Open and close every dialog with keyboard only; confirm focus returns to trigger.
- [ ] Run axe DevTools; resolve all serious/critical findings.
- [ ] Test with the OS screen reader (VoiceOver on macOS, NVDA on Windows).
- [ ] Reload at 200% zoom; no clipped text or unreachable controls.
- [ ] Force `prefers-reduced-motion`; confirm animations are subdued.
- [ ] Lighthouse Accessibility score ≥ 95 for `/browse` and `/watch?id=…`.

## ESLint A11y Rules

`eslint-plugin-jsx-a11y` recommended config is enabled. Common errors:

- `jsx-a11y/alt-text` — provide `alt` (use empty string for decorative).
- `jsx-a11y/click-events-have-key-events` — add a key handler or use a button.
- `jsx-a11y/no-static-element-interactions` — use a semantic element.
- `jsx-a11y/anchor-is-valid` — use `<Link>` or a real `href`.

Disable an a11y rule only with a one-line justification.

## Component Authoring Rules

- Every interactive component must work with keyboard alone.
- Every visible icon-only button must have `aria-label`.
- Every dialog must use `BaseDialog` (do not roll your own focus trap).
- Every image must use `RemoteImage` with explicit `alt`.
- Color and shape must both communicate state (hover, active, error).

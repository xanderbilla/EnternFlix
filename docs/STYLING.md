# Styling

## Stack

- Tailwind CSS (`tailwind.config.js`)
- Global CSS in `src/app/globals.css`
- No CSS modules or styled-components currently in use

## Design System Direction

Current design leans dark cinematic UI with zinc/red accents.

- Base background: `zinc-900`
- Primary action color family: red variants
- Utility classes reused for spacing, motion, and layout

## Spacing Rules

- Use Tailwind spacing scale consistently (`p-*`, `m-*`, `gap-*`).
- Prefer utility composition over one-off custom CSS.
- Keep section spacing explicit in page containers.

## Color Tokens

- Mostly Tailwind palette tokens (zinc, gray, red, white).
- No centralized custom token file yet.
- If design tokens expand, introduce CSS variables and document mappings.

## Typography

- Root font from `next/font/google` (Inter) in `src/app/layout.tsx`.
- Keep heading/body hierarchy with Tailwind text utilities.

## Animation and Motion

- Tailwind keyframe extension includes fade-in.
- Global CSS includes custom animation utilities (`animate-fadeIn`, `animate-fadeInScale`, `animate-scaleIn`).
- Use motion for feedback and transition clarity, not decoration overload.

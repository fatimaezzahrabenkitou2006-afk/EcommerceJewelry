# Project preferences

## UI components and icons

- Use Next.js App Router, TypeScript, and Tailwind CSS.
- Whenever creating an input, button, select, dialog, menu, or other UI control, use and customize shadcn/ui components from `src/components/ui`. Add missing components with the shadcn CLI.
- Build polished, distinctive jewelry ecommerce interfaces. Customize spacing, typography, colors, borders, and interaction states instead of leaving components with generic defaults.
- Use `lucide-react` for icons rather than emoji, Unicode symbols, or hand-drawn replacements. Give icon-only buttons accessible names and hide decorative icons from assistive technology.
- Use `@icons-pack/react-simple-icons` for social brand icons that Lucide does not provide.
- Use `motion` (React imports from `motion/react`) for animations where useful, respecting reduced-motion preferences.
- Use `react-hook-form`, `zod`, and `@hookform/resolvers` for forms that require validation.
- Preserve accessibility: labels, keyboard navigation, focus states, and sufficient contrast.
- These are the user's persistent preferences for future work in this repository.
<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

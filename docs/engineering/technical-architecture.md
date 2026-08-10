# Technical Architecture

## Framework

- Next.js
- React

## Language

- TypeScript

## Tooling

- ESLint provides static analysis.
- Prettier provides consistent code formatting.
- Storybook supports isolated UI component development and review.
- Tailwind CSS provides utility-first styling through PostCSS.
- Motion for React provides coordinated layout, presence, and gesture animations.

## Animation

- Use Tailwind CSS and native CSS transitions for simple hover, focus, and state changes.
- Use Motion for coordinated, state-driven animation such as carousel movement, shared layout changes, and content entering or leaving the interface.
- Keep interaction state in React and use Motion to interpolate visual properties and layout changes.
- Prefer animating transforms and opacity, and provide reduced-motion behavior for significant animation.

## Delivery

- Vercel hosts the application and creates preview and production deployments.
- GitHub Actions provides continuous integration by running automated checks before changes are merged and deployed.

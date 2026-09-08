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

## Portfolio Rendering Boundaries

- Use React Server Components by default for route content, case-study content, and panel composition.
- Compose both panels in the shared Server Component layout and pass them to the client shell as slots. Keep route content server-rendered while allowing interactive panel content, such as the carousel, to be a focused Client Component.
- Use a small client shell to animate the route-driven layout while receiving the server-composed panels as slots.
- Keep browser interaction and animation in focused Client Components: the shell owns pane transitions, and the carousel owns carousel interaction.
- Keep Motion values and panel-specific visual state local to the client component that animates them.
- Treat the current route as the sole source of the open case study. Route-aware Client Components derive the slug directly with Next.js navigation hooks.

See [Case-study route transition](case-study-route-transition.md) for the detailed routing, rendering, transition, and loading-performance design.

## Delivery

- Vercel hosts the application and creates preview and production deployments.
- GitHub Actions provides continuous integration by running automated checks before changes are merged and deployed.

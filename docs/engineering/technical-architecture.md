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

## Planned Portfolio Rendering Boundaries

- Use React Server Components by default for route content, case-study content, and panel composition.
- Compose the left and right panels as separate Server Components and pass their rendered output through the shared portfolio layout.
- Use a small, route-scoped client Context provider to coordinate the selected case study and shared presentation state across the two panels.
- Keep browser interaction and animation in focused client components nested within the server-composed panels. Server Components do not read the client Context directly.
- Keep Motion values and panel-specific visual state local to the client component that animates them rather than publishing frame-by-frame values through Context.
- Treat the current route as the durable source of navigation state. Context may begin a transition optimistically and then reconcile with completed client-side navigation.

See [Case-study route transition](case-study-route-transition.md) for the proposed routing, rendering, transition, and loading-performance design.

## Delivery

- Vercel hosts the application and creates preview and production deployments.
- GitHub Actions provides continuous integration by running automated checks before changes are merged and deployed.

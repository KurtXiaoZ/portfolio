# Case-Study Route Transition

## Status

Proposed. This document records the intended architecture for case-study routes and their transition from the landing page. The route structure, shared shell, and transition described here are not yet implemented.

## Purpose

Opening a case study should feel like the landing page rearranging itself into a reading experience rather than being replaced by a disconnected page. The case-study content becomes the primary left pane while the selected carousel remains visible in a smaller right pane.

The [landing-page product document](../product/pages/landing.md) is the source for the intended experience. This document describes the proposed routing, rendering boundaries, shared interaction state, navigation behavior, accessibility, and loading-performance strategy that support it.

## Route Structure

Each case study has a canonical route at `/work/[slug]`. The landing page and case-study routes should live beneath a shared layout so the portfolio frame and carousel can persist during client-side navigation.

The proposed route shape is:

```text
app/
└── (portfolio)/
    ├── layout.tsx
    ├── page.tsx
    └── work/
        └── [slug]/
            └── page.tsx
```

The exact file organization may change as the implementation develops, but it must preserve the following properties:

- `/` renders the landing state.
- `/work/[slug]` renders the selected case study.
- Case-study URLs support direct visits, refreshes, sharing, and browser history.
- Client-side navigation preserves the shared portfolio frame instead of remounting the entire experience.

## Rendering Boundaries

The left and right panels should be composed separately as React Server Components. A small client Context provider wraps their rendered output and coordinates only the interaction state shared by both sides.

```text
Shared portfolio layout
└── Experience provider (client)
    ├── Left panel (server-composed)
    │   └── Left transition component (client)
    └── Right panel (server-composed)
        └── Carousel and pane transition component (client)
```

Passing the server-rendered panels to the provider as children or slots preserves their Server Component boundaries. The client provider must not import the server panels directly. Server Components do not subscribe to the Context; focused client components nested within them do.

The Context should expose semantic state and actions, such as the selected case-study slug and operations to open or close a case study. Its internal React state mechanism remains an implementation decision. Motion values, element references, opacity, transforms, clip paths, and other frame-by-frame animation state remain local to the client component that owns the corresponding visual element.

## Route and Context Responsibilities

The URL is the durable source of truth for which case study is open. It must remain sufficient to reconstruct the correct settled interface after a refresh or direct visit.

The Context coordinates the immediate client experience. Selecting a card may update Context first so the pane transition begins without waiting for navigation, then navigate to the canonical route. When the route update arrives, the provider reconciles it with the pending selection without restarting the same animation.

Route changes initiated outside the carousel, including browser Back and Forward navigation, must also update the shared state. Reconciliation should be idempotent: receiving the route that already matches the pending selection produces no second transition.

## Navigation Behavior

Animation is based on the source and destination states, not on the particular navigation control the visitor used.

| Navigation                   | Intended behavior                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Landing page to case study   | Shrink the carousel pane, expand the content pane, remove Kurt's introduction, and reveal the case-study content. |
| Case study to landing page   | Reverse the opening transition and preserve the previously selected carousel card.                                |
| Case study A to case study B | Keep the pane proportions fixed while changing the article content and moving the active carousel card.           |
| Browser Back or Forward      | Apply the transition associated with the resulting source and destination.                                        |
| Direct URL visit or refresh  | Render the destination in its settled state without an entrance animation.                                        |
| Navigation to the same URL   | Do not replay an animation.                                                                                       |

The server-rendered initial layout and the provider's initial state must agree so hydration does not introduce a layout shift. Initial Motion presence animations should be disabled. Motion should run only when navigation has a meaningful visual origin within an already hydrated experience.

## Panel Choreography

The two panel animation components subscribe to the same semantic Context update and animate their own elements independently. Shared duration and easing constants keep the movements synchronized without publishing animation progress through React state.

For the landing-page-to-case-study transition:

1. The selected carousel card remains active as the spatial anchor.
2. The right pane shifts and shrinks while the left pane expands.
3. Kurt's introduction fades and translates slightly left.
4. The case-study content begins entering shortly after the pane movement starts, using opacity, a small horizontal translation, and a clip reveal.
5. The layout settles with the reading content at roughly 65–70% width and the carousel at roughly 30–35% width.
6. The carousel stays in this secondary position for the complete reading experience.

The initial timing target is 700–900ms for the full opening transition, with case-study content beginning approximately 100–200ms after pane movement starts. Exact values should be tuned visually while preserving the order and overlap defined by the product intent.

## Interruption and Navigation Safety

New navigation may begin before the current transition completes. Each panel should continue from its current rendered pose rather than snapping to an intermediate preset. Route reconciliation must not replay an optimistic transition when its matching navigation completes.

While an opening or closing transition is in progress, the implementation should prevent conflicting activation of the same card without blocking browser navigation. Moving directly to a different case study should resolve to that latest destination.

Modified link interactions, including opening a case study in a new tab, should retain native anchor behavior and should not be intercepted solely to play the transition.

## Accessibility

- Move focus to the case-study heading after an in-app opening transition completes.
- Restore focus to the previously selected carousel card when returning to the landing page when that focus target remains appropriate.
- Prevent temporarily overlapping outgoing content from creating duplicate focus targets or duplicate assistive-technology output.
- Preserve keyboard carousel navigation and native browser history behavior.
- When reduced motion is requested, remove pane movement, spatial translation, clip animation, and stagger. Use a short crossfade or an immediate state change while preserving content, focus, and routing behavior.

## Loading Performance

The client Context provider should remain small. Wrapping server-rendered panels in a client provider does not by itself add their component implementations to the browser bundle. Only the provider and the focused client interaction components require hydration.

The homepage should not render or transfer every complete case study in preparation for a possible selection. Content should be divided by loading need:

- Load card titles, tags, and the initially required carousel imagery with the landing page.
- Include or prefetch only the lightweight case-study information needed to make the opening transition responsive.
- Load the full body and long-form media for the selected `/work/[slug]` route.

Image loading is expected to have a larger effect on initial loading performance than the Context provider. Only immediately visible imagery should load eagerly. Distant carousel covers and long-form case-study images should load lazily, image `sizes` should reflect their rendered pane, and hero assets may be prefetched based on active-card, hover, or navigation intent when measurement supports it.

Animating pane dimensions may trigger layout work. Keep the full article body out of unnecessary repeated layout during the opening transition. If measurement shows dropped frames, use a transform-based layout technique while preserving the same visual result. Prefer transforms and opacity for content entrances.

Performance verification should use a production build and include:

- initial route JavaScript and React Server Component payload sizes
- cold-load Largest Contentful Paint and layout shift
- case-study navigation after route prefetch
- animation frame consistency during the pane transition
- direct case-study loading without an initial animated layout shift

## Relationship to Carousel Motion

This document covers the route-level transition and pane resizing. Movement between cards inside the carousel follows the separate [Vertical Carousel Scroll Animation](vertical-carousel-scroll-animation.md) choreography. The two systems share the selected card but should remain independently understandable and testable.

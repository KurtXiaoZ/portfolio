# Case-Study Route Transition

## Status

Partially implemented. The shared shell, route-driven transition, and one mocked case-study route are in place. The remaining case-study content, persistent-carousel synchronization between case-study routes, route focus transfer, and reduced-motion handling for mobile pane heights are not yet implemented. Motion details remain subject to visual tuning.

## Purpose

Opening a case study should feel like the landing page rearranging itself into a reading experience rather than being replaced by a disconnected page. The case-study content becomes the primary left pane while the selected carousel remains visible in a smaller right pane.

The [landing-page product document](../product/pages/landing.md) is the source for the intended experience. This document describes the routing, rendering boundaries, navigation behavior, accessibility, and loading-performance strategy that support it.

## Route Structure

Each case study has a canonical route at `/work/[slug]`. The landing page and case-study routes live beneath a shared layout so the portfolio frame and carousel persist during client-side navigation.

The current route shape is:

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

The shared Server Component layout composes the left route-content slot and the right carousel slot, then passes both to a small client shell. The left route content remains server-rendered, while the interactive carousel is a focused Client Component.

```text
Shared portfolio layout (server)
└── Portfolio shell (client)
    ├── Left-pane sizing and content transition
    │   └── Route-content slot (server-rendered)
    └── Right-pane sizing
        └── Portfolio carousel (client)
```

Passing server-composed slots to the client shell preserves the Server Component boundary of the route content. The shell must not import Server Components directly. Focused Client Components read route information from Next.js only when they need it.

There is no shared cross-panel client state beyond the current route, so a Context provider is unnecessary. Route-aware Client Components derive the selected case-study slug with Next.js navigation hooks. The carousel keeps its own interaction state, while Motion values, element references, opacity, transforms, clip paths, and other frame-by-frame animation state remain local to the client component that owns the corresponding visual element.

## Route and Client Responsibilities

The URL is the durable source of truth for which case study is open. It must remain sufficient to reconstruct the correct settled interface after a refresh or direct visit.

Route-aware client components derive the selected case study directly from the current route. Links and client navigation request route changes without creating a second copy of selection state.

Route changes trigger the same visual transition whether they come from a click, direct client navigation, browser Back, or browser Forward. The shell derives pane proportions from the route slug and keys the left content transition by pathname. Route prefetching should keep the gap between a click and that change small; optimistic state can be introduced later only if measured navigation latency makes it worthwhile.

## Navigation Behavior

Animation is based on the source and destination states, not on the particular navigation control the visitor used.

| Navigation                   | Intended behavior                                                                                                 |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| Landing page to case study   | Shrink the carousel pane, expand the content pane, remove Kurt's introduction, and reveal the case-study content. |
| Case study to landing page   | Reverse the opening transition and preserve the previously selected carousel card.                                |
| Case study A to case study B | Keep the pane proportions fixed while changing the article content and moving the active carousel card.           |
| Browser Back or Forward      | Apply the transition associated with the resulting source and destination.                                        |
| Direct URL visit or refresh  | Render the destination in its settled state without an entrance animation.                                        |
| Navigation to the same URL   | Do not replay the route transition; Next.js may still process it as same-page navigation.                         |

The server-rendered initial layout and the route-derived client state must agree so hydration does not introduce a layout shift. Initial Motion presence animations should be disabled. Motion should run only when navigation has a meaningful visual origin within an already hydrated experience.

## Panel Choreography

The panel animation components respond to the same route change and animate their own elements independently. Shared duration and easing constants keep the movements synchronized without publishing animation progress through React state.

For the landing-page-to-case-study transition:

1. The selected carousel card remains active as the spatial anchor.
2. The right pane shifts and shrinks while the left pane expands.
3. Kurt's introduction fades and translates slightly left.
4. The case-study content begins entering shortly after the pane movement starts, using opacity, a small horizontal translation, and a clip reveal.
5. The layout settles with the reading content at roughly 65–70% width and the carousel at roughly 30–35% width.
6. The carousel stays in this secondary position for the complete reading experience.

The initial timing target is 700–900ms for the full opening transition, with case-study content beginning approximately 100–200ms after pane movement starts. Exact values should be tuned visually while preserving the order and overlap defined by the product intent.

## Interruption and Navigation Safety

New navigation may begin before the current transition completes. Each panel should continue from its current rendered pose rather than snapping to an intermediate preset. Because the pathname is the sole selection state, the transition follows the latest route.

Repeated activation of the already-open case study may invoke same-page navigation, but unchanged route values must not replay the transition. Moving directly to a different case study should resolve to that latest destination.

Modified link interactions, including opening a case study in a new tab, should retain native anchor behavior and should not be intercepted solely to play the transition.

## Accessibility

- Route-transition focus transfer is deferred for now. When introduced, move focus to the case-study heading after an in-app opening transition completes.
- When focus transfer is introduced, restore focus to the previously selected carousel card after returning to the landing page when that target remains appropriate.
- Prevent temporarily overlapping outgoing content from creating duplicate focus targets or duplicate assistive-technology output.
- Preserve keyboard carousel navigation and native browser history behavior.
- When reduced motion is requested, remove pane movement, spatial translation, clip animation, and stagger. Use a short crossfade or an immediate state change while preserving content, focus, and routing behavior.
- The current Motion transitions honor reduced motion, but the mobile pane-height CSS transition still needs equivalent handling.

## Loading Performance

The client shell should remain small. Passing server-rendered panels through its slots does not by itself add their component implementations to the browser bundle. Only the shell and focused client interaction components require hydration.

The homepage does not render case-study bodies. The current carousel explicitly prefetches the route payload for every implemented case study after hydration; with only one implemented route this keeps its opening responsive. Revisit that policy as the number and size of case studies grow so the homepage does not eagerly transfer every complete case study.

Content is currently divided by loading need:

- Load card titles, tags, and the initially required carousel imagery with the landing page.
- Prefetch implemented case-study route payloads after hydration.
- Render the full body and long-form media only within the selected `/work/[slug]` route.

Image loading is expected to have a larger effect on initial loading performance than the client shell. Only immediately visible imagery should load eagerly. Distant carousel covers and long-form case-study images should load lazily, image `sizes` should reflect their rendered pane, and hero assets may be prefetched based on active-card, hover, or navigation intent when measurement supports it.

Animating pane dimensions may trigger layout work. Keep the full article body out of unnecessary repeated layout during the opening transition. If measurement shows dropped frames, use a transform-based layout technique while preserving the same visual result. Prefer transforms and opacity for content entrances.

Performance verification should use a production build and include:

- initial route JavaScript and React Server Component payload sizes
- cold-load Largest Contentful Paint and layout shift
- case-study navigation after route prefetch
- animation frame consistency during the pane transition
- direct case-study loading without an initial animated layout shift

## Relationship to Carousel Motion

This document covers the route-level transition and pane resizing. Movement between cards inside the carousel follows the separate [Vertical Carousel Scroll Animation](vertical-carousel-scroll-animation.md) choreography. The two systems share the selected card but should remain independently understandable and testable.

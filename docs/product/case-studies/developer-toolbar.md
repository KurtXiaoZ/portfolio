# Building a Developer Toolbar for 200+ Engineers

Media planning: [thumbnail and capture spec](../../../media/projects/developer-toolbar/spec.md).

## Status

Implemented at `/work/developer-toolbar` with a matching featured-work carousel
entry. The page follows the updated source in
`paypal/knowledge-base/developer-toolbar/case-study.md`: Context, Problem,
Solution, and Impact, with four tool walkthroughs inside Solution.

The source now confirms Kurt designed and built the toolbar, its implementation
details, usage by 200+ engineers, and adoption by 4 teams. The implementation
replaces the earlier feature tour with this narrative and links to the Feature
Flag Platform case study. It makes no quantified time-saving claims.

All visuals remain static, simplified mockups using illustrative data, including
collapsed and expanded toolbar states. Replace them with reviewed recordings or
images when available. Mockup disclaimers, badges, and captions below the visuals
are omitted from the public page. Publication review remains pending.

## Resume Statement

> Improved developer velocity for 200+ engineers by building an in-app toolbar with feature flag overrides, GraphQL response mocking, accessibility audits, and React Scan render profiling.

## Core Story

Show how Kurt consolidated recurring debugging and validation workflows into an in-app tool that made complex application states easier for engineers to reproduce and inspect.

## Intended Audience Takeaway

Kurt recognizes organizational friction, builds practical developer platforms, and creates leverage beyond the code he directly owns.

## Current Narrative

1. Context: 200+ engineers contribute to PayPal Branded Checkout.
2. Problem: context switching, missing app context, and tooling drift.
3. Solution: Kurt designed and built an embedded, compact, collapsible toolbar
   that evolves alongside checkout, loads separately when enabled, and is off
   by default in production.
4. Feature flags: generated catalog and server-evaluated values, cookie-backed
   overrides applied before rendering on reload, and pins stored in local storage.
5. Mock scenarios: shared GraphQL datasets, server-action persistence, a dataset
   cookie, and MSW interception on the server after reload.
6. Accessibility checks: lazy-loaded axe-core, debounced scans, severity grouping,
   and affected DOM element inspection.
7. React render diagnostics: React Scan enabled on demand, with page highlights
   and console logging.
8. Impact: used by 200+ engineers and adopted by 4 teams.

## Evidence to Gather

- public-safe screenshots or a recreated demonstration
- a toolbar architecture or extension diagram
- representative workflows before and after the toolbar
- adoption and usage evidence
- quantified time savings or developer feedback

## Open Questions

- Which workflow originally motivated the toolbar?
- How was developer velocity measured?
- Was the toolbar extensible, and who contributed capabilities?
- Which internal UI and implementation details are safe to publish?

# Feature Flag Platform

## Status

Implemented at `/work/feature-flag-system` with a matching featured-work carousel
entry. Context, Problem, Solution, and Impacts follow
`paypal/knowledge-base/feature-flags/case-study.md` in the sibling repository.

This source-based page replaces the previously removed illustrative narrative.
The carousel cover is a simplified illustration, not an internal product image.

## Current Narrative

- Context: a single PayPal Branded Checkout session can involve hundreds of
  feature flag evaluations. Feature flags support A/B testing to measure product
  changes and improve conversion, while enabling safe feature rollouts.
- Problem: performance and reliability, asynchronous integration complexity,
  shared flag decisions within a request, and attribution to conversion and
  performance metrics.
- Solution: a shared TypeScript flag contract and generated catalog,
  request-scoped decisions with `AsyncLocalStorage`, local experiment evaluation
  backed by a process-wide rules cache, and consistent decision telemetry.
  The narrative explains background rule refreshes, retaining existing rules
  after failed refreshes, and defaults when rules are missing.
  The shared contract section centers on the adapter pattern: boolean
  experiment checks and multi-treatment ramp flags extend a core flag primitive
  while preserving TypeScript result types and valid defaults. A shorter
  supporting paragraph covers the generated catalog’s role in experiment-rule
  preloading, developer tooling, and typed test overrides.
  A horizontal carousel has three slides: `flag()`, `elmoFlag()`, and
  `rampFlag()`. The core slide shows all six configuration attributes and core
  functionality. Adapter slides explain their scenarios, mark added
  configuration, and describe the behavior built on the core. Each slide has a
  consumer call and return type. Navigation supports named buttons, previous
  and next controls, arrow keys, touch/trackpad scrolling, and reduced motion.
  Examples use illustrative names and eligibility logic.
  A compact static flow illustration follows the catalog paragraph: application
  definitions converge into a generated inventory and types, then branch to
  preloading, developer tools, and typed overrides. The generated-file view uses
  illustrative flag metadata and avoids repeating the carousel’s code layout.
  The request-consistency section uses a short introduction and a shared-cache
  diagram: middleware, React Server Components, and server-side rendering call
  the same flag within one server request. The boundary shows an example
  checkout GET request. The cache shares one decision or in-flight evaluation.
  A three-step request journey explains store creation, `AsyncLocalStorage`
  carrying access across the codebase, and callers reusing a decision or an
  evaluation already in progress. Each step pairs concise prose with simplified
  pseudocode showing store creation, access, and caching before awaiting a
  decision. The final step explicitly shows returning a result from the shared
  promise and two concurrent calls reusing one evaluation. The diagram stacks
  vertically when its container is narrow.
  The local-evaluation section follows the same concise, illustrated approach:
  the downstream experiment service supplies a per-instance rules cache, while request
  context feeds synchronous local evaluation. Three story steps and simplified
  pseudocode cover catalog-driven preloading and indexing, evaluation with
  defaults and background refresh on missing rules, and retaining existing rules
  after refresh failures. Each server instance refreshes its rules periodically
  in the background.
  The instrumentation section pairs a concise summary with a shared-callback
  flow into analytics and monitoring. Three story steps and simplified
  pseudocode explain resolution signals and optional experiment attribution,
  error reporting with default values, and request-cache reads that avoid
  repeating resolution telemetry.
- Impacts: reduced time to first byte by 141 ms, largest contentful paint by
  184 ms, and downstream experimentation calls by 93%; removed more than 150
  `async`/`await` points to simplify server-rendering code.

## Content Boundaries

Use the supplied case study as the source for future additions. Do not infer
Kurt's responsibilities or implementation details beyond the supplied source.
Publication review remains pending.

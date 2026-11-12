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
  The narrative explains the availability tradeoff of background rule refreshes
  and defaults when rules are missing.
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
  A compact static illustration follows the catalog paragraph: application
  definitions and a generated inventory appear in two columns, with preloading,
  developer tools, and typed overrides below. The snippets abbreviate flag
  configuration and catalog metadata.
- Impacts: reduced time to first byte by 141 ms, largest contentful paint by
  184 ms, and downstream experimentation calls by 93%; removed more than 150
  `async`/`await` points to simplify server-rendering code.

## Content Boundaries

Use the supplied case study as the source for future additions. Do not infer
Kurt's responsibilities or implementation details beyond the supplied source.
Publication review remains pending.

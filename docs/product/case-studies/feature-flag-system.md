# Resolving 150+ Feature Flags in Under 200ms

## Status

Selected for the initial portfolio. Narrative development and publication review are pending.

## Resume Statement

> Designed and implemented a feature flag system for Node.js, supporting request-scoped caching, sync/async flag resolution, and typed runtime context, resolving 150+ feature flags in under 200ms.

## Core Story

Explain how Kurt designed a predictable, type-safe feature-flag system that could evaluate a large set of flags efficiently within the lifecycle of a server request.

## Intended Audience Takeaway

Kurt can design reusable backend infrastructure with clear APIs, performance constraints, and safe runtime behavior.

## Initial Narrative

1. The limitations or risks of the previous flag-evaluation approach
2. Functional, performance, and type-safety requirements
3. The request-scoped context and caching model
4. Supporting both synchronous and asynchronous resolution
5. Typed runtime context and developer-facing API design
6. Performance validation for 150+ flags
7. Adoption, operational behavior, and lessons learned

## Evidence to Gather

- a public-safe architecture diagram
- a simplified evaluation lifecycle
- sanitized API examples
- benchmark method and latency distribution
- adoption or developer-experience evidence

## Open Questions

- What specific problem motivated replacing or creating the system?
- Why did a request need to resolve more than 150 flags?
- How were cache lifetime, invalidation, and failures handled?
- What was the previous latency or behavior?
- Which provider and internal implementation details must be generalized?

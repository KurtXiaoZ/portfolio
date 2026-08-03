# Building an Embedded Platform for BNPL Products

## Status

Selected for the initial portfolio. Narrative development and publication review are pending.

## Resume Statement

> Architected and integrated a reusable embedded application platform for Buy Now Pay Later (BNPL) products, combining iframe-based runtime isolation, preload/launch orchestration, reload-safe session persistence, and post-decision reconciliation across 18 BNPL products, supporting 840K applications per day.

## Core Story

Explain how Kurt designed a reusable platform that let many BNPL products operate safely within a shared host experience while preserving isolation, lifecycle coordination, and state across failure-prone user journeys.

## Intended Audience Takeaway

Kurt can define platform boundaries, coordinate distributed application lifecycles, and design resilient integrations used across many products at substantial scale.

## Initial Narrative

1. The product fragmentation or integration problem
2. Platform requirements and constraints
3. Why iframe-based runtime isolation was selected
4. Preload and launch orchestration
5. Session persistence across reloads and interruptions
6. Post-decision reconciliation with the host experience
7. Adoption across 18 products and operation at 840K applications per day

## Evidence to Gather

- a public-safe host and embedded-application architecture diagram
- preload and launch sequence diagrams
- reload recovery and reconciliation state flows
- integration contract or sanitized API examples
- adoption, reliability, and performance evidence

## Open Questions

- What made the previous product-by-product approach unsustainable?
- Which security and browser constraints drove the iframe decision?
- How were cross-frame communication and versioning handled?
- Which failure modes required session persistence and reconciliation?
- What measurable improvement came from adopting the shared platform?

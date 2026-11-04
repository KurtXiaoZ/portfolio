# Building an Embedded Platform for BNPL Products

## Status

Implemented at `/work/bnpl-platform` and linked from the featured-work carousel.
The page follows `knowledge-base/bnpl-platform/case-study.md` in the sibling
`paypal` repository, covering context, integration challenges, the reusable
iframe solution, shared React context, session recovery, and preload and launch
orchestration. The preload and launch section uses responsive diagrams for
background preparation, the initialization handshake, readiness milestones,
both launch orderings, and offer changes. Short captions carry the main story;
the source draft’s simplified code examples are available in native expandable
panels, including the shared context example. The diagrams use HTML and SVG,
remain server-rendered, and adapt to the article’s width. Checkout artwork is
illustrative.

The concise product-flow section follows preload and launch, using the source
draft’s description of shared application logic and product configuration. A
responsive architecture diagram shows checkout supplying offer details, the
embedded BNPL application exchanging product data with BNPL downstream services, and the
application outcome returning to checkout. Labels use terms that are meaningful
without PayPal-specific knowledge.

Completion follows the product-flow section with the source draft’s concise
paragraph and its original Mermaid sequence diagram, rendered as a static SVG.
The [copied Mermaid source](diagrams/bnpl-completion.mmd) preserves the three
participants, message labels, and self-calls; regenerate the SVG when it changes.
The application’s top and bottom participant boxes have 20px of extra space on
each side of the label; preserve this padding when regenerating the SVG.
The graph scrolls horizontally on smaller screens to keep its labels readable.
Checkout retains responsibility for payment authorization.

The source draft's Impacts section is empty. The page omits impact claims and
the scale metrics below until supporting evidence and publication review are
complete. Personal responsibilities also need confirmation before adding
individual attribution beyond the source's team-level account.

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

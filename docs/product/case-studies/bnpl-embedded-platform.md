# Building an Embedded Platform for BNPL Products

Media planning: [thumbnail and capture spec](../../../media/projects/bnpl-platform/spec.md).

## Status

Implemented at `/work/bnpl-platform` and linked from the featured-work carousel.
The page follows `knowledge-base/bnpl-platform/case-study.md` in the sibling
`paypal` repository, covering context, integration challenges, the reusable
iframe solution, shared React context, session recovery, and preload and launch
orchestration. Preload and launch uses a guided stepper with a connected stage
rail, a short explanation, and an illustration of the buyer’s view alongside
the embedded application’s state. Visitors can choose a stage directly or use
Back and Next. The final Change offer action changes the illustrated offer and
returns to Preload. The source draft’s simplified code examples remain in native
expandable panels, including the shared context example. Checkout artwork is
illustrative.

Preload and launch is presented as four numbered stages: load code into a
hidden iframe, start the application, report that the first screen is ready,
and reveal the iframe when the buyer has also requested Continue. Selection
changes form a return path to preparation rather than a fifth stage. App start
is distinct from the earlier checkout-provider setup and from screen readiness.
The stepper is a focused Client Component. The article, product-flow diagram,
and example content passed into the stepper remain server-rendered. The stage
rail reflows into two rows in a narrow article pane; controls work with the
keyboard and announce the selected stage and iframe visibility.
Back and Next move reading focus to the selected stage’s heading so the new
explanation is visible within the scrollable article pane.

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

The Impacts section follows the source draft’s two results: 18 BNPL products
integrated through the reusable embedded platform and 840K applications
supported per day. The page presents these as adoption and scale metrics.
Personal responsibilities still need confirmation before adding individual
attribution beyond the source's team-level account.

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

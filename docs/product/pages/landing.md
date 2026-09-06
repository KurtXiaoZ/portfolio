# Landing Page

## Purpose

Introduce Kurt quickly and give visitors clear paths to his work and background.

## Required Content

- Kurt's name and current professional identity
- a concise introduction that communicates his strengths and perspective
- entry points to several featured case studies
- an entry point to the About page

## Desired Visitor Outcomes

After viewing the landing page, a visitor should understand:

- who Kurt is
- what kind of work he does
- why his experience is worth exploring
- where to go to learn about his work or about him personally

## Current Layout Direction

The desktop landing page uses a full-viewport, two-pane layout:

- the left content pane introduces Kurt and currently shows only his name
- the right carousel pane is the primary focus and shows one featured case study at a time
- both panes fill the viewport height, and their widths can change with the current page state
- the outer page shell does not scroll; each pane manages its own overflow when its content requires scrolling

The carousel uses a vertical perspective-fold transition. Each item presents an image, followed by the case-study title and quiet metadata tags. Color and visual emphasis should come primarily from the image rather than the card background or tags.

Cards moving into the upper position fold around their bottom edge; cards moving into the lower position fold around their top edge. Adjacent cards retain most of their size and remain visible so the movement feels like placing a card into a stack. A card leaving either adjacent position holds its current pose and fades out without further movement. Incoming cards unfold from the same edge, and looping repositions recycled cards without sending them through the center.

See [Vertical Carousel Scroll Animation](../../engineering/vertical-carousel-scroll-animation.md) for the implemented interaction choreography, timing, and interruption behavior.

### Case-Study Presentation Animation

Opening a case study is one coordinated transition with four visual states:

1. **Home:** Kurt's name occupies the left pane, and the carousel is the dominant right pane.
2. **Opening:** The selected card remains visible as a spatial anchor while the carousel pane shifts right and shrinks. At the same time, the content pane expands and Kurt's name begins to leave.
3. **Case-study introduction:** The case-study title, summary, and hero image replace Kurt's name in the expanded content pane. The carousel remains visible in a secondary position with the selected card active.
4. **Reading:** After the visitor scrolls beyond the introduction, the carousel may collapse into a narrow project rail or disappear while the case-study content expands to use most of the viewport width.

The opening transition should be orchestrated as follows:

- Keep Kurt's name and the incoming case-study introduction mounted in the same left-pane region during the transition. They should overlap temporarily rather than swap through an abrupt unmount.
- Start the carousel movement, carousel scaling, content-pane expansion, and name exit together. These changes should share a consistent duration and easing so the two panes feel like one layout transformation.
- Fade and translate Kurt's name slightly left as it exits.
- Begin revealing the case-study introduction shortly after the pane movement starts. Use opacity, a small horizontal translation, and a clip reveal so the content appears to emerge into the space created by the moving carousel.
- Reveal the title and summary first, followed by the hero image with a small stagger. Do not transition the remaining long-form images; they should render in normal document flow.
- Settle with the content pane occupying roughly 65–70% of the viewport and the carousel occupying roughly 30–35%. These proportions can be tuned, but the case-study introduction must become the primary focus.
- When returning to all work, reverse the sequence: remove the case-study introduction, expand the carousel, and restore Kurt's name while preserving the previously selected card.

As an initial timing target, the full opening transition should take approximately 700–900ms. The case-study introduction can begin entering around 100–200ms after the pane movement starts. Exact values should be tuned visually while preserving this order and overlap.

For reduced motion, skip the spatial movement and stagger. Use a short crossfade or an immediate state change while preserving the same content and focus behavior.

This direction is desktop-first. Mobile layout and transition behavior remain open.

## Initial Content Order

1. Introduction
2. Featured case studies
3. About-page entry point

Final copy and the About-page presentation remain open.

## Selected Case Studies

- [Halving first-page load latency](../case-studies/checkout-performance.md)
- [Resolving 150+ feature flags in under 200ms](../case-studies/feature-flag-system.md)
- [Standardizing interaction telemetry at scale](../case-studies/interaction-telemetry-sdk.md)
- [Building an embedded platform for BNPL products](../case-studies/bnpl-embedded-platform.md)
- [Building a developer toolbar for 200+ engineers](../case-studies/developer-toolbar.md)

The presentation order and prominence of each case study remain open.

## Open Questions

- What should the introduction emphasize most?
- Where should the professional identity, concise introduction, and About entry point live within the name-only left-pane direction?
- How much information should each case-study entry show?
- Should the About entry point be a short preview or a simple call to action?

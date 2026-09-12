# Landing Page

## Purpose

Introduce Kurt quickly and let visitors explore his work and background through three focused content modes.

## Required Content

- Kurt's name and current professional identity
- a concise introduction that communicates his strengths and perspective
- Case Studies, Gallery, and About tab controls
- entry points to several featured case studies
- a visual gallery of work
- additional text and images about Kurt

## Desired Visitor Outcomes

After viewing the landing page, a visitor should understand:

- who Kurt is
- what kind of work he does
- why his experience is worth exploring
- how to explore his detailed case studies, broader body of work, and personal background

## Current Layout Direction

The desktop landing page uses a full-viewport, two-pane layout:

- the left content pane introduces Kurt and presents three primary tabs: Case Studies, Gallery, and About
- the introduction and tab controls remain stable while tab selection changes the right pane
- the right pane is the primary exploration area and displays the content associated with the active tab
- both panes fill the viewport height, and their widths can change with the current page state
- the outer page shell does not scroll; each pane manages its own overflow when its content requires scrolling

Case Studies is active by default. The active tab must be visually distinct, and each tab should have a clear associated panel. The controls should behave as an accessible tab interface, including keyboard navigation and programmatic relationships between tabs and panels.

## Right-Pane Modes

| Active tab   | Right-pane content                                                                                                        | Primary purpose                                                |
| ------------ | ------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------- |
| Case Studies | The featured-work carousel, with each card providing an entry point to an individual case study                           | Demonstrate depth, decision-making, execution, and impact      |
| Gallery      | A curated collection of work images arranged in a polished, responsive visual layout                                      | Give a fast, broad impression of the range and quality of work |
| About        | A composed mix of text and supporting images that expands on Kurt's background, perspective, interests, and working style | Help visitors understand the person behind the work            |

Changing tabs should update only the right pane so the left-side introduction remains a stable orientation point. The transition should make the content change feel intentional without delaying exploration. Exact transition choreography remains open.

### Case Studies Tab

The carousel uses a vertical perspective-fold transition. Each item presents an image, followed by the case-study title and quiet metadata tags. Color and visual emphasis should come primarily from the image rather than the card background or tags.

Cards moving into the upper position fold around their bottom edge; cards moving into the lower position fold around their top edge. Adjacent cards retain most of their size and remain visible so the movement feels like placing a card into a stack. A card leaving either adjacent position holds its current pose and fades out without further movement. Incoming cards unfold from the same edge, and looping repositions recycled cards without sending them through the center.

See [Vertical Carousel Scroll Animation](../../engineering/vertical-carousel-scroll-animation.md) for the implemented interaction choreography, timing, and interruption behavior.

### Case-Study Presentation Animation

Opening a case study is one coordinated transition with three visual states:

1. **Home:** Kurt's introduction and tabs occupy the left pane, and the Case Studies carousel is the dominant right pane.
2. **Opening:** The selected card remains visible as a spatial anchor while the carousel pane shifts right and shrinks. At the same time, the content pane expands and the landing introduction and tabs begin to leave.
3. **Reading:** The case-study content replaces the landing introduction and tabs in the expanded left pane. The carousel remains visible in the smaller right pane throughout the reading experience, with the selected card active.

The opening transition should be orchestrated as follows:

- Keep the landing introduction and the incoming case-study content mounted in the same left-pane region during the transition. They should overlap temporarily rather than swap through an abrupt unmount.
- Start the carousel movement, carousel scaling, content-pane expansion, and landing-content exit together. These changes should share a consistent duration and easing so the two panes feel like one layout transformation.
- Fade and translate the landing introduction and tabs slightly left as they exit.
- Begin revealing the case-study content shortly after the pane movement starts. Use opacity, a small horizontal translation, and a clip reveal so the reading experience appears to emerge into the space created by the moving carousel.
- Treat the case study as one continuous reading experience rather than a separate introduction followed by a different layout state. Long-form images and other content should render in normal document flow.
- Settle with the content pane occupying roughly 65–70% of the viewport and the carousel occupying roughly 30–35%. These proportions can be tuned, but the case-study content must be the primary focus.
- Keep the carousel visible in this secondary right-pane position for the entire case study. It should not collapse into a rail or disappear as the visitor scrolls.
- Fade each card's title and tags before the shrinking pane can make them reflow. Keep the card's positioning frame stable while that metadata collapses so the stack does not shift vertically, tighten the distance between adjacent cards for the image-only reading state, and reveal the title over the image on hover or keyboard focus; keep tags exclusive to the landing state.
- When returning to all work, reverse the sequence: remove the case-study content, expand the carousel, and restore the landing introduction and tabs with Case Studies active while preserving the previously selected card.

As an initial timing target, the full opening transition should take approximately 700–900ms. The case-study content can begin entering around 100–200ms after the pane movement starts. Exact values should be tuned visually while preserving this order and overlap.

For reduced motion, skip the spatial movement and stagger. Use a short crossfade or an immediate state change while preserving the same content and routing behavior. Route-transition focus transfer is deferred, and the mobile pane-height transition still needs reduced-motion handling.

Selecting a case-study card should navigate to that case study's canonical URL. The client-side route change triggers the opening transition, and navigation back to Home reverses it. Moving directly from one case study to another should keep the reading layout in place while the left-pane content and active carousel card change.

The current persistent carousel reads the route-selected index only when it first mounts. Synchronizing it with later case-study-to-case-study route changes, including browser history navigation, remains to be implemented.

Browser Back and Forward navigation should produce the same transition associated with their source and destination. A direct visit, refresh, or other initial load of a case-study URL should render the settled reading layout without replaying the entrance animation.

This direction is desktop-first. An initial stacked mobile layout is implemented, with provisional Home and reading-state pane heights. Its final proportions, choreography, and reduced-motion behavior remain open.

## Selected Case Studies

- [Halving first-page load latency](../case-studies/checkout-performance.md)
- [Resolving 150+ feature flags in under 200ms](../case-studies/feature-flag-system.md)
- [Standardizing interaction telemetry at scale](../case-studies/interaction-telemetry-sdk.md)
- [Building an embedded platform for BNPL products](../case-studies/bnpl-embedded-platform.md)
- [Building a developer toolbar for 200+ engineers](../case-studies/developer-toolbar.md)

The presentation order and prominence of each case study remain open.

## Open Questions

- What should the introduction emphasize most?
- How should the introduction and three tab controls be composed within the left pane?
- How much information should each case-study entry show?
- Should tab selection be reflected in the URL and browser history?
- What transition should connect the three right-pane modes?
- How should the tabbed layout adapt on mobile?

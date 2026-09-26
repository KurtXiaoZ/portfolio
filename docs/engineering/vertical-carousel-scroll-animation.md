# Vertical Carousel Scroll Animation

## Purpose

The vertical carousel presents one active case study between folded cards above and below it. Its movement should feel like cards being placed into a vertical stack: a card unfolds from an adjacent position into the center while the current card folds toward the opposite position.

This document describes the scrolling choreography implemented by `ImageVerticalCarousel`. The landing-page product document remains the source for the intended experience; this document records the interaction rules, animation states, timings, and interruption behavior that produce it.

This choreography covers movement between cards within the carousel. The route-level transition that resizes the carousel pane while navigating between the landing page and case-study routes is documented separately in [Case-Study Route Transition](case-study-route-transition.md).

## Spatial Model

The carousel has one scroll position, `progress`. Integer values sit on a case study. Values in between are a fold partway from one case study to the next. Every card reads its pose from its circular offset to that position, so the whole stack moves together.

| Offset      | Position          | Transform                                                                                | Opacity             |
| ----------- | ----------------- | ---------------------------------------------------------------------------------------- | ------------------- |
| `0`         | Active card       | `y: 0`, `rotateX: 0deg`, scale `1`                                                       | `1`                 |
| `-1`        | Upper card        | `y: -428px` (`-260px` compact), `rotateX: 78deg` (`65deg` compact), landing scale `0.74` | `1` (`0.7` compact) |
| `1`         | Lower card        | `y: 448px` (`260px` compact), `rotateX: -78deg` (`-65deg` compact), landing scale `0.74` | `1` (`0.7` compact) |
| beyond `±1` | Leaving the stack | Continues outward from the adjacent pose and fades across `0.4` of a card                | falls to `0`        |

Offset, travel, rotation, scale, cover, and slab all come from that distance. A card at offset `0.5` is halfway through the fold. A card past `±1` keeps moving out while it fades, which leaves room for the next card to enter the slot. With six items, the wrap lands outside the visible range, so a recycled card never crosses the center.

On the landing page, each card is centered and folded within a fixed `488px`-wide, `421px`-high frame. Its image is `342px` tall with `16px` corners, followed by plain title text and slash-separated metadata. Only the card nearest the center shows its title and tags; the others collapse their metadata while retaining the stable frame.

Adjacent landing cards do not show their covers. They scale to `0.74` so the folded pose reads as farther away, and the image area becomes a neutral slab: `#f8f8f8` in light mode and `#1c1d1a` in dark mode. A linear mask fades that slab toward its outer edge, and stacked blurs (`10px`, `24px`, `42px`) get stronger toward the same edge — the top of the upper card and the bottom of the lower card. Cover and slab follow the fold: the image holds through the first `12%` of the travel, then fades out by the time the card reaches the adjacent slot. A card moving into the center fades its image in the same way, in either direction. Compact reading-state cards keep their covers, stay at scale `1`, and use `0.7` opacity in the adjacent slots.

Compact mode collapses metadata for every card and changes the frame to `min(320px, 78%)`, preserving the landing frame's `445:384` aspect ratio. The image preserves its `445:312` aspect ratio, so the card fits the narrower reading pane without clipping or distorting. Animated covers use their static thumbnail in compact mode. The compact card column is centered in the space left of the pagination controls. For the upper card, the hinge origin remains aligned with the bottom of the proportionally sized image. The lower card continues to hinge from the top edge.

The upper card hinges around its bottom edge. The lower card hinges around its top edge. This makes the edge nearest the active card act as the physical connection between positions. On the landing page, scale and `rotateX` share that edge, and the landing perspective is `620px`, so the far edge swings through a deeper arc. Translation parks the hinge and, past the adjacent slot, carries the card outward. The hinge origin follows the side the card is on, because a flat card looks the same at any origin. Compact mode keeps perspective at `1100px`. The rotating card hides its back face.

The card closest to the center has the highest stacking level. Each step farther from the center lowers the stacking level.

## Transition Choreography

Slow and fast scrolling are the same motion at different speeds, because both move `progress`.

Compact mode eases a one-card change over `720ms` with `[0.2, 0.78, 0.2, 1]`. A one-card landing change lasts `640ms` and uses `[0.86, 0, 0.38, 1.62]`: it holds near the start, accelerates, then overshoots past the resting card before settling. The cover is tied to travel rather than a separate clock, so the ease-in makes the image fade in the later part of that `640ms`. A shorter remainder, such as the end of a flick, uses the same curve and scales the duration down to the distance, with a floor of `220ms`.

For a one-card move from a settled position:

1. The lower or upper card translates to the center, unfolds to `0deg` around its near edge, and returns to scale `1`. On the landing page that motion holds, then accelerates over `640ms` and overshoots before settling. The image fades in as the card approaches the center.
2. The previously active card translates to the opposite adjacent position and folds to `78deg` or `-78deg` around the edge nearest the center (`65deg` in the compact reading state). On the landing page it scales to `0.74` toward that same edge, and its image fades out.
3. The card that had been sitting in the slot being vacated continues outward and fades across `0.4` of a card. The next card fades in from that side as it approaches the adjacent slot.

Position, scale, rotation, hinge origin, card opacity, cover opacity, and the two slab opacities are Motion values written from `progress` on each change. They are not separate tweens, so a card cannot lag behind in a slot another card is entering.

## Direction by Input

Directions below describe the cards' movement on screen. Positive `progress` moves the stack upward: the lower card comes into the center.

| Input                              | Index change                                     | Visual direction            |
| ---------------------------------- | ------------------------------------------------ | --------------------------- |
| Wheel with positive vertical delta | Toward the next item                             | Bottom to top               |
| Wheel with negative vertical delta | Toward the previous item                         | Top to bottom               |
| Swipe up                           | `+1`                                             | Bottom to top               |
| Swipe down                         | `-1`                                             | Top to bottom               |
| `ArrowDown`                        | `+1`                                             | Bottom to top               |
| `ArrowUp`                          | `-1`                                             | Top to bottom               |
| Pagination dot                     | Shortest circular distance to that index         | Determined by that distance |
| `Home` or `End`                    | Shortest circular distance to the boundary index | Determined by that distance |

Dot navigation and `Home` / `End` animate `progress` along the shortest path with the one-card curve. The centered card updates as `progress` passes each halfway point.

`ArrowUp` and `ArrowDown` navigate while the pointer is over the cards column, even when focus is elsewhere on the page. The surrounding horizontal space, pagination dots, and the space reserved for them do not activate this behavior. The same keys continue to work when focus is within the carousel so keyboard-only visitors do not need to hover it.

## Wheel and Pointer Gestures

Horizontal-dominant wheel events are ignored. A vertical wheel gesture behaves as follows:

- Small wheel ticks add up. Once they pass `24px`, the carousel moves one card.
- The first card of a gesture locks the wheel for `520ms`, so a longer single scroll still counts as one card. If the wheel is still moving after that, each next card locks for `120ms`.
- Events during a lock are discarded. When the scroll stops, only the card already in motion finishes.

A pointer swipe must travel more than `35px` vertically and moves one card. Presses originating on links or buttons are excluded from pointer capture so their native click events reach those controls.

## Looping

Indices wrap in both directions. A card's offset is the shortest circular distance to `progress`. When an even number of items produces an exact tie, the positive offset is retained. That tie sits outside the visible range.

## Interrupted Input

New input retargets the same `progress` value. A second one-card step eases from the current position toward the new card. A wheel event accepted during a fold steps one card further and continues with a short ease-out, so the one-card ease-in does not restart. Because every card is posed from one number, folded slabs cannot collect in the lower slot.

## Accessibility

Only the card nearest the center is interactive and exposed to assistive technology. Other cards are `inert`, have pointer events disabled, and use `aria-hidden`. The carousel is a focusable region with keyboard navigation, and each pagination dot exposes its target label and selected state. The selected dot follows the card nearest the center, including while a flick is moving.

The fold choreography currently runs with the same timing regardless of the visitor's reduced-motion preference. Adding a non-spatial alternative remains an accessibility gap.

## Implementation

The choreography is implemented in [`components/image-vertical-carousel/image-vertical-carousel.tsx`](../../components/image-vertical-carousel/image-vertical-carousel.tsx). Compact reading-state motion stays on its own constants. When changing animation constants or input behavior, update this document and the landing-page intent if the user experience changes.

# Vertical Carousel Scroll Animation

## Purpose

The vertical carousel presents one active case study between folded cards above and below it. Its movement should feel like cards being placed into a vertical stack: a card unfolds from an adjacent position into the center while the current card folds toward the opposite position.

This document describes the scrolling choreography implemented by `VerticalCarousel`. The landing-page product document remains the source for the intended experience; this document records the interaction rules, animation states, timings, and interruption behavior that produce it.

## Spatial Model

Each card receives a circular delta relative to the active index:

| Delta  | Position               | Transform                                     | Opacity |
| ------ | ---------------------- | --------------------------------------------- | ------- |
| `≤ -2` | Hidden above the stack | Holds or resets near the upper folded pose    | `0`     |
| `-1`   | Upper card             | `y: -380px`, `rotateX: 58deg`, scale `1.1656` | `0.7`   |
| `0`    | Active card            | `y: 0`, `rotateX: 0deg`, scale `1.24`         | `1`     |
| `1`    | Lower card             | `y: 380px`, `rotateX: -58deg`, scale `1.1656` | `0.7`   |
| `≥ 2`  | Hidden below the stack | Holds or resets near the lower folded pose    | `0`     |

Distant cards do not accumulate another `380px` of translation for every delta. For example, a card at `-2` is not placed at `y: -760px`, and a card at `2` is not placed at `y: 760px`. Cards beyond the adjacent positions are invisible. Under normal, uninterrupted movement they remain at or reset to the corresponding `-380px` or `380px` folded pose. If a card leaves the visible stack during an interrupted fold, it freezes at its current rendered transform instead.

The upper card hinges around its bottom edge. The lower card hinges around its top edge. This makes the edge nearest the active card act as the physical connection between positions. The rotating card uses a perspective of `1100px` and hides its back face.

The active card has the highest stacking level. Each additional step from the active card lowers the stacking level by one.

## Transition Choreography

The standard fold transition lasts `720ms` and uses the easing curve `[0.2, 0.78, 0.2, 1]`.

For a one-item move:

1. The selected adjacent card translates to the center, returns to the active scale, and unfolds to `0deg`.
2. The previously active card translates to the opposite adjacent position, adopts the adjacent scale, and folds to `58deg` or `-58deg` around the edge nearest the center.
3. A card entering a newly exposed adjacent position is placed there while invisible. Its reveal waits `320ms`, then fades to `0.7` opacity over `400ms` with `easeInOut` easing. The delay prevents its text from overlapping the card moving into the center.
4. A card leaving an adjacent position stops at its current rendered pose and fades out over `240ms`. It does not flatten, move farther away, or change scale during the exit.

Position, scale, rotation, hinge origin, and opacity are each bound to a Motion value and animated through the component-scoped `useAnimate` function. Keeping the properties independent allows a departing card to freeze its spatial pose while its opacity continues changing. The scoped animation function also stops outstanding animations when a card unmounts.

## Direction by Input

Directions below describe the cards' movement on screen.

| Input                              | Index change                        | Visual direction                         |
| ---------------------------------- | ----------------------------------- | ---------------------------------------- |
| Wheel with positive vertical delta | `+1`                                | Bottom to top                            |
| Wheel with negative vertical delta | `-1`                                | Top to bottom                            |
| Swipe up                           | `+1`                                | Bottom to top                            |
| Swipe down                         | `-1`                                | Top to bottom                            |
| `ArrowDown`                        | `+1`                                | Bottom to top                            |
| `ArrowUp`                          | `-1`                                | Top to bottom                            |
| Pagination dot                     | Directly selects the target index   | Determined by the cards' circular deltas |
| `Home` or `End`                    | Directly selects the boundary index | Determined by the cards' circular deltas |

Dot navigation selects its target immediately, without making intermediate cards active. The cards animate directly to their new states with the standard `720ms` fold easing and use the shortest circular path.

## Wheel and Pointer Gestures

Horizontal-dominant wheel events are ignored. A vertical wheel gesture behaves as follows:

- The first event moves the carousel by one item immediately.
- A direction change or a gap longer than `200ms` starts a new gesture.
- A gesture is considered fast at `1px/ms` or faster. During a fast gesture, every twelve subsequent wheel events can advance another item.
- A slower continuous gesture does not advance beyond its initial item until a new gesture begins.

A pointer swipe must travel more than `35px` vertically. Presses originating on pagination buttons are excluded from pointer capture so their native click events reach the buttons.

## Looping and Recycling

Indices wrap in both directions. Navigation uses the shortest circular delta to place cards around the active item; when an even number of items produces an exact tie, the positive delta is retained.

A hidden card may need to move from one side of the circular stack to the other. The carousel stops that card's current animations, keeps it invisible, resets its position and hinge to the new edge, and then reveals it only when it enters an adjacent slot. It must never animate through the center behind the active card.

All transform and opacity values are bound as Motion values when a card mounts, including cards that initially render outside the visible stack. This ensures a recycling reset schedules a rendered update before the card becomes visible.

## Interrupted Animations

New input can arrive before a `720ms` fold completes. Motion continues the next active or adjacent transition from the card's current rendered pose. When an interrupted card leaves the visible stack, its position, scale, rotation, and hinge freeze at that pose while it fades out.

This rule prevents the most common interruption artifacts:

- a departing card becoming flat before disappearing
- a recycled card crossing behind the active card
- an initially hidden card appearing on the wrong side of the carousel
- adjacent card text appearing underneath a card that has not cleared the center

## Reduced Motion

When the visitor prefers reduced motion, spatial transitions, folds, and fades complete immediately, and delayed adjacent-card reveals are disabled. Content, focus behavior, index changes, and looping remain available.

## Accessibility

Only the active card is interactive and exposed to assistive technology. Other cards are `inert`, have pointer events disabled, and use `aria-hidden`. The carousel is a focusable region with keyboard navigation, and each pagination dot exposes its target label and selected state.

## Implementation

The choreography is implemented in [`components/vertical-carousel/vertical-carousel.tsx`](../../components/vertical-carousel/vertical-carousel.tsx). When changing animation constants or input behavior, update this document and the landing-page intent if the user experience changes.

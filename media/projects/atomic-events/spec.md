# Interaction Telemetry Media

Route: `/work/atomic-events`  
Narrative: [Interaction telemetry SDK](../../../docs/product/case-studies/interaction-telemetry-sdk.md)  
Current page: [Case-study component](../../../components/case-study/atomic-events-case-study.tsx)

## Thumbnail

Status: accepted for now and integrated into the portfolio on November 13, 2026.

Show the actual PayPal Branded Checkout UX on the left and an abstract circular
state machine on the right. Connect customer actions to the ready/waiting cycle
through synchronized motion.

- Use fixed green and yellow dots for Ready and Waiting, joined by thin circular
  arrows with short arrowheads. Smoothly ease dot size and opacity; animate the
  arrows with a soft gray-to-black gradient.
- Keep a flat light background, generous spacing, near-black type, and minimal
  decoration, following the Robinhood-inspired direction explored in the demos.
- Show descriptive interaction names: “View rewards”, “Apply rewards”, and
  “Pay with PayPal”. Display “Ok” and the source latency when each completes.
- Omit explicit state labels, redundant headings, and a traveling dot between
  checkout and the state machine.
- Keep each Waiting phase approximately 1.3 seconds. The silent loop lasts
  12.76 seconds, exported as H.264 MP4 at 50 fps and 1780 × 1248 px (445:312).
- Play the video on the active landing card. Use the matching poster for compact
  cards, reduced-motion views, and the video loading fallback.

### Selected Assets

- [Website video](../../../public/videos/case-studies/atomic-events-circular-orbit-thumbnail.mp4)
- [Website poster](../../../public/images/case-studies/atomic-events-circular-orbit-thumbnail.jpg)
- [Source checkout recording](../../../public/videos/case-studies/atomic-events-apply-rewards-thumbnail.mp4)
- [Source poster PNG](demos/atomic-events-circular-orbit-poster.png)
- [Rendering details and earlier explorations](demos/README.md)
- [Carousel integration](../../../components/portfolio-carousel/carousel-items.tsx)

The checkout footage is retimed for presentation. The diagram is illustrative;
displayed latencies (16 ms, 1 ms, and 3,641 ms) come from the source recording's
callouts and do not represent the edited waiting durations.

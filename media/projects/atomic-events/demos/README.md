# Atomic Events Thumbnail Demos

## Current: Actual Checkout and Abstract State Machine

Accepted for the current portfolio thumbnail on November 13, 2026. The
[project spec](../spec.md) records the selected design and website assets; this
document preserves rendering details and earlier explorations.

[Play the circular-orbit demo](atomic-events-circular-orbit.mp4) ·
[Poster](atomic-events-circular-orbit-poster.png)

The actual Branded Checkout recording appears on the left. On the right, a green
dot represents Ready and a yellow dot represents Waiting. Both dots stay fixed;
their size and opacity change smoothly in sync with the customer action. Curved
arrows form a compact circular orbit around a shared center, with shorter
arrowheads and balanced gaps at the dots. A soft gradient flows
along each curve instead of abruptly switching its color and thickness. The diagram contains no
state or transition text, no traveling dot, and no line to checkout.

Use a flat light background, generous spacing, thin arrows, near-black type,
and a bright green accent. Telemetry sits directly on the background, with a
large latency value and a plain “Ok” outcome rather than a boxed card or pill.
The requested direction takes cues from Robinhood's mobile app; it does not add
Robinhood branding to the checkout footage.

The intention name appears below the machine when an interaction starts. Its
“Ok” outcome and latency appear when the UI is ready. Use the descriptive names
“View rewards”, “Apply rewards”, and “Pay with PayPal” in simple sans-serif type.

Export: silent H.264 MP4, 50 fps, 1780 × 1248 px, 12.76 seconds. The
aspect ratio matches the carousel's 445:312 viewport. The final checkout view
crossfades back to the opening state for looping while the machine stays Ready.

### Source and Timing

Checkout frames are cropped from the
[existing thumbnail recording](../../../../public/videos/case-studies/atomic-events-apply-rewards-thumbnail.mp4).
Clean bezel pixels from the same recording cover remnants of the original
baked-in callout connectors at the crop edges. The UI itself is recorded footage.

Each Waiting phase lasts approximately 1.3 seconds, with 300 ms of smooth
easing at each end and a steady yellow-dot hold between them. Checkout footage
is retimed over the same interval so the UI and diagram remain synchronized. Sections
between interactions play at normal speed.

Dot size and opacity use smootherstep easing. Arrow transitions use a soft
gray-to-black gradient on both the outgoing and returning curves,
each lasting 560 ms with gradual fades at both ends. The neutral arrow underneath
keeps a constant width. Rendering at 50 fps smooths the diagram animation; the
actual checkout footage retains its original recorded frames.

The earlier descriptive-name version had Waiting phases of approximately 0.93
seconds for View rewards, 0.98 seconds for Apply rewards, and 1.96 seconds for Pay
with PayPal, within a 13.04-second loop.

The diagram and telemetry panel are presentation graphics, approximately
synchronized with the recording. Latency values come from the source callouts,
not from the duration of this edited video or newly captured SDK events.

The [native renderer](render-state-machine.m) is preserved alongside the demo.
Compile it with an SDK compatible with the local macOS toolchain, linking
Foundation, AVFoundation, AppKit, CoreMedia, CoreVideo, and CoreGraphics; then run
it with the repository root as its first argument. It reads the existing recording
and writes this demo and poster. The current local toolchain works with the
MacOSX15.4 SDK.

This version is used for the Atomic Events carousel thumbnail. The published
[video](../../../../public/videos/case-studies/atomic-events-circular-orbit-thumbnail.mp4)
is an exact copy of this export; the published
[poster](../../../../public/images/case-studies/atomic-events-circular-orbit-thumbnail.jpg)
is a compressed JPEG of the source PNG. The landing card plays the video, while
compact cards and reduced-motion views show the poster.

### Visual References

- [Robinhood's design approach](https://robinhood.com/newsroom/the-top-secret-robinhood-design-story/):
  simplicity and content-focused presentation.
- [November 2026 investor presentation](https://investors.robinhood.com/static-files/72febcf6-0d7c-4a95-9c94-bc98c42b8284):
  current product and mobile-app references.

## Earlier Directions

- [Wider neutral-arrow loop](atomic-events-neutral-arrows.mp4) ·
  [Poster](atomic-events-neutral-arrows-poster.png): the wider oval before choosing
  the Circular orbit geometry.
- [Colored arrow gradients](atomic-events-smooth-transitions.mp4) ·
  [Poster](atomic-events-smooth-transitions-poster.png): the earlier smooth version
  with green/yellow gradients on the arrows. The current version reserves those
  colors for the state dots.
- [Earlier 1.3-second timing](atomic-events-wait-1p3s.mp4) ·
  [Poster](atomic-events-wait-1p3s-poster.png): the 25 fps version before smoothing
  the arrows and dot transitions.
- [Longer waiting phases](atomic-events-extended-wait.mp4) ·
  [Poster](atomic-events-extended-wait-poster.png): the 16.36-second loop with
  2.5-second Waiting phases.
- [Shorter descriptive-name loop](atomic-events-abstract-descriptive.mp4) ·
  [Poster](atomic-events-abstract-descriptive-poster.png): the 13.04-second version
  before extending each Waiting phase to 2.5 seconds.
- [Abstract loop with telemetry names](atomic-events-abstract.mp4) ·
  [Poster](atomic-events-abstract-poster.png): the same dot-and-arrow composition
  with technical intention names.
- [Labeled state machine](atomic-events-state-machine-hifi.mp4) ·
  [Poster](atomic-events-state-machine-hifi-poster.png): the earlier high-fidelity
  version with explicit Ready, Waiting, intent, and UI-ready text.
- [Telemetry result cards](atomic-events-telemetry-names.mp4) ·
  [Poster](atomic-events-telemetry-names-poster.png): intention name, “Ok”, and
  latency without a state machine.
- [Friendly-label result cards](atomic-events-results-only.mp4) ·
  [Poster](atomic-events-results-only-poster.png): the earlier version with
  descriptive labels instead of telemetry names.

# Portfolio Media Workspace

Plan, collect, and prepare images and recordings for the case studies and
gallery here. Project folders use the website's case-study route slugs so media
can be matched to its destination without relying on display titles.

Agents creating or editing media should follow the
[media generation guidelines](AGENTS.md).

## Structure

```text
media/
├── AGENTS.md
├── README.md
├── gallery.md
└── projects/
    └── <case-study-slug>/
        ├── spec.md
        └── originals/
```

- `spec.md` records what to capture, why it matters, and where it will appear.
- `originals/` holds selected source screenshots and recordings before cropping,
  compression, or annotation. Preserve source resolution and recording timing.
- Finished website assets stay in `public/images/case-studies/` and
  `public/videos/case-studies/`. Link to them from the project spec rather than
  keeping duplicate exports here.
- [Gallery planning](gallery.md) selects and sequences media across projects.

Use descriptive, lowercase, hyphenated filenames. Add a variant suffix only
when comparing meaningful alternatives, such as `toolbar-flags-open.png` and
`toolbar-scenarios-open.png`. Commit selected source assets with their specs;
decide how to store large raw recording takes before adding them to Git.
Nothing under `media/` is intended to be served by the website.

## Thumbnail Plan

Atomic Events has an accepted thumbnail integrated into the portfolio. The other
four rows remain initial directions to discuss, not approved captures or final
artwork. An existing file does not imply that it has been reviewed for publication.

| Case study             | Proposed focal point                                  | Initial format                      | Spec                                                            |
| ---------------------- | ----------------------------------------------------- | ----------------------------------- | --------------------------------------------------------------- |
| Checkout performance   | Checkout becoming usable as content loads             | Short clip + poster                 | [Checkout latency](projects/checkout-latency-reduction/spec.md) |
| Feature Flag Platform  | Typed flag definition and consumer call               | Still image                         | [Feature flags](projects/feature-flag-system/spec.md)           |
| Developer toolbar      | A real toolbar panel beside checkout                  | Still first; optional clip          | [Developer toolbar](projects/developer-toolbar/spec.md)         |
| Interaction telemetry  | Checkout alongside an abstract circular state machine | Accepted video + poster; integrated | [Atomic Events](projects/atomic-events/spec.md)                 |
| Embedded BNPL platform | Checkout launching an embedded application            | Short clip + poster                 | [BNPL platform](projects/bnpl-platform/spec.md)                 |

### Shared thumbnail direction

- Show a recognizable piece of the work with one clear focal point. Prefer
  actual product or tooling captures using suitable demo data. Label recreated
  examples and diagrams as illustrative in the relevant spec and presentation.
- Give the five covers distinct subjects while keeping framing, background
  treatment, and visual density consistent. Avoid five nearly identical
  checkout screenshots.
- The current cover viewport is **445:312**, approximately **1.43:1**, with
  `object-cover` cropping and rounded corners. A useful proposed still export
  is **1335 × 936 px**; retain higher-resolution originals when available.
- Check the crop at 445 px wide and around 320 px wide in the compact carousel.
  Keep essential content away from edges and corners. Titles and tags already
  sit below the full card; avoid repeating them inside the artwork.
- Every cover needs a strong still. A clip should communicate without sound,
  hold on a readable result, and loop without a distracting reset. Start by
  trying 4–8 seconds; shorten or extend only if the action needs it.
- Capture a separate clean poster when a frame extracted from the video is
  blurry or visually incomplete. Use the same framing for the clip and poster.
- Motion is optional. The current Atomic Events cover uses a still in compact
  mode and when reduced motion is requested; use that as the proposed pattern
  when other motion covers are implemented.
- Use public-safe content, remove personal and internal identifiers, and avoid
  adding unverified timings or metrics. Cropping, trimming, and annotations
  should preserve what actually happened.

### Tracking each deliverable

Use **planned → captured → edited → ready → published**. `Ready` means the
chosen export, crop, alt text, and publication suitability have been checked;
`published` means the website actually uses it. Each spec should link the
selected original, finished image, optional clip, and poster as they become
available. Broader case-study visuals can be added to the same spec later.

## Documentation Gaps

The checkout-performance and interaction-telemetry product briefs still describe
narrative development as pending, although both case-study routes are
implemented. The thumbnail briefs link both the narrative documents and current
components so this discrepancy remains visible; they do not resolve the broader
publication status.

The gallery product brief currently describes images. Whether to include
recordings there remains an open decision in [gallery planning](gallery.md).

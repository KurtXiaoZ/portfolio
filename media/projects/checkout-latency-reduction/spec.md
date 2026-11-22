# Checkout Performance Media

Route: `/work/checkout-latency-reduction`  
Narrative: [Reducing checkout latency](../../../docs/product/case-studies/checkout-performance.md)  
Current page: [Case-study component](../../../components/case-study/checkout-latency-reduction-case-study.tsx)

## Homepage Carousel Thumbnail

Status: integrated into the homepage carousel on November 22, 2026.

Show checkout progressively loading payment options and customer details.
The supplied 4.20-second MP4 is 1710 × 1626 px and is preserved without
re-encoding. Contain the full frame within the 445:312 card so the full checkout
remains visible. Play silently on a loop only on the active homepage card.
Use a matching still for inactive cards, the compact reading layout, and
reduced-motion views.

- [Website video](../../../public/videos/case-studies/checkout-latency-ryp-streaming.mp4)
- [Website poster](../../../public/images/case-studies/checkout-latency-ryp-streaming.jpg), extracted at 3.8 seconds to show loaded content.

## Case-Study Media

Status: integrated into the case-study page on November 22, 2026.

Source: [Checkout Latency Reduction section in Figma](https://www.figma.com/design/QwHCDDOuBUWnHbsN3GDyeI/Untitled?node-id=9-10).
The supplied checkout screens and diagrams are illustrative examples; playback
timing is not a performance benchmark.

| Placement                               | Selected original                                          | Website asset                                                                                                                                                                                                                                                              |
| --------------------------------------- | ---------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Render the personalized checkout        | [PNG](originals/checkout-latency-ryp-loading-carousel.png) | [WebP](../../../public/images/case-studies/checkout-latency-ryp-loading-carousel.webp)                                                                                                                                                                                     |
| Stream ready sections first             | Existing supplied MP4, linked above                        | [Looping GIF](../../../public/images/case-studies/checkout-latency-ryp-streaming.gif) and [reduced-motion still](../../../public/images/case-studies/checkout-latency-ryp-streaming-poster.webp) from the [Figma PNG](originals/checkout-latency-ryp-streaming-poster.png) |
| Deduplicate queries within each request | Figma SVG export                                           | [SVG](../../../public/images/case-studies/checkout-latency-query-deduplication.svg)                                                                                                                                                                                        |
| Parallelize and aggregate data fetching | Figma SVG export                                           | [SVG](../../../public/images/case-studies/checkout-latency-parallel-aggregate.svg)                                                                                                                                                                                         |

Full-resolution PNG originals are preserved. Website WebP files use lossless
compression, and SVG exports are served directly. Each section uses one media
element, with original proportions and no cropping or colored letterboxing.
The article uses an automatically looping GIF without video controls, converted
from the complete 4.2-second clip at 15 fps and 1026 × 976 px. The GIF repeats
indefinitely and uses a shared 256-color palette. Reduced-motion visitors receive
the matching still through the same image element.
The homepage carousel continues using its existing video and poster.

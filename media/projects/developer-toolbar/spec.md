# Developer Toolbar Media

Route: `/work/developer-toolbar`  
Narrative: [Developer toolbar](../../../docs/product/case-studies/developer-toolbar.md)

Source: [Dev Toolbar section in Figma](https://www.figma.com/design/QwHCDDOuBUWnHbsN3GDyeI/Untitled?node-id=33-2).

| Placement                | Desktop asset                                                                                          | Mobile asset                                                                                                  |
| ------------------------ | ------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------- |
| Solution overview        | [Overview GIF](../../../public/images/case-studies/developer-toolbar/overview.gif)                     | [Overview GIF](../../../public/images/case-studies/developer-toolbar/overview-mobile.gif)                     |
| Feature flags            | [Feature flags GIF](../../../public/images/case-studies/developer-toolbar/feature-flags.gif)           | [Feature flags GIF](../../../public/images/case-studies/developer-toolbar/feature-flags-mobile.gif)           |
| Feature flag persistence | [Persistence SVG](../../../public/images/case-studies/developer-toolbar/flag-persistence.svg)          | [Persistence SVG](../../../public/images/case-studies/developer-toolbar/flag-persistence-mobile.svg)          |
| Mock scenarios           | [Mock scenarios GIF](../../../public/images/case-studies/developer-toolbar/mock-scenarios.gif)         | [Mock scenarios GIF](../../../public/images/case-studies/developer-toolbar/mock-scenarios-mobile.gif)         |
| Server-side mocking      | [Server mocking SVG](../../../public/images/case-studies/developer-toolbar/server-mocking.svg)         | [Server mocking SVG](../../../public/images/case-studies/developer-toolbar/server-mocking-mobile.svg)         |
| Accessibility checks     | [Accessibility GIF](../../../public/images/case-studies/developer-toolbar/accessibility.gif)           | [Accessibility GIF](../../../public/images/case-studies/developer-toolbar/accessibility-mobile.gif)           |
| React render diagnostics | [Render diagnostics GIF](../../../public/images/case-studies/developer-toolbar/render-diagnostics.gif) | [Render diagnostics GIF](../../../public/images/case-studies/developer-toolbar/render-diagnostics-mobile.gif) |

The case-study article uses the original GIFs and full diagram exports from Figma. Each demo
has a lossless WebP frame for reduced motion. The homepage carousel plays the
[thumbnail MP4](../../../public/videos/case-studies/developer-toolbar-thumbnail.mp4)
on Home and uses its
[still frame](../../../public/images/case-studies/developer-toolbar/thumbnail-poster.webp)
in the compact layout and for reduced motion. The original 1335 × 936 GIF from
Figma has 245 frames over 9 seconds. It matches the card's aspect ratio, so the
carousel displays the full frame. The original
[thumbnail GIF](../../../public/images/case-studies/developer-toolbar/thumbnail.gif)
remains as a source asset. The MP4 adds one white pixel at the right edge for
H.264's even-width requirement, without cropping the composition. The cover
pauses on its current frame when it leaves the center and resumes when centered
again. The article's original GIF demos remain unchanged.

To regenerate the carousel video:

```sh
ffmpeg -i public/images/case-studies/developer-toolbar/thumbnail.gif -vf 'pad=ceil(iw/2)*2:ceil(ih/2)*2:0:0:color=white' -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -fps_mode vfr -movflags +faststart -an public/videos/case-studies/developer-toolbar-thumbnail.mp4
```

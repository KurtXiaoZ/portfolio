# Feature Flag Platform Media

Route: `/work/feature-flag-system`  
Narrative: [Feature Flag Platform](../../../docs/product/case-studies/feature-flag-system.md)

## Thumbnail

Status: integrated into the portfolio carousel.

Source: [Feature Flag Platform section in Figma](https://www.figma.com/design/QwHCDDOuBUWnHbsN3GDyeI/Untitled?node-id=81-122).
The light and dark thumbnail frames are `81:127` and `81:130`.

The illustration cycles through checkout payment-button color treatments, with
a small treatment caption and progress indicator beneath checkout. It is an
illustrative experiment, not a recording of a production experiment.

| Appearance | Animated thumbnail                                                                | Still fallback                                                                           |
| ---------- | --------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Light      | [MP4](../../../public/videos/case-studies/feature-flag-system-thumbnail.mp4)      | [PNG](../../../public/images/case-studies/feature-flag-system/thumbnail-poster.png)      |
| Dark       | [MP4](../../../public/videos/case-studies/feature-flag-system-thumbnail-dark.mp4) | [PNG](../../../public/images/case-studies/feature-flag-system/thumbnail-dark-poster.png) |

The original Figma GIF exports are preserved as source assets at
`public/images/case-studies/feature-flag-system/thumbnail.gif` and
`thumbnail-dark.gif`. Both GIFs
contain 216 frames over 7.2 seconds and loop continuously at 890 × 624 px,
matching the carousel's 445:312 aspect ratio. The full composition is contained
without cropping. The cover follows the system color scheme and uses the
matching still for reduced motion and compact case-study navigation. The
carousel uses H.264 MP4 derivatives so inactive cards freeze on their current
frame and resume when centered. Only the active color-scheme variant plays.

To regenerate either MP4 from its corresponding source GIF:

```sh
ffmpeg -i SOURCE.gif -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p -fps_mode vfr -movflags +faststart -an DESTINATION.mp4
```

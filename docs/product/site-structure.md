# Site Structure

## Purpose

The portfolio introduces Kurt Xiao, demonstrates his work through case studies and a visual gallery, and provides additional personal and professional context.

## Page Types

### Landing Page

The primary entry point to the portfolio. It should:

- introduce Kurt and establish his professional identity
- communicate his strengths and the kind of engineer he is
- provide three primary tabs: Case Studies, Gallery, and About
- use the selected tab to determine the content shown in the right pane
- provide clear entry points to individual case studies from the Case Studies tab
- provide a visual survey of Kurt's work from the Gallery tab
- provide additional personal and professional context from the About tab

### Case-Study Pages

Each case study should have its own page and canonical route at `/work/[slug]`. These pages should explain the work in enough depth to demonstrate Kurt's contribution, decision-making, execution, and impact.

### Gallery Content

The Gallery tab should provide a visually engaging collection of work images in the landing page's right pane. It complements the deeper case studies by giving visitors a faster, broader impression of Kurt's work.

### About Content

The About tab should combine text and images in the landing page's right pane to provide a fuller picture of Kurt beyond the concise introduction that remains visible on the left.

## Primary Navigation

The Case Studies, Gallery, and About tabs form the landing page's primary navigation. The introduction and tab controls remain in the left pane while the selected tab changes the right pane. Case Studies is the default active tab.

Visitors should be able to move easily between the landing experience and individual case studies. Every case-study page should provide a clear path back to the Case Studies tab.

The landing page and case-study pages share one portfolio shell. On desktop, navigating to a case study changes the primary content pane while preserving the featured-work carousel in a smaller secondary pane. Each case-study route must support direct visits, refreshes, sharing, and browser Back and Forward navigation.

## URL Structure

- `/` is the landing page.
- `/work/[slug]` is the canonical route pattern for individual case studies.

Whether the landing-page tabs should have distinct, shareable URLs remains open.

## Initial Scope

The initial portfolio includes:

1. One landing page with Case Studies, Gallery, and About content states
2. Five selected individual case-study pages

The selected case studies are listed in the [case-study index](case-studies/README.md).

A standalone About page, blog, writing section, standalone contact page, and separate case-study index are not currently defined.

## Open Questions

- Which case study should appear first?
- Should every case study be linked directly from the landing page?
- Should tab selection be reflected in the URL and browser history?
- Should the selected tab persist when a visitor returns to the landing page?
- Should the portfolio include contact or resume actions within the existing pages?

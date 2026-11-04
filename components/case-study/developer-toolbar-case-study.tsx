import type { ReactNode } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';
import {
  AccessibilityVisual,
  FeatureFlagsVisual,
  RenderScanVisual,
  ScenariosVisual,
  ToolbarOverviewVisual,
  ToolbarStatesVisual,
} from '@/components/case-study/developer-toolbar-visuals';

export function DeveloperToolbarCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <header className="pt-20 max-[760px]:pt-12">
        <p className="mb-5 text-xs font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
          PayPal · Developer experience
        </p>
        <h1 className="max-w-2xl text-4xl leading-tight font-medium tracking-[-0.045em] text-balance max-[560px]:text-3xl dark:text-[#f0f0e9]">
          A developer toolkit, built into checkout
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          Checkout has many configurations and states. The developer toolbar
          brings tools for exploring, testing, and diagnosing them directly into
          the experience.
        </p>
        <div className="mt-7">
          <ToolbarOverviewVisual />
        </div>
        <p className="mt-3 text-xs leading-5 text-[#777970] dark:text-[#989b91]">
          All visuals are simplified mockups with illustrative demo data.
        </p>
      </header>

      <CaseStudySection id="feature-flags" title="Explore feature flags">
        <p>
          Find a feature, change its configuration, and reload to see how
          checkout responds. Pin frequently used flags and reset overrides when
          you’re done.
        </p>
        <FeatureFlagsVisual />
      </CaseStudySection>

      <CaseStudySection id="scenarios" title="Bring checkout scenarios to life">
        <p>
          Load a preset to explore a checkout scenario. For more specific
          states, edit a mock response and save it to see the result.
        </p>
        <ScenariosVisual />
      </CaseStudySection>

      <CaseStudySection
        id="accessibility"
        title="Inspect accessibility in context"
      >
        <p>
          Run accessibility checks while exploring checkout. Browse issues by
          severity, read the guidance, and inspect the affected elements.
        </p>
        <AccessibilityVisual />
      </CaseStudySection>

      <CaseStudySection id="render-profiling" title="See what renders">
        <p>
          Turn on React Scan to see which components render as you interact with
          checkout.
        </p>
        <RenderScanVisual />
      </CaseStudySection>

      <CaseStudySection
        id="everyday-details"
        title="Small details, everyday convenience"
      >
        <p>
          Expand the toolbar when you need it, collapse it to keep checkout in
          view, or pin it open while you work. Touch interactions support the
          same compact experience.
        </p>
        <ToolbarStatesVisual />
      </CaseStudySection>
    </article>
  );
}

function CaseStudySection({
  children,
  id,
  title,
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={id} className="mt-[3.75rem]">
      <h2
        className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
        id={id}
        tabIndex={-1}
      >
        {title}
      </h2>
      <div className="mt-5 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
        {children}
      </div>
    </section>
  );
}

import Link from 'next/link';
import type { ReactNode } from 'react';

import {
  ToolbarDemo,
  ToolbarDiagram,
} from '@/components/case-study/developer-toolbar-visuals';

const headingClassName =
  'max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]';

const bodyClassName =
  'mt-5 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]';

export function DeveloperToolbarCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <section aria-labelledby="context" className="pt-20 max-[760px]:pt-12">
        <h1 className={headingClassName} id="context" tabIndex={-1}>
          Context
        </h1>
        <div className={bodyClassName}>
          <p>
            More than 200 engineers contribute to PayPal Branded Checkout
            experiences every day. A strong developer experience is essential to
            scaling software delivery while maintaining code quality.
          </p>
        </div>
      </section>

      <CaseStudySection id="problem" title="Problem">
        <p>
          Engineers use different tools for different parts of the checkout
          stack. Using those tools together in a single development workflow
          presents several challenges.
        </p>
        <ul className="list-disc space-y-4 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
          <li>
            <strong>Context switching.</strong> Moving between checkout and
            separate tools adds setup and interrupts the development workflow.
          </li>
          <li>
            <strong>Missing app context.</strong> Tools outside checkout can
            require engineers to recreate the state they are already inspecting
            in the app.
          </li>
          <li>
            <strong>Tooling drift.</strong> Separately maintained tools can fall
            out of sync as checkout evolves, and each new tool adds another
            workflow for engineers to learn.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="solution" title="Solution">
        <p>
          I designed and built a developer toolbar embedded in checkout to bring
          development and debugging tools into one place. The toolbar lives in
          the checkout codebase, so it can evolve alongside the app. Checkout
          loads it separately when enabled and keeps it off by default in
          production.
        </p>
        <p>
          I kept the toolbar compact and collapsible to give engineers seamless
          access to their tools while they work.
        </p>
        <ToolbarDemo name="overview" />
        <p>The toolbar features four core tools at the moment.</p>

        <div className="space-y-12 pt-3">
          <ToolSection id="feature-flags" title="Feature flags">
            <p>
              Search, pin, and override feature flags to try different checkout
              configurations.
            </p>
            <ToolbarDemo name="feature-flags" />
            <p>
              The panel combines a generated flag catalog with values evaluated
              on the server. It saves overrides in a{' '}
              <strong>browser cookie</strong> so checkout can apply them before
              rendering on the next page load. Pinned flags persist separately
              in <strong>local storage</strong>. See the{' '}
              <Link
                className="rounded-sm text-[#168465] underline decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#71d9b7] dark:focus-visible:outline-[#c6ec39]"
                href="/work/feature-flag-system"
              >
                Feature Flag Platform case study
              </Link>
              .
            </p>
            <ToolbarDiagram name="flag-persistence" />
          </ToolSection>

          <ToolSection id="mock-scenarios" title="Mock scenarios">
            <p>
              Load a preset or edit a mock API response to reproduce a specific
              checkout state.
            </p>
            <ToolbarDemo name="mock-scenarios" />
            <p>
              Presets and the JSON editor use shared <strong>GraphQL</strong>{' '}
              mock data. A server action saves the selected responses and sets a{' '}
              <strong>cookie</strong> that identifies the dataset. On reload,{' '}
              <strong>Mock Service Worker (MSW)</strong> intercepts matching
              GraphQL requests on the server and returns the selected mock
              responses.
            </p>
            <ToolbarDiagram name="server-mocking" />
          </ToolSection>

          <ToolSection id="accessibility-checks" title="Accessibility checks">
            <p>
              Scan the current checkout page and inspect accessibility issues by
              severity and affected element.
            </p>
            <ToolbarDemo name="accessibility" />
            <p>
              The panel lazy-loads <strong>axe-core</strong> when first opened.
              It debounces scans as the interface updates, then groups
              violations by severity and maps findings to the affected{' '}
              <strong>DOM elements</strong> for inspection.
            </p>
          </ToolSection>

          <ToolSection
            id="react-render-diagnostics"
            title="React render diagnostics"
          >
            <p>See which components re-render as you interact with checkout.</p>
            <ToolbarDemo name="render-diagnostics" />
            <p>
              The toolbar enables <strong>React Scan</strong> on demand to
              highlight renders on the page and log them to the console.
            </p>
          </ToolSection>
        </div>
      </CaseStudySection>

      <CaseStudySection id="impact" title="Impact">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 max-[560px]:grid-cols-1">
          {[
            ['Usage', '200+', 'Engineers use the toolbar.'],
            ['Adoption', '4', 'Teams have adopted it.'],
          ].map(([label, value, description]) => (
            <div
              className="border-t border-[#171814]/10 pt-5 dark:border-[#f0f0e9]/15"
              key={label}
            >
              <dt className="text-xs font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
                {label}
              </dt>
              <dd className="mt-4">
                <span className="block text-4xl leading-none font-medium tracking-[-0.04em] text-[#168465] dark:text-[#71d9b7]">
                  {value}
                </span>
                <span className="mt-3 block">{description}</span>
              </dd>
            </div>
          ))}
        </dl>
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
      <h2 className={headingClassName} id={id} tabIndex={-1}>
        {title}
      </h2>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

function ToolSection({
  children,
  id,
  title,
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={id}>
      <h3
        className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
        id={id}
        tabIndex={-1}
      >
        {title}
      </h3>
      <div className="mt-4 space-y-5">{children}</div>
    </section>
  );
}

import type { ReactNode } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

const facts = [
  ['Scale', '150+ flags per request'],
  ['Target', 'Under 200ms'],
  ['Role', 'System design and implementation'],
] as const;

const flagFlow = [
  ['01', 'Request context', 'Build one typed view of the current request.'],
  ['02', 'Resolver', 'Evaluate synchronous and asynchronous rules.'],
  ['03', 'Scoped cache', 'Reuse results for the lifetime of the request.'],
] as const;

export function FeatureFlagSystemCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <header className="pt-20 pb-14 max-[760px]:pt-12">
        <p className="mb-5 text-sm font-medium tracking-[0.14em] text-[#6a6c62] uppercase dark:text-[#a8aaa2]">
          Platform · Developer experience
        </p>
        <h1 className="max-w-2xl text-6xl leading-[0.98] font-medium tracking-[-0.055em] text-balance max-[960px]:text-5xl max-[560px]:text-4xl dark:text-[#f0f0e9]">
          Resolving 150+ feature flags in under 200ms
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f6159] max-[560px]:text-lg max-[560px]:leading-7 dark:text-[#b7b9af]">
          A Node.js platform that made high-volume flag evaluation fast,
          request-aware, and predictable for the engineers building on it.
        </p>
        <p className="mt-7 inline-flex rounded-full border border-[#171814]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#6a6c62] uppercase dark:border-[#f0f0e9]/15 dark:text-[#a8aaa2]">
          Illustrative content — replace before publication
        </p>
      </header>

      <div
        aria-label="Feature flag evaluation flow from request context through resolution and request-scoped caching"
        className="grid gap-3 rounded-[22px] bg-[#ff8b66] p-8 text-[#171814] max-[680px]:p-5"
        role="img"
      >
        <p className="mb-2 text-xs font-medium tracking-[0.14em] uppercase opacity-65">
          Evaluation lifecycle
        </p>
        {flagFlow.map(([step, title, description], index) => (
          <div
            className="grid grid-cols-[2.5rem_1fr] gap-x-4 rounded-2xl bg-[#fff8f2]/90 p-5 shadow-[0_8px_30px_rgba(73,29,16,0.08)]"
            key={step}
          >
            <span className="row-span-2 font-medium opacity-45">{step}</span>
            <p className="font-medium">{title}</p>
            <p className="mt-1 text-sm leading-6 opacity-70">{description}</p>
            {index < flagFlow.length - 1 ? (
              <span
                aria-hidden="true"
                className="absolute h-3 w-px translate-x-[1.2rem] translate-y-[4.75rem] bg-[#171814]/25"
              />
            ) : null}
          </div>
        ))}
      </div>

      <dl className="my-16 grid grid-cols-3 gap-6 border-y border-[#171814]/10 py-7 max-[680px]:grid-cols-1 max-[680px]:gap-5 dark:border-[#f0f0e9]/15">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-xs font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
              {label}
            </dt>
            <dd className="mt-2 text-base leading-6 text-[#30312d] dark:text-[#dedfd8]">
              {value}
            </dd>
          </div>
        ))}
      </dl>

      <div className="space-y-18">
        <CaseStudySection
          eyebrow="01 · The challenge"
          title="Feature flags had become part of the request path"
        >
          <p>
            A single server request could depend on more than 150 feature flags.
            The platform needed to resolve that volume without letting repeated
            lookups, mixed execution models, or loosely shaped context make
            request behavior slow and difficult to reason about.
          </p>
          <p>
            The challenge was broader than raw evaluation speed: engineers also
            needed an API that behaved consistently as new flags and new runtime
            inputs were introduced.
          </p>
        </CaseStudySection>

        <aside className="rounded-[22px] bg-[#171814] p-8 text-[#f7f4ec] max-[560px]:p-6 dark:bg-[#f0f0e9] dark:text-[#171814]">
          <p className="text-sm font-medium tracking-[0.12em] uppercase opacity-65">
            Design principle
          </p>
          <p className="mt-5 max-w-xl text-3xl leading-tight font-medium tracking-[-0.035em] max-[560px]:text-2xl">
            Treat flag evaluation as request infrastructure, with an explicit
            lifecycle and a small, dependable API.
          </p>
        </aside>

        <CaseStudySection
          eyebrow="02 · System design"
          title="Put context and caching at the request boundary"
        >
          <p>
            I designed the system around a typed runtime context created once
            for each request. Resolvers could read the inputs they needed while
            the platform kept ownership of evaluation and result reuse.
          </p>
          <p>
            A request-scoped cache ensured that repeated reads of the same flag
            shared work without leaking decisions between users or requests. The
            cache lifetime was easy to explain because it matched the lifecycle
            the application already understood.
          </p>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="03 · Developer API"
          title="Support sync and async rules without two mental models"
        >
          <p>
            The API supported both synchronous and asynchronous flag resolution
            while keeping usage predictable for callers. Typed context made
            required inputs visible during development instead of turning
            missing data into a production surprise.
          </p>
          <ul className="space-y-3 pl-5 marker:text-[#d85d37]">
            <li>One request context for consistent evaluation inputs.</li>
            <li>One scoped cache for duplicate work within that request.</li>
            <li>Typed contracts between flag definitions and runtime data.</li>
            <li>A shared interface for synchronous and asynchronous rules.</li>
          </ul>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="04 · Outcome"
          title="Fast evaluation with a more legible operating model"
        >
          <p>
            The implemented system resolved more than 150 feature flags in under
            200ms while giving application teams a clearer contract for adding
            and consuming flags.
          </p>
          <p>
            Benchmark conditions, rollout evidence, and operational details are
            still being gathered. This narrative will be revised with verified,
            public-safe specifics before publication.
          </p>
        </CaseStudySection>
      </div>
    </article>
  );
}

function CaseStudySection({
  children,
  eyebrow,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  title: string;
}) {
  return (
    <section>
      <p className="text-sm font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
        {eyebrow}
      </p>
      <h2 className="mt-4 max-w-2xl text-3xl leading-tight font-medium tracking-[-0.035em] text-balance max-[560px]:text-2xl dark:text-[#f0f0e9]">
        {title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-5 text-lg leading-8 text-[#55574f] max-[560px]:text-base max-[560px]:leading-7 dark:text-[#b7b9af]">
        {children}
      </div>
    </section>
  );
}

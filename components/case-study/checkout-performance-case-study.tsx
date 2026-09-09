import Image from 'next/image';
import type { ReactNode } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

const facts = [
  ['Focus', 'Rendering and data loading'],
  ['Surface', 'Web checkout'],
  ['Role', 'Senior full-stack engineer'],
] as const;

export function CheckoutPerformanceCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <header className="pt-20 pb-14 max-[760px]:pt-12">
        <p className="mb-5 text-sm font-medium tracking-[0.14em] text-[#6a6c62] uppercase dark:text-[#a8aaa2]">
          Performance · Checkout
        </p>
        <h1 className="max-w-2xl text-6xl leading-[0.98] font-medium tracking-[-0.055em] text-balance max-[960px]:text-5xl max-[560px]:text-4xl dark:text-[#f0f0e9]">
          Halving first-page load latency
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f6159] max-[560px]:text-lg max-[560px]:leading-7 dark:text-[#b7b9af]">
          A checkout performance effort that treated rendering, data loading,
          and perceived progress as one connected system.
        </p>
        <p className="mt-7 inline-flex rounded-full border border-[#171814]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#6a6c62] uppercase dark:border-[#f0f0e9]/15 dark:text-[#a8aaa2]">
          Illustrative content — replace before publication
        </p>
      </header>

      <div className="relative aspect-[16/9] overflow-hidden rounded-[22px] bg-[#faf9f5] dark:bg-[#20211e]">
        <Image
          alt="Abstract visualization of accelerated page loading"
          className="object-cover"
          fill
          priority
          sizes="(max-width: 760px) 100vw, 67vw"
          src="/images/case-studies/checkout-performance.svg"
        />
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
          title="Latency was a journey problem, not a single slow request"
        >
          <p>
            The first checkout view depended on several pieces of data becoming
            available in sequence. Even when individual requests looked
            acceptable in isolation, their combined effect left shoppers waiting
            too long before the page felt usable.
          </p>
          <p>
            The work began by defining the experience from the shopper&apos;s
            perspective, then tracing that wait across server rendering, query
            hydration, client boot-up, and follow-on requests.
          </p>
        </CaseStudySection>

        <aside className="rounded-[22px] bg-[#d8ff64] p-8 text-[#171814] max-[560px]:p-6">
          <p className="text-sm font-medium tracking-[0.12em] uppercase">
            Working principle
          </p>
          <p className="mt-5 max-w-xl text-3xl leading-tight font-medium tracking-[-0.035em] max-[560px]:text-2xl">
            Optimize the moment useful checkout content appears—not simply when
            every request finishes.
          </p>
        </aside>

        <CaseStudySection
          eyebrow="02 · Diagnosis"
          title="Follow the dependency chain"
        >
          <p>
            Profiling separated server work from hydration and client-side data
            fetching. That made it possible to identify which dependencies
            belonged on the critical path, which could stream later, and which
            could be prepared before the shopper needed them.
          </p>
          <p>
            This system view prevented a local optimization from moving the
            delay elsewhere in the journey.
          </p>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="03 · Approach"
          title="Coordinate rendering and data delivery"
        >
          <p>
            The revised flow combined server-side rendering and streaming with
            deliberate query hydration, strategic prefetching, and Suspense
            boundaries. The goal was to make the first useful state arrive
            sooner while allowing secondary work to continue progressively.
          </p>
          <ul className="space-y-3 pl-5 marker:text-[#879f1c]">
            <li>
              Move essential rendering work closer to the initial response.
            </li>
            <li>Hydrate queries without repeating work in the browser.</li>
            <li>
              Prefetch predictable dependencies before they block progress.
            </li>
            <li>
              Use loading boundaries to reveal useful content incrementally.
            </li>
          </ul>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="04 · Outcome"
          title="A faster first page and a clearer performance model"
        >
          <p>
            The coordinated changes cut first-page latency by roughly half in
            the working narrative. Equally important, the team gained a clearer
            model for measuring the complete loading journey and protecting it
            from regressions.
          </p>
          <p>
            Final measurements, rollout details, and public-safe evidence will
            replace this illustrative copy before publication.
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

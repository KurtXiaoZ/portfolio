import type { ReactNode } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';
import { TableOfContents } from '@/components/table-of-contents/table-of-contents';

const facts = [
  ['Scale', '350+ customer interactions'],
  ['Volume', '30M+ lifecycle events daily'],
  ['Role', 'SDK design and implementation'],
] as const;

const tableOfContentsLinks = [
  { href: '#challenge', text: 'The challenge' },
  { href: '#model', text: 'Interaction model' },
  { href: '#architecture', text: 'Architecture' },
  { href: '#boundaries', text: 'App boundaries' },
  { href: '#adoption', text: 'Adoption' },
  { href: '#impact', text: 'Impact' },
] as const;

const lifecycle = [
  ['Intent', 'A click, submit, navigation, or first render starts the clock.'],
  ['Waiting', 'Work continues while the customer cannot meaningfully proceed.'],
  ['Ready', 'The resulting UI is usable and the perceived wait is complete.'],
] as const;

const architecture = [
  {
    eyebrow: '01 · Capture',
    title: 'DOM + typed APIs',
    description:
      'Declarative attributes handled common interactions; a small API covered custom flows and lifecycle-aware React integration.',
  },
  {
    eyebrow: '02 · Model',
    title: 'Reducer state machine',
    description:
      'A dependency-light reducer enforced valid transitions, retained context, and calculated the full perceived duration.',
  },
  {
    eyebrow: '03 · Deliver',
    title: 'Pub/sub pipeline',
    description:
      'Standard events stayed independent from any one analytics or observability vendor, leaving delivery to each application.',
  },
] as const;

export function AtomicEventsCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 min-[1200px]:mr-auto min-[1200px]:ml-36 min-[1200px]:w-[calc(100%-9rem)] max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <TableOfContents
        className="left-4 z-10 hidden w-28 min-[1200px]:block"
        links={tableOfContentsLinks}
      />

      <header className="pt-20 pb-14 max-[760px]:pt-12">
        <p className="mb-5 text-sm font-medium tracking-[0.14em] text-[#6a6c62] uppercase dark:text-[#a8aaa2]">
          Observability · Platform
        </p>
        <h1 className="max-w-2xl text-6xl leading-[0.98] font-medium tracking-[-0.055em] text-balance max-[960px]:text-5xl max-[560px]:text-4xl dark:text-[#f0f0e9]">
          Measuring the moments between intent and ready
        </h1>
        <p className="mt-7 max-w-2xl text-xl leading-8 text-[#5f6159] max-[560px]:text-lg max-[560px]:leading-7 dark:text-[#b7b9af]">
          Atomic Events is a shared TypeScript SDK that gave teams one way to
          understand customer interactions—even when the experience crossed
          applications and domains.
        </p>
        <p className="mt-7 inline-flex rounded-full border border-[#171814]/10 px-3 py-1.5 text-xs font-medium tracking-wide text-[#6a6c62] uppercase dark:border-[#f0f0e9]/15 dark:text-[#a8aaa2]">
          First draft · publication review needed
        </p>
      </header>

      <LifecycleHero />

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
          id="challenge"
          title="The customer saw one journey. Our systems saw fragments."
        >
          <p>
            Branded Checkout brings together services and payment options built
            across multiple repositories and teams. Each surface could report
            its own activity, but those local signals did not always explain the
            experience a customer actually felt.
          </p>
          <p>
            A single click might wait on several downstream services, pass into
            another application, and return on a different domain. We needed to
            measure that as one continuous interaction—not a collection of
            unrelated page and network events.
          </p>
        </CaseStudySection>

        <aside className="rounded-[22px] bg-[#b9f1dc] p-8 text-[#10251e] max-[560px]:p-6 dark:bg-[#93d8bf]">
          <p className="text-sm font-medium tracking-[0.12em] uppercase opacity-65">
            The shared definition
          </p>
          <p className="mt-5 max-w-xl text-3xl leading-tight font-medium tracking-[-0.035em] max-[560px]:text-2xl">
            An interaction begins when the customer expresses intent and ends
            when the resulting UI is ready for their next action.
          </p>
        </aside>

        <CaseStudySection
          eyebrow="02 · Interaction model"
          id="model"
          title="Define the experience before designing the library"
        >
          <p>
            We aligned the implementation around two primary states: ready and
            waiting. Start events move the UI into waiting; a ready signal ends
            the interaction and records the customer-perceived duration.
          </p>
          <p>
            Outcomes—success, cancellation, expected error, or unexpected
            failure—add meaning without changing the basic lifecycle. Context
            such as flow, task, owning domain, and resulting view gives teams a
            consistent vocabulary for analysis.
          </p>

          <div className="mt-9 grid gap-3">
            {lifecycle.map(([title, description], index) => (
              <div
                className="grid grid-cols-[2.5rem_1fr] gap-x-4 rounded-2xl border border-[#171814]/10 p-5 dark:border-[#f0f0e9]/15"
                key={title}
              >
                <span className="row-span-2 text-sm font-medium text-[#168465] dark:text-[#71d9b7]">
                  0{index + 1}
                </span>
                <p className="font-medium text-[#252622] dark:text-[#e7e7e1]">
                  {title}
                </p>
                <p className="mt-1 text-sm leading-6 text-[#6a6c62] dark:text-[#a8aaa2]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </CaseStudySection>

        <CaseStudySection
          eyebrow="03 · Architecture"
          id="architecture"
          title="A small core with clear integration boundaries"
        >
          <p>
            I worked on translating the model into a portable SDK that could fit
            applications with different frameworks, state-management choices,
            and telemetry stacks.
          </p>
          <p>
            We chose a lightweight in-house reducer over Redux. With only two
            primary states, a focused reducer kept the runtime small, avoided
            dependency conflicts, and let the SDK expose domain language such as{' '}
            <code>markUIReady()</code> instead of state-library concepts.
          </p>
        </CaseStudySection>

        <div
          aria-label="Atomic Events architecture: capture interaction signals, model them with a reducer, then publish standardized events"
          className="grid gap-3 rounded-[22px] bg-[#1c2925] p-4 text-[#f4f6f0] sm:grid-cols-3"
          role="img"
        >
          {architecture.map(({ description, eyebrow, title }) => (
            <div
              className="rounded-2xl bg-[#f5f4ed] p-5 text-[#171814]"
              key={title}
            >
              <p className="text-[0.68rem] font-medium tracking-[0.12em] text-[#168465] uppercase">
                {eyebrow}
              </p>
              <p className="mt-5 text-lg font-medium tracking-[-0.02em]">
                {title}
              </p>
              <p className="mt-3 text-sm leading-6 text-[#666860]">
                {description}
              </p>
            </div>
          ))}
        </div>

        <CaseStudySection
          eyebrow="04 · App boundaries"
          id="boundaries"
          title="Keep one interaction alive across a fragmented stack"
        >
          <p>
            Atomic Events serializes an active waiting state—its intent,
            context, events, and original timing—and lets the destination
            application resume it. The final ready signal can then measure the
            full journey from the original customer action.
          </p>
          <p>
            The handoff preserves timing while rejecting malformed, completed,
            or stale states. Session storage handles the standard path, with
            explicit transfer available for iframe and custom integrations.
          </p>

          <CrossAppFlow />
        </CaseStudySection>

        <CaseStudySection
          eyebrow="05 · Adoption"
          id="adoption"
          title="Make the common path declarative"
        >
          <p>
            Application teams configure their valid instrumentation vocabulary
            once, initialize one shared instance, and connect a subscriber to
            their existing observability pipeline. Most interactions can then be
            marked directly in the DOM.
          </p>

          <pre className="mt-8 overflow-x-auto rounded-[18px] bg-[#20211e] p-6 text-sm leading-7 text-[#dbddd3]">
            <code>{`<button
  data-atomic-wait-interaction="submit"
  data-atomic-wait-task="review-order"
>
  Place order
</button>

// Render when the next view is usable
<MarkUIReady view="confirmation" />`}</code>
          </pre>

          <p>
            The declarative path reduced bespoke logging work, while typed
            policies caught vocabulary drift during development. Manual APIs
            remained available when the UI did not fit the common pattern.
          </p>
        </CaseStudySection>

        <section
          aria-labelledby="impact"
          className="overflow-hidden rounded-[22px] bg-[#7c5cff] text-white"
        >
          <div className="border-b border-white/20 p-8 max-[560px]:p-6">
            <p className="text-sm font-medium tracking-[0.12em] uppercase opacity-70">
              06 · Impact
            </p>
            <p className="mt-7 text-7xl leading-none font-medium tracking-[-0.07em] max-[560px]:text-5xl">
              30M+
            </p>
            <h2
              className="mt-3 scroll-mt-9 text-2xl font-medium tracking-[-0.035em]"
              id="impact"
              tabIndex={-1}
            >
              UI interaction lifecycle events captured daily
            </h2>
          </div>
          <div className="grid gap-6 p-8 text-base leading-7 text-white/80 sm:grid-cols-2 max-[560px]:p-6">
            <p>
              The shared model expanded across 350+ customer interactions,
              creating a consistent view of status and perceived latency at
              checkout scale.
            </p>
            <p>
              The result was not just more telemetry, but a common language
              engineers, product partners, and analysts could use to discuss a
              customer journey.
            </p>
          </div>
        </section>

        <p className="rounded-2xl border border-[#171814]/10 p-5 text-sm leading-6 text-[#777970] dark:border-[#f0f0e9]/15 dark:text-[#989b91]">
          Draft note: adoption figures, attribution, rollout details, and
          business outcomes still need confirmation before this case study is
          published.
        </p>
      </div>
    </article>
  );
}

function LifecycleHero() {
  return (
    <div
      aria-label="Interaction lifecycle from customer intent, through a waiting state, to a ready user interface"
      className="relative overflow-hidden rounded-[22px] bg-[#c9f4e4] p-8 text-[#12251f] max-[560px]:p-5"
      role="img"
    >
      <div className="absolute -top-20 -right-16 size-56 rounded-full bg-[#7c5cff]/15 blur-3xl" />
      <div className="absolute -bottom-24 -left-12 size-64 rounded-full bg-[#0da47b]/20 blur-3xl" />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <p className="text-xs font-medium tracking-[0.14em] uppercase opacity-60">
            One interaction · end to end
          </p>
          <p className="rounded-full bg-[#12251f] px-3 py-1 text-[0.65rem] font-medium tracking-[0.12em] text-[#d5ffef] uppercase">
            Atomic Events
          </p>
        </div>

        <div className="mt-14 grid grid-cols-[auto_1fr_auto_1fr_auto] items-center gap-3 max-[560px]:grid-cols-1 max-[560px]:gap-2">
          <HeroNode label="Intent" value="Click" />
          <FlowLine />
          <HeroNode featured label="State" value="Waiting" />
          <FlowLine />
          <HeroNode label="UI" value="Ready" />
        </div>

        <div className="mt-14 flex items-end justify-between gap-6 border-t border-[#12251f]/15 pt-5">
          <p className="max-w-xs text-sm leading-6 opacity-65">
            The duration spans every request, render, redirect, and application
            between these two moments.
          </p>
          <p className="text-right text-xs font-medium tracking-[0.12em] uppercase opacity-50">
            Customer-perceived latency
          </p>
        </div>
      </div>
    </div>
  );
}

function HeroNode({
  featured = false,
  label,
  value,
}: {
  featured?: boolean;
  label: string;
  value: string;
}) {
  return (
    <div
      className={
        featured
          ? 'rounded-2xl bg-[#7c5cff] px-5 py-4 text-white shadow-[0_14px_35px_rgba(68,44,187,0.25)]'
          : 'rounded-2xl bg-white/75 px-5 py-4 shadow-[0_10px_28px_rgba(20,74,57,0.08)]'
      }
    >
      <p className="text-[0.65rem] font-medium tracking-[0.12em] uppercase opacity-55">
        {label}
      </p>
      <p className="mt-1 text-lg font-medium">{value}</p>
    </div>
  );
}

function FlowLine() {
  return (
    <div className="flex items-center max-[560px]:h-6 max-[560px]:justify-center">
      <span className="h-px w-full bg-[#12251f]/25 max-[560px]:h-full max-[560px]:w-px" />
      <span className="size-2 -translate-x-1 rotate-45 border-t border-r border-[#12251f]/40 max-[560px]:translate-x-0 max-[560px]:-translate-y-1 max-[560px]:rotate-[135deg]" />
    </div>
  );
}

function CrossAppFlow() {
  return (
    <div
      aria-label="A waiting interaction starts in one app, carries state across a boundary, and finishes in a second app"
      className="mt-9 rounded-[20px] border border-[#171814]/10 p-5 dark:border-[#f0f0e9]/15"
      role="img"
    >
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-4 max-[560px]:grid-cols-1">
        <div className="rounded-2xl bg-[#e9e8e2] p-5 text-[#171814] dark:bg-[#272824] dark:text-[#f0f0e9]">
          <p className="text-xs font-medium tracking-[0.12em] uppercase opacity-50">
            App A
          </p>
          <p className="mt-4 font-medium">Intent + waiting</p>
          <p className="mt-1 text-sm opacity-60">Start time and context</p>
        </div>
        <div className="text-center text-xs font-medium tracking-[0.1em] text-[#168465] uppercase dark:text-[#71d9b7]">
          <span className="max-[560px]:hidden">State →</span>
          <span className="hidden max-[560px]:inline">State ↓</span>
        </div>
        <div className="rounded-2xl bg-[#b9f1dc] p-5 text-[#10251e] dark:bg-[#93d8bf]">
          <p className="text-xs font-medium tracking-[0.12em] uppercase opacity-50">
            App B
          </p>
          <p className="mt-4 font-medium">Resume + ready</p>
          <p className="mt-1 text-sm opacity-60">One end-to-end duration</p>
        </div>
      </div>
    </div>
  );
}

function CaseStudySection({
  children,
  eyebrow,
  id,
  title,
}: {
  children: ReactNode;
  eyebrow: string;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={id}>
      <p className="text-sm font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
        {eyebrow}
      </p>
      <h2
        className="mt-4 max-w-2xl scroll-mt-9 text-3xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-2xl dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
        id={id}
        tabIndex={-1}
      >
        {title}
      </h2>
      <div className="mt-6 max-w-2xl space-y-5 text-lg leading-8 text-[#55574f] max-[560px]:text-base max-[560px]:leading-7 dark:text-[#b7b9af]">
        {children}
      </div>
    </section>
  );
}

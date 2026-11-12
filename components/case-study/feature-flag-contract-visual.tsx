'use client';

import clsx from 'clsx';
import { useEffect, useId, useRef, useState } from 'react';

interface CodePart {
  code: string;
  added?: boolean;
}

interface FlagExample {
  name: string;
  scenario: string;
  parts: CodePart[];
  heading: string;
  details: string[];
  consumer: string;
  returnType: string;
}

const examples: FlagExample[] = [
  {
    name: 'flag',
    scenario:
      'Use custom application logic to decide whether a feature is available.',
    parts: [
      {
        code: `const showSummary = flag({
  key: "new-summary",
  name: "New summary",
  description: "Enable new summary",
  options: [false, true],
  defaultValue: false,
  decide: context => ({
    result: isEligible(context),
  }),
});`,
      },
    ],
    heading: 'Core functionality',
    details: [
      'Evaluate on demand and reuse decisions within a request.',
      'Share in-flight asynchronous evaluations.',
      'Return the configured default on evaluation errors.',
      'Expose resolution, error, and debug callbacks.',
      'Preserve result types for synchronous and asynchronous decisions.',
    ],
    consumer: 'const enabled = showSummary();',
    returnType: 'boolean',
  },
  {
    name: 'elmoFlag',
    scenario:
      'Enable a feature when a buyer is assigned to one specific experiment treatment.',
    parts: [
      {
        code: `const showSummary = elmoFlag({
  key: "new-summary",
  defaultValue: false,`,
      },
      {
        added: true,
        code: `  evaluationGroup: "checkout",
  experimentName: "summary-layout",
  treatmentName: "Compact",`,
      },
      { code: '});' },
    ],
    heading: 'Adds to the core flag',
    details: [
      'Connect an experiment and target treatment.',
      'Supply decide() internally to turn the assignment into a boolean.',
      'Attach experiment attribution and ineligibility reasons.',
      'Support optional eligibility checks and audience filters.',
    ],
    consumer: 'const enabled = showSummary();',
    returnType: 'boolean',
  },
  {
    name: 'rampFlag',
    scenario:
      'Choose among several experiences when each experiment treatment maps to a different variation.',
    parts: [
      {
        code: `const summaryVariant = rampFlag({
  key: "summary-variant",
  defaultValue: "Control",`,
      },
      {
        added: true,
        code: `  evaluationGroup: "checkout",
  experimentName: "summary-layout",
  treatmentNames: [
    "Control", "Compact", "Expanded",
  ],`,
      },
      { code: '});' },
    ],
    heading: 'Adds to the core flag',
    details: [
      'Resolve a named treatment instead of a boolean match.',
      'Map treatmentNames to typed options and constrain the default.',
      'Attach experiment attribution and ineligibility reasons.',
      'Optionally group treatments behind boolean alias helpers.',
    ],
    consumer: 'const variant = summaryVariant();',
    returnType: '"Control" | "Compact" | "Expanded"',
  },
];

function ExampleCode({ parts }: { parts: CodePart[] }) {
  const lines = parts.flatMap(({ code, added }) =>
    code.split('\n').map((text) => ({ text, added })),
  );

  return (
    <pre className="min-w-0 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere]">
      <code>
        {lines.map(({ text, added }, index) => (
          <span
            className={clsx(
              'block min-h-6 border-l-2 px-3',
              added
                ? 'border-[#168465] bg-[#168465]/5 dark:border-[#71d9b7] dark:bg-[#71d9b7]/5'
                : 'border-transparent',
            )}
            key={index}
          >
            {text || '\u00a0'}
            {index < lines.length - 1 ? '\n' : ''}
          </span>
        ))}
      </code>
    </pre>
  );
}

export function FeatureFlagContractVisual() {
  const [activeIndex, setActiveIndex] = useState(0);
  const viewport = useRef<HTMLDivElement>(null);
  const currentIndex = useRef(0);
  const carouselId = useId();

  useEffect(() => {
    const element = viewport.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      element.scrollTo({
        left: currentIndex.current * element.clientWidth,
        behavior: 'instant',
      });
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function goTo(index: number) {
    const element = viewport.current;
    if (!element) return;

    const next = Math.max(0, Math.min(examples.length - 1, index));
    element.scrollTo({
      left: next * element.clientWidth,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth',
    });
  }

  const controlClass =
    'flex size-11 items-center justify-center text-base text-[#55574f] transition-colors hover:text-[#168465] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#657800] disabled:cursor-default disabled:opacity-30 motion-reduce:transition-none dark:text-[#b7b9af] dark:hover:text-[#71d9b7] dark:focus-visible:outline-[#c6ec39]';

  return (
    <figure
      aria-label="The core flag and its experiment adapters"
      aria-roledescription="carousel"
      className="mt-7 min-w-0 border-y border-[#171814]/15 text-xs leading-5 text-[#55574f] dark:border-[#f0f0e9]/15 dark:text-[#b7b9af]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-[#171814]/10 dark:border-[#f0f0e9]/10">
        <div
          aria-label="Choose a flag example"
          className="flex min-w-0 gap-5 max-[420px]:gap-3"
          role="group"
        >
          {examples.map((example, index) => (
            <button
              aria-controls={carouselId}
              aria-pressed={index === activeIndex}
              className={clsx(
                'min-h-11 border-b-2 py-3 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#657800] motion-reduce:transition-none dark:focus-visible:outline-[#c6ec39]',
                index === activeIndex
                  ? 'border-[#168465] font-medium text-[#30312d] dark:border-[#71d9b7] dark:text-[#dedfd8]'
                  : 'border-transparent text-[#777970] hover:text-[#30312d] dark:text-[#989b91] dark:hover:text-[#dedfd8]',
              )}
              key={example.name}
              onClick={() => goTo(index)}
              type="button"
            >
              {example.name}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center">
          <button
            aria-label="Previous flag example"
            className={controlClass}
            disabled={activeIndex === 0}
            onClick={() => goTo(activeIndex - 1)}
            type="button"
          >
            <span aria-hidden="true">←</span>
          </button>
          <button
            aria-label="Next flag example"
            className={controlClass}
            disabled={activeIndex === examples.length - 1}
            onClick={() => goTo(activeIndex + 1)}
            type="button"
          >
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div
        aria-label="Flag examples; use left and right arrow keys to navigate"
        className="flex snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] [&::-webkit-scrollbar]:hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:focus-visible:outline-[#c6ec39]"
        id={carouselId}
        onKeyDown={(event) => {
          if (event.target !== event.currentTarget) return;
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            goTo(activeIndex + (event.key === 'ArrowRight' ? 1 : -1));
          }
        }}
        onScroll={(event) => {
          const element = event.currentTarget;
          if (!element.clientWidth) return;
          const next = Math.max(
            0,
            Math.min(
              examples.length - 1,
              Math.round(element.scrollLeft / element.clientWidth),
            ),
          );
          currentIndex.current = next;
          setActiveIndex(next);
        }}
        ref={viewport}
        tabIndex={0}
      >
        {examples.map((example, index) => (
          <section
            aria-hidden={index !== activeIndex}
            aria-label={`${index + 1} of ${examples.length}: ${example.name}`}
            aria-roledescription="slide"
            className="w-full min-w-0 flex-none snap-start py-5"
            inert={index !== activeIndex}
            key={example.name}
          >
            <h4 className="text-base font-medium tracking-[-0.02em] text-[#30312d] dark:text-[#dedfd8]">
              {example.name}()
            </h4>
            <p className="mt-2 max-w-lg">{example.scenario}</p>
            {index === 0 && (
              <p className="mt-4 text-[0.6875rem] text-[#777970] dark:text-[#989b91]">
                All six configuration fields, including optional description and
                options.
              </p>
            )}
            <div className="mt-4 grid grid-cols-2 gap-x-5 gap-y-5 max-[560px]:grid-cols-1">
              <ExampleCode parts={example.parts} />
              <div className="border-l border-[#171814]/15 pl-4 max-[560px]:border-l-0 max-[560px]:border-t max-[560px]:pt-4 max-[560px]:pl-0 dark:border-[#f0f0e9]/15">
                <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
                  {example.heading}
                </p>
                <ul className="mt-3 list-disc space-y-3 pl-4 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  {example.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
                {index !== 0 && (
                  <p className="mt-4 text-[#777970] dark:text-[#989b91]">
                    Inherits request caching, error defaults, and callbacks from
                    flag().
                  </p>
                )}
              </div>
            </div>
            <div className="mt-5 border-t border-[#171814]/10 pt-4 dark:border-[#f0f0e9]/10">
              <pre className="font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere]">
                <code>{example.consumer}</code>
              </pre>
              <p className="mt-2 text-[#777970] dark:text-[#989b91]">
                Returns{' '}
                <code className="text-[#30312d] [overflow-wrap:anywhere] dark:text-[#dedfd8]">
                  {example.returnType}
                </code>
              </p>
            </div>
          </section>
        ))}
      </div>

      <figcaption aria-atomic="true" aria-live="polite" className="sr-only">
        {activeIndex + 1} / {examples.length} · {examples[activeIndex].name}
      </figcaption>
    </figure>
  );
}

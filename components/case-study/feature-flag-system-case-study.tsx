import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

export function FeatureFlagSystemCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <section aria-labelledby="context" className="pt-20 max-[760px]:pt-12">
        <h1
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="context"
          tabIndex={-1}
        >
          Context
        </h1>
        <div className="mt-5 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            A single PayPal Branded Checkout session can involve hundreds of
            feature flag evaluations. Feature flags support A/B testing to
            measure product changes and improve conversion, while enabling safe
            feature rollouts.
          </p>
        </div>
      </section>

      <section aria-labelledby="problem" className="mt-[3.75rem]">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="problem"
          tabIndex={-1}
        >
          Problem
        </h2>
        <div className="mt-5 max-w-2xl text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            Running these evaluations at checkout scale introduced several
            technical and operational challenges:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>
              <strong className="font-bold">
                Performance and reliability:
              </strong>{' '}
              Experiment lookups could delay checkout rendering and expose it to
              downstream service slowdowns or outages.
            </li>
            <li>
              <strong className="font-bold">Implementation complexity:</strong>{' '}
              Asynchronous flag checks complicated data fetching, component
              rendering, and experiment integration.
            </li>
            <li>
              <strong className="font-bold">Decision consistency:</strong>{' '}
              Components needed to share the same flag decision within a request
              and avoid repeated evaluation.
            </li>
            <li>
              <strong className="font-bold">
                Instrumentation and attribution:
              </strong>{' '}
              Analytics needed to connect flag resolution outcomes with
              conversion and performance metrics.
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="solution" className="mt-[3.75rem]">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="solution"
          tabIndex={-1}
        >
          Solution
        </h2>
      </section>

      <section aria-labelledby="impacts" className="mt-[3.75rem]">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="impacts"
          tabIndex={-1}
        >
          Impacts
        </h2>
      </section>
    </article>
  );
}

import Image from 'next/image';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

export function CheckoutLatencyReductionCaseStudy() {
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
            PayPal Branded Checkout helps customers complete purchases with
            PayPal. At this high-intent moment, speed is essential: delays
            interrupt momentum, erode confidence, and increase the risk of
            abandonment.
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
            As a dynamic, data-dependent experience, PayPal Branded Checkout
            presents different content and flows for each transaction, making
            latency difficult to predict and optimize.
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>
              Checkout flows require different combinations of data and UI.
            </li>
            <li>Downstream services have variable response times.</li>
            <li>
              Some operations must run sequentially to preserve payment
              correctness.
            </li>
            <li>
              Buyer devices, browsers, and network conditions vary widely.
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
        <div className="mt-5 max-w-2xl space-y-10">
          <section aria-labelledby="page-load-latency">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="page-load-latency"
              tabIndex={-1}
            >
              Page-load latency
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
              The page-load path was optimized across four stages, from the
              initial server request to an interactive checkout experience.
            </p>

            <div className="mt-8 space-y-10 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
              <section aria-labelledby="prepare-request-early">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  01
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="prepare-request-early"
                  tabIndex={-1}
                >
                  Prepare the request early
                </h4>
                <p className="mt-4">
                  A custom Express server prepared each request before handing
                  it to Next.js.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>Validate authentication before rendering begins.</li>
                  <li>
                    Start fetching Checkout Context while the remaining
                    middleware runs, then share the in-flight result.
                  </li>
                  <li>
                    Store prepared request state in a request-scoped{' '}
                    <code>AsyncLocalStorage</code> context for Server Components
                    to access.
                  </li>
                  <li>Hand the prepared request to Next.js.</li>
                </ul>
              </section>

              <section aria-labelledby="render-personalized-checkout">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  02
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="render-personalized-checkout"
                  tabIndex={-1}
                >
                  Render the personalized checkout
                </h4>
                <p className="mt-4">
                  Next.js rendered the transaction-specific Server Component
                  tree for each request.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>Fetch critical checkout data on the server.</li>
                  <li>Prefetch non-critical queries concurrently.</li>
                  <li>Render fallback UI for slower sections.</li>
                  <li>
                    Keep non-interactive code out of the browser to reduce
                    client bundle size.
                  </li>
                </ul>
                <SolutionMedia className="mt-6" variant="rendering" />
              </section>

              <section aria-labelledby="stream-ready-sections">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  03
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="stream-ready-sections"
                  tabIndex={-1}
                >
                  Stream ready sections first
                </h4>
                <p className="mt-4">
                  Suspense boundaries allowed useful content to arrive while
                  slower sections continued rendering.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>
                    Keep one slow section from blocking the rest of the page.
                  </li>
                  <li>
                    Send ready content and fallback UI immediately, then replace
                    fallbacks progressively.
                  </li>
                  <li>
                    Disable response buffering so streamed chunks reach the
                    browser as they become available.
                  </li>
                </ul>
                <SolutionMedia className="mt-6" variant="streaming" />
              </section>

              <section aria-labelledby="hydrate-interactive-controls">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  04
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="hydrate-interactive-controls"
                  tabIndex={-1}
                >
                  Hydrate interactive controls
                </h4>
                <p className="mt-4">
                  The browser made Client Components interactive while
                  preserving the server-rendered experience.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>
                    Attach event handlers and client state without rebuilding
                    the page.
                  </li>
                  <li>
                    Hydrate independent boundaries without waiting for the
                    entire checkout.
                  </li>
                  <li>
                    Reuse server-fetched query state instead of repeating
                    browser requests and loading states.
                  </li>
                </ul>
              </section>
            </div>
          </section>

          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

          <section aria-labelledby="downstream-request-latency">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="downstream-request-latency"
              tabIndex={-1}
            >
              Downstream request latency
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
              We reduced downstream latency by reusing shared requests and
              cached results, fetching independent data concurrently,
              aggregating related operations, and coordinating retries across
              application layers.
            </p>

            <div className="mt-8 space-y-10 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
              <section aria-labelledby="avoid-unnecessary-downstream-work">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  01
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="avoid-unnecessary-downstream-work"
                  tabIndex={-1}
                >
                  Avoid unnecessary downstream work
                </h4>
                <p className="mt-4">
                  Server-side data access reused the prepared Checkout Context
                  to determine which downstream operations were required.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>
                    Reuse the preloaded Checkout Context across server-side
                    consumers.
                  </li>
                  <li>
                    Use flow, merchant, and integration metadata to select the
                    required downstream operations.
                  </li>
                  <li>Short-circuit invalid requests before dispatch.</li>
                </ul>
              </section>

              <section aria-labelledby="deduplicate-queries">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  02
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="deduplicate-queries"
                  tabIndex={-1}
                >
                  Deduplicate queries within each request
                </h4>
                <p className="mt-4">
                  Identical reads were collapsed into one downstream operation
                  while cached data remained isolated to the current request and
                  buyer.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>
                    Execute tRPC queries through TanStack Query (React Query) to
                    reuse cached results and in-flight requests.
                  </li>
                  <li>
                    Use a custom request-scoped tRPC promise cache as a second
                    safeguard against duplicate downstream reads.
                  </li>
                  <li>
                    Exclude mutations from caching and issue a fresh downstream
                    request after a cached query fails.
                  </li>
                </ul>
                <SolutionMedia className="mt-6" variant="deduplication" />
              </section>

              <section aria-labelledby="parallelize-and-aggregate">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  03
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="parallelize-and-aggregate"
                  tabIndex={-1}
                >
                  Parallelize and aggregate data fetching
                </h4>
                <p className="mt-4">
                  Independent data was fetched concurrently, while related
                  backend requirements were combined into fewer operations.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>
                    Fetch independent data concurrently while preserving the
                    required order of dependent operations.
                  </li>
                  <li>
                    Aggregate related data requirements to reduce downstream
                    round trips.
                  </li>
                </ul>
                <SolutionMedia className="mt-6" variant="parallelization" />
              </section>

              <section aria-labelledby="coordinate-retries-and-timeouts">
                <p className="text-xs font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
                  04
                </p>
                <h4
                  className="mt-2 scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
                  id="coordinate-retries-and-timeouts"
                  tabIndex={-1}
                >
                  Coordinate retries and timeouts
                </h4>
                <p className="mt-4">
                  Retry and timeout policies recovered from transient failures
                  without allowing nested retries or slow services to extend
                  latency indefinitely.
                </p>
                <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
                  <li>
                    Retry transient network and server failures, but not
                    authentication, validation, or business errors.
                  </li>
                  <li>
                    Enforce retry limits and timeouts to bound waits on slow or
                    failing downstream services.
                  </li>
                </ul>
              </section>
            </div>
          </section>

          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

          <section aria-labelledby="measurement-and-regression-protection">
            {/* TODO: Link this section to the atomic-events case study. */}
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="measurement-and-regression-protection"
              tabIndex={-1}
            >
              Measurement and regression protection
            </h3>
            <p className="mt-4 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
              We measured latency across the checkout lifecycle and added
              automated safeguards to detect regressions before and after
              release.
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 text-sm leading-6 text-[#55574f] marker:text-[#168465] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af] dark:marker:text-[#71d9b7]">
              <li>End-to-end latency measurement and tracing.</li>
              <li>Percentile-based dashboards and regression alerts.</li>
              <li>
                Automated bundle-size budgets and pull-request comparisons.
              </li>
            </ul>
          </section>
        </div>
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

const solutionImages = {
  rendering: {
    src: '/images/case-studies/checkout-latency-ryp-loading-carousel.webp',
    alt: 'Illustrative PayPal checkout rendering a personalized shell with loading placeholders for payment options and customer details',
    width: 1710,
    height: 1962,
  },
  deduplication: {
    src: '/images/case-studies/checkout-latency-query-deduplication.svg',
    alt: 'Three wallet reads within one checkout request share the TanStack Query cache and tRPC promise cache, producing one downstream backend call',
    width: 2000,
    height: 1600,
  },
  parallelization: {
    src: '/images/case-studies/checkout-latency-parallel-aggregate.svg',
    alt: 'Sequential wallet, contact, and order requests compared with independent requests starting in parallel and becoming ready sooner',
    width: 2000,
    height: 860,
  },
} as const;

function SolutionMedia({
  className = '',
  variant,
}: {
  className?: string;
  variant: keyof typeof solutionImages | 'streaming';
}) {
  if (variant === 'streaming') {
    return (
      <figure className={`mx-auto w-full max-w-lg ${className}`}>
        <picture>
          <source
            media="(prefers-reduced-motion: reduce)"
            srcSet="/images/case-studies/checkout-latency-ryp-streaming-poster.webp"
            type="image/webp"
          />
          <Image
            alt="Illustrative PayPal checkout progressively loading payment options and customer details"
            className="h-auto w-full rounded-[18px] bg-white"
            height={976}
            src="/images/case-studies/checkout-latency-ryp-streaming.gif"
            unoptimized
            width={1026}
          />
        </picture>
      </figure>
    );
  }

  const image = solutionImages[variant];

  return (
    <figure
      className={`mx-auto w-full ${variant === 'rendering' ? 'max-w-lg' : 'max-w-2xl'} ${className}`}
    >
      <Image
        alt={image.alt}
        className="h-auto w-full rounded-[18px] bg-white"
        height={image.height}
        sizes="(max-width: 760px) 100vw, 42rem"
        src={image.src}
        width={image.width}
      />
    </figure>
  );
}

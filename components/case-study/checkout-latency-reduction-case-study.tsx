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
                <PageLoadDemoImage className="mt-6" variant="rendering" />
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
                <PageLoadDemoImage className="mt-6" variant="streaming" />
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
          </section>

          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

          <section aria-labelledby="measurement-and-regression-protection">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="measurement-and-regression-protection"
              tabIndex={-1}
            >
              Measurement and regression protection
            </h3>
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

function PageLoadDemoImage({
  className = '',
  variant,
}: {
  className?: string;
  variant: 'rendering' | 'streaming';
}) {
  return (
    <div
      aria-label={
        variant === 'rendering'
          ? 'Demo image placeholder for personalized server rendering'
          : 'Demo image placeholder for progressive streaming'
      }
      className={`mx-auto flex aspect-[4/3] w-full max-w-lg flex-col overflow-hidden rounded-[18px] bg-[#f3f5ef] p-4 dark:bg-[#20221d] ${className}`}
      role="img"
    >
      <p className="text-[0.625rem] font-medium tracking-[0.12em] text-[#168465] uppercase dark:text-[#71d9b7]">
        Demo image
      </p>
      {variant === 'rendering' ? (
        <div className="mt-3 grid flex-1 grid-rows-[1.5rem_1fr] overflow-hidden rounded-xl bg-white dark:bg-[#161713]">
          <div className="flex h-6 items-center gap-1.5 bg-[#e5e7df] px-3 dark:bg-[#30322b]">
            <span className="size-1.5 rounded-full bg-[#777970]/45 dark:bg-[#989b91]/45" />
            <span className="size-1.5 rounded-full bg-[#777970]/45 dark:bg-[#989b91]/45" />
            <span className="size-1.5 rounded-full bg-[#777970]/45 dark:bg-[#989b91]/45" />
          </div>
          <div className="grid grid-cols-[1fr_0.75fr] gap-3 p-3">
            <div className="rounded-lg bg-[#e6e8e0] dark:bg-[#292b25]" />
            <div className="space-y-2 pt-1">
              <div className="h-2 rounded-full bg-[#d7d9d1] dark:bg-[#34362f]" />
              <div className="h-2 w-3/4 rounded-full bg-[#d7d9d1] dark:bg-[#34362f]" />
              <div className="h-2 w-11/12 rounded-full bg-[#d7d9d1] dark:bg-[#34362f]" />
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 flex-col justify-center gap-5 py-3">
          <DemoStreamRow width="45%" />
          <DemoStreamRow width="72%" />
          <DemoStreamRow width="100%" />
        </div>
      )}
    </div>
  );
}

function DemoStreamRow({ width }: { width: string }) {
  return (
    <div className="h-3 overflow-hidden rounded-full bg-[#dfe1d9] dark:bg-[#30322b]">
      <div
        className="h-full rounded-full bg-[#168465] dark:bg-[#71d9b7]"
        style={{ width }}
      />
    </div>
  );
}

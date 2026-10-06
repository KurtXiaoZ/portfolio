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

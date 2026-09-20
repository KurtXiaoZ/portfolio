import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';
import { TableOfContents } from '@/components/table-of-contents/table-of-contents';

const tableOfContentsLinks = [
  { href: '#context', text: 'Context' },
  { href: '#problem', text: 'Problem' },
] as const;

export function AtomicEventsCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 min-[1200px]:mr-auto min-[1200px]:ml-36 min-[1200px]:w-[calc(100%-9rem)] max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <TableOfContents
        className="left-4 z-10 hidden w-28 min-[1200px]:block"
        links={tableOfContentsLinks}
      />

      <section aria-labelledby="context" className="pt-20 max-[760px]:pt-12">
        <h1
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="context"
          tabIndex={-1}
        >
          Context
        </h1>
        <div className="mt-7 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            At its core, PayPal Branded Checkout is a transaction form designed
            to help customers pay reliably, quickly, and with flexibility.
            Delivering those qualities at PayPal’s scale creates a strong need
            for observability:
          </p>
          <ul className="list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>Monitor application health to ensure reliability.</li>
            <li>
              Measure performance and customer-perceived latency to ensure
              speed.
            </li>
            <li>
              Understand how customers interact with checkout to identify the
              payment options and offers most valuable to them.
            </li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="problem" className="mt-18">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="problem"
          tabIndex={-1}
        >
          Problem
        </h2>
        <div className="mt-6 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            However, the flexibility PayPal Checkout provides also creates
            significant observability challenges:
          </p>
          <ul className="list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>
              PayPal Checkout integrates services and payment options such as
              Buy Now, Pay Later and PayPal’s credit and debit card products.
              These experiences may be implemented in separate repositories,
              owned by different teams, and instrumented according to different
              standards.
            </li>
            <li>
              Most customer actions depend on multiple downstream services. How
              can we measure their performance and outcomes holistically, from
              the customer’s perspective?
            </li>
            <li>
              Some customer interactions span multiple application domains. How
              can we preserve and consistently instrument the same interaction
              as ownership passes from one domain to another?
            </li>
            <li>
              Clicks are the primary user action in PayPal’s form-based checkout
              experience, but their meaning varies according to the customer’s
              intent and context. How can we instrument these interactions using
              a consistent vocabulary and model?
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

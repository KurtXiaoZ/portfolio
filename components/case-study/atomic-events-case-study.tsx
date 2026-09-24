import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';
import { TableOfContents } from '@/components/table-of-contents/table-of-contents';

const tableOfContentsLinks = [
  { href: '#context', text: 'Context' },
  { href: '#problem', text: 'Problem' },
] as const;

const observabilityChallenges = [
  'Checkout experiences spanned teams and repositories with different telemetry standards.',
  'Customer actions crossed multiple services, making end-to-end performance and outcomes difficult to measure.',
  'Interactions crossing application domains were difficult to identify and instrument consistently.',
  'A click’s meaning varied with customer intent and checkout context.',
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
            to help customers pay reliably, quickly, and with flexibility. At
            PayPal’s scale, doing so requires observability across:
          </p>
          <ul className="list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>Application health</li>
            <li>Customer-perceived performance</li>
            <li>User journeys and optimization opportunities</li>
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
        <div className="mt-6 max-w-2xl text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            However, the flexibility PayPal Checkout provides also creates
            significant observability challenges:
          </p>
          <ol className="mt-9 space-y-12 max-[560px]:space-y-10">
            {observabilityChallenges.map((challenge, index) => (
              <li
                className="grid items-center gap-7 min-[620px]:grid-cols-2 min-[620px]:gap-9"
                key={challenge}
              >
                <ProblemVisual
                  className={index % 2 === 1 ? 'min-[620px]:order-2' : ''}
                  variant={index}
                />
                <div>
                  <span className="mb-3 block text-xs font-medium tracking-[0.12em] text-[#168465] dark:text-[#71d9b7]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <p>{challenge}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>
    </article>
  );
}

function ProblemVisual({
  className = '',
  variant,
}: {
  className?: string;
  variant: number;
}) {
  const sharedClassName = `relative aspect-[4/3] overflow-hidden rounded-[18px] ${className}`;

  if (variant === 0) {
    return (
      <div
        aria-hidden="true"
        className={`${sharedClassName} bg-[#e8edf8] dark:bg-[#242a35]`}
      >
        <div className="absolute top-[18%] left-[13%] h-[58%] w-[28%] rotate-[-9deg] rounded-[22px] bg-[#859de5] dark:bg-[#7289cd]" />
        <div className="absolute top-[30%] left-[38%] h-[52%] w-[25%] rotate-[7deg] rounded-full bg-[#f0c55b] dark:bg-[#c9a54d]" />
        <div className="absolute top-[13%] right-[10%] h-[45%] w-[30%] rotate-[15deg] rounded-[26px] bg-[#d798c7] dark:bg-[#a8729a]" />
      </div>
    );
  }

  if (variant === 1) {
    return (
      <div
        aria-hidden="true"
        className={`${sharedClassName} bg-[#f5eadf] dark:bg-[#332a23]`}
      >
        <div className="absolute top-[17%] left-[12%] h-[66%] w-[66%] rounded-full border-[18px] border-[#e88868] dark:border-[#bd6c52]" />
        <div className="absolute top-[8%] right-[12%] h-[36%] w-[36%] rounded-[18px] bg-[#805eb8] dark:bg-[#785ca3]" />
        <div className="absolute right-[18%] bottom-[13%] h-[18%] w-[48%] rotate-[-8deg] rounded-full bg-[#e8b845] dark:bg-[#bd963b]" />
      </div>
    );
  }

  if (variant === 2) {
    return (
      <div
        aria-hidden="true"
        className={`${sharedClassName} bg-[#e3f0e7] dark:bg-[#223128]`}
      >
        <div className="absolute top-[14%] left-[12%] h-[72%] w-[22%] rounded-full bg-[#4e9b76] dark:bg-[#4c8b6d]" />
        <div className="absolute top-[23%] left-[39%] h-[55%] w-[49%] rotate-[-7deg] rounded-[24px] bg-[#9bc95d] dark:bg-[#7da44d]" />
        <div className="absolute top-[8%] right-[13%] h-[25%] w-[25%] rounded-full bg-[#f1cc63] dark:bg-[#c3a550]" />
      </div>
    );
  }

  return (
    <div
      aria-hidden="true"
      className={`${sharedClassName} bg-[#efe8f5] dark:bg-[#302837]`}
    >
      <div className="absolute top-[16%] left-[11%] h-[24%] w-[62%] rotate-[8deg] rounded-full bg-[#aa7ed1] dark:bg-[#8865a8]" />
      <div className="absolute top-[42%] right-[9%] h-[40%] w-[40%] rounded-[24px] bg-[#ef8b70] dark:bg-[#bd6d59]" />
      <div className="absolute bottom-[12%] left-[17%] h-[32%] w-[32%] rotate-[-12deg] rounded-full bg-[#62a9bf] dark:bg-[#558da0]" />
    </div>
  );
}

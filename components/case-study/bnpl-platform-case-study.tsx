import Image from 'next/image';
import type { ReactNode } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

const sharedContextExample = `const BNPLContext = createContext(null);

function BNPLProvider({ config, onComplete, onError, children }) {
  const [state, dispatch] = useReducer(integrationReducer, config);

  return (
    <BNPLContext.Provider value={{ state, dispatch, onComplete, onError }}>
      {children}
    </BNPLContext.Provider>
  );
}

function Checkout() {
  return (
    <BNPLProvider
      config={checkoutConfig}
      onComplete={handleApplicationComplete}
      onError={handleApplicationError}
    >
      <OfferSelector />
      <ContinueButton />
      <IframeLauncher />
    </BNPLProvider>
  );
}

function useBNPL() {
  return useContext(BNPLContext);
}`;

const headingClassName =
  'max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]';

const bodyClassName =
  'mt-5 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]';

export function BnplPlatformCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <section aria-labelledby="context" className="pt-20 max-[760px]:pt-12">
        <h1 className={headingClassName} id="context" tabIndex={-1}>
          Context
        </h1>
        <div className={bodyClassName}>
          <p>
            PayPal offers a range of buy now, pay later (BNPL) products that
            form a major part of its business.
          </p>
        </div>
      </section>

      <CaseStudySection id="problem" title="Problem">
        <p>
          Making BNPL products available across checkout experiences introduced
          several integration challenges:
        </p>
        <ul className="list-disc space-y-4 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
          <li>
            <strong>Multiple entry points to the same BNPL experience:</strong>{' '}
            Different checkout experiences needed access to the same BNPL
            capabilities through a reusable integration.
          </li>
          <li>
            <strong>Coupled development and releases:</strong> BNPL’s distinct
            UI, endpoints, and downstream services needed to evolve without
            requiring coordinated changes across checkout.
          </li>
          <li>
            <strong>Fragmented purchase journeys:</strong> Moving buyers between
            credit applications and checkout could disrupt context and
            complicate the return to payment.
          </li>
        </ul>
      </CaseStudySection>

      <CaseStudySection id="solution" title="Solution">
        <p>
          We built a reusable iframe-based integration that connected multiple
          checkout entry points to the same BNPL experience, allowed BNPL and
          checkout to evolve independently, and preserved a seamless checkout
          journey.
        </p>
        <figure>
          <div className="relative aspect-[15/8] overflow-hidden rounded-[18px] bg-[#ffc857]">
            <Image
              alt="Illustrative checkout containing an embedded BNPL application with payment plan options"
              className="object-cover"
              fill
              sizes="(max-width: 760px) 100vw, 42rem"
              src="/images/case-studies/bnpl-platform-placeholder.svg"
            />
          </div>
          <figcaption className="mt-3 text-xs leading-5 text-[#777970] dark:text-[#989b91]">
            Illustrative integration mockup.
          </figcaption>
        </figure>

        <div className="pt-3">
          <h3 className="text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] dark:text-[#dedfd8]">
            Setup and context
          </h3>
          <p className="mt-4">
            Each checkout entry point initialized a shared React provider with
            checkout configuration and callbacks for application outcomes and
            errors. The provider coordinated integration state and supported
            recovery across interruptions.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Shared context
          </h4>
          <p className="mt-4">
            React Context and hooks made checkout configuration, integration
            state, and outcome/error callbacks available to components using the
            integration.
          </p>
          <p className="mt-4" id="shared-context-description">
            The following simplified example illustrates how the provider shared
            state and callbacks. Types, reducer logic, and checkout handlers are
            omitted.
          </p>
          <pre
            aria-describedby="shared-context-description"
            aria-label="Simplified BNPL provider and shared context example"
            className="mt-5 overflow-x-auto rounded-[18px] bg-[#f3f5ef] p-5 text-xs leading-6 text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:bg-[#20221d] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
            tabIndex={0}
          >
            <code>{sharedContextExample}</code>
          </pre>
        </div>

        <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

        <div>
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Session recovery
          </h4>
          <p className="mt-4">
            The provider persisted relevant integration state so checkout could
            recover after a refresh or authentication redirect.
          </p>
          <ul className="mt-4 list-disc space-y-4 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>
              <strong>Persist:</strong> Serialize integration state to{' '}
              <code>sessionStorage</code> after state updates, keyed by checkout
              session.
            </li>
            <li>
              <strong>Recover:</strong> Restore saved state with fresh checkout
              configuration, reset processing statuses, and resume previously
              requested launches.
            </li>
            <li>
              <strong>Fallback:</strong> Keep state in memory when storage is
              unavailable, starting fresh on reload.
            </li>
          </ul>
        </div>
      </CaseStudySection>
    </article>
  );
}

function CaseStudySection({
  children,
  id,
  title,
}: {
  children: ReactNode;
  id: string;
  title: string;
}) {
  return (
    <section aria-labelledby={id} className="mt-[3.75rem]">
      <h2 className={headingClassName} id={id} tabIndex={-1}>
        {title}
      </h2>
      <div className={bodyClassName}>{children}</div>
    </section>
  );
}

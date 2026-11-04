import Image from 'next/image';
import type { ReactNode } from 'react';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';
import {
  InitializationVisual,
  LaunchScenariosVisual,
  PreloadVisual,
  ProductFlowsVisual,
  ReadinessVisual,
  SelectionChangeVisual,
} from '@/components/case-study/bnpl-launch-visuals';

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

const preloadIframeExample = `function PreloadIframe() {
  const iframeRef = useRef(null);

  useEffect(() => {
    const doc = iframeRef.current.contentDocument;
    doc.open();
    doc.write(\`
      <!DOCTYPE html>
      <html>
        <body>
          <div id="bnpl-root"></div>
          <script src="/assets/bnpl-app.js"></script>
        </body>
      </html>
    \`);
    doc.close();
  }, []);

  return (
    <iframe
      ref={iframeRef}
      title="BNPL application"
      style={{ display: "none" }}
    />
  );
}`;

const checkoutInitializationExample = `const appWindow = iframeRef.current.contentWindow;

appWindow.checkoutBridge = {
  context: { session: checkoutSession, offer: selectedOffer, locale },
  onReady: () => setApplicationReady(true),
  onComplete: handleApplicationComplete,
  onError: handleApplicationError,
};

await appWindow.bnplApp.initialize();`;

const applicationInitializationExample = `window.bnplApp = {
  async initialize() {
    const { context, onReady } = window.checkoutBridge;

    await loadStylesAndLocalization(context.locale);
    renderApplication({ context, onReady });
  },
};`;

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
          <ImplementationDetails label="View shared context example">
            <p id="shared-context-description">
              Simplified JSX; types, reducer logic, and checkout handlers are
              omitted.
            </p>
            <CodeExample
              descriptionId="shared-context-description"
              label="Simplified BNPL provider and shared context example"
            >
              {sharedContextExample}
            </CodeExample>
          </ImplementationDetails>
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

        <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

        <div className="pt-3">
          <h3
            className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] dark:text-[#dedfd8]"
            id="preload-and-launch"
          >
            Preload and launch
          </h3>
          <p className="mt-4">
            Prepare early. Open when the buyer and the application are ready.
          </p>
        </div>

        <div>
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Preload
          </h4>
          <PreloadVisual />
          <ImplementationDetails label="View iframe implementation">
            <p id="preload-iframe-description">
              A simplified HTML shell loads the selected application’s bundle.
              The asset path is illustrative.
            </p>
            <CodeExample
              descriptionId="preload-iframe-description"
              label="Simplified hidden iframe preload example"
            >
              {preloadIframeExample}
            </CodeExample>
          </ImplementationDetails>
        </div>

        <div className="pt-5">
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Initialize
          </h4>
          <InitializationVisual />
          <ImplementationDetails label="View initialization examples">
            <p id="initialization-description">
              Simplified names illustrate the contract. Business logic and error
              handling are omitted.
            </p>
            <p className="mt-5 font-medium">Checkout side</p>
            <CodeExample
              descriptionId="initialization-description"
              label="Simplified checkout initialization example"
            >
              {checkoutInitializationExample}
            </CodeExample>
            <p className="mt-5 font-medium">BNPL application side</p>
            <CodeExample
              descriptionId="initialization-description"
              label="Simplified BNPL application initialization example"
            >
              {applicationInitializationExample}
            </CodeExample>
          </ImplementationDetails>
        </div>

        <div className="pt-5">
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Readiness
          </h4>
          <ReadinessVisual />
        </div>

        <div className="pt-5">
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Launch
          </h4>
          <LaunchScenariosVisual />
        </div>

        <div className="pt-5">
          <h4 className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Selection changes
          </h4>
          <SelectionChangeVisual />
        </div>

        <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

        <section aria-labelledby="product-flows" className="pt-3">
          <h3
            className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] dark:text-[#dedfd8]"
            id="product-flows"
          >
            Product flows inside the embedded application
          </h3>
          <p className="mt-4">
            Once initialized, the financing application used the selected offer
            and checkout details to choose the experience to display. Shared
            logic managed screens, application state, and requests to credit
            services. Product configuration defined the steps, form fields, and
            disclosures.
          </p>
          <ProductFlowsVisual />
        </section>

        <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />

        <section aria-labelledby="completion" className="pt-3">
          <h3
            className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] dark:text-[#dedfd8]"
            id="completion"
          >
            Completion
          </h3>
          <p className="mt-4">
            When the BNPL application ended, the integration returned its result
            and control to checkout. Checkout applied the outcome and retained
            responsibility for payment authorization.
          </p>
          <figure className="mt-5">
            <div
              aria-label="Completion sequence diagram; scroll horizontally on smaller screens"
              className="overflow-x-auto rounded-[18px] border border-[#171814]/10 bg-white p-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:border-[#f0f0e9]/15 dark:focus-visible:outline-[#c6ec39]"
              role="region"
              tabIndex={0}
            >
              <Image
                alt="Sequence diagram: the embedded BNPL application reports its outcome to the iframe integration, which closes the iframe by default and invokes checkout’s completion callback. Checkout applies the application outcome."
                className="h-auto w-full min-w-[640px]"
                height={473}
                src="/images/case-studies/bnpl-completion.svg"
                width={788}
              />
            </div>
          </figure>
        </section>
      </CaseStudySection>

      <CaseStudySection id="impacts" title="Impacts">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-7 max-[560px]:grid-cols-1">
          <div className="border-t border-[#171814]/10 pt-5 dark:border-[#f0f0e9]/15">
            <dt className="text-xs font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
              Adoption
            </dt>
            <dd className="mt-4">
              <span className="block text-4xl leading-none font-medium tracking-[-0.04em] text-[#168465] dark:text-[#71d9b7]">
                18
              </span>
              <span className="mt-3 block">
                BNPL products integrated through the reusable embedded platform.
              </span>
            </dd>
          </div>
          <div className="border-t border-[#171814]/10 pt-5 dark:border-[#f0f0e9]/15">
            <dt className="text-xs font-medium tracking-[0.12em] text-[#777970] uppercase dark:text-[#989b91]">
              Scale
            </dt>
            <dd className="mt-4">
              <span className="block text-4xl leading-none font-medium tracking-[-0.04em] text-[#168465] dark:text-[#71d9b7]">
                840K
              </span>
              <span className="mt-3 block">
                Applications supported per day.
              </span>
            </dd>
          </div>
        </dl>
      </CaseStudySection>
    </article>
  );
}

function ImplementationDetails({
  children,
  label,
}: {
  children: ReactNode;
  label: string;
}) {
  return (
    <details className="group rounded-xl border border-[#171814]/10 text-xs leading-6 dark:border-[#f0f0e9]/15">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-4 py-3 font-medium text-[#55574f] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] [&::-webkit-details-marker]:hidden dark:text-[#b7b9af] dark:focus-visible:outline-[#c6ec39]">
        {label}
        <span
          aria-hidden="true"
          className="text-lg transition-transform group-open:rotate-45 motion-reduce:transition-none"
        >
          +
        </span>
      </summary>
      <div className="min-w-0 px-4 pb-4">{children}</div>
    </details>
  );
}

function CodeExample({
  children,
  descriptionId,
  label,
}: {
  children: string;
  descriptionId: string;
  label: string;
}) {
  return (
    <pre
      aria-describedby={descriptionId}
      aria-label={label}
      className="mt-5 overflow-x-auto rounded-[18px] bg-[#f3f5ef] p-5 text-xs leading-6 text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:bg-[#20221d] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
      tabIndex={0}
    >
      <code>{children}</code>
    </pre>
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

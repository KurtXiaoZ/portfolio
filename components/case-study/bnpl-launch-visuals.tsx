import type { ReactNode } from 'react';

import styles from './bnpl-launch-visuals.module.css';

export function PreloadVisual() {
  return (
    <Visual
      caption="Mount a hidden, same-origin iframe and load the embedded application’s code into it. Checkout stays visible."
      label="01 / Load the code"
    >
      <div className={styles.preloadGrid}>
        <div>
          <p className={styles.smallLabel}>Buyer sees</p>
          <div className={styles.browser}>
            <BrowserBar />
            <div className={styles.screen}>
              <p className={styles.screenTitle}>Checkout</p>
              <div className={styles.skeleton} />
              <div className={styles.selectedOffer}>
                <span className={styles.radio} />
                <span>Pay over time</span>
                <Check />
              </div>
              <div className={styles.mockButton}>Continue</div>
            </div>
          </div>
        </div>
        <span aria-hidden="true" className={styles.betweenArrow}>
          →
        </span>
        <div>
          <p className={styles.smallLabel}>Behind the scenes</p>
          <div className={styles.hiddenFrame}>
            <span className={styles.frameLabel}>Hidden iframe</span>
            <div className={styles.bundle}>
              <span aria-hidden="true" className={styles.codeIcon}>
                ‹/›
              </span>
              <span>Application bundle</span>
            </div>
            <div className={styles.progressTrack}>
              <span />
            </div>
            <p className={styles.muted}>Loading into its own document</p>
          </div>
        </div>
      </div>
    </Visual>
  );
}

export function AppStartVisual() {
  return (
    <Visual
      caption="Checkout supplies context and callbacks, then invokes the initialization function exposed by the loaded application. The application loads supporting resources, mounts its interface, and starts asynchronous work such as retrieving product data."
      label="02 / Start the application"
    >
      <div className={styles.handshake}>
        <div className={styles.endpoints}>
          <span>Checkout</span>
          <span>BNPL application</span>
        </div>
        <ol className={styles.messages}>
          <li>
            <p className={styles.messageLabel}>Checkout context + callbacks</p>
            <div aria-hidden="true" className={styles.messageArrow}>
              →
            </div>
            <p className={styles.messageNote}>Invoke initialize()</p>
          </li>
          <li className={styles.applicationWork}>
            <span className={styles.workDots} aria-hidden="true">
              •••
            </span>
            <p>Load styles + localization</p>
            <p>Mount app + start data requests</p>
          </li>
        </ol>
      </div>
    </Visual>
  );
}

export function ReadinessVisual() {
  const stages = [
    ['Code loaded', 'Preload complete', 'code'],
    ['App mounted', 'Startup work begun', 'mount'],
    ['First screen ready', 'Ready for interaction', 'ready'],
  ] as const;

  return (
    <Visual
      caption="The application reports readiness once its first screen is interactive. This signal alone does not make the iframe visible; checkout reveals it at launch."
      label="03 / First screen ready"
    >
      <ol className={styles.milestones}>
        {stages.map(([title, description, variant], index) => (
          <li key={title}>
            <div
              className={`${styles.milestoneArt} ${variant === 'ready' ? styles.readyArt : ''}`}
            >
              {variant === 'code' ? (
                <span className={styles.codeIcon} aria-hidden="true">
                  ‹/›
                </span>
              ) : (
                <div className={styles.miniWindow} aria-hidden="true">
                  <span />
                  <div>{variant === 'ready' ? <Check /> : <i />}</div>
                </div>
              )}
            </div>
            <span className={styles.stepNumber}>0{index + 1}</span>
            <p className={styles.stageTitle}>{title}</p>
            <p className={styles.muted}>{description}</p>
          </li>
        ))}
      </ol>
    </Visual>
  );
}

export function LaunchScenariosVisual() {
  return (
    <Visual
      caption="Checkout makes the iframe visible once the first screen is ready and the buyer has clicked Continue. An earlier click is remembered while checkout shows a loading indicator."
      label="04 / Make the iframe visible"
    >
      <div className={styles.scenarios}>
        <LaunchScenario
          label="Application ready first"
          steps={[
            ['ready', 'Application ready'],
            ['click', 'Buyer clicks Continue'],
            ['open', 'Iframe becomes visible'],
          ]}
        />
        <LaunchScenario
          label="Buyer clicks first"
          steps={[
            ['click', 'Buyer clicks Continue'],
            ['loading', 'Loading until ready'],
            ['open', 'Iframe becomes visible'],
          ]}
        />
      </div>
      <div className={styles.launchRule}>
        <span>Launch requested</span>
        <span aria-label="and">+</span>
        <span>Application ready</span>
        <span aria-label="equals">=</span>
        <strong>Show iframe</strong>
      </div>
    </Visual>
  );
}

export function SelectionChangeVisual() {
  return (
    <Visual
      caption="A selection change clears the pending launch request. Return to preparation when offer details change, or reuse existing preparation when product data is unchanged."
      label="Return path / Follow the latest selection"
    >
      <ol className={styles.selectionSequence}>
        <li>
          <p className={styles.smallLabel}>Before</p>
          <OfferCard offer="A" />
          <span className={styles.pendingBadge}>Launch queued</span>
        </li>
        <li>
          <p className={styles.smallLabel}>Buyer switches</p>
          <div className={styles.switchArt} aria-hidden="true">
            <span>A</span>
            <span>→</span>
            <strong>B</strong>
          </div>
          <span className={styles.clearedBadge}>A launch cleared</span>
        </li>
        <li>
          <p className={styles.smallLabel}>After</p>
          <OfferCard offer="B" />
          <span className={styles.currentBadge}>Prepare current offer</span>
        </li>
      </ol>
    </Visual>
  );
}

export function ProductFlowsVisual() {
  return (
    <Visual
      caption="The application handles the financing journey and returns its outcome to checkout."
      label="One integration, different product flows"
    >
      <div className={styles.productFlow}>
        <div className={styles.productNode}>Checkout</div>
        <div className={styles.productConnection}>
          <span>Checkout and offer details</span>
          <span aria-hidden="true" className={styles.productArrow}>
            →
          </span>
        </div>
        <div className={`${styles.productNode} ${styles.financingNode}`}>
          Embedded BNPL application
        </div>
        <div className={styles.productConnection}>
          <span>Product data</span>
          <span aria-hidden="true" className={styles.productArrow}>
            ↔
          </span>
        </div>
        <div className={styles.productNode}>BNPL downstream services</div>
        <div className={styles.outcomeReturn}>
          <span aria-hidden="true" className={styles.outcomeArrow}>
            ←
          </span>
          <span>Application outcome returns to checkout</span>
        </div>
      </div>
    </Visual>
  );
}

function Visual({
  children,
  caption,
  label,
}: {
  children: ReactNode;
  caption: string;
  label: string;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.canvas}>
        <p className={styles.visualLabel}>{label}</p>
        {children}
      </div>
      <figcaption className={styles.caption}>{caption}</figcaption>
    </figure>
  );
}

function BrowserBar() {
  return (
    <div className={styles.browserBar} aria-hidden="true">
      <i />
      <i />
      <i />
      <span />
    </div>
  );
}

function Check() {
  return (
    <svg
      aria-hidden="true"
      fill="none"
      viewBox="0 0 20 20"
      className={styles.check}
    >
      <path
        d="m5 10 3.5 3.5L15 7"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

function LaunchScenario({
  label,
  steps,
}: {
  label: string;
  steps: readonly (readonly [string, string])[];
}) {
  return (
    <div className={styles.scenario}>
      <p className={styles.scenarioLabel}>{label}</p>
      <ol className={styles.scenarioSteps}>
        {steps.map(([type, text]) => (
          <li key={type}>
            <div
              className={`${styles.scenarioStep} ${type === 'open' ? styles.openStep : ''}`}
            >
              <span
                className={`${styles.statusIcon} ${type === 'loading' ? styles.loadingIcon : ''}`}
                aria-hidden="true"
              >
                {type === 'loading' ? (
                  <span />
                ) : type === 'click' ? (
                  '↗'
                ) : (
                  <Check />
                )}
              </span>
              <span>{text}</span>
              {type === 'open' && (
                <span className={styles.openWindow} aria-hidden="true">
                  <i />
                  <i />
                </span>
              )}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

function OfferCard({ offer }: { offer: string }) {
  return (
    <div className={styles.offerCard}>
      <span className={styles.offerLetter}>{offer}</span>
      <span>Offer {offer}</span>
      <Check />
    </div>
  );
}

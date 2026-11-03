import type { ReactNode } from 'react';

import styles from './bnpl-launch-visuals.module.css';

export function PreloadVisual() {
  return (
    <Visual
      caption="Prepare the application in a hidden, same-origin iframe while the buyer stays in checkout."
      label="01 / Prepare in the background"
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

export function InitializationVisual() {
  return (
    <Visual
      caption="Checkout supplies the context. The application signals when its first screen is ready."
      label="02 / Establish the handshake"
    >
      <div className={styles.handshake}>
        <div className={styles.endpoints}>
          <span>Checkout</span>
          <span>BNPL application</span>
        </div>
        <ol className={styles.messages}>
          <li>
            <p className={styles.messageLabel}>Context + callbacks</p>
            <div aria-hidden="true" className={styles.messageArrow}>
              →
            </div>
            <p className={styles.messageNote}>Request initialization</p>
          </li>
          <li className={styles.applicationWork}>
            <span className={styles.workDots} aria-hidden="true">
              •••
            </span>
            <p>Load resources · mount app · prepare screen</p>
          </li>
          <li>
            <p className={styles.messageLabel}>Ready</p>
            <div
              aria-hidden="true"
              className={`${styles.messageArrow} ${styles.reverseArrow}`}
            >
              ←
            </div>
            <p className={styles.messageNote}>First screen can be displayed</p>
          </li>
        </ol>
      </div>
    </Visual>
  );
}

export function ReadinessVisual() {
  const stages = [
    ['Code loaded', 'Initialization available', 'code'],
    ['App mounted', 'Resources loaded', 'mount'],
    ['Screen ready', 'Product data prepared', 'ready'],
  ] as const;

  return (
    <Visual
      caption="The application can mount before its first screen is ready. Only the final signal means it can be shown."
      label="03 / Three distinct milestones"
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
      caption="Open the application only when both conditions are met: the buyer wants to continue and the application is ready."
      label="04 / Two paths to the same screen"
    >
      <div className={styles.scenarios}>
        <LaunchScenario
          label="Application ready first"
          steps={[
            ['ready', 'Application ready'],
            ['click', 'Buyer clicks Continue'],
            ['open', 'Application opens'],
          ]}
        />
        <LaunchScenario
          label="Buyer clicks first"
          steps={[
            ['click', 'Buyer clicks Continue'],
            ['loading', 'Loading until ready'],
            ['open', 'Application opens'],
          ]}
        />
      </div>
      <div className={styles.launchRule}>
        <span>Launch requested</span>
        <span aria-label="and">+</span>
        <span>Application ready</span>
        <span aria-label="equals">=</span>
        <strong>Open</strong>
      </div>
    </Visual>
  );
}

export function SelectionChangeVisual() {
  return (
    <Visual
      caption="Clear pending launch intent when the selection changes. Reuse preparation if product data is unchanged; reload when offer details change."
      label="05 / Follow the latest selection"
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

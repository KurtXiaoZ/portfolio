'use client';

import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

import styles from './bnpl-lifecycle-stepper.module.css';

const stages = [
  {
    name: 'Preload',
    title: 'Load the code, keep checkout visible',
    description:
      'Mount a hidden, same-origin iframe and load the embedded application’s code. The buyer stays in checkout.',
    status: 'Application code loaded',
    note: 'The application has not started yet.',
  },
  {
    name: 'App start',
    title: 'Start the application in the background',
    description:
      'Supply checkout context and invoke the app’s initialize() function. It loads styles and localization, mounts, and starts data work.',
    status: 'Application starting',
    note: 'Mounted does not mean ready.',
  },
  {
    name: 'Readiness',
    title: 'The first screen is ready',
    description:
      'The application reports that its first screen is interactive. That signal alone does not reveal the iframe.',
    status: 'First screen ready',
    note: 'Ready to show; not shown by this signal.',
  },
  {
    name: 'Launch',
    title: 'Make the iframe visible',
    description:
      'Checkout reveals the application when its first screen is ready and the buyer has clicked Continue. An earlier click is remembered while checkout shows a loading indicator.',
    status: 'Visible in checkout',
    note: 'The buyer can now use the application.',
  },
] as const;

interface BnplLifecycleStepperProps {
  preloadExample: ReactNode;
  appStartExamples: ReactNode;
}

export function BnplLifecycleStepper({
  preloadExample,
  appStartExamples,
}: BnplLifecycleStepperProps) {
  const [step, setStep] = useState(0);
  const [offer, setOffer] = useState<'A' | 'B'>('A');
  const titleRef = useRef<HTMLHeadingElement>(null);
  const focusAfterNavigation = useRef(false);
  const id = useId();
  const stage = stages[step];
  const isLastStep = step === stages.length - 1;

  useEffect(() => {
    if (!focusAfterNavigation.current) return;

    focusAfterNavigation.current = false;
    titleRef.current?.focus({ preventScroll: true });
    titleRef.current?.scrollIntoView({ block: 'start' });
  }, [offer, step]);

  function advance() {
    focusAfterNavigation.current = true;
    if (isLastStep) {
      setOffer((current) => (current === 'A' ? 'B' : 'A'));
      setStep(0);
    } else {
      setStep((current) => current + 1);
    }
  }

  return (
    <div className={styles.stepper}>
      <div className={styles.layout}>
        <nav aria-label="BNPL application lifecycle">
          <ol className={styles.rail}>
            {stages.map(({ name }, index) => (
              <li key={name}>
                <button
                  aria-controls={`${id}-panel`}
                  aria-current={step === index ? 'step' : undefined}
                  className={styles.stageButton}
                  data-complete={index < step || undefined}
                  onClick={() => setStep(index)}
                  type="button"
                >
                  <span aria-hidden="true" className={styles.number}>
                    {index + 1}
                  </span>
                  <span>{name}</span>
                </button>
              </li>
            ))}
          </ol>
        </nav>

        <div
          aria-labelledby={`${id}-title`}
          className={styles.panel}
          id={`${id}-panel`}
          role="region"
        >
          <div className={styles.content} key={step}>
            <h4
              className={styles.title}
              id={`${id}-title`}
              ref={titleRef}
              tabIndex={-1}
            >
              {stage.title}
            </h4>
            <p className={styles.description}>{stage.description}</p>
            <LifecycleScene offer={offer} step={step} />
            {step === 0 && preloadExample}
            {step === 1 && appStartExamples}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p aria-live="polite" className={styles.counter} role="status">
          Step {step + 1} of {stages.length}
          <span className="sr-only">
            : {stage.name}. Offer {offer}. Iframe{' '}
            {isLastStep ? 'visible' : 'hidden'}.
          </span>
        </p>
        <div className={styles.actions}>
          <button
            className={styles.back}
            disabled={step === 0}
            onClick={() => {
              focusAfterNavigation.current = true;
              setStep((current) => Math.max(0, current - 1));
            }}
            type="button"
          >
            Back
          </button>
          <button className={styles.next} onClick={advance} type="button">
            {isLastStep ? 'Change offer ↶' : 'Next step →'}
          </button>
        </div>
      </div>
      <p className={styles.selectionNote}>
        Offer changes clear pending launch requests. Changed details restart
        preparation; unchanged product data can reuse it.
      </p>
    </div>
  );
}

function LifecycleScene({ step, offer }: { step: number; offer: 'A' | 'B' }) {
  const stage = stages[step];
  const visible = step === 3;

  return (
    <div
      aria-label={`${stage.name}: buyer view and embedded application state`}
      className={styles.scene}
      role="group"
    >
      <div className={styles.column}>
        <p className={styles.sceneLabel}>Buyer sees</p>
        <div className={styles.browser}>
          <div aria-hidden="true" className={styles.browserBar}>
            <i />
            <i />
            <i />
            <span />
          </div>
          <div className={styles.browserBody}>
            <p className={styles.browserTitle}>
              {visible ? 'Choose your plan' : 'Checkout'}
            </p>
            {!visible && <div aria-hidden="true" className={styles.skeleton} />}
            <div className={styles.offer}>
              <span aria-hidden="true" className={styles.offerDot} />
              <span>{visible ? 'Pay over time' : `BNPL offer ${offer}`}</span>
            </div>
            {visible && <div aria-hidden="true" className={styles.field} />}
            <div className={styles.illustratedButton}>
              {visible ? 'Continue application' : 'Continue'}
            </div>
          </div>
        </div>
        <p className={styles.sceneNote}>
          {visible ? 'Embedded application shown' : 'Checkout stays visible'}
        </p>
      </div>

      <div className={styles.column}>
        <p className={styles.sceneLabel}>Embedded application</p>
        <div className={styles.application} data-visible={visible}>
          <span className={styles.visibility}>
            Iframe {visible ? 'visible' : 'hidden'}
          </span>
          <div aria-hidden="true" className={styles.applicationIcon}>
            {step === 0 ? '‹/›' : step === 1 ? '···' : <Check />}
          </div>
          <p className={styles.applicationTitle}>{stage.status}</p>
          {step === 0 && (
            <p className={styles.sceneNote}>
              Bundle loaded into its own document
            </p>
          )}
          {step === 1 && (
            <div className={styles.checklist}>
              <span>
                <Check />
                Checkout context
              </span>
              <span>
                <Check />
                Styles + localization
              </span>
              <span>
                <span aria-hidden="true" className={styles.spinner} />
                Mount + data requests
              </span>
            </div>
          )}
          {step === 2 && (
            <div className={styles.readyScreen}>
              <div aria-hidden="true" className={styles.field} />
              <div aria-hidden="true" className={styles.field} />
              <span className={styles.readyLabel}>
                <Check />
                Screen interactive
              </span>
            </div>
          )}
          {step === 3 && (
            <div className={styles.checklist}>
              <span>
                <Check />
                First screen ready
              </span>
              <span>
                <Check />
                Continue requested
              </span>
            </div>
          )}
        </div>
        <p className={styles.sceneNote}>{stage.note}</p>
      </div>
    </div>
  );
}

function Check() {
  return (
    <svg aria-hidden="true" fill="none" viewBox="0 0 20 20">
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

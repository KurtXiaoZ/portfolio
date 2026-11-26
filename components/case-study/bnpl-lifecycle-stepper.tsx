'use client';

import Image from 'next/image';
import { useEffect, useId, useRef, useState, type ReactNode } from 'react';

import styles from './bnpl-lifecycle-stepper.module.css';

const stages = [
  {
    name: 'Preload',
    title: 'Load the code, keep checkout visible',
    description:
      'Mount a hidden, same-origin iframe and load the embedded application’s code. The buyer stays in checkout.',
    image: 'preload',
    imageAlt:
      'Checkout stays visible while a hidden iframe loads the embedded application’s code. The application has not started yet.',
  },
  {
    name: 'App start',
    title: 'Start the application in the background',
    description:
      'Supply checkout context and invoke the app’s initialize() function. It loads styles and localization, mounts, and starts data work.',
    image: 'app-start',
    imageAlt:
      'Checkout stays visible while it supplies context and starts the hidden application, which loads styles and localization, mounts, and begins data requests. Mounted does not mean ready.',
  },
  {
    name: 'Readiness',
    title: 'The first screen is ready',
    description:
      'The application reports that its first screen is interactive. That signal alone does not reveal the iframe.',
    image: 'readiness',
    imageAlt:
      'Checkout stays visible while the embedded Pay Monthly application has its contact-information screen ready. The iframe remains hidden until launch.',
  },
  {
    name: 'Launch',
    title: 'Make the iframe visible',
    description:
      'Checkout reveals the application when its first screen is ready and the buyer has clicked Continue. An earlier click is remembered while checkout shows a loading indicator.',
    image: 'launch',
    imageAlt:
      'The buyer now sees the embedded Pay Monthly contact-information screen because its first screen is ready and Continue has been requested. The iframe is visible.',
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
  }, [step]);

  function advance() {
    focusAfterNavigation.current = true;
    if (isLastStep) {
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
            <Image
              alt={stage.imageAlt}
              className={styles.stageImage}
              height={2778}
              src={`/images/case-studies/bnpl-lifecycle-${stage.image}.webp`}
              unoptimized
              width={3222}
            />
            {step === 0 && preloadExample}
            {step === 1 && appStartExamples}
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <p aria-live="polite" className={styles.counter} role="status">
          Step {step + 1} of {stages.length}
          <span className="sr-only">
            : {stage.name}. Iframe {isLastStep ? 'visible' : 'hidden'}.
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

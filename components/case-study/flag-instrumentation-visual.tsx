import styles from './flag-instrumentation-visual.module.css';

export function FlagInstrumentationVisual() {
  return (
    <figure
      aria-label="Flag evaluation uses shared callbacks to report resolved decisions and evaluation failures to analytics and monitoring. Experiment attribution accompanies decisions when available."
      className={`mt-7 text-xs leading-5 text-[#55574f] dark:text-[#b7b9af] ${styles.root}`}
    >
      <figcaption className="mb-4 font-medium text-[#30312d] dark:text-[#dedfd8]">
        Shared telemetry for every flag:
      </figcaption>
      <div className={styles.flow}>
        <div className="border border-[#171814]/15 px-3 py-4 text-center dark:border-[#f0f0e9]/15">
          <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Flag evaluation
          </p>
          <code className="mt-2 block text-[0.6875rem]">showSummary()</code>
        </div>
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
        <div className="space-y-3">
          <div className="border border-[#168465]/25 bg-[#168465]/[0.04] px-3 py-3 dark:border-[#71d9b7]/25 dark:bg-[#71d9b7]/[0.04]">
            <code className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              onResolve
            </code>
            <p className="mt-1 text-[0.6875rem]">
              Decision + experiment attribution
            </p>
          </div>
          <div className="border border-[#171814]/15 px-3 py-3 dark:border-[#f0f0e9]/15">
            <code className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              onError
            </code>
            <p className="mt-1 text-[0.6875rem]">Evaluation failure</p>
          </div>
        </div>
        <span aria-hidden="true" className={styles.arrow}>
          →
        </span>
        <div className="border border-[#171814]/15 px-3 py-4 text-center dark:border-[#f0f0e9]/15">
          <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Analytics + monitoring
          </p>
          <p className="mt-2 text-[0.6875rem]">
            Conversion, performance, and failure analysis
          </p>
        </div>
      </div>
    </figure>
  );
}

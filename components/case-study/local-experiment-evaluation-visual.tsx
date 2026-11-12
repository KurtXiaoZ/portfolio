import styles from './local-experiment-evaluation-visual.module.css';

export function LocalExperimentEvaluationVisual() {
  return (
    <figure
      aria-label="The downstream experiment service supplies rules at startup and during background refreshes. Within each server instance, requests use those shared rules and their own buyer and checkout context to evaluate experiments locally."
      className={`mt-7 text-xs leading-5 text-[#55574f] dark:text-[#b7b9af] ${styles.root}`}
    >
      <figcaption className="mb-4 font-medium text-[#30312d] dark:text-[#dedfd8]">
        Local decisions from shared experiment rules:
      </figcaption>
      <div className="mx-auto max-w-xs border border-[#171814]/15 px-4 py-3 text-center font-medium text-[#30312d] dark:border-[#f0f0e9]/15 dark:text-[#dedfd8]">
        Downstream experiment service
      </div>
      <p className="my-3 text-center text-[0.6875rem]">
        Preload at startup + refresh in the background
        <span aria-hidden="true" className="mt-1 block">
          ↓
        </span>
      </p>
      <div className="border border-[#171814]/15 p-5 max-[560px]:p-4 dark:border-[#f0f0e9]/15">
        <p className="mb-4 font-medium text-[#30312d] dark:text-[#dedfd8]">
          Scope: one server instance
        </p>
        <div className="mx-auto max-w-xs border border-[#168465]/25 bg-[#168465]/[0.04] px-4 py-3 text-center dark:border-[#71d9b7]/25 dark:bg-[#71d9b7]/[0.04]">
          <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            In-memory experiment rules
          </p>
          <p className="mt-1 text-[0.6875rem]">Shared across requests</p>
        </div>
        <p aria-hidden="true" className="my-3 text-center">
          ↓
        </p>
        <div className={styles.flow}>
          <div className="border border-[#171814]/10 px-3 py-4 text-center dark:border-[#f0f0e9]/10">
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              Request context
            </p>
            <p className="mt-2 text-[0.6875rem]">Buyer + checkout details</p>
          </div>
          <span aria-hidden="true" className={styles.arrow}>
            →
          </span>
          <div className="border border-[#171814]/10 px-3 py-4 text-center dark:border-[#f0f0e9]/10">
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              Evaluate locally
            </p>
            <p className="mt-2 text-[0.6875rem]">No network wait</p>
          </div>
          <span aria-hidden="true" className={styles.arrow}>
            →
          </span>
          <div className="border border-[#171814]/10 px-3 py-4 text-center dark:border-[#f0f0e9]/10">
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              Treatment assignment
            </p>
            <code className="mt-2 block text-[0.6875rem] text-[#168465] dark:text-[#71d9b7]">
              &quot;Compact&quot;
            </code>
          </div>
        </div>
      </div>
    </figure>
  );
}

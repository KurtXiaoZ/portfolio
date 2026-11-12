import styles from './request-scoped-decisions-visual.module.css';

const callers = [
  'Middleware',
  'React Server Component',
  'Server-side rendering',
];

export function RequestScopedDecisionsVisual() {
  return (
    <figure
      aria-label="Middleware, React Server Components, and server-side rendering share the same flag decision within one HTTP request."
      className={`mt-7 text-xs leading-5 text-[#55574f] dark:text-[#b7b9af] ${styles.root}`}
    >
      <figcaption className="mb-3 font-medium text-[#30312d] dark:text-[#dedfd8]">
        Request-scoped decision consistency:
      </figcaption>
      <div className="border border-[#171814]/15 p-5 max-[560px]:p-4 dark:border-[#f0f0e9]/15">
        <div className="mb-5">
          <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Scope: one HTTP request
          </p>
          <p className="mt-2 break-all text-[0.6875rem]">
            <span className="mr-2 font-medium text-[#168465] dark:text-[#71d9b7]">
              GET
            </span>
            <code>https://www.paypal.com/checkout?token=EC-123</code>
          </p>
        </div>

        <div className={styles.diagram}>
          <ul className={styles.callers}>
            {callers.map((caller) => (
              <li
                className={`${styles.caller} border border-[#171814]/10 px-2 dark:border-[#f0f0e9]/10`}
                key={caller}
              >
                <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
                  {caller}
                </p>
                <code className="mt-1 text-[0.6875rem]">showSummary()</code>
              </li>
            ))}
          </ul>

          <svg
            aria-hidden="true"
            className={`${styles.merge} text-[#b9c0b2] dark:text-[#525a48]`}
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 24 272"
          >
            <path
              d="M0 40H12V232H0M0 136H23M19 132L23 136L19 140"
              stroke="currentColor"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
          <span
            aria-hidden="true"
            className={`${styles.mergeDown} text-[#777970] dark:text-[#989b91]`}
          >
            ↓
          </span>

          <div className="border border-[#168465]/25 bg-[#168465]/[0.04] px-3 py-4 text-center dark:border-[#71d9b7]/25 dark:bg-[#71d9b7]/[0.04]">
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              Shared decision cache
            </p>
            <code className="mt-3 block text-[0.6875rem]">new-summary</code>
            <p className="mt-1 font-medium text-[#168465] dark:text-[#71d9b7]">
              true
            </p>
            <p className="mt-3 text-[0.6875rem] text-[#777970] dark:text-[#989b91]">
              Also shares in-flight evaluations
            </p>
          </div>

          <span
            aria-hidden="true"
            className={`${styles.arrow} text-[#777970] dark:text-[#989b91]`}
          >
            →
          </span>

          <div className="border border-[#171814]/10 px-3 py-4 text-center dark:border-[#f0f0e9]/10">
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              Evaluate once
            </p>
            <p className="mt-2 text-[0.6875rem]">
              Only when a decision is needed
            </p>
          </div>
        </div>
      </div>
    </figure>
  );
}

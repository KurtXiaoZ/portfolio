import type { ReactNode } from 'react';

import styles from './bnpl-launch-visuals.module.css';

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

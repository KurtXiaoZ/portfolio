import Image from 'next/image';

import styles from './bnpl-launch-visuals.module.css';

export function ProductFlowsVisual() {
  return (
    <figure className={styles.figure}>
      <Image
        alt="Checkout supplies checkout and offer details to the embedded BNPL application, which exchanges product data with BNPL downstream services and returns the application outcome to checkout"
        className={styles.diagram}
        height={2200}
        src="/images/case-studies/bnpl-product-flows.svg"
        width={2880}
      />
    </figure>
  );
}

export function CompletionVisual() {
  return (
    <figure className={styles.figure}>
      <Image
        alt="Sequence diagram: the embedded BNPL application reports its outcome to the iframe integration, which closes the iframe by default and invokes checkout’s completion callback. Checkout applies the application outcome."
        className={styles.diagram}
        height={1920}
        src="/images/case-studies/bnpl-completion.svg"
        width={2880}
      />
    </figure>
  );
}

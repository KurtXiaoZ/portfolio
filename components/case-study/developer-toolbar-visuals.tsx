import type { ReactNode } from 'react';

import styles from './developer-toolbar-visuals.module.css';

export function ToolbarOverviewVisual() {
  return (
    <Visual
      label="The toolkit, in context"
      description="Mock checkout beside an expanded developer panel with feature flags, response mocks, accessibility checks, and React Scan."
    >
      <div className={styles.workspace}>
        <Checkout />
        <Panel title="Developer toolbar" eyebrow="Built into the experience">
          <div className={styles.toolList}>
            {[
              ['⚑', 'Feature flags', 'Explore configurations'],
              ['{ }', 'Response mocks', 'Reproduce a scenario'],
              ['◎', 'Accessibility', 'Inspect the current screen'],
              ['⌁', 'React Scan', 'See component renders'],
            ].map(([icon, title, detail]) => (
              <div className={styles.toolRow} key={title}>
                <span className={styles.toolIcon}>{icon}</span>
                <div>
                  <strong>{title}</strong>
                  <small>{detail}</small>
                </div>
                <span className={styles.chevron}>›</span>
              </div>
            ))}
          </div>
          <Toolbar />
        </Panel>
      </div>
    </Visual>
  );
}

export function FeatureFlagsVisual() {
  return (
    <Visual
      label="One flag, two checkout states"
      description="Before and after mockups: enabling the illustrative showPayLater flag reveals a Pay later payment option."
      caption="Change a flag, then reload to explore the resulting checkout state."
    >
      <div className={styles.comparison}>
        {[false, true].map((enabled) => (
          <div key={String(enabled)}>
            <p className={styles.stageLabel}>
              {enabled ? 'After · override applied' : 'Before · default'}
            </p>
            <div className={styles.flag}>
              <code>showPayLater</code>
              <span className={enabled ? styles.enabled : styles.disabled}>
                {enabled ? 'true' : 'false'}
              </span>
            </div>
            <Checkout payLater={enabled} />
          </div>
        ))}
      </div>
      <div className={styles.annotation}>
        Pinned flags stay close at hand. Reset overrides to return to defaults.
      </div>
    </Visual>
  );
}

export function ScenariosVisual() {
  return (
    <Visual
      label="From preset to checkout"
      description="A mock preset for an unavailable payment method produces a checkout notice. A small GraphQL response editor shows the corresponding illustrative response."
      caption="Start with a preset; edit the mock response when a scenario needs more detail."
    >
      <div className={styles.workspace}>
        <Panel title="Response mocks" eyebrow="Scenario presets">
          <div className={styles.preset}>
            Standard checkout <span>○</span>
          </div>
          <div className={`${styles.preset} ${styles.selectedPreset}`}>
            Payment unavailable <span>●</span>
          </div>
          <div className={styles.preset}>
            Pay later available <span>○</span>
          </div>
          <p className={styles.panelNote}>Preset loaded</p>
        </Panel>
        <Checkout unavailable />
      </div>
      <div className={styles.editor}>
        <div className={styles.editorHeader}>
          <span>GraphQL response · demo</span>
          <span>Saved</span>
        </div>
        <pre>
          <code>{`{
  "paymentMethod": {
    "available": false
  }
}`}</code>
        </pre>
      </div>
    </Visual>
  );
}

export function AccessibilityVisual() {
  return (
    <Visual
      label="Find the issue where it happens"
      description="Mock accessibility panel with a serious issue expanded: an icon button needs an accessible name. The matching icon in checkout is outlined."
      caption="Read the issue guidance and locate the affected element in the current checkout screen."
    >
      <div className={styles.workspace}>
        <Checkout audit />
        <Panel title="Accessibility" eyebrow="Current screen">
          <div className={styles.severities}>
            <span>Serious · 1</span>
            <span>Moderate · 2</span>
          </div>
          <div className={styles.issue}>
            <span className={styles.issueLabel}>Serious · expanded</span>
            <strong>Button needs an accessible name</strong>
            <p>
              Add a label that describes the button’s purpose for assistive
              technology.
            </p>
            <code>button.help</code>
            <div className={styles.inspected}>↖ Element highlighted</div>
          </div>
        </Panel>
      </div>
    </Visual>
  );
}

export function RenderScanVisual() {
  return (
    <Visual
      label="Render activity, made visible"
      description="Mock React Scan view outlining the payment options and Continue area in purple to illustrate components rendering during a payment selection."
      caption="The purple outlines illustrate components rendering when a payment option changes."
    >
      <div className={styles.scanStage}>
        <div className={styles.scanStatus}>
          <span /> React Scan on
        </div>
        <div className={styles.scanCheckout}>
          <Checkout scan payLater />
        </div>
        <div className={styles.scanLegend}>
          <span /> Render highlight
        </div>
      </div>
    </Visual>
  );
}

export function ToolbarStatesVisual() {
  return (
    <Visual
      label="Ready when you need it"
      description="Four mock toolbar states: a collapsed handle, an expanded toolbar, a pinned toolbar, and a touch target."
    >
      <div className={styles.states}>
        {[
          ['Collapsed', '‹/›', 'Keep checkout in view'],
          ['Expanded', '⚑  { }  ◎  ⌁', 'Tools within reach'],
          ['Pinned', '⚑  { }  ◎  ⌁  ◆', 'Stay open while working'],
          ['Touch', '‹/›', 'The same compact toolkit'],
        ].map(([label, content, detail]) => (
          <div key={label}>
            <div className={styles.stateCanvas}>
              <span
                className={
                  label === 'Touch' ? styles.touchHandle : styles.stateBar
                }
              >
                {content}
              </span>
            </div>
            <strong>{label}</strong>
            <small>{detail}</small>
          </div>
        ))}
      </div>
    </Visual>
  );
}

function Visual({
  children,
  label,
  description,
  caption,
}: {
  children: ReactNode;
  label: string;
  description: string;
  caption?: string;
}) {
  return (
    <figure className={styles.figure}>
      <div className={styles.canvas} role="img" aria-label={description}>
        <div aria-hidden="true">
          <div className={styles.visualHeading}>
            <span>{label}</span>
            <span className={styles.mockLabel}>Mock</span>
          </div>
          {children}
        </div>
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}

function Panel({
  children,
  title,
  eyebrow,
}: {
  children: ReactNode;
  title: string;
  eyebrow: string;
}) {
  return (
    <div className={styles.panel}>
      <p className={styles.panelEyebrow}>{eyebrow}</p>
      <p className={styles.panelTitle}>{title}</p>
      {children}
    </div>
  );
}

function Checkout({
  payLater = false,
  unavailable = false,
  audit = false,
  scan = false,
}: {
  payLater?: boolean;
  unavailable?: boolean;
  audit?: boolean;
  scan?: boolean;
}) {
  return (
    <div className={styles.checkout}>
      <div className={styles.browserBar}>
        <i />
        <i />
        <i />
        <span>checkout / demo</span>
      </div>
      <div className={styles.checkoutBody}>
        <div className={styles.merchant}>
          DEMO STORE <span>$120.00</span>
        </div>
        <div className={styles.checkoutHeading}>
          Choose how to pay{' '}
          <span className={audit ? styles.auditTarget : styles.help}>?</span>
        </div>
        {unavailable && (
          <p className={styles.notice}>
            This payment method is unavailable. Choose another to continue.
          </p>
        )}
        <div className={scan ? styles.renderHighlight : undefined}>
          <div className={styles.payment}>
            <span className={styles.radio} />
            <span>
              <strong>Demo card</strong>
              <small>•••• 1234</small>
            </span>
            <span className={styles.cardIcon}>▰</span>
          </div>
          {payLater && (
            <div className={styles.payLater}>
              <span className={styles.emptyRadio} />
              <span>
                <strong>Pay later</strong>
                <small>Explore payment plans</small>
              </span>
              <span className={styles.newBadge}>New</span>
            </div>
          )}
        </div>
        <div
          className={`${styles.continue} ${scan ? styles.renderHighlight : ''}`}
        >
          Continue
        </div>
        <p className={styles.checkoutFooter}>Illustrative checkout</p>
      </div>
    </div>
  );
}

function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <span>‹/›</span>
      <span>⚑</span>
      <span>{'{ }'}</span>
      <span>◎</span>
      <span>⌁</span>
      <span>◆</span>
    </div>
  );
}

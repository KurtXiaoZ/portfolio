import Image from 'next/image';

import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';

const observabilityChallenges = [
  {
    description:
      'Checkout experiences spanned teams and repositories with different telemetry standards.',
    image: 'problem-01-platform-row-transparent.webp',
    alt: 'Merchant checkout, PayPal sign-in, payment selection, and a Pay in 4 application spanning the checkout platform',
  },
  {
    description:
      'Customer actions crossed multiple services, making end-to-end performance and outcomes difficult to measure.',
    image: 'problem-02-funding-options-waterfall.webp',
    alt: 'Illustrative funding-options request waterfall showing nested service calls and their durations',
  },
  {
    description:
      'Interactions crossing application domains were difficult to identify and instrument consistently.',
    image: 'problem-03-domains-modxo-transparent.webp',
    alt: 'A merchant storefront and PayPal checkout on separate domains, connected by navigation and return arrows',
  },
  {
    description:
      'A click’s meaning varied with customer intent and checkout context.',
    image: 'problem-04-ryp-cta-scenarios.webp',
    alt: 'Two checkout contexts where the primary action is Review Order or Continue to Application',
  },
] as const;

export function AtomicEventsCaseStudy() {
  return (
    <article className="mx-auto w-full max-w-3xl px-10 pt-9 pb-28 max-[960px]:px-7 max-[560px]:px-5">
      <BackToWorkLink />

      <section aria-labelledby="context" className="pt-20 max-[760px]:pt-12">
        <h1
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="context"
          tabIndex={-1}
        >
          Context
        </h1>
        <div className="mt-5 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            At its core, PayPal Branded Checkout is a transaction form designed
            to help customers pay reliably, quickly, and with flexibility. At
            PayPal’s scale, doing so requires observability across:
          </p>
          <ul className="list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>Application health</li>
            <li>Customer-perceived performance</li>
            <li>User journeys and optimization opportunities</li>
          </ul>
        </div>
      </section>

      <section aria-labelledby="problem" className="mt-[3.75rem]">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="problem"
          tabIndex={-1}
        >
          Problem
        </h2>
        <div className="mt-5 max-w-2xl text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            However, the flexibility PayPal Checkout provides also creates
            significant observability challenges:
          </p>
          <ol className="mt-9 space-y-12 max-[560px]:space-y-10">
            {observabilityChallenges.map(
              ({ description, image, alt }, index) => (
                <li
                  className="grid items-center gap-7 min-[620px]:grid-cols-2 min-[620px]:gap-9"
                  key={description}
                >
                  <div
                    className={`relative aspect-[4/3] ${index % 2 === 1 ? 'min-[620px]:order-2' : ''}`}
                  >
                    <Image
                      alt={alt}
                      className="object-contain"
                      fill
                      sizes="(max-width: 619px) 100vw, 21rem"
                      src={`/images/case-studies/${image}`}
                    />
                  </div>
                  <div>
                    <span className="mb-3 block text-xs font-medium tracking-[0.12em] text-[#168465] dark:text-[#71d9b7]">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <p>{description}</p>
                  </div>
                </li>
              ),
            )}
          </ol>
        </div>
      </section>

      <section aria-labelledby="solution" className="mt-[3.75rem]">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="solution"
          tabIndex={-1}
        >
          Solution
        </h2>
        <div className="mt-5 max-w-2xl space-y-5 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            To address these challenges, I designed and built Atomic Events, a
            shared library for measuring customer interactions and perceived
            latency across applications and domains.
          </p>
          <p>
            I partnered with Product, Analytics, and engineering teams to
            translate business and analytics needs into technical requirements.
            Through iterative technical design reviews, we defined Atomic
            Events’ core measurement model:{' '}
            <strong>customer interaction</strong> — the interval from a user’s
            intent to the moment the resulting UI is ready for their next
            action.
          </p>
          <div className="relative aspect-[1717/916] overflow-hidden rounded-[18px] bg-white">
            <Image
              alt="A customer interaction moving from intent, through waiting, to a ready interface"
              className="object-contain"
              fill
              sizes="(max-width: 760px) 100vw, 42rem"
              src="/images/case-studies/atomic-events-interaction-payment-method.webp"
            />
          </div>
          <div>
            <p>Each interaction is defined by:</p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong>Start/intent:</strong> A click, navigation, or initial
                render puts the UI in a waiting state.
              </li>
              <li>
                <strong>Waiting:</strong> Work is in progress, preventing the
                user’s next meaningful action.
              </li>
              <li>
                <strong>End/ready:</strong> The UI becomes usable again; the
                elapsed time is the perceived wait time.
              </li>
              <li>
                <strong>Outcome:</strong>
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>
                    <strong>Ok:</strong> successful.
                  </li>
                  <li>
                    <strong>Cancel:</strong> canceled by the user.
                  </li>
                  <li>
                    <strong>Error:</strong> expected or handled failure.
                  </li>
                  <li>
                    <strong>FCI:</strong> unexpected technical or system
                    failure.
                  </li>
                </ul>
              </li>
              <li>
                <strong>Context:</strong> Relevant details such as intent, type,
                task, flow, owning domain, starting location, and resulting
                view.
              </li>
            </ul>
          </div>
          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />
          <div>
            <p>
              The interaction model maps naturally to a state machine built
              around limited states, event-driven transitions, and explicit
              rules:
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong>Limited states:</strong> The UI is either ready or
                waiting.
              </li>
              <li>
                <strong>Event-driven transitions:</strong> A click, navigation,
                or initial render moves the UI to waiting. A usable result
                returns it to ready.
              </li>
              <li>
                <strong>State guards:</strong> An interaction starts only from
                ready and ends only from waiting, preventing unmatched or
                duplicate events.
              </li>
              <li>
                <strong>Deterministic effects:</strong> State transitions have
                defined effects — preserving context, calculating duration, and
                emitting outcome metrics.
              </li>
            </ol>
            <p className="mt-4">
              The state machine turns this lifecycle into consistent, testable
              behavior across applications.
            </p>
          </div>
          <div className="relative aspect-[15/8] overflow-hidden rounded-[18px] bg-white">
            <Image
              alt="State machine showing the UI transitioning between ready and waiting"
              className="object-contain"
              fill
              sizes="(max-width: 760px) 100vw, 42rem"
              src="/images/case-studies/atomic-events-state-machine.svg"
            />
          </div>
          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />
          <div>
            <h3 className="text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] dark:text-[#dedfd8]">
              Technical decision: an in-house state machine over Redux
            </h3>
            <p className="mt-4">
              We chose a lightweight reducer over Redux for four reasons:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong>Portability:</strong> It needed to work across
                applications with different frameworks and state-management
                approaches.
              </li>
              <li>
                <strong>Focused scope:</strong> With only two states—ready and
                waiting—Redux added unnecessary complexity.
              </li>
              <li>
                <strong>Small footprint:</strong> Avoiding another runtime
                dependency kept the library lightweight.
              </li>
              <li>
                <strong>Controlled API surface:</strong> The public API exposed
                only lifecycle operations, keeping transitions and dispatch
                internal.
              </li>
            </ul>
            <p className="mt-5">
              The in-house state machine provided the core capabilities we
              needed from Redux:
            </p>
            <ol className="mt-4 list-decimal space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong>Store:</strong> An internal state-history array stores
                each resulting state.
              </li>
              <li>
                <strong>Actions:</strong> Typed actions represent:
                <ul className="mt-2 list-disc space-y-2 pl-5">
                  <li>Starting an interaction</li>
                  <li>Marking an interaction with an error or failure</li>
                  <li>Completing an interaction when the UI becomes ready</li>
                </ul>
              </li>
              <li>
                <strong>Dispatch:</strong> A central dispatcher retrieves the
                current state, passes it and the action to the reducer, stores
                the resulting state, and invokes middleware and listeners.
              </li>
              <li>
                <strong>Reducers:</strong> Separate reducers handle actions
                based on the current state: <code>ready</code> or{' '}
                <code>waiting</code>.
              </li>
              <li>
                <strong>Immutable updates:</strong> Each update creates a new
                state object and appends it to the state-history array.
              </li>
              <li>
                <strong>Middleware:</strong> Processes state transitions to
                generate metrics, persist state for cross-application handoff,
                and run consumer-defined middleware.
              </li>
              <li>
                <strong>Subscriptions:</strong> State changes are published to
                callbacks for telemetry, developer tools, and custom
                integrations.
              </li>
            </ol>
            <div className="relative mt-5 aspect-[3003/3518] overflow-hidden rounded-[18px] bg-white">
              <Image
                alt="Detailed Atomic Events state-flow diagram showing actions, ready and waiting states, state changes, and ignored actions"
                className="object-contain"
                fill
                sizes="(max-width: 760px) 100vw, 42rem"
                src="/images/case-studies/atomic-events-state-flow.png"
              />
            </div>
          </div>
          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />
          <div>
            <p>
              The <strong>customer-interaction model</strong> defines the data
              and lifecycle semantics that every interaction must capture. The{' '}
              <strong>state machine</strong> centralizes how that data is
              validated, sequenced, timed, and translated into telemetry.
            </p>
            <p className="mt-5">
              Consumers therefore only describe what starts a customer
              interaction, when it ends, and where the resulting telemetry
              should go. This creates a{' '}
              <strong>declarative integration surface</strong>:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong>Interaction starts:</strong> DOM attributes declare the
                user’s intent and context; a document-level listener captures
                them.
              </li>
              <li>
                <strong>Interaction endings:</strong> A React component (
                <code>&lt;MarkUIReady&gt;</code>) declares when the resulting UI
                becomes usable. The component synchronizes interaction
                completion with the React lifecycle.
              </li>
              <li>
                <strong>Telemetry delivery:</strong> A configured callback
                defines how emitted events enter the consumer’s observability
                pipeline; pub/sub invokes registered callbacks.
              </li>
              <li>
                <strong>Type-safe vocabulary:</strong> Consumers configure an
                allowlist of instrumentation values, enabling compile-time
                guidance and runtime validation.
              </li>
            </ul>
          </div>
          <hr className="border-0 border-t border-[#171814]/10 dark:border-[#f0f0e9]/15" />
          <div>
            <p>
              The initial design focused on interactions within one application,
              but we later discovered that some interactions began in one
              application and ended in another. To address this, I iteratively
              extended the existing design to preserve interactions across
              application boundaries:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong>State capture:</strong> I added middleware that
                serializes and stores the current state after every dispatched
                action.
              </li>
              <li>
                <strong>State transport:</strong> Same-origin applications reuse
                the serialized state from <code>sessionStorage</code>.
                Cross-domain redirects carry it in a Base64-encoded query
                parameter, while iframe and custom integrations pass it
                explicitly through state-handoff APIs.
              </li>
              <li>
                <strong>State restoration:</strong> The destination decodes,
                deserializes, and validates the transferred <code>waiting</code>{' '}
                state, then resumes the interaction instead of starting a new
                one.
              </li>
            </ul>
            <div className="relative mt-5 aspect-[8/5] overflow-hidden rounded-[18px] bg-white">
              <Image
                alt="A waiting interaction transferred from a source app through session storage, a URL parameter, or an iframe handoff API, then resumed and completed in the destination app"
                className="object-contain"
                fill
                sizes="(max-width: 760px) 100vw, 42rem"
                src="/images/case-studies/atomic-events-cross-application-handoff.svg"
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="impacts" className="mt-[3.75rem]">
        <h2
          className="max-w-2xl scroll-mt-9 text-xl leading-tight font-medium tracking-[-0.035em] text-balance focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] max-[560px]:text-lg dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
          id="impacts"
          tabIndex={-1}
        >
          Impacts
        </h2>
        <div className="mt-5 max-w-2xl text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <ul className="list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>
              Instrumented 350+ customer interactions across Branded Checkout.
            </li>
            <li>Captured 30M+ telemetry events daily.</li>
            <li>Adopted across 9 repositories.</li>
            <li>Powered 10+ critical release dashboards.</li>
            <li>
              Enabled latency initiatives that reduced P95 interaction latency
              by 1.2s.
            </li>
            <li>
              Informed product improvements across flows such as Add Card and
              BNPL, contributing $76M in annual TPV and $1.5M in annual revenue.
            </li>
          </ul>
        </div>
      </section>
    </article>
  );
}

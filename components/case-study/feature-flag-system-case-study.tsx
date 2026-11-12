import { BackToWorkLink } from '@/components/back-to-work-link/back-to-work-link';
import { FeatureFlagCatalogVisual } from '@/components/case-study/feature-flag-catalog-visual';
import { FeatureFlagContractVisual } from '@/components/case-study/feature-flag-contract-visual';
import { RequestScopedDecisionsVisual } from '@/components/case-study/request-scoped-decisions-visual';

export function FeatureFlagSystemCaseStudy() {
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
            A single PayPal Branded Checkout session can involve hundreds of
            feature flag evaluations. Feature flags support A/B testing to
            measure product changes and improve conversion, while enabling safe
            feature rollouts.
          </p>
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
            Running these evaluations at checkout scale introduced several
            technical and operational challenges:
          </p>
          <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
            <li>
              <strong className="font-bold">
                Performance and reliability:
              </strong>{' '}
              Experiment lookups could delay checkout rendering and expose it to
              downstream service slowdowns or outages.
            </li>
            <li>
              <strong className="font-bold">Implementation complexity:</strong>{' '}
              Asynchronous flag checks complicated data fetching, component
              rendering, and experiment integration.
            </li>
            <li>
              <strong className="font-bold">Decision consistency:</strong>{' '}
              Components needed to share the same flag decision within a request
              and avoid repeated evaluation.
            </li>
            <li>
              <strong className="font-bold">
                Instrumentation and attribution:
              </strong>{' '}
              Analytics needed to connect flag resolution outcomes with
              conversion and performance metrics.
            </li>
          </ul>
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
        <div className="mt-5 max-w-2xl space-y-10 text-sm leading-6 text-[#55574f] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af]">
          <p>
            The shared feature flag platform standardized flag definitions,
            evaluation, and instrumentation across checkout. An in-memory
            experiment evaluator built on this foundation to reduce network
            dependencies and simplify server rendering.
          </p>

          <section aria-labelledby="shared-flag-contract">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="shared-flag-contract"
              tabIndex={-1}
            >
              A shared flag contract
            </h3>
            <p className="mt-4">
              A shared, typed flag contract in TypeScript standardized how
              engineers integrated feature decisions.
            </p>
            <p className="mt-5">
              I designed a typed{' '}
              <strong className="font-bold">adapter pattern</strong> to support
              multiple feature flag use cases through a shared contract.
            </p>
            <FeatureFlagContractVisual />
            <p className="mt-5">
              The same definitions also generated a typed flag catalog,
              supporting experiment-rule preloading, developer tooling, and
              type-safe test overrides.
            </p>
            <FeatureFlagCatalogVisual />
          </section>

          <section aria-labelledby="request-scoped-decisions">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="request-scoped-decisions"
              tabIndex={-1}
            >
              Consistent decisions within each request
            </h3>
            <p className="mt-4">
              A <strong className="font-bold">request-scoped cache</strong> let
              different parts of the codebase reuse the same flag decision
              within one server request.
            </p>
            <RequestScopedDecisionsVisual />
            <ol className="mt-5 list-decimal space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                <strong className="font-bold">A request arrives.</strong>{' '}
                Middleware opens a dedicated decision store for that request.
                Other requests receive their own, keeping decisions separate.
                <pre
                  aria-label="Pseudocode: create a store for each request"
                  className="mt-3 border-l-2 border-[#168465]/30 bg-[#168465]/[0.03] px-4 py-3 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere] dark:border-[#71d9b7]/30 dark:bg-[#71d9b7]/[0.03]"
                >
                  <code>{`const stores = new AsyncLocalStorage();

// In request middleware
stores.run({
  context: { request },
  cache: new Map(),
}, next);`}</code>
                </pre>
              </li>
              <li>
                <strong className="font-bold">
                  Work moves through the codebase.
                </strong>{' '}
                <code>AsyncLocalStorage</code> keeps that store accessible
                across middleware, rendering, and asynchronous work, without
                each function having to pass it along.
                <pre
                  aria-label="Pseudocode: access the current request's store"
                  className="mt-3 border-l-2 border-[#168465]/30 bg-[#168465]/[0.03] px-4 py-3 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere] dark:border-[#71d9b7]/30 dark:bg-[#71d9b7]/[0.03]"
                >
                  <code>{`// Inside a flag call, wherever it happens
const { cache, context } = stores.getStore();
// Same request → same store`}</code>
                </pre>
              </li>
              <li>
                <strong className="font-bold">
                  Different callers ask the same question.
                </strong>{' '}
                The first flag check starts an evaluation. For an asynchronous
                flag, it caches the pending promise immediately, before waiting
                for the result. Concurrent callers find that promise and wait
                for the same evaluation, preventing duplicate work. Once it
                resolves, they all receive the same decision.
                <pre
                  aria-label="Pseudocode: reuse a decision or pending evaluation"
                  className="mt-3 border-l-2 border-[#168465]/30 bg-[#168465]/[0.03] px-4 py-3 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere] dark:border-[#71d9b7]/30 dark:bg-[#71d9b7]/[0.03]"
                >
                  <code>{`// Inside the shared flag function
if (!cache.has(flag.key)) {
  const decision = flag.decide(context);
  cache.set(flag.key, decision); // Save the promise immediately
}

const sharedDecision = cache.get(flag.key);

if (isPromiseLike(sharedDecision)) {
  // Every caller waits for the same evaluation
  return sharedDecision.then(value => value.result);
}

return sharedDecision.result; // Synchronous flag`}</code>
                </pre>
                <pre
                  aria-label="Pseudocode: two concurrent calls share one evaluation"
                  className="mt-3 border-l-2 border-[#168465]/30 bg-[#168465]/[0.03] px-4 py-3 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere] dark:border-[#71d9b7]/30 dark:bg-[#71d9b7]/[0.03]"
                >
                  <code>{`// Same request: two calls, one evaluation
const [a, b] = await Promise.all([
  showSummary(),
  showSummary(),
]);
// Both receive the same result`}</code>
                </pre>
              </li>
            </ol>
          </section>

          <section aria-labelledby="local-experiment-evaluation">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="local-experiment-evaluation"
              tabIndex={-1}
            >
              Local experiment evaluation
            </h3>
            <p className="mt-4">
              To reduce rendering delays and downstream dependencies, a
              process-wide rules cache enabled synchronous experiment evaluation
              using each request’s buyer and checkout context.
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                Use the generated catalog to identify which experiment groups to
                preload during server initialization.
              </li>
              <li>
                Convert experiment metadata into indexed Maps, including
                treatment-name and allocation-bucket indexes, to reduce repeated
                traversal during evaluation.
              </li>
              <li>
                Evaluate eligibility, audience filters, and treatment assignment
                locally, simplifying flag consumption in server-rendered
                components.
              </li>
              <li>
                Refresh rules in the background and retain the previous rules
                when a refresh fails.
              </li>
              <li>
                Return a default when required rules are unavailable, log
                unexpected cache misses, and trigger a background refresh for
                missing experiment groups.
              </li>
            </ul>
            <p className="mt-5">
              Keeping rules in memory allowed requests to continue during
              downstream outages. This traded immediate rule updates for
              continued availability: running instances could use older rules
              until refresh succeeded, while instances without rules used
              defaults.
            </p>
          </section>

          <section aria-labelledby="consistent-instrumentation">
            <h3
              className="scroll-mt-9 text-base leading-tight font-medium tracking-[-0.02em] text-[#30312d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#dedfd8] dark:focus-visible:outline-[#c6ec39]"
              id="consistent-instrumentation"
              tabIndex={-1}
            >
              Consistent instrumentation
            </h3>
            <p className="mt-4">
              To connect flag outcomes with conversion and performance metrics,
              shared callbacks standardized decision telemetry across checkout’s
              analytics and monitoring pipelines.
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-5 marker:text-[#168465] dark:marker:text-[#71d9b7]">
              <li>
                Capture the flag key, resolved value, and any ineligibility
                reason through the resolution callback.
              </li>
              <li>
                Include experiment and treatment attribution when an experiment
                assignment was available.
              </li>
              <li>
                Record evaluation failures through a common error callback while
                returning the flag’s default value.
              </li>
              <li>
                Emit resolution telemetry for fresh decisions; subsequent cache
                reads reused the result without emitting the same resolution
                event again.
              </li>
            </ul>
          </section>
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
        <ul className="mt-5 max-w-2xl list-disc space-y-3 pl-5 text-sm leading-6 text-[#55574f] marker:text-[#168465] max-[560px]:text-[0.8125rem] max-[560px]:leading-5 dark:text-[#b7b9af] dark:marker:text-[#71d9b7]">
          <li>
            Reduced time to first byte by{' '}
            <strong className="font-bold">141 ms</strong>.
          </li>
          <li>
            Reduced largest contentful paint by{' '}
            <strong className="font-bold">184 ms</strong>.
          </li>
          <li>
            Reduced calls to the downstream experimentation platform by{' '}
            <strong className="font-bold">93%</strong>.
          </li>
          <li>
            Removed{' '}
            <strong className="font-bold">
              more than 150 <code>async</code>/<code>await</code> points
            </strong>{' '}
            from the application, simplifying server-rendering code.
          </li>
        </ul>
      </section>
    </article>
  );
}

export function FeatureFlagCatalogVisual() {
  return (
    <figure
      aria-label="Flag definitions are collected at build time into a generated catalog for preloading, developer tools, and typed test overrides"
      className="mt-5 border-y border-[#171814]/15 text-xs leading-5 text-[#55574f] dark:border-[#f0f0e9]/15 dark:text-[#b7b9af]"
    >
      <div className="grid grid-cols-2 py-5 max-[560px]:grid-cols-1">
        <div className="min-w-0 pr-5 max-[560px]:pr-0">
          <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Definitions across the application
          </p>
          <pre className="mt-4 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere]">
            <code>{`flag({
  key: "new-summary",
  // …
});

rampFlag({
  key: "summary-variant",
  // …
});`}</code>
          </pre>
        </div>

        <div className="min-w-0 border-l border-[#171814]/15 pl-5 max-[560px]:mt-5 max-[560px]:border-t max-[560px]:border-l-0 max-[560px]:pt-5 max-[560px]:pl-0 dark:border-[#f0f0e9]/15">
          <p className="flex items-center gap-2 font-medium text-[#30312d] dark:text-[#dedfd8]">
            <span
              aria-hidden="true"
              className="text-[#777970] max-[560px]:rotate-90 dark:text-[#989b91]"
            >
              →
            </span>
            Generated catalog
          </p>
          <pre className="mt-4 font-mono text-xs leading-6 whitespace-pre-wrap [overflow-wrap:anywhere]">
            <code>{`const flagConfigs = {
  "new-summary": {
    /* metadata */
  },
  "summary-variant": {
    /* metadata */
  },
};`}</code>
          </pre>
        </div>
      </div>

      <dl className="grid grid-cols-3 gap-5 border-t border-[#171814]/10 py-4 max-[560px]:grid-cols-1 max-[560px]:gap-4 dark:border-[#f0f0e9]/10">
        <div>
          <dt className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Preloading
          </dt>
          <dd className="mt-1">Identify experiment rules to load.</dd>
        </div>
        <div>
          <dt className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Developer tools
          </dt>
          <dd className="mt-1">Discover and inspect flags.</dd>
        </div>
        <div>
          <dt className="font-medium text-[#30312d] dark:text-[#dedfd8]">
            Typed overrides
          </dt>
          <dd className="mt-1">Use valid flag keys and values in tests.</dd>
        </div>
      </dl>
    </figure>
  );
}

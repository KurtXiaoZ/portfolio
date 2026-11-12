export function FeatureFlagCatalogVisual() {
  return (
    <figure
      aria-label="Application flag definitions feed one generated inventory, which supports preloading, developer tools, and typed overrides"
      className="mt-7 py-3 text-xs leading-5 text-[#55574f] dark:text-[#b7b9af]"
    >
      <div className="mx-auto max-w-md">
        <p className="text-center text-[#777970] dark:text-[#989b91]">
          Definitions across the application
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              <code>flag()</code>
            </p>
            <p className="mt-1 text-[0.6875rem]">new-summary</p>
          </div>
          <div>
            <p className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              <code>rampFlag()</code>
            </p>
            <p className="mt-1 text-[0.6875rem]">summary-variant</p>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="mx-auto mt-3 h-5 w-1/2 border-x border-b border-[#cbd0c5] dark:border-[#454a3e]"
        />
        <div
          aria-hidden="true"
          className="mx-auto h-4 w-px bg-[#cbd0c5] dark:bg-[#454a3e]"
        />
        <p className="mb-4 text-center text-[0.6875rem] text-[#777970] dark:text-[#989b91]">
          Generated at build time ↓
        </p>

        <div className="border border-[#171814]/15 bg-[#fafaf7] dark:border-[#f0f0e9]/15 dark:bg-[#191a16]">
          <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[#171814]/10 px-4 py-3 dark:border-[#f0f0e9]/10">
            <code className="font-medium text-[#30312d] dark:text-[#dedfd8]">
              flags.ts
            </code>
            <span className="text-[0.6875rem] text-[#777970] dark:text-[#989b91]">
              One inventory + generated types
            </span>
          </div>
          <ul className="divide-y divide-[#171814]/10 px-4 dark:divide-[#f0f0e9]/10">
            <li className="py-3">
              <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                <code className="font-medium text-[#30312d] dark:text-[#dedfd8]">
                  new-summary
                </code>
                <code className="text-[#168465] dark:text-[#71d9b7]">
                  boolean
                </code>
              </div>
              <p className="mt-1 text-[0.6875rem]">Name and default value</p>
            </li>
            <li className="py-3">
              <code className="font-medium text-[#30312d] dark:text-[#dedfd8]">
                summary-variant
              </code>
              <p className="mt-1 text-[0.6875rem]">
                Experiment, treatment options, and default value
              </p>
              <code className="mt-2 block text-[0.6875rem] text-[#168465] [overflow-wrap:anywhere] dark:text-[#71d9b7]">
                {'"Control" | "Compact" | "Expanded"'}
              </code>
            </li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="mx-auto h-5 w-px bg-[#cbd0c5] dark:bg-[#454a3e]"
      />
      <div
        aria-hidden="true"
        className="relative mx-auto h-4 w-2/3 border-x border-t border-[#cbd0c5] max-[560px]:hidden dark:border-[#454a3e]"
      >
        <div className="absolute top-0 left-1/2 h-4 w-px bg-[#cbd0c5] dark:bg-[#454a3e]" />
      </div>
      <dl className="grid grid-cols-3 gap-5 pt-3 text-center max-[560px]:grid-cols-1 max-[560px]:gap-4">
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

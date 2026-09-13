export function AboutPanel() {
  return (
    <section className="h-full overflow-y-auto px-8 py-12 max-[560px]:px-6 max-[560px]:py-8">
      <div className="mx-auto grid w-full max-w-3xl gap-10">
        <div>
          <p className="text-sm tracking-[0.16em] text-[#62635d] uppercase dark:text-[#a8aaa2]">
            About
          </p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-medium tracking-[-0.035em]">
            Engineering with product judgment and care
          </h2>
          <p className="mt-4 max-w-xl text-base leading-7 text-[#62635d] dark:text-[#a8aaa2]">
            This space will expand on Kurt&apos;s background, working style, and
            perspective. The final version will combine concise storytelling
            with a small number of supporting images.
          </p>
        </div>

        <div className="aspect-[16/10] w-full rounded-2xl bg-[#dedfd8] dark:bg-[#292b27]" />

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="min-h-36 rounded-2xl bg-[#e5e6df] p-6 dark:bg-[#222420]">
            <p className="text-sm text-[#62635d] dark:text-[#a8aaa2]">
              Working style placeholder
            </p>
          </div>
          <div className="min-h-36 rounded-2xl bg-[#e5e6df] p-6 dark:bg-[#222420]">
            <p className="text-sm text-[#62635d] dark:text-[#a8aaa2]">
              Interests placeholder
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

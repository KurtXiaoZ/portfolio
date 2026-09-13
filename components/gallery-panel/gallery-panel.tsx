const PLACEHOLDER_ITEMS = [
  'aspect-[4/3]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[16/10]',
] as const;

export function GalleryPanel() {
  return (
    <section className="h-full overflow-y-auto px-8 py-12 max-[560px]:px-6 max-[560px]:py-8">
      <div className="mx-auto w-full max-w-3xl">
        <p className="text-sm tracking-[0.16em] text-[#62635d] uppercase dark:text-[#a8aaa2]">
          Gallery
        </p>
        <h2 className="mt-3 text-3xl leading-tight font-medium tracking-[-0.035em]">
          Selected work, in pictures
        </h2>
        <p className="mt-3 max-w-xl text-base leading-7 text-[#62635d] dark:text-[#a8aaa2]">
          A curated visual collection will live here. These blocks temporarily
          represent product screens, prototypes, and technical artifacts.
        </p>

        <div className="mt-10 grid grid-cols-2 items-start gap-4">
          {PLACEHOLDER_ITEMS.map((aspectRatio, index) => (
            <div
              className={`${aspectRatio} rounded-2xl bg-[#dedfd8] dark:bg-[#292b27]`}
              key={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const PLACEHOLDER_ITEMS = [
  'aspect-[4/3]',
  'aspect-square',
  'aspect-[3/4]',
  'aspect-[16/10]',
] as const;

export function GalleryPanel() {
  return (
    <section
      aria-label="Gallery"
      className="h-full w-full overflow-y-auto px-8 py-12 max-[560px]:px-6 max-[560px]:py-8"
    >
      <div className="mx-auto grid w-full max-w-3xl grid-cols-2 items-start gap-4">
        {PLACEHOLDER_ITEMS.map((aspectRatio, index) => (
          <div
            className={`${aspectRatio} rounded-2xl bg-[#dedfd8] dark:bg-[#292b27]`}
            key={index}
          />
        ))}
      </div>
    </section>
  );
}

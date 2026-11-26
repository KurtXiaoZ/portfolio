import Image from 'next/image';

const PLACEHOLDER_COLUMNS = {
  left: ['aspect-[3/4]', 'aspect-[16/10]', 'aspect-[4/3]'],
  right: ['aspect-square', 'aspect-[16/10]', 'aspect-[3/4]', 'aspect-[4/3]'],
} as const;

export function GalleryPanel() {
  // The Work carousel's three visible cards span about 710px at rest.
  return (
    <section
      aria-label="Gallery"
      className="h-full max-h-[710px] w-full self-center overflow-y-auto px-8 max-[560px]:px-6"
    >
      <div className="mx-auto grid w-full max-w-3xl grid-cols-2 items-start gap-4">
        {Object.entries(PLACEHOLDER_COLUMNS).map(([column, aspectRatios]) => (
          <div className="grid gap-4" key={column}>
            {column === 'left' && (
              <picture>
                <source
                  media="(prefers-reduced-motion: reduce)"
                  srcSet="/images/gallery/payment-method-carousel.png"
                />
                <Image
                  alt="PayPal checkout payment options in a horizontal carousel"
                  className="h-auto w-full rounded-2xl"
                  height={276}
                  src="/images/gallery/payment-method-carousel.gif"
                  unoptimized
                  width={860}
                />
              </picture>
            )}
            {aspectRatios.map((aspectRatio) => (
              <div
                aria-hidden="true"
                className={`${aspectRatio} rounded-2xl bg-[#dedfd8] dark:bg-[#292b27]`}
                key={aspectRatio}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}

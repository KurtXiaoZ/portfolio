import Image from 'next/image';

const mediaDirectory = '/images/case-studies/developer-toolbar';
const mobileDemo = '(max-width: 760px)';
const mobileDiagram = '(max-width: 960px)';

const demos = {
  overview: {
    alt: 'The developer toolbar opens over checkout and reveals its tool shortcuts',
    desktopHeight: 900,
    mobileHeight: 900,
  },
  'feature-flags': {
    alt: 'The feature flags panel searches for a flag and applies an override to checkout',
    desktopHeight: 900,
    mobileHeight: 900,
  },
  'mock-scenarios': {
    alt: 'A scenario preset and its editable GraphQL response are shown in checkout',
    desktopHeight: 900,
    mobileHeight: 900,
  },
  accessibility: {
    alt: 'The toolbar lists accessibility issues by severity and highlights an affected checkout element',
    desktopHeight: 1000,
    mobileHeight: 1212,
  },
  'render-diagnostics': {
    alt: 'React Scan highlights components that render as a developer interacts with checkout',
    desktopHeight: 840,
    mobileHeight: 1100,
  },
} as const;

const diagrams = {
  'flag-persistence': {
    alt: 'An override is written to a browser cookie and used by server-side flag evaluation before checkout renders after reload. Pins are kept separately in local storage.',
    desktopHeight: 382,
    mobileHeight: 680,
  },
  'server-mocking': {
    alt: 'A preset or JSON edit feeds a server action that saves the mock dataset and sets a cookie. After reload, MSW intercepts matching GraphQL requests and returns the saved response.',
    desktopHeight: 514,
    mobileHeight: 886,
  },
} as const;

export function ToolbarDemo({ name }: { name: keyof typeof demos }) {
  const { alt, desktopHeight, mobileHeight } = demos[name];
  const src = `${mediaDirectory}/${name}`;

  return (
    <figure className="mx-auto w-full max-w-lg max-[760px]:max-w-[390px]">
      <picture>
        <source
          media={`${mobileDemo} and (prefers-reduced-motion: reduce)`}
          srcSet={`${src}-mobile-poster.webp`}
          width={390}
          height={mobileHeight}
        />
        <source
          media="(prefers-reduced-motion: reduce)"
          srcSet={`${src}-poster.webp`}
          width={680}
          height={desktopHeight}
        />
        <source
          media={mobileDemo}
          srcSet={`${src}-mobile.gif`}
          width={390}
          height={mobileHeight}
        />
        <Image
          alt={alt}
          className="h-auto w-full rounded-[18px]"
          height={desktopHeight}
          src={`${src}.gif`}
          unoptimized
          width={680}
        />
      </picture>
    </figure>
  );
}

export function ToolbarDiagram({ name }: { name: keyof typeof diagrams }) {
  const { alt, desktopHeight, mobileHeight } = diagrams[name];
  const src = `${mediaDirectory}/${name}`;

  return (
    <figure className="mx-auto w-full max-[960px]:max-w-[480px]">
      <picture>
        <source
          media={mobileDiagram}
          srcSet={`${src}-mobile.svg`}
          width={480}
          height={mobileHeight}
        />
        <Image
          alt={alt}
          className="h-auto w-full rounded-[18px]"
          height={desktopHeight}
          src={`${src}.svg`}
          width={960}
        />
      </picture>
    </figure>
  );
}

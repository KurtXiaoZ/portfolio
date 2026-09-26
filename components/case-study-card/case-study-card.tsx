import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface CaseStudyCardProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  'children' | 'title'
> {
  compact?: boolean;
  compactCover?: ReactNode;
  cover: ReactNode;
  imageAlt: string;
  tags: readonly string[];
  title: ReactNode;
}

const FOLDED_SLAB_LAYERS = {
  top: [
    {
      blur: 0,
      mask: 'linear-gradient(to bottom, transparent 0%, transparent 38%, black 72%, black 100%)',
    },
    {
      blur: 10,
      mask: 'linear-gradient(to bottom, transparent 0%, black 16%, black 42%, transparent 68%)',
    },
    {
      blur: 24,
      mask: 'linear-gradient(to bottom, black 0%, black 20%, transparent 46%)',
    },
    {
      blur: 42,
      mask: 'linear-gradient(to bottom, black 0%, transparent 24%)',
    },
  ],
  bottom: [
    {
      blur: 0,
      mask: 'linear-gradient(to top, transparent 0%, transparent 38%, black 72%, black 100%)',
    },
    {
      blur: 10,
      mask: 'linear-gradient(to top, transparent 0%, black 16%, black 42%, transparent 68%)',
    },
    {
      blur: 24,
      mask: 'linear-gradient(to top, black 0%, black 20%, transparent 46%)',
    },
    {
      blur: 42,
      mask: 'linear-gradient(to top, black 0%, transparent 24%)',
    },
  ],
} as const;

function FoldedSlab({ edge }: { edge: keyof typeof FOLDED_SLAB_LAYERS }) {
  return (
    <div className="absolute inset-0">
      {FOLDED_SLAB_LAYERS[edge].map((layer) => (
        <div
          className="absolute inset-0 rounded-2xl bg-[#f8f8f8] dark:bg-[#1c1d1a]"
          key={layer.blur}
          style={{
            filter: layer.blur > 0 ? `blur(${layer.blur}px)` : undefined,
            maskImage: layer.mask,
            WebkitMaskImage: layer.mask,
          }}
        />
      ))}
    </div>
  );
}

export function CaseStudyCard({
  className,
  compact = false,
  compactCover,
  cover,
  imageAlt,
  tags,
  title,
  ...props
}: CaseStudyCardProps) {
  return (
    <Link
      className={clsx(
        'group/card block w-full max-w-82 rounded-2xl text-[#171814] no-underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]',
        className,
      )}
      {...props}
    >
      <div
        className="relative aspect-[445/312] cursor-pointer"
        role="img"
        aria-label={imageAlt}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 'var(--case-study-upper-slab, 0)' }}
        >
          <FoldedSlab edge="top" />
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ opacity: 'var(--case-study-lower-slab, 0)' }}
        >
          <FoldedSlab edge="bottom" />
        </div>
        <div
          className="absolute inset-0 overflow-hidden rounded-2xl bg-[#faf9f5] *:h-full *:w-full dark:bg-[#20211e]"
          style={{ opacity: 'var(--case-study-cover-opacity, 1)' }}
        >
          {compact ? (compactCover ?? cover) : cover}
        </div>
      </div>
      <div
        className={clsx(
          'grid transition-[grid-template-rows] motion-reduce:transition-none motion-reduce:delay-0',
          compact
            ? 'grid-rows-[0fr] delay-200 duration-300'
            : 'grid-rows-[1fr] delay-0 duration-500',
        )}
      >
        <div
          className={clsx(
            'min-h-0 overflow-hidden transition-opacity duration-200 motion-reduce:transition-none motion-reduce:delay-0',
            compact ? 'opacity-0 delay-0' : 'opacity-100 delay-[600ms]',
          )}
        >
          <h3 className="mx-2 mt-4 mb-1.5 font-[family-name:var(--font-ibm-plex-mono)] text-base leading-[1.44] font-normal not-italic tracking-normal text-[#52534f] dark:text-[#d2d3cc]">
            {title}
          </h3>
          <div className="flex flex-wrap gap-x-1.5 px-2 pb-1 font-[family-name:var(--font-ibm-plex-sans)] text-[0.6875rem] leading-[1.44] font-normal not-italic tracking-[0.05em] text-[#969791] dark:text-[#8e9088]">
            {tags.map((tag, index) => (
              <span key={tag}>
                {index > 0 && <span aria-hidden="true">/ </span>}
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

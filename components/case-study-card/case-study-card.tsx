import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

export interface CaseStudyCardProps extends Omit<
  ComponentPropsWithoutRef<typeof Link>,
  'children' | 'title'
> {
  compact?: boolean;
  cover: ReactNode;
  imageAlt: string;
  tags: readonly string[];
  title: ReactNode;
}

export function CaseStudyCard({
  className,
  compact = false,
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
        className="relative aspect-[445/312] cursor-pointer overflow-hidden rounded-2xl bg-[#faf9f5] dark:bg-[#20211e] *:h-full *:w-full"
        role="img"
        aria-label={imageAlt}
      >
        {cover}
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

import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Tag } from '@/components/tag/tag';

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
        'group/card block w-full max-w-82 rounded-[18px] p-4 text-[#171814] no-underline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#657800] dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]',
        className,
      )}
      {...props}
    >
      <div
        className="relative h-51.25 cursor-pointer overflow-hidden rounded-[11px] bg-[#faf9f5] max-[560px]:h-47.5 dark:bg-[#20211e] *:h-full *:w-full"
        role="img"
        aria-label={imageAlt}
      >
        {cover}
        <span
          aria-hidden="true"
          className={clsx(
            'pointer-events-none absolute inset-x-0 bottom-0 bg-linear-to-t from-[#171814]/85 to-transparent px-4 pt-12 pb-3 text-sm leading-[1.3] font-medium tracking-tight text-white opacity-0 transition-opacity duration-200 motion-reduce:transition-none',
            compact &&
              'group-hover/card:opacity-100 group-focus-visible/card:opacity-100',
          )}
        >
          {title}
        </span>
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
          <h3 className="mx-0.5 mt-3.75 mb-2.75 text-base leading-[1.3] font-medium tracking-tight text-[#171814] dark:text-[#f0f0e9]">
            {title}
          </h3>
          <div className="flex flex-wrap gap-1.5 px-0.5 pb-0.5">
            {tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

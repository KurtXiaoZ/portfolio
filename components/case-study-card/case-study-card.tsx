import clsx from 'clsx';
import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { Tag } from '@/components/tag/tag';

export interface CaseStudyCardProps extends Omit<
  ComponentPropsWithoutRef<'a'>,
  'children' | 'title'
> {
  image: ReactNode;
  imageAlt: string;
  tags: readonly string[];
  title: ReactNode;
}

export function CaseStudyCard({
  className,
  image,
  imageAlt,
  tags,
  title,
  ...props
}: CaseStudyCardProps) {
  return (
    <a
      className={clsx(
        'block w-full max-w-82 rounded-[18px] p-4 text-[#171814] no-underline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-[#657800] dark:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]',
        className,
      )}
      {...props}
    >
      <div
        className="relative h-51.25 cursor-pointer overflow-hidden rounded-[11px] bg-[#faf9f5] max-[560px]:h-47.5 dark:bg-[#20211e] *:h-full *:w-full"
        role="img"
        aria-label={imageAlt}
      >
        {image}
      </div>
      <h3 className="mx-0.5 mt-3.75 mb-2.75 text-base leading-[1.3] font-medium tracking-tight text-[#171814] dark:text-[#f0f0e9]">
        {title}
      </h3>
      <div className="flex flex-wrap gap-1.5 px-0.5 pb-0.5">
        {tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>
    </a>
  );
}

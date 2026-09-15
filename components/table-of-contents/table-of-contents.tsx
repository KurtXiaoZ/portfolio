import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export interface TableOfContentsLink {
  href: string;
  text: string;
}

export interface TableOfContentsProps extends Omit<
  ComponentPropsWithoutRef<'nav'>,
  'children'
> {
  links: readonly TableOfContentsLink[];
}

export function TableOfContents({
  'aria-label': ariaLabel = 'Table of contents',
  className,
  links,
  ...props
}: TableOfContentsProps) {
  return (
    <nav
      aria-label={ariaLabel}
      className={clsx('text-sm', className)}
      {...props}
    >
      <ul className="flex flex-col gap-3">
        {links.map(({ href, text }) => (
          <li key={href}>
            <a
              className="text-[#62635d] decoration-1 underline-offset-4 transition-colors hover:text-[#171814] hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] motion-reduce:transition-none dark:text-[#a8aaa2] dark:hover:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
              href={href}
            >
              {text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

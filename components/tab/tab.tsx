import clsx from 'clsx';
import Link from 'next/link';
import type { ComponentPropsWithoutRef } from 'react';

export interface TabProps extends ComponentPropsWithoutRef<typeof Link> {
  active?: boolean;
}

export function Tab({ active = false, className, ...props }: TabProps) {
  return (
    <Link
      aria-current={active ? 'page' : undefined}
      className={clsx(
        'text-lg leading-7 text-[#62635d] decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] dark:text-[#a8aaa2] dark:focus-visible:outline-[#c6ec39]',
        active && 'underline',
        className,
      )}
      {...props}
    />
  );
}

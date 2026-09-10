import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export interface TabProps extends ComponentPropsWithoutRef<'button'> {
  active?: boolean;
}

export function Tab({
  active = false,
  className,
  type = 'button',
  ...props
}: TabProps) {
  return (
    <button
      aria-selected={active}
      className={clsx(
        'cursor-pointer border-0 bg-transparent p-0 text-lg leading-7 text-[#62635d] decoration-1 underline-offset-4 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] disabled:cursor-default disabled:opacity-50 dark:text-[#a8aaa2] dark:focus-visible:outline-[#c6ec39]',
        active && 'underline',
        className,
      )}
      role="tab"
      type={type}
      {...props}
    />
  );
}

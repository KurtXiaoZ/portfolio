import clsx from 'clsx';
import type { ComponentPropsWithoutRef } from 'react';

export type TagProps = ComponentPropsWithoutRef<'span'>;

export function Tag({ className, ...props }: TagProps) {
  return (
    <span
      className={clsx(
        'inline-flex min-h-6.25 items-center rounded-sm border border-current/20 px-2.25 py-0.5 text-xs leading-5 text-current/60',
        className,
      )}
      {...props}
    />
  );
}

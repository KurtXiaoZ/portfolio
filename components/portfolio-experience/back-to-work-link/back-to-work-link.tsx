import Link from 'next/link';

export function BackToWorkLink() {
  return (
    <Link
      className="inline-flex items-center gap-2 text-sm font-medium text-[#55574f] no-underline transition-colors hover:text-[#171814] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] motion-reduce:transition-none dark:text-[#b7b9af] dark:hover:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
      href="/"
    >
      <span aria-hidden="true">←</span>
      All work
    </Link>
  );
}

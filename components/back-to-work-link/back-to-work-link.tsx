import Link from 'next/link';

export function BackToWorkLink() {
  return (
    <Link
      aria-label="Return to home"
      className="inline-flex size-12 items-center justify-center rounded text-[#55574f] no-underline transition-colors hover:bg-[#f2f4ed] hover:text-[#171814] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#657800] motion-reduce:transition-none dark:text-[#b7b9af] dark:hover:bg-[#22261c] dark:hover:text-[#f0f0e9] dark:focus-visible:outline-[#c6ec39]"
      href="/"
    >
      <svg
        aria-hidden="true"
        className="size-[22px]"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.7"
        viewBox="0 0 24 24"
      >
        <path d="M19 12H5m7 7-7-7 7-7" />
      </svg>
    </Link>
  );
}

import { Tab } from '@/components/tab/tab';

export function HomeIntroduction() {
  return (
    <div className="w-full max-w-md px-8 max-[560px]:px-6">
      <h1 className="mb-4 text-5xl leading-none font-medium tracking-[-0.045em] text-[#171814] dark:text-[#f0f0e9]">
        Kurt Xiao
      </h1>
      <p className="max-w-sm text-lg leading-7 text-[#62635d] dark:text-[#a8aaa2]">
        Senior full-stack engineer building thoughtful products and dependable
        systems.
      </p>
      <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2" role="tablist">
        <Tab active>Case Studies</Tab>
        <Tab disabled>Gallery</Tab>
        <Tab disabled>About</Tab>
      </div>
    </div>
  );
}

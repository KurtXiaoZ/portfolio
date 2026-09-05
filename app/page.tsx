import { HomeIntroduction } from '@/components/home-introduction/home-introduction';
import { VerticalCarousel } from '@/components/vertical-carousel/vertical-carousel';

import { carouselItems } from './carousel-items.mock';

export default function Home() {
  return (
    <main className="flex h-dvh overflow-hidden">
      <div className="flex min-h-0 flex-1 items-center justify-center overflow-y-auto">
        <HomeIntroduction />
      </div>
      <div className="flex min-w-0 flex-1">
        <VerticalCarousel items={carouselItems} />
      </div>
    </main>
  );
}

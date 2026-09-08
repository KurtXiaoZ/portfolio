import { notFound } from 'next/navigation';

import { CheckoutPerformanceCaseStudy } from '@/components/case-study/checkout-performance-case-study';

const CHECKOUT_PERFORMANCE_SLUG = 'checkout-performance';

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return [{ slug: CHECKOUT_PERFORMANCE_SLUG }];
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  if (slug !== CHECKOUT_PERFORMANCE_SLUG) notFound();

  return <CheckoutPerformanceCaseStudy />;
}

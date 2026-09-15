import { notFound } from 'next/navigation';

import { AtomicEventsCaseStudy } from '@/components/case-study/atomic-events-case-study';
import { CheckoutPerformanceCaseStudy } from '@/components/case-study/checkout-performance-case-study';
import { FeatureFlagSystemCaseStudy } from '@/components/case-study/feature-flag-system-case-study';

const caseStudies = {
  'atomic-events': AtomicEventsCaseStudy,
  'checkout-performance': CheckoutPerformanceCaseStudy,
  'feature-flag-system': FeatureFlagSystemCaseStudy,
} as const;

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;

  if (!(slug in caseStudies)) notFound();

  const CaseStudy = caseStudies[slug as keyof typeof caseStudies];

  return <CaseStudy />;
}

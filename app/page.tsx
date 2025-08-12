import { Suspense } from 'react';
import Image from 'next/image';
import { Hero } from '@/components/sections/Hero';
import { SocialProof } from '@/components/sections/SocialProof';
import { ValueProps } from '@/components/sections/ValueProps';
import { HowItWorks } from '@/components/sections/HowItWorks';
import { RoiCalculator } from '@/components/sections/RoiCalculator';
import { Privacy } from '@/components/sections/Privacy';
import { Integrations } from '@/components/sections/Integrations';
import { FinalCta } from '@/components/sections/FinalCta';
import { Footer } from '@/components/sections/Footer';
import { PersonaSwitcher } from '@/components/ui/PersonaSwitcher';

// This forces the page to be dynamically rendered.
export const dynamic = 'force-dynamic';

// The main content of the page, which depends on the persona.
function PageContent({ persona }: { persona: 'revenue' | 'people' }) {
  return (
    <>
      <SocialProof />
      <ValueProps persona={persona} />
      <HowItWorks />
      <RoiCalculator />
      <Privacy />
      <Integrations />
      <FinalCta persona={persona} />
    </>
  );
}

// The Home component, which orchestrates the page.
export default async function Home({ searchParams }: { searchParams: Promise<{ p?: string }> }) {
  const { p } = await searchParams;
  const persona: 'revenue' | 'people' = p === 'people' ? 'people' : 'revenue';

  return (
    <main className="flex-grow">
      <Hero persona={persona} />
      <Suspense>
        <PersonaSwitcher />
      </Suspense>

      {/* Product screenshot below persona switcher */}
      <div className="flex justify-center px-4">
        <Image
          src="/image.png"
          alt="Graph.one AI-evaluated candidate list screenshot"
          width={1024}
          height={568}
          priority
          className="w-full max-w-5xl rounded-xl shadow-2xl border"
        />
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <PageContent persona={persona} />
      </Suspense>
      <Footer />
    </main>
  );
}

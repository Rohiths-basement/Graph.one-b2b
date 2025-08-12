'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

type Persona = 'revenue' | 'people';

export const PersonaSwitcher = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPersona = searchParams.get('p') === 'people' ? 'people' : 'revenue';

  const setPersona = (persona: Persona) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('p', persona);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    router.refresh();
  };

  return (
    <motion.div
      className="sticky top-20 z-40 flex justify-center py-4 -mt-12"
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1], delay: 0.5 }}
    >
      <div className="relative p-1 bg-muted/80 backdrop-blur-sm rounded-lg flex gap-1 border shadow-sm">
        {['revenue', 'people'].map((p) => {
          const persona = p as Persona;
          const isActive = currentPersona === persona;
          return (
            <button
              key={persona}
              onClick={() => setPersona(persona)}
              className={`relative rounded-md px-4 py-1.5 text-sm font-medium transition-colors z-10 ${isActive ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`}
            >
              {persona === 'revenue' ? 'For Revenue Teams' : 'For People Teams'}
            </button>
          );
        })}
        <motion.div
          layoutId="active-persona-pill"
          className="absolute inset-1 bg-background rounded-md shadow-sm z-0"
          style={{
            left: currentPersona === 'revenue' ? '0.25rem' : 'auto',
            right: currentPersona === 'people' ? '0.25rem' : 'auto',
            width: 'calc(50% - 0.25rem)',
          }}
          transition={{ type: 'spring', duration: 0.5, bounce: 0.2 }}
        />
      </div>
    </motion.div>
  );
};

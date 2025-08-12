'use client';

import { motion, Variants } from 'framer-motion';
import { Button } from '@/components/ui/button';
import copy from '@/copy.json';
import { FinalCta as FinalCtaCopy } from '@/lib/types';
import Link from 'next/link';

type Persona = 'revenue' | 'people';

export const FinalCta = ({ persona }: { persona: Persona }) => {
  const { finalCta }: { finalCta: FinalCtaCopy } = copy;
  const content = finalCta[persona];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: 'easeOut' },
    },
  };

  return (
    <motion.section
      id="final-cta"
      className="bg-muted/30 py-20 sm:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="text-center flex flex-col items-center">
        <motion.h2
          className="text-4xl md:text-5xl font-display font-medium tracking-tight max-w-xl"
          variants={itemVariants}
        >
          {content.heading}
        </motion.h2>
        <motion.div variants={itemVariants}>
          <Button asChild size="lg" className="mt-10">
            <Link href="#">{content.cta}</Link>
          </Button>
        </motion.div>
        <motion.p
          className="mt-4 text-sm text-muted-foreground max-w-xs"
          variants={itemVariants}
        >
          {content.subtext}
        </motion.p>
      </div>
    </motion.section>
  );
};

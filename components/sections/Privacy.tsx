'use client';

import { motion, Variants } from 'framer-motion';
import copy from '@/copy.json';
import { Privacy as PrivacyCopy, PrivacyChecklistItem } from '@/lib/types';
import { PrivacyToggle } from '@/components/ui/PrivacyToggle';

export const Privacy = () => {
  const { privacy }: { privacy: PrivacyCopy } = copy;

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
      id="privacy"
      className="container mx-auto max-w-3xl text-center flex flex-col items-center pt-24 sm:pt-32 pb-12 sm:pb-16"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <motion.h2
        className="text-3xl md:text-4xl font-display font-medium tracking-tight"
        variants={itemVariants}
      >
        {privacy.heading}
      </motion.h2>
      <motion.p
        className="mt-6 text-lg max-w-xl text-muted-foreground"
        variants={itemVariants}
      >
        {privacy.explainer}
      </motion.p>
      <motion.div
        variants={itemVariants}
        className="mt-12 w-full max-w-lg space-y-4"
      >
        {privacy.checklist.map((item: PrivacyChecklistItem) => (
          <PrivacyToggle
            key={item.title}
            title={item.title}
            description={item.description}
          />
        ))}
      </motion.div>
    </motion.section>
  );
};

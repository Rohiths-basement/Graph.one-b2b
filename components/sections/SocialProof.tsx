'use client';

import { motion } from 'framer-motion';
import copy from '@/copy.json';

export const SocialProof = () => {
  const { socialProof } = copy;

  return (
    <motion.section
      id="social-proof"
      className="py-0"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.8 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto text-center">
        <p className="text-sm text-muted-foreground italic">{socialProof}</p>
      </div>
    </motion.section>
  );
};

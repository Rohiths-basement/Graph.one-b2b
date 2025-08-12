'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const AnimatedPlaceholder = ({
  placeholders,
  className,
}: {
  placeholders: string[];
  className?: string;
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [placeholders.length]);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={placeholders[index]}
        initial={{ opacity: 0, y: 5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -5 }}
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className={className}
      >
        {placeholders[index]}
      </motion.p>
    </AnimatePresence>
  );
};

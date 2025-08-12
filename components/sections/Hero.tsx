'use client';

import { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';
import copy from '@/copy.json';
import { HeroCopy } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { PathPreview } from '@/components/ui/PathPreview';
import Link from 'next/link';
import paths from '@/public/seed/paths.json';
import { ArrowRight } from 'lucide-react';

// Animation Variants
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.26, ease: [0.22, 0.61, 0.36, 1] } },
};

const drawLine: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: { pathLength: 1, opacity: 1, transition: { duration: 0.42, ease: 'easeInOut' } },
};

type PathNode = { initial: string; label: string; tooltip: string };
type PathData = { path: PathNode[] };

import { AnimatedPlaceholder } from '../ui/AnimatedPlaceholder';

export const Hero = ({ persona }: { persona: 'revenue' | 'people' }) => {
  const hero: HeroCopy = copy.hero;
  const heroCopy = hero[persona];
  const examples = heroCopy.chips;

  const [activeChip, setActiveChip] = useState(heroCopy.chips[0]);
  const [inputValue, setInputValue] = useState('');
  const [currentPath, setCurrentPath] = useState<PathNode[] | null>(null);
  const [isEmptyState, setIsEmptyState] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setActiveChip(heroCopy.chips[0]);
  }, [persona, heroCopy.chips]);

  const showPath = (query: string) => {
    const data = (paths as Record<string, PathData>)[query];
    if (data) {
      setCurrentPath(data.path);
      setIsEmptyState(false);
    } else {
      setCurrentPath(null);
      setIsEmptyState(true);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showPath(inputValue || activeChip);
  };

  return (
    <motion.section
      id="hero"
      className="container mx-auto flex flex-col items-center text-center pt-24 pb-20 md:pt-28 md:pb-24"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.h1
        className="text-5xl md:text-6xl font-display font-medium tracking-[-0.01em] max-w-4xl"
        variants={fadeUp}
      >
        {hero.heading}
      </motion.h1>
      <motion.p className="mt-6 text-lg max-w-xl text-muted-foreground" variants={fadeUp}>
        {heroCopy.subheading}
      </motion.p>

      <div className="w-full max-w-[720px] mx-auto">
        <motion.div className="mt-8 flex flex-wrap justify-start gap-3" variants={fadeUp}>
          {heroCopy.chips.map((chip: string) => (
            <motion.div
              key={chip}
              whileHover={{ y: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <Badge
                variant={activeChip === chip ? 'default' : 'outline'}
                className="cursor-pointer transition-colors text-sm px-3 py-1.5 rounded-full"
                onClick={() => setActiveChip(chip)}
              >
                {chip}
              </Badge>
            </motion.div>
          ))}
        </motion.div>

        <motion.form
          className="mt-4 relative"
          variants={fadeUp}
          onSubmit={handleFormSubmit}
        >
          <Input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder=""
            className="h-12 text-base pl-4 pr-12 w-full bg-background/50"
          />
          {!isFocused && !inputValue && (
            <AnimatedPlaceholder
              placeholders={examples}
              className="absolute inset-y-0 left-4 flex items-center text-muted-foreground pointer-events-none"
            />
          )}
          <Button type="submit" size="icon" className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-md">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </motion.form>
      </div>

      <div className="mt-6 min-h-[40px]">
        {currentPath && (
          <PathPreview
            nodes={currentPath.map((node) => ({
              label: node.label,
              badge: node.tooltip,
            }))}
          />
        )}
        {isEmptyState && (
          <motion.p className="text-muted-foreground text-center pt-8" variants={fadeUp}>
            Try one of the examples above.
          </motion.p>
        )}
      </div>

      <motion.div className="mt-4 flex items-center justify-center gap-4" variants={fadeUp}>
        <Button asChild size="lg">
          <Link href="#">{heroCopy.cta1}</Link>
        </Button>
        <Button asChild size="lg" variant="ghost">
          <Link href="#">{heroCopy.cta2}</Link>
        </Button>
      </motion.div>
    </motion.section>
  );
};

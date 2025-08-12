'use client';

import { motion, Variants } from 'framer-motion';
import copy from '@/copy.json';
import { Integrations as IntegrationsCopy, IntegrationLogo } from '@/lib/types';
import Image from 'next/image';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

export const Integrations = () => {
  const { integrations } = copy as { integrations: IntegrationsCopy };
  const duplicatedLogos = [...integrations.logos, ...integrations.logos];

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
      id="integrations"
      className="pt-12 sm:pt-16 pb-24 sm:pb-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto text-center">
        <motion.h2
          className="text-2xl font-display font-medium tracking-tight"
          variants={itemVariants}
        >
          {integrations.heading}
        </motion.h2>
        <motion.div className="relative mt-12" variants={itemVariants}>
          <div className="pointer-events-none absolute -left-4 top-0 h-full w-20 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              animate={{
                x: ['0%', '-50%'],
                transition: {
                  ease: 'linear',
                  duration: 20,
                  repeat: Infinity,
                },
              }}
            >
              {duplicatedLogos.map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-4 py-4">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="relative h-12 w-36 cursor-pointer">
                          <Image
                            src={logo.src}
                            alt={logo.name}
                            layout="fill"
                            objectFit="contain"
                            className="transition-all duration-300"
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{logo.tooltip}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              ))}
            </motion.div>
          </div>
          <div className="pointer-events-none absolute -right-4 top-0 h-full w-20 bg-gradient-to-l from-background to-transparent z-10" />
        </motion.div>
      </div>
    </motion.section>
  );
};

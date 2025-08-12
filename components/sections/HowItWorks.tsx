'use client';

import { motion, useScroll } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import copy from '@/copy.json';
import { HowItWorks as HowItWorksCopy } from '@/lib/types';
import { cn } from '@/lib/utils';
import { VisualDisplay } from '@/components/ui/VisualDisplay';

import { AnimatePresence } from 'framer-motion';

export const HowItWorks = () => {
  const howItWorks = copy.howItWorks as unknown as HowItWorksCopy;
  const targetRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start center', 'end center'],
  });

  useEffect(() => {
    return scrollYProgress.onChange((latest) => {
      const step = Math.min(
        howItWorks.steps.length - 1,
        Math.floor(latest * howItWorks.steps.length)
      );
      setActiveStep(step);
    });
  }, [scrollYProgress, howItWorks.steps.length]);

  const handleStepClick = (index: number) => {
    const element = document.getElementById(`step-content-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <section id="how-it-works" className="container mx-auto pt-8 sm:pt-10 pb-24 sm:pb-32">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
          {howItWorks.heading}
        </h2>
      </div>
      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        <div ref={targetRef} className="space-y-16">
          {howItWorks.steps.map((step, index) => (
            <div id={`step-content-${index}`} key={step.title} className="min-h-[60vh] flex flex-col justify-center">
              <h3 className="text-2xl font-display font-medium">{step.title}</h3>
              <p className="mt-4 text-lg text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="sticky top-24 h-min">
          <div className="relative w-full min-h-[60vh] bg-card border rounded-xl shadow-lg flex items-center justify-center overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="w-full h-full"
              >
                <VisualDisplay visual={howItWorks.steps[activeStep].visual} />
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="mt-8 flex justify-center gap-4">
            {howItWorks.steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepClick(index)}
                className={cn(
                  'h-2 w-8 rounded-full transition-colors',
                  activeStep === index ? 'bg-primary' : 'bg-muted'
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

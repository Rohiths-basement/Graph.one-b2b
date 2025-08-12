'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import copy from '@/copy.json';
import { FaqCopy, FaqItem } from '@/lib/types';

export const Faq = () => {
  const { faq }: { faq: FaqCopy } = copy;

  const animationVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <motion.section
      id="faq"
      className="container mx-auto py-20 sm:py-32"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={animationVariants}
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-grotesk font-bold tracking-tighter text-center mb-12">
          {faq.title}
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faq.items.map((item: FaqItem) => (
            <AccordionItem key={item.question} value={item.question}>
              <AccordionTrigger className="text-left font-medium">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

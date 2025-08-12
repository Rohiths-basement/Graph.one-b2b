'use client';

import { motion, Variants } from 'framer-motion';
import copy from '@/copy.json';
import { ValueProps as ValuePropsCopy, ValuePropsCard } from '@/lib/types';
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Persona = 'revenue' | 'people';

export const ValueProps = ({ persona }: { persona: Persona }) => {
  const { valueProps }: { valueProps: ValuePropsCopy } = copy;

  const revenueOrder = ['Sales', 'Partnerships', 'Customers', 'Hiring', 'Bonding'];
  const peopleOrder = ['Hiring', 'Bonding', 'Sales', 'Customers', 'Partnerships'];

  const orderedCards = (persona === 'people' ? peopleOrder : revenueOrder)
    .map(title => valueProps.cards.find(card => card.title === title))
    .filter((card): card is ValuePropsCard => card !== undefined);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
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

  const underlineVariants: Variants = {
    initial: { width: '24px' },
    hover: { width: '100%', transition: { duration: 0.3, ease: 'easeOut' } },
  };

  return (
    <motion.section
      id="value-props"
      className="container mx-auto py-8 md:py-10"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="text-center mb-16">
        <motion.h2
          className="text-3xl md:text-4xl font-display font-medium tracking-tight"
          variants={itemVariants}
        >
          {valueProps.heading}
        </motion.h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {orderedCards.map((card: ValuePropsCard) => (
          <motion.div
            key={card.title}
            variants={itemVariants}
            whileHover="hover"
            initial="initial"
            className="relative p-6 bg-card border rounded-lg h-full flex flex-col group"
          >
            <div className="flex flex-col flex-grow">
              <h3 className="font-display text-xl font-medium">{card.title}</h3>
              <motion.div
                className="h-[2px] bg-accent mt-2"
                variants={underlineVariants}
              />
              <p className="pt-4 text-muted-foreground flex-grow">{card.description}</p>
              <ul className="space-y-2 text-sm mt-4">
                {card.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-1 flex-shrink-0 text-accent" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
              <div className="flex-grow" />
              <div className="mt-6 pt-4 border-t flex justify-between items-end">
                <p className="text-sm font-medium text-foreground/60 max-w-[70%]">
                  {card.proof}
                </p>
                <motion.div
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Button variant="link" size="sm" className="p-0 h-auto whitespace-nowrap">
                    Try it <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

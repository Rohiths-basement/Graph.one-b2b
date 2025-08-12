'use client';

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { HowItWorksStep } from '@/lib/types';

import { SourceConnector } from './SourceConnector';
import { PathPreview } from './PathPreview';

const mockPath = [
  { label: 'You', badge: 'You' },
  { label: 'John Smith', badge: 'Your Colleague' },
  { label: 'Anna Wong', badge: 'CEO at Acme Inc.' },
];

const components: { [key: string]: React.ComponentType<object> } = {
  SourceConnector,
  PathPreview: () => <PathPreview nodes={mockPath} />,
};

const animation = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

export const VisualDisplay = ({ visual }: { visual: HowItWorksStep['visual'] }) => {
  const { type, component, language, code } = visual;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={type === 'code' ? 'code' : component}
        variants={animation}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ duration: 0.3, ease: 'easeInOut' }}
        className="w-full h-full flex items-center justify-center"
      >
        {type === 'ui' && component && components[component] ? (
          React.createElement(components[component])
        ) : type === 'code' && code ? (
          <div className="w-full max-w-md mx-auto text-sm">
            <SyntaxHighlighter language={language} style={atomDark} customStyle={{ borderRadius: '0.5rem' }}>
              {code}
            </SyntaxHighlighter>
          </div>
        ) : null}
      </motion.div>
    </AnimatePresence>
  );
};

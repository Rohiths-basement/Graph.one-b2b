'use client';

import { motion, Variants } from 'framer-motion';
import { Mail, MessageSquare, Briefcase } from 'lucide-react';

const sources = [
  { name: 'Google Workspace', icon: Mail, description: 'Gmail & Calendar' },
  { name: 'Microsoft 365', icon: Briefcase, description: 'Outlook & Teams' },
  { name: 'Slack', icon: MessageSquare, description: 'Channels & DMs' },
];

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: 'easeOut',
    },
  }),
};

export const SourceConnector = () => {
  return (
    <div className="bg-card p-6 rounded-lg border shadow-sm w-full max-w-md mx-auto">
      <h3 className="font-medium text-center mb-1 text-lg">Connect your sources</h3>
      <p className="text-muted-foreground text-center text-sm mb-6">Graph.one builds its model on your existing communication data.</p>
      <div className="space-y-3">
        {sources.map((source, i) => (
          <motion.div
            key={source.name}
            className="flex items-center justify-between p-3 bg-background rounded-md border"
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <div className="flex items-center gap-4">
              <source.icon className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="font-medium">{source.name}</p>
                <p className="text-xs text-muted-foreground">{source.description}</p>
              </div>
            </div>
            <div className="h-5 w-5 rounded-full bg-green-500 border-4 border-green-200" />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

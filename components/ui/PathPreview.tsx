'use client';

import { motion } from 'framer-motion';
import { Button } from './button';
import { useToast } from '@/components/ui/use-toast';

interface PathNode {
  label: string;
  badge?: string;
}

interface PathPreviewProps {
  nodes: PathNode[];
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const CurvedConnector = () => (
  <motion.svg
    width="120"
    height="60"
    viewBox="0 0 120 60"
    aria-hidden
    className="text-slate-300 mx-2"
  >
    <motion.path
      d="M10 30 C 40 10, 80 10, 110 30"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 0.42, ease: 'easeInOut' }}
    />
  </motion.svg>
);

export const PathPreview: React.FC<PathPreviewProps> = ({ nodes }) => {
  const { toast } = useToast();

  const handleCopy = () => {
    const blurb = `Can you intro me to ${nodes[nodes.length - 1].label}? Saw via Graph.one they're connected to you through ${nodes[1].label}.`;
    navigator.clipboard.writeText(blurb);
    toast({
      title: 'Copied to clipboard',
      description: 'Forwardable blurb is ready to paste.',
    });
  };

  return (
    <motion.div
      className="w-full max-w-[720px] mx-auto mt-6 text-left"
      initial="hidden"
      animate="show"
      variants={{ show: { transition: { staggerChildren: 0.1 } } }}
    >
      <motion.div
        className="bg-white/60 backdrop-blur-[2px] border border-slate-200 rounded-xl p-4 flex items-center justify-between"
        variants={fadeUp}
      >
        <div className="flex items-center">
          {nodes.map((node, i) => (
            <div key={i} className="flex items-center">
              <div className="flex flex-col items-center text-center">
                <span className="text-sm font-medium text-slate-800">{node.label}</span>
                {node.badge && (
                  <span className="text-xs text-slate-500">{node.badge}</span>
                )}
              </div>
              {i < nodes.length - 1 && <CurvedConnector />}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm">Request intro</Button>
          <Button size="sm" variant="ghost" onClick={handleCopy}>
            Copy blurb
          </Button>
        </div>
      </motion.div>
      <motion.p className="text-xs text-slate-400 mt-3 ml-2" variants={fadeUp}>
        ≤3 hops • under 60s to first path
      </motion.p>
    </motion.div>
  );
};

'use client';

import { useState } from 'react';
import { Switch } from '@/components/ui/switch';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { HelpCircle } from 'lucide-react';

interface PrivacyToggleProps {
  title: string;
  description: string;
  initialChecked?: boolean;
}

export const PrivacyToggle = ({ title, description, initialChecked = true }: PrivacyToggleProps) => {
  const [isChecked, setIsChecked] = useState(initialChecked);

  return (
    <div
      className="flex items-center justify-between rounded-lg border bg-card p-4"
    >
      <div className="flex items-center gap-4">
        <Switch
          checked={isChecked}
          onCheckedChange={setIsChecked}
          aria-label={title}
        />
        <span className="font-medium text-left">{title}</span>
      </div>
      <Popover>
        <PopoverTrigger asChild>
          <button aria-label="More info">
            <HelpCircle className="h-5 w-5 text-muted-foreground" />
          </button>
        </PopoverTrigger>
        <PopoverContent align="end" className="max-w-xs text-sm">
          {description}
        </PopoverContent>
      </Popover>
    </div>
  );
};

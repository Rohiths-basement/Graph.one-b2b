'use client';

import { useState, useEffect } from 'react';
import { motion, useSpring, animate } from 'framer-motion';
import copy from '@/copy.json';
import { RoiCalculators, RoiMetric } from '@/lib/types';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AnimatedNumber = ({
  value,
  format,
}: { 
  value: number;
  format?: 'number' | 'currency';
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const spring = useSpring(0, { damping: 20, stiffness: 100 });

  useEffect(() => {
    const controls = animate(spring, value, {
      type: 'spring',
      onUpdate: (latest) => setDisplayValue(Math.round(latest)),
    });
    return () => controls.stop();
  }, [value, spring]);

  const formattedValue = displayValue.toLocaleString('en-US', {
    style: format === 'currency' ? 'currency' : 'decimal',
    currency: 'USD',
    maximumFractionDigits: 0,
  });

  return <motion.span>{format === 'currency' ? formattedValue : displayValue.toLocaleString()}</motion.span>;
};

export const RoiCalculator = () => {
  const { roiCalculators } = copy as { roiCalculators: RoiCalculators };
  const [mode, setMode] = useState<'people' | 'revenue'>('people');
  const [values, setValues] = useState<Record<string, number>>({});

  const calculatorConfig = roiCalculators[mode];

  useEffect(() => {
    const defaultValues = calculatorConfig.metrics.reduce((acc, metric) => {
      acc[metric.id] = metric.defaultValue;
      return acc;
    }, {} as Record<string, number>);
    setValues(defaultValues);
  }, [mode, calculatorConfig.metrics]);

  const handleSliderChange = (id: string, newValue: number[]) => {
    setValues((prev) => ({ ...prev, [id]: newValue[0] }));
  };

  const primaryResult = (() => {
    if (mode === 'people') {
      const { calculation } = calculatorConfig;
      const totalHires = values.hiring || 0;
      const totalEmployees = values.employees || 0;

      const referralHires = Math.floor(totalEmployees / (calculation.employeeToReferralHireRatio || 1));
      const actualReferralHires = Math.min(totalHires, referralHires);
      const standardHires = totalHires - actualReferralHires;

      const hoursSaved = (standardHires * (calculation.hoursSavedPerStandardHire || 0)) + (actualReferralHires * (calculation.hoursSavedPerReferralHire || 0));
      return hoursSaved;
    }
    if (mode === 'revenue') {
      const dealsFromReps = (values.reps || 0) * (calculatorConfig.calculation.dealsPerRepPerYear || 0);
      const dealsFromNetwork = (values.employees || 0) / (calculatorConfig.calculation.employeeToOneDealRatio || 1);
      const totalDeals = dealsFromReps + dealsFromNetwork;
      const revenueGained = totalDeals * (values.dealSize || 0);
      return revenueGained;
    }
    return 0;
  })();

  const secondaryResult = (() => {
    if (mode === 'people') {
      const moneySaved = primaryResult * (calculatorConfig.calculation.avgHourlyRate || 0);
      return moneySaved;
    }
    return 0;
  })();

  const formatValue = (value: number, format?: 'number' | 'currency') => {
    if (format === 'currency') {
      return value.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
    }
    return value.toLocaleString();
  }

  return (
    <section id="roi-calculator" className="py-24 sm:py-32 bg-muted/20">
      <div className="container mx-auto">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-display font-medium tracking-tight">
            {calculatorConfig.heading}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {calculatorConfig.description}
          </p>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          <Button onClick={() => setMode('people')} variant={mode === 'people' ? 'default' : 'outline'}>For People Teams</Button>
          <Button onClick={() => setMode('revenue')} variant={mode === 'revenue' ? 'default' : 'outline'}>For Revenue Teams</Button>
        </div>

        <div className="mt-12 max-w-4xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            {calculatorConfig.metrics.map((metric: RoiMetric) => (
              <div key={metric.id}>
                <div className="flex justify-between items-end mb-2">
                  <label htmlFor={metric.id} className="font-medium">
                    {metric.label}
                  </label>
                  <span className="font-mono text-lg font-semibold">
                    {values[metric.id] ? formatValue(values[metric.id], metric.format) : ''}
                  </span>
                </div>
                <Slider
                  id={metric.id}
                  min={metric.min}
                  max={metric.max}
                  step={metric.step}
                  value={[values[metric.id] || metric.min]}
                  onValueChange={(val) => handleSliderChange(metric.id, val)}
                />
              </div>
            ))}
          </div>

          <div className="bg-card p-8 rounded-xl border shadow-lg min-h-[210px]">
            <div className={cn('grid gap-8 text-center', mode === 'people' ? 'grid-cols-2' : 'grid-cols-1')}>
              <div>
                <p className="text-muted-foreground mb-2">{calculatorConfig.results.primaryLabel}</p>
                <p className="text-4xl font-display font-bold text-primary">
                  <AnimatedNumber value={primaryResult} format={mode === 'revenue' ? 'currency' : 'number'} />
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-2">{calculatorConfig.results.secondaryLabel}</p>
                {mode === 'people' && (
                  <p className="text-4xl font-display font-bold text-primary">
                    <AnimatedNumber value={secondaryResult} format="currency" />
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

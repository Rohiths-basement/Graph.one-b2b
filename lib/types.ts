export interface NavLink {
  label: string;
  href: string;
}

export interface Nav {
  links: NavLink[];
  cta1: string;
  cta2: string;
}

export interface HeroPersonaCopy {
  subheading: string;
  cta1: string;
  cta2: string;
  chips: string[];
}

export interface HeroCopy {
  heading: string;
  revenue: HeroPersonaCopy;
  people: HeroPersonaCopy;
}

export interface ValuePropsCard {
  title: string;
  description: string;
  bullets: string[];
  proof: string;
}

export interface ValueProps {
  heading: string;
  cards: ValuePropsCard[];
}

export interface HowItWorksStep {
  title: string;
  description: string;
  visual: {
    type: 'code' | 'ui';
    language?: string;
    code?: string;
    component?: string;
  };
}

export interface HowItWorks {
  heading: string;
  steps: HowItWorksStep[];
}

export interface PrivacyChecklistItem {
  title: string;
  description: string;
}

export interface Privacy {
  heading: string;
  explainer: string;
  checklist: PrivacyChecklistItem[];
}

export interface IntegrationLogo {
  name: string;
  tooltip: string;
  src: string;
}

export interface Integrations {
  heading: string;
  logos: IntegrationLogo[];
}

export interface RoiMetric {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  defaultValue: number;
  format?: 'number' | 'currency';
}

export interface RoiCalculation {
  avgHourlyRate?: number;

  // For People Teams
  hoursSavedPerStandardHire?: number;
  hoursSavedPerReferralHire?: number;
  employeeToReferralHireRatio?: number;

  // For Revenue Teams
  dealsPerRepPerYear?: number;
  employeeToOneDealRatio?: number;
}

export interface RoiResult {
  primaryLabel: string;
  secondaryLabel: string;
}

export interface RoiCalculator {
  heading: string;
  description: string;
  metrics: RoiMetric[];
  calculation: RoiCalculation;
  results: RoiResult;
}

export interface RoiCalculators {
  people: RoiCalculator;
  revenue: RoiCalculator;
}

interface PersonaCtaContent {
  heading: string;
  cta: string;
  subtext: string;
}

export interface FinalCta {
  revenue: PersonaCtaContent;
  people: PersonaCtaContent;
}

export interface Footer {
  copyright: string;
  links: NavLink[];
}

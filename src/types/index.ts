export type IconName =
  | 'Cpu'
  | 'Bot'
  | 'Box'
  | 'Brain'
  | 'Rocket'
  | 'Handshake'
  | 'Globe'
  | 'Sparkles'
  | 'Layers'
  | 'Database'
  | 'Cog'
  | 'Code2'
  | 'LineChart'
  | 'ShieldCheck'
  | 'Lightbulb'
  | 'Workflow'
  | 'Stethoscope'
  | 'Landmark'
  | 'Factory'
  | 'GraduationCap'
  | 'ShoppingBag'
  | 'Building2'
  | 'FlaskConical'
  | 'Compass'
  | 'Terminal'
  | 'CheckCircle2';

export interface NavDropdownItem {
  label: string;
  description: string;
  to: string;
  icon: IconName;
  image?: string;
  imageAlt?: string;
  tag?: string;
}

export interface NavItem {
  label: string;
  to: string;
  dropdown?: NavDropdownItem[];
  dropdownTitle?: string;
  dropdownCtaLabel?: string;
  dropdownCtaTo?: string;
}

export interface SolutionItem {
  slug: string;
  title: string;
  shortTitle?: string;
  kicker: string;
  shortDescription: string;
  overview: string;
  whatItMeans: string;
  businessProblems: string[];
  zenovaisApproach: string;
  capabilities: string[];
  applicationAreas: string[];
  relatedServiceSlugs: string[];
  icon: IconName;
  featuredOnHome: boolean;
  image: string;
  imageAlt: string;
}

export interface ProductItem {
  slug: string;
  name: string;
  category: string;
  tagline: string;
  shortDescription: string;
  overview: string;
  features: string[];
  howItWorks: { step: string; title: string; detail: string }[];
  benefits: string[];
  technologyOverview?: string;
  image: string;
  imageAlt: string;
  externalUrl?: string;
}

export interface ServiceItem {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  capabilities: string[];
  deliverables: string[];
  idealFor: string;
  icon: IconName;
}

export interface IndustryItem {
  slug: string;
  title: string;
  shortDescription: string;
  overview: string;
  challenges: string[];
  aiOpportunities: string[];
  solutionApplications: string[];
  relatedServiceSlugs: string[];
  icon: IconName;
  image: string;
  imageAlt: string;
}

export interface ResearchArticle {
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  coverImage: string;
  coverAlt: string;
  summary: string;
  sections: { heading: string; body: string }[];
  keyTakeaways: string[];
}

export interface JobOpening {
  id: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  experienceLevel: string;
  description: string;
  responsibilities: string[];
  requiredSkills: string[];
}

export interface VerifiedMetric {
  id: string;
  value: number;
  suffix?: string;
  label: string;
  context: string;
}

export interface ImpactPillar {
  id: string;
  index: string;
  title: string;
  description: string;
  icon: IconName;
}

export interface TestimonialItem {
  id: string;
  name: string;
  designation: string;
  company: string;
  avatarUrl?: string;
  quote: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

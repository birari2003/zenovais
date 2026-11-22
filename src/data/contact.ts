import { FAQItem } from '../types';

export const contactPageMeta = {
  seo: {
    title: 'Contact Us',
    description:
      'Get in touch with Zenovais Technologies. Discuss enterprise AI solutions, custom software engineering, strategic partnerships, or general enquiries.',
    keywords:
      'contact Zenovais, hire AI engineers, contact AI company, enterprise software consultation, AI advisory contact',
  },
  hero: {
    kicker: 'Contact Zenovais',
    title: "Let's Start Something",
    titleHighlight: 'Intelligent.',
    description:
      'Have an idea, a challenge or an opportunity? Let’s explore how Zenovais Technologies can help.',
  },
};

export const contactServiceOptions = [
  'Artificial Intelligence',
  'Generative AI',
  'Agentic AI',
  'AI Automation',
  'Custom Software Development',
  'Enterprise AI',
  'Other',
] as const;

export const projectBudgetOptions = [
  'Prefer to discuss during discovery',
  'Exploring initial proof of concept',
  'Focused departmental deployment',
  'Enterprise-wide platform initiative',
] as const;

/**
 * Configurable contact metadata.
 * Only populate verified official addresses/links when finalized.
 */
export const contactInfoConfig = {
  website: 'zenovais.com',
  businessEmail: import.meta.env.VITE_CONTACT_EMAIL || '',
  officeLocation: import.meta.env.VITE_OFFICE_LOCATION || '',
  responseCommitment:
    'Every enquiry submitted through this form is validated securely and reviewed directly by our engineering and strategy leadership.',
};

export const contactFaqs: FAQItem[] = [
  {
    question: 'What types of organizations does Zenovais Technologies work with?',
    answer:
      'We collaborate with enterprises, growth-stage technology companies, and domain leaders looking to build AI-native products, agentic automation workflows, RAG knowledge platforms, and resilient custom software.',
  },
  {
    question: 'Do we need a fully defined AI specification before reaching out?',
    answer:
      'No. Many engagements begin with an AI Consulting & Strategy discovery phase where we evaluate operational workflows, data readiness, and architectural feasibility together before committing to full engineering delivery.',
  },
  {
    question: 'How does Zenovais approach data privacy and enterprise security?',
    answer:
      'We design architectures with strict tenant and permission boundaries, environment-isolated secrets, minimal data retention, and provider-agnostic model gateways so sensitive organizational data remains governed.',
  },
  {
    question: 'Can Zenovais integrate AI capabilities into our existing software stack?',
    answer:
      'Yes. Our engineering team builds clean APIs, retrieval layers, and event-driven automation pipelines designed to connect seamlessly with existing ERP, CRM, database, and cloud infrastructure.',
  },
];

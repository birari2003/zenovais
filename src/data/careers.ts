import { IconName, JobOpening } from '../types';

export const careersPageMeta = {
  seo: {
    title: 'Careers',
    description:
      'Join the team building intelligent tomorrow. Explore our engineering culture, core values, areas of opportunity, and join our talent community.',
    keywords:
      'Zenovais careers, AI engineering jobs, software engineer jobs, AI careers, tech hiring, talent community',
  },
  hero: {
    kicker: 'Careers at Zenovais',
    title: 'Build the Future',
    titleHighlight: 'With Us.',
    description:
      'Join a team driven by curiosity, innovation and the ambition to create meaningful technology.',
  },
};

export const whyZenovais = [
  {
    title: 'Meaningful Technical Challenges',
    description:
      'Work on applied AI, agentic architectures, and full-stack software systems that solve real operational problems.',
    icon: 'Cpu' as IconName,
  },
  {
    title: 'High-Ownership Engineering Culture',
    description:
      'Collaborate in focused teams where clarity of thought, clean architecture, and craft matter more than bureaucracy.',
    icon: 'Code2' as IconName,
  },
  {
    title: 'Continuous Research Mindset',
    description:
      'Stay close to rapidly advancing AI and intelligent systems while maintaining rigorous production standards.',
    icon: 'FlaskConical' as IconName,
  },
  {
    title: 'Purposeful Global Ambition',
    description:
      'Contribute to products and enterprise platforms built for clarity, reliability, and lasting impact.',
    icon: 'Globe' as IconName,
  },
];

export const opportunityAreas = [
  {
    title: 'AI / ML Engineering',
    description: 'Model integration, evaluation harnesses, retrieval pipelines, and applied machine learning.',
  },
  {
    title: 'Software Development',
    description: 'Resilient backend services, distributed systems, API architecture, and system reliability.',
  },
  {
    title: 'Full Stack Development',
    description: 'Modern TypeScript, React, Node.js, and responsive cloud product engineering.',
  },
  {
    title: 'Product Design',
    description: 'Human-centered UX for complex AI workflows, design systems, and crisp interfaces.',
  },
  {
    title: 'Research & Innovation',
    description: 'Agentic workflows, intelligent automation prototypes, and emerging systems inquiry.',
  },
  {
    title: 'Business Development',
    description: 'Enterprise partnerships, solution advisory, and long-term client relationship building.',
  },
];

/**
 * Dynamic job openings registry.
 * Keep empty when no active openings are published; adding entries automatically
 * enables filtering, JobCard listings, and /careers/:jobId detail pages.
 */
export const jobOpenings: JobOpening[] = [];

export const applicationProcessSteps = [
  {
    step: '01',
    title: 'Profile Review',
    description: 'We carefully review your engineering, design, or strategic background and past work.',
  },
  {
    step: '02',
    title: 'Introductory Conversation',
    description: 'A focused discussion around your interests, experience, and how you approach problem-solving.',
  },
  {
    step: '03',
    title: 'Technical or Craft Deep-Dive',
    description: 'Collaborative architecture, code, or portfolio discussion grounded in realistic scenarios.',
  },
  {
    step: '04',
    title: 'Team Alignment & Offer',
    description: 'Mutual alignment on role scope, growth expectations, and joining Zenovais.',
  },
];

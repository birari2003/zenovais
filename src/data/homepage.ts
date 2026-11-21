import { IconName, ImpactPillar, TestimonialItem, VerifiedMetric } from '../types';
import { siteImages } from './assets';

export const homepageContent = {
  hero: {
    kicker: 'AI-First Technology Company',
    headlineLine1: 'Zenovais Technologies',
    headlineHighlight: 'Building Intelligent',
    headlineEnd: 'Tomorrow, Together.',
    description:
      'We are an AI-driven technology company, creating intelligent products, AI agents, automation systems, and next-generation digital solutions.',
    primaryCta: { label: 'Explore Our Solutions', to: '/ai-solutions' },
    secondaryCta: { label: 'Watch Company Video' },
    highlights: [
      { label: 'Artificial Intelligence', icon: 'Cpu' as IconName },
      { label: 'Agentic AI & Automation', icon: 'Bot' as IconName },
      { label: 'Next-Gen Products', icon: 'Box' as IconName },
    ],
    image: siteImages.heroWorkspace,
    imageAlt: 'Zenovais Technologies sunlit architectural office and engineering workspace',
  },
  aboutSection: {
    kicker: 'About Zenovais',
    title: 'Innovating Today.',
    titleHighlight: 'Transforming Tomorrow.',
    description:
      'Zenovais Technologies is an AI-first technology company, focused on building intelligent products, AI agents, and automation systems. We are on a mission to harness the power of Artificial Intelligence to build smarter solutions, enable businesses and create a more intelligent world.',
    principles: [
      {
        title: 'AI-First Approach',
        description: 'Building intelligent solutions for a smarter future.',
        icon: 'Brain' as IconName,
      },
      {
        title: 'Innovation Driven',
        description: 'Exploring new possibilities with cutting-edge research.',
        icon: 'Rocket' as IconName,
      },
      {
        title: 'Client-Centric',
        description: 'Your success is our core purpose.',
        icon: 'Handshake' as IconName,
      },
      {
        title: 'Global Vision',
        description: 'Creating impact beyond boundaries.',
        icon: 'Globe' as IconName,
      },
    ],
    cta: { label: 'Learn More', to: '/about' },
    tagline: 'BUILD · INNOVATE · GROW',
    image: siteImages.aboutWorkspace,
    imageAlt: 'Zenovais engineering team collaborating around hardware and AI workspace systems',
  },
  brandMeaning: {
    kicker: 'Brand Philosophy',
    title: 'A New Vision of Intelligent Technology.',
    note: 'A proposed brand interpretation reflecting the architectural foundation behind our coined name.',
    pillars: [
      {
        segment: 'ZENO',
        meaning: 'Zen-like clarity, balance and thoughtful innovation.',
      },
      {
        segment: 'NOVA',
        meaning: 'A new beginning, breakthrough and powerful innovation.',
      },
      {
        segment: 'AIS',
        meaning: 'Artificial Intelligence and intelligent systems.',
      },
      {
        segment: 'TECHNOLOGIES',
        meaning: 'Engineering, research, software and future technology.',
      },
    ],
  },
  solutionsSection: {
    kicker: 'AI Solutions',
    title: 'Intelligent Solutions for a Smarter Future',
    subtitle:
      'From AI agents to automation, we build cutting-edge solutions that help businesses innovate, automate and grow.',
    ctaLabel: 'Explore All Solutions',
    ctaTo: '/ai-solutions',
  },
  productsSection: {
    kicker: 'Products',
    title: 'Intelligent Products. Real-World Impact.',
    subtitle:
      'Discover innovative digital products designed to solve real-world challenges and create meaningful experiences.',
    ctaLabel: 'Explore Products Architecture',
    ctaTo: '/products',
  },
  servicesSection: {
    kicker: 'Our Services',
    title: 'Building, Automating and Scaling Your Ideas',
    subtitle:
      'From strategy to deployment, we offer end-to-end AI and software development services.',
    image: siteImages.servicesTeam,
    imageAlt: 'Zenovais software architects and AI engineers collaborating in natural daylight',
    ctaLabel: 'Explore All Services',
    ctaTo: '/services',
  },
  industriesSection: {
    kicker: 'Industries We Serve',
    title: 'Empowering Diverse Industries',
    description: 'Our AI solutions are designed to create value across multiple industries.',
    ctaLabel: 'Explore Industry Applications',
    ctaTo: '/industries',
  },
  researchSection: {
    kicker: 'Research & Innovation',
    title: 'Pioneering the Next Frontier',
    description:
      'We invest in research and innovation to shape the future of AI, robotics and digital technology.',
    focusAreas: [
      'Artificial Intelligence Research',
      'Generative AI Exploration',
      'Agentic AI Research',
      'Emerging Technologies',
      'Robotics and Intelligent Systems',
    ],
    ctaLabel: 'Explore Research & Innovation',
    ctaTo: '/research',
    image: siteImages.researchLab,
    imageAlt: 'Precision AI compute processor module in a clean modern R&D hardware lab',
  },
  impactSection: {
    kicker: 'Our Standards & Impact',
    title: 'Innovation That Creates Impact',
    subtitle:
      'Every architecture we deliver is measured by engineering reliability, clarity of purpose, and durable operational value.',
    // Keep verifiedMetrics empty until audited corporate figures are supplied.
    verifiedMetrics: [] as VerifiedMetric[],
    qualitativePillars: [
      {
        id: 'lifecycle',
        index: '01',
        title: 'End-to-End AI Lifecycle',
        description:
          'Unified engineering from discovery and architecture design through production deployment and continuous evaluation.',
        icon: 'Workflow',
      },
      {
        id: 'security',
        index: '02',
        title: 'Enterprise-Grade Governance',
        description:
          'Privacy-conscious data handling, role-scoped retrieval boundaries, and deterministic system guardrails built in by default.',
        icon: 'ShieldCheck',
      },
      {
        id: 'modularity',
        index: '03',
        title: 'Modular & Scalable Core',
        description:
          'Composable agentic workflows and clean APIs designed to adapt as foundation models and business requirements evolve.',
        icon: 'Layers',
      },
      {
        id: 'craft',
        index: '04',
        title: 'Production Engineering Rigor',
        description:
          'Maintainable TypeScript, Python, and distributed systems standards engineered for long-term operational clarity.',
        icon: 'Code2',
      },
    ] as ImpactPillar[],
  },
  testimonialsSection: {
    kicker: 'Client Perspectives',
    title: 'What Our Clients Say',
    // Keep empty until verified client testimonials are provided.
    items: [] as TestimonialItem[],
    emptyState: {
      headline: 'Built for Long-Term Enterprise Partnerships',
      description:
        'Verified client case studies and executive testimonials will be published here as engagements conclude public review. Interested in piloting an intelligent system with Zenovais?',
      ctaLabel: 'Discuss a Pilot Engagement',
      ctaTo: '/contact',
    },
  },
  finalCta: {
    title: "Let's Build Something Intelligent Together",
    description:
      'Partner with Zenovais Technologies to transform your ideas into next-generation solutions.',
    ctaLabel: 'Get in Touch',
    ctaTo: '/contact',
    image: siteImages.executiveBoardroom,
    imageAlt: 'Zenovais executive conference boardroom overlooking modern skyline',
  },
  videoModal: {
    title: 'Zenovais Technologies — Company Overview',
    subtitle: 'A New Vision of Intelligent Technology',
    description:
      'Inside Zenovais: how our engineering and research teams architect intelligent products, autonomous agent workflows, and enterprise software systems.',
    chapters: [
      { time: '00:00', title: 'AI-First Engineering Philosophy', detail: 'Clarity, reliability, and human-centered automation.' },
      { time: '00:45', title: 'Agentic AI & Retrieval Architectures', detail: 'Connecting enterprise knowledge to verifiable action.' },
      { time: '01:30', title: 'From Research Prototypes to Production', detail: 'Scalable SaaS platforms and physical-world intelligent systems.' },
    ],
  },
};

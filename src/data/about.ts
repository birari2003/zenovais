import { IconName } from '../types';
import { siteImages } from './assets';

export const aboutPageData = {
  seo: {
    title: 'About Us',
    description:
      'Learn about Zenovais Technologies — our mission, vision, core values, brand philosophy, and disciplined engineering approach to intelligent technology.',
  },
  hero: {
    kicker: 'About Zenovais Technologies',
    title: 'Technology with Purpose.',
    titleHighlight: 'Innovation with Vision.',
    description:
      'At Zenovais Technologies, we believe intelligent technology can transform how people and businesses operate. Our focus is on building meaningful AI-driven solutions that create lasting value.',
    image: siteImages.aboutWorkspace,
    imageAlt: 'Zenovais engineers and researchers collaborating at a sunlit technology workbench',
  },
  whoWeAre: {
    kicker: 'Who We Are',
    title: 'An AI-First Technology Organization',
    paragraphs: [
      'Zenovais Technologies operates as an AI-first engineering and product organization dedicated to building intelligent software, autonomous agents, and resilient enterprise systems. Rather than treating intelligence as an afterthought or thin wrapper, we architect systems where machine reasoning, retrieval, and deterministic engineering work together reliably.',
      'Our multidisciplinary focus spans intelligent SaaS products, agentic automation, retrieval-augmented enterprise knowledge platforms, custom software engineering, and intelligent physical-world integrations.',
    ],
    pillars: [
      'Intelligent Products',
      'AI Agents & Orchestration',
      'Process Automation',
      'Enterprise AI Systems',
      'Full-Stack Software Engineering',
      'Next-Generation Digital Solutions',
    ],
  },
  missionVision: {
    mission: {
      kicker: 'Our Mission',
      statement:
        'To harness the power of intelligent technology to solve meaningful problems, empower businesses and create a smarter future.',
    },
    vision: {
      kicker: 'Our Vision',
      statement:
        'To become a trusted technology innovator shaping the future through Artificial Intelligence, intelligent systems and transformative digital products.',
    },
  },
  coreValues: {
    kicker: 'Our Core Values',
    title: 'Principles That Guide Every Decision',
    items: [
      {
        title: 'Innovation',
        description: 'Continuously exploring practical breakthroughs that solve real operational challenges.',
        icon: 'Lightbulb' as IconName,
      },
      {
        title: 'Integrity',
        description: 'Transparent engineering, honest claims, and responsible stewardship of data and systems.',
        icon: 'ShieldCheck' as IconName,
      },
      {
        title: 'Excellence',
        description: 'Disciplined software craftsmanship, thorough testing, and measurable reliability.',
        icon: 'CheckCircle2' as IconName,
      },
      {
        title: 'Collaboration',
        description: 'Working closely alongside client teams as long-term technical partners.',
        icon: 'Handshake' as IconName,
      },
      {
        title: 'Customer Success',
        description: 'Defining engineering success by the tangible clarity and efficiency gained by users.',
        icon: 'Compass' as IconName,
      },
      {
        title: 'Continuous Learning',
        description: 'Staying grounded in evolving research while maintaining production engineering discipline.',
        icon: 'Brain' as IconName,
      },
    ],
  },
  approach: {
    kicker: 'Our Approach',
    title: 'How Ideas Become Intelligent Systems',
    subtitle:
      'A structured six-stage methodology engineered to reduce ambiguity and move from hypothesis to durable production.',
    steps: [
      {
        step: '01',
        title: 'Understand',
        description:
          'Examine business workflows, domain constraints, data readiness, and human decision points before writing code.',
      },
      {
        step: '02',
        title: 'Research',
        description:
          'Evaluate model capabilities, retrieval strategies, latency budgets, and architectural trade-offs systematically.',
      },
      {
        step: '03',
        title: 'Design',
        description:
          'Craft clean system boundaries, intuitive human-in-the-loop interfaces, and fault-tolerant API contracts.',
      },
      {
        step: '04',
        title: 'Build',
        description:
          'Implement modular TypeScript, Python, and AI pipelines with strict validation, observability, and security.',
      },
      {
        step: '05',
        title: 'Innovate',
        description:
          'Refine agent reasoning, automated evaluations, and adaptive workflows as real operational patterns emerge.',
      },
      {
        step: '06',
        title: 'Deliver',
        description:
          'Deploy cleanly into enterprise environments with documentation, governance controls, and ongoing optimization.',
      },
    ],
  },
  cta: {
    title: "Let's Create What's Next.",
    description:
      'Partner with Zenovais Technologies to architect intelligent products and automation systems built for lasting value.',
    ctaLabel: 'Start a Conversation',
    ctaTo: '/contact',
  },
};

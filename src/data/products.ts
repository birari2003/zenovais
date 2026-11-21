import { ProductItem } from '../types';
import { siteImages } from './assets';

export const productsPageMeta = {
  seo: {
    title: 'Products',
    description:
      'Explore Zenovais Technologies intelligent software product platforms and architectural foundations built to simplify workflows and solve real-world problems.',
  },
  hero: {
    kicker: 'Zenovais Products',
    title: 'Products Built for',
    titleHighlight: 'a Smarter World.',
    description:
      'Explore intelligent digital products designed to simplify workflows, improve experiences and solve meaningful problems.',
  },
};

/**
 * Centralized product registry.
 * Add verified Zenovais-owned product entries here to automatically populate
 * the homepage showcase, category filters, and dynamic /products/:slug pages.
 */
export const productsData: ProductItem[] = [];

/**
 * Architectural foundation tracks shown transparently while official
 * product releases are prepared for public launch.
 */
export const productBlueprintTracks = [
  {
    id: 'agentic-workspaces',
    category: 'Agentic Automation',
    title: 'Multi-Agent Workflow Foundations',
    summary:
      'Composable task orchestration systems that connect internal APIs, structured document pipelines, and human approval controls into a unified operational layer.',
    capabilities: [
      'Role-scoped tool invocation and audit trails',
      'Deterministic workflow checkpoints',
      'Modular connector architecture for enterprise stacks',
    ],
    image: siteImages.heroWorkspace,
    imageAlt: 'Zenovais workstation running modular agent workflow interfaces',
  },
  {
    id: 'knowledge-intelligence',
    category: 'Enterprise Knowledge',
    title: 'Grounded Knowledge & Retrieval Engines',
    summary:
      'Retrieval-augmented enterprise knowledge platforms built for cited answers, permission-aware indexing, and rapid organizational search.',
    capabilities: [
      'Hybrid semantic and lexical document indexing',
      'Verifiable source citations on every synthesized output',
      'Tenant-isolated data boundaries',
    ],
    image: siteImages.fintechEnterprise,
    imageAlt: 'Analyst workspace for grounded enterprise knowledge retrieval',
  },
  {
    id: 'intelligent-saas',
    category: 'AI-Powered SaaS',
    title: 'Domain-Specific SaaS Platforms',
    summary:
      'Cloud software products crafted with intuitive interfaces, streaming intelligence, and maintainable engineering from day one.',
    capabilities: [
      'Low-latency streaming interfaces',
      'Structured telemetry and quality evaluation',
      'Scalable multi-tenant cloud deployment',
    ],
    image: siteImages.aboutWorkspace,
    imageAlt: 'Zenovais engineering table showcasing product prototyping',
  },
];

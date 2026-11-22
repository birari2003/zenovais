import { IndustryItem } from '../types';
import { siteImages } from './assets';

export const industriesPageMeta = {
  seo: {
    title: 'Industries',
    description:
      'Domain-specific AI applications tailored for Healthcare, Fintech, Manufacturing, EdTech, Retail, and Enterprise operations.',
    keywords:
      'AI industries, healthcare AI, fintech AI, manufacturing robotics, edtech AI, retail ecommerce AI, enterprise intelligence',
  },
  hero: {
    kicker: 'Industries',
    title: 'Intelligent Technology',
    titleHighlight: 'Across Industries.',
    description:
      'We develop adaptable technology solutions that help businesses address industry-specific challenges.',
  },
};

export const industriesData: IndustryItem[] = [
  {
    slug: 'healthcare-life-sciences',
    title: 'Healthcare & Life Sciences',
    shortDescription:
      'Streamline clinical documentation, knowledge retrieval, and operational coordination with privacy-first AI architectures.',
    overview:
      'Healthcare and life sciences organizations manage dense clinical literature, regulatory documentation, and administrative workflows where precision and privacy are paramount.',
    challenges: [
      'Heavy administrative documentation burden on clinical and research staff.',
      'Critical clinical protocols and study findings scattered across siloed repositories.',
      'Strict privacy, auditability, and role-access requirements.',
    ],
    aiOpportunities: [
      'Permissioned Retrieval-Augmented Generation for clinical & research knowledge bases.',
      'Automated intake triage and structured administrative summarization.',
      'Intelligent workflow routing across care coordination and lab operations.',
    ],
    solutionApplications: [
      'Source-cited medical protocol assistants',
      'Structured clinical documentation workflows',
      'Research literature synthesis tools',
    ],
    relatedServiceSlugs: ['ai-data-engineering', 'custom-software-development'],
    icon: 'Stethoscope',
    image: siteImages.healthcareTech,
    imageAlt: 'Healthcare clinician reviewing analytical system on tablet in sunlit clinical center',
  },
  {
    slug: 'finance-fintech',
    title: 'Finance & Fintech',
    shortDescription:
      'Enhance analytical clarity, document verification, and governed operational automation across financial workflows.',
    overview:
      'Financial institutions and fintech innovators require deterministic audit trails, high-accuracy document extraction, and rapid risk signal synthesis.',
    challenges: [
      'Manual review of complex onboarding, underwriting, and compliance documents.',
      'Fragmented market, risk, and portfolio telemetry across legacy tools.',
      'Stringent governance demands requiring explainable outputs.',
    ],
    aiOpportunities: [
      'Automated KYC/onboarding document parsing with confidence thresholds.',
      'Grounded policy and regulatory compliance assistants.',
      'Anomaly monitoring and structured financial reporting pipelines.',
    ],
    solutionApplications: [
      'Intelligent underwriting intake automation',
      'Compliance knowledge retrieval workspaces',
      'Portfolio & operational analytics dashboards',
    ],
    relatedServiceSlugs: ['ai-consulting-strategy', 'automation-solutions'],
    icon: 'Landmark',
    image: siteImages.fintechEnterprise,
    imageAlt: 'Financial technology analyst reviewing performance metrics in glass office',
  },
  {
    slug: 'manufacturing-robotics',
    title: 'Manufacturing & Robotics',
    shortDescription:
      'Bridge industrial telemetry, computer vision inspection, and intelligent control software on modern production floors.',
    overview:
      'Modern manufacturing blends precision hardware with adaptive software intelligence—reducing unplanned downtime and elevating quality consistency.',
    challenges: [
      'Manual visual defect inspection creating throughput bottlenecks.',
      'Reactive maintenance schedules due to underutilized machine telemetry.',
      'Disconnected edge equipment and enterprise operations software.',
    ],
    aiOpportunities: [
      'Edge computer vision for real-time surface and assembly quality checks.',
      'Predictive maintenance analytics driven by multi-sensor telemetry.',
      'Supervisory robotics coordination and operator support interfaces.',
    ],
    solutionApplications: [
      'Automated visual inspection pipelines',
      'Equipment anomaly & health monitoring',
      'Connected factory floor control dashboards',
    ],
    relatedServiceSlugs: ['research-innovation', 'ai-data-engineering'],
    icon: 'Factory',
    image: siteImages.manufacturingRobotics,
    imageAlt: 'Automated industrial robotic assembly arm in modern manufacturing plant',
  },
  {
    slug: 'education-edtech',
    title: 'Education & EdTech',
    shortDescription:
      'Design adaptive learning tools, curriculum assistants, and intuitive academic workflow platforms.',
    overview:
      'Educational institutions and EdTech platforms benefit from personalized learning support, structured content organization, and reduced administrative friction.',
    challenges: [
      'One-size-fits-all learning experiences failing to match individual pacing.',
      'Time-intensive course material organization and assessment preparation.',
      'Disconnected student support and institutional knowledge systems.',
    ],
    aiOpportunities: [
      'Curriculum-aligned study assistants grounded strictly in approved materials.',
      'Adaptive formative feedback and concept mastery insights.',
      'Automated administrative scheduling and student enquiry routing.',
    ],
    solutionApplications: [
      'Grounded institutional study companions',
      'Interactive learning & simulation web platforms',
      'Automated academic content structuring',
    ],
    relatedServiceSlugs: ['product-development', 'custom-software-development'],
    icon: 'GraduationCap',
    image: siteImages.servicesTeam,
    imageAlt: 'Team collaborating on modern educational technology software',
  },
  {
    slug: 'retail-ecommerce',
    title: 'Retail & E-commerce',
    shortDescription:
      'Improve product discovery, catalog intelligence, and demand operations with purposeful AI systems.',
    overview:
      'Digital commerce teams compete on discovery relevance, catalog accuracy, and responsive operations across fulfillment and customer support.',
    challenges: [
      'Inconsistent product metadata limiting search and filtering precision.',
      'High support volume around order status, sizing, and product compatibility.',
      'Inventory imbalances driven by static demand forecasting.',
    ],
    aiOpportunities: [
      'Automated multimodal catalog enrichment and attribute extraction.',
      'Intent-aware semantic product search and guided discovery.',
      'Intelligent customer support triage integrated with order APIs.',
    ],
    solutionApplications: [
      'Catalog normalization & enrichment engines',
      'Semantic storefront search assistants',
      'Demand & inventory forecasting pipelines',
    ],
    relatedServiceSlugs: ['automation-solutions', 'product-development'],
    icon: 'ShoppingBag',
    image: siteImages.aboutWorkspace,
    imageAlt: 'Digital product design and commerce engineering workspace',
  },
  {
    slug: 'enterprise-technology',
    title: 'Enterprise & Technology',
    shortDescription:
      'Equip engineering and enterprise teams with governed AI workspaces, agentic pipelines, and scalable platforms.',
    overview:
      'Technology-forward enterprises need cohesive internal AI platforms, developer productivity tools, and automated cross-department workflows built on solid engineering standards.',
    challenges: [
      'Tool fragmentation slowing cross-functional engineering and operations.',
      'Lack of centralized governance for enterprise LLM integrations.',
      'High effort required to turn internal data silos into actionable interfaces.',
    ],
    aiOpportunities: [
      'Unified enterprise search and technical documentation copilots.',
      'Multi-agent workflow orchestration across ticketing, CRM, and CI systems.',
      'Custom internal SaaS applications with embedded intelligence.',
    ],
    solutionApplications: [
      'Internal engineering knowledge hubs',
      'Cross-system workflow automation agents',
      'Governed enterprise AI API gateways',
    ],
    relatedServiceSlugs: ['custom-software-development', 'ai-consulting-strategy'],
    icon: 'Building2',
    image: siteImages.heroWorkspace,
    imageAlt: 'Sunlit enterprise technology headquarters workspace',
  },
];

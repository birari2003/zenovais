import { SolutionItem } from '../types';
import { siteImages } from './assets';

export const solutionsPageMeta = {
  seo: {
    title: 'AI Solutions',
    description:
      'Explore Zenovais Technologies AI solutions: Machine Learning, Generative AI, Agentic AI, AI Automation, RAG & LLM Applications, Enterprise AI, Robotics, and AI-Powered SaaS.',
  },
  hero: {
    kicker: 'AI Solutions',
    title: 'Intelligence That Moves',
    titleHighlight: 'Businesses Forward.',
    description:
      'Discover intelligent technologies that help organizations automate processes, unlock insights and build innovative digital experiences.',
  },
};

export const solutionsData: SolutionItem[] = [
  {
    slug: 'artificial-intelligence-machine-learning',
    title: 'Artificial Intelligence & Machine Learning',
    kicker: 'Core Intelligence',
    shortDescription:
      'Build intelligent systems that understand data, identify patterns and support smarter decision-making.',
    overview:
      'Modern organizations generate vast operational telemetry yet struggle to translate raw signals into timely decisions. We engineer custom machine learning pipelines, predictive models, and computer vision systems tailored to real operational data.',
    whatItMeans:
      'Designing statistical and deep-learning models that learn directly from domain data to classify, forecast, detect anomalies, and interpret visual or structured inputs reliably.',
    businessProblems: [
      'Fragmented historical data without actionable forecasting capability.',
      'Manual inspection or triage bottlenecks slowing high-volume operations.',
      'Static rule engines that fail when real-world distributions shift.',
    ],
    zenovaisApproach:
      'We prioritize data quality, reproducible training pipelines, explainable evaluation metrics, and lightweight inference architectures that integrate cleanly into existing software stacks.',
    capabilities: [
      'Machine Learning',
      'Predictive Analytics',
      'Computer Vision',
      'Intelligent Data Processing',
    ],
    applicationAreas: [
      'Demand & capacity forecasting',
      'Visual quality inspection',
      'Operational anomaly detection',
      'Automated document classification',
    ],
    relatedServiceSlugs: ['ai-data-engineering', 'ai-consulting-strategy'],
    icon: 'Cpu',
    featuredOnHome: true,
    image: siteImages.aboutWorkspace,
    imageAlt: 'Machine learning engineering workstation in sunlit office',
  },
  {
    slug: 'generative-ai',
    title: 'Generative AI',
    kicker: 'Creative & Operational Synthesis',
    shortDescription:
      'Transform the way businesses create, communicate and work through generative intelligence.',
    overview:
      'Generative AI reshapes knowledge work when anchored to domain context, brand standards, and structured verification. We design controlled generative pipelines for text, code, structured data, and multimodal workflows.',
    whatItMeans:
      'Applying foundation language and multimodal models inside deterministic software guardrails to draft, synthesize, translate, and structure complex information.',
    businessProblems: [
      'Generic off-the-shelf prompts producing off-brand or unverified outputs.',
      'High manual overhead across synthesis, reporting, and content workflows.',
      'Lack of auditability and cost predictability in LLM usage.',
    ],
    zenovaisApproach:
      'Zenovais pairs structured prompt architectures, schema-enforced outputs, model routing, and human review gates so generative tools deliver consistent business utility.',
    capabilities: [
      'LLM Applications',
      'AI Content Generation',
      'Multimodal AI',
      'Enterprise Generative AI',
    ],
    applicationAreas: [
      'Structured executive reporting',
      'Multimodal catalog enrichment',
      'Technical documentation synthesis',
      'Customer communication drafting',
    ],
    relatedServiceSlugs: ['ai-consulting-strategy', 'custom-software-development'],
    icon: 'Sparkles',
    featuredOnHome: true,
    image: siteImages.servicesTeam,
    imageAlt: 'Engineering team reviewing generative AI application architecture',
  },
  {
    slug: 'agentic-ai',
    title: 'Agentic AI & Automation',
    kicker: 'Autonomous Execution',
    shortDescription:
      'Develop intelligent AI agents capable of understanding tasks, coordinating workflows and automating complex processes.',
    overview:
      'Moving beyond single-turn chat interfaces, agentic systems plan multi-step tasks, invoke verified APIs, inspect outcomes, and escalate edge cases cleanly to human operators.',
    whatItMeans:
      'Goal-directed software agents equipped with reasoning loops, memory boundaries, and typed tool integrations to execute multi-step workflows autonomously.',
    businessProblems: [
      'Disconnected SaaS tools requiring repetitive manual copy-paste coordination.',
      'Rigid RPA scripts that break whenever an interface or document format changes.',
      'Complex operational requests spanning multiple internal systems.',
    ],
    zenovaisApproach:
      'We architect bounded agentic workflows with strict tool schemas, permission scopes, execution tracing, and human-approval checkpoints for sensitive actions.',
    capabilities: [
      'Autonomous AI Agents',
      'Multi-Agent Systems',
      'Business Process Automation',
      'Intelligent Workflow Orchestration',
    ],
    applicationAreas: [
      'Cross-system operations routing',
      'Automated research & triage agents',
      'Vendor & ticket resolution pipelines',
      'Continuous workflow monitoring',
    ],
    relatedServiceSlugs: ['automation-solutions', 'ai-data-engineering'],
    icon: 'Bot',
    featuredOnHome: true,
    image: siteImages.heroWorkspace,
    imageAlt: 'Modern workspace running orchestrated agentic workflows',
  },
  {
    slug: 'rag-llm-applications',
    title: 'RAG & LLM Applications',
    kicker: 'Grounded Knowledge',
    shortDescription:
      'Unlock the potential of enterprise knowledge with intelligent retrieval and language model applications.',
    overview:
      'Enterprise intelligence depends on accuracy and source attribution. Our Retrieval-Augmented Generation architectures connect language models directly to permissioned internal repositories with verifiable citations.',
    whatItMeans:
      'Combining semantic vector search, hybrid keyword ranking, and citation-aware synthesis so LLMs answer strictly from verified organizational knowledge.',
    businessProblems: [
      'Critical knowledge trapped across PDFs, wikis, tickets, and databases.',
      'Unacceptable hallucination risk in compliance, legal, or technical queries.',
      'Access-control leaks when surfacing internal documents across teams.',
    ],
    zenovaisApproach:
      'We build document ingestion pipelines with intelligent chunking, hybrid retrieval, row-level permission filtering, and automated faithfulness evaluation.',
    capabilities: [
      'Retrieval-Augmented Generation',
      'Knowledge Assistants',
      'Enterprise Search',
      'LLM Integration',
    ],
    applicationAreas: [
      'Internal engineering & SOP copilots',
      'Policy & compliance knowledge retrieval',
      'Support intelligence assistants',
      'Research archive synthesis',
    ],
    relatedServiceSlugs: ['ai-data-engineering', 'custom-software-development'],
    icon: 'Database',
    featuredOnHome: true,
    image: siteImages.fintechEnterprise,
    imageAlt: 'Enterprise knowledge analyst querying financial retrieval system',
  },
  {
    slug: 'robotics-intelligent-systems',
    title: 'Robotics & Intelligent Systems',
    kicker: 'Physical-Digital Convergence',
    shortDescription:
      'Combine intelligent software and connected systems to enable smarter interactions with the physical world.',
    overview:
      'Intelligent software increasingly interfaces with physical sensors, edge compute units, and robotic actuators. We develop perception, telemetry, and supervisory control software for connected hardware environments.',
    whatItMeans:
      'Integrating computer vision, edge inference, sensor telemetry, and real-time control loops to give physical systems adaptive situational awareness.',
    businessProblems: [
      'Latency and bandwidth limits when streaming raw sensor feeds to the cloud.',
      'Rigid automation cells unable to adapt to part or environment variation.',
      'Fragmented telemetry across factory floors or connected hardware fleets.',
    ],
    zenovaisApproach:
      'We design clean edge-to-cloud architectures, deterministic safety envelopes, and high-throughput telemetry interfaces bridging AI perception with physical control.',
    capabilities: [
      'Robotics',
      'Intelligent Systems',
      'Sensor Integration',
      'AI-Driven Control Systems',
    ],
    applicationAreas: [
      'Automated visual inspection cells',
      'Edge telemetry & anomaly monitoring',
      'Supervisory fleet coordination',
      'Human-robot workflow interfaces',
    ],
    relatedServiceSlugs: ['research-innovation', 'ai-data-engineering'],
    icon: 'Cog',
    featuredOnHome: true,
    image: siteImages.manufacturingRobotics,
    imageAlt: 'Modern industrial robotic assembly arm in automated precision facility',
  },
  {
    slug: 'ai-automation',
    title: 'AI Automation',
    kicker: 'Operational Velocity',
    shortDescription:
      'Streamline high-frequency business workflows with resilient, AI-assisted process automation.',
    overview:
      'Combining deterministic workflow orchestration with intelligent document parsing and decision routing eliminates repetitive operational drag while keeping teams in clear control.',
    whatItMeans:
      'Replacing manual data entry, triage, and multi-system handoffs with event-driven pipelines enhanced by machine comprehension.',
    businessProblems: [
      'High error rates in manual invoice, intake, and form processing.',
      'Slow response cycles caused by multi-department approval handoffs.',
      'Unstructured email and PDF inputs blocking downstream ERP/CRM updates.',
    ],
    zenovaisApproach:
      'We audit existing operational bottlenecks, establish clean exception queues, and deploy auditable automation pipelines with measurable cycle-time reduction.',
    capabilities: [
      'Intelligent Document Processing',
      'Event-Driven Pipelines',
      'Automated Exception Routing',
      'System-to-System Integration',
    ],
    applicationAreas: [
      'Operations & back-office intake',
      'Automated QA & validation',
      'Customer onboarding pipelines',
      'Scheduled intelligence briefings',
    ],
    relatedServiceSlugs: ['automation-solutions', 'custom-software-development'],
    icon: 'Workflow',
    featuredOnHome: false,
    image: siteImages.servicesTeam,
    imageAlt: 'Engineers designing automated enterprise workflows',
  },
  {
    slug: 'enterprise-ai',
    title: 'Enterprise AI',
    kicker: 'Organization-Scale Architecture',
    shortDescription:
      'Deploy governed, secure, and observable AI infrastructure engineered for enterprise standards.',
    overview:
      'Moving AI from isolated experiments to organization-wide infrastructure requires identity integration, cost governance, model evaluation, and strict data boundaries.',
    whatItMeans:
      'Building centralized AI gateways, governance layers, and domain applications compliant with enterprise security and operational standards.',
    businessProblems: [
      'Shadow AI tool usage exposing sensitive organizational data.',
      'Duplicated point experiments with no shared evaluation or governance.',
      'Vendor lock-in to a single model provider without fallback routing.',
    ],
    zenovaisApproach:
      'Zenovais designs provider-agnostic AI layers with centralized observability, role-based access control, and structured evaluation harnesses.',
    capabilities: [
      'Model Gateway & Routing',
      'Access & Privacy Governance',
      'Automated Eval Suites',
      'Enterprise System Integration',
    ],
    applicationAreas: [
      'Unified internal AI workspaces',
      'Cross-department knowledge hubs',
      'Governed model access platforms',
      'Audit-ready AI operations',
    ],
    relatedServiceSlugs: ['ai-consulting-strategy', 'ai-data-engineering'],
    icon: 'Building2',
    featuredOnHome: false,
    image: siteImages.executiveBoardroom,
    imageAlt: 'Modern corporate enterprise boardroom at dusk',
  },
  {
    slug: 'ai-powered-saas',
    title: 'AI-Powered SaaS',
    kicker: 'Product Engineering',
    shortDescription:
      'Architect and launch scalable cloud software products with intelligence woven into the core user experience.',
    overview:
      'Great AI products feel effortless rather than bolted-on. We partner with founders and product organizations to design, architect, and ship multi-tenant SaaS applications powered by intelligent capabilities.',
    whatItMeans:
      'Full-lifecycle cloud product engineering where UX, multi-tenant data isolation, streaming interfaces, and AI capabilities form one cohesive product.',
    businessProblems: [
      'Latency-heavy AI wrappers creating sluggish user experiences.',
      'Difficulty structuring multi-tenant usage metering and data isolation.',
      'Generic chat boxes replacing purposeful, intuitive product workflows.',
    ],
    zenovaisApproach:
      'We combine human-centered UI/UX design, streaming frontend architectures, robust backend APIs, and scalable cloud deployment.',
    capabilities: [
      'Multi-Tenant Cloud Architecture',
      'AI-Native UX Design',
      'Streaming APIs & Backends',
      'Usage & Quality Telemetry',
    ],
    applicationAreas: [
      'Vertical B2B SaaS platforms',
      'Intelligent analytics workspaces',
      'Collaborative workflow software',
      'Domain-specific productivity tools',
    ],
    relatedServiceSlugs: ['product-development', 'custom-software-development'],
    icon: 'Box',
    featuredOnHome: false,
    image: siteImages.heroWorkspace,
    imageAlt: 'Product engineering desk inside Zenovais workspace',
  },
];

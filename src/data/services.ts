import { ServiceItem } from '../types';
import { siteImages } from './assets';

export const servicesPageMeta = {
  seo: {
    title: 'Services',
    description:
      'End-to-end AI consulting, custom software engineering, data infrastructure, and automation services to take your technology from vision to production.',
    keywords:
      'AI services, custom software development, AI consulting, software engineering services, data engineering, technology consulting firm',
  },
  hero: {
    kicker: 'Services',
    title: 'From Vision to',
    titleHighlight: 'Intelligent Execution.',
    description:
      'We combine technical expertise, intelligent engineering and innovation to turn complex ideas into scalable digital solutions.',
    image: siteImages.servicesTeam,
    imageAlt: 'Zenovais engineers and consultants collaborating on enterprise software',
  },
};

export const servicesData: ServiceItem[] = [
  {
    slug: 'ai-consulting-strategy',
    title: 'AI Consulting & Strategy',
    shortDescription:
      'Assess high-value AI opportunities, design practical system architectures, and establish clear implementation roadmaps.',
    overview:
      'Successful AI adoption begins with rigorous problem framing rather than hype. We partner with leadership and technical teams to identify measurable opportunities, evaluate data readiness, and architect realistic execution plans.',
    capabilities: [
      'AI opportunity assessment',
      'AI implementation planning',
      'Technical architecture',
      'AI adoption strategy',
    ],
    deliverables: [
      'Prioritized use-case feasibility matrix',
      'Reference system architecture & security boundaries',
      'Build-vs-buy model & infrastructure guidance',
      'Phased delivery roadmap with evaluation criteria',
    ],
    idealFor: 'Organizations seeking an objective technical roadmap before committing major engineering investment.',
    icon: 'Compass',
  },
  {
    slug: 'custom-software-development',
    title: 'Custom Software Development',
    shortDescription:
      'Engineer resilient web platforms, enterprise software, and scalable backend APIs built for modern workloads.',
    overview:
      'Intelligent capabilities only succeed when backed by reliable software foundations. We design and build full-stack web applications, enterprise portals, and API ecosystems with clean TypeScript and modern cloud architecture.',
    capabilities: [
      'Web application development',
      'Enterprise software',
      'Backend architecture',
      'API development',
      'Scalable applications',
    ],
    deliverables: [
      'Modular frontend interfaces with responsive accessibility',
      'Typed REST/GraphQL APIs and service layers',
      'Automated test suites and CI/CD pipelines',
      'Production deployment & operational documentation',
    ],
    idealFor: 'Businesses building mission-critical internal platforms or modernizing legacy web software.',
    icon: 'Code2',
  },
  {
    slug: 'ai-data-engineering',
    title: 'AI & Data Engineering',
    shortDescription:
      'Build reliable data pipelines, model integrations, and enterprise knowledge retrieval infrastructure.',
    overview:
      'AI systems are only as trustworthy as the data pipelines feeding them. We engineer ingestion workflows, vector indexing, model integration layers, and structured evaluation harnesses.',
    capabilities: [
      'Data processing pipelines',
      'AI integrations',
      'Model integration',
      'Knowledge systems',
    ],
    deliverables: [
      'Automated document & data ingestion pipelines',
      'Hybrid retrieval and knowledge graph indexing',
      'Provider-agnostic LLM & ML inference gateways',
      'Automated quality & latency monitoring dashboards',
    ],
    idealFor: 'Engineering teams turning scattered enterprise data into governed, queryable AI infrastructure.',
    icon: 'Database',
  },
  {
    slug: 'automation-solutions',
    title: 'Automation Solutions',
    shortDescription:
      'Replace repetitive manual handoffs with intelligent workflows, task automation, and orchestrated AI agents.',
    overview:
      'We bridge fragmented enterprise applications with event-driven automation and agentic workflows—streamlining intake, validation, routing, and reporting while preserving human oversight.',
    capabilities: [
      'Intelligent workflows',
      'Business process automation',
      'AI-powered task automation',
      'Agentic workflows',
    ],
    deliverables: [
      'End-to-end workflow mapping and bottleneck elimination',
      'Resilient API & webhook orchestration pipelines',
      'Bounded AI agents with deterministic guardrails',
      'Human-in-the-loop exception review interfaces',
    ],
    idealFor: 'Operations teams looking to accelerate cycle times and eliminate manual data coordination.',
    icon: 'Workflow',
  },
  {
    slug: 'research-innovation',
    title: 'Research & Innovation',
    shortDescription:
      'Explore emerging AI architectures, build rapid proof-of-concepts, and validate frontier system designs.',
    overview:
      'When off-the-shelf software cannot solve a novel domain problem, our R&D track runs structured experimentation, technical feasibility prototypes, and custom intelligent system engineering.',
    capabilities: [
      'Emerging technology exploration',
      'AI experimentation',
      'Proof of concepts',
      'Intelligent system development',
    ],
    deliverables: [
      'Focused technical feasibility studies',
      'Working interactive proof-of-concept prototypes',
      'Empirical benchmark and latency evaluations',
      'Transition blueprint for production scaling',
    ],
    idealFor: 'Innovation teams validating new AI, agentic, or physical-digital concepts before full rollout.',
    icon: 'FlaskConical',
  },
  {
    slug: 'product-development',
    title: 'Product Development',
    shortDescription:
      'Take digital products from early concept through UI/UX design, engineering architecture, testing, and launch.',
    overview:
      'We guide software products across every stage—combining strategic scoping, refined interface design, full-stack engineering, and production launch support.',
    capabilities: [
      'Product strategy',
      'UI/UX design',
      'Application architecture',
      'Development',
      'Testing and deployment',
    ],
    deliverables: [
      'Product architecture & interactive UX prototypes',
      'Design system and reusable frontend components',
      'Multi-tenant backend and database engineering',
      'Quality assurance, launch support, and iteration',
    ],
    idealFor: 'Founders and enterprise product leaders launching new SaaS or intelligent digital products.',
    icon: 'Box',
  },
];

export const deliveryProcessSteps = [
  {
    step: '01',
    title: 'Discovery',
    description: 'Align on business objectives, operational constraints, user workflows, and success criteria.',
  },
  {
    step: '02',
    title: 'Strategy',
    description: 'Define scope, evaluate AI suitability, and map phased technical milestones.',
  },
  {
    step: '03',
    title: 'Architecture',
    description: 'Design system boundaries, data schemas, security controls, and interface wireframes.',
  },
  {
    step: '04',
    title: 'Development',
    description: 'Build modular software, AI pipelines, and responsive user experiences iteratively.',
  },
  {
    step: '05',
    title: 'Testing',
    description: 'Validate functional accuracy, security posture, edge-case handling, and AI output reliability.',
  },
  {
    step: '06',
    title: 'Deployment',
    description: 'Release cleanly into target cloud or enterprise environments with full observability.',
  },
  {
    step: '07',
    title: 'Optimization',
    description: 'Continuously monitor performance, refine models, and scale capabilities with confidence.',
  },
];

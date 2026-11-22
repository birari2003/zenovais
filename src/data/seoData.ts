/**
 * Comprehensive SEO registry and utility module for Zenovais Technologies (zenovais.com).
 * Manages metadata, sitemap generation, robots.txt, and server/build-time HTML injection.
 */

export interface PageSeoData {
  path: string;
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  type: 'website' | 'article';
  image: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  lastmod: string;
  isNotFound?: boolean;
}

export const SITE_DOMAIN = 'https://zenovais.com';
export const DEFAULT_OG_IMAGE = 'https://zenovais.com/logo.png';
export const CURRENT_DATE = '2026-11-22';

/**
 * All 28 canonical, crawlable public routes on Zenovais Technologies.
 */
export const allRoutesSeo: PageSeoData[] = [
  {
    path: '/',
    title: 'Zenovais Technologies – Building Intelligent Tomorrow, Together',
    description:
      'Zenovais Technologies is an AI-first technology company creating intelligent products, AI agents, automation systems, and next-generation digital solutions.',
    keywords:
      'Zenovais, Zenovais Technologies, AI company, artificial intelligence, AI agents, enterprise AI, intelligent automation, machine learning, generative AI, RAG systems, software engineering',
    canonical: `${SITE_DOMAIN}/`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'daily',
    priority: 1.0,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/about',
    title: 'About Us | Zenovais Technologies',
    description:
      'Learn about Zenovais Technologies, our AI-first engineering philosophy, leadership principles, mission, and commitment to building intelligent systems with real-world impact.',
    keywords:
      'about Zenovais, AI company about, artificial intelligence team, software architects, AI engineering culture, technology innovation, intelligent systems company',
    canonical: `${SITE_DOMAIN}/about`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions',
    title: 'AI Solutions | Zenovais Technologies',
    description:
      'Explore enterprise AI solutions from Zenovais: generative AI, agentic systems, RAG architectures, machine learning, intelligent robotics, and end-to-end automation.',
    keywords:
      'AI solutions, enterprise AI, generative AI solutions, agentic AI, LLM applications, RAG architecture, machine learning systems, AI automation company',
    canonical: `${SITE_DOMAIN}/ai-solutions`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/artificial-intelligence-machine-learning',
    title: 'AI & Machine Learning Solutions | Zenovais Technologies',
    description:
      'Enterprise machine learning systems, predictive analytics, computer vision, and deep learning architectures engineered for high-throughput production environments.',
    keywords:
      'AI machine learning, deep learning solutions, predictive models, enterprise ML pipeline, computer vision, neural networks, ML engineering',
    canonical: `${SITE_DOMAIN}/ai-solutions/artificial-intelligence-machine-learning`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/generative-ai',
    title: 'Generative AI & LLM Systems | Zenovais Technologies',
    description:
      'Custom large language model pipelines, multimodal generative AI, fine-tuning, and enterprise-grade generative applications with strict guardrails.',
    keywords:
      'generative AI, LLM development, enterprise LLM, fine-tuning models, generative systems, AI prompt engineering, AI chatbots, multimodal AI',
    canonical: `${SITE_DOMAIN}/ai-solutions/generative-ai`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/agentic-ai',
    title: 'Agentic AI & Autonomous Systems | Zenovais Technologies',
    description:
      'Autonomous AI agents and orchestrated multi-agent systems designed for goal decomposition, deterministic tool invocation, and enterprise workflow execution.',
    keywords:
      'agentic AI, autonomous AI agents, multi-agent systems, AI agent orchestration, autonomous workflows, tool-calling agents',
    canonical: `${SITE_DOMAIN}/ai-solutions/agentic-ai`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/rag-llm-applications',
    title: 'RAG & Enterprise Knowledge Systems | Zenovais Technologies',
    description:
      'Grounded retrieval-augmented generation (RAG) platforms with hybrid semantic search, cited answers, and permission-aware organizational knowledge intelligence.',
    keywords:
      'RAG systems, retrieval augmented generation, enterprise knowledge base, semantic search, vector database, LLM knowledge retrieval',
    canonical: `${SITE_DOMAIN}/ai-solutions/rag-llm-applications`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/robotics-intelligent-systems',
    title: 'Robotics & Intelligent Systems | Zenovais Technologies',
    description:
      'Perception architectures, sensor fusion, edge intelligence, and real-time control software connecting physical machines with intelligent AI algorithms.',
    keywords:
      'robotics AI, physical AI, edge perception, autonomous systems, sensor fusion, robotic automation, IoT intelligence',
    canonical: `${SITE_DOMAIN}/ai-solutions/robotics-intelligent-systems`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/ai-automation',
    title: 'Intelligent Workflow Automation | Zenovais Technologies',
    description:
      'End-to-end AI automation solutions eliminating manual bottlenecks, streamlining complex business processes, and accelerating organizational throughput.',
    keywords:
      'AI automation, intelligent process automation, workflow orchestration, robotic process automation, business automation, enterprise AI workflows',
    canonical: `${SITE_DOMAIN}/ai-solutions/ai-automation`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/enterprise-ai',
    title: 'Enterprise AI Transformation | Zenovais Technologies',
    description:
      'Secure, compliant, and scalable AI infrastructure architectures built for enterprise deployment, sovereign data governance, and high-ROI digital transformation.',
    keywords:
      'enterprise AI, AI transformation, sovereign AI, enterprise software, AI governance, scalable AI infrastructure, corporate AI strategy',
    canonical: `${SITE_DOMAIN}/ai-solutions/enterprise-ai`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/ai-solutions/ai-powered-saas',
    title: 'AI-Powered SaaS Architecture | Zenovais Technologies',
    description:
      'Cloud-native, multitenant AI SaaS platforms engineered for high concurrency, real-time inference, usage metering, and robust data isolation.',
    keywords:
      'AI SaaS, cloud AI platforms, AI software architecture, multitenant SaaS, intelligent SaaS products, SaaS engineering',
    canonical: `${SITE_DOMAIN}/ai-solutions/ai-powered-saas`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/products',
    title: 'Products & Platforms | Zenovais Technologies',
    description:
      'Explore Zenovais Technologies intelligent software product platforms and architectural foundations built to simplify workflows and solve real-world problems.',
    keywords:
      'Zenovais products, AI platforms, intelligent software, digital products, workflow platforms, AI SaaS solutions',
    canonical: `${SITE_DOMAIN}/products`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services',
    title: 'Services | Zenovais Technologies',
    description:
      'End-to-end AI consulting, custom software engineering, data infrastructure, and automation services to take your technology from vision to production.',
    keywords:
      'AI services, custom software development, AI consulting, software engineering services, data engineering, technology consulting firm',
    canonical: `${SITE_DOMAIN}/services`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.9,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services/ai-consulting-strategy',
    title: 'AI Consulting & Strategic Advisory | Zenovais Technologies',
    description:
      'Executive AI roadmap planning, technology feasibility assessments, ROI modeling, and architecture design for modern enterprise organizations.',
    keywords:
      'AI consulting, AI strategy, artificial intelligence advisory, technology assessment, enterprise AI roadmap, digital transformation consulting',
    canonical: `${SITE_DOMAIN}/services/ai-consulting-strategy`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services/custom-software-development',
    title: 'Custom Enterprise Software Development | Zenovais Technologies',
    description:
      'High-performance, fault-tolerant custom web, cloud, and mobile software applications built with modern architectural standards and clean code.',
    keywords:
      'custom software development, enterprise software engineering, web application development, cloud architecture, bespoke software solutions',
    canonical: `${SITE_DOMAIN}/services/custom-software-development`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services/ai-data-engineering',
    title: 'AI & Data Engineering Services | Zenovais Technologies',
    description:
      'Scalable data pipelines, vector database architectures, feature stores, and real-time streaming infrastructure optimized for AI model ingestion.',
    keywords:
      'AI data engineering, data pipelines, ETL pipelines, vector database engineering, feature stores, big data architecture',
    canonical: `${SITE_DOMAIN}/services/ai-data-engineering`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services/automation-solutions',
    title: 'Autonomous Workflow & Process Automation | Zenovais Technologies',
    description:
      'Intelligent process automation, API integrations, and event-driven automation architectures designed to reduce costs and eliminate operational friction.',
    keywords:
      'automation solutions, workflow automation services, enterprise automation, API integrations, event driven architecture',
    canonical: `${SITE_DOMAIN}/services/automation-solutions`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services/research-innovation',
    title: 'Applied AI Research & Innovation Labs | Zenovais Technologies',
    description:
      'Collaborative R&D engagements, prototype development, proof-of-concept testing, and exploratory engineering in bleeding-edge AI disciplines.',
    keywords:
      'AI research services, innovation labs, applied AI R&D, prototype development, proof of concept, tech innovation',
    canonical: `${SITE_DOMAIN}/services/research-innovation`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/services/product-development',
    title: 'Intelligent Product Engineering Services | Zenovais Technologies',
    description:
      'Full lifecycle digital product development from UI/UX design and systems architecture to rapid MVP deployment and enterprise-scale iteration.',
    keywords:
      'product development services, digital product engineering, MVP development, software product design, UI UX design for AI',
    canonical: `${SITE_DOMAIN}/services/product-development`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/research',
    title: 'Research & Innovation | Zenovais Technologies',
    description:
      'Explore applied AI research papers, technical insights, and exploratory inquiry from the Zenovais engineering team across agents, RAG, and physical AI.',
    keywords:
      'AI research, machine learning research, agentic research, RAG research, artificial intelligence papers, Zenovais research',
    canonical: `${SITE_DOMAIN}/research`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/research/designing-bounded-agentic-workflows',
    title: 'Designing Bounded Agentic Workflows for Enterprise Reliability | Research',
    description:
      'An engineering framework for deterministic state checkpoints, role-scoped tool execution, and predictable multi-agent orchestration in production.',
    keywords:
      'agentic workflows research, reliable AI agents, multi-agent orchestration, bounded agents, enterprise agent reliability',
    canonical: `${SITE_DOMAIN}/research/designing-bounded-agentic-workflows`,
    robots: 'index, follow',
    type: 'article',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/research/grounded-rag-architectures-enterprise-knowledge',
    title: 'Beyond Basic Vector Search: Grounded RAG for Organizational Knowledge | Research',
    description:
      'Architectural analysis of hybrid lexical-semantic retrieval, contextual re-ranking, and citation-grounded generation for enterprise knowledge.',
    keywords:
      'grounded RAG, hybrid search research, vector database retrieval, enterprise knowledge RAG, semantic search papers',
    canonical: `${SITE_DOMAIN}/research/grounded-rag-architectures-enterprise-knowledge`,
    robots: 'index, follow',
    type: 'article',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/research/edge-perception-intelligent-physical-systems',
    title: 'Edge Perception & Real-Time Decision Loops in Physical AI Systems | Research',
    description:
      'Techniques for low-latency visual inference, sensor fusion, and robust fault-tolerant control in robotics and edge environments.',
    keywords:
      'edge perception research, physical AI, real-time robotics inference, sensor fusion, edge computing AI',
    canonical: `${SITE_DOMAIN}/research/edge-perception-intelligent-physical-systems`,
    robots: 'index, follow',
    type: 'article',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.7,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries',
    title: 'Industries & Applied Solutions | Zenovais Technologies',
    description:
      'Domain-specific AI applications tailored for Healthcare, Fintech, Manufacturing, EdTech, Retail, and Enterprise operations.',
    keywords:
      'AI industries, healthcare AI, fintech AI, manufacturing robotics, edtech AI, retail ecommerce AI, enterprise intelligence',
    canonical: `${SITE_DOMAIN}/industries`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries/healthcare-life-sciences',
    title: 'Healthcare & Life Sciences AI Solutions | Zenovais Technologies',
    description:
      'Streamline clinical documentation, knowledge retrieval, and operational coordination with privacy-first AI architectures and grounded clinical assistants.',
    keywords:
      'healthcare AI, clinical AI, medical protocol assistant, clinical documentation AI, life sciences technology, HIPAA AI architectures',
    canonical: `${SITE_DOMAIN}/industries/healthcare-life-sciences`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries/finance-fintech',
    title: 'Finance & Fintech AI Solutions | Zenovais Technologies',
    description:
      'Enhance analytical clarity, document verification, and governed operational automation across financial and fintech workflows.',
    keywords:
      'fintech AI, financial AI solutions, KYC document automation, risk analytics AI, compliance knowledge retrieval, banking software',
    canonical: `${SITE_DOMAIN}/industries/finance-fintech`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries/manufacturing-robotics',
    title: 'Manufacturing & Robotics AI Solutions | Zenovais Technologies',
    description:
      'Bridge industrial telemetry, computer vision inspection, and intelligent control software on modern production and manufacturing floors.',
    keywords:
      'manufacturing AI, industrial robotics, computer vision inspection, predictive maintenance, IoT telemetry, smart factory automation',
    canonical: `${SITE_DOMAIN}/industries/manufacturing-robotics`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries/education-edtech',
    title: 'Education & EdTech AI Solutions | Zenovais Technologies',
    description:
      'Design adaptive learning tools, curriculum assistants, and intuitive academic workflow platforms grounded in approved educational materials.',
    keywords:
      'edtech AI, education AI solutions, adaptive learning systems, curriculum study assistants, learning simulation platforms',
    canonical: `${SITE_DOMAIN}/industries/education-edtech`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries/retail-ecommerce',
    title: 'Retail & E-commerce AI Solutions | Zenovais Technologies',
    description:
      'Improve product discovery, catalog intelligence, and demand operations with purposeful multimodal AI and semantic search storefronts.',
    keywords:
      'retail AI, ecommerce AI, catalog enrichment, semantic product search, demand forecasting, intelligent customer support',
    canonical: `${SITE_DOMAIN}/industries/retail-ecommerce`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/industries/enterprise-technology',
    title: 'Enterprise & Technology AI Solutions | Zenovais Technologies',
    description:
      'Equip engineering and enterprise teams with governed AI workspaces, agentic pipelines, and scalable custom internal software platforms.',
    keywords:
      'enterprise technology AI, developer AI copilots, agentic workflow orchestration, enterprise AI gateway, internal knowledge hubs',
    canonical: `${SITE_DOMAIN}/industries/enterprise-technology`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/careers',
    title: 'Careers & Engineering Culture | Zenovais Technologies',
    description:
      'Join the team building intelligent tomorrow. Explore our engineering culture, core values, areas of opportunity, and join our talent community.',
    keywords:
      'Zenovais careers, AI engineering jobs, software engineer jobs, AI careers, tech hiring, talent community',
    canonical: `${SITE_DOMAIN}/careers`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'weekly',
    priority: 0.7,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/contact',
    title: 'Contact Us | Zenovais Technologies',
    description:
      'Get in touch with Zenovais Technologies. Discuss enterprise AI solutions, custom software engineering, strategic partnerships, or general enquiries.',
    keywords:
      'contact Zenovais, hire AI engineers, contact AI company, enterprise software consultation, AI advisory contact',
    canonical: `${SITE_DOMAIN}/contact`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'monthly',
    priority: 0.8,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/privacy-policy',
    title: 'Privacy Policy | Zenovais Technologies',
    description:
      'How Zenovais Technologies collects, validates, and safeguards personal and corporate information submitted through zenovais.com.',
    keywords:
      'privacy policy, Zenovais privacy, data protection, privacy terms, personal data security',
    canonical: `${SITE_DOMAIN}/privacy-policy`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: CURRENT_DATE,
  },
  {
    path: '/terms-of-service',
    title: 'Terms of Service | Zenovais Technologies',
    description:
      'Terms governing access to and use of the Zenovais Technologies corporate website and digital platforms.',
    keywords:
      'terms of service, Zenovais terms, user agreement, website terms, legal terms',
    canonical: `${SITE_DOMAIN}/terms-of-service`,
    robots: 'index, follow',
    type: 'website',
    image: DEFAULT_OG_IMAGE,
    changefreq: 'yearly',
    priority: 0.5,
    lastmod: CURRENT_DATE,
  },
];

const routesMap = new Map<string, PageSeoData>();
allRoutesSeo.forEach((item) => {
  routesMap.set(item.path, item);
});

export const notFoundSeo: PageSeoData = {
  path: '/404',
  title: 'Page Not Found | Zenovais Technologies',
  description: 'The requested page could not be found on Zenovais Technologies.',
  keywords: '404, page not found, Zenovais',
  canonical: `${SITE_DOMAIN}/404`,
  robots: 'noindex, nofollow',
  type: 'website',
  image: DEFAULT_OG_IMAGE,
  changefreq: 'never',
  priority: 0.1,
  lastmod: CURRENT_DATE,
  isNotFound: true,
};

/**
 * Normalizes a URL path and retrieves its SEO metadata.
 * Gracefully handles trailing slashes, query parameters, and unknown paths.
 */
export function getSeoForPath(rawPath: string): PageSeoData {
  const cleanPath = (rawPath || '/').split('?')[0].split('#')[0];
  const normalized = cleanPath === '/' ? '/' : cleanPath.replace(/\/+$/, '');

  const matched = routesMap.get(normalized);
  if (matched) {
    return matched;
  }

  // Dynamic path matching for future products or careers
  if (normalized.startsWith('/products/')) {
    const slug = normalized.replace('/products/', '');
    return {
      path: normalized,
      title: `${slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())} | Products | Zenovais Technologies`,
      description: `Explore product details and architecture on Zenovais Technologies.`,
      keywords: `Zenovais product, ${slug}, software platform, AI product`,
      canonical: `${SITE_DOMAIN}${normalized}`,
      robots: 'index, follow',
      type: 'website',
      image: DEFAULT_OG_IMAGE,
      changefreq: 'monthly',
      priority: 0.7,
      lastmod: CURRENT_DATE,
    };
  }

  if (normalized.startsWith('/careers/')) {
    const jobId = normalized.replace('/careers/', '');
    return {
      path: normalized,
      title: `Career Opportunity | Zenovais Technologies`,
      description: `Join Zenovais Technologies. Explore role responsibilities and engineering requirements.`,
      keywords: `Zenovais career, ${jobId}, hiring, AI engineering jobs`,
      canonical: `${SITE_DOMAIN}${normalized}`,
      robots: 'index, follow',
      type: 'website',
      image: DEFAULT_OG_IMAGE,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: CURRENT_DATE,
    };
  }

  return {
    ...notFoundSeo,
    path: normalized,
    canonical: `${SITE_DOMAIN}${normalized}`,
  };
}

/**
 * Escapes characters for HTML attribute injection.
 */
function escapeHtmlAttr(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

/**
 * Injects SEO tags into raw HTML for view-source visibility and search crawlers.
 */
export function injectSeoIntoHtml(html: string, seo: PageSeoData): string {
  const safeTitle = escapeHtmlAttr(seo.title);
  const safeDesc = escapeHtmlAttr(seo.description);
  const safeKeywords = escapeHtmlAttr(seo.keywords);
  const safeRobots = escapeHtmlAttr(seo.robots);
  const safeCanonical = escapeHtmlAttr(seo.canonical);
  const safeOgType = escapeHtmlAttr(seo.type);
  const safeOgImage = escapeHtmlAttr(seo.image);

  let output = html;

  // Title
  if (output.includes('<title>')) {
    output = output.replace(/<title>[\s\S]*?<\/title>/i, `<title>${safeTitle}</title>`);
  } else {
    output = output.replace('</head>', `  <title>${safeTitle}</title>\n</head>`);
  }

  // Helper to replace or insert meta tag
  const replaceOrInsertMeta = (name: string, content: string, isProp = false) => {
    const attr = isProp ? 'property' : 'name';
    const regex = new RegExp(`<meta\\s+${attr}=["']${name}["'][^>]*>`, 'i');
    const replacement = `<meta ${attr}="${name}" content="${content}" />`;
    if (regex.test(output)) {
      output = output.replace(regex, replacement);
    } else {
      output = output.replace('</head>', `  ${replacement}\n</head>`);
    }
  };

  replaceOrInsertMeta('description', safeDesc);
  replaceOrInsertMeta('keywords', safeKeywords);
  replaceOrInsertMeta('robots', safeRobots);
  replaceOrInsertMeta('og:title', safeTitle, true);
  replaceOrInsertMeta('og:description', safeDesc, true);
  replaceOrInsertMeta('og:type', safeOgType, true);
  replaceOrInsertMeta('og:url', safeCanonical, true);
  replaceOrInsertMeta('og:image', safeOgImage, true);
  replaceOrInsertMeta('og:site_name', 'Zenovais Technologies', true);
  replaceOrInsertMeta('twitter:card', 'summary_large_image');
  replaceOrInsertMeta('twitter:title', safeTitle);
  replaceOrInsertMeta('twitter:description', safeDesc);
  replaceOrInsertMeta('twitter:image', safeOgImage);

  // Canonical link
  const canonicalRegex = /<link\s+rel=["']canonical["'][^>]*>/i;
  const canonicalReplacement = `<link rel="canonical" href="${safeCanonical}" />`;
  if (canonicalRegex.test(output)) {
    output = output.replace(canonicalRegex, canonicalReplacement);
  } else {
    output = output.replace('</head>', `  ${canonicalReplacement}\n</head>`);
  }

  // Favicon link if missing
  if (!output.includes('rel="icon"')) {
    output = output.replace(
      '</head>',
      `  <link rel="icon" type="image/png" href="/favicon.png" />\n  <link rel="icon" type="image/x-icon" href="/favicon.ico" />\n  <link rel="apple-touch-icon" href="/favicon.png" />\n</head>`
    );
  }

  return output;
}

/**
 * Generates XML sitemap encompassing all canonical URLs.
 */
export function generateSitemapXml(): string {
  const urlEntries = allRoutesSeo
    .map(
      (r) => `  <url>
    <loc>${r.canonical}</loc>
    <lastmod>${r.lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generates standard robots.txt referencing the canonical sitemap.
 */
export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

# Sitemap
Sitemap: ${SITE_DOMAIN}/sitemap.xml
`;
}

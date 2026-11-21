import { ResearchArticle } from '../types';
import { siteImages } from './assets';

export const researchPageMeta = {
  seo: {
    title: 'Research & Innovation',
    description:
      'Explore Zenovais Technologies research philosophy, Generative AI exploration, Agentic AI, intelligent automation, robotics systems, and engineering perspectives.',
  },
  hero: {
    kicker: 'Research & Innovation',
    title: 'Exploring What Technology',
    titleHighlight: 'Can Become.',
    description:
      'Research, experimentation and continuous innovation are central to building the next generation of intelligent technology.',
    image: siteImages.researchLab,
    imageAlt: 'Zenovais hardware and compute architecture research bench',
  },
};

export const researchPhilosophy = {
  kicker: 'Our Research Philosophy',
  title: 'Applied Inquiry Anchored in Engineering Reality',
  paragraphs: [
    'At Zenovais Technologies, research is not isolated from practical software engineering. We study emerging intelligence paradigms—evaluating where foundation models, autonomous agents, and physical-world sensor systems excel and where deterministic safeguards are essential.',
    'Every exploration track prioritizes reproducibility, measurable reliability, latency efficiency, and transparent system behavior over speculative hype.',
  ],
};

export const researchDomains = [
  {
    id: 'generative-ai-exploration',
    title: 'Generative AI Exploration',
    description:
      'Investigating structured output reliability, multimodal synthesis, context-window efficiency, and domain adaptation patterns for enterprise applications.',
    focusPoints: [
      'Schema-constrained generation and verification',
      'Multimodal document and visual understanding',
      'Latency and cost-aware model routing',
    ],
  },
  {
    id: 'agentic-ai',
    title: 'Agentic AI',
    description:
      'Exploring bounded planning loops, multi-agent coordination, tool-use verification, and human-in-the-loop escalation architectures.',
    focusPoints: [
      'Deterministic tool-call contracts',
      'State recovery and execution tracing',
      'Multi-agent task decomposition',
    ],
  },
  {
    id: 'intelligent-automation',
    title: 'Intelligent Automation',
    description:
      'Combining event-driven software pipelines with machine comprehension to automate unstructured operational workflows safely.',
    focusPoints: [
      'Hybrid rule-plus-model decision flows',
      'Exception detection and confidence scoring',
      'Auditable cross-system orchestration',
    ],
  },
  {
    id: 'robotics-intelligent-systems',
    title: 'Robotics & Intelligent Systems',
    description:
      'Studying edge perception, multi-sensor fusion, and supervisory software architectures linking digital intelligence to physical environments.',
    focusPoints: [
      'Low-latency edge computer vision',
      'Telemetry synchronization and anomaly signaling',
      'Safe human-system operational interfaces',
    ],
  },
  {
    id: 'emerging-technologies',
    title: 'Emerging Technologies',
    description:
      'Tracking next-generation compute architectures, compact local models, and real-time collaborative systems shaping future digital products.',
    focusPoints: [
      'Compact on-device and edge inference',
      'Evaluation harnesses for evolving AI stacks',
      'Next-generation human-computer interaction',
    ],
  },
];

export const researchArticles: ResearchArticle[] = [
  {
    slug: 'designing-bounded-agentic-workflows',
    title: 'Designing Bounded Agentic Workflows for Enterprise Reliability',
    category: 'Agentic AI',
    date: 'November 2026',
    readTime: '5 min read',
    coverImage: siteImages.heroWorkspace,
    coverAlt: 'Zenovais engineering architecture workspace',
    summary:
      'Why production-ready AI agents require strict tool schemas, explicit permission boundaries, and deterministic fallback paths rather than open-ended autonomy.',
    sections: [
      {
        heading: 'The Gap Between Demos and Production',
        body: 'Unconstrained agent loops often succeed in controlled demos yet behave unpredictably when exposed to partial API failures, ambiguous user inputs, or permission boundaries. Reliable enterprise automation treats the language model as a structured planner operating inside well-defined software contracts.',
      },
      {
        heading: 'Typed Tool Contracts & Verification Gates',
        body: 'By enforcing strict input/output schemas on every external action, validating state transitions before execution, and routing low-confidence decisions to human review queues, engineering teams gain the adaptability of agentic reasoning without sacrificing operational predictability.',
      },
      {
        heading: 'Observability as a First-Class Requirement',
        body: 'Every multi-step workflow must emit clear execution traces showing retrieved context, tool arguments, latency, and final outcomes so operators can audit and refine system behavior continuously.',
      },
    ],
    keyTakeaways: [
      'Constrain every agent action behind typed schemas and least-privilege scopes.',
      'Pair probabilistic reasoning with deterministic validation before side-effecting calls.',
      'Instrument full step-level tracing for transparent operational auditing.',
    ],
  },
  {
    slug: 'grounded-rag-architectures-enterprise-knowledge',
    title: 'Beyond Basic Vector Search: Grounded RAG for Organizational Knowledge',
    category: 'RAG & LLM Systems',
    date: 'October 2026',
    readTime: '6 min read',
    coverImage: siteImages.fintechEnterprise,
    coverAlt: 'Enterprise knowledge retrieval workstation',
    summary:
      'Architectural patterns for combining hybrid retrieval, access-control filtering, and citation verification in high-stakes knowledge systems.',
    sections: [
      {
        heading: 'Why Naive Chunking Falls Short',
        body: 'Fixed-character text splitting frequently severs tables, headings, and policy clauses from their surrounding context. Structure-aware ingestion preserves document hierarchy so retrieved passages remain coherent and accurate.',
      },
      {
        heading: 'Hybrid Ranking & Permission Enforcement',
        body: 'Enterprise queries routinely blend conceptual questions with exact identifiers, codes, or policy numbers. Combining dense semantic embeddings with lexical BM25 scoring—and enforcing document-level access controls prior to synthesis—prevents both missed matches and unauthorized data exposure.',
      },
      {
        heading: 'Citation Grounding and Faithfulness Checks',
        body: 'Every generated response should link directly to underlying source passages and gracefully decline to speculate when supporting evidence is absent.',
      },
    ],
    keyTakeaways: [
      'Preserve document structure during ingestion rather than relying on blind chunk sizes.',
      'Combine semantic vector search with exact lexical matching.',
      'Filter permissions at retrieval time before context reaches the language model.',
    ],
  },
  {
    slug: 'edge-perception-intelligent-physical-systems',
    title: 'Architectural Foundations for Edge Perception in Intelligent Systems',
    category: 'Robotics & Systems',
    date: 'September 2026',
    readTime: '5 min read',
    coverImage: siteImages.researchLab,
    coverAlt: 'AI compute hardware unit on R&D workbench',
    summary:
      'Balancing inference latency, bandwidth constraints, and supervisory cloud telemetry when deploying intelligent vision and control software near hardware.',
    sections: [
      {
        heading: 'Latency Constraints in Physical Environments',
        body: 'When software interacts with assembly lines, cameras, or physical sensors, round-trip cloud inference introduces unacceptable latency and single points of failure. Performing primary perception at the edge keeps control loops responsive.',
      },
      {
        heading: 'Edge-to-Cloud Telemetry Separation',
        body: 'Separating real-time local inference from asynchronous cloud telemetry allows teams to monitor fleet health, review flagged edge cases, and refine models without interrupting live physical operations.',
      },
    ],
    keyTakeaways: [
      'Run time-critical vision and anomaly inference locally on edge compute hardware.',
      'Stream structured events and exceptions—not raw continuous video—for fleet observability.',
      'Maintain explicit deterministic safety envelopes around AI-assisted recommendations.',
    ],
  },
];

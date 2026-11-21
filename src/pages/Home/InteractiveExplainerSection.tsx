import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight } from 'lucide-react';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Icon } from '../../components/common/Icon';
import { Button } from '../../components/common/Button';
import {
  RoboticsMode,
  ZenovaisRoboticsArm3D,
} from '../../components/three/ZenovaisRoboticsArm3D';
import {
  MagneticHover,
  ScrollScaleParallax,
} from '../../components/animation/MotionPrimitives';
import { IconName } from '../../types';

interface ExplainerChapter {
  id: string;
  step: string;
  title: string;
  plainTagline: string;
  everydayExample: string;
  icon: IconName;
  roboticsMode: RoboticsMode;
  pipeline: {
    input: string;
    brain: string;
    output: string;
  };
  linkTo: string;
  linkLabel: string;
}

const EXPLAINER_CHAPTERS: ExplainerChapter[] = [
  {
    id: 'vision',
    step: '01',
    title: 'AI & Computer Vision',
    plainTagline: 'Teaching software to see and spot patterns faster than the human eye.',
    everydayExample:
      'Think of a quality engineer inspecting 1,000 products a minute—scanning shapes, spotting tiny faults, and flagging them immediately.',
    icon: 'Cpu',
    roboticsMode: 'perceive',
    pipeline: {
      input: 'Cameras & Live Sensors',
      brain: 'Pattern Recognition Model',
      output: 'Instant Detection & Alert',
    },
    linkTo: '/ai-solutions/artificial-intelligence-machine-learning',
    linkLabel: 'Explore AI & ML',
  },
  {
    id: 'rag',
    step: '02',
    title: 'Generative AI & Private Knowledge (RAG)',
    plainTagline: 'An assistant that checks your company library before writing a single word.',
    everydayExample:
      'Instead of guessing from the open internet, it looks up your verified manuals, policies, and docs to give cited answers in seconds.',
    icon: 'Database',
    roboticsMode: 'reason',
    pipeline: {
      input: 'Team Question + Private Docs',
      brain: 'Grounded Retrieval Engine',
      output: 'Verified, Cited Answer',
    },
    linkTo: '/ai-solutions/rag-llm-applications',
    linkLabel: 'Explore RAG & LLMs',
  },
  {
    id: 'agentic',
    step: '03',
    title: 'Agentic AI & Workflow Automation',
    plainTagline: 'Digital teammates that plan multiple steps and finish routine tasks safely.',
    everydayExample:
      'An agent reads an incoming request, checks internal databases, routes approvals, and updates your systems automatically—with human guardrails.',
    icon: 'Bot',
    roboticsMode: 'act',
    pipeline: {
      input: 'Incoming Business Trigger',
      brain: 'Multi-Step Planning Agent',
      output: 'Completed Cross-App Task',
    },
    linkTo: '/ai-solutions/agentic-ai',
    linkLabel: 'Explore Agentic AI',
  },
  {
    id: 'robotics',
    step: '04',
    title: 'Robotics & Physical Intelligence',
    plainTagline: 'Connecting intelligent software directly to real-world precision hardware.',
    everydayExample:
      'From robotic arms to industrial machines—giving physical equipment eyes to perceive its surroundings and smooth, accurate motion control.',
    icon: 'Cog',
    roboticsMode: 'explode',
    pipeline: {
      input: 'Spatial Depth Telemetry',
      brain: 'Kinematic Control Brain',
      output: 'Safe Precision Motion',
    },
    linkTo: '/ai-solutions/robotics-intelligent-systems',
    linkLabel: 'Inspect Robotics Systems',
  },
];

export const InteractiveExplainerSection: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [manualMode, setManualMode] = useState<RoboticsMode | null>(null);
  const prefersReduced = useReducedMotion();

  const activeChapter = EXPLAINER_CHAPTERS[activeIndex] ?? EXPLAINER_CHAPTERS[0];
  const displayMode = manualMode ?? activeChapter.roboticsMode;

  const selectChapter = (idx: number) => {
    setActiveIndex(idx);
    setManualMode(null);
  };

  return (
    <SectionWrapper
      id="how-zenovais-works"
      background="white"
      className="relative overflow-hidden border-t border-[var(--z-border)]"
    >
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          kicker="How Our Technology Works — Simply Explained"
          title="Complex Intelligence, Clear at First Glance"
          subtitle="New to AI or robotics architecture? Click or scroll through our four core building blocks to see how raw data becomes safe, practical real-world action."
        />
        <div className="shrink-0">
          <MagneticHover>
            <Button to="/ai-solutions" variant="secondary" withArrow>
              View Full Technology Stack
            </Button>
          </MagneticHover>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10">
        {/* Left Column: 4 Plain-English Interactive Chapters */}
        <div className="space-y-4 lg:col-span-5">
          {EXPLAINER_CHAPTERS.map((chapter, idx) => {
            const isActive = idx === activeIndex;
            return (
              <motion.div
                key={chapter.id}
                onViewportEnter={() => {
                  // Only auto-sync while scrolling if user hasn't locked a CAD mode manually
                  if (!manualMode && window.innerWidth >= 1024) {
                    setActiveIndex(idx);
                  }
                }}
                viewport={{ amount: 0.65 }}
              >
                <button
                  type="button"
                  onClick={() => selectChapter(idx)}
                  className={`group relative w-full cursor-pointer rounded-2xl border p-5 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-[var(--z-primary)] bg-[var(--z-pale-green)]/55 shadow-[0_18px_40px_-18px_rgba(7,91,80,0.22)]'
                      : 'border-[var(--z-border)] bg-[var(--z-bg)]/50 hover:border-[var(--z-primary)]/40 hover:bg-[var(--z-surface)]'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="explainer-active-bar"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      className="absolute top-4 bottom-4 left-0 w-1 rounded-r-full bg-[var(--z-primary)]"
                      aria-hidden="true"
                    />
                  )}

                  <div className="flex items-start gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                        isActive
                          ? 'scale-105 bg-[var(--z-primary)] text-white shadow-sm'
                          : 'bg-[var(--z-surface)] text-[var(--z-primary)] group-hover:bg-[var(--z-pale-green)]'
                      }`}
                    >
                      <Icon name={chapter.icon} className="h-5 w-5" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-mono text-xs font-semibold text-[var(--z-primary)] tabular-nums">
                          STEP {chapter.step}
                        </span>
                        <span
                          className={`text-[11px] font-semibold transition-opacity ${
                            isActive
                              ? 'text-[var(--z-primary)] opacity-100'
                              : 'text-[var(--z-secondary-text)] opacity-0 group-hover:opacity-100'
                          }`}
                        >
                          Active in 3D →
                        </span>
                      </div>

                      <h3 className="mt-1 text-base font-bold text-[var(--z-charcoal)] sm:text-lg">
                        {chapter.title}
                      </h3>
                      <p className="mt-1.5 text-sm font-medium leading-snug text-[var(--z-charcoal)]/90">
                        {chapter.plainTagline}
                      </p>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={prefersReduced ? undefined : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 border-t border-[var(--z-primary)]/15 pt-3 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                              <strong className="font-semibold text-[var(--z-charcoal)]">
                                Real-world example:{' '}
                              </strong>
                              {chapter.everydayExample}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </button>
              </motion.div>
            );
          })}
        </div>

        {/* Right Column: Sticky Live 3D Robotics Simulator + Plain-English 3-Step Visual Pipeline */}
        <ScrollScaleParallax className="lg:sticky lg:top-24 lg:col-span-7">
          <div className="overflow-hidden rounded-tl-[64px] rounded-tr-[24px] rounded-br-[64px] rounded-bl-[24px] border border-[var(--z-border)] bg-gradient-to-br from-[#FAFAF7] via-[#EAF2ED]/65 to-[#DCE9E3]/70 shadow-[0_28px_64px_-20px_rgba(7,91,80,0.22)]">
            {/* Top Header Strip */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[var(--z-border)]/80 bg-[var(--z-surface)]/85 px-6 py-4">
              <div>
                <p className="font-mono text-[11px] font-semibold tracking-wider text-[var(--z-primary)] uppercase">
                  Interactive 3D Robotics & AI Lab · Drag to Orbit
                </p>
                <p className="text-sm font-bold text-[var(--z-charcoal)]">
                  {activeChapter.title}
                </p>
              </div>
              <Button to={activeChapter.linkTo} variant="secondary" size="sm" withArrow>
                {activeChapter.linkLabel}
              </Button>
            </div>

            {/* Interactive Three.js 3D Articulated Robotics Viewport (zero center occlusion) */}
            <div className="relative h-[380px] w-full sm:h-[430px]">
              <ZenovaisRoboticsArm3D
                mode={displayMode}
                onModeChange={(next) => setManualMode(next)}
                className="h-full w-full"
              />
            </div>

            {/* Plain-English "Input -> AI Brain -> Real Outcome" Animated Visual Pipeline */}
            <div className="border-t border-[var(--z-border)] bg-[var(--z-surface)] p-5 sm:p-6">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--z-charcoal)]">
                  How this step works in plain English:
                </span>
                <span className="font-mono text-[11px] text-[var(--z-primary)]">
                  STEP {activeChapter.step} / 04
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeChapter.id}
                  initial={prefersReduced ? undefined : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={prefersReduced ? undefined : { opacity: 0, y: -6 }}
                  transition={{ duration: 0.22 }}
                  className="grid grid-cols-1 items-center gap-3 sm:grid-cols-11"
                >
                  <div className="rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] px-4 py-3 sm:col-span-3">
                    <span className="block font-mono text-[10px] font-semibold text-[var(--z-secondary-text)] uppercase">
                      1. Input
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-[var(--z-charcoal)]">
                      {activeChapter.pipeline.input}
                    </span>
                  </div>

                  <div className="hidden items-center justify-center sm:col-span-1 sm:flex">
                    <motion.div
                      animate={prefersReduced ? undefined : { x: [0, 4, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      <ArrowRight className="h-4 w-4 text-[var(--z-primary)]" aria-hidden="true" />
                    </motion.div>
                  </div>

                  <div className="rounded-xl border border-[var(--z-primary)]/35 bg-[var(--z-pale-green)] px-4 py-3 sm:col-span-3">
                    <span className="block font-mono text-[10px] font-semibold text-[var(--z-primary)] uppercase">
                      2. AI Core
                    </span>
                    <span className="mt-1 block text-xs font-bold text-[var(--z-charcoal)]">
                      {activeChapter.pipeline.brain}
                    </span>
                  </div>

                  <div className="hidden items-center justify-center sm:col-span-1 sm:flex">
                    <motion.div
                      animate={prefersReduced ? undefined : { x: [0, 4, 0] }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: 'easeInOut',
                        delay: 0.4,
                      }}
                    >
                      <ArrowRight className="h-4 w-4 text-[var(--z-primary)]" aria-hidden="true" />
                    </motion.div>
                  </div>

                  <div className="rounded-xl border border-[#06443C]/20 bg-[#06443C] px-4 py-3 text-white sm:col-span-3">
                    <span className="block font-mono text-[10px] font-semibold text-[var(--z-sage)] uppercase">
                      3. Result
                    </span>
                    <span className="mt-1 block text-xs font-semibold text-white">
                      {activeChapter.pipeline.output}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </ScrollScaleParallax>
      </div>
    </SectionWrapper>
  );
};

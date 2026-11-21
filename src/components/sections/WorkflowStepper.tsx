import React, { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';

interface StepItem {
  step: string;
  title: string;
  description: string;
}

export const WorkflowStepper: React.FC<{ steps: StepItem[] }> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReduced = useReducedMotion();
  const activeStep = steps[activeIndex] ?? steps[0];

  return (
    <div className="mt-10">
      {/* Interactive step selector bar */}
      <div
        role="tablist"
        aria-label="Process stages"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-flow-col lg:auto-cols-fr"
      >
        {steps.map((item, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={item.step}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveIndex(idx)}
              className={`relative rounded-xl border px-4 py-3.5 text-left transition-colors ${
                isActive
                  ? 'border-[var(--z-primary)] bg-[var(--z-primary)] text-white shadow-sm'
                  : 'border-[var(--z-border)] bg-[var(--z-surface)] text-[var(--z-charcoal)] hover:border-[var(--z-primary)]/45 hover:bg-[var(--z-pale-green)]/50'
              }`}
            >
              <span
                className={`block font-mono text-xs tabular-nums ${
                  isActive ? 'text-[var(--z-sage)]' : 'text-[var(--z-primary)]'
                }`}
              >
                {item.step}
              </span>
              <span className="mt-1 block text-sm font-semibold">{item.title}</span>
            </button>
          );
        })}
      </div>

      {/* Animated stage detail panel */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-6 sm:p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.step}
            initial={prefersReduced ? undefined : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
          >
            <div>
              <span className="font-mono text-xs font-medium text-[var(--z-primary)] tabular-nums">
                Stage {activeStep.step} of {String(steps.length).padStart(2, '0')}
              </span>
              <h3 className="mt-1 text-xl font-bold text-[var(--z-charcoal)]">
                {activeStep.title}
              </h3>
              <p className="mt-2 max-w-3xl text-[15px] leading-relaxed text-[var(--z-secondary-text)]">
                {activeStep.description}
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev - 1 + steps.length) % steps.length)}
                className="rounded-lg border border-[var(--z-border)] px-3 py-1.5 text-xs font-semibold text-[var(--z-charcoal)] hover:border-[var(--z-primary)]"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={() => setActiveIndex((prev) => (prev + 1) % steps.length)}
                className="rounded-lg bg-[var(--z-pale-green)] px-3 py-1.5 text-xs font-semibold text-[var(--z-primary)] hover:bg-[var(--z-sage)]"
              >
                Next Stage
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

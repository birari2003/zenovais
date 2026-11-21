import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SolutionItem } from '../../types';
import { Icon } from '../common/Icon';
import { SpotlightCard } from '../animation/MotionPrimitives';

interface SolutionCardProps {
  solution: SolutionItem;
  index?: number;
}

export const SolutionCard: React.FC<SolutionCardProps> = ({ solution, index }) => {
  return (
    <SpotlightCard className="h-full">
      <Link
        to={`/ai-solutions/${solution.slug}`}
        className="flex h-full flex-col justify-between p-6 sm:p-7"
      >
        <div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)] transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-[var(--z-primary)] group-hover:text-white group-hover:shadow-md">
              <Icon name={solution.icon} className="h-5 w-5" />
            </div>
            {typeof index === 'number' && (
              <span className="font-mono text-xs font-medium text-[var(--z-secondary-text)] transition-colors group-hover:text-[var(--z-primary)] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
          </div>

          <h3 className="mt-5 text-lg font-semibold tracking-tight text-[var(--z-charcoal)] transition-colors group-hover:text-[var(--z-primary)] sm:text-xl">
            {solution.title}
          </h3>
          <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
            {solution.shortDescription}
          </p>

          <ul className="mt-5 space-y-2 border-t border-[var(--z-border)] pt-4">
            {solution.capabilities.slice(0, 4).map((cap) => (
              <li
                key={cap}
                className="flex items-center gap-2 text-[13px] font-medium text-[var(--z-charcoal)]/85 transition-transform duration-200 group-hover:translate-x-0.5"
              >
                <span
                  className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--z-primary)]/70 transition-colors group-hover:bg-[var(--z-primary)]"
                  aria-hidden="true"
                />
                <span>{cap}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6 flex items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]">
          <span>Learn More</span>
          <ArrowRight
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
            aria-hidden="true"
          />
        </div>
      </Link>
    </SpotlightCard>
  );
};

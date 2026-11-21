import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { IndustryItem } from '../../types';
import { Icon } from '../common/Icon';
import { SafeImage } from '../common/SafeImage';
import { SpotlightCard } from '../animation/MotionPrimitives';

export const IndustryCard: React.FC<{ industry: IndustryItem }> = ({ industry }) => {
  return (
    <SpotlightCard className="h-full rounded-tl-[28px] rounded-tr-[18px] rounded-br-[28px] rounded-bl-[18px]">
      <Link to={`/industries#${industry.slug}`} className="flex h-full flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <SafeImage
            src={industry.image}
            alt={industry.imageAlt}
            fallbackIcon={industry.icon}
            fallbackTitle={industry.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {/* Organic curved bottom fade blending photo cleanly into card surface */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[var(--z-surface)] via-[var(--z-surface)]/55 to-transparent"
          />
        </div>

        <div className="relative z-10 -mt-5 flex flex-1 flex-col justify-between px-6 pb-6">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[var(--z-border)] bg-[var(--z-surface)] text-[var(--z-primary)] shadow-sm transition-colors group-hover:bg-[var(--z-primary)] group-hover:text-white">
                <Icon name={industry.icon} className="h-4 w-4" />
              </div>
              <h3 className="text-base font-semibold text-[var(--z-charcoal)] group-hover:text-[var(--z-primary)]">
                {industry.title}
              </h3>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[var(--z-secondary-text)]">
              {industry.shortDescription}
            </p>
          </div>

          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]">
            <span>Explore Sector</span>
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </Link>
    </SpotlightCard>
  );
};

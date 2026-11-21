import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../../types';
import { Icon } from '../common/Icon';
import { SpotlightCard } from '../animation/MotionPrimitives';

interface ServiceCardProps {
  service: ServiceItem;
  index?: number;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  return (
    <SpotlightCard className="h-full">
      <Link
        to={`/services/${service.slug}`}
        className="flex h-full flex-col justify-between p-6"
      >
        <div>
          <div className="flex items-center justify-between gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)] transition-all duration-300 group-hover:scale-110 group-hover:-rotate-3 group-hover:bg-[var(--z-primary)] group-hover:text-white group-hover:shadow-md">
              <Icon name={service.icon} className="h-5 w-5" />
            </div>
            {typeof index === 'number' && (
              <span className="font-mono text-xs text-[var(--z-secondary-text)] transition-colors group-hover:text-[var(--z-primary)] tabular-nums">
                {String(index + 1).padStart(2, '0')}
              </span>
            )}
          </div>

          <h3 className="mt-4 text-lg font-semibold text-[var(--z-charcoal)] transition-colors group-hover:text-[var(--z-primary)]">
            {service.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-[var(--z-secondary-text)]">
            {service.shortDescription}
          </p>

          <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 border-t border-[var(--z-border)] pt-3.5 text-xs text-[var(--z-secondary-text)]">
            {service.capabilities.slice(0, 3).map((cap, idx) => (
              <span key={cap} className="inline-flex items-center gap-2">
                {idx > 0 && <span aria-hidden="true">·</span>}
                <span>{cap}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]">
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

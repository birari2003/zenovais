import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { JobOpening } from '../../types';
import { SpotlightCard } from '../animation/MotionPrimitives';

export const JobCard: React.FC<{ job: JobOpening }> = ({ job }) => {
  return (
    <SpotlightCard>
      <Link
        to={`/careers/${job.id}`}
        className="flex flex-col justify-between gap-4 p-6 sm:flex-row sm:items-center"
      >
        <div>
          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--z-secondary-text)]">
            <span className="font-semibold text-[var(--z-primary)]">{job.department}</span>
            <span aria-hidden="true">·</span>
            <span>{job.location}</span>
            <span aria-hidden="true">·</span>
            <span>{job.employmentType}</span>
            <span aria-hidden="true">·</span>
            <span>{job.experienceLevel}</span>
          </div>
          <h3 className="mt-1.5 text-lg font-semibold text-[var(--z-charcoal)] group-hover:text-[var(--z-primary)]">
            {job.title}
          </h3>
          <p className="mt-1.5 max-w-2xl text-sm text-[var(--z-secondary-text)]">{job.description}</p>
        </div>

        <div className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]">
          <span>View Role</span>
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </div>
      </Link>
    </SpotlightCard>
  );
};

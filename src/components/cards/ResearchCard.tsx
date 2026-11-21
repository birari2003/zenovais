import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ResearchArticle } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { SpotlightCard } from '../animation/MotionPrimitives';

export const ResearchCard: React.FC<{ article: ResearchArticle }> = ({ article }) => {
  return (
    <SpotlightCard className="h-full rounded-tl-[28px] rounded-tr-[18px] rounded-br-[28px] rounded-bl-[18px]">
      <Link to={`/research/${article.slug}`} className="flex h-full flex-col">
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <SafeImage
            src={article.coverImage}
            alt={article.coverAlt}
            fallbackIcon="FlaskConical"
            fallbackTitle={article.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-[var(--z-surface)] via-[var(--z-surface)]/45 to-transparent"
          />
        </div>
        <div className="relative z-10 -mt-2 flex flex-1 flex-col justify-between p-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--z-secondary-text)]">
              <span className="font-semibold text-[var(--z-primary)]">{article.category}</span>
              <span aria-hidden="true">·</span>
              <span>{article.date}</span>
              <span aria-hidden="true">·</span>
              <span>{article.readTime}</span>
            </div>
            <h3 className="mt-2.5 text-lg font-semibold leading-snug text-[var(--z-charcoal)] group-hover:text-[var(--z-primary)]">
              {article.title}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
              {article.summary}
            </p>
          </div>
          <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]">
            <span>Read Perspective</span>
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

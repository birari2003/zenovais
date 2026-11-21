import React from 'react';
import { RevealOnScroll } from '../animation/MotionPrimitives';

interface SectionHeadingProps {
  kicker?: string;
  title: string;
  titleHighlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  inverted?: boolean;
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  kicker,
  title,
  titleHighlight,
  subtitle,
  align = 'left',
  inverted = false,
  className = '',
}) => {
  const isCentered = align === 'center';

  return (
    <RevealOnScroll
      className={`${isCentered ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'} ${className}`}
    >
      {kicker && (
        <div
          className={`mb-4 inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide ${
            isCentered ? 'justify-center' : ''
          } ${inverted ? 'text-[var(--z-sage)]' : 'text-[var(--z-primary)]'}`}
        >
          <span
            aria-hidden="true"
            className={`h-[1.5px] w-6 ${
              inverted ? 'bg-[var(--z-sage)]' : 'bg-[var(--z-primary)]'
            }`}
          />
          <span>{kicker}</span>
        </div>
      )}

      <h2
        className={`font-bold tracking-tight ${
          inverted ? 'text-white' : 'text-[var(--z-charcoal)]'
        }`}
        style={{
          fontSize: 'var(--z-section-title, clamp(1.75rem, 3vw, 2.65rem))',
          lineHeight: '1.15',
        }}
      >
        {title}{' '}
        {titleHighlight && (
          <span className={inverted ? 'text-[var(--z-sage)]' : 'text-[var(--z-primary)]'}>
            {titleHighlight}
          </span>
        )}
      </h2>

      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-[17px] ${
            inverted ? 'text-white/80' : 'text-[var(--z-secondary-text)]'
          }`}
        >
          {subtitle}
        </p>
      )}
    </RevealOnScroll>
  );
};

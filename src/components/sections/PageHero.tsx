import React from 'react';
import {
  ClipMaskReveal,
  MaskedLineReveal,
  ParallaxImageFrame,
  RevealOnScroll,
} from '../animation/MotionPrimitives';
import { SafeImage } from '../common/SafeImage';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { PageContainer } from '../layout/PageContainer';
import { OrbitalArcsOverlay } from '../common/ArchitecturalMedia';

interface PageHeroProps {
  kicker: string;
  title: string;
  titleHighlight?: string;
  description: string;
  breadcrumbs?: { label: string; to?: string }[];
  image?: string;
  imageAlt?: string;
  actions?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  kicker,
  title,
  titleHighlight,
  description,
  breadcrumbs,
  image,
  imageAlt = '',
  actions,
}) => {
  return (
    <section className="relative overflow-hidden border-b border-[var(--z-border)] bg-[var(--z-bg)] pt-6 pb-8 sm:pt-7 sm:pb-10 lg:pt-8 lg:pb-11">
      <div className="architectural-grid pointer-events-none absolute inset-0 opacity-45" aria-hidden="true" />
      <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-35" />

      <PageContainer className="relative z-10">
        {breadcrumbs && <Breadcrumbs items={breadcrumbs} className="mb-3" />}

        <div
          className={`grid grid-cols-1 gap-6 ${
            image ? 'lg:grid-cols-12 lg:items-center lg:gap-10' : ''
          }`}
        >
          <div className={image ? 'lg:col-span-7' : 'max-w-3xl'}>
            <RevealOnScroll delay={0.02} distance={8}>
              <div className="mb-2 inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[var(--z-primary)]">
                <span className="h-[1.5px] w-5 bg-[var(--z-primary)]" aria-hidden="true" />
                <span>{kicker}</span>
              </div>
            </RevealOnScroll>

            <h1
              className="font-bold tracking-tight text-[var(--z-charcoal)]"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.14 }}
            >
              <MaskedLineReveal delay={0.05}>{title}</MaskedLineReveal>
              {titleHighlight && (
                <MaskedLineReveal delay={0.12} className="text-[var(--z-primary)]">
                  {titleHighlight}
                </MaskedLineReveal>
              )}
            </h1>

            <RevealOnScroll delay={0.16} distance={12}>
              <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-[var(--z-secondary-text)] sm:text-[15.5px]">
                {description}
              </p>
            </RevealOnScroll>

            {actions && (
              <RevealOnScroll delay={0.22} distance={10}>
                <div className="mt-4 flex flex-wrap items-center gap-3">{actions}</div>
              </RevealOnScroll>
            )}
          </div>

          {image && (
            <div className="lg:col-span-5">
              <ClipMaskReveal delay={0.12}>
                <ParallaxImageFrame
                  className="h-[155px] w-full rounded-tl-[48px] rounded-tr-[16px] rounded-br-[44px] rounded-bl-[16px] border-2 border-[var(--z-surface)] shadow-[0_18px_36px_-14px_rgba(23,33,43,0.18)] sm:h-[185px] lg:ml-auto lg:max-w-[350px]"
                  intensity={10}
                >
                  <SafeImage
                    src={image}
                    alt={imageAlt}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                </ParallaxImageFrame>
              </ClipMaskReveal>
            </div>
          )}
        </div>
      </PageContainer>
    </section>
  );
};

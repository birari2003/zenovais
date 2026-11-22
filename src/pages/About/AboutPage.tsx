import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { aboutPageData } from '../../data/about';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Icon } from '../../components/common/Icon';
import { CTASection } from '../../components/sections/CTASection';
import { WorkflowStepper } from '../../components/sections/WorkflowStepper';
import {
  RevealOnScroll,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';

export const AboutPage: React.FC = () => {
  useSEO({
    title: aboutPageData.seo.title,
    description: aboutPageData.seo.description,
    keywords: aboutPageData.seo.keywords,
    path: '/about',
  });

  const { hero, whoWeAre, missionVision, coreValues, approach, cta } = aboutPageData;

  return (
    <>
      <PageHero
        kicker={hero.kicker}
        title={hero.title}
        titleHighlight={hero.titleHighlight}
        description={hero.description}
        breadcrumbs={[{ label: 'About Us' }]}
        image={hero.image}
        imageAlt={hero.imageAlt}
      />

      {/* Who We Are */}
      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <SectionHeading kicker={whoWeAre.kicker} title={whoWeAre.title} />
            <RevealOnScroll delay={0.1} className="mt-6 space-y-4">
              {whoWeAre.paragraphs.map((text, idx) => (
                <p
                  key={idx}
                  className="text-base leading-relaxed text-[var(--z-secondary-text)] sm:text-[17px]"
                >
                  {text}
                </p>
              ))}
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-5">
            <RevealOnScroll delay={0.14}>
              <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-6 sm:p-8">
                <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                  Core Operational Focus
                </h3>
                <ul className="mt-5 space-y-3.5">
                  {whoWeAre.pillars.map((pillar) => (
                    <li
                      key={pillar}
                      className="flex items-center gap-3 text-sm font-medium text-[var(--z-charcoal)]"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-[var(--z-primary)]"
                        aria-hidden="true"
                      />
                      <span>{pillar}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          </div>
        </div>
      </SectionWrapper>

      {/* Mission & Vision */}
      <SectionWrapper background="pale">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <RevealOnScroll>
            <div className="h-full rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-8 sm:p-10">
              <div className="mb-3 inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[var(--z-primary)]">
                <span className="h-[1.5px] w-5 bg-[var(--z-primary)]" aria-hidden="true" />
                <span>{missionVision.mission.kicker}</span>
              </div>
              <p className="text-xl font-semibold leading-relaxed text-[var(--z-charcoal)] sm:text-2xl">
                {missionVision.mission.statement}
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.1}>
            <div className="h-full rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-8 sm:p-10">
              <div className="mb-3 inline-flex items-center gap-2.5 text-xs font-semibold tracking-wide text-[var(--z-primary)]">
                <span className="h-[1.5px] w-5 bg-[var(--z-primary)]" aria-hidden="true" />
                <span>{missionVision.vision.kicker}</span>
              </div>
              <p className="text-xl font-semibold leading-relaxed text-[var(--z-charcoal)] sm:text-2xl">
                {missionVision.vision.statement}
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </SectionWrapper>

      {/* Core Values */}
      <SectionWrapper background="white">
        <SectionHeading kicker={coreValues.kicker} title={coreValues.title} />
        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {coreValues.items.map((val) => (
            <StaggerItem key={val.title}>
              <SpotlightCard className="h-full bg-[var(--z-bg)]/45">
                <div className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                    <Icon name={val.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-[var(--z-charcoal)]">
                    {val.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                    {val.description}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Our Approach Workflow */}
      <SectionWrapper background="white">
        <SectionHeading
          kicker={approach.kicker}
          title={approach.title}
          subtitle={approach.subtitle}
        />
        <WorkflowStepper steps={approach.steps} />
      </SectionWrapper>

      <CTASection
        title={cta.title}
        description={cta.description}
        ctaLabel={cta.ctaLabel}
        ctaTo={cta.ctaTo}
      />
    </>
  );
};

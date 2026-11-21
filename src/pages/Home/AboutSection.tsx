import React from 'react';
import { homepageContent } from '../../data/homepage';
import { siteImages } from '../../data/assets';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import {
  MixedCurvedMediaComposition,
  OrbitalArcsOverlay,
} from '../../components/common/ArchitecturalMedia';
import {
  MagneticHover,
  RevealOnScroll,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';

export const AboutSection: React.FC = () => {
  const { aboutSection, brandMeaning } = homepageContent;

  return (
    <SectionWrapper id="home-about" background="white" className="relative overflow-hidden">
      <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-45" />

      {/* Main Split About Block with Curved & Mixed Image Composition */}
      <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-6">
          <SectionHeading
            kicker={aboutSection.kicker}
            title={aboutSection.title}
            titleHighlight={aboutSection.titleHighlight}
            subtitle={aboutSection.description}
          />

          <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {aboutSection.principles.map((item) => (
              <StaggerItem key={item.title}>
                <SpotlightCard className="h-full bg-[var(--z-bg)]/60">
                  <div className="flex items-start gap-3.5 p-5">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                      <Icon name={item.icon} className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-[15px] font-semibold text-[var(--z-charcoal)]">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </SpotlightCard>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <RevealOnScroll delay={0.18} className="mt-8 flex flex-wrap items-center gap-5">
            <MagneticHover>
              <Button to={aboutSection.cta.to} withArrow>
                {aboutSection.cta.label}
              </Button>
            </MagneticHover>
            <span className="h-5 w-px bg-[var(--z-border)]" aria-hidden="true" />
            <span className="text-xs font-semibold tracking-widest text-[var(--z-secondary-text)]">
              {aboutSection.tagline}
            </span>
          </RevealOnScroll>
        </div>

        <div className="lg:col-span-6">
          <MixedCurvedMediaComposition
            primarySrc={aboutSection.image}
            primaryAlt={aboutSection.imageAlt}
            secondarySrc={siteImages.servicesTeam}
            secondaryAlt="Zenovais engineering team collaborating in sunlit studio"
            secondaryCaption="Collaborative AI Architecture"
          />
        </div>
      </div>

      {/* Brand Meaning Subsection */}
      <RevealOnScroll delay={0.1} className="relative z-10 mt-20 border-t border-[var(--z-border)] pt-14">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="mb-3 inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide text-[var(--z-primary)]">
              <span className="h-[1.5px] w-6 bg-[var(--z-primary)]" aria-hidden="true" />
              <span>{brandMeaning.kicker}</span>
            </div>
            <h3 className="text-2xl font-bold tracking-tight text-[var(--z-charcoal)] sm:text-3xl">
              {brandMeaning.title}
            </h3>
          </div>
          <p className="max-w-md text-xs leading-relaxed text-[var(--z-secondary-text)]">
            {brandMeaning.note}
          </p>
        </div>

        <StaggerContainer className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {brandMeaning.pillars.map((pillar) => (
            <StaggerItem key={pillar.segment}>
              <SpotlightCard className="h-full bg-[var(--z-bg)]/45">
                <div className="p-6">
                  <span className="font-mono text-sm font-semibold tracking-wider text-[var(--z-primary)]">
                    {pillar.segment}
                  </span>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                    {pillar.meaning}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </RevealOnScroll>
    </SectionWrapper>
  );
};

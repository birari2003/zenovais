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
  const { aboutSection } = homepageContent;

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
    </SectionWrapper>
  );
};

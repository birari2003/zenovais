import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { homepageContent } from '../../data/homepage';
import { solutionsData } from '../../data/solutions';
import { servicesData } from '../../data/services';
import { industriesData } from '../../data/industries';
import { siteImages } from '../../data/assets';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { SafeImage } from '../../components/common/SafeImage';
import { SolutionCard } from '../../components/cards/SolutionCard';
import { ServiceCard } from '../../components/cards/ServiceCard';
import { IndustryCard } from '../../components/cards/IndustryCard';
import { CTASection } from '../../components/sections/CTASection';
import {
  FeatheredSectionBackdrop,
  MixedCurvedMediaComposition,
  OrbitalArcsOverlay,
} from '../../components/common/ArchitecturalMedia';
import { ZenovaisNeuralCore3D } from '../../components/three/ZenovaisNeuralCore3D';
import {
  AnimatedCounter,
  ClipMaskReveal,
  MagneticHover,
  RevealOnScroll,
  ScrollScaleParallax,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
  VelocityCapabilityTicker,
} from '../../components/animation/MotionPrimitives';
import { HeroSection } from './HeroSection';
import { AboutSection } from './AboutSection';
import { InteractiveExplainerSection } from './InteractiveExplainerSection';
import { ProductsShowcaseSection } from './ProductsShowcaseSection';

export const HomePage: React.FC = () => {
  useSEO({
    title: 'Zenovais Technologies – Building Intelligent Tomorrow, Together',
    description:
      'Zenovais Technologies is an AI-first technology company creating intelligent products, AI agents, automation systems, and next-generation digital solutions.',
    path: '/',
  });

  const featuredSolutions = solutionsData.filter((s) => s.featuredOnHome);
  const {
    solutionsSection,
    servicesSection,
    industriesSection,
    researchSection,
    impactSection,
    testimonialsSection,
    finalCta,
  } = homepageContent;

  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const prefersReduced = useReducedMotion();
  const testimonials = testimonialsSection.items;
  const activeTestimonial = testimonials[testimonialIdx];

  return (
    <>
      {/* 1. Hero (Full-Bleed Feathered Backdrop + Interactive Foreground 3D Robotics/Studio Frame) */}
      <HeroSection />

      {/* Velocity-Reactive Kinetic Crossed Engineering Ribbons */}
      <VelocityCapabilityTicker
        items={[
          'AI & Machine Learning',
          'Generative AI & LLMs',
          'Autonomous Agentic Workflows',
          'Grounded Enterprise RAG',
          'Robotics & Computer Vision',
          'Custom AI Product Engineering',
        ]}
        secondaryItems={[
          'Intelligent Automation Systems',
          'AI-Powered SaaS Platforms',
          'Full-Stack Software Engineering',
          'Edge Inference & Sensor Fusion',
          'Applied Systems Research',
          'Enterprise Digital Strategy',
        ]}
      />

      {/* 2. About Zenovais & Brand Meaning (Mixed Curved Arch Images + Counter Parallax) */}
      <AboutSection />

      {/* 2B. Plain-English Interactive 3D Robotics & AI Walkthrough */}
      <InteractiveExplainerSection />

      {/* 3. AI Solutions (Feathered Studio Backdrop + Orbital Arcs + Asymmetric Bento) */}
      <SectionWrapper background="warm" className="relative overflow-hidden">
        <FeatheredSectionBackdrop
          src={siteImages.servicesTeam}
          alt="Zenovais AI architects collaborating"
          bgColorVar="var(--z-bg)"
          opacityClass="opacity-30 lg:opacity-45"
        />
        <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-45" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            kicker={solutionsSection.kicker}
            title={solutionsSection.title}
            subtitle={solutionsSection.subtitle}
          />
          <MagneticHover>
            <Button to={solutionsSection.ctaTo} variant="secondary" withArrow>
              {solutionsSection.ctaLabel}
            </Button>
          </MagneticHover>
        </div>

        <StaggerContainer className="relative z-10 mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredSolutions.map((solution, idx) => (
            <StaggerItem
              key={solution.slug}
              className={idx === 0 ? 'lg:col-span-2' : ''}
            >
              <SolutionCard solution={solution} index={idx} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* 4. Products (Feathered Backdrop + Curved Preview Frame) */}
      <ProductsShowcaseSection />

      {/* 5. Services (Feathered Backdrop + Mixed Curved Media Collage + 6 Service Cards) */}
      <SectionWrapper background="warm" className="relative overflow-hidden">
        <FeatheredSectionBackdrop
          src={servicesSection.image}
          alt={servicesSection.imageAlt}
          bgColorVar="var(--z-bg)"
          align="left"
          opacityClass="opacity-20 lg:opacity-35"
        />

        <div className="relative z-10 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
          <div className="lg:sticky lg:top-24 lg:col-span-5">
            <SectionHeading
              kicker={servicesSection.kicker}
              title={servicesSection.title}
              subtitle={servicesSection.subtitle}
            />

            <div className="mt-8">
              <MixedCurvedMediaComposition
                primarySrc={servicesSection.image}
                primaryAlt={servicesSection.imageAlt}
                secondarySrc={siteImages.researchLab}
                secondaryAlt="Precision AI compute engineering workbench"
                secondaryCaption="Full-Lifecycle Engineering"
                flipped
              />
            </div>

            <RevealOnScroll delay={0.18} className="mt-6">
              <MagneticHover>
                <Button to={servicesSection.ctaTo} withArrow>
                  {servicesSection.ctaLabel}
                </Button>
              </MagneticHover>
            </RevealOnScroll>
          </div>

          <div className="lg:col-span-7">
            <StaggerContainer className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {servicesData.map((service, idx) => (
                <StaggerItem key={service.slug}>
                  <ServiceCard service={service} index={idx} />
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </div>
      </SectionWrapper>

      {/* 6. Industries (Architectural Feathered Corner Backdrop + Curved Cards) */}
      <SectionWrapper background="white" className="relative overflow-hidden">
        <FeatheredSectionBackdrop
          src={siteImages.executiveBoardroom}
          alt="Modern glass architectural enterprise skyline"
          bgColorVar="var(--z-surface)"
          opacityClass="opacity-20 lg:opacity-30"
        />
        <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-40" />

        <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            kicker={industriesSection.kicker}
            title={industriesSection.title}
            subtitle={industriesSection.description}
          />
          <Button to={industriesSection.ctaTo} variant="secondary" withArrow>
            {industriesSection.ctaLabel}
          </Button>
        </div>

        <StaggerContainer className="relative z-10 mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industriesData.map((industry) => (
            <StaggerItem key={industry.slug}>
              <IndustryCard industry={industry} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* 7. Research & Innovation (Interactive Three.js 3D Neural Core + Curved Hardware Media) */}
      <SectionWrapper background="pale" className="relative overflow-hidden">
        <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-55" />

        <div className="relative z-10 grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-6 lg:col-span-6">
            {/* Live Interactive Three.js 3D Neural Core Sculpture with Scroll Scale Depth */}
            <ScrollScaleParallax>
              <div className="relative h-[380px] overflow-hidden rounded-tl-[72px] rounded-tr-[24px] rounded-br-[72px] rounded-bl-[24px] border border-[var(--z-border)] bg-gradient-to-br from-[#FAFAF7] via-[#EAF2ED] to-[#DCE9E3] shadow-[0_24px_56px_-18px_rgba(7,91,80,0.22)] sm:h-[430px]">
                <ZenovaisNeuralCore3D className="h-full w-full" />
                <div className="pointer-events-none absolute top-5 left-6">
                  <p className="font-mono text-[11px] font-semibold text-[var(--z-primary)]">
                    INTERACTIVE 3D TOPOLOGY
                  </p>
                  <p className="text-sm font-bold text-[var(--z-charcoal)]">
                    Zenovais Neural Core
                  </p>
                </div>
              </div>
            </ScrollScaleParallax>

            {/* Secondary Curved R&D Lab Photography Strip */}
            <ClipMaskReveal delay={0.1}>
              <div className="grid grid-cols-1 items-center gap-4 overflow-hidden rounded-tl-[24px] rounded-tr-[48px] rounded-br-[24px] rounded-bl-[48px] border border-[var(--z-border)] bg-[var(--z-surface)] p-4 shadow-sm sm:grid-cols-12">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl sm:col-span-5">
                  <SafeImage
                    src={researchSection.image}
                    alt={researchSection.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="px-2 sm:col-span-7">
                  <p className="text-xs font-semibold text-[var(--z-primary)]">
                    Applied Systems Lab
                  </p>
                  <h3 className="mt-1 text-base font-bold text-[var(--z-charcoal)]">
                    Hardware-Aware Intelligence
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                    Exploring efficient edge inference, bounded agent reasoning, and reliable
                    physical-digital control architectures.
                  </p>
                </div>
              </div>
            </ClipMaskReveal>
          </div>

          <div className="lg:col-span-6">
            <SectionHeading
              kicker={researchSection.kicker}
              title={researchSection.title}
              subtitle={researchSection.description}
            />

            <StaggerContainer className="mt-8 space-y-3">
              {researchSection.focusAreas.map((area, idx) => (
                <StaggerItem key={area}>
                  <div className="flex items-center justify-between rounded-xl border border-[var(--z-border)] bg-[var(--z-surface)] px-5 py-3.5 transition-all duration-200 hover:translate-x-1 hover:border-[var(--z-primary)]/45">
                    <div className="flex items-center gap-3.5">
                      <span className="font-mono text-xs font-medium text-[var(--z-primary)] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span className="text-sm font-semibold text-[var(--z-charcoal)]">
                        {area}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            <RevealOnScroll delay={0.18} className="mt-8">
              <MagneticHover>
                <Button to={researchSection.ctaTo} withArrow>
                  {researchSection.ctaLabel}
                </Button>
              </MagneticHover>
            </RevealOnScroll>
          </div>
        </div>
      </SectionWrapper>

      {/* 8. Company Impact */}
      <SectionWrapper background="white" className="relative overflow-hidden">
        <FeatheredSectionBackdrop
          src={siteImages.aboutWorkspace}
          alt="Zenovais engineering architecture space"
          bgColorVar="var(--z-surface)"
          opacityClass="opacity-15 lg:opacity-25"
        />

        <div className="relative z-10">
          <SectionHeading
            kicker={impactSection.kicker}
            title={impactSection.title}
            subtitle={impactSection.subtitle}
          />

          {impactSection.verifiedMetrics.length > 0 ? (
            <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactSection.verifiedMetrics.map((metric) => (
                <StaggerItem key={metric.id}>
                  <SpotlightCard className="h-full bg-[var(--z-bg)]/55">
                    <div className="p-6">
                      <div className="text-4xl font-bold text-[var(--z-primary)]">
                        <AnimatedCounter target={metric.value} suffix={metric.suffix} />
                      </div>
                      <h3 className="mt-2 text-base font-semibold text-[var(--z-charcoal)]">
                        {metric.label}
                      </h3>
                      <p className="mt-1 text-xs text-[var(--z-secondary-text)]">
                        {metric.context}
                      </p>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          ) : (
            <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {impactSection.qualitativePillars.map((pillar) => (
                <StaggerItem key={pillar.id}>
                  <SpotlightCard className="h-full bg-[var(--z-bg)]/55">
                    <div className="flex h-full flex-col justify-between p-6">
                      <div>
                        <div className="flex items-center justify-between">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                            <Icon name={pillar.icon} className="h-5 w-5" />
                          </div>
                          <span className="font-mono text-xs text-[var(--z-secondary-text)] tabular-nums">
                            {pillar.index}
                          </span>
                        </div>
                        <h3 className="mt-5 text-base font-semibold text-[var(--z-charcoal)]">
                          {pillar.title}
                        </h3>
                        <p className="mt-2 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                          {pillar.description}
                        </p>
                      </div>
                    </div>
                  </SpotlightCard>
                </StaggerItem>
              ))}
            </StaggerContainer>
          )}
        </div>
      </SectionWrapper>

      {/* 9. Testimonials / Enterprise Partnerships (Curved Mixed Photo Strip inspired by Screenshot 8) */}
      <SectionWrapper background="warm" compact>
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <SectionHeading
            kicker={testimonialsSection.kicker}
            title={testimonialsSection.title}
          />
          {testimonials.length > 1 && (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Previous testimonial"
                onClick={() =>
                  setTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--z-border)] bg-[var(--z-surface)] text-[var(--z-charcoal)] hover:border-[var(--z-primary)]"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next testimonial"
                onClick={() => setTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--z-border)] bg-[var(--z-surface)] text-[var(--z-charcoal)] hover:border-[var(--z-primary)]"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        {activeTestimonial ? (
          <div className="mt-8 overflow-hidden rounded-tl-[48px] rounded-tr-[24px] rounded-br-[48px] rounded-bl-[24px] border border-[var(--z-border)] bg-[var(--z-surface)] p-8 sm:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                initial={prefersReduced ? undefined : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
              >
                <Quote className="h-7 w-7 text-[var(--z-primary)]/40" aria-hidden="true" />
                <blockquote className="mt-4 max-w-3xl text-lg leading-relaxed font-medium text-[var(--z-charcoal)] sm:text-xl">
                  “{activeTestimonial.quote}”
                </blockquote>
                <div className="mt-6 flex items-center gap-3.5">
                  {activeTestimonial.avatarUrl && (
                    <SafeImage
                      src={activeTestimonial.avatarUrl}
                      alt={activeTestimonial.name}
                      className="h-11 w-11 rounded-full object-cover"
                    />
                  )}
                  <div>
                    <div className="text-sm font-semibold text-[var(--z-charcoal)]">
                      {activeTestimonial.name}
                    </div>
                    <div className="text-xs text-[var(--z-secondary-text)]">
                      {activeTestimonial.designation} · {activeTestimonial.company}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          <RevealOnScroll className="mt-8">
            <div className="grid grid-cols-1 items-center gap-6 overflow-hidden rounded-tl-[52px] rounded-tr-[24px] rounded-br-[52px] rounded-bl-[24px] border border-[var(--z-border)] bg-[var(--z-surface)] p-6 sm:p-8 lg:grid-cols-12">
              <div className="aspect-[16/10] overflow-hidden rounded-tl-[36px] rounded-tr-[16px] rounded-br-[36px] rounded-bl-[16px] lg:col-span-4">
                <SafeImage
                  src={siteImages.executiveBoardroom}
                  alt="Zenovais executive partnership briefing room"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-between gap-6 lg:col-span-8 lg:flex-row lg:items-center lg:pl-4">
                <div className="max-w-xl">
                  <h3 className="text-xl font-bold text-[var(--z-charcoal)]">
                    {testimonialsSection.emptyState.headline}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)] sm:text-base">
                    {testimonialsSection.emptyState.description}
                  </p>
                </div>
                <div className="shrink-0">
                  <MagneticHover>
                    <Button to={testimonialsSection.emptyState.ctaTo} variant="secondary" withArrow>
                      {testimonialsSection.emptyState.ctaLabel}
                    </Button>
                  </MagneticHover>
                </div>
              </div>
            </div>
          </RevealOnScroll>
        )}
      </SectionWrapper>

      {/* 10. Final CTA */}
      <CTASection
        title={finalCta.title}
        description={finalCta.description}
        ctaLabel={finalCta.ctaLabel}
        ctaTo={finalCta.ctaTo}
        image={finalCta.image}
        imageAlt={finalCta.imageAlt}
      />
    </>
  );
};

import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { Play, ArrowDown, Box, Image as ImageIcon } from 'lucide-react';
import { homepageContent } from '../../data/homepage';
import { siteImages } from '../../data/assets';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { SafeImage } from '../../components/common/SafeImage';
import { Modal } from '../../components/common/Modal';
import { PageContainer } from '../../components/layout/PageContainer';
import {
  FeatheredSectionBackdrop,
  OrbitalArcsOverlay,
} from '../../components/common/ArchitecturalMedia';
import { ZenovaisNeuralCore3D } from '../../components/three/ZenovaisNeuralCore3D';
import { ZenovaisRoboticsArm3D } from '../../components/three/ZenovaisRoboticsArm3D';
import {
  MagneticHover,
  MaskedLineReveal,
  RevealOnScroll,
} from '../../components/animation/MotionPrimitives';

export const HeroSection: React.FC = () => {
  const { hero, videoModal } = homepageContent;
  const [videoOpen, setVideoOpen] = useState(false);
  const [insetMode, setInsetMode] = useState<'robotics' | 'studio'>('robotics');
  const prefersReduced = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });
  const insetY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const smoothInsetY = useSpring(insetY, { stiffness: 120, damping: 24 });

  const scrollToExplainer = () => {
    const el = document.getElementById('how-zenovais-works') || document.getElementById('home-about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      ref={heroRef}
      className="relative overflow-hidden border-b border-[var(--z-border)] bg-[var(--z-bg)] pt-10 pb-12 sm:pt-12 sm:pb-16 lg:min-h-[540px] lg:pt-14 lg:pb-16"
    >
      {/* Full-bleed seamlessly feathered background photography (Screenshot 1 aesthetic) */}
      <FeatheredSectionBackdrop
        src={hero.image}
        alt={hero.imageAlt}
        bgColorVar="var(--z-bg)"
        loading="eager"
        opacityClass="opacity-95"
      />

      {/* Concentric SVG Orbital Arcs */}
      <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-35" />

      <PageContainer className="relative z-10">
        <div className="grid grid-cols-1 items-end gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Left Column: Copy & CTAs */}
          <div className="flex flex-col justify-center lg:col-span-7">
            <RevealOnScroll delay={0.02} distance={10}>
              <div className="mb-5 inline-flex items-center gap-3 text-[13px] font-semibold tracking-wide text-[var(--z-primary)]">
                <span className="h-[1.5px] w-7 bg-[var(--z-primary)]" aria-hidden="true" />
                <span>{hero.kicker}</span>
              </div>
            </RevealOnScroll>

            <h1
              className="font-bold tracking-tight text-[var(--z-charcoal)]"
              style={{ fontSize: 'clamp(2.25rem, 4.3vw, 3.85rem)', lineHeight: 1.09 }}
            >
              <MaskedLineReveal delay={0.06}>{hero.headlineLine1}</MaskedLineReveal>
              <MaskedLineReveal delay={0.14}>
                <span className="text-[var(--z-primary)]">{hero.headlineHighlight}</span>{' '}
                {hero.headlineEnd}
              </MaskedLineReveal>
            </h1>

            <RevealOnScroll delay={0.22} distance={16}>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-[var(--z-charcoal)]/85 sm:text-[18px]">
                {hero.description}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.3} distance={14}>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <MagneticHover>
                  <Button to={hero.primaryCta.to} size="lg" withArrow>
                    {hero.primaryCta.label}
                  </Button>
                </MagneticHover>
                <MagneticHover strength={0.14}>
                  <button
                    type="button"
                    onClick={() => setVideoOpen(true)}
                    className="group inline-flex min-h-[46px] items-center gap-2.5 rounded-full border border-[var(--z-border)] bg-[var(--z-surface)]/95 px-5 py-3 text-[15px] font-semibold text-[var(--z-charcoal)] shadow-sm transition-all duration-200 hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[var(--z-charcoal)] text-white transition-colors group-hover:bg-[var(--z-primary)]">
                      <Play className="ml-0.5 h-3 w-3 fill-current" aria-hidden="true" />
                    </span>
                    <span>{hero.secondaryCta.label}</span>
                  </button>
                </MagneticHover>
              </div>
            </RevealOnScroll>

            {/* Capability Highlights with Hover Micro-Lift */}
            <RevealOnScroll delay={0.38} distance={14}>
              <div className="mt-8 grid max-w-2xl grid-cols-1 gap-4 border-t border-[var(--z-charcoal)]/10 pt-6 sm:grid-cols-3 sm:gap-0 sm:divide-x sm:divide-[var(--z-charcoal)]/10">
                {hero.highlights.map((item, idx) => (
                  <motion.div
                    key={item.label}
                    whileHover={prefersReduced ? undefined : { y: -2 }}
                    transition={{ type: 'spring', stiffness: 360, damping: 24 }}
                    className={`group flex items-center gap-3 ${
                      idx === 0 ? 'sm:pr-4' : idx === 1 ? 'sm:px-4' : 'sm:pl-4'
                    }`}
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--z-surface)]/95 text-[var(--z-primary)] shadow-xs transition-colors duration-200 group-hover:bg-[var(--z-primary)] group-hover:text-white">
                      <Icon name={item.icon} className="h-4 w-4" />
                    </div>
                    <span className="text-[13px] font-semibold leading-snug text-[var(--z-charcoal)]">
                      {item.label}
                    </span>
                  </motion.div>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Right Column: Interactive Foreground 3D Robotics + Studio Architectural Window */}
          <div className="hidden lg:col-span-5 lg:flex lg:flex-col lg:items-end lg:justify-end">
            <motion.div
              initial={prefersReduced ? undefined : { opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.85, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              style={prefersReduced ? undefined : { y: smoothInsetY }}
              className="w-[330px] xl:w-[375px]"
            >
              <div className="overflow-hidden rounded-tl-[68px] rounded-tr-[20px] rounded-br-[60px] rounded-bl-[20px] border-2 border-[var(--z-surface)] bg-[var(--z-surface)] shadow-[0_28px_60px_-18px_rgba(7,91,80,0.3)]">
                <div className="relative h-[225px] w-full overflow-hidden bg-gradient-to-br from-[#FAFAF7] via-[#EAF2ED] to-[#DCE9E3] xl:h-[250px]">
                  <AnimatePresence mode="wait">
                    {insetMode === 'robotics' ? (
                      <motion.div
                        key="robotics"
                        initial={prefersReduced ? undefined : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={prefersReduced ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="h-full w-full"
                      >
                        <ZenovaisRoboticsArm3D
                          mode="act"
                          showDock={false}
                          className="h-full w-full min-h-[225px]"
                        />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="studio"
                        initial={prefersReduced ? undefined : { opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={prefersReduced ? undefined : { opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="h-full w-full"
                      >
                        <SafeImage
                          src={siteImages.aboutWorkspace}
                          alt="Zenovais AI hardware and engineering table"
                          loading="eager"
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center justify-between gap-2 border-t border-[var(--z-border)] bg-[var(--z-surface)] px-4 py-3">
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-[var(--z-charcoal)]">
                      {insetMode === 'robotics' ? 'Autonomous Robotics 3D' : 'Applied AI Studio'}
                    </p>
                    <p className="truncate text-[11px] text-[var(--z-secondary-text)]">
                      {insetMode === 'robotics' ? 'Drag to orbit · Live motion' : 'Agents · Systems · Products'}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() =>
                        setInsetMode((prev) => (prev === 'robotics' ? 'studio' : 'robotics'))
                      }
                      aria-label={
                        insetMode === 'robotics'
                          ? 'Switch preview to studio photography'
                          : 'Switch preview to interactive 3D robotics'
                      }
                      className="inline-flex h-8 items-center gap-1.5 rounded-full border border-[var(--z-border)] bg-[var(--z-bg)] px-2.5 text-[11px] font-semibold text-[var(--z-charcoal)] transition-colors hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]"
                    >
                      {insetMode === 'robotics' ? (
                        <>
                          <ImageIcon className="h-3 w-3" aria-hidden="true" />
                          <span>Studio</span>
                        </>
                      ) : (
                        <>
                          <Box className="h-3 w-3" aria-hidden="true" />
                          <span>3D Lab</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={() => setVideoOpen(true)}
                      aria-label="Open company overview"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--z-pale-green)] text-[var(--z-primary)] transition-colors hover:bg-[var(--z-primary)] hover:text-white"
                    >
                      <Play className="ml-0.5 h-3.5 w-3.5 fill-current" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Plain-English Interactive Walkthrough Shortcut */}
        <div className="mt-7 hidden items-center justify-between lg:flex">
          <button
            type="button"
            onClick={scrollToExplainer}
            className="group inline-flex items-center gap-2.5 text-xs font-semibold text-[var(--z-charcoal)]/85 transition-colors hover:text-[var(--z-primary)]"
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--z-border)] bg-[var(--z-surface)]/95 transition-transform group-hover:translate-y-0.5 group-hover:border-[var(--z-primary)]">
              <ArrowDown className="h-3.5 w-3.5" aria-hidden="true" />
            </span>
            <span>See how our AI & robotics work — simply explained</span>
          </button>
        </div>
      </PageContainer>

      {/* Company Overview Video / Interactive 3D Briefing Modal */}
      <Modal
        isOpen={videoOpen}
        onClose={() => setVideoOpen(false)}
        title={videoModal.title}
        maxWidthClass="max-w-3xl"
      >
        <div className="space-y-6">
          <div className="relative overflow-hidden rounded-2xl border border-[var(--z-border)] bg-[#06443C] text-white">
            <div className="relative h-[320px] w-full sm:h-[360px]">
              <ZenovaisNeuralCore3D className="h-full w-full" />
              <div className="pointer-events-none absolute inset-x-0 top-0 p-5 sm:p-6">
                <p className="text-xs font-semibold tracking-wide text-[var(--z-sage)]">
                  {videoModal.subtitle}
                </p>
                <h4 className="mt-1 text-lg font-bold text-white sm:text-xl">
                  {videoModal.title}
                </h4>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {videoModal.chapters.map((chapter) => (
              <div
                key={chapter.time}
                className="rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] p-4"
              >
                <span className="font-mono text-xs font-medium text-[var(--z-primary)] tabular-nums">
                  {chapter.time}
                </span>
                <h5 className="mt-1 text-sm font-semibold text-[var(--z-charcoal)]">
                  {chapter.title}
                </h5>
                <p className="mt-1 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                  {chapter.detail}
                </p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[var(--z-border)] pt-4">
            <p className="text-xs text-[var(--z-secondary-text)]">
              Want a live architecture walkthrough tailored to your organization?
            </p>
            <Button to="/contact" size="sm" withArrow onClick={() => setVideoOpen(false)}>
              Schedule Briefing
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
};

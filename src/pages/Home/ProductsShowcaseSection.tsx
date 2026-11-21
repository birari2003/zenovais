import React, { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { CheckCircle2 } from 'lucide-react';
import { homepageContent } from '../../data/homepage';
import { productBlueprintTracks, productsData } from '../../data/products';
import { siteImages } from '../../data/assets';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Button } from '../../components/common/Button';
import { SafeImage } from '../../components/common/SafeImage';
import { ProductCard } from '../../components/cards/ProductCard';
import {
  FeatheredSectionBackdrop,
  OrbitalArcsOverlay,
} from '../../components/common/ArchitecturalMedia';
import {
  RevealOnScroll,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';

export const ProductsShowcaseSection: React.FC = () => {
  const { productsSection } = homepageContent;
  const [activeTrackIndex, setActiveTrackIndex] = useState(0);
  const prefersReduced = useReducedMotion();

  const activeTrack = productBlueprintTracks[activeTrackIndex] ?? productBlueprintTracks[0];

  return (
    <SectionWrapper background="white" className="relative overflow-hidden">
      <FeatheredSectionBackdrop
        src={siteImages.heroWorkspace}
        alt="Zenovais studio workspace"
        bgColorVar="var(--z-surface)"
        opacityClass="opacity-25 lg:opacity-35"
      />
      <OrbitalArcsOverlay className="absolute inset-0 h-full w-full opacity-40" />

      <div className="relative z-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <SectionHeading
          kicker={productsSection.kicker}
          title={productsSection.title}
          subtitle={productsSection.subtitle}
        />
        <Button to={productsSection.ctaTo} variant="secondary" withArrow>
          {productsSection.ctaLabel}
        </Button>
      </div>

      {productsData.length > 0 ? (
        <StaggerContainer className="relative z-10 mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {productsData.map((product) => (
            <StaggerItem key={product.slug}>
              <ProductCard product={product} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      ) : (
        <RevealOnScroll className="relative z-10 mt-12">
          {/* Interactive Tab Switcher */}
          <div
            role="tablist"
            aria-label="Product platform tracks"
            className="inline-flex flex-wrap gap-1.5 rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-1.5 shadow-xs"
          >
            {productBlueprintTracks.map((track, idx) => {
              const active = idx === activeTrackIndex;
              return (
                <button
                  key={track.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveTrackIndex(idx)}
                  className={`relative rounded-xl px-4 py-2 text-xs font-semibold whitespace-nowrap transition-colors sm:text-sm ${
                    active
                      ? 'text-white'
                      : 'text-[var(--z-secondary-text)] hover:text-[var(--z-charcoal)]'
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="product-track-pill"
                      className="absolute inset-0 rounded-xl bg-[var(--z-primary)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{track.category}</span>
                </button>
              );
            })}
          </div>

          {/* Editorial Curved Product Track Preview */}
          <div className="mt-6 overflow-hidden rounded-tl-[48px] rounded-tr-[24px] rounded-br-[48px] rounded-bl-[24px] border border-[var(--z-border)] bg-[var(--z-surface)]/95 shadow-[0_24px_48px_-20px_rgba(23,33,43,0.12)]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTrack.id}
                initial={prefersReduced ? undefined : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReduced ? undefined : { opacity: 0, y: -10 }}
                transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 items-center gap-8 p-6 sm:p-10 lg:grid-cols-12"
              >
                <div className="flex flex-col justify-between lg:col-span-6">
                  <div>
                    <p className="text-xs font-semibold text-[var(--z-primary)]">
                      {activeTrack.category}
                    </p>
                    <h3 className="mt-2 text-2xl font-bold text-[var(--z-charcoal)] sm:text-3xl">
                      {activeTrack.title}
                    </h3>
                    <p className="mt-4 text-base leading-relaxed text-[var(--z-secondary-text)]">
                      {activeTrack.summary}
                    </p>
                    <ul className="mt-6 space-y-3 border-t border-[var(--z-border)] pt-6">
                      {activeTrack.capabilities.map((cap) => (
                        <li
                          key={cap}
                          className="flex items-start gap-2.5 text-sm font-medium text-[var(--z-charcoal)]"
                        >
                          <CheckCircle2
                            className="mt-0.5 h-4 w-4 shrink-0 text-[var(--z-primary)]"
                            aria-hidden="true"
                          />
                          <span>{cap}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <Button to="/products" withArrow>
                      View Product Platform Roadmap
                    </Button>
                    <Button to="/contact" variant="secondary">
                      Request Pilot Access
                    </Button>
                  </div>
                </div>

                {/* Non-square asymmetric curved photo with soft edge blend */}
                <div className="relative lg:col-span-6">
                  <div className="relative aspect-[16/11] overflow-hidden rounded-tl-[84px] rounded-tr-[24px] rounded-br-[84px] rounded-bl-[24px] shadow-[0_20px_44px_-16px_rgba(7,91,80,0.2)]">
                    <SafeImage
                      src={activeTrack.image}
                      alt={activeTrack.imageAlt}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#06443C]/20 via-transparent to-transparent"
                    />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </RevealOnScroll>
      )}
    </SectionWrapper>
  );
};

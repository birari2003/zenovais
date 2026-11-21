import React from 'react';
import { Button } from '../common/Button';
import { SafeImage } from '../common/SafeImage';
import { MagneticHover, RevealOnScroll } from '../animation/MotionPrimitives';
import { OrbitalArcsOverlay } from '../common/ArchitecturalMedia';
import { ZenovaisAmbientLattice3D } from '../three/ZenovaisAmbientLattice3D';
import { siteImages } from '../../data/assets';

interface CTASectionProps {
  title: string;
  description: string;
  ctaLabel: string;
  ctaTo: string;
  image?: string;
  imageAlt?: string;
}

export const CTASection: React.FC<CTASectionProps> = ({
  title,
  description,
  ctaLabel,
  ctaTo,
  image = siteImages.executiveBoardroom,
  imageAlt = 'Modern executive technology boardroom',
}) => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-[1320px] px-5 sm:px-8 lg:px-12">
        <RevealOnScroll>
          <div className="relative overflow-hidden rounded-tl-[44px] rounded-tr-[24px] rounded-br-[44px] rounded-bl-[24px] bg-[var(--z-primary-dark)] text-white shadow-[0_28px_64px_-20px_rgba(6,68,60,0.48)]">
            {/* Feathered background photography */}
            <div className="absolute inset-0">
              <SafeImage
                src={image}
                alt={imageAlt}
                className="h-full w-full object-cover opacity-30"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-r from-[#06443C] via-[#06443C]/90 to-[#075B50]/75"
              />
            </div>

            {/* Interactive Three.js 3D Ambient Lattice + Orbital SVG Arcs */}
            <ZenovaisAmbientLattice3D
              variant="dark"
              className="absolute inset-0 h-full w-full opacity-65"
            />
            <OrbitalArcsOverlay
              variant="dark"
              className="absolute inset-0 h-full w-full opacity-55"
            />

            <div className="relative z-10 flex flex-col items-start justify-between gap-8 px-7 py-12 sm:px-12 sm:py-16 lg:flex-row lg:items-center lg:px-16">
              <div className="max-w-2xl">
                <h2
                  className="font-bold tracking-tight text-white"
                  style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', lineHeight: 1.15 }}
                >
                  {title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-[var(--z-sage)] sm:text-[17px]">
                  {description}
                </p>
              </div>
              <div className="shrink-0">
                <MagneticHover>
                  <Button to={ctaTo} variant="inverted" size="lg" withArrow>
                    {ctaLabel}
                  </Button>
                </MagneticHover>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};

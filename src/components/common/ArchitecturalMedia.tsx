import React, { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react';
import { SafeImage } from './SafeImage';

/**
 * Subtle sweeping architectural concentric rings & orbital arcs (matching screenshots 2, 6, 7, 8).
 */
export const OrbitalArcsOverlay: React.FC<{
  variant?: 'light' | 'dark';
  className?: string;
}> = ({ variant = 'light', className = '' }) => {
  const prefersReduced = useReducedMotion();
  const stroke = variant === 'dark' ? 'rgba(220, 233, 227, 0.14)' : 'rgba(7, 91, 80, 0.11)';
  const accentStroke = variant === 'dark' ? 'rgba(220, 233, 227, 0.35)' : 'rgba(7, 91, 80, 0.28)';

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 720"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none select-none ${className}`}
    >
      <circle cx="960" cy="360" r="240" stroke={stroke} strokeWidth="1.2" />
      <circle cx="960" cy="360" r="360" stroke={stroke} strokeWidth="1" />
      <circle cx="960" cy="360" r="490" stroke={stroke} strokeWidth="1" strokeDasharray="6 10" />
      {!prefersReduced && (
        <motion.circle
          cx="960"
          cy="360"
          r="360"
          stroke={accentStroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray="110 1800"
          animate={{ rotate: 360 }}
          transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
          style={{ originX: '960px', originY: '360px' }}
        />
      )}
    </svg>
  );
};

/**
 * Seamless feathered right-side photographic backdrop blending smoothly into section canvas
 * without hard rectangular card borders (inspired by screenshots 1, 3, 4, 5, 8).
 */
export const FeatheredSectionBackdrop: React.FC<{
  src: string;
  alt: string;
  bgColorVar?: string;
  align?: 'right' | 'left';
  loading?: 'eager' | 'lazy';
  opacityClass?: string;
}> = ({
  src,
  alt,
  bgColorVar = 'var(--z-bg)',
  align = 'right',
  loading = 'lazy',
  opacityClass = 'opacity-90',
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-22, 22]);
  const smoothY = useSpring(y, { stiffness: 100, damping: 24 });

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-y-0 ${
        align === 'right' ? 'right-0 w-full lg:w-[64%]' : 'left-0 w-full lg:w-[64%]'
      } overflow-hidden`}
    >
      <motion.div
        style={prefersReduced ? undefined : { y: smoothY, scale: 1.06 }}
        className="h-full w-full"
      >
        <SafeImage
          src={src}
          alt={alt}
          loading={loading}
          className={`h-full w-full object-cover ${opacityClass}`}
        />
      </motion.div>

      {/* Directional organic fade mask into the background canvas */}
      <div
        className="absolute inset-0"
        style={{
          background:
            align === 'right'
              ? `linear-gradient(90deg, ${bgColorVar} 0%, ${bgColorVar} 18%, color-mix(in srgb, ${bgColorVar} 76%, transparent) 44%, color-mix(in srgb, ${bgColorVar} 18%, transparent) 72%, transparent 100%)`
              : `linear-gradient(270deg, ${bgColorVar} 0%, ${bgColorVar} 18%, color-mix(in srgb, ${bgColorVar} 76%, transparent) 44%, color-mix(in srgb, ${bgColorVar} 18%, transparent) 72%, transparent 100%)`,
        }}
      />
      {/* Mobile readability scrim */}
      <div
        className="absolute inset-0 lg:hidden"
        style={{
          background: `linear-gradient(180deg, ${bgColorVar} 0%, color-mix(in srgb, ${bgColorVar} 82%, transparent) 45%, color-mix(in srgb, ${bgColorVar} 92%, transparent) 100%)`,
        }}
      />
    </div>
  );
};

/**
 * Sweeping curved architectural image mask with overlapping secondary accent inset
 * (inspired by screenshot 2 & multi-image mixed editorial layouts).
 */
export const MixedCurvedMediaComposition: React.FC<{
  primarySrc: string;
  primaryAlt: string;
  secondarySrc: string;
  secondaryAlt: string;
  secondaryCaption: string;
  flipped?: boolean;
}> = ({
  primarySrc,
  primaryAlt,
  secondarySrc,
  secondaryAlt,
  secondaryCaption,
  flipped = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const primaryY = useTransform(scrollYProgress, [0, 1], [-18, 18]);
  const secondaryY = useTransform(scrollYProgress, [0, 1], [26, -26]);
  const smoothPrimaryY = useSpring(primaryY, { stiffness: 110, damping: 24 });
  const smoothSecondaryY = useSpring(secondaryY, { stiffness: 110, damping: 24 });

  return (
    <div ref={containerRef} className="relative py-4">
      {/* Subtle orbital ring behind curved composition */}
      <svg
        aria-hidden="true"
        viewBox="0 0 500 500"
        fill="none"
        className="pointer-events-none absolute -top-10 -right-8 h-[420px] w-[420px] opacity-60"
      >
        <circle cx="250" cy="250" r="210" stroke="rgba(7, 91, 80, 0.14)" strokeWidth="1.2" />
        <circle
          cx="250"
          cy="250"
          r="242"
          stroke="rgba(7, 91, 80, 0.1)"
          strokeWidth="1"
          strokeDasharray="5 8"
        />
      </svg>

      {/* Primary Asymmetric Curved Arch Frame */}
      <motion.div
        initial={prefersReduced ? undefined : { opacity: 0, clipPath: 'inset(8% 0% 8% 8% round 40px)' }}
        whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className={`relative aspect-[4/3] overflow-hidden shadow-[0_28px_60px_-20px_rgba(23,33,43,0.18)] ${
          flipped
            ? 'rounded-tl-[28px] rounded-tr-[96px] rounded-br-[28px] rounded-bl-[72px]'
            : 'rounded-tl-[96px] rounded-tr-[28px] rounded-br-[72px] rounded-bl-[28px]'
        }`}
      >
        <motion.div
          style={prefersReduced ? undefined : { y: smoothPrimaryY, scale: 1.08 }}
          className="h-full w-full"
        >
          <SafeImage
            src={primarySrc}
            alt={primaryAlt}
            className="h-full w-full object-cover"
          />
        </motion.div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#06443C]/20 via-transparent to-transparent"
        />
      </motion.div>

      {/* Secondary Overlapping Counter-Parallax Architectural Inset */}
      <motion.div
        style={prefersReduced ? undefined : { y: smoothSecondaryY }}
        className={`relative z-20 -mt-16 w-[62%] sm:-mt-20 sm:w-[54%] ${
          flipped ? 'mr-auto ml-2 sm:ml-4' : 'mr-2 ml-auto sm:mr-4'
        }`}
      >
        <div className="overflow-hidden rounded-tl-[24px] rounded-tr-[56px] rounded-br-[24px] rounded-bl-[44px] border-4 border-[var(--z-surface)] bg-[var(--z-surface)] shadow-[0_24px_48px_-14px_rgba(7,91,80,0.22)]">
          <div className="aspect-[16/10] overflow-hidden">
            <SafeImage
              src={secondarySrc}
              alt={secondaryAlt}
              className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </div>
          <div className="flex items-center justify-between bg-[var(--z-surface)] px-4 py-2.5">
            <span className="text-xs font-semibold text-[var(--z-charcoal)]">
              {secondaryCaption}
            </span>
            <span className="h-1.5 w-6 rounded-full bg-[var(--z-primary)]/35" aria-hidden="true" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

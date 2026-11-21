import React, { useEffect, useRef, useState } from 'react';
import {
  motion,
  useAnimationFrame,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react';
import { colors } from '../../theme/colors';

const ARCHITECTURAL_EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
}

export const RevealOnScroll: React.FC<RevealProps> = ({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  distance = 24,
  duration = 0.65,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  const offset =
    direction === 'up'
      ? { y: distance, x: 0 }
      : direction === 'down'
      ? { y: -distance, x: 0 }
      : direction === 'left'
      ? { x: distance, y: 0 }
      : direction === 'right'
      ? { x: -distance, y: 0 }
      : { x: 0, y: 0 };

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration, delay, ease: ARCHITECTURAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

interface StaggerContainerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
}

export const StaggerContainer: React.FC<StaggerContainerProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  delayChildren = 0.05,
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 22, scale: 0.985 },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: { duration: 0.58, ease: ARCHITECTURAL_EASE },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Masked editorial headline line-by-line slide reveal.
 */
export const MaskedLineReveal: React.FC<{
  children: React.ReactNode;
  delay?: number;
  className?: string;
}> = ({ children, delay = 0, className = '' }) => {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <span className={`block ${className}`}>{children}</span>;
  }

  return (
    <span className={`block overflow-hidden ${className}`}>
      <motion.span
        className="block"
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.72, delay, ease: ARCHITECTURAL_EASE }}
      >
        {children}
      </motion.span>
    </span>
  );
};

/**
 * Interactive cursor-tracking spotlight + tactile 3D perspective tilt + emerald specular sheen.
 */
export const SpotlightCard: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}> = ({ children, className = '', onClick }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const mouseX = useMotionValue(-360);
  const mouseY = useMotionValue(-360);
  const rotateX = useSpring(0, { stiffness: 280, damping: 22 });
  const rotateY = useSpring(0, { stiffness: 280, damping: 22 });
  const scale = useSpring(1, { stiffness: 320, damping: 24 });

  const spotlight = useMotionTemplate`radial-gradient(380px circle at ${mouseX}px ${mouseY}px, rgba(7, 91, 80, 0.115), transparent 70%)`;
  const borderGlow = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(7, 91, 80, 0.22), transparent 65%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReduced || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    mouseX.set(x);
    mouseY.set(y);

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    rotateX.set(((y - centerY) / centerY) * -4.2);
    rotateY.set(((x - centerX) / centerX) * 4.2);
    scale.set(1.012);
  };

  const handleMouseLeave = () => {
    mouseX.set(-360);
    mouseY.set(-360);
    rotateX.set(0);
    rotateY.set(0);
    scale.set(1);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={
        prefersReduced
          ? undefined
          : {
              rotateX,
              rotateY,
              scale,
              transformPerspective: 1000,
              transformStyle: 'preserve-3d',
            }
      }
      whileHover={prefersReduced ? undefined : { y: -6 }}
      transition={{ duration: 0.24, ease: ARCHITECTURAL_EASE }}
      className={`group relative overflow-hidden rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] transition-[border-color,box-shadow] duration-300 hover:border-[#075B50]/45 hover:shadow-[0_24px_50px_-16px_rgba(7,91,80,0.18)] ${className}`}
    >
      {!prefersReduced && (
        <>
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: spotlight }}
          />
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[2px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{ background: borderGlow }}
          />
        </>
      )}
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
};

/**
 * Scroll-linked vertical depth parallax image frame.
 */
export const ParallaxImageFrame: React.FC<{
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}> = ({ children, className = '', intensity = 28 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-intensity, intensity]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 24 });

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      <motion.div
        style={prefersReduced ? undefined : { y: smoothY, scale: 1.07 }}
        className="h-full w-full"
      >
        {children}
      </motion.div>
    </div>
  );
};

/**
 * Ultra-thin top viewport reading progress hairline synced to scroll.
 */
export const ScrollProgressRule: React.FC = () => {
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 30,
    restDelta: 0.001,
  });

  if (prefersReduced) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed top-0 right-0 left-0 z-50 h-[2.5px] origin-left"
      style={{ scaleX, backgroundColor: colors.primary }}
    />
  );
};

/**
 * Architectural SVG circuit & vector grid animation (subtle forest-green hairlines, zero neon slop).
 */
export const NeuralTopologyCanvas: React.FC<{
  variant?: 'light' | 'dark';
  className?: string;
}> = ({ variant = 'light', className = '' }) => {
  const prefersReduced = useReducedMotion();
  const strokeMain = variant === 'dark' ? 'rgba(220, 233, 227, 0.16)' : 'rgba(7, 91, 80, 0.12)';
  const strokeSignal = variant === 'dark' ? 'rgba(220, 233, 227, 0.55)' : 'rgba(7, 91, 80, 0.42)';
  const nodeColor = variant === 'dark' ? 'rgba(220, 233, 227, 0.4)' : 'rgba(7, 91, 80, 0.35)';

  const paths = [
    'M 40 80 H 260 L 320 140 H 620 L 680 80 H 980',
    'M 0 220 H 190 L 250 160 H 510 L 570 220 H 860 L 920 160 H 1200',
    'M 120 360 H 380 L 440 300 H 740 L 800 360 H 1120',
    'M 260 80 V 280 L 320 340 V 440',
    'M 680 80 V 200 L 740 260 V 420',
  ];

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 440"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      className={`pointer-events-none select-none ${className}`}
    >
      {paths.map((d, idx) => (
        <g key={idx}>
          <path d={d} stroke={strokeMain} strokeWidth="1" />
          {!prefersReduced && (
            <motion.path
              d={d}
              stroke={strokeSignal}
              strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0.18, pathOffset: 0 }}
              animate={{ pathOffset: [0, 1] }}
              transition={{
                duration: 7 + idx * 1.4,
                repeat: Infinity,
                ease: 'linear',
                delay: idx * 0.6,
              }}
            />
          )}
        </g>
      ))}
      {[
        [260, 80],
        [680, 80],
        [510, 160],
        [740, 300],
        [320, 140],
      ].map(([cx, cy], idx) => (
        <circle key={idx} cx={cx} cy={cy} r="3" fill={nodeColor} />
      ))}
    </svg>
  );
};

/**
 * Animated numeric counter (renders tabular-nums; only mounted when verified numbers exist).
 */
export const AnimatedCounter: React.FC<{
  target: number;
  suffix?: string;
  duration?: number;
}> = ({ target, suffix = '', duration = 1.4 }) => {
  const prefersReduced = useReducedMotion();
  const [displayValue, setDisplayValue] = useState(prefersReduced ? target : 0);
  const [hasTriggered, setHasTriggered] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (prefersReduced || hasTriggered || !ref.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setHasTriggered(true);
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min((now - start) / (duration * 1000), 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplayValue(Math.round(target * eased));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          requestAnimationFrame(tick);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target, duration, prefersReduced, hasTriggered]);

  return (
    <span ref={ref} className="tabular-nums">
      {displayValue.toLocaleString()}
      {suffix}
    </span>
  );
};

/**
 * Page transition container for route switches.
 */
export const PageTransition: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) {
    return <>{children}</>;
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.28, ease: ARCHITECTURAL_EASE }}
    >
      {children}
    </motion.div>
  );
};

/**
 * Subtle magnetic cursor-follow wrapper for high-intent interactive elements.
 */
export const MagneticHover: React.FC<{
  children: React.ReactNode;
  className?: string;
  strength?: number;
}> = ({ children, className = '', strength = 0.22 }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const x = useSpring(0, { stiffness: 320, damping: 22 });
  const y = useSpring(0, { stiffness: 320, damping: 22 });

  const handleMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * strength);
    y.set(dy * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      style={prefersReduced ? undefined : { x, y }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
};

/**
 * Smooth directional clip-path reveal for non-rectangular editorial visuals.
 */
export const ClipMaskReveal: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
}> = ({ children, className = '', delay = 0 }) => {
  const prefersReduced = useReducedMotion();
  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, clipPath: 'inset(10% 4% 10% 4% round 32px)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0% round 28px)' }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.85, delay, ease: ARCHITECTURAL_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * Scroll-linked 3D depth scale & elevation glide as an element enters viewport focus.
 */
export const ScrollScaleParallax: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.96', 'start 0.35'],
  });

  const rawScale = useTransform(scrollYProgress, [0, 1], [0.945, 1]);
  const rawY = useTransform(scrollYProgress, [0, 1], [32, 0]);
  const rawRotateX = useTransform(scrollYProgress, [0, 1], [4, 0]);
  const scale = useSpring(rawScale, { stiffness: 150, damping: 24 });
  const y = useSpring(rawY, { stiffness: 150, damping: 24 });
  const rotateX = useSpring(rawRotateX, { stiffness: 150, damping: 24 });

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div ref={ref} style={{ perspective: '1200px' }} className={className}>
      <motion.div style={{ scale, y, rotateX, transformOrigin: 'top center' }}>
        {children}
      </motion.div>
    </div>
  );
};

interface MarqueeRibbonProps {
  items: readonly string[];
  direction: 1 | -1;
  baseVelocity: number;
  paused: boolean;
  variant: 'dark' | 'light';
  className?: string;
}

const MarqueeRibbon: React.FC<MarqueeRibbonProps> = ({
  items,
  direction,
  baseVelocity,
  paused,
  variant,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();
  const baseX = useMotionValue(direction === 1 ? -50 : 0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 260 });
  const velocityBoost = useTransform(smoothVelocity, [-1500, 0, 1500], [1.6, 0, 1.6]);

  useAnimationFrame((_, delta) => {
    if (prefersReduced || paused) return;
    const boost = Math.min(Math.abs(velocityBoost.get()), 1.4);
    const speed = baseVelocity + boost * 0.35;
    const step = direction * speed * (delta / 1000);

    let next = baseX.get() + step;
    if (next <= -50) next += 50;
    if (next >= 0) next -= 50;
    baseX.set(next);
  });

  const xTransform = useMotionTemplate`${baseX}%`;

  const isDark = variant === 'dark';

  return (
    <div
      className={`w-[116%] -ml-[8%] overflow-hidden border-y py-4 sm:py-5 ${
        isDark
          ? 'border-[#DCE9E3]/20 bg-[#06443C] text-white shadow-[0_18px_40px_-14px_rgba(6,68,60,0.42)]'
          : 'border-[var(--z-primary)]/25 bg-[#EAF2ED] text-[var(--z-charcoal)] shadow-[0_20px_44px_-16px_rgba(23,33,43,0.16)]'
      } ${className}`}
    >
      <motion.div
        style={prefersReduced ? undefined : { x: xTransform }}
        className="flex w-max items-center gap-9 whitespace-nowrap"
      >
        {[...items, ...items, ...items, ...items].map((label, idx) => (
          <div key={`${label}-${idx}`} className="inline-flex items-center gap-9">
            <span
              className={`font-mono text-sm font-semibold tracking-widest uppercase sm:text-[15px] ${
                isDark ? 'text-white/95' : 'text-[var(--z-charcoal)]'
              }`}
            >
              {label}
            </span>
            <span
              className={`h-2 w-2 rotate-45 ${
                isDark ? 'bg-[#8FD4C4]' : 'bg-[var(--z-primary)]'
              }`}
              aria-hidden="true"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

/**
 * Tall, parallel tilted dual-row capability marquee:
 * Both ribbons share the same -2.2deg diagonal tilt (parallel, non-crossing)
 * with opposite left-to-right / right-to-left slow motion.
 */
export const VelocityCapabilityTicker: React.FC<{
  items: readonly string[];
  secondaryItems?: readonly string[];
  baseVelocity?: number;
  className?: string;
}> = ({ items, secondaryItems, baseVelocity = 0.75, className = '' }) => {
  const [hovered, setHovered] = useState(false);
  const bottomItems = secondaryItems && secondaryItems.length > 0 ? secondaryItems : items;

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative overflow-hidden bg-[var(--z-bg)] py-12 sm:py-16 select-none ${className}`}
    >
      {/* Subtle side edge fades */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 z-30 w-12 bg-gradient-to-r from-[var(--z-bg)] to-transparent sm:w-20"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 z-30 w-12 bg-gradient-to-l from-[var(--z-bg)] to-transparent sm:w-20"
      />

      <div className="relative flex flex-col gap-3 -rotate-[2.2deg] sm:gap-4">
        {/* Row 1: Left-to-Right parallel tilted track */}
        <MarqueeRibbon
          items={items}
          direction={1}
          baseVelocity={baseVelocity}
          paused={hovered}
          variant="dark"
        />

        {/* Row 2: Right-to-Left parallel tilted track (same angle, no criss-cross) */}
        <MarqueeRibbon
          items={bottomItems}
          direction={-1}
          baseVelocity={baseVelocity}
          paused={hovered}
          variant="light"
        />
      </div>
    </div>
  );
};

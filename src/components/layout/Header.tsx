import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { headerConfig, navigationItems } from '../../data/navigation';
import { NavDropdownItem } from '../../types';
import { ZenovaisLogo } from '../common/ZenovaisLogo';
import { Button } from '../common/Button';
import { Icon } from '../common/Icon';
import { SafeImage } from '../common/SafeImage';
import { OrbitalArcsOverlay } from '../common/ArchitecturalMedia';

export const Header: React.FC = () => {
  const location = useLocation();
  const prefersReduced = useReducedMotion();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredSub, setHoveredSub] = useState<NavDropdownItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpenDropdown(null);
    setMobileOpen(false);
  }, [location.pathname, location.hash]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    const onClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('mousedown', onClickOutside);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

  const isActiveRoute = (to: string) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        scrolled
          ? 'border-b border-[var(--z-border)] bg-[var(--z-bg)]/95 shadow-[0_4px_20px_-10px_rgba(23,33,43,0.08)] backdrop-blur-md'
          : 'border-b border-[var(--z-border)]/70 bg-[var(--z-bg)]/90 backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[68px] max-w-[1360px] items-center justify-between gap-4 px-5 sm:px-8 xl:h-[76px] xl:px-10">
        {/* Zone 1: Brand Wordmark */}
        <Link
          to="/"
          aria-label="Zenovais Technologies Home"
          className="shrink-0 rounded-lg py-1 focus-visible:outline-2"
        >
          <ZenovaisLogo />
        </Link>

        {/* Zone 2: Desktop Single-Line Navigation */}
        <nav aria-label="Primary Navigation" className="hidden items-center gap-3.5 xl:flex 2xl:gap-5">
          {navigationItems.map((item) => {
            const active = isActiveRoute(item.to);
            const hasDropdown = Boolean(item.dropdown?.length);
            const isOpen = openDropdown === item.label;
            const activeSubItem =
              hasDropdown && item.dropdown
                ? item.dropdown.find((d) => d.to === hoveredSub?.to) ?? item.dropdown[0]
                : null;

            const openMenu = () => {
              if (!hasDropdown || !item.dropdown) return;
              setOpenDropdown(item.label);
              setHoveredSub(item.dropdown[0]);
            };

            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={openMenu}
                onMouseLeave={() => hasDropdown && setOpenDropdown(null)}
              >
                {hasDropdown ? (
                  <div className="flex items-center">
                    <Link
                      to={item.to}
                      className={`relative inline-flex items-center gap-1 whitespace-nowrap shrink-0 py-2 text-[13.5px] font-medium transition-colors ${
                        active
                          ? 'font-semibold text-[var(--z-charcoal)]'
                          : 'text-[var(--z-secondary-text)] hover:text-[var(--z-charcoal)]'
                      }`}
                    >
                      <span>{item.label}</span>
                      <button
                        type="button"
                        aria-label={`Toggle ${item.label} menu`}
                        aria-expanded={isOpen}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          if (isOpen) {
                            setOpenDropdown(null);
                          } else {
                            openMenu();
                          }
                        }}
                        className="inline-flex items-center justify-center rounded p-0.5 text-current"
                      >
                        <ChevronDown
                          className={`h-3.5 w-3.5 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 text-[var(--z-primary)]' : ''
                          }`}
                        />
                      </button>
                      {active && (
                        <motion.span
                          layoutId="nav-active-underline"
                          className="absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[var(--z-primary)]"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                        />
                      )}
                    </Link>
                  </div>
                ) : (
                  <Link
                    to={item.to}
                    className={`relative inline-flex items-center whitespace-nowrap shrink-0 py-2 text-[13.5px] font-medium transition-colors ${
                      active
                        ? 'font-semibold text-[var(--z-charcoal)]'
                        : 'text-[var(--z-secondary-text)] hover:text-[var(--z-charcoal)]'
                    }`}
                  >
                    <span>{item.label}</span>
                    {active && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute right-0 bottom-0 left-0 h-[2px] rounded-full bg-[var(--z-primary)]"
                        transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      />
                    )}
                  </Link>
                )}

                {/* Animated Interactive Architectural Mega-Dropdown */}
                <AnimatePresence>
                  {hasDropdown && isOpen && item.dropdown && activeSubItem && (
                    <motion.div
                      initial={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: 12, scale: 0.965, filter: 'blur(4px)' }
                      }
                      animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                      exit={
                        prefersReduced
                          ? { opacity: 0 }
                          : { opacity: 0, y: 8, scale: 0.975, filter: 'blur(3px)' }
                      }
                      transition={{ type: 'spring', stiffness: 360, damping: 28, mass: 0.85 }}
                      className={`absolute top-full z-50 w-[720px] max-w-[calc(100vw-2rem)] pt-2.5 ${
                        item.label === 'Industries' ? '-right-24' : '-left-28'
                      }`}
                    >
                      <div className="relative overflow-hidden rounded-tl-[24px] rounded-tr-[40px] rounded-br-[24px] rounded-bl-[40px] border border-[var(--z-border)] bg-[var(--z-surface)]/95 p-3 shadow-[0_32px_70px_-18px_rgba(6,68,60,0.22)] backdrop-blur-xl">
                        {/* Subtle Emerald Top Accent Line */}
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-x-8 top-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--z-primary)]/45 to-transparent"
                        />

                        <div className="grid grid-cols-12 gap-3">
                          {/* Left 7 Cols: Interactive Capability Rows with Spring-Gliding Pill */}
                          <div className="col-span-7 flex flex-col justify-between p-1.5">
                            <div>
                              <div className="mb-2.5 flex items-center justify-between px-2.5">
                                <span className="inline-flex items-center gap-2 text-[11px] font-semibold tracking-wider text-[var(--z-primary)] uppercase">
                                  <span className="h-[1.5px] w-4 bg-[var(--z-primary)]" aria-hidden="true" />
                                  {item.dropdownTitle || item.label}
                                </span>
                                <span className="font-mono text-[11px] text-[var(--z-secondary-text)] tabular-nums">
                                  {String(item.dropdown.length).padStart(2, '0')} Tracks
                                </span>
                              </div>

                              <div className="space-y-1">
                                {item.dropdown.map((sub, idx) => {
                                  const isHovered = activeSubItem.to === sub.to;
                                  return (
                                    <motion.div
                                      key={sub.to}
                                      initial={prefersReduced ? undefined : { opacity: 0, x: -8 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      transition={{
                                        duration: 0.24,
                                        delay: prefersReduced ? 0 : idx * 0.032,
                                        ease: [0.16, 1, 0.3, 1],
                                      }}
                                    >
                                      <Link
                                        to={sub.to}
                                        onMouseEnter={() => setHoveredSub(sub)}
                                        onFocus={() => setHoveredSub(sub)}
                                        onClick={() => setOpenDropdown(null)}
                                        className="group relative flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors"
                                      >
                                        {isHovered && (
                                          <motion.span
                                            layoutId={`mega-hover-pill-${item.label}`}
                                            transition={{
                                              type: 'spring',
                                              stiffness: 440,
                                              damping: 32,
                                            }}
                                            className="absolute inset-0 rounded-xl border border-[var(--z-primary)]/15 bg-[var(--z-pale-green)]/90"
                                            aria-hidden="true"
                                          />
                                        )}

                                        <div
                                          className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ${
                                            isHovered
                                              ? 'scale-105 bg-[var(--z-primary)] text-white shadow-sm'
                                              : 'bg-[var(--z-bg)] text-[var(--z-primary)]'
                                          }`}
                                        >
                                          <Icon name={sub.icon} className="h-4 w-4" />
                                        </div>

                                        <div className="relative z-10 min-w-0 flex-1">
                                          <div className="flex items-center gap-2">
                                            <span
                                              className={`truncate text-[13.5px] font-semibold transition-colors ${
                                                isHovered
                                                  ? 'text-[var(--z-primary)]'
                                                  : 'text-[var(--z-charcoal)]'
                                              }`}
                                            >
                                              {sub.label}
                                            </span>
                                            {sub.tag && (
                                              <span
                                                className={`shrink-0 text-[10px] font-medium transition-colors ${
                                                  isHovered
                                                    ? 'text-[var(--z-primary)]/80'
                                                    : 'text-[var(--z-secondary-text)]/70'
                                                }`}
                                              >
                                                · {sub.tag}
                                              </span>
                                            )}
                                          </div>
                                          <p className="mt-0.5 line-clamp-1 text-[11.5px] text-[var(--z-secondary-text)]">
                                            {sub.description}
                                          </p>
                                        </div>

                                        <ArrowUpRight
                                          className={`relative z-10 h-4 w-4 shrink-0 transition-all duration-200 ${
                                            isHovered
                                              ? 'translate-x-0 translate-y-0 text-[var(--z-primary)] opacity-100'
                                              : '-translate-x-1 translate-y-1 text-[var(--z-secondary-text)] opacity-0'
                                          }`}
                                          aria-hidden="true"
                                        />
                                      </Link>
                                    </motion.div>
                                  );
                                })}
                              </div>
                            </div>

                            {/* Bottom Architectural Action Bar */}
                            <div className="mt-2.5 flex items-center justify-between border-t border-[var(--z-border)]/80 px-2.5 pt-2.5">
                              <Link
                                to={item.dropdownCtaTo || item.to}
                                onClick={() => setOpenDropdown(null)}
                                className="group inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--z-primary)] transition-colors hover:text-[var(--z-primary-dark)]"
                              >
                                <span>{item.dropdownCtaLabel || `Explore ${item.label}`}</span>
                                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
                              </Link>
                              <Link
                                to="/contact"
                                onClick={() => setOpenDropdown(null)}
                                className="text-xs font-medium text-[var(--z-secondary-text)] transition-colors hover:text-[var(--z-charcoal)]"
                              >
                                Discuss Architecture →
                              </Link>
                            </div>
                          </div>

                          {/* Right 5 Cols: Dark Emerald Dynamic Architectural Showcase */}
                          <div className="col-span-5">
                            <Link
                              to={activeSubItem.to}
                              onClick={() => setOpenDropdown(null)}
                              className="group relative flex h-full min-h-[310px] flex-col justify-between overflow-hidden rounded-tl-[20px] rounded-tr-[32px] rounded-br-[20px] rounded-bl-[32px] bg-[#06443C] p-4 text-white"
                            >
                              <OrbitalArcsOverlay
                                variant="dark"
                                className="absolute inset-0 h-full w-full opacity-50"
                              />

                              <AnimatePresence mode="wait">
                                <motion.div
                                  key={activeSubItem.to}
                                  initial={
                                    prefersReduced ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.98 }
                                  }
                                  animate={{ opacity: 1, y: 0, scale: 1 }}
                                  exit={
                                    prefersReduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.98 }
                                  }
                                  transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                                  className="relative z-10 flex h-full flex-col justify-between"
                                >
                                  <div>
                                    {activeSubItem.image && (
                                      <div className="relative h-[142px] w-full overflow-hidden rounded-tl-[28px] rounded-tr-[12px] rounded-br-[24px] rounded-bl-[12px] border border-white/15 bg-[#075B50]/40">
                                        <SafeImage
                                          src={activeSubItem.image}
                                          alt={activeSubItem.imageAlt || activeSubItem.label}
                                          loading="eager"
                                          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div
                                          aria-hidden="true"
                                          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06443C]/70 via-transparent to-transparent"
                                        />
                                        {activeSubItem.tag && (
                                          <span className="absolute bottom-2.5 left-3 font-mono text-[10px] font-semibold tracking-wider text-[var(--z-sage)] uppercase">
                                            {activeSubItem.tag}
                                          </span>
                                        )}
                                      </div>
                                    )}

                                    <h4 className="mt-4 text-base font-bold leading-snug text-white">
                                      {activeSubItem.label}
                                    </h4>
                                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--z-sage)]/90">
                                      {activeSubItem.description}
                                    </p>
                                  </div>

                                  <div className="mt-4 flex items-center justify-between border-t border-white/15 pt-3 text-xs font-semibold text-white">
                                    <span>Explore Capability</span>
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/15 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:bg-white group-hover:text-[#06443C]">
                                      <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                                    </span>
                                  </div>
                                </motion.div>
                              </AnimatePresence>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        {/* Zone 3: Primary Action + Mobile Trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="hidden sm:block">
            <Button to={headerConfig.ctaTo} size="sm" withArrow>
              {headerConfig.ctaLabel}
            </Button>
          </div>
          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--z-border)] bg-[var(--z-surface)] text-[var(--z-charcoal)] transition-colors hover:border-[var(--z-primary)] hover:text-[var(--z-primary)] xl:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={prefersReduced ? undefined : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'calc(100dvh - 68px)' }}
            exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-y-auto border-t border-[var(--z-border)] bg-[var(--z-surface)] xl:hidden"
          >
            <div className="mx-auto flex max-w-2xl flex-col gap-1 px-5 py-6">
              {navigationItems.map((item) => {
                const active = isActiveRoute(item.to);
                const hasDropdown = Boolean(item.dropdown?.length);
                const isSubOpen = mobileExpanded === item.label;

                return (
                  <div key={item.label} className="border-b border-[var(--z-border)]/70 py-1.5">
                    <div className="flex items-center justify-between">
                      <Link
                        to={item.to}
                        onClick={() => setMobileOpen(false)}
                        className={`flex-1 py-2.5 text-base font-medium ${
                          active ? 'font-semibold text-[var(--z-primary)]' : 'text-[var(--z-charcoal)]'
                        }`}
                      >
                        {item.label}
                      </Link>
                      {hasDropdown && (
                        <button
                          type="button"
                          aria-label={`Expand ${item.label}`}
                          aria-expanded={isSubOpen}
                          onClick={() => setMobileExpanded(isSubOpen ? null : item.label)}
                          className="flex h-10 w-10 items-center justify-center rounded-lg text-[var(--z-secondary-text)] hover:bg-[var(--z-pale-green)]"
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              isSubOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    <AnimatePresence initial={false}>
                      {hasDropdown && isSubOpen && item.dropdown && (
                        <motion.div
                          initial={prefersReduced ? undefined : { opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={prefersReduced ? undefined : { opacity: 0, height: 0 }}
                          transition={{ duration: 0.22 }}
                          className="overflow-hidden pl-3 pb-2"
                        >
                          {item.dropdown.map((sub) => (
                            <Link
                              key={sub.to}
                              to={sub.to}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm text-[var(--z-secondary-text)] hover:bg-[var(--z-pale-green)] hover:text-[var(--z-primary)]"
                            >
                              <Icon name={sub.icon} className="h-4 w-4 text-[var(--z-primary)]" />
                              <span>{sub.label}</span>
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}

              <div className="pt-6">
                <Button
                  to={headerConfig.ctaTo}
                  size="lg"
                  withArrow
                  className="w-full"
                  onClick={() => setMobileOpen(false)}
                >
                  {headerConfig.ctaLabel}
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

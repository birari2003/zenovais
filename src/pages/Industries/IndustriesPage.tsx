import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { industriesData, industriesPageMeta } from '../../data/industries';
import { servicesData } from '../../data/services';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Icon } from '../../components/common/Icon';
import { SafeImage } from '../../components/common/SafeImage';
import { Button } from '../../components/common/Button';
import { CTASection } from '../../components/sections/CTASection';
import { ParallaxImageFrame, RevealOnScroll } from '../../components/animation/MotionPrimitives';

export const IndustriesPage: React.FC = () => {
  useSEO({
    title: industriesPageMeta.seo.title,
    description: industriesPageMeta.seo.description,
    path: '/industries',
  });

  return (
    <>
      <PageHero
        kicker={industriesPageMeta.hero.kicker}
        title={industriesPageMeta.hero.title}
        titleHighlight={industriesPageMeta.hero.titleHighlight}
        description={industriesPageMeta.hero.description}
        breadcrumbs={[{ label: 'Industries' }]}
      />

      {/* Sector Jump Bar */}
      <section className="border-b border-[var(--z-border)] bg-[var(--z-surface)] py-5">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-2 px-5 sm:px-8 lg:px-12">
          {industriesData.map((ind) => (
            <a
              key={ind.slug}
              href={`#${ind.slug}`}
              className="rounded-lg border border-[var(--z-border)] bg-[var(--z-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--z-charcoal)] transition-colors hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]"
            >
              {ind.title}
            </a>
          ))}
        </div>
      </section>

      {industriesData.map((industry, idx) => {
        const relatedServices = servicesData.filter((s) =>
          industry.relatedServiceSlugs.includes(s.slug)
        );
        const isEven = idx % 2 === 0;

        return (
          <SectionWrapper
            key={industry.slug}
            id={industry.slug}
            background={isEven ? 'white' : 'warm'}
          >
            <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
              <div className={`lg:col-span-5 ${!isEven ? 'lg:order-2' : ''}`}>
                <RevealOnScroll>
                  <ParallaxImageFrame
                    className={`aspect-[4/3] border-2 border-[var(--z-surface)] shadow-[0_24px_48px_-18px_rgba(7,91,80,0.18)] ${
                      isEven
                        ? 'rounded-tl-[84px] rounded-tr-[24px] rounded-br-[72px] rounded-bl-[24px]'
                        : 'rounded-tl-[24px] rounded-tr-[84px] rounded-br-[24px] rounded-bl-[72px]'
                    }`}
                    intensity={18}
                  >
                    <SafeImage
                      src={industry.image}
                      alt={industry.imageAlt}
                      fallbackIcon={industry.icon}
                      fallbackTitle={industry.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </ParallaxImageFrame>
                </RevealOnScroll>
              </div>

              <div className={`lg:col-span-7 ${!isEven ? 'lg:order-1' : ''}`}>
                <RevealOnScroll>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                      <Icon name={industry.icon} className="h-5 w-5" />
                    </div>
                    <span className="font-mono text-xs font-semibold text-[var(--z-primary)] tabular-nums">
                      Sector {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--z-charcoal)] sm:text-3xl">
                    {industry.title}
                  </h2>
                  <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                    {industry.overview}
                  </p>

                  <div className="mt-6 grid grid-cols-1 gap-6 border-t border-[var(--z-border)] pt-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">
                        Common Industry Challenges
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {industry.challenges.map((ch) => (
                          <li
                            key={ch}
                            className="flex items-start gap-2 text-xs leading-relaxed text-[var(--z-secondary-text)] sm:text-sm"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--z-charcoal)]/40"
                              aria-hidden="true"
                            />
                            <span>{ch}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">
                        AI & Automation Opportunities
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {industry.aiOpportunities.map((opp) => (
                          <li
                            key={opp}
                            className="flex items-start gap-2 text-xs leading-relaxed text-[var(--z-charcoal)] sm:text-sm"
                          >
                            <CheckCircle2
                              className="mt-0.5 h-4 w-4 shrink-0 text-[var(--z-primary)]"
                              aria-hidden="true"
                            />
                            <span>{opp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-5">
                    <h4 className="text-xs font-semibold text-[var(--z-primary)]">
                      Possible Solution Applications
                    </h4>
                    <div className="mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-medium text-[var(--z-charcoal)]">
                      {industry.solutionApplications.map((app, i) => (
                        <span key={app} className="inline-flex items-center gap-2">
                          {i > 0 && <span aria-hidden="true">·</span>}
                          <span>{app}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button to="/contact" withArrow>
                      Discuss {industry.title}
                    </Button>
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        className="text-xs font-semibold text-[var(--z-secondary-text)] underline-offset-4 hover:text-[var(--z-primary)] hover:underline"
                      >
                        {srv.title}
                      </Link>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      <CTASection
        title="Transform Operations in Your Industry"
        description="Speak with Zenovais Technologies to evaluate AI opportunities tailored to your sector."
        ctaLabel="Contact Us"
        ctaTo="/contact"
      />
    </>
  );
};

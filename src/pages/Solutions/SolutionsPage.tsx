import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { solutionsData, solutionsPageMeta } from '../../data/solutions';
import { servicesData } from '../../data/services';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { SafeImage } from '../../components/common/SafeImage';
import { CTASection } from '../../components/sections/CTASection';
import { ParallaxImageFrame, RevealOnScroll } from '../../components/animation/MotionPrimitives';
import { Link } from 'react-router-dom';

export const SolutionsPage: React.FC = () => {
  useSEO({
    title: solutionsPageMeta.seo.title,
    description: solutionsPageMeta.seo.description,
    keywords: solutionsPageMeta.seo.keywords,
    path: '/ai-solutions',
  });

  return (
    <>
      <PageHero
        kicker={solutionsPageMeta.hero.kicker}
        title={solutionsPageMeta.hero.title}
        titleHighlight={solutionsPageMeta.hero.titleHighlight}
        description={solutionsPageMeta.hero.description}
        breadcrumbs={[{ label: 'AI Solutions' }]}
      />

      {/* Quick Anchor Index */}
      <section className="border-b border-[var(--z-border)] bg-[var(--z-surface)] py-5">
        <div className="mx-auto flex max-w-[1320px] flex-wrap items-center gap-2 px-5 sm:px-8 lg:px-12">
          {solutionsData.map((sol) => (
            <a
              key={sol.slug}
              href={`#${sol.slug}`}
              className="rounded-lg border border-[var(--z-border)] bg-[var(--z-bg)] px-3 py-1.5 text-xs font-semibold text-[var(--z-charcoal)] transition-colors hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]"
            >
              {sol.title}
            </a>
          ))}
        </div>
      </section>

      {/* Dedicated Detailed Solution Sections */}
      {solutionsData.map((solution, idx) => {
        const relatedServices = servicesData.filter((srv) =>
          solution.relatedServiceSlugs.includes(srv.slug)
        );
        const isEven = idx % 2 === 0;

        return (
          <SectionWrapper
            key={solution.slug}
            id={solution.slug}
            background={isEven ? 'white' : 'warm'}
          >
            <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
              <div className={`lg:col-span-7 ${!isEven ? 'lg:order-2' : ''}`}>
                <RevealOnScroll>
                  <div className="mb-3 inline-flex items-center gap-3 text-xs font-semibold text-[var(--z-primary)]">
                    <span className="font-mono tabular-nums">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span>{solution.kicker}</span>
                  </div>

                  <h2 className="text-2xl font-bold tracking-tight text-[var(--z-charcoal)] sm:text-3xl">
                    {solution.title}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-[var(--z-secondary-text)]">
                    {solution.overview}
                  </p>

                  <div className="mt-7 grid grid-cols-1 gap-6 border-t border-[var(--z-border)] pt-6 sm:grid-cols-2">
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">
                        What It Solves
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {solution.businessProblems.map((prob) => (
                          <li
                            key={prob}
                            className="flex items-start gap-2 text-xs leading-relaxed text-[var(--z-secondary-text)] sm:text-sm"
                          >
                            <span
                              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--z-primary)]"
                              aria-hidden="true"
                            />
                            <span>{prob}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">
                        Key Capabilities
                      </h3>
                      <ul className="mt-3 space-y-2">
                        {solution.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2 text-xs font-medium text-[var(--z-charcoal)] sm:text-sm"
                          >
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-[var(--z-primary)]"
                              aria-hidden="true"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl border border-[var(--z-border)] bg-[var(--z-pale-green)]/55 p-5">
                    <h4 className="text-xs font-semibold tracking-wide text-[var(--z-primary)]">
                      Zenovais Approach
                    </h4>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--z-charcoal)]/90">
                      {solution.zenovaisApproach}
                    </p>
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-4">
                    <Button to={`/ai-solutions/${solution.slug}`} withArrow>
                      Explore {solution.title}
                    </Button>
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        className="text-xs font-semibold text-[var(--z-secondary-text)] underline-offset-4 hover:text-[var(--z-primary)] hover:underline"
                      >
                        Related: {srv.title}
                      </Link>
                    ))}
                  </div>
                </RevealOnScroll>
              </div>

              <div className={`lg:col-span-5 ${!isEven ? 'lg:order-1' : ''}`}>
                <RevealOnScroll delay={0.1}>
                  <ParallaxImageFrame
                    className="aspect-[4/3] rounded-tl-[72px] rounded-tr-[24px] rounded-br-[64px] rounded-bl-[24px] border-2 border-[var(--z-surface)] shadow-[0_24px_48px_-18px_rgba(7,91,80,0.18)]"
                    intensity={16}
                  >
                    <SafeImage
                      src={solution.image}
                      alt={solution.imageAlt}
                      fallbackIcon={solution.icon}
                      fallbackTitle={solution.title}
                      className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                    />
                  </ParallaxImageFrame>

                  <div className="-mt-6 relative z-10 mx-3 rounded-tl-[24px] rounded-tr-[32px] rounded-br-[24px] rounded-bl-[24px] border border-[var(--z-border)] bg-[var(--z-surface)] p-5 shadow-md">
                    <div className="flex items-center gap-2.5 text-xs font-semibold text-[var(--z-primary)]">
                      <Icon name={solution.icon} className="h-4 w-4" />
                      <span>Practical Application Areas</span>
                    </div>
                    <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {solution.applicationAreas.map((area) => (
                        <li
                          key={area}
                          className="text-xs leading-snug text-[var(--z-secondary-text)]"
                        >
                          · {area}
                        </li>
                      ))}
                    </ul>
                  </div>
                </RevealOnScroll>
              </div>
            </div>
          </SectionWrapper>
        );
      })}

      <CTASection
        title="Ready to Architect Your AI Solution?"
        description="Discuss your operational goals and explore the right intelligence stack with Zenovais Technologies."
        ctaLabel="Consult With Us"
        ctaTo="/contact"
      />
    </>
  );
};

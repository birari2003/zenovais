import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { solutionsData } from '../../data/solutions';
import { servicesData } from '../../data/services';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';
import { CTASection } from '../../components/sections/CTASection';
import { RevealOnScroll, ScrollScaleParallax, SpotlightCard } from '../../components/animation/MotionPrimitives';
import { ZenovaisRoboticsArm3D } from '../../components/three/ZenovaisRoboticsArm3D';
import { ZenovaisNeuralCore3D } from '../../components/three/ZenovaisNeuralCore3D';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export const SolutionDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const solution = solutionsData.find((item) => item.slug === slug);

  useSEO({
    title: solution ? solution.title : 'Solution Not Found',
    description: solution
      ? solution.shortDescription
      : 'Explore Zenovais Technologies AI solutions.',
    keywords: solution
      ? [
          solution.title,
          solution.kicker,
          ...solution.capabilities.slice(0, 4),
          'Zenovais AI',
        ].join(', ')
      : undefined,
    path: `/ai-solutions/${slug ?? ''}`,
  });

  if (!solution) {
    return <NotFoundPage />;
  }

  const relatedServices = servicesData.filter((srv) =>
    solution.relatedServiceSlugs.includes(srv.slug)
  );
  const otherSolutions = solutionsData.filter((s) => s.slug !== solution.slug).slice(0, 3);

  return (
    <>
      <PageHero
        kicker={solution.kicker}
        title={solution.title}
        description={solution.shortDescription}
        breadcrumbs={[
          { label: 'AI Solutions', to: '/ai-solutions' },
          { label: solution.title },
        ]}
        image={solution.image}
        imageAlt={solution.imageAlt}
        actions={
          <>
            <Button to="/contact" withArrow>
              Discuss {solution.title}
            </Button>
            <Button to="/ai-solutions" variant="secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Solutions
            </Button>
          </>
        }
      />

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <RevealOnScroll>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">
                What This Technology Means
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                {solution.whatItMeans}
              </p>
              <p className="mt-4 text-base leading-relaxed text-[var(--z-secondary-text)]">
                {solution.overview}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.08}>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">
                Business Problems It Addresses
              </h2>
              <ul className="mt-4 space-y-3">
                {solution.businessProblems.map((problem) => (
                  <li
                    key={problem}
                    className="flex items-start gap-3 rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] p-4 text-sm text-[var(--z-charcoal)]"
                  >
                    <span
                      className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[var(--z-primary)]"
                      aria-hidden="true"
                    />
                    <span>{problem}</span>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={0.12}>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">
                How Zenovais Approaches It
              </h2>
              <div className="mt-4 rounded-2xl border border-[var(--z-border)] bg-[var(--z-pale-green)]/50 p-6">
                <p className="text-base leading-relaxed text-[var(--z-charcoal)]">
                  {solution.zenovaisApproach}
                </p>
              </div>
            </RevealOnScroll>

            <ScrollScaleParallax>
              <div className="overflow-hidden rounded-tl-[56px] rounded-tr-[24px] rounded-br-[56px] rounded-bl-[24px] border border-[var(--z-border)] bg-gradient-to-br from-[#FAFAF7] via-[#EAF2ED] to-[#DCE9E3] shadow-[0_24px_48px_-18px_rgba(7,91,80,0.2)]">
                <div className="flex items-center justify-between border-b border-[var(--z-border)]/80 bg-[var(--z-surface)]/90 px-6 py-3.5">
                  <div>
                    <p className="font-mono text-[11px] font-semibold tracking-wider text-[var(--z-primary)] uppercase">
                      Interactive 3D System Visualization
                    </p>
                    <p className="text-sm font-bold text-[var(--z-charcoal)]">
                      {solution.slug === 'robotics-intelligent-systems'
                        ? 'Articulated Robotics & Perception Twin'
                        : `${solution.title} — Conceptual 3D Model`}
                    </p>
                  </div>
                </div>
                <div className="h-[360px] w-full sm:h-[400px]">
                  {solution.slug === 'robotics-intelligent-systems' ? (
                    <ZenovaisRoboticsArm3D className="h-full w-full" />
                  ) : (
                    <ZenovaisNeuralCore3D className="h-full w-full" />
                  )}
                </div>
              </div>
            </ScrollScaleParallax>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            <SpotlightCard className="bg-[var(--z-bg)]/50">
              <div className="p-6">
                <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                  Core Capabilities
                </h3>
                <ul className="mt-4 space-y-2.5">
                  {solution.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-2.5 text-sm font-medium text-[var(--z-charcoal)]"
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
            </SpotlightCard>

            <SpotlightCard>
              <div className="p-6">
                <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                  Practical Application Areas
                </h3>
                <ul className="mt-4 space-y-2 text-sm text-[var(--z-secondary-text)]">
                  {solution.applicationAreas.map((area) => (
                    <li key={area}>· {area}</li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>

            {relatedServices.length > 0 && (
              <SpotlightCard>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                    Related Services
                  </h3>
                  <div className="mt-4 space-y-2.5">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        className="block rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] px-4 py-3 text-sm font-medium text-[var(--z-charcoal)] transition-colors hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]"
                      >
                        {srv.title}
                      </Link>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            )}
          </aside>
        </div>

        {/* Explore Other Solutions */}
        <div className="mt-16 border-t border-[var(--z-border)] pt-12">
          <h3 className="text-xl font-bold text-[var(--z-charcoal)]">
            Other AI Solutions
          </h3>
          <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-3">
            {otherSolutions.map((other) => (
              <Link
                key={other.slug}
                to={`/ai-solutions/${other.slug}`}
                className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)]/45 p-5 transition-colors hover:border-[var(--z-primary)]"
              >
                <p className="text-xs font-semibold text-[var(--z-primary)]">{other.kicker}</p>
                <h4 className="mt-1.5 text-base font-semibold text-[var(--z-charcoal)]">
                  {other.title}
                </h4>
                <p className="mt-2 line-clamp-2 text-xs text-[var(--z-secondary-text)]">
                  {other.shortDescription}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        title={`Explore ${solution.title} for Your Organization`}
        description="Speak with Zenovais engineering leadership to evaluate architecture, feasibility, and delivery timelines."
        ctaLabel="Get in Touch"
        ctaTo="/contact"
      />
    </>
  );
};

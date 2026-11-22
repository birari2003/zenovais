import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ChevronRight, Layers, Sparkles } from 'lucide-react';
import { industriesData } from '../../data/industries';
import { servicesData } from '../../data/services';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';
import { Icon } from '../../components/common/Icon';
import { SafeImage } from '../../components/common/SafeImage';
import { CTASection } from '../../components/sections/CTASection';
import {
  ParallaxImageFrame,
  RevealOnScroll,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export const IndustryDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industriesData.find((item) => item.slug === slug);

  useSEO({
    title: industry
      ? `${industry.title} AI Solutions | Zenovais Technologies`
      : 'Industry Not Found',
    description: industry
      ? industry.shortDescription
      : 'Explore industry-specific AI solutions from Zenovais Technologies.',
    keywords: industry
      ? [
          industry.title,
          `${industry.title} AI`,
          ...industry.solutionApplications,
          'industry artificial intelligence',
          'Zenovais Technologies',
        ].join(', ')
      : undefined,
    path: `/industries/${slug ?? ''}`,
  });

  if (!industry) {
    return <NotFoundPage />;
  }

  const relatedServices = servicesData.filter((srv) =>
    industry.relatedServiceSlugs.includes(srv.slug)
  );
  const otherIndustries = industriesData.filter((ind) => ind.slug !== industry.slug);

  return (
    <>
      <PageHero
        kicker="Industry Solutions · Domain Deployment"
        title={industry.title}
        description={industry.shortDescription}
        breadcrumbs={[
          { label: 'Industries', to: '/industries' },
          { label: industry.title },
        ]}
        image={industry.image}
        imageAlt={industry.imageAlt}
        actions={
          <>
            <Button to="/contact" withArrow>
              Discuss {industry.title}
            </Button>
            <Button to="/industries" variant="secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Industries
            </Button>
          </>
        }
      />

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {/* Main Content Column */}
          <div className="space-y-12 lg:col-span-8">
            {/* Overview & Strategic Value */}
            <RevealOnScroll>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                  <Icon name={industry.icon} className="h-5 w-5" />
                </div>
                <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--z-primary)]">
                  Sector Overview & Architecture
                </span>
              </div>
              <h2 className="mt-4 text-2xl font-bold tracking-tight text-[var(--z-charcoal)] sm:text-3xl">
                Intelligent Transformation for {industry.title}
              </h2>
              <p className="mt-4 text-base leading-relaxed text-[var(--z-secondary-text)] sm:text-lg">
                {industry.overview}
              </p>
            </RevealOnScroll>

            {/* Core Industry Challenges */}
            <RevealOnScroll delay={0.06}>
              <h3 className="text-xl font-bold text-[var(--z-charcoal)]">
                Key Operational Challenges in {industry.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--z-secondary-text)]">
                Critical bottlenecks and complex friction points organizations routinely navigate:
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {industry.challenges.map((challenge, idx) => (
                  <div
                    key={challenge}
                    className="flex flex-col justify-between rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)]/60 p-5 shadow-xs"
                  >
                    <div className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--z-charcoal)]/10 font-mono text-xs font-bold text-[var(--z-charcoal)]">
                        {idx + 1}
                      </span>
                      <p className="text-sm leading-relaxed text-[var(--z-charcoal)]">
                        {challenge}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </RevealOnScroll>

            {/* AI & Automation Opportunities */}
            <RevealOnScroll delay={0.1}>
              <div className="rounded-3xl border border-[var(--z-border)] bg-[var(--z-surface)] p-6 sm:p-8">
                <div className="flex items-center gap-2.5 text-xs font-semibold uppercase tracking-wider text-[var(--z-primary)]">
                  <Sparkles className="h-4 w-4" />
                  <span>Strategic High-Impact Opportunities</span>
                </div>
                <h3 className="mt-2 text-xl font-bold text-[var(--z-charcoal)]">
                  How AI & Intelligent Automation Accelerate Results
                </h3>
                <div className="mt-6 space-y-3.5">
                  {industry.aiOpportunities.map((opportunity) => (
                    <div
                      key={opportunity}
                      className="flex items-start gap-3 rounded-xl border border-[var(--z-border)]/80 bg-[var(--z-bg)] p-4 text-sm text-[var(--z-charcoal)]"
                    >
                      <CheckCircle2
                        className="mt-0.5 h-5 w-5 shrink-0 text-[var(--z-primary)]"
                        aria-hidden="true"
                      />
                      <span className="leading-relaxed font-medium">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </RevealOnScroll>

            {/* Solution Applications */}
            <RevealOnScroll delay={0.14}>
              <h3 className="text-xl font-bold text-[var(--z-charcoal)]">
                Production-Ready Solution Applications
              </h3>
              <p className="mt-2 text-sm text-[var(--z-secondary-text)]">
                Tailored systems and modular engineering tracks built specifically for {industry.title}:
              </p>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {industry.solutionApplications.map((app) => (
                  <SpotlightCard
                    key={app}
                    className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-5"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                      <Layers className="h-4 w-4" />
                    </div>
                    <h4 className="mt-3 text-sm font-bold text-[var(--z-charcoal)]">
                      {app}
                    </h4>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                      Engineered with sovereign data boundaries and deterministic system guardrails.
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </RevealOnScroll>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6 lg:col-span-4">
            {/* Sector Visual Snapshot Card */}
            <SpotlightCard className="overflow-hidden bg-[var(--z-surface)]">
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <SafeImage
                  src={industry.image}
                  alt={industry.imageAlt}
                  fallbackIcon={industry.icon}
                  fallbackTitle={industry.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 font-mono text-xs font-semibold text-[var(--z-primary)]">
                  <Icon name={industry.icon} className="h-4 w-4" />
                  <span>Domain Specification</span>
                </div>
                <h4 className="mt-2 text-base font-bold text-[var(--z-charcoal)]">
                  {industry.title}
                </h4>
                <p className="mt-2 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                  Full lifecycle architecture: data ingestion, custom reasoning pipelines, and enterprise systems integration.
                </p>
                <div className="mt-5 pt-4 border-t border-[var(--z-border)]">
                  <Button to="/contact" size="sm" withArrow className="w-full justify-center">
                    Initiate Advisory Call
                  </Button>
                </div>
              </div>
            </SpotlightCard>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <SpotlightCard>
                <div className="p-6">
                  <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                    Recommended Engineering Services
                  </h3>
                  <p className="mt-1 text-xs text-[var(--z-secondary-text)]">
                    Services tailored to support {industry.title} deployments:
                  </p>
                  <div className="mt-4 space-y-2.5">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.slug}
                        to={`/services/${srv.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] px-4 py-3 text-sm font-medium text-[var(--z-charcoal)] transition-colors hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]"
                      >
                        <span>{srv.title}</span>
                        <ChevronRight className="h-4 w-4 text-[var(--z-secondary-text)] transition-transform group-hover:translate-x-1 group-hover:text-[var(--z-primary)]" />
                      </Link>
                    ))}
                  </div>
                </div>
              </SpotlightCard>
            )}

            {/* Direct Consultation Box */}
            <div className="rounded-2xl border border-[var(--z-border)] bg-gradient-to-br from-[var(--z-pale-green)]/60 to-[var(--z-surface)] p-6">
              <h4 className="text-sm font-bold text-[var(--z-charcoal)]">
                Have specific requirements?
              </h4>
              <p className="mt-1.5 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                Our technology consultants and software engineers provide rapid feasibility assessments for enterprise deployments.
              </p>
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-[var(--z-primary)] hover:underline"
              >
                <span>Request Custom Assessment</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </aside>
        </div>

        {/* Explore Other Industries */}
        <div className="mt-16 border-t border-[var(--z-border)] pt-12">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-xl font-bold text-[var(--z-charcoal)]">
                Explore Other Industries
              </h3>
              <p className="mt-1 text-xs text-[var(--z-secondary-text)]">
                Discover how Zenovais delivers intelligent technology across other major sectors.
              </p>
            </div>
            <Link
              to="/industries"
              className="text-xs font-bold text-[var(--z-primary)] hover:underline inline-flex items-center gap-1"
            >
              <span>View All Sectors</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {otherIndustries.slice(0, 3).map((other) => (
              <Link
                key={other.slug}
                to={`/industries/${other.slug}`}
                className="group flex flex-col justify-between rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)]/50 p-5 transition-all hover:border-[var(--z-primary)] hover:shadow-md"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                      <Icon name={other.icon} className="h-4 w-4" />
                    </div>
                    <h4 className="text-sm font-bold text-[var(--z-charcoal)] group-hover:text-[var(--z-primary)]">
                      {other.title}
                    </h4>
                  </div>
                  <p className="mt-2.5 line-clamp-2 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                    {other.shortDescription}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[var(--z-primary)]">
                  <span>Explore Sector</span>
                  <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </SectionWrapper>

      <CTASection
        title={`Accelerate Your ${industry.title} Initiatives`}
        description="Connect with Zenovais Technologies to evaluate architectural opportunities tailored specifically to your sector."
        ctaLabel="Contact Advisory Team"
        ctaTo="/contact"
      />
    </>
  );
};

import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { servicesData } from '../../data/services';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';
import { CTASection } from '../../components/sections/CTASection';
import { SpotlightCard } from '../../components/animation/MotionPrimitives';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = servicesData.find((item) => item.slug === slug);

  useSEO({
    title: service ? service.title : 'Service Not Found',
    description: service ? service.shortDescription : 'Explore Zenovais Technologies services.',
    path: `/services/${slug ?? ''}`,
  });

  if (!service) {
    return <NotFoundPage />;
  }

  const otherServices = servicesData.filter((s) => s.slug !== service.slug).slice(0, 3);

  return (
    <>
      <PageHero
        kicker="Zenovais Services"
        title={service.title}
        description={service.shortDescription}
        breadcrumbs={[
          { label: 'Services', to: '/services' },
          { label: service.title },
        ]}
        actions={
          <>
            <Button to="/contact" withArrow>
              Request Engagement
            </Button>
            <Button to="/services" variant="secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Services
            </Button>
          </>
        }
      />

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">Service Overview</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                {service.overview}
              </p>
            </div>

            <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-pale-green)]/45 p-6">
              <h3 className="text-sm font-semibold text-[var(--z-primary)]">Ideal For</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--z-charcoal)]">
                {service.idealFor}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">Expected Deliverables</h2>
              <ul className="mt-4 space-y-3">
                {service.deliverables.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] p-4 text-sm text-[var(--z-charcoal)]"
                  >
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 shrink-0 text-[var(--z-primary)]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <SpotlightCard className="bg-[var(--z-bg)]/50">
              <div className="p-6 sm:p-7">
                <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                  Core Scope & Capabilities
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.capabilities.map((cap) => (
                    <li
                      key={cap}
                      className="flex items-center gap-2.5 text-sm font-medium text-[var(--z-charcoal)]"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--z-primary)]" aria-hidden="true" />
                      <span>{cap}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>

            <SpotlightCard>
              <div className="p-6 sm:p-7">
                <h3 className="text-base font-semibold text-[var(--z-charcoal)]">
                  Related Services
                </h3>
                <div className="mt-4 space-y-2.5">
                  {otherServices.map((other) => (
                    <Link
                      key={other.slug}
                      to={`/services/${other.slug}`}
                      className="block rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] p-3.5 transition-colors hover:border-[var(--z-primary)]"
                    >
                      <div className="text-sm font-semibold text-[var(--z-charcoal)]">
                        {other.title}
                      </div>
                      <p className="mt-1 line-clamp-1 text-xs text-[var(--z-secondary-text)]">
                        {other.shortDescription}
                      </p>
                    </Link>
                  ))}
                </div>
              </div>
            </SpotlightCard>
          </aside>
        </div>
      </SectionWrapper>

      <CTASection
        title={`Start a ${service.title} Initiative`}
        description="Connect with Zenovais Technologies to define scope, architecture, and execution timelines."
        ctaLabel="Get in Touch"
        ctaTo="/contact"
      />
    </>
  );
};

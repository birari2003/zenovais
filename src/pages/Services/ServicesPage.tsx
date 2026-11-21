import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { deliveryProcessSteps, servicesData, servicesPageMeta } from '../../data/services';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Icon } from '../../components/common/Icon';
import { WorkflowStepper } from '../../components/sections/WorkflowStepper';
import { CTASection } from '../../components/sections/CTASection';
import {
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';

export const ServicesPage: React.FC = () => {
  useSEO({
    title: servicesPageMeta.seo.title,
    description: servicesPageMeta.seo.description,
    path: '/services',
  });

  return (
    <>
      <PageHero
        kicker={servicesPageMeta.hero.kicker}
        title={servicesPageMeta.hero.title}
        titleHighlight={servicesPageMeta.hero.titleHighlight}
        description={servicesPageMeta.hero.description}
        breadcrumbs={[{ label: 'Services' }]}
        image={servicesPageMeta.hero.image}
        imageAlt={servicesPageMeta.hero.imageAlt}
      />

      {/* Service Offerings Grid */}
      <SectionWrapper background="white">
        <SectionHeading
          kicker="Core Capabilities"
          title="End-to-End Engineering & AI Services"
          subtitle="Structured technical partnerships covering strategy, full-stack systems, data infrastructure, automation, R&D, and product delivery."
        />

        <StaggerContainer className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2">
          {servicesData.map((service, idx) => (
            <StaggerItem key={service.slug}>
              <SpotlightCard className="h-full bg-[var(--z-bg)]/45">
                <div className="flex h-full flex-col justify-between p-7 sm:p-8">
                  <div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                        <Icon name={service.icon} className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs text-[var(--z-secondary-text)] tabular-nums">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                    </div>

                    <h3 className="mt-5 text-xl font-bold text-[var(--z-charcoal)]">
                      {service.title}
                    </h3>
                    <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                      {service.overview}
                    </p>

                    <div className="mt-6 border-t border-[var(--z-border)] pt-5">
                      <h4 className="text-xs font-semibold text-[var(--z-charcoal)]">
                        Key Capabilities
                      </h4>
                      <ul className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {service.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2 text-xs font-medium text-[var(--z-charcoal)]/85 sm:text-[13px]"
                          >
                            <CheckCircle2
                              className="h-3.5 w-3.5 shrink-0 text-[var(--z-primary)]"
                              aria-hidden="true"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-7 flex items-center justify-between border-t border-[var(--z-border)] pt-4">
                    <Link
                      to={`/services/${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]"
                    >
                      <span>View Service Details</span>
                      <ArrowRight
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Delivery Process */}
      <SectionWrapper background="warm">
        <SectionHeading
          kicker="Our Delivery Process"
          title="Seven Disciplined Stages to Production"
          subtitle="A transparent engineering lifecycle designed to move complex AI and software initiatives from discovery to sustained optimization."
        />
        <WorkflowStepper steps={deliveryProcessSteps} />
      </SectionWrapper>

      <CTASection
        title="Ready to Build, Automate, or Scale?"
        description="Share your engineering objectives with Zenovais Technologies and explore a tailored delivery roadmap."
        ctaLabel="Schedule Consultation"
        ctaTo="/contact"
      />
    </>
  );
};

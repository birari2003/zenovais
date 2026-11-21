import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import {
  applicationProcessSteps,
  careersPageMeta,
  jobOpenings,
  opportunityAreas,
  whyZenovais,
} from '../../data/careers';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { Icon } from '../../components/common/Icon';
import { JobCard } from '../../components/cards/JobCard';
import { WorkflowStepper } from '../../components/sections/WorkflowStepper';
import { TalentCommunityForm } from '../../components/forms/TalentCommunityForm';
import {
  RevealOnScroll,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';
import { siteImages } from '../../data/assets';

export const CareersPage: React.FC = () => {
  useSEO({
    title: careersPageMeta.seo.title,
    description: careersPageMeta.seo.description,
    path: '/careers',
  });

  return (
    <>
      <PageHero
        kicker={careersPageMeta.hero.kicker}
        title={careersPageMeta.hero.title}
        titleHighlight={careersPageMeta.hero.titleHighlight}
        description={careersPageMeta.hero.description}
        breadcrumbs={[{ label: 'Careers' }]}
        image={siteImages.servicesTeam}
        imageAlt="Zenovais engineering and product team collaborating in modern studio"
      />

      {/* Why Work With Zenovais & Culture */}
      <SectionWrapper background="white">
        <SectionHeading
          kicker="Why Zenovais"
          title="Engineering Craft, Curiosity, and Ownership"
          subtitle="Our work culture values deep technical thinking, direct collaboration, and building systems that genuinely matter."
        />

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {whyZenovais.map((item) => (
            <StaggerItem key={item.title}>
              <SpotlightCard className="h-full bg-[var(--z-bg)]/45">
                <div className="p-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                    <Icon name={item.icon} className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[var(--z-charcoal)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                    {item.description}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Areas of Opportunity */}
      <SectionWrapper background="warm">
        <SectionHeading
          kicker="Disciplines"
          title="Areas of Opportunity"
          subtitle="Key technical and strategic functions across Zenovais Technologies."
        />

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {opportunityAreas.map((area, idx) => (
            <StaggerItem key={area.title}>
              <SpotlightCard className="h-full">
                <div className="p-6">
                  <span className="font-mono text-xs text-[var(--z-primary)] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold text-[var(--z-charcoal)]">
                    {area.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                    {area.description}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Current Openings */}
      <SectionWrapper background="white">
        <SectionHeading
          kicker="Open Roles"
          title="Current Openings"
          subtitle="Published roles across engineering, design, research, and partnerships."
        />

        {jobOpenings.length > 0 ? (
          <div className="mt-10 space-y-4">
            {jobOpenings.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        ) : (
          <RevealOnScroll className="mt-10">
            <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-8 sm:p-10">
              <h3 className="text-lg font-bold text-[var(--z-charcoal)]">
                No Active Public Vacancies Listed Right Now
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--z-secondary-text)]">
                We do not maintain speculative placeholder listings. When specific roles open, they
                appear here immediately. If you are passionate about AI engineering, software
                architecture, or product design, you are welcome to introduce yourself via our talent
                community form below.
              </p>
            </div>
          </RevealOnScroll>
        )}
      </SectionWrapper>

      {/* Application Process */}
      <SectionWrapper background="pale">
        <SectionHeading
          kicker="Application Process"
          title="How We Evaluate and Connect"
          subtitle="A clear, respectful process focused on mutual technical alignment."
        />
        <WorkflowStepper steps={applicationProcessSteps} />
      </SectionWrapper>

      {/* Talent Community Form */}
      <SectionWrapper background="warm">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="Talent Community"
              title="Submit a General Enquiry"
              subtitle="Share your background and portfolio so we can reach out as new engineering and product initiatives open."
            />
          </div>
          <div className="lg:col-span-7">
            <TalentCommunityForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

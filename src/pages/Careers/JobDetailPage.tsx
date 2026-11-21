import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { jobOpenings } from '../../data/careers';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';
import { TalentCommunityForm } from '../../components/forms/TalentCommunityForm';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export const JobDetailPage: React.FC = () => {
  const { jobId } = useParams<{ jobId: string }>();
  const job = jobOpenings.find((j) => j.id === jobId);

  useSEO({
    title: job ? job.title : 'Role Not Found',
    description: job ? job.description : 'Explore careers at Zenovais Technologies.',
    path: `/careers/${jobId ?? ''}`,
  });

  if (!job) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHero
        kicker={`${job.department} · ${job.location}`}
        title={job.title}
        description={job.description}
        breadcrumbs={[
          { label: 'Careers', to: '/careers' },
          { label: job.title },
        ]}
        actions={
          <Button to="/careers" variant="secondary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to Careers
          </Button>
        }
      />

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-8 lg:col-span-7">
            <div>
              <h2 className="text-xl font-bold text-[var(--z-charcoal)]">Responsibilities</h2>
              <ul className="mt-4 space-y-2.5">
                {job.responsibilities.map((res) => (
                  <li key={res} className="flex items-start gap-2.5 text-sm text-[var(--z-secondary-text)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--z-primary)]" />
                    <span>{res}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-[var(--z-charcoal)]">Required Skills</h2>
              <ul className="mt-4 space-y-2.5">
                {job.requiredSkills.map((skill) => (
                  <li key={skill} className="flex items-start gap-2.5 text-sm text-[var(--z-charcoal)]">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--z-primary)]" />
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="lg:col-span-5">
            <h3 className="mb-4 text-lg font-bold text-[var(--z-charcoal)]">Apply for This Role</h3>
            <TalentCommunityForm />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

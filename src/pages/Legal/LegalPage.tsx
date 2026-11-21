import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';

interface LegalPageProps {
  type: 'privacy' | 'terms';
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const isPrivacy = type === 'privacy';
  const title = isPrivacy ? 'Privacy Policy' : 'Terms of Service';

  useSEO({
    title,
    description: `${title} for Zenovais Technologies (zenovais.com).`,
    path: isPrivacy ? '/privacy-policy' : '/terms-of-service',
  });

  return (
    <>
      <PageHero
        kicker="Legal & Governance"
        title={title}
        description={
          isPrivacy
            ? 'How Zenovais Technologies collects, validates, and safeguards information submitted through zenovais.com.'
            : 'Terms governing access to and use of the Zenovais Technologies corporate website.'
        }
        breadcrumbs={[{ label: title }]}
      />

      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl space-y-8 text-sm leading-relaxed text-[var(--z-secondary-text)] sm:text-base">
          {isPrivacy ? (
            <>
              <section>
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  1. Information We Collect
                </h2>
                <p className="mt-2">
                  When you submit a business enquiry, newsletter subscription, or general talent
                  profile through zenovais.com, we collect only the fields you explicitly provide
                  (such as your name, business email address, organization, and message).
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  2. Purpose of Processing
                </h2>
                <p className="mt-2">
                  Submitted contact details are used exclusively to respond to your requested
                  consultation, partnership enquiry, or update subscription. We do not sell or
                  broker visitor contact information.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  3. Security & Data Minimization
                </h2>
                <p className="mt-2">
                  All form inputs undergo strict sanitization and server-side validation. Access to
                  submitted enquiries is restricted to authorized Zenovais leadership and
                  relevant technical personnel.
                </p>
              </section>
            </>
          ) : (
            <>
              <section>
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  1. Informational Purpose
                </h2>
                <p className="mt-2">
                  Content presented on zenovais.com provides an overview of Zenovais Technologies,
                  our capabilities, services, and technical perspectives. Specific commercial
                  deliverables are governed by dedicated written agreements.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  2. Intellectual Property
                </h2>
                <p className="mt-2">
                  The Zenovais name, visual mark, editorial copy, and architectural materials
                  published on this site are owned by Zenovais Technologies and may not be
                  reproduced commercially without prior permission.
                </p>
              </section>
              <section>
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  3. Acceptable Use
                </h2>
                <p className="mt-2">
                  Automated scraping, abusive form submissions, or attempts to disrupt service
                  availability on zenovais.com are strictly prohibited.
                </p>
              </section>
            </>
          )}
        </div>
      </SectionWrapper>
    </>
  );
};

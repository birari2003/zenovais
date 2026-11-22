import React from 'react';
import { Globe, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { contactFaqs, contactInfoConfig, contactPageMeta } from '../../data/contact';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ContactForm } from '../../components/forms/ContactForm';
import { Accordion } from '../../components/common/Accordion';
import { RevealOnScroll } from '../../components/animation/MotionPrimitives';

export const ContactPage: React.FC = () => {
  useSEO({
    title: contactPageMeta.seo.title,
    description: contactPageMeta.seo.description,
    keywords: contactPageMeta.seo.keywords,
    path: '/contact',
  });

  return (
    <>
      <PageHero
        kicker={contactPageMeta.hero.kicker}
        title={contactPageMeta.hero.title}
        titleHighlight={contactPageMeta.hero.titleHighlight}
        description={contactPageMeta.hero.description}
        breadcrumbs={[{ label: 'Contact Us' }]}
      />

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <ContactForm />
          </div>

          <aside className="space-y-6 lg:col-span-5">
            <RevealOnScroll>
              <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-6 sm:p-8">
                <h2 className="text-lg font-bold text-[var(--z-charcoal)]">
                  Business Enquiry Information
                </h2>
                <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                  {contactInfoConfig.responseCommitment}
                </p>

                <div className="mt-6 space-y-4 border-t border-[var(--z-border)] pt-6">
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                      <Globe className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--z-secondary-text)]">
                        Official Website
                      </div>
                      <div className="text-sm font-semibold text-[var(--z-charcoal)]">
                        {contactInfoConfig.website}
                      </div>
                    </div>
                  </div>

                  {contactInfoConfig.businessEmail && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--z-secondary-text)]">
                          Business Email
                        </div>
                        <a
                          href={`mailto:${contactInfoConfig.businessEmail}`}
                          className="text-sm font-semibold text-[var(--z-primary)] hover:underline"
                        >
                          {contactInfoConfig.businessEmail}
                        </a>
                      </div>
                    </div>
                  )}

                  {contactInfoConfig.officeLocation && (
                    <div className="flex items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                        <MapPin className="h-4 w-4" aria-hidden="true" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[var(--z-secondary-text)]">
                          Office Location
                        </div>
                        <div className="text-sm font-medium text-[var(--z-charcoal)]">
                          {contactInfoConfig.officeLocation}
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--z-pale-green)] text-[var(--z-primary)]">
                      <ShieldCheck className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--z-secondary-text)]">
                        Submission Security
                      </div>
                      <div className="text-xs leading-relaxed text-[var(--z-secondary-text)]">
                        Protected by input sanitization, automated spam traps, and server-side
                        verification.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          </aside>
        </div>
      </SectionWrapper>

      {/* FAQ Section */}
      <SectionWrapper background="warm">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              kicker="Frequently Asked Questions"
              title="Engagement & Architecture Clarity"
              subtitle="Answers to common questions about starting a project or technical discovery with Zenovais."
            />
          </div>
          <div className="lg:col-span-7">
            <Accordion items={contactFaqs} />
          </div>
        </div>
      </SectionWrapper>
    </>
  );
};

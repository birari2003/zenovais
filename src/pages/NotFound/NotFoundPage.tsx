import React from 'react';
import { useSEO } from '../../hooks/useSEO';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';

export const NotFoundPage: React.FC = () => {
  useSEO({
    title: 'Page Not Found',
    description: 'The requested page could not be found on Zenovais Technologies.',
  });

  return (
    <SectionWrapper background="warm" className="py-24 sm:py-32">
      <div className="mx-auto max-w-xl text-center">
        <span className="font-mono text-sm font-semibold text-[var(--z-primary)]">404</span>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-[var(--z-charcoal)] sm:text-4xl">
          Page Not Found
        </h1>
        <p className="mt-4 text-base text-[var(--z-secondary-text)]">
          The page or resource you requested does not exist or may have moved.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button to="/" withArrow>
            Return Home
          </Button>
          <Button to="/contact" variant="secondary">
            Contact Support
          </Button>
        </div>
      </div>
    </SectionWrapper>
  );
};

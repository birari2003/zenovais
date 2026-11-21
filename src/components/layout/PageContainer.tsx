import React from 'react';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, className = '' }) => {
  return (
    <div className={`mx-auto w-full max-w-[1320px] px-5 sm:px-8 lg:px-12 ${className}`}>
      {children}
    </div>
  );
};

interface SectionWrapperProps {
  children: React.ReactNode;
  id?: string;
  background?: 'warm' | 'white' | 'pale' | 'dark';
  compact?: boolean;
  className?: string;
}

const bgMap = {
  warm: 'bg-[var(--z-bg)]',
  white: 'bg-[var(--z-surface)]',
  pale: 'bg-[var(--z-pale-green)]',
  dark: 'bg-[var(--z-primary-dark)] text-white',
};

export const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  id,
  background = 'warm',
  compact = false,
  className = '',
}) => {
  return (
    <section
      id={id}
      className={`${bgMap[background]} ${
        compact ? 'py-12 sm:py-16 lg:py-20' : 'py-16 sm:py-20 lg:py-24'
      } ${className}`}
    >
      <PageContainer>{children}</PageContainer>
    </section>
  );
};

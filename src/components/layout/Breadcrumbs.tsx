import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface Crumb {
  label: string;
  to?: string;
}

export const Breadcrumbs: React.FC<{ items: Crumb[]; className?: string }> = ({
  items,
  className = '',
}) => {
  return (
    <nav aria-label="Breadcrumb" className={`mb-6 flex flex-wrap items-center gap-1.5 text-xs font-medium text-[var(--z-secondary-text)] ${className}`}>
      <Link to="/" className="transition-colors hover:text-[var(--z-primary)]">
        Home
      </Link>
      {items.map((item, idx) => (
        <React.Fragment key={item.label}>
          <ChevronRight className="h-3.5 w-3.5 text-[var(--z-secondary-text)]/60" aria-hidden="true" />
          {item.to && idx < items.length - 1 ? (
            <Link to={item.to} className="transition-colors hover:text-[var(--z-primary)]">
              {item.label}
            </Link>
          ) : (
            <span className="text-[var(--z-charcoal)]" aria-current="page">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

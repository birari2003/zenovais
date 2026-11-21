import React, { useState } from 'react';
import { Icon } from './Icon';
import { IconName } from '../../types';

interface SafeImageProps {
  src: string;
  alt: string;
  className?: string;
  fallbackIcon?: IconName;
  fallbackTitle?: string;
  loading?: 'eager' | 'lazy';
}

export const SafeImage: React.FC<SafeImageProps> = ({
  src,
  alt,
  className = 'h-full w-full object-cover',
  fallbackIcon = 'Cpu',
  fallbackTitle,
  loading = 'lazy',
}) => {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-3 bg-gradient-to-br from-[var(--z-pale-green)] to-[var(--z-sage)] p-6 text-center text-[var(--z-primary)]"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/80 shadow-sm">
          <Icon name={fallbackIcon} className="h-6 w-6" />
        </div>
        {fallbackTitle && (
          <span className="text-sm font-semibold text-[var(--z-charcoal)]">{fallbackTitle}</span>
        )}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading={loading}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
};

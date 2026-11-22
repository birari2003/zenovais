import React from 'react';

interface ZenovaisLogoProps {
  className?: string;
  imageClassName?: string;
  variant?: 'default' | 'light';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  priority?: boolean;
}

const sizeClasses = {
  sm: 'h-10 sm:h-11 max-w-[220px]',
  md: 'h-12 sm:h-[52px] xl:h-[60px] max-w-[260px]',
  lg: 'h-14 sm:h-16 xl:h-[72px] max-w-[320px]',
  xl: 'h-16 sm:h-20 xl:h-[88px] max-w-[380px]',
};

export const ZenovaisLogo: React.FC<ZenovaisLogoProps> = ({
  className = '',
  imageClassName = '',
  variant = 'default',
  size = 'md',
  priority = true,
}) => {
  const filterClass = variant === 'light' ? 'brightness-0 invert' : '';
  const chosenSizeClass = sizeClasses[size] || sizeClasses.md;

  return (
    <span className={`inline-flex items-center shrink-0 select-none ${className}`}>
      <img
        src="/logo.png"
        alt="Zenovais Technologies"
        className={`w-auto object-contain transition-transform duration-200 ${chosenSizeClass} ${filterClass} ${imageClassName}`}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
      />
    </span>
  );
};

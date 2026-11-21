import React from 'react';

interface ZenovaisLogoProps {
  className?: string;
  variant?: 'default' | 'light';
}

export const ZenovaisLogo: React.FC<ZenovaisLogoProps> = ({
  className = '',
  variant = 'default',
}) => {
  const textColor = variant === 'light' ? 'text-white' : 'text-[#17212B]';

  return (
    <span className={`inline-flex items-center gap-2.5 whitespace-nowrap shrink-0 ${className}`}>
      <svg
        width="30"
        height="30"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="shrink-0"
      >
        <path
          d="M5 7.5C5 6.67157 5.67157 6 6.5 6H29.5C30.8058 6 31.4847 7.55679 30.5947 8.51225L19.6 20.3H29.5C30.3284 20.3 31 20.9716 31 21.8V28.5C31 29.3284 30.3284 30 29.5 30H6.5C5.19417 30 4.5153 28.4432 5.40533 27.4878L16.4 15.7H6.5C5.67157 15.7 5 15.0284 5 14.2V7.5Z"
          fill="url(#zenovais_z_grad)"
        />
        <path
          d="M5 7.5C5 6.67157 5.67157 6 6.5 6H29.5C30.8058 6 31.4847 7.55679 30.5947 8.51225L16.4 15.7H6.5C5.67157 15.7 5 15.0284 5 14.2V7.5Z"
          fill="#075B50"
          fillOpacity="0.9"
        />
        <defs>
          <linearGradient id="zenovais_z_grad" x1="5" y1="6" x2="31" y2="30" gradientUnits="userSpaceOnUse">
            <stop stopColor="#075B50" />
            <stop offset="1" stopColor="#06443C" />
          </linearGradient>
        </defs>
      </svg>
      <span
        className={`text-[1.2rem] font-bold tracking-tight ${textColor}`}
        style={{ fontFamily: 'var(--z-font-display)' }}
      >
        Zenovais
      </span>
    </span>
  );
};

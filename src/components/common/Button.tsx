import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverted';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  className?: string;
  children: React.ReactNode;
}

type ButtonProps = BaseProps &
  (
    | ({ to: string } & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>)
    | ({ href: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>)
    | ({ to?: undefined; href?: undefined } & React.ButtonHTMLAttributes<HTMLButtonElement>)
  );

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-[var(--z-primary)] text-white hover:bg-[var(--z-primary-dark)] border border-transparent shadow-sm',
  secondary:
    'bg-[var(--z-surface)] text-[var(--z-charcoal)] border border-[var(--z-border)] hover:border-[var(--z-primary)] hover:text-[var(--z-primary)]',
  ghost:
    'bg-transparent text-[var(--z-charcoal)] hover:text-[var(--z-primary)] border border-transparent',
  inverted:
    'bg-white text-[var(--z-primary-dark)] hover:bg-[var(--z-pale-green)] border border-transparent shadow-sm',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-[13px] min-h-[38px]',
  md: 'px-5 py-2.5 text-sm min-h-[42px]',
  lg: 'px-6 py-3 text-[15px] min-h-[46px]',
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className = '',
  children,
  ...props
}) => {
  const baseClasses = `group inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap shrink-0 transition-all duration-200 active:scale-[0.98] ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
          aria-hidden="true"
        />
      )}
    </>
  );

  if ('to' in props && props.to !== undefined) {
    const { to, ...rest } = props;
    return (
      <Link to={to} className={baseClasses} {...rest}>
        {content}
      </Link>
    );
  }

  if ('href' in props && props.href !== undefined) {
    const { href, ...rest } = props;
    return (
      <a href={href} className={baseClasses} {...rest}>
        {content}
      </a>
    );
  }

  const buttonProps = props as React.ButtonHTMLAttributes<HTMLButtonElement>;
  return (
    <button type={buttonProps.type ?? 'button'} className={baseClasses} {...buttonProps}>
      {content}
    </button>
  );
};

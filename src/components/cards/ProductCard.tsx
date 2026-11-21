import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { ProductItem } from '../../types';
import { SafeImage } from '../common/SafeImage';
import { SpotlightCard } from '../animation/MotionPrimitives';

export const ProductCard: React.FC<{ product: ProductItem }> = ({ product }) => {
  return (
    <SpotlightCard className="h-full">
      <div className="flex h-full flex-col">
        <Link
          to={`/products/${product.slug}`}
          className="block aspect-[16/10] w-full overflow-hidden border-b border-[var(--z-border)]"
        >
          <SafeImage
            src={product.image}
            alt={product.imageAlt}
            fallbackIcon="Box"
            fallbackTitle={product.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>
        <div className="flex flex-1 flex-col justify-between p-6">
          <div>
            <p className="text-xs font-semibold text-[var(--z-primary)]">{product.category}</p>
            <Link to={`/products/${product.slug}`}>
              <h3 className="mt-1.5 text-xl font-semibold text-[var(--z-charcoal)] hover:text-[var(--z-primary)]">
                {product.name}
              </h3>
            </Link>
            <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
              {product.shortDescription}
            </p>
            <ul className="mt-4 space-y-1.5 border-t border-[var(--z-border)] pt-4">
              {product.features.slice(0, 3).map((feat) => (
                <li key={feat} className="flex items-center gap-2 text-xs text-[var(--z-charcoal)]/85">
                  <span className="h-1 w-1 rounded-full bg-[var(--z-primary)]" aria-hidden="true" />
                  <span>{feat}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/products/${product.slug}`}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--z-primary)]"
            >
              <span>Learn More</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            {product.externalUrl && (
              <a
                href={product.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-xs font-medium text-[var(--z-secondary-text)] hover:text-[var(--z-primary)]"
              >
                <span>Visit Product</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
};

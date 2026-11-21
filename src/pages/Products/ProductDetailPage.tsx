import React from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ExternalLink } from 'lucide-react';
import { productsData } from '../../data/products';
import { useSEO } from '../../hooks/useSEO';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Button } from '../../components/common/Button';
import { CTASection } from '../../components/sections/CTASection';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const product = productsData.find((p) => p.slug === slug);

  useSEO({
    title: product ? product.name : 'Product Not Found',
    description: product ? product.shortDescription : 'Explore Zenovais products.',
    path: `/products/${slug ?? ''}`,
  });

  if (!product) {
    return <NotFoundPage />;
  }

  return (
    <>
      <PageHero
        kicker={product.category}
        title={product.name}
        description={product.tagline}
        breadcrumbs={[
          { label: 'Products', to: '/products' },
          { label: product.name },
        ]}
        image={product.image}
        imageAlt={product.imageAlt}
        actions={
          <>
            {product.externalUrl && (
              <Button href={product.externalUrl} target="_blank" rel="noopener noreferrer" withArrow>
                Visit Product
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </Button>
            )}
            <Button to="/products" variant="secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              All Products
            </Button>
          </>
        }
      />

      <SectionWrapper background="white">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          <div className="space-y-10 lg:col-span-8">
            <div>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">Product Overview</h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                {product.overview}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">How It Works</h2>
              <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
                {product.howItWorks.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-5"
                  >
                    <span className="font-mono text-xs font-semibold text-[var(--z-primary)]">
                      {item.step}
                    </span>
                    <h3 className="mt-1.5 text-base font-semibold text-[var(--z-charcoal)]">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-xs leading-relaxed text-[var(--z-secondary-text)]">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {product.technologyOverview && (
              <div>
                <h2 className="text-2xl font-bold text-[var(--z-charcoal)]">
                  Technology Overview
                </h2>
                <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                  {product.technologyOverview}
                </p>
              </div>
            )}
          </div>

          <aside className="space-y-6 lg:col-span-4">
            <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-6">
              <h3 className="text-base font-semibold text-[var(--z-charcoal)]">Main Features</h3>
              <ul className="mt-4 space-y-2.5">
                {product.features.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5 text-sm text-[var(--z-charcoal)]">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[var(--z-primary)]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-6">
              <h3 className="text-base font-semibold text-[var(--z-charcoal)]">Key Benefits</h3>
              <ul className="mt-4 space-y-2 text-sm text-[var(--z-secondary-text)]">
                {product.benefits.map((b) => (
                  <li key={b}>· {b}</li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </SectionWrapper>

      <CTASection
        title={`Interested in ${product.name}?`}
        description="Connect with Zenovais Technologies to request a tailored demonstration or deployment briefing."
        ctaLabel="Contact Us"
        ctaTo="/contact"
      />
    </>
  );
};

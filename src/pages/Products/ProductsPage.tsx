import React, { useMemo, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { useSEO } from '../../hooks/useSEO';
import { productBlueprintTracks, productsData, productsPageMeta } from '../../data/products';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ProductCard } from '../../components/cards/ProductCard';
import { SafeImage } from '../../components/common/SafeImage';
import { Button } from '../../components/common/Button';
import { CTASection } from '../../components/sections/CTASection';
import { RevealOnScroll, StaggerContainer, StaggerItem } from '../../components/animation/MotionPrimitives';

export const ProductsPage: React.FC = () => {
  useSEO({
    title: productsPageMeta.seo.title,
    description: productsPageMeta.seo.description,
    keywords: productsPageMeta.seo.keywords,
    path: '/products',
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = useMemo(() => {
    const unique = Array.from(new Set(productsData.map((p) => p.category)));
    return ['All', ...unique];
  }, []);

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'All') return productsData;
    return productsData.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <PageHero
        kicker={productsPageMeta.hero.kicker}
        title={productsPageMeta.hero.title}
        titleHighlight={productsPageMeta.hero.titleHighlight}
        description={productsPageMeta.hero.description}
        breadcrumbs={[{ label: 'Products' }]}
      />

      {productsData.length > 0 ? (
        <SectionWrapper background="white">
          {categories.length > 2 && (
            <div className="mb-10 flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
                    selectedCategory === category
                      ? 'bg-[var(--z-primary)] text-white'
                      : 'border border-[var(--z-border)] bg-[var(--z-bg)] text-[var(--z-charcoal)] hover:border-[var(--z-primary)]'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          <StaggerContainer className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <StaggerItem key={product.slug}>
                <ProductCard product={product} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </SectionWrapper>
      ) : (
        <SectionWrapper background="white">
          <SectionHeading
            kicker="Product Architecture & R&D Pipeline"
            title="Intelligent Platforms in Active Development"
            subtitle="Zenovais builds proprietary AI-powered SaaS products and modular workflow platforms. Verified public product releases will appear here as they graduate from enterprise pilot phases."
          />

          <div className="mt-12 space-y-8">
            {productBlueprintTracks.map((track, idx) => (
              <RevealOnScroll key={track.id} delay={idx * 0.06}>
                <div className="grid grid-cols-1 overflow-hidden rounded-3xl border border-[var(--z-border)] bg-[var(--z-bg)]/50 lg:grid-cols-12">
                  <div className="flex flex-col justify-between p-7 sm:p-10 lg:col-span-7">
                    <div>
                      <div className="flex items-center gap-2.5 text-xs font-semibold text-[var(--z-primary)]">
                        <span className="font-mono tabular-nums">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{track.category}</span>
                      </div>
                      <h3 className="mt-2 text-2xl font-bold text-[var(--z-charcoal)]">
                        {track.title}
                      </h3>
                      <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                        {track.summary}
                      </p>
                      <ul className="mt-6 space-y-2.5 border-t border-[var(--z-border)] pt-5">
                        {track.capabilities.map((cap) => (
                          <li
                            key={cap}
                            className="flex items-center gap-2.5 text-sm font-medium text-[var(--z-charcoal)]"
                          >
                            <CheckCircle2
                              className="h-4 w-4 shrink-0 text-[var(--z-primary)]"
                              aria-hidden="true"
                            />
                            <span>{cap}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-7">
                      <Button to="/contact" variant="secondary" withArrow>
                        Inquire About Early Pilot Access
                      </Button>
                    </div>
                  </div>

                  <div className="min-h-[240px] overflow-hidden border-t border-[var(--z-border)] lg:col-span-5 lg:border-t-0 lg:border-l">
                    <div className="relative h-full w-full overflow-hidden">
                      <SafeImage
                        src={track.image}
                        alt={track.imageAlt}
                        className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                      />
                      <div
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[var(--z-bg)]/80 to-transparent"
                      />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </SectionWrapper>
      )}

      <CTASection
        title="Building a Custom AI Product?"
        description="Collaborate with Zenovais Product Development to take your digital product from strategy and UX to scalable launch."
        ctaLabel="Start Product Discovery"
        ctaTo="/contact"
      />
    </>
  );
};

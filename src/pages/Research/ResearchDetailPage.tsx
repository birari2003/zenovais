import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { researchArticles } from '../../data/research';
import { useSEO } from '../../hooks/useSEO';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { Breadcrumbs } from '../../components/layout/Breadcrumbs';
import { SafeImage } from '../../components/common/SafeImage';
import { Button } from '../../components/common/Button';
import { CTASection } from '../../components/sections/CTASection';
import { RevealOnScroll } from '../../components/animation/MotionPrimitives';
import { NotFoundPage } from '../NotFound/NotFoundPage';

export const ResearchDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = researchArticles.find((a) => a.slug === slug);

  useSEO({
    title: article ? article.title : 'Article Not Found',
    description: article ? article.summary : 'Zenovais Technologies research insights.',
    keywords: article
      ? [
          article.title,
          article.category,
          ...article.keyTakeaways.slice(0, 3),
          'Zenovais Research',
        ].join(', ')
      : undefined,
    path: `/research/${slug ?? ''}`,
    type: 'article',
  });

  if (!article) {
    return <NotFoundPage />;
  }

  const related = researchArticles.filter((a) => a.slug !== article.slug);

  return (
    <>
      <SectionWrapper background="warm" compact>
        <div className="mx-auto max-w-4xl">
          <Breadcrumbs
            items={[
              { label: 'Research & Innovation', to: '/research' },
              { label: article.category },
            ]}
          />

          <div className="flex flex-wrap items-center gap-2 text-xs text-[var(--z-secondary-text)]">
            <span className="font-semibold text-[var(--z-primary)]">{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.date}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>

          <h1
            className="mt-3 font-bold tracking-tight text-[var(--z-charcoal)]"
            style={{ fontSize: 'clamp(1.85rem, 3.6vw, 3rem)', lineHeight: 1.15 }}
          >
            {article.title}
          </h1>

          <p className="mt-4 text-base leading-relaxed text-[var(--z-secondary-text)] sm:text-lg">
            {article.summary}
          </p>

          <div className="mt-8 aspect-[16/9] overflow-hidden rounded-2xl border border-[var(--z-border)]">
            <SafeImage
              src={article.coverImage}
              alt={article.coverAlt}
              loading="eager"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper background="white">
        <div className="mx-auto max-w-3xl space-y-10">
          {article.sections.map((section) => (
            <RevealOnScroll key={section.heading}>
              <h2 className="text-xl font-bold text-[var(--z-charcoal)] sm:text-2xl">
                {section.heading}
              </h2>
              <p className="mt-3 text-base leading-relaxed text-[var(--z-secondary-text)]">
                {section.body}
              </p>
            </RevealOnScroll>
          ))}

          <div className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-pale-green)]/50 p-6 sm:p-8">
            <h3 className="text-base font-bold text-[var(--z-charcoal)]">Key Takeaways</h3>
            <ul className="mt-4 space-y-3">
              {article.keyTakeaways.map((point) => (
                <li
                  key={point}
                  className="flex items-start gap-2.5 text-sm leading-relaxed text-[var(--z-charcoal)]"
                >
                  <CheckCircle2
                    className="mt-0.5 h-4 w-4 shrink-0 text-[var(--z-primary)]"
                    aria-hidden="true"
                  />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border-t border-[var(--z-border)] pt-8">
            <Button to="/research" variant="secondary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Research & Innovation
            </Button>
          </div>

          {related.length > 0 && (
            <div className="border-t border-[var(--z-border)] pt-10">
              <h3 className="text-lg font-bold text-[var(--z-charcoal)]">More Perspectives</h3>
              <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {related.map((item) => (
                  <Link
                    key={item.slug}
                    to={`/research/${item.slug}`}
                    className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-bg)] p-5 transition-colors hover:border-[var(--z-primary)]"
                  >
                    <p className="text-xs font-semibold text-[var(--z-primary)]">{item.category}</p>
                    <h4 className="mt-1.5 text-base font-semibold text-[var(--z-charcoal)]">
                      {item.title}
                    </h4>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>

      <CTASection
        title="Discuss This Architecture With Our Team"
        description="Explore how these design patterns apply to your production environment."
        ctaLabel="Get in Touch"
        ctaTo="/contact"
      />
    </>
  );
};

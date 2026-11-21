import React, { useMemo, useState } from 'react';
import { useSEO } from '../../hooks/useSEO';
import {
  researchArticles,
  researchDomains,
  researchPageMeta,
  researchPhilosophy,
} from '../../data/research';
import { PageHero } from '../../components/sections/PageHero';
import { SectionWrapper } from '../../components/layout/PageContainer';
import { SectionHeading } from '../../components/common/SectionHeading';
import { ResearchCard } from '../../components/cards/ResearchCard';
import { CTASection } from '../../components/sections/CTASection';
import {
  RevealOnScroll,
  SpotlightCard,
  StaggerContainer,
  StaggerItem,
} from '../../components/animation/MotionPrimitives';

import { ZenovaisNeuralCore3D } from '../../components/three/ZenovaisNeuralCore3D';
import { ZenovaisRoboticsArm3D } from '../../components/three/ZenovaisRoboticsArm3D';

export const ResearchPage: React.FC = () => {
  useSEO({
    title: researchPageMeta.seo.title,
    description: researchPageMeta.seo.description,
    path: '/research',
  });

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [labModel, setLabModel] = useState<'core' | 'robotics'>('core');

  const categories = useMemo(() => {
    const cats = Array.from(new Set(researchArticles.map((a) => a.category)));
    return ['All', ...cats];
  }, []);

  const filteredArticles = useMemo(() => {
    if (selectedCategory === 'All') return researchArticles;
    return researchArticles.filter((a) => a.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <PageHero
        kicker={researchPageMeta.hero.kicker}
        title={researchPageMeta.hero.title}
        titleHighlight={researchPageMeta.hero.titleHighlight}
        description={researchPageMeta.hero.description}
        breadcrumbs={[{ label: 'Research & Innovation' }]}
        image={researchPageMeta.hero.image}
        imageAlt={researchPageMeta.hero.imageAlt}
      />

      {/* Research Philosophy + Interactive 3D Neural Core */}
      <SectionWrapper background="white">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
          <div className="space-y-4 lg:col-span-6">
            <SectionHeading
              kicker={researchPhilosophy.kicker}
              title={researchPhilosophy.title}
            />
            {researchPhilosophy.paragraphs.map((p, idx) => (
              <RevealOnScroll key={idx} delay={idx * 0.08}>
                <p className="text-base leading-relaxed text-[var(--z-secondary-text)] sm:text-[17px]">
                  {p}
                </p>
              </RevealOnScroll>
            ))}
          </div>
          <div className="space-y-3 lg:col-span-6">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-xs font-semibold text-[var(--z-primary)] uppercase">
                Interactive R&D Stage
              </span>
              <div className="inline-flex rounded-full border border-[var(--z-border)] bg-[var(--z-bg)] p-1">
                <button
                  type="button"
                  onClick={() => setLabModel('core')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    labModel === 'core'
                      ? 'bg-[var(--z-primary)] text-white'
                      : 'text-[var(--z-secondary-text)] hover:text-[var(--z-charcoal)]'
                  }`}
                >
                  Neural Core 3D
                </button>
                <button
                  type="button"
                  onClick={() => setLabModel('robotics')}
                  className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                    labModel === 'robotics'
                      ? 'bg-[var(--z-primary)] text-white'
                      : 'text-[var(--z-secondary-text)] hover:text-[var(--z-charcoal)]'
                  }`}
                >
                  Robotics Kinematics 3D
                </button>
              </div>
            </div>
            <div className="h-[400px] overflow-hidden rounded-tl-[72px] rounded-tr-[24px] rounded-br-[72px] rounded-bl-[24px] border border-[var(--z-border)] bg-gradient-to-br from-[#FAFAF7] via-[#EAF2ED] to-[#DCE9E3] shadow-[0_24px_48px_-18px_rgba(7,91,80,0.18)]">
              {labModel === 'core' ? (
                <ZenovaisNeuralCore3D className="h-full w-full" />
              ) : (
                <ZenovaisRoboticsArm3D className="h-full w-full" />
              )}
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* 5 Research Focus Areas */}
      <SectionWrapper background="warm">
        <SectionHeading
          kicker="Exploration Tracks"
          title="Core Research & Experimentation Domains"
          subtitle="Focused technical inquiry bridging foundational research with reliable enterprise engineering."
        />

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {researchDomains.map((domain, idx) => (
            <StaggerItem
              key={domain.id}
              className={idx === 0 ? 'lg:col-span-2' : ''}
            >
              <SpotlightCard className="h-full">
                <div className="p-6 sm:p-7">
                  <span className="font-mono text-xs font-medium text-[var(--z-primary)] tabular-nums">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-2 text-xl font-bold text-[var(--z-charcoal)]">
                    {domain.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-[var(--z-secondary-text)]">
                    {domain.description}
                  </p>
                  <ul className="mt-5 space-y-2 border-t border-[var(--z-border)] pt-4">
                    {domain.focusPoints.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-center gap-2 text-xs font-medium text-[var(--z-charcoal)]/85"
                      >
                        <span
                          className="h-1 w-1 rounded-full bg-[var(--z-primary)]"
                          aria-hidden="true"
                        />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      {/* Research Insights & Engineering Perspectives */}
      <SectionWrapper background="white">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            kicker="Research Insights & Perspectives"
            title="Technical Notes & Architectural Thinking"
            subtitle="Practical engineering perspectives authored by the Zenovais architecture team."
          />

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[var(--z-primary)] text-white'
                    : 'border border-[var(--z-border)] bg-[var(--z-bg)] text-[var(--z-charcoal)] hover:border-[var(--z-primary)]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <StaggerContainer className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredArticles.map((article) => (
            <StaggerItem key={article.slug}>
              <ResearchCard article={article} />
            </StaggerItem>
          ))}
        </StaggerContainer>
      </SectionWrapper>

      <CTASection
        title="Collaborate on Applied AI R&D"
        description="Have a complex technical problem requiring proof-of-concept validation? Connect with our engineering team."
        ctaLabel="Discuss Research Scope"
        ctaTo="/contact"
      />
    </>
  );
};

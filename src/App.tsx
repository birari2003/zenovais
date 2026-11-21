/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence, MotionConfig } from 'motion/react';
import { applyThemeCssVariables } from './theme/theme';
import { MainLayout } from './components/layout/MainLayout';
import { PageTransition } from './components/animation/MotionPrimitives';
import { HomePage } from './pages/Home/HomePage';
import { AboutPage } from './pages/About/AboutPage';
import { SolutionsPage } from './pages/Solutions/SolutionsPage';
import { SolutionDetailPage } from './pages/Solutions/SolutionDetailPage';
import { ProductsPage } from './pages/Products/ProductsPage';
import { ProductDetailPage } from './pages/Products/ProductDetailPage';
import { ServicesPage } from './pages/Services/ServicesPage';
import { ServiceDetailPage } from './pages/Services/ServiceDetailPage';
import { ResearchPage } from './pages/Research/ResearchPage';
import { ResearchDetailPage } from './pages/Research/ResearchDetailPage';
import { IndustriesPage } from './pages/Industries/IndustriesPage';
import { CareersPage } from './pages/Careers/CareersPage';
import { JobDetailPage } from './pages/Careers/JobDetailPage';
import { ContactPage } from './pages/Contact/ContactPage';
import { LegalPage } from './pages/Legal/LegalPage';
import { NotFoundPage } from './pages/NotFound/NotFoundPage';

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/ai-solutions" element={<SolutionsPage />} />
          <Route path="/ai-solutions/:slug" element={<SolutionDetailPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:slug" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/research" element={<ResearchPage />} />
          <Route path="/research/:slug" element={<ResearchDetailPage />} />
          <Route path="/industries" element={<IndustriesPage />} />
          <Route path="/careers" element={<CareersPage />} />
          <Route path="/careers/:jobId" element={<JobDetailPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/privacy-policy" element={<LegalPage type="privacy" />} />
          <Route path="/terms-of-service" element={<LegalPage type="terms" />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
    </AnimatePresence>
  );
};

export default function App() {
  useEffect(() => {
    applyThemeCssVariables();
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <MainLayout>
          <AnimatedRoutes />
        </MainLayout>
      </BrowserRouter>
    </MotionConfig>
  );
}

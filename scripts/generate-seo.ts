/**
 * Build-time script to generate sitemaps, robots.txt, and pre-render SEO meta tags
 * into static HTML files for every route in dist/.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  allRoutesSeo,
  generateRobotsTxt,
  generateSitemapXml,
  injectSeoIntoHtml,
  notFoundSeo,
} from '../src/data/seoData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const publicDir = path.resolve(rootDir, 'public');
const distDir = path.resolve(rootDir, 'dist');

function run() {
  console.log('Generating SEO assets and sitemap...');

  // 1. Ensure public/ exists
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  // 2. Generate public/sitemap.xml and public/robots.txt
  const sitemapXml = generateSitemapXml();
  const robotsTxt = generateRobotsTxt();

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapXml, 'utf-8');
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt, 'utf-8');
  console.log(`Generated public/sitemap.xml (${allRoutesSeo.length} URLs)`);
  console.log(`Generated public/robots.txt`);

  // 3. If dist/ exists (after vite build), generate static HTML per route
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapXml, 'utf-8');
    fs.writeFileSync(path.join(distDir, 'robots.txt'), robotsTxt, 'utf-8');

    const templatePath = path.join(distDir, 'index.html');
    if (fs.existsSync(templatePath)) {
      const baseHtml = fs.readFileSync(templatePath, 'utf-8');

      // Pre-render each route
      for (const route of allRoutesSeo) {
        const injected = injectSeoIntoHtml(baseHtml, route);

        if (route.path === '/') {
          fs.writeFileSync(templatePath, injected, 'utf-8');
        } else {
          const routeDir = path.join(distDir, route.path.replace(/^\//, ''));
          fs.mkdirSync(routeDir, { recursive: true });
          fs.writeFileSync(path.join(routeDir, 'index.html'), injected, 'utf-8');
        }
      }

      // Pre-render 404.html
      const notFoundHtml = injectSeoIntoHtml(baseHtml, notFoundSeo);
      fs.writeFileSync(path.join(distDir, '404.html'), notFoundHtml, 'utf-8');

      console.log(`Pre-rendered ${allRoutesSeo.length} route HTML files into dist/ for view-source and crawler optimization.`);
    }
  }

  console.log('SEO generation complete!');
}

run();

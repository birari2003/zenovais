import { useEffect } from 'react';
import { getSeoForPath } from '../data/seoData';

export interface SEOOptions {
  title?: string;
  description?: string;
  keywords?: string | string[];
  canonical?: string;
  path?: string;
  type?: 'website' | 'article';
  image?: string;
  robots?: string;
}

export function useSEO(options?: SEOOptions) {
  useEffect(() => {
    const currentPath =
      options?.path ?? (typeof window !== 'undefined' ? window.location.pathname : '/');
    const defaultData = getSeoForPath(currentPath);

    const title = options?.title
      ? options.title.includes('Zenovais')
        ? options.title
        : `${options.title} | Zenovais Technologies`
      : defaultData.title;

    const description = options?.description ?? defaultData.description;

    const keywords = options?.keywords
      ? Array.isArray(options.keywords)
        ? options.keywords.filter(Boolean).join(', ')
        : options.keywords
      : defaultData.keywords;

    const canonicalHref = options?.canonical ?? defaultData.canonical;
    const robots = options?.robots ?? defaultData.robots;
    const type = options?.type ?? defaultData.type;
    const image = options?.image ?? defaultData.image;

    document.title = title;

    const setMeta = (nameOrProperty: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${nameOrProperty}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, nameOrProperty);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    setMeta('description', description);
    setMeta('keywords', keywords);
    setMeta('robots', robots);
    setMeta('og:title', title, true);
    setMeta('og:description', description, true);
    setMeta('og:type', type, true);
    setMeta('og:url', canonicalHref, true);
    setMeta('og:image', image, true);
    setMeta('og:site_name', 'Zenovais Technologies', true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', title);
    setMeta('twitter:description', description);
    setMeta('twitter:image', image);

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = canonicalHref;
  }, [
    options?.title,
    options?.description,
    options?.keywords,
    options?.canonical,
    options?.path,
    options?.type,
    options?.image,
    options?.robots,
  ]);
}

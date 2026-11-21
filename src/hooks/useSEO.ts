import { useEffect } from 'react';

interface SEOOptions {
  title: string;
  description: string;
  path?: string;
  type?: 'website' | 'article';
}

export function useSEO({ title, description, path, type = 'website' }: SEOOptions) {
  useEffect(() => {
    const fullTitle = title.includes('Zenovais') ? title : `${title} | Zenovais Technologies`;
    document.title = fullTitle;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    setMeta('meta[name="description"]', description);
    setMeta('meta[property="og:title"]', fullTitle);
    setMeta('meta[property="og:description"]', description);
    setMeta('meta[property="og:type"]', type);
    setMeta('meta[name="twitter:title"]', fullTitle);
    setMeta('meta[name="twitter:description"]', description);

    if (typeof window !== 'undefined') {
      const canonicalHref = `${window.location.origin}${path ?? window.location.pathname}`;
      let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!canonical) {
        canonical = document.createElement('link');
        canonical.rel = 'canonical';
        document.head.appendChild(canonical);
      }
      canonical.href = canonicalHref;
    }
  }, [title, description, path, type]);
}

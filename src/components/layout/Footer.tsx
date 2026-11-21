import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { footerData } from '../../data/footer';
import { contactInfoConfig } from '../../data/contact';
import { ZenovaisLogo } from '../common/ZenovaisLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(trimmed)) {
      setStatus('error');
      setFeedback('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setFeedback('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed, _website: honeypot }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setFeedback(data.message || 'Unable to process subscription right now.');
        return;
      }
      setStatus('success');
      setFeedback(data.message || 'Subscribed to Zenovais updates.');
      if (!data.alreadySubscribed) {
        setEmail('');
      }
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again shortly.');
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[var(--z-border)] bg-[var(--z-surface)]">
      <div className="mx-auto max-w-[1320px] px-5 pt-16 pb-10 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link to="/" aria-label="Zenovais Technologies">
              <ZenovaisLogo />
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-[var(--z-secondary-text)]">
              {footerData.company.description}
            </p>
            <div className="mt-5 space-y-1.5 text-sm text-[var(--z-secondary-text)]">
              <p className="font-medium text-[var(--z-charcoal)]">{footerData.company.website}</p>
              {contactInfoConfig.businessEmail && (
                <p>
                  <a
                    href={`mailto:${contactInfoConfig.businessEmail}`}
                    className="transition-colors hover:text-[var(--z-primary)]"
                  >
                    {contactInfoConfig.businessEmail}
                  </a>
                </p>
              )}
              {contactInfoConfig.officeLocation && <p>{contactInfoConfig.officeLocation}</p>}
            </div>

            {footerData.socialLinks.length > 0 && (
              <div className="mt-5 flex flex-wrap gap-3">
                {footerData.socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-medium text-[var(--z-secondary-text)] underline-offset-4 hover:text-[var(--z-primary)] hover:underline"
                  >
                    {social.label}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">Quick Links</h3>
            <ul className="mt-4 space-y-2.5">
              {footerData.quickLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--z-secondary-text)] transition-colors hover:text-[var(--z-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div className="lg:col-span-2">
            <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">Explore</h3>
            <ul className="mt-4 space-y-2.5">
              {footerData.exploreLinks.map((link) => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    className="text-sm text-[var(--z-secondary-text)] transition-colors hover:text-[var(--z-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter & Resources */}
          <div className="lg:col-span-4">
            <h3 className="text-sm font-semibold text-[var(--z-charcoal)]">
              {footerData.newsletter.title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--z-secondary-text)]">
              {footerData.newsletter.description}
            </p>

            <form onSubmit={handleSubscribe} noValidate className="mt-4">
              {/* Honeypot */}
              <input
                type="text"
                name="_website"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-2 sm:flex-row">
                <label htmlFor="footer-newsletter-email" className="sr-only">
                  Business email address
                </label>
                <input
                  id="footer-newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={footerData.newsletter.placeholder}
                  required
                  className="h-11 flex-1 rounded-full border border-[var(--z-border)] bg-[var(--z-bg)] px-4 text-sm text-[var(--z-charcoal)] placeholder:text-[var(--z-secondary-text)]/70 focus:border-[var(--z-primary)] focus:outline-none"
                />
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-[var(--z-primary)] px-5 text-sm font-semibold text-white transition-colors hover:bg-[var(--z-primary-dark)] disabled:opacity-60 whitespace-nowrap shrink-0"
                >
                  <span>{status === 'loading' ? 'Subscribing...' : footerData.newsletter.buttonLabel}</span>
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>

              {status === 'success' && (
                <p className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-[var(--z-primary)]" role="status">
                  <CheckCircle2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{feedback}</span>
                </p>
              )}
              {status === 'error' && (
                <p className="mt-2.5 flex items-center gap-1.5 text-xs font-medium text-[#B42318]" role="alert">
                  <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>{feedback}</span>
                </p>
              )}
            </form>

            <div className="mt-6 flex flex-wrap gap-5 border-t border-[var(--z-border)] pt-5">
              {footerData.resourceLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="text-xs font-medium text-[var(--z-secondary-text)] transition-colors hover:text-[var(--z-primary)]"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-[var(--z-border)] pt-6 text-xs text-[var(--z-secondary-text)] sm:flex-row sm:items-center">
          <p>© {currentYear} Zenovais Technologies. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="transition-colors hover:text-[var(--z-primary)]">
              Privacy Policy
            </Link>
            <Link to="/terms-of-service" className="transition-colors hover:text-[var(--z-primary)]">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

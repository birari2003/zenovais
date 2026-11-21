import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { opportunityAreas } from '../../data/careers';
import { Button } from '../common/Button';

export const TalentCommunityForm: React.FC = () => {
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    areaOfInterest: '',
    portfolioUrl: '',
    message: '',
    _website: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [feedback, setFeedback] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors: Record<string, string> = {};
    if (form.fullName.trim().length < 2) nextErrors.fullName = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.areaOfInterest) nextErrors.areaOfInterest = 'Please choose an area of interest.';
    if (form.message.trim().length < 15) {
      nextErrors.message = 'Please share a brief note about your work (at least 15 characters).';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      setStatus('error');
      setFeedback('Please review the required fields below.');
      return;
    }

    setStatus('submitting');
    setFeedback('');
    try {
      const res = await fetch('/api/careers/enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        setStatus('error');
        setFeedback(data.message || 'Unable to submit right now.');
        if (data.errors) setErrors(data.errors);
        return;
      }
      setStatus('success');
      setFeedback(data.message || 'Added to our talent community.');
      setForm({
        fullName: '',
        email: '',
        areaOfInterest: '',
        portfolioUrl: '',
        message: '',
        _website: '',
      });
      setErrors({});
    } catch {
      setStatus('error');
      setFeedback('Network error. Please try again shortly.');
    }
  };

  const inputBase =
    'w-full rounded-xl border border-[var(--z-border)] bg-[var(--z-bg)] px-4 py-3 text-sm text-[var(--z-charcoal)] focus:border-[var(--z-primary)] focus:bg-white focus:outline-none';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-6 sm:p-8"
    >
      <input
        type="text"
        name="_website"
        tabIndex={-1}
        autoComplete="off"
        value={form._website}
        onChange={(e) => setForm((p) => ({ ...p, _website: e.target.value }))}
        className="hidden"
        aria-hidden="true"
      />

      {status === 'success' && (
        <div
          role="status"
          className="mb-6 flex items-start gap-3 rounded-xl border border-[var(--z-primary)]/25 bg-[var(--z-pale-green)] p-4 text-sm text-[var(--z-primary-dark)]"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--z-primary)]" aria-hidden="true" />
          <span>{feedback}</span>
        </div>
      )}

      {status === 'error' && feedback && (
        <div
          role="alert"
          className="mb-6 flex items-start gap-3 rounded-xl border border-[#B42318]/25 bg-[#FEF3F2] p-4 text-sm text-[#B42318]"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{feedback}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="talent-name" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
            Full Name *
          </label>
          <input
            id="talent-name"
            type="text"
            value={form.fullName}
            onChange={(e) => setForm((p) => ({ ...p, fullName: e.target.value }))}
            placeholder="Your full name"
            className={inputBase}
          />
          {errors.fullName && <p className="mt-1 text-xs text-[#B42318]">{errors.fullName}</p>}
        </div>

        <div>
          <label htmlFor="talent-email" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
            Email Address *
          </label>
          <input
            id="talent-email"
            type="email"
            value={form.email}
            onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
            placeholder="you@domain.com"
            className={inputBase}
          />
          {errors.email && <p className="mt-1 text-xs text-[#B42318]">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor="talent-area" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
            Area of Opportunity *
          </label>
          <select
            id="talent-area"
            value={form.areaOfInterest}
            onChange={(e) => setForm((p) => ({ ...p, areaOfInterest: e.target.value }))}
            className={inputBase}
          >
            <option value="">Select discipline</option>
            {opportunityAreas.map((area) => (
              <option key={area.title} value={area.title}>
                {area.title}
              </option>
            ))}
          </select>
          {errors.areaOfInterest && (
            <p className="mt-1 text-xs text-[#B42318]">{errors.areaOfInterest}</p>
          )}
        </div>

        <div>
          <label htmlFor="talent-portfolio" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
            Portfolio / GitHub / Profile URL
          </label>
          <input
            id="talent-portfolio"
            type="url"
            value={form.portfolioUrl}
            onChange={(e) => setForm((p) => ({ ...p, portfolioUrl: e.target.value }))}
            placeholder="https://..."
            className={inputBase}
          />
        </div>
      </div>

      <div className="mt-4">
        <label htmlFor="talent-note" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
          Background & Interests *
        </label>
        <textarea
          id="talent-note"
          rows={4}
          value={form.message}
          onChange={(e) => setForm((p) => ({ ...p, message: e.target.value }))}
          placeholder="Briefly share your technical focus, notable systems built, or areas you want to explore..."
          className={`${inputBase} resize-y`}
        />
        {errors.message && <p className="mt-1 text-xs text-[#B42318]">{errors.message}</p>}
      </div>

      <div className="mt-5 flex justify-end">
        <Button type="submit" size="md" disabled={status === 'submitting'} withArrow>
          {status === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Submitting...
            </span>
          ) : (
            'Submit General Enquiry'
          )}
        </Button>
      </div>
    </form>
  );
};

import React, { useState } from 'react';
import { AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';
import { contactServiceOptions, projectBudgetOptions } from '../../data/contact';
import { Button } from '../common/Button';

interface ContactFormProps {
  defaultService?: string;
}

interface FormState {
  fullName: string;
  businessEmail: string;
  companyName: string;
  phoneNumber: string;
  serviceOfInterest: string;
  projectBudget: string;
  message: string;
  _website: string; // honeypot
}

export const ContactForm: React.FC<ContactFormProps> = ({ defaultService = '' }) => {
  const [form, setForm] = useState<FormState>({
    fullName: '',
    businessEmail: '',
    companyName: '',
    phoneNumber: '',
    serviceOfInterest: defaultService,
    projectBudget: '',
    message: '',
    _website: '',
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submitState, setSubmitState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [submissionId, setSubmissionId] = useState('');

  const validateClient = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    if (form.fullName.trim().length < 2) errors.fullName = 'Please enter your full name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.businessEmail.trim())) {
      errors.businessEmail = 'Please enter a valid business email address.';
    }
    if (form.companyName.trim().length < 2) errors.companyName = 'Please enter your company name.';
    if (!form.serviceOfInterest) errors.serviceOfInterest = 'Please select a service of interest.';
    if (form.message.trim().length < 15) {
      errors.message = 'Please describe your project or enquiry (at least 15 characters).';
    }
    return errors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateClient();
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setSubmitState('error');
      setServerMessage('Please fix the highlighted fields before submitting.');
      return;
    }

    setSubmitState('submitting');
    setServerMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        setSubmitState('error');
        setServerMessage(data.message || 'Unable to submit enquiry. Please verify your details.');
        if (data.errors) setFieldErrors(data.errors);
        return;
      }

      setSubmitState('success');
      setServerMessage(data.message || 'Enquiry submitted successfully.');
      setSubmissionId(data.submissionId || '');
      setForm({
        fullName: '',
        businessEmail: '',
        companyName: '',
        phoneNumber: '',
        serviceOfInterest: '',
        projectBudget: '',
        message: '',
        _website: '',
      });
      setFieldErrors({});
    } catch {
      setSubmitState('error');
      setServerMessage('Network error communicating with the server. Please try again.');
    }
  };

  const inputBase =
    'w-full rounded-xl border bg-[var(--z-bg)] px-4 py-3 text-sm text-[var(--z-charcoal)] placeholder:text-[var(--z-secondary-text)]/65 transition-colors focus:border-[var(--z-primary)] focus:bg-white focus:outline-none';

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="rounded-2xl border border-[var(--z-border)] bg-[var(--z-surface)] p-6 sm:p-8 lg:p-10 shadow-[0_8px_30px_-14px_rgba(23,33,43,0.06)]"
    >
      <h2 className="text-xl font-bold text-[var(--z-charcoal)] sm:text-2xl">
        Project & Business Enquiry
      </h2>
      <p className="mt-2 text-sm text-[var(--z-secondary-text)]">
        Share your goals and technical context. All fields marked with * are required.
      </p>

      {/* Honeypot field */}
      <input
        type="text"
        name="_website"
        tabIndex={-1}
        autoComplete="off"
        value={form._website}
        onChange={handleChange}
        className="hidden"
        aria-hidden="true"
      />

      {submitState === 'success' && (
        <div
          role="status"
          className="mt-6 flex items-start gap-3 rounded-xl border border-[var(--z-primary)]/25 bg-[var(--z-pale-green)] p-4 text-sm text-[var(--z-primary-dark)]"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--z-primary)]" aria-hidden="true" />
          <div>
            <p className="font-semibold">{serverMessage}</p>
            {submissionId && (
              <p className="mt-1 font-mono text-xs text-[var(--z-primary)]">
                Reference ID: {submissionId}
              </p>
            )}
          </div>
        </div>
      )}

      {submitState === 'error' && serverMessage && (
        <div
          role="alert"
          className="mt-6 flex items-start gap-3 rounded-xl border border-[#B42318]/25 bg-[#FEF3F2] p-4 text-sm text-[#B42318]"
        >
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <span>{serverMessage}</span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="fullName" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
            Full Name *
          </label>
          <input
            id="fullName"
            name="fullName"
            type="text"
            required
            value={form.fullName}
            onChange={handleChange}
            placeholder="Your full name"
            className={`${inputBase} ${
              fieldErrors.fullName ? 'border-[#B42318]' : 'border-[var(--z-border)]'
            }`}
          />
          {fieldErrors.fullName && (
            <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.fullName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="businessEmail"
            className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]"
          >
            Business Email *
          </label>
          <input
            id="businessEmail"
            name="businessEmail"
            type="email"
            required
            value={form.businessEmail}
            onChange={handleChange}
            placeholder="name@company.com"
            className={`${inputBase} ${
              fieldErrors.businessEmail ? 'border-[#B42318]' : 'border-[var(--z-border)]'
            }`}
          />
          {fieldErrors.businessEmail && (
            <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.businessEmail}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="companyName"
            className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]"
          >
            Company Name *
          </label>
          <input
            id="companyName"
            name="companyName"
            type="text"
            required
            value={form.companyName}
            onChange={handleChange}
            placeholder="Organization or company"
            className={`${inputBase} ${
              fieldErrors.companyName ? 'border-[#B42318]' : 'border-[var(--z-border)]'
            }`}
          />
          {fieldErrors.companyName && (
            <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.companyName}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="phoneNumber"
            className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]"
          >
            Phone Number
          </label>
          <input
            id="phoneNumber"
            name="phoneNumber"
            type="tel"
            value={form.phoneNumber}
            onChange={handleChange}
            placeholder="Optional contact number"
            className={`${inputBase} border-[var(--z-border)]`}
          />
        </div>

        <div>
          <label
            htmlFor="serviceOfInterest"
            className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]"
          >
            Service of Interest *
          </label>
          <select
            id="serviceOfInterest"
            name="serviceOfInterest"
            required
            value={form.serviceOfInterest}
            onChange={handleChange}
            className={`${inputBase} ${
              fieldErrors.serviceOfInterest ? 'border-[#B42318]' : 'border-[var(--z-border)]'
            }`}
          >
            <option value="">Select a focus area</option>
            {contactServiceOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {fieldErrors.serviceOfInterest && (
            <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.serviceOfInterest}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="projectBudget"
            className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]"
          >
            Project Scope / Budget (Optional)
          </label>
          <select
            id="projectBudget"
            name="projectBudget"
            value={form.projectBudget}
            onChange={handleChange}
            className={`${inputBase} border-[var(--z-border)]`}
          >
            <option value="">Select scope (optional)</option>
            {projectBudgetOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-5">
        <label htmlFor="message" className="mb-1.5 block text-xs font-semibold text-[var(--z-charcoal)]">
          Message *
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          placeholder="Tell us about your objectives, timeline, or technical requirements..."
          className={`${inputBase} resize-y ${
            fieldErrors.message ? 'border-[#B42318]' : 'border-[var(--z-border)]'
          }`}
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-[#B42318]">{fieldErrors.message}</p>
        )}
      </div>

      <div className="mt-6 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-xs text-[var(--z-secondary-text)]">
          Validated server-side before submission confirmation.
        </p>
        <Button type="submit" size="lg" disabled={submitState === 'submitting'} withArrow>
          {submitState === 'submitting' ? (
            <span className="inline-flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Sending Enquiry...
            </span>
          ) : (
            'Send Enquiry'
          )}
        </Button>
      </div>
    </form>
  );
};

import nodemailer from 'nodemailer';
import { mailConfig } from '../../mail.config';

// Netlify Function for POST /api/contact (Netlify does not run server.ts).
// SMTP credentials come from mail.config.ts.
const SMTP_USER = mailConfig.user;
const SMTP_PASS = mailConfig.pass;
const CONTACT_RECEIVER = mailConfig.receiver || SMTP_USER;

const mailer =
  SMTP_USER && SMTP_PASS
    ? nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.port === 465,
        auth: { user: SMTP_USER, pass: SMTP_PASS },
      })
    : null;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const json = (status: number, data: unknown) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });

export default async (req: Request): Promise<Response> => {
  if (req.method !== 'POST') {
    return json(405, { ok: false, message: 'Method not allowed.' });
  }

  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return json(400, { ok: false, message: 'Invalid request body.' });
  }

  // Honeypot spam trap
  if (typeof body._website === 'string' && body._website.trim().length > 0) {
    return json(400, { ok: false, message: 'Invalid submission detected.' });
  }

  const fullName = sanitizeText(body.fullName, 120);
  const businessEmail = sanitizeText(body.businessEmail, 160).toLowerCase();
  const companyName = sanitizeText(body.companyName, 160);
  const phoneNumber = sanitizeText(body.phoneNumber, 40);
  const serviceOfInterest = sanitizeText(body.serviceOfInterest, 100);
  const projectBudget = sanitizeText(body.projectBudget, 80);
  const message = sanitizeText(body.message, 3000);

  const errors: Record<string, string> = {};
  if (fullName.length < 2) errors.fullName = 'Please enter your full name.';
  if (!EMAIL_REGEX.test(businessEmail)) errors.businessEmail = 'Please enter a valid business email address.';
  if (companyName.length < 2) errors.companyName = 'Please enter your company or organization name.';
  if (!serviceOfInterest) errors.serviceOfInterest = 'Please select a service of interest.';
  if (message.length < 15) errors.message = 'Please provide at least 15 characters describing your requirements.';

  if (Object.keys(errors).length > 0) {
    return json(400, {
      ok: false,
      message: 'Please correct the highlighted fields and try again.',
      errors,
    });
  }

  if (!mailer) {
    console.error('SMTP credentials missing — cannot send contact email.');
    return json(500, { ok: false, message: 'Email service is not configured.' });
  }

  const id = `znv_${Date.now().toString(36)}`;
  const submittedAt = new Date().toISOString();
  const fields: [string, string][] = [
    ['Full name', fullName],
    ['Business email', businessEmail],
    ['Company', companyName],
    ['Phone', phoneNumber || '—'],
    ['Service of interest', serviceOfInterest],
    ['Project budget', projectBudget || '—'],
    ['Submitted at', submittedAt],
    ['Submission ID', id],
  ];
  const rowsHtml = fields
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 12px;font-weight:600;vertical-align:top">${k}</td><td style="padding:6px 12px">${escapeHtml(v)}</td></tr>`,
    )
    .join('');

  try {
    await mailer.sendMail({
      from: `"Zenovais Website" <${SMTP_USER}>`,
      to: CONTACT_RECEIVER,
      replyTo: `"${fullName.replace(/"/g, '')}" <${businessEmail}>`,
      subject: `New enquiry: ${serviceOfInterest} — ${fullName} (${companyName})`,
      text: fields.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${message}`,
      html:
        `<h2>New contact enquiry</h2><table style="border-collapse:collapse">${rowsHtml}</table>` +
        `<h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });
  } catch (err) {
    console.error('Failed to send contact email:', err);
    return json(502, {
      ok: false,
      message: 'We could not deliver your enquiry right now. Please try again shortly.',
    });
  }

  return json(201, {
    ok: true,
    submissionId: id,
    receivedAt: submittedAt,
    message: 'Your enquiry has been received and logged by our team.',
  });
};

export const config = { path: '/api/contact' };

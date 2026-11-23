import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import { mailConfig } from './mail.config';
import {
  getSeoForPath,
  injectSeoIntoHtml,
  generateSitemapXml,
  generateRobotsTxt,
} from './src/data/seoData';

dotenv.config();

// SMTP mailer (Gmail app password) — settings live in mail.config.ts.
const SMTP_USER = mailConfig.user;
const CONTACT_RECEIVER = mailConfig.receiver || SMTP_USER;

const mailer =
  mailConfig.user && mailConfig.pass
    ? nodemailer.createTransport({
        host: mailConfig.host,
        port: mailConfig.port,
        secure: mailConfig.port === 465,
        auth: { user: mailConfig.user, pass: mailConfig.pass },
      })
    : null;

if (!mailer) {
  console.warn('mail.config.ts user/pass not set — contact form emails will not be sent.');
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT) || 3000;
const isProd = process.env.NODE_ENV === 'production';

// Simple in-memory rate limiter per IP for form endpoints
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 15;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return false;
  }
  entry.count += 1;
  return true;
}

function sanitizeText(value: unknown, maxLength = 2000): string {
  if (typeof value !== 'string') return '';
  return value.replace(/[<>]/g, '').trim().slice(0, maxLength);
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface ContactRecord {
  id: string;
  fullName: string;
  businessEmail: string;
  companyName: string;
  phoneNumber: string;
  serviceOfInterest: string;
  projectBudget: string;
  message: string;
  submittedAt: string;
}

interface NewsletterRecord {
  email: string;
  subscribedAt: string;
}

interface TalentRecord {
  id: string;
  fullName: string;
  email: string;
  areaOfInterest: string;
  portfolioUrl: string;
  message: string;
  submittedAt: string;
}

const contactSubmissions: ContactRecord[] = [];
const newsletterSubscribers = new Map<string, NewsletterRecord>();
const talentEnquiries: TalentRecord[] = [];

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', (_req: Request, res: Response) => {
    res.json({ status: 'ok', service: 'zenovais-web', timestamp: new Date().toISOString() });
  });

  app.post('/api/contact', async (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please wait a minute before trying again.',
      });
      return;
    }

    const body = req.body as Record<string, unknown>;
    // Honeypot spam trap
    if (typeof body._website === 'string' && body._website.trim().length > 0) {
      res.status(400).json({ ok: false, message: 'Invalid submission detected.' });
      return;
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
      res.status(400).json({
        ok: false,
        message: 'Please correct the highlighted fields and try again.',
        errors,
      });
      return;
    }

    const record: ContactRecord = {
      id: `znv_${Date.now().toString(36)}`,
      fullName,
      businessEmail,
      companyName,
      phoneNumber,
      serviceOfInterest,
      projectBudget,
      message,
      submittedAt: new Date().toISOString(),
    };
    contactSubmissions.push(record);

    if (mailer) {
      const fields: [string, string][] = [
        ['Full name', record.fullName],
        ['Business email', record.businessEmail],
        ['Company', record.companyName],
        ['Phone', record.phoneNumber || '—'],
        ['Service of interest', record.serviceOfInterest],
        ['Project budget', record.projectBudget || '—'],
        ['Submitted at', record.submittedAt],
        ['Submission ID', record.id],
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
          replyTo: `"${record.fullName.replace(/"/g, '')}" <${record.businessEmail}>`,
          subject: `New enquiry: ${record.serviceOfInterest} — ${record.fullName} (${record.companyName})`,
          text:
            fields.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nMessage:\n${record.message}`,
          html:
            `<h2>New contact enquiry</h2><table style="border-collapse:collapse">${rowsHtml}</table>` +
            `<h3>Message</h3><p style="white-space:pre-wrap">${escapeHtml(record.message)}</p>`,
        });
      } catch (err) {
        console.error('Failed to send contact email:', err);
        res.status(502).json({
          ok: false,
          message: 'We could not deliver your enquiry right now. Please try again shortly.',
        });
        return;
      }
    }

    res.status(201).json({
      ok: true,
      submissionId: record.id,
      receivedAt: record.submittedAt,
      message: 'Your enquiry has been received and logged by our team.',
    });
  });

  app.post('/api/newsletter', (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({
        ok: false,
        message: 'Too many requests. Please try again shortly.',
      });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (typeof body._website === 'string' && body._website.trim().length > 0) {
      res.status(400).json({ ok: false, message: 'Invalid request.' });
      return;
    }

    const email = sanitizeText(body.email, 160).toLowerCase();
    if (!EMAIL_REGEX.test(email)) {
      res.status(400).json({ ok: false, message: 'Please provide a valid email address.' });
      return;
    }

    const alreadySubscribed = newsletterSubscribers.has(email);
    if (!alreadySubscribed) {
      newsletterSubscribers.set(email, {
        email,
        subscribedAt: new Date().toISOString(),
      });
    }

    res.status(200).json({
      ok: true,
      alreadySubscribed,
      message: alreadySubscribed
        ? 'This email address is already subscribed to Zenovais updates.'
        : 'Subscribed successfully to Zenovais research and product updates.',
    });
  });

  app.post('/api/careers/enquiry', (req: Request, res: Response) => {
    const clientIp = req.ip || 'unknown';
    if (!checkRateLimit(clientIp)) {
      res.status(429).json({ ok: false, message: 'Too many requests. Please try again shortly.' });
      return;
    }

    const body = req.body as Record<string, unknown>;
    if (typeof body._website === 'string' && body._website.trim().length > 0) {
      res.status(400).json({ ok: false, message: 'Invalid submission.' });
      return;
    }

    const fullName = sanitizeText(body.fullName, 120);
    const email = sanitizeText(body.email, 160).toLowerCase();
    const areaOfInterest = sanitizeText(body.areaOfInterest, 100);
    const portfolioUrl = sanitizeText(body.portfolioUrl, 300);
    const message = sanitizeText(body.message, 2500);

    const errors: Record<string, string> = {};
    if (fullName.length < 2) errors.fullName = 'Please enter your full name.';
    if (!EMAIL_REGEX.test(email)) errors.email = 'Please enter a valid email address.';
    if (!areaOfInterest) errors.areaOfInterest = 'Please select an area of interest.';
    if (message.length < 15) errors.message = 'Please share a brief note about your experience.';

    if (Object.keys(errors).length > 0) {
      res.status(400).json({ ok: false, message: 'Please review the required fields.', errors });
      return;
    }

    const record: TalentRecord = {
      id: `tal_${Date.now().toString(36)}`,
      fullName,
      email,
      areaOfInterest,
      portfolioUrl,
      message,
      submittedAt: new Date().toISOString(),
    };
    talentEnquiries.push(record);

    res.status(201).json({
      ok: true,
      submissionId: record.id,
      message: 'Your profile enquiry has been recorded in our talent community.',
    });
  });

  app.get('/sitemap.xml', (_req: Request, res: Response) => {
    res.type('application/xml').send(generateSitemapXml());
  });

  app.get('/robots.txt', (_req: Request, res: Response) => {
    res.type('text/plain').send(generateRobotsTxt());
  });

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);

    app.get('*', async (req: Request, res: Response, next) => {
      const url = req.originalUrl;
      if (url.startsWith('/api') || path.extname(url.split('?')[0]) !== '') {
        return next();
      }
      try {
        let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
        template = await vite.transformIndexHtml(url, template);
        const seo = getSeoForPath(req.path);
        const html = injectSeoIntoHtml(template, seo);
        res.status(seo.isNotFound ? 404 : 200).set({ 'Content-Type': 'text/html' }).end(html);
      } catch (e) {
        vite.ssrFixStacktrace(e as Error);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath, { index: false, redirect: false }));
    app.get('*', (req: Request, res: Response) => {
      const cleanPath = req.path.replace(/^\/|\/$/g, '');
      const specificFile = cleanPath
        ? path.join(distPath, cleanPath, 'index.html')
        : path.join(distPath, 'index.html');

      const seo = getSeoForPath(req.path);
      const statusCode = seo.isNotFound ? 404 : 200;

      if (fs.existsSync(specificFile)) {
        res.status(statusCode).sendFile(specificFile);
        return;
      }

      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        const rawHtml = fs.readFileSync(indexFile, 'utf-8');
        const html = injectSeoIntoHtml(rawHtml, seo);
        res.status(statusCode).set({ 'Content-Type': 'text/html' }).send(html);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Zenovais Technologies server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

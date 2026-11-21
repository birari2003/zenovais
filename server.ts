import express, { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

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

  app.post('/api/contact', (req: Request, res: Response) => {
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

  if (!isProd) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
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

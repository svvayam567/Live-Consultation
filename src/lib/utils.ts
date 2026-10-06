import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Format number in Indian currency format (e.g. ₹1,00,000)
 */
export function money(n: number): string {
  if (isNaN(n) || !isFinite(n)) return '₹0';
  return '₹' + Math.round(n).toLocaleString('en-IN');
}

/**
 * Parses indicative project budget strings from input:
 * Accepts: "12 lakh", "12 lakhs", "1.5 cr", "1.5 crore", "1200000", "₹12,00,000"
 */
export function indicativeAmount(rawEstimate: string | undefined): number | null {
  if (!rawEstimate) return null;
  const raw = rawEstimate.trim().toLowerCase().replace(/₹|rs\.?|inr|,/g, '').trim();
  const m = raw.match(/^(\d+(?:\.\d+)?)\s*(lakh|lakhs|lac|lacs|l|crore|crores|cr)?$/);
  if (!m) return null;

  const multiplier = m[2]
    ? (/^(crore|crores|cr)$/.test(m[2]) ? 10000000 : 100000)
    : 1;

  const n = Number(m[1]) * multiplier;
  return n > 0 && Number.isFinite(n) ? n : null;
}

/**
 * Design fee formula:
 * ₹1,00,000 or 20% of the indicative project budget, whichever is lower.
 */
export function calculateDesignFee(rawEstimate: string | undefined): number | null {
  const amount = indicativeAmount(rawEstimate);
  if (amount === null) return null;
  return Math.min(100000, amount * 0.2);
}

export function sanitizeFilename(name: string): string {
  return (name || 'Client').replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 60);
}

export function downloadJsonFile(data: unknown, filename: string): void {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function assetUrl(path: string): string {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:')) {
    return path;
  }
  const clean = path.startsWith('/') ? path.slice(1) : path;
  return `${import.meta.env.BASE_URL}${clean}`;
}

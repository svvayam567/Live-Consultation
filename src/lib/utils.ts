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

/**
 * Normalizes any phone number input to strict E.164 (+91XXXXXXXXXX) format.
 * Strips whitespace, parentheses, dashes, leading zeros. Defaults to +91 country code.
 */
export function normalizeToE164(phone: string): string {
  if (!phone) return '+91';
  const trimmed = phone.trim();
  const digitsOnly = trimmed.replace(/\D/g, '');

  if (!digitsOnly) return '+91';

  // If already starts with +
  if (trimmed.startsWith('+')) {
    return '+' + digitsOnly;
  }

  // If 12 digits starting with 91 (e.g. 919845012345)
  if (digitsOnly.length === 12 && digitsOnly.startsWith('91')) {
    return '+' + digitsOnly;
  }

  // If 11 digits starting with 0 (e.g. 09845012345)
  if (digitsOnly.length === 11 && digitsOnly.startsWith('0')) {
    return '+91' + digitsOnly.slice(1);
  }

  // If standard 10 digits
  if (digitsOnly.length === 10) {
    return '+91' + digitsOnly;
  }

  // Fallback
  return '+' + (digitsOnly.startsWith('91') ? digitsOnly : '91' + digitsOnly);
}

/**
 * Extract surname / family name from full client name (e.g. "Mala Sharma" -> "Sharma")
 * Exact spelling and casing preserved, only trimming whitespace.
 */
export function extractSurname(fullName: string): string {
  if (!fullName) return '';
  // Remove known titles if present at start
  const cleaned = fullName.replace(/^(Mr\.|Mrs\.|Ms\.|Dr\.|Mr|Mrs|Ms|Dr)\s+/i, '').trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '';
  return parts[parts.length - 1];
}

export interface ProjectNameSource {
  title?: string | null;
  surname?: string | null;
  product?: string | null;
  product_type?: string | null;
  projectName?: string | null;
  project_name?: string | null;
  client?: string | null;
  client_name?: string | null;
  name?: string | null;
}

/**
 * Single source of truth for project naming across the entire Svvayam app:
 * Format: "<Title> <Surname>'s <Product>"
 *
 * Examples:
 * - Ms. Reddy's Temple
 * - Mr. Shenoy's Sanctum
 * - Mrs. Sharma's Temple
 *
 * Rules:
 * - Surname: keep exact spelling entered by admin; only trim extra spaces.
 * - Title: use as selected with a full stop and space after it (e.g. "Mr. ", "Ms. ").
 * - Possessive: always append 's directly after surname.
 * - Product: exact selected product type (defaults to 'Temple').
 * - Fallbacks: if surname missing -> "Client"; if product missing -> "Temple".
 * - Never returns or displays "undefined" or "null".
 */
export function formatProjectName(
  titleOrSource?: string | null | ProjectNameSource,
  surnameParam?: string | null,
  productParam?: string | null
): string {
  let title: string | undefined;
  let surname: string | undefined;
  let product: string | undefined;

  if (titleOrSource && typeof titleOrSource === 'object') {
    title = titleOrSource.title ?? undefined;
    surname = titleOrSource.surname ?? undefined;
    product = titleOrSource.product ?? titleOrSource.product_type ?? undefined;

    // If surname is missing on the object, attempt extraction from full name
    if (!surname || !surname.trim()) {
      const fallbackName = titleOrSource.client_name || titleOrSource.name || titleOrSource.client;
      if (fallbackName && fallbackName.trim()) {
        surname = extractSurname(fallbackName.trim());
      }
    }
  } else if (typeof titleOrSource === 'string' && surnameParam === undefined && productParam === undefined) {
    // If a single string was passed (e.g. legacy full name or already-formatted project name)
    const raw = titleOrSource.trim();
    if (raw.includes("'s ") || raw.includes("’s ")) {
      return raw.replace(/’s\s+/g, "'s ");
    }
    const titleMatch = raw.match(/^(Mr\.|Mrs\.|Ms\.|Dr\.)/i);
    if (titleMatch) {
      title = titleMatch[1];
    }
    surname = extractSurname(raw);
    product = 'Temple';
  } else {
    title = (typeof titleOrSource === 'string' ? titleOrSource : undefined);
    surname = (surnameParam ?? undefined);
    product = (productParam ?? undefined);
  }

  // 1. Title formatting (ensure dot and trailing space if title present)
  let cleanTitle = (title || '').trim();
  if (cleanTitle) {
    if (!cleanTitle.endsWith('.')) {
      cleanTitle = cleanTitle + '.';
    }
    cleanTitle = cleanTitle + ' ';
  }

  // 2. Surname formatting (exact spelling preserved, extra spaces trimmed)
  let cleanSurname = (surname || '').trim();
  if (!cleanSurname) {
    cleanSurname = 'Client';
  }

  // 3. Product formatting (exact product type, sensible fallback 'Temple')
  let cleanProduct = (product || '').trim();
  if (!cleanProduct) {
    cleanProduct = 'Temple';
  }

  // 4. Output: <Title> <Surname>'s <Product>
  return `${cleanTitle}${cleanSurname}'s ${cleanProduct}`;
}

/**
 * Converts a customer's mobile number to the internal hidden email format.
 * E.g. "+91 9845012345" or "9845012345" -> "9845012345@svvayam.internal"
 */
export function phoneToHiddenEmail(phone: string): string {
  const digits10 = (phone || '').replace(/\D/g, '').slice(-10);
  return `${digits10}@svvayam.internal`;
}

/**
 * Extract clean 10-digit mobile number string.
 */
export function extract10Digits(phone: string): string {
  return (phone || '').replace(/\D/g, '').slice(-10);
}

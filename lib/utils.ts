import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Ensures an external URL starts with http:// or https://.
 * Prevents relative navigation on links entered without a protocol (e.g. "example.com" -> "https://example.com").
 */
export function formatExternalUrl(url?: string): string {
  if (!url) return '';
  const trimmed = url.trim();
  if (!trimmed || trimmed === '#') return '';
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  return `https://${trimmed}`;
}

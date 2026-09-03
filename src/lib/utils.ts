import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency: string = 'INR'): string {
  if (isNaN(amount)) return '₹0';

  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatNumber(value: number): string {
  if (isNaN(value)) return '0';
  return new Intl.NumberFormat('en-IN').format(Math.round(value));
}

export function formatKw(kw: number): string {
  return `${kw.toFixed(kw % 1 === 0 ? 0 : 1)} kW`;
}

export function formatSqFt(sqFt: number): string {
  return `${formatNumber(sqFt)} sq. ft.`;
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

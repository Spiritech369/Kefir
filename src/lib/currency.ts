import { commerceConfig } from "@/src/config/commerce";

export interface FormatCurrencyOptions {
  includeCode?: boolean;
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
}

export function roundCurrency(amount: number): number {
  if (!Number.isFinite(amount)) {
    return 0;
  }

  return Math.round((amount + Number.EPSILON) * 100) / 100;
}

export function formatCurrency(
  amount: number,
  options: FormatCurrencyOptions = {},
): string {
  const safeAmount = roundCurrency(amount);
  const hasFraction = !Number.isInteger(safeAmount);
  const formatter = new Intl.NumberFormat(commerceConfig.locale, {
    style: "currency",
    currency: commerceConfig.currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits:
      options.minimumFractionDigits ?? (hasFraction ? 2 : 0),
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  });
  const formatted = formatter.format(safeAmount);

  return options.includeCode === false
    ? formatted
    : `${formatted} ${commerceConfig.currency}`;
}

export const formatMxn = formatCurrency;

"use client";

import { Minus, Plus } from "lucide-react";

type QuantitySelectorProps = {
  value: number;
  onChange: (quantity: number) => void;
  max?: number;
  min?: number;
  label?: string;
  compact?: boolean;
};

export function QuantitySelector({
  value,
  onChange,
  max = 99,
  min = 1,
  label = "Cantidad",
  compact = false,
}: QuantitySelectorProps) {
  const safeValue = Math.min(max, Math.max(min, value));

  return (
    <div
      aria-label={`${label}: ${safeValue}`}
      className={`inline-flex items-center rounded-full border border-line bg-milk ${
        compact ? "h-9" : "h-11"
      }`}
      role="group"
    >
      <button
        aria-label={`Disminuir ${label.toLowerCase()}`}
        className="grid h-full aspect-square place-items-center rounded-full text-leaf-dark transition hover:bg-leaf-soft disabled:cursor-not-allowed disabled:opacity-35"
        disabled={safeValue <= min}
        onClick={() => onChange(Math.max(min, safeValue - 1))}
        type="button"
      >
        <Minus aria-hidden="true" size={compact ? 14 : 16} />
      </button>
      <output
        aria-live="polite"
        className={`min-w-7 text-center font-semibold tabular-nums ${compact ? "text-xs" : "text-sm"}`}
      >
        {safeValue}
      </output>
      <button
        aria-label={`Aumentar ${label.toLowerCase()}`}
        className="grid h-full aspect-square place-items-center rounded-full text-leaf-dark transition hover:bg-leaf-soft disabled:cursor-not-allowed disabled:opacity-35"
        disabled={safeValue >= max}
        onClick={() => onChange(Math.min(max, safeValue + 1))}
        type="button"
      >
        <Plus aria-hidden="true" size={compact ? 14 : 16} />
      </button>
    </div>
  );
}


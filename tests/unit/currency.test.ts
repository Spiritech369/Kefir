import { describe, expect, it } from "vitest";

import { formatCurrency, roundCurrency } from "../../src/lib/currency";

describe("currency", () => {
  it("formats whole Mexican peso amounts without invented decimals", () => {
    expect(formatCurrency(85)).toBe("$85 MXN");
    expect(formatCurrency(1_234)).toBe("$1,234 MXN");
  });

  it("keeps real cent values and can omit the currency code", () => {
    expect(formatCurrency(85.5)).toBe("$85.50 MXN");
    expect(formatCurrency(95, { includeCode: false })).toBe("$95");
  });

  it("rounds floating point money safely", () => {
    expect(roundCurrency(0.1 + 0.2)).toBe(0.3);
    expect(roundCurrency(Number.NaN)).toBe(0);
  });
});

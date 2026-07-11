import { describe, expect, it } from "vitest";

import { checkDeliveryCoverage } from "../../src/data/delivery-zones";

describe("delivery coverage demo", () => {
  it("labels configured entries as demonstration data", () => {
    const result = checkDeliveryCoverage("03100");
    expect(result.status).toBe("listed-demo");
    expect(result.message).toContain("demostrativo");
  });

  it("uses the required manual confirmation message outside the list", () => {
    const result = checkDeliveryCoverage("99999");
    expect(result.status).toBe("manual-confirmation");
    expect(result.message).toBe(
      "Necesitamos confirmar manualmente la cobertura de tu zona.",
    );
    expect(result.canContinueOnWhatsApp).toBe(true);
  });

  it("rejects malformed postal codes without blocking WhatsApp", () => {
    const result = checkDeliveryCoverage("12");
    expect(result.status).toBe("invalid");
    expect(result.canContinueOnWhatsApp).toBe(true);
  });
});

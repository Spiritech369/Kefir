import { describe, expect, it } from "vitest";

import {
  checkoutSchema,
  normalizePhone,
  validateCheckoutForm,
} from "../../src/lib/validation";

const validCheckout = {
  name: "María José",
  phone: "+52 55 1234 5678",
  postalCode: "03100",
  neighborhood: "Del Valle",
  address: "Calle Limón 25",
  references: "Portón café",
  preferredDeliveryDay: "Sábado",
  preferredTime: "10:00 a 12:00",
  deliveryMethod: "home-delivery" as const,
  notes: "Entregar frío",
  ingredientsAndAllergensAccepted: true as const,
  privacyAccepted: true as const,
};

describe("checkout validation", () => {
  it("accepts a complete order and normalizes phone digits separately", () => {
    expect(checkoutSchema.safeParse(validCheckout).success).toBe(true);
    expect(normalizePhone(validCheckout.phone)).toBe("525512345678");
  });

  it("rejects invalid phone and postal code", () => {
    const result = validateCheckoutForm({
      ...validCheckout,
      phone: "123",
      postalCode: "ABC",
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const fields = result.error.issues.map((issue) => issue.path[0]);
      expect(fields).toContain("phone");
      expect(fields).toContain("postalCode");
    }
  });

  it("requires explicit allergen review and privacy acceptance", () => {
    const result = validateCheckoutForm({
      ...validCheckout,
      ingredientsAndAllergensAccepted: false,
      privacyAccepted: false,
    });

    expect(result.success).toBe(false);
    if (!result.success) {
      const messages = result.error.issues.map((issue) => issue.message);
      expect(messages).toContain(
        "Confirma que revisaste ingredientes y alérgenos.",
      );
      expect(messages).toContain(
        "Debes aceptar el aviso de privacidad para continuar.",
      );
    }
  });

  it("rejects missing required delivery details", () => {
    const result = validateCheckoutForm({
      ...validCheckout,
      name: "",
      address: "",
      preferredTime: "",
    });

    expect(result.success).toBe(false);
  });
});

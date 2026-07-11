import { describe, expect, it } from "vitest";

import {
  buildWhatsAppMessage,
  buildWhatsAppOrderUrl,
  createWhatsAppUrl,
} from "../../src/lib/whatsapp";
import type { PreparedOrder } from "../../src/types/order";

const order: PreparedOrder = {
  lines: [
    {
      productId: "kefir-natural-500",
      productName: "Kéfir natural, 500 ml",
      quantity: 2,
      unitPriceMxn: 85,
      lineTotalMxn: 170,
    },
  ],
  totals: {
    subtotalMxn: 170,
    deliveryMxn: 60,
    totalMxn: 230,
    amountUntilFreeDeliveryMxn: 280,
    qualifiesForFreeDelivery: false,
  },
  customer: {
    name: "María José",
    phone: "55 1234 5678",
    postalCode: "03100",
    neighborhood: "Del Valle",
    address: "Calle Limón #25",
    references: "Portón café & macetas",
    preferredDeliveryDay: "Sábado",
    preferredTime: "10:00–12:00",
    deliveryMethod: "home-delivery",
    notes: "Tocar el timbre, por favor.",
    ingredientsAndAllergensAccepted: true,
    privacyAccepted: true,
  },
};

describe("WhatsApp order message", () => {
  it("generates the requested structured summary", () => {
    const message = buildWhatsAppMessage(order);

    expect(message).toContain(
      "Hola, quiero realizar el siguiente pedido en Kéfir Vivo:",
    );
    expect(message).toContain(
      "2 × Kéfir natural, 500 ml — $170 MXN",
    );
    expect(message).toContain("Total estimado: $230 MXN");
    expect(message).toContain("Nombre: María José");
    expect(message).toContain(
      "Confirmo que revisé los ingredientes, alérgenos y condiciones de conservación.",
    );
  });

  it("encodes accents, spaces, hashes and ampersands safely", () => {
    const message = buildWhatsAppMessage(order);
    const url = buildWhatsAppOrderUrl(order, "+52 55 1234 5678");

    expect(url).not.toBeNull();
    expect(url).toContain("https://wa.me/525512345678?text=");
    expect(url).toContain("%C3%A9");
    expect(url).toContain("%23");
    expect(url).toContain("%26");
    expect(decodeURIComponent(url!.split("?text=")[1]!)).toBe(message);
  });

  it("returns null when WhatsApp has not been configured correctly", () => {
    expect(createWhatsAppUrl("", "Pedido")).toBeNull();
    expect(createWhatsAppUrl("123", "Pedido")).toBeNull();
  });
});

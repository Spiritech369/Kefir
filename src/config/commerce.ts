export const commerceConfig = {
  currency: "MXN",
  locale: "es-MX",
  deliveryFeeMxn: 60,
  freeDeliveryThresholdMxn: 450,
  maxQuantityPerItem: 12,
  defaultQuantity: 1,
  whatsappBaseUrl: "https://wa.me",
  pricesAreDemo: true,
  deliveryValuesAreDemo: true,
  demoDataNotice:
    "Precios, inventario, cobertura y costos de entrega son datos demostrativos editables. Deben validarse antes de publicar.",
  availabilityNotice:
    "El pedido queda sujeto a confirmación de disponibilidad, cobertura y horario.",
  allergenCheckoutNotice:
    "Revisa los ingredientes, alérgenos y condiciones de conservación antes de finalizar.",
} as const;

export type CommerceConfig = typeof commerceConfig;

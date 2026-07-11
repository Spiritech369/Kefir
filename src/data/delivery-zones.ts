export type DeliveryCoverageStatus =
  | "listed-demo"
  | "manual-confirmation"
  | "invalid";

export interface DeliveryZone {
  postalCode: string;
  label: string;
  isDemo: true;
}

export interface DeliveryCoverageResult {
  status: DeliveryCoverageStatus;
  postalCode: string;
  title: string;
  message: string;
  canContinueOnWhatsApp: true;
}

/** Demonstration values only. They do not assert real delivery coverage. */
export const deliveryZones = [
  { postalCode: "03100", label: "Zona demostrativa 1", isDemo: true },
  { postalCode: "06100", label: "Zona demostrativa 2", isDemo: true },
  { postalCode: "06700", label: "Zona demostrativa 3", isDemo: true },
  { postalCode: "11000", label: "Zona demostrativa 4", isDemo: true },
  { postalCode: "11560", label: "Zona demostrativa 5", isDemo: true },
] as const satisfies readonly DeliveryZone[];

export function normalizePostalCode(postalCode: string): string {
  return postalCode.replace(/\D/g, "").slice(0, 5);
}

export function checkDeliveryCoverage(
  postalCodeInput: string,
): DeliveryCoverageResult {
  const postalCode = normalizePostalCode(postalCodeInput);

  if (!/^\d{5}$/.test(postalCode)) {
    return {
      status: "invalid",
      postalCode,
      title: "Revisa el código postal",
      message: "Ingresa un código postal mexicano de 5 dígitos.",
      canContinueOnWhatsApp: true,
    };
  }

  const isListed = deliveryZones.some(
    (zone) => zone.postalCode === postalCode,
  );

  if (isListed) {
    return {
      status: "listed-demo",
      postalCode,
      title: "Zona incluida en la lista de demostración",
      message:
        "Este dato es demostrativo. Confirma cobertura, costo y horario por WhatsApp antes de completar el pedido.",
      canContinueOnWhatsApp: true,
    };
  }

  return {
    status: "manual-confirmation",
    postalCode,
    title: "Cobertura por confirmar",
    message: "Necesitamos confirmar manualmente la cobertura de tu zona.",
    canContinueOnWhatsApp: true,
  };
}

import { commerceConfig } from "@/src/config/commerce";
import { siteConfig } from "@/src/config/site";
import { formatCurrency } from "@/src/lib/currency";
import type { DeliveryMethod, PreparedOrder } from "@/src/types/order";

export const WHATSAPP_NOT_CONFIGURED_MESSAGE =
  "WhatsApp no está configurado. Agrega NEXT_PUBLIC_WHATSAPP_NUMBER antes de recibir pedidos.";

const deliveryMethodLabels: Record<DeliveryMethod, string> = {
  "home-delivery": "Entrega a domicilio",
  pickup: "Recolección acordada",
};

function cleanMessageValue(value: string | undefined): string {
  const normalized = value?.trim();
  return normalized && normalized.length > 0 ? normalized : "No especificado";
}

export function normalizeWhatsAppNumber(phoneNumber: string): string {
  return phoneNumber.replace(/\D/g, "");
}

export function isValidWhatsAppNumber(phoneNumber: string): boolean {
  return /^\d{8,15}$/.test(normalizeWhatsAppNumber(phoneNumber));
}

export function buildWhatsAppMessage(order: PreparedOrder): string {
  const { customer, lines, totals } = order;
  const productLines = lines
    .map(
      (line) =>
        `${line.quantity} × ${line.productName} — ${formatCurrency(line.lineTotalMxn)}`,
    )
    .join("\n");

  return [
    `Hola, quiero realizar el siguiente pedido en ${siteConfig.name}:`,
    "",
    productLines,
    "",
    `Subtotal: ${formatCurrency(totals.subtotalMxn)}`,
    `Entrega: ${formatCurrency(totals.deliveryMxn)}`,
    `Total estimado: ${formatCurrency(totals.totalMxn)}`,
    "",
    `Nombre: ${cleanMessageValue(customer.name)}`,
    `Teléfono: ${cleanMessageValue(customer.phone)}`,
    `Código postal: ${cleanMessageValue(customer.postalCode)}`,
    `Colonia: ${cleanMessageValue(customer.neighborhood)}`,
    `Dirección: ${cleanMessageValue(customer.address)}`,
    `Referencias: ${cleanMessageValue(customer.references)}`,
    `Día preferido: ${cleanMessageValue(customer.preferredDeliveryDay)}`,
    `Horario: ${cleanMessageValue(customer.preferredTime)}`,
    `Método de entrega: ${deliveryMethodLabels[customer.deliveryMethod]}`,
    `Notas: ${cleanMessageValue(customer.notes)}`,
    "",
    "Confirmo que revisé los ingredientes, alérgenos y condiciones de conservación.",
    "",
    commerceConfig.availabilityNotice,
  ].join("\n");
}

export function createWhatsAppUrl(
  whatsappNumber: string,
  message: string,
): string | null {
  const normalizedNumber = normalizeWhatsAppNumber(whatsappNumber);

  if (!isValidWhatsAppNumber(normalizedNumber)) {
    return null;
  }

  return `${commerceConfig.whatsappBaseUrl}/${normalizedNumber}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppOrderUrl(
  order: PreparedOrder,
  whatsappNumber = siteConfig.whatsapp.number,
): string | null {
  return createWhatsAppUrl(whatsappNumber, buildWhatsAppMessage(order));
}

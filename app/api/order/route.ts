import { siteConfig } from "@/src/config/site";
import {
  calculateOrderTotals,
  getPricedCartLines,
  sanitizeCartItems,
} from "@/src/lib/cart";
import { checkoutSchema } from "@/src/lib/validation";
import {
  buildWhatsAppMessage,
  createWhatsAppUrl,
  WHATSAPP_NOT_CONFIGURED_MESSAGE,
} from "@/src/lib/whatsapp";
import type { PreparedOrder } from "@/src/types/order";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as unknown;
    if (!body || typeof body !== "object") {
      return Response.json({ ok: false, message: "La solicitud no es válida." }, { status: 400 });
    }

    const candidate = body as { items?: unknown; customer?: unknown };
    const customerResult = checkoutSchema.safeParse(candidate.customer);
    if (!customerResult.success) {
      return Response.json(
        {
          ok: false,
          message: "Revisa los datos del pedido.",
          fieldErrors: customerResult.error.flatten().fieldErrors,
        },
        { status: 422 },
      );
    }

    const items = sanitizeCartItems(candidate.items);
    if (items.length === 0) {
      return Response.json(
        { ok: false, message: "El carrito está vacío o sus productos ya no están disponibles." },
        { status: 422 },
      );
    }

    const preparedOrder: PreparedOrder = {
      lines: getPricedCartLines(items),
      totals: calculateOrderTotals(items, customerResult.data.deliveryMethod),
      customer: customerResult.data,
    };
    const message = buildWhatsAppMessage(preparedOrder);
    const whatsappUrl = createWhatsAppUrl(siteConfig.whatsapp.number, message);

    return Response.json({
      ok: true,
      order: preparedOrder,
      whatsappUrl,
      whatsappConfigured: whatsappUrl !== null,
      message: whatsappUrl ? null : WHATSAPP_NOT_CONFIGURED_MESSAGE,
    });
  } catch {
    return Response.json(
      { ok: false, message: "No pudimos preparar el pedido. Intenta nuevamente." },
      { status: 500 },
    );
  }
}


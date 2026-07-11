// @vitest-environment jsdom

import { CartDrawer } from "@/src/components/cart/cart-drawer";
import { CommerceProvider, useCommerce } from "@/src/components/cart/commerce-provider";
import { CheckoutDialog } from "@/src/components/checkout/checkout-dialog";
import { ProductCard } from "@/src/components/products/product-card";
import { products } from "@/src/data/products";
import { calculateOrderTotals, getPricedCartLines, sanitizeCartItems } from "@/src/lib/cart";
import { buildWhatsAppMessage, createWhatsAppUrl } from "@/src/lib/whatsapp";
import { checkoutSchema } from "@/src/lib/validation";
import type { PreparedOrder } from "@/src/types/order";
import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

function FlowHarness() {
  const { openCart } = useCommerce();
  return (
    <>
      <button onClick={openCart} type="button">
        Abrir carrito de prueba
      </button>
      <ProductCard product={products[0]} />
      <CartDrawer />
      <CheckoutDialog />
    </>
  );
}

describe("flujo completo de pedido", () => {
  beforeEach(() => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async (_input: RequestInfo | URL, init?: RequestInit) => {
        const requestBody = JSON.parse(String(init?.body)) as {
          items: unknown;
          customer: unknown;
        };
        const items = sanitizeCartItems(requestBody.items);
        const customer = checkoutSchema.parse(requestBody.customer);
        const order: PreparedOrder = {
          lines: getPricedCartLines(items),
          totals: calculateOrderTotals(items, customer.deliveryMethod),
          customer,
        };
        const whatsappUrl = createWhatsAppUrl(
          "525512345678",
          buildWhatsAppMessage(order),
        );

        return new Response(
          JSON.stringify({
            ok: true,
            order,
            whatsappUrl,
            whatsappConfigured: true,
            message: null,
          }),
          { status: 200, headers: { "Content-Type": "application/json" } },
        );
      }),
    );
  });

  it("agrega, modifica, completa datos y genera el enlace de WhatsApp", async () => {
    const user = userEvent.setup();
    render(
      <CommerceProvider>
        <FlowHarness />
      </CommerceProvider>,
    );

    await user.click(screen.getByTestId(`add-${products[0].id}`));
    await user.click(screen.getByRole("button", { name: "Abrir carrito de prueba" }));

    const cart = await screen.findByTestId("cart-drawer");
    const cartLine = within(cart).getByTestId(`cart-line-${products[0].id}`);
    await user.click(
      within(cartLine).getByRole("button", {
        name: `Aumentar cantidad de ${products[0].name.toLowerCase()}`,
      }),
    );
    expect(within(cartLine).getByText("2")).toBeInTheDocument();

    await user.click(within(cart).getByTestId("checkout-button"));
    const form = await screen.findByTestId("checkout-form");
    const scoped = within(form);

    await user.type(scoped.getByLabelText("Nombre *"), "Julia Rivera");
    await user.type(scoped.getByLabelText("Teléfono *"), "5512345678");
    await user.type(scoped.getByLabelText("Código postal *"), "03100");
    await user.type(scoped.getByLabelText("Colonia *"), "Del Valle");
    await user.type(scoped.getByLabelText("Dirección o punto de entrega *"), "Calle Prueba 123");
    await user.type(scoped.getByLabelText("Día de entrega preferido *"), "Sábado");
    await user.type(scoped.getByLabelText("Horario preferido *"), "10:00 a 13:00");
    await user.click(
      scoped.getByRole("checkbox", {
        name: "Confirmo que revisé los ingredientes, alérgenos y condiciones de conservación. *",
      }),
    );
    await user.click(
      scoped.getByRole("checkbox", {
        name: "Acepto el aviso de privacidad . *",
      }),
    );
    await user.click(scoped.getByRole("button", { name: "Revisar pedido" }));

    const whatsappLink = await screen.findByTestId("whatsapp-link");
    await waitFor(() => expect(whatsappLink).toHaveAttribute("href"));
    const href = whatsappLink.getAttribute("href") ?? "";
    expect(href).toContain("https://wa.me/525512345678?text=");
    expect(decodeURIComponent(href)).toContain(`2 × ${products[0].name}`);
    expect(decodeURIComponent(href)).toContain("Julia Rivera");
  });
});

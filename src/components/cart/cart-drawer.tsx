"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { Dialog } from "@/src/components/ui/dialog";
import { ProductImage } from "@/src/components/ui/product-image";
import { QuantitySelector } from "@/src/components/ui/quantity-selector";
import { commerceConfig } from "@/src/config/commerce";
import { getProductQuantityLimit } from "@/src/lib/cart";
import { formatCurrency } from "@/src/lib/currency";
import { AlertTriangle, ArrowRight, ShoppingBag, Trash2 } from "lucide-react";
import Link from "next/link";

export function CartDrawer() {
  const {
    activePanel,
    closePanel,
    hydrated,
    items,
    totals,
    getProduct,
    setQuantity,
    removeItem,
    clearCart,
    openCheckout,
  } = useCommerce();

  const progress = Math.min(
    100,
    (totals.subtotalMxn / commerceConfig.freeDeliveryThresholdMxn) * 100,
  );

  return (
    <Dialog
      description="Tus productos se conservan en este dispositivo hasta que decidas vaciar el carrito."
      onClose={closePanel}
      open={activePanel === "cart"}
      title="Tu carrito"
      variant="drawer"
    >
      <div className="flex min-h-0 flex-1 flex-col" data-testid="cart-drawer">
        {!hydrated ? (
          <div aria-live="polite" className="grid flex-1 place-items-center p-8 text-center">
            <div>
              <span className="mx-auto block size-10 animate-pulse rounded-full bg-leaf-soft" />
              <p className="mt-4 text-sm text-muted">Recuperando tu carrito…</p>
            </div>
          </div>
        ) : items.length === 0 ? (
          <div className="grid flex-1 place-items-center px-7 py-12 text-center">
            <div className="max-w-xs">
              <span className="mx-auto grid size-20 place-items-center rounded-full bg-leaf-soft text-leaf-dark">
                <ShoppingBag aria-hidden="true" size={32} strokeWidth={1.6} />
              </span>
              <h3 className="mt-6 text-2xl font-semibold text-leaf-dark">Tu carrito está fresco y vacío</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                Elige una presentación y vuelve cuando quieras; guardaremos tu selección en este dispositivo.
              </p>
              <Link className="button-primary mt-6 w-full" href="/#productos" onClick={closePanel}>
                Conocer productos
              </Link>
            </div>
          </div>
        ) : (
          <>
            <div className="no-scrollbar flex-1 overflow-y-auto px-5 py-5 sm:px-6">
              <div className="rounded-2xl border border-leaf/15 bg-leaf-soft/45 p-4">
                <p className="text-sm font-semibold text-leaf-dark">
                  {totals.qualifiesForFreeDelivery
                    ? "Ya alcanzaste la entrega gratuita"
                    : `Te faltan ${formatCurrency(totals.amountUntilFreeDeliveryMxn)} para obtener entrega gratuita`}
                </p>
                <div
                  aria-label={`Progreso hacia entrega gratuita: ${Math.round(progress)} %`}
                  className="mt-3 h-2 overflow-hidden rounded-full bg-white/75"
                  role="progressbar"
                  aria-valuemax={100}
                  aria-valuemin={0}
                  aria-valuenow={Math.round(progress)}
                >
                  <div
                    className="h-full rounded-full bg-leaf transition-[width] duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="mt-2 text-[0.7rem] leading-5 text-muted">
                  Umbral y costo de entrega demostrativos; se confirman con tu zona.
                </p>
              </div>

              <ul className="mt-4 divide-y divide-line" aria-label="Productos en el carrito">
                {items.map((item) => {
                  const product = getProduct(item.productId);
                  if (!product) return null;
                  return (
                    <li
                      className="grid grid-cols-[4.5rem_1fr] gap-3 py-4"
                      data-testid={`cart-line-${product.id}`}
                      key={product.id}
                    >
                      <ProductImage
                        alt={product.image.alt}
                        className="h-[4.5rem] rounded-2xl"
                        sizes="72px"
                        src={product.image.src}
                      />
                      <div className="min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <p className="text-sm font-bold leading-5 text-leaf-dark">{product.name}</p>
                            <p className="mt-0.5 text-xs text-muted">{product.presentation}</p>
                          </div>
                          <button
                            aria-label={`Eliminar ${product.name}`}
                            className="grid size-9 shrink-0 place-items-center rounded-full text-muted transition hover:bg-berry/10 hover:text-berry"
                            onClick={() => removeItem(product.id)}
                            type="button"
                          >
                            <Trash2 aria-hidden="true" size={17} />
                          </button>
                        </div>
                        <div className="mt-3 flex items-center justify-between gap-3">
                          <QuantitySelector
                            compact
                            label={`Cantidad de ${product.name}`}
                            max={getProductQuantityLimit(product)}
                            onChange={(quantity) => setQuantity(product.id, quantity)}
                            value={item.quantity}
                          />
                          <p className="text-sm font-bold tabular-nums text-leaf-dark">
                            {formatCurrency(product.priceMxn * item.quantity)}
                          </p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>

              <button
                className="mt-2 inline-flex min-h-11 items-center gap-2 rounded-lg px-2 text-xs font-semibold text-muted transition hover:text-berry"
                onClick={clearCart}
                type="button"
              >
                <Trash2 aria-hidden="true" size={15} />
                Vaciar carrito
              </button>

              <div className="mt-5 flex gap-3 rounded-2xl border border-ferment/30 bg-ferment/10 p-4 text-xs leading-5 text-leaf-dark">
                <AlertTriangle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                <p>
                  Contiene alérgenos: los productos actuales contienen leche y proteínas de leche.
                  Revisa cada ficha antes de finalizar.
                </p>
              </div>
            </div>

            <div className="safe-bottom border-t border-line bg-cream/65 px-5 py-5 sm:px-6">
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between gap-4 text-muted">
                  <dt>Subtotal</dt>
                  <dd className="font-semibold tabular-nums text-ink">{formatCurrency(totals.subtotalMxn)}</dd>
                </div>
                <div className="flex justify-between gap-4 text-muted">
                  <dt>Entrega estimada</dt>
                  <dd className="font-semibold tabular-nums text-ink">
                    {totals.deliveryMxn === 0 ? "Sin costo" : formatCurrency(totals.deliveryMxn)}
                  </dd>
                </div>
                <div className="flex justify-between gap-4 border-t border-line pt-3 text-base font-bold text-leaf-dark">
                  <dt>Total estimado</dt>
                  <dd className="tabular-nums">{formatCurrency(totals.totalMxn)}</dd>
                </div>
              </dl>
              <button
                className="button-primary mt-5 w-full"
                data-testid="checkout-button"
                onClick={openCheckout}
                type="button"
              >
                Continuar al pedido
                <ArrowRight aria-hidden="true" size={18} />
              </button>
            </div>
          </>
        )}
      </div>
    </Dialog>
  );
}


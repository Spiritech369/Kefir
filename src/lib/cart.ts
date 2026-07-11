import { commerceConfig } from "@/src/config/commerce";
import { products as defaultProducts } from "@/src/data/products";
import { roundCurrency } from "@/src/lib/currency";
import type { CartItem, DeliveryMethod, OrderTotals, PricedCartLine } from "@/src/types/order";
import type { Product } from "@/src/types/product";

export const CART_STORAGE_KEY = "kefir-vivo-cart-v1";

function toSafeInteger(value: number): number {
  if (!Number.isFinite(value)) {
    return 0;
  }

  return Math.trunc(value);
}

export function getProductQuantityLimit(product: Product): number {
  if (product.status !== "active") {
    return 0;
  }

  const configuredLimit = commerceConfig.maxQuantityPerItem;

  if (!product.inventory.tracked) {
    return configuredLimit;
  }

  const stockQuantity = Math.max(
    0,
    toSafeInteger(product.inventory.quantity ?? 0),
  );

  return Math.max(
    0,
    Math.min(configuredLimit, stockQuantity),
  );
}

export function clampCartQuantity(
  requestedQuantity: number,
  product: Product,
): number {
  const quantity = Math.max(0, toSafeInteger(requestedQuantity));
  return Math.min(quantity, getProductQuantityLimit(product));
}

export function addCartItem(
  items: readonly CartItem[],
  product: Product,
  quantity: number = commerceConfig.defaultQuantity,
): CartItem[] {
  if (product.status !== "active") {
    return [...items];
  }

  const safeQuantity = Math.max(0, toSafeInteger(quantity));

  if (safeQuantity === 0) {
    return [...items];
  }

  const currentQuantity =
    items.find((item) => item.productId === product.id)?.quantity ?? 0;
  const nextQuantity = clampCartQuantity(
    currentQuantity + safeQuantity,
    product,
  );

  if (nextQuantity === 0) {
    return [...items];
  }

  const exists = items.some((item) => item.productId === product.id);

  if (!exists) {
    return [...items, { productId: product.id, quantity: nextQuantity }];
  }

  return items.map((item) =>
    item.productId === product.id
      ? { ...item, quantity: nextQuantity }
      : item,
  );
}

export function updateCartItemQuantity(
  items: readonly CartItem[],
  product: Product,
  requestedQuantity: number,
): CartItem[] {
  const quantity = clampCartQuantity(requestedQuantity, product);

  if (quantity === 0) {
    return removeCartItem(items, product.id);
  }

  if (!items.some((item) => item.productId === product.id)) {
    return [...items, { productId: product.id, quantity }];
  }

  return items.map((item) =>
    item.productId === product.id ? { ...item, quantity } : item,
  );
}

export function removeCartItem(
  items: readonly CartItem[],
  productId: string,
): CartItem[] {
  return items.filter((item) => item.productId !== productId);
}

export function clearCart(): CartItem[] {
  return [];
}

export function getCartItemCount(items: readonly CartItem[]): number {
  return items.reduce(
    (total, item) => total + Math.max(0, toSafeInteger(item.quantity)),
    0,
  );
}

export function getPricedCartLines(
  items: readonly CartItem[],
  catalog: readonly Product[] = defaultProducts,
): PricedCartLine[] {
  const productMap = new Map(catalog.map((product) => [product.id, product]));

  return items.flatMap((item) => {
    const product = productMap.get(item.productId);

    if (!product) {
      return [];
    }

    const quantity = clampCartQuantity(item.quantity, product);

    if (quantity === 0) {
      return [];
    }

    return [
      {
        productId: product.id,
        productName: product.name,
        quantity,
        unitPriceMxn: product.priceMxn,
        lineTotalMxn: roundCurrency(product.priceMxn * quantity),
      },
    ];
  });
}

export function calculateSubtotal(
  items: readonly CartItem[],
  catalog: readonly Product[] = defaultProducts,
): number {
  return roundCurrency(
    getPricedCartLines(items, catalog).reduce(
      (subtotal, line) => subtotal + line.lineTotalMxn,
      0,
    ),
  );
}

export function qualifiesForFreeDelivery(subtotalMxn: number): boolean {
  return (
    roundCurrency(subtotalMxn) >= commerceConfig.freeDeliveryThresholdMxn
  );
}

export function calculateDeliveryCost(
  subtotalMxn: number,
  deliveryMethod: DeliveryMethod = "home-delivery",
): number {
  const safeSubtotal = Math.max(0, roundCurrency(subtotalMxn));

  if (
    safeSubtotal === 0 ||
    deliveryMethod === "pickup" ||
    qualifiesForFreeDelivery(safeSubtotal)
  ) {
    return 0;
  }

  return commerceConfig.deliveryFeeMxn;
}

export const calculateDeliveryFee = calculateDeliveryCost;

export function calculateAmountUntilFreeDelivery(subtotalMxn: number): number {
  const safeSubtotal = Math.max(0, roundCurrency(subtotalMxn));

  return roundCurrency(
    Math.max(0, commerceConfig.freeDeliveryThresholdMxn - safeSubtotal),
  );
}

export function calculateOrderTotals(
  items: readonly CartItem[],
  deliveryMethod: DeliveryMethod = "home-delivery",
  catalog: readonly Product[] = defaultProducts,
): OrderTotals {
  const subtotalMxn = calculateSubtotal(items, catalog);
  const deliveryMxn = calculateDeliveryCost(subtotalMxn, deliveryMethod);

  return {
    subtotalMxn,
    deliveryMxn,
    totalMxn: roundCurrency(subtotalMxn + deliveryMxn),
    amountUntilFreeDeliveryMxn:
      deliveryMethod === "pickup"
        ? 0
        : calculateAmountUntilFreeDelivery(subtotalMxn),
    qualifiesForFreeDelivery:
      deliveryMethod === "pickup" || qualifiesForFreeDelivery(subtotalMxn),
  };
}

export function sanitizeCartItems(
  value: unknown,
  catalog: readonly Product[] = defaultProducts,
): CartItem[] {
  if (!Array.isArray(value)) {
    return [];
  }

  const productMap = new Map(catalog.map((product) => [product.id, product]));
  const quantities = new Map<string, number>();

  for (const candidate of value) {
    if (
      typeof candidate !== "object" ||
      candidate === null ||
      !("productId" in candidate) ||
      !("quantity" in candidate) ||
      typeof candidate.productId !== "string" ||
      typeof candidate.quantity !== "number"
    ) {
      continue;
    }

    const product = productMap.get(candidate.productId);

    if (!product || product.status !== "active") {
      continue;
    }

    const accumulated =
      (quantities.get(product.id) ?? 0) + candidate.quantity;
    quantities.set(product.id, clampCartQuantity(accumulated, product));
  }

  return [...quantities.entries()]
    .filter(([, quantity]) => quantity > 0)
    .map(([productId, quantity]) => ({ productId, quantity }));
}

export function parseStoredCart(
  serializedCart: string | null,
  catalog: readonly Product[] = defaultProducts,
): CartItem[] {
  if (!serializedCart) {
    return [];
  }

  try {
    return sanitizeCartItems(JSON.parse(serializedCart) as unknown, catalog);
  } catch {
    return [];
  }
}

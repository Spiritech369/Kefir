import { describe, expect, it } from "vitest";

import { commerceConfig } from "../../src/config/commerce";
import { products } from "../../src/data/products";
import {
  addCartItem,
  calculateAmountUntilFreeDelivery,
  calculateDeliveryCost,
  calculateOrderTotals,
  calculateSubtotal,
  getCartItemCount,
  parseStoredCart,
  sanitizeCartItems,
  updateCartItemQuantity,
} from "../../src/lib/cart";
import type { Product } from "../../src/types/product";

const natural500 = products[0];
const naturalLiter = products[1];

describe("cart quantities", () => {
  it("adds and increments the same product", () => {
    const once = addCartItem([], natural500);
    const three = addCartItem(once, natural500, 2);

    expect(three).toEqual([{ productId: natural500.id, quantity: 3 }]);
    expect(getCartItemCount(three)).toBe(3);
  });

  it("never allows negative quantities", () => {
    const items = [{ productId: natural500.id, quantity: 2 }];
    expect(addCartItem(items, natural500, -4)).toEqual(items);
    expect(updateCartItemQuantity(items, natural500, -4)).toEqual([]);
  });

  it("respects tracked stock and the configured per-item maximum", () => {
    const lowStockProduct: Product = {
      ...natural500,
      inventory: { tracked: true, quantity: 2, isDemo: true },
    };

    expect(addCartItem([], lowStockProduct, 99)).toEqual([
      { productId: lowStockProduct.id, quantity: 2 },
    ]);
    expect(addCartItem([], natural500, 99)[0]?.quantity).toBe(
      commerceConfig.maxQuantityPerItem,
    );
  });

  it("does not add a sold-out product even if stale stock data is positive", () => {
    const soldOutProduct: Product = {
      ...natural500,
      status: "sold-out",
      inventory: { tracked: true, quantity: 5, isDemo: true },
    };

    expect(addCartItem([], soldOutProduct, 1)).toEqual([]);
  });

  it("normalizes fractional inventory to whole sellable units", () => {
    const fractionalStock: Product = {
      ...natural500,
      inventory: { tracked: true, quantity: 2.8, isDemo: true },
    };

    expect(addCartItem([], fractionalStock, 9)).toEqual([
      { productId: fractionalStock.id, quantity: 2 },
    ]);
  });

  it("sanitizes duplicates, unknown products and broken local data", () => {
    const restored = sanitizeCartItems([
      { productId: natural500.id, quantity: 2 },
      { productId: natural500.id, quantity: 3 },
      { productId: "not-a-product", quantity: 20 },
      { nope: true },
    ]);

    expect(restored).toEqual([{ productId: natural500.id, quantity: 5 }]);
    expect(parseStoredCart("not json")).toEqual([]);
  });
});

describe("cart totals and delivery", () => {
  it("calculates product subtotal", () => {
    expect(
      calculateSubtotal([
        { productId: natural500.id, quantity: 2 },
        { productId: naturalLiter.id, quantity: 1 },
      ]),
    ).toBe(320);
  });

  it("does not charge delivery for an empty cart", () => {
    expect(calculateDeliveryCost(0, "home-delivery")).toBe(0);
    expect(calculateOrderTotals([]).totalMxn).toBe(0);
  });

  it("charges delivery below the threshold and makes it free at the threshold", () => {
    expect(calculateDeliveryCost(449, "home-delivery")).toBe(
      commerceConfig.deliveryFeeMxn,
    );
    expect(calculateAmountUntilFreeDelivery(449)).toBe(1);
    expect(calculateDeliveryCost(450, "home-delivery")).toBe(0);
    expect(calculateAmountUntilFreeDelivery(450)).toBe(0);
  });

  it("does not charge delivery for pickup", () => {
    expect(calculateDeliveryCost(85, "pickup")).toBe(0);
  });
});

"use client";

import { products } from "@/src/data/products";
import {
  addCartItem,
  calculateOrderTotals,
  CART_STORAGE_KEY,
  clearCart as emptyCart,
  getCartItemCount,
  getPricedCartLines,
  getProductQuantityLimit,
  parseStoredCart,
  removeCartItem,
  updateCartItemQuantity,
} from "@/src/lib/cart";
import type { CartItem, OrderTotals, PricedCartLine } from "@/src/types/order";
import type { Product } from "@/src/types/product";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ActivePanel = "cart" | "checkout" | "coverage" | null;

type CommerceContextValue = {
  items: readonly CartItem[];
  lines: readonly PricedCartLine[];
  totals: OrderTotals;
  itemCount: number;
  hydrated: boolean;
  activePanel: ActivePanel;
  statusMessage: string;
  addItem: (productId: string, quantity?: number) => void;
  buyNow: (productId: string, quantity?: number) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  getProduct: (productId: string) => Product | undefined;
  openCart: () => void;
  openCheckout: () => void;
  openCoverage: () => void;
  closePanel: () => void;
  returnToCart: () => void;
};

const CommerceContext = createContext<CommerceContextValue | null>(null);

export function CommerceProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [activePanel, setActivePanel] = useState<ActivePanel>(null);
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      try {
        const stored = window.localStorage.getItem(CART_STORAGE_KEY);
        setItems(parseStoredCart(stored));
      } catch {
        setItems([]);
        setStatusMessage("No pudimos recuperar el carrito guardado. Puedes comenzar uno nuevo.");
      } finally {
        setHydrated(true);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch {
      queueMicrotask(() =>
        setStatusMessage("El carrito funciona, pero este navegador no permitió guardarlo."),
      );
    }
  }, [hydrated, items]);

  const getProduct = useCallback(
    (productId: string) => products.find((product) => product.id === productId),
    [],
  );

  const addItem = useCallback((productId: string, requestedQuantity = 1) => {
    const product = products.find((item) => item.id === productId);
    if (!product || product.status !== "active") {
      setStatusMessage("Este producto no está disponible por el momento.");
      return;
    }

    const limit = getProductQuantityLimit(product);
    if (limit < 1) {
      setStatusMessage(`${product.name} está agotado por el momento.`);
      return;
    }

    const safeRequested = Math.max(1, Math.trunc(requestedQuantity));
    setItems((current) => addCartItem(current, product, safeRequested));
    setStatusMessage(`${product.name} se agregó al carrito.`);
  }, []);

  const setQuantity = useCallback((productId: string, requestedQuantity: number) => {
    const product = products.find((item) => item.id === productId);
    if (!product) return;
    const quantity = Math.min(
      getProductQuantityLimit(product),
      Math.max(1, Math.trunc(requestedQuantity)),
    );
    setItems((current) => updateCartItemQuantity(current, product, quantity));
    setStatusMessage(`Cantidad de ${product.name} actualizada a ${quantity}.`);
  }, []);

  const buyNow = useCallback((productId: string, requestedQuantity = 1) => {
    const product = products.find((item) => item.id === productId);
    if (!product || product.status !== "active" || getProductQuantityLimit(product) < 1) {
      setStatusMessage("Este producto no está disponible por el momento.");
      return;
    }
    const safeRequested = Math.max(1, Math.trunc(requestedQuantity));
    setItems((current) => addCartItem(current, product, safeRequested));
    setStatusMessage(`${product.name} se agregó al carrito.`);
    setActivePanel("checkout");
  }, []);

  const removeItem = useCallback((productId: string) => {
    const product = products.find((item) => item.id === productId);
    setItems((current) => removeCartItem(current, productId));
    setStatusMessage(`${product?.name ?? "El producto"} se eliminó del carrito.`);
  }, []);

  const clearCart = useCallback(() => {
    setItems(emptyCart());
    setStatusMessage("El carrito se vació.");
  }, []);

  const lines = useMemo<PricedCartLine[]>(() => getPricedCartLines(items), [items]);
  const totals = useMemo<OrderTotals>(() => calculateOrderTotals(items), [items]);
  const itemCount = useMemo(() => getCartItemCount(items), [items]);

  const openCart = useCallback(() => setActivePanel("cart"), []);
  const openCoverage = useCallback(() => setActivePanel("coverage"), []);
  const closePanel = useCallback(() => setActivePanel(null), []);
  const returnToCart = useCallback(() => setActivePanel("cart"), []);
  const openCheckout = useCallback(() => {
    if (items.length === 0) {
      setStatusMessage("Agrega al menos un producto antes de continuar.");
      setActivePanel("cart");
      return;
    }
    setActivePanel("checkout");
  }, [items.length]);

  const value = useMemo<CommerceContextValue>(
    () => ({
      items,
      lines,
      totals,
      itemCount,
      hydrated,
      activePanel,
      statusMessage,
      addItem,
      buyNow,
      setQuantity,
      removeItem,
      clearCart,
      getProduct,
      openCart,
      openCheckout,
      openCoverage,
      closePanel,
      returnToCart,
    }),
    [
      items,
      lines,
      totals,
      itemCount,
      hydrated,
      activePanel,
      statusMessage,
      addItem,
      buyNow,
      setQuantity,
      removeItem,
      clearCart,
      getProduct,
      openCart,
      openCheckout,
      openCoverage,
      closePanel,
      returnToCart,
    ],
  );

  return <CommerceContext.Provider value={value}>{children}</CommerceContext.Provider>;
}

export function useCommerce(): CommerceContextValue {
  const value = useContext(CommerceContext);
  if (!value) throw new Error("useCommerce debe utilizarse dentro de CommerceProvider.");
  return value;
}

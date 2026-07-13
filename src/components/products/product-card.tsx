"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { ProductImage } from "@/src/components/ui/product-image";
import { QuantitySelector } from "@/src/components/ui/quantity-selector";
import { getPricePerLiterMxn, isProductAvailable } from "@/src/data/products";
import { getProductQuantityLimit } from "@/src/lib/cart";
import { formatCurrency } from "@/src/lib/currency";
import { getVerifiedClaims, type Product } from "@/src/types/product";
import { ArrowRight, Check, Info, MessageCircle, ShoppingBag, Snowflake } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, buyNow } = useCommerce();
  const available = isProductAvailable(product);
  const limit = Math.max(1, getProductQuantityLimit(product));
  const claims = getVerifiedClaims(product).slice(0, 3);
  const pricePerLiter = getPricePerLiterMxn(product);
  return <article className="card-surface group flex h-full flex-col overflow-hidden" data-testid={`product-card-${product.id}`}>
    <div className="relative bg-surface"><ProductImage alt={product.image.alt} className="aspect-[4/3] w-full" sizes="(min-width: 1024px) 30vw, (min-width: 640px) 47vw, 100vw" src={product.image.src} />{product.badge && <span className="absolute left-4 top-4 rounded-full bg-brand-deep px-3 py-1.5 text-[.68rem] font-bold uppercase tracking-[.08em] text-white">{product.badge}</span>}</div>
    <div className="flex flex-1 flex-col p-5 sm:p-6"><p className="text-xs font-bold uppercase tracking-[.11em] text-brand-dark">{product.presentation}</p><h3 className="mt-2 font-display text-3xl font-semibold leading-tight text-text">{product.name.replace("KÃ©fir", "Kéfir")}</h3><p className="mt-3 text-sm leading-6 text-muted">{product.description}</p>
      <div className="mt-5 flex flex-wrap gap-2">{claims.map((claim) => <span className="inline-flex items-center gap-1.5 rounded-full bg-surface px-2.5 py-1.5 text-[.68rem] font-bold text-brand-deep" key={claim.key}>{claim.key === "refrigerated" ? <Snowflake size={12} /> : <Check size={12} />}{claim.label.replace("Ã³", "ó")}</span>)}</div>
      <div className="mt-5 flex items-end justify-between gap-4"><div>{product.priceIsDemo ? <p className="text-sm font-bold text-brand-deep">Consulta disponibilidad</p> : <><p className="text-2xl font-bold text-brand-deep">{formatCurrency(product.priceMxn)}</p><p className="mt-1 text-xs text-muted">{formatCurrency(pricePerLiter)} por litro</p></>}</div><QuantitySelector label={`Cantidad de ${product.name}`} max={limit} onChange={setQuantity} value={quantity} /></div>
      <div className="mt-5 grid gap-2 sm:grid-cols-2"><button className="button-secondary !px-3 disabled:cursor-not-allowed disabled:opacity-45" data-testid={`add-${product.id}`} disabled={!available} onClick={() => addItem(product.id, quantity)} type="button"><ShoppingBag size={17} /> Agregar</button><button className="button-primary !px-3 disabled:cursor-not-allowed disabled:opacity-45" disabled={!available} onClick={() => buyNow(product.id, quantity)} type="button"><MessageCircle size={17} /> Pedir</button></div>
      <Link className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-bold text-brand-deep transition hover:bg-surface" href={`/productos/${product.slug}`}><Info size={16} /> Ver detalles <ArrowRight size={15} /></Link>
    </div>
  </article>;
}

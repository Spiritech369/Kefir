"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { ProductImage } from "@/src/components/ui/product-image";
import { QuantitySelector } from "@/src/components/ui/quantity-selector";
import { featuredProduct } from "@/src/data/products";
import { getProductQuantityLimit } from "@/src/lib/cart";
import { formatCurrency } from "@/src/lib/currency";
import { getVerifiedClaims } from "@/src/types/product";
import { ArrowDown, Check, ShoppingBag, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const heroClaimKeys = new Set([
  "pasteurizedMilk",
  "refrigerated",
  "liveCultures",
  "noAddedSugar",
]);

export function HeroSection() {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCommerce();
  const product = featuredProduct;

  if (!product) return null;

  const trustClaims = getVerifiedClaims(product).filter((claim) => heroClaimKeys.has(claim.key));

  return (
    <section className="relative overflow-hidden pb-16 pt-10 sm:pb-24 sm:pt-16 lg:pb-28 lg:pt-20" id="inicio">
      <div className="absolute -left-40 top-10 -z-10 size-[28rem] rounded-full bg-leaf-soft/70 blur-3xl" />
      <div className="absolute -right-56 bottom-0 -z-10 size-[34rem] rounded-full bg-ferment/16 blur-3xl" />
      <div className="site-container grid items-center gap-12 lg:grid-cols-[1.02fr_0.98fr] lg:gap-16">
        <div className="soft-rise">
          <p className="eyebrow">
            <Sparkles aria-hidden="true" size={15} />
            Kéfir artesanal · Ciudad de México
          </p>
          <h1 className="mt-5 max-w-3xl text-[clamp(3.1rem,8vw,6.4rem)] font-semibold leading-[0.91] tracking-[-0.045em] text-leaf-dark">
            Kéfir vivo, fresco y elaborado con cuidado
          </h1>
          <p className="mt-7 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
            Una bebida fermentada de sabor suave, elaborada con leche pasteurizada y cultivos vivos.
            Disfrútala como parte de una alimentación variada, sin promesas milagrosas.
          </p>
          <div className="mt-8 flex flex-col gap-3 min-[430px]:flex-row">
            <Link className="button-primary" href="#productos">
              Comprar kéfir
              <ShoppingBag aria-hidden="true" size={18} />
            </Link>
            <Link className="button-secondary" href="#beneficios">
              Descubrir sus beneficios
              <ArrowDown aria-hidden="true" size={18} />
            </Link>
          </div>

          {trustClaims.length > 0 ? (
            <ul className="mt-8 flex flex-wrap gap-x-5 gap-y-3" aria-label="Atributos confirmados del producto destacado">
              {trustClaims.map((claim) => (
                <li className="flex items-center gap-2 text-xs font-semibold text-leaf-dark" key={claim.key}>
                  <span className="grid size-5 place-items-center rounded-full bg-leaf-soft">
                    <Check aria-hidden="true" size={12} strokeWidth={2.6} />
                  </span>
                  {claim.label}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="relative mx-auto w-full max-w-[36rem] lg:mx-0 lg:ml-auto">
          <div className="relative overflow-hidden rounded-[2.4rem] bg-leaf-soft shadow-[0_36px_80px_rgba(30,61,44,0.2)]">
            <ProductImage
              alt="Botella y vaso de kéfir artesanal sobre una mesa clara"
              className="aspect-[4/5] w-full"
              priority
              sizes="(min-width: 1024px) 48vw, 90vw"
              src="/images/hero-kefir.webp"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-leaf-dark/65 to-transparent px-6 pb-7 pt-24 text-milk">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-milk/75">
                Fermentado con tiempo y cuidado
              </p>
            </div>
          </div>

          <div className="relative z-10 -mt-10 ml-auto mr-3 w-[calc(100%-1.5rem)] max-w-sm rounded-[1.7rem] border border-white/80 bg-milk/95 p-5 shadow-[0_24px_55px_rgba(30,61,44,0.18)] backdrop-blur sm:-mt-24 sm:mr-6 sm:w-80">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-leaf/70">
                  Presentación destacada
                </p>
                <h2 className="mt-1 font-sans text-base font-bold text-leaf-dark">{product.name}</h2>
              </div>
              {product.badge ? (
                <span className="shrink-0 rounded-full bg-ferment/20 px-2.5 py-1 text-[0.62rem] font-extrabold uppercase tracking-wide text-leaf-dark">
                  {product.badge}
                </span>
              ) : null}
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div>
                <p className="text-xl font-bold text-leaf-dark">{formatCurrency(product.priceMxn)}</p>
                {product.priceIsDemo ? <p className="text-[0.62rem] text-berry">Precio demostrativo</p> : null}
              </div>
              <QuantitySelector
                compact
                label={`Cantidad de ${product.name}`}
                max={Math.max(1, getProductQuantityLimit(product))}
                onChange={setQuantity}
                value={quantity}
              />
            </div>
            <button
              className="button-primary mt-4 w-full"
              onClick={() => addItem(product.id, quantity)}
              type="button"
            >
              <ShoppingBag aria-hidden="true" size={17} />
              Agregar al carrito
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}


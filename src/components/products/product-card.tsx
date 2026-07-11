"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { ProductImage } from "@/src/components/ui/product-image";
import { QuantitySelector } from "@/src/components/ui/quantity-selector";
import { getPricePerLiterMxn, isProductAvailable } from "@/src/data/products";
import { getProductQuantityLimit } from "@/src/lib/cart";
import { formatCurrency } from "@/src/lib/currency";
import { getVerifiedClaims, type Product } from "@/src/types/product";
import { ArrowRight, Check, Info, ShoppingBag, Snowflake } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function ProductCard({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, buyNow } = useCommerce();
  const available = isProductAvailable(product);
  const limit = Math.max(1, getProductQuantityLimit(product));
  const verifiedClaims = getVerifiedClaims(product);
  const pricePerLiter = getPricePerLiterMxn(product);

  return (
    <article
      className="card-surface group flex h-full flex-col overflow-hidden"
      data-testid={`product-card-${product.id}`}
    >
      <div className="relative">
        <ProductImage
          alt={product.image.alt}
          className="aspect-[4/3] w-full"
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 47vw, 100vw"
          src={product.image.src}
        />
        {product.badge ? (
          <span className="absolute left-4 top-4 rounded-full bg-leaf-dark px-3 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-milk shadow-md">
            {product.badge}
          </span>
        ) : null}
        <span
          className={`absolute bottom-4 right-4 rounded-full px-3 py-1.5 text-[0.7rem] font-bold shadow-sm ${
            available ? "bg-milk text-leaf-dark" : "bg-berry text-white"
          }`}
        >
          {available
            ? product.inventory.isDemo
              ? "Disponible · demo"
              : "Disponible"
            : "Agotado"}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.11em] text-leaf/75">
            {product.presentation}
          </p>
          <h3 className="mt-2 text-2xl font-semibold leading-tight text-leaf-dark">{product.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted">{product.description}</p>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {verifiedClaims.map((claim) => (
            <span
              className="inline-flex items-center gap-1.5 rounded-full bg-leaf-soft/70 px-2.5 py-1.5 text-[0.68rem] font-bold text-leaf-dark"
              key={claim.key}
            >
              {claim.key === "refrigerated" ? (
                <Snowflake aria-hidden="true" size={12} />
              ) : (
                <Check aria-hidden="true" size={12} />
              )}
              {claim.label}
            </span>
          ))}
        </div>

        <dl className="mt-5 grid gap-2 border-y border-line py-4 text-xs leading-5">
          <div className="grid grid-cols-[5.6rem_1fr] gap-2">
            <dt className="font-bold text-leaf-dark">Ingredientes</dt>
            <dd className="text-muted">{product.ingredientSummary.join(", ")}</dd>
          </div>
          <div className="grid grid-cols-[5.6rem_1fr] gap-2">
            <dt className="font-bold text-leaf-dark">Alérgenos</dt>
            <dd className="text-muted">{product.allergens.join(", ")}</dd>
          </div>
        </dl>

        <div className="mt-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-2xl font-bold tracking-tight text-leaf-dark">
              {formatCurrency(product.priceMxn)}
            </p>
            <p className="mt-1 text-xs text-muted">{formatCurrency(pricePerLiter)} por litro</p>
            {product.priceIsDemo ? (
              <p className="mt-1 text-[0.66rem] font-semibold text-berry">Precio demostrativo editable</p>
            ) : null}
          </div>
          <QuantitySelector
            label={`Cantidad de ${product.name}`}
            max={limit}
            onChange={setQuantity}
            value={quantity}
          />
        </div>

        <div className="mt-5 grid gap-2 sm:grid-cols-2">
          <button
            className="button-secondary !px-3 disabled:cursor-not-allowed disabled:opacity-45"
            data-testid={`add-${product.id}`}
            disabled={!available}
            onClick={() => addItem(product.id, quantity)}
            type="button"
          >
            <ShoppingBag aria-hidden="true" size={17} />
            Agregar
          </button>
          <button
            className="button-primary !px-3 disabled:cursor-not-allowed disabled:opacity-45"
            disabled={!available}
            onClick={() => buyNow(product.id, quantity)}
            type="button"
          >
            Comprar ahora
          </button>
        </div>
        <Link
          className="mt-3 inline-flex min-h-11 items-center justify-center gap-2 rounded-full text-sm font-bold text-leaf transition hover:bg-leaf-soft"
          href={`/productos/${product.slug}`}
        >
          <Info aria-hidden="true" size={16} />
          Ver detalles
          <ArrowRight aria-hidden="true" size={15} />
        </Link>
      </div>
    </article>
  );
}


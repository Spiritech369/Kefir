"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { QuantitySelector } from "@/src/components/ui/quantity-selector";
import { featuredProduct } from "@/src/data/products";
import { getProductQuantityLimit } from "@/src/lib/cart";
import { siteConfig } from "@/src/config/site";
import { Check, Heart, Leaf, MessageCircle, Snowflake, Sparkles } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const benefits = [
  ["100% artesanal", "Elaborado con ingredientes de alta calidad", Leaf],
  ["Con cultivos vivos", "Un alimento fermentado para disfrutar", Sparkles],
  ["Sin conservadores", "Natural, fresco y cuidadosamente elaborado", Check],
  ["Delicioso y versátil", "Solo, con fruta, en licuados o recetas", Heart],
] as const;

export function HeroSection() {
  const [quantity, setQuantity] = useState(1);
  const { addItem } = useCommerce();
  const product = featuredProduct;
  if (!product) return null;
  return <section className="relative overflow-hidden pb-14 pt-7 sm:pb-20 sm:pt-10" id="inicio">
    <div className="site-container">
      <div className="label-card relative overflow-hidden rounded-[1.75rem] border border-line bg-surface px-5 py-7 shadow-[0_20px_60px_rgba(75,56,49,.1)] sm:px-8 sm:py-10 lg:px-12 lg:py-12">
        <span aria-hidden="true" className="botanical botanical-left">⌁ ❧</span><span aria-hidden="true" className="botanical botanical-right">❧ ⌁</span>
        <div className="grid items-center gap-8 lg:grid-cols-[.9fr_1.35fr_.9fr] lg:gap-10">
          <div className="order-2 lg:order-1"><ul className="grid gap-5">{benefits.map(([title, text, Icon]) => <li className="benefit-row" key={title}><span className="benefit-icon"><Icon size={21} /></span><span><strong>{title}</strong><small>{text}</small></span></li>)}</ul></div>
          <div className="order-1 text-center lg:order-2"><div className="mx-auto grid size-28 place-items-center rounded-full border-2 border-brand bg-white/60 sm:size-36"><div><Leaf className="mx-auto mb-1 text-brand" size={27} /><span className="font-display text-[2.5rem] font-semibold tracking-[.14em] text-brand-deep sm:text-[3rem]">KEFIRA</span></div></div><p className="mt-3 text-xs font-bold tracking-[.3em] text-text">KÉFIR ARTESANAL</p><Heart className="mx-auto my-3 text-brand" size={25} /><h1 className="font-display text-[clamp(2.7rem,6vw,5.2rem)] font-semibold leading-[.9] text-text">Kéfir artesanal,<br /><em className="text-brand-deep">natural y hecho con cariño</em></h1><span className="mt-5 inline-flex rounded-full bg-brand px-5 py-2 text-xs font-extrabold tracking-[.28em] text-white">NATURAL</span><p className="mx-auto mt-4 max-w-sm text-sm leading-6 text-text-muted">Elaborado con leche de alta calidad y cultivos vivos.</p><p className="mt-3 font-display text-3xl font-semibold tracking-[.18em] text-brand-deep">1 LITRO</p><div className="mt-5 flex flex-col justify-center gap-3 min-[420px]:flex-row"><a className="button-primary" href={siteConfig.announcement.href} rel="noreferrer" target="_blank"><MessageCircle size={17} /> Pedir por WhatsApp</a><Link className="button-secondary" href="#productos">Conocer el producto</Link></div></div>
          <div className="order-3 grid gap-5 text-center lg:text-left"><div className="side-note"><Heart className="text-brand" size={24} /><strong>Elaboración artesanal</strong><small>Consumo preferente indicado en la etiqueta</small></div><div className="side-note"><Snowflake className="text-brand" size={24} /><strong>Mantener refrigerado</strong><small>2 °C – 6 °C</small></div><p className="font-display text-3xl italic text-brand-deep">hecho con cariño</p><p className="text-sm font-bold tracking-[.18em] text-text">MONTERREY, N.L.</p></div>
        </div>
      </div>
      <div className="mt-5 grid grid-cols-2 gap-2 rounded-2xl border border-line bg-white/70 px-4 py-4 text-center text-xs font-bold uppercase tracking-[.12em] text-brand-deep sm:grid-cols-4"><span>Saludable</span><span>Natural</span><span>Bienestar</span><span>Hecho en Monterrey</span></div>
      <div className="mx-auto mt-6 flex max-w-md items-center justify-center gap-3 rounded-full border border-line bg-white px-4 py-2"><span className="text-sm font-bold text-brand-deep">Presentación destacada</span><QuantitySelector compact label="Cantidad de kéfir natural de 1 litro" max={Math.max(1, getProductQuantityLimit(product))} onChange={setQuantity} value={quantity} /><button aria-label="Agregar kéfir de 1 litro al carrito" className="rounded-full bg-brand px-4 py-2 text-xs font-bold text-white" onClick={() => addItem(product.id, quantity)} type="button">Agregar</button></div>
    </div>
  </section>;
}

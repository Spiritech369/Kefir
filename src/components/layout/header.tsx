"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { siteConfig } from "@/src/config/site";
import { Menu, MessageCircle, ShoppingBag, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated, openCart } = useCommerce();
  useEffect(() => { if (!menuOpen) return; const close = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false); document.addEventListener("keydown", close); return () => document.removeEventListener("keydown", close); }, [menuOpen]);
  return <header className="sticky top-0 z-50">
    <div className="border-b border-line bg-brand-deep px-4 py-2 text-center text-xs font-semibold tracking-wide text-white">{siteConfig.announcement.text}</div>
    <div className="border-b border-line/80 bg-background/90 shadow-[0_8px_30px_rgba(75,56,49,.05)] backdrop-blur-xl">
      <nav aria-label="Navegación principal" className="site-container flex min-h-[4.75rem] items-center justify-between gap-4"><Logo />
        <div className="hidden items-center gap-5 xl:flex">{siteConfig.navigation.map((item) => <Link className="rounded text-sm font-semibold text-text/80 transition hover:text-brand-deep" href={`/${item.href}`} key={item.href}>{item.label}</Link>)}</div>
        <div className="flex items-center gap-1.5"><a className="button-primary hidden !min-h-11 sm:inline-flex" href={siteConfig.announcement.href} rel="noreferrer" target="_blank"><MessageCircle size={17} /> Pedir por WhatsApp</a>
          <button aria-label={`Abrir carrito${hydrated ? `, ${itemCount} artículos` : ""}`} className="relative grid size-11 place-items-center rounded-full text-brand-deep transition hover:bg-surface" data-testid="open-cart" onClick={openCart} type="button"><ShoppingBag size={21} />{hydrated && itemCount > 0 && <span className="absolute -right-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[.65rem] font-extrabold text-white">{itemCount > 99 ? "99+" : itemCount}</span>}</button>
          <button aria-controls="mobile-navigation" aria-expanded={menuOpen} aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"} className="grid size-11 place-items-center rounded-full text-brand-deep transition hover:bg-surface xl:hidden" onClick={() => setMenuOpen((v) => !v)} type="button">{menuOpen ? <X size={22} /> : <Menu size={22} />}</button>
        </div>
      </nav>
      {menuOpen && <nav aria-label="Navegación móvil" className="site-container border-t border-line pb-5 pt-3 xl:hidden" id="mobile-navigation"><div className="grid gap-1">{siteConfig.navigation.map((item) => <Link className="rounded-xl px-3 py-3 text-sm font-semibold text-brand-deep transition hover:bg-surface" href={`/${item.href}`} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}<a className="button-primary mt-2 sm:hidden" href={siteConfig.announcement.href} rel="noreferrer" target="_blank">Pedir por WhatsApp</a></div></nav>}
    </div>
  </header>;
}

"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { siteConfig } from "@/src/config/site";
import { Menu, ShoppingBag, Truck, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Logo } from "./logo";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { itemCount, hydrated, openCart, openCoverage } = useCommerce();

  useEffect(() => {
    if (!menuOpen) return;
    const closeWithEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", closeWithEscape);
    return () => document.removeEventListener("keydown", closeWithEscape);
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50">
      <div className="bg-leaf-dark px-4 py-2 text-milk">
        <div className="site-container flex items-center justify-center gap-2 text-center text-[0.72rem] leading-5 sm:text-xs">
          <Truck aria-hidden="true" className="hidden shrink-0 sm:block" size={15} />
          <span>{siteConfig.announcement.text}</span>
          <button
            className="shrink-0 rounded font-bold underline decoration-ferment/70 underline-offset-4 hover:decoration-ferment"
            onClick={openCoverage}
            type="button"
          >
            {siteConfig.announcement.linkLabel}
          </button>
        </div>
      </div>

      <div className="border-b border-white/60 bg-cream/90 shadow-[0_8px_30px_rgba(30,61,44,0.05)] backdrop-blur-xl">
        <nav aria-label="Navegación principal" className="site-container flex h-[4.75rem] items-center justify-between gap-4">
          <Logo />

          <div className="hidden items-center gap-5 xl:flex">
            {siteConfig.navigation.map((item) => (
              <Link
                className="rounded text-[0.82rem] font-semibold text-ink/80 transition hover:text-leaf"
                href={`/${item.href}`}
                key={item.href}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link className="button-primary hidden !min-h-11 sm:inline-flex" href="/#productos">
              Comprar
            </Link>
            <button
              aria-label={`Abrir carrito${hydrated ? `, ${itemCount} artículos` : ""}`}
              className="relative grid size-11 place-items-center rounded-full text-leaf-dark transition hover:bg-leaf-soft"
              data-testid="open-cart"
              onClick={openCart}
              type="button"
            >
              <ShoppingBag aria-hidden="true" size={21} />
              {hydrated && itemCount > 0 ? (
                <span className="absolute -right-0.5 -top-0.5 grid min-h-5 min-w-5 place-items-center rounded-full bg-ferment px-1 text-[0.65rem] font-extrabold text-leaf-dark">
                  {itemCount > 99 ? "99+" : itemCount}
                </span>
              ) : null}
            </button>
            <button
              aria-controls="mobile-navigation"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              className="grid size-11 place-items-center rounded-full text-leaf-dark transition hover:bg-leaf-soft xl:hidden"
              onClick={() => setMenuOpen((current) => !current)}
              type="button"
            >
              {menuOpen ? <X aria-hidden="true" size={22} /> : <Menu aria-hidden="true" size={22} />}
            </button>
          </div>
        </nav>

        {menuOpen ? (
          <nav
            aria-label="Navegación móvil"
            className="site-container border-t border-line pb-5 pt-3 xl:hidden"
            id="mobile-navigation"
          >
            <div className="grid gap-1">
              {siteConfig.navigation.map((item) => (
                <Link
                  className="rounded-xl px-3 py-3 text-sm font-semibold text-leaf-dark transition hover:bg-leaf-soft"
                  href={`/${item.href}`}
                  key={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                className="button-primary mt-2 sm:hidden"
                href="/#productos"
                onClick={() => setMenuOpen(false)}
              >
                Comprar kéfir
              </Link>
            </div>
          </nav>
        ) : null}
      </div>
    </header>
  );
}


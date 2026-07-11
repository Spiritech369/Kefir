"use client";

import { AnalyticsGate } from "@/src/components/analytics/analytics-gate";
import { CartDrawer } from "@/src/components/cart/cart-drawer";
import { CommerceProvider, useCommerce } from "@/src/components/cart/commerce-provider";
import { CheckoutDialog } from "@/src/components/checkout/checkout-dialog";
import { CoverageDialog } from "@/src/components/checkout/coverage-dialog";
import type { ReactNode } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

function ShellContent({ children }: { children: ReactNode }) {
  const { statusMessage } = useCommerce();

  return (
    <>
      <a
        className="fixed left-3 top-3 z-[120] -translate-y-24 rounded-full bg-milk px-4 py-3 font-bold text-leaf-dark shadow-lg transition focus:translate-y-0"
        href="#contenido-principal"
      >
        Saltar al contenido
      </a>
      <Header />
      <main id="contenido-principal">{children}</main>
      <Footer />
      <CartDrawer />
      <CheckoutDialog />
      <CoverageDialog />
      <AnalyticsGate />
      <p aria-atomic="true" aria-live="polite" className="sr-only">
        {statusMessage}
      </p>
    </>
  );
}

export function ClientShell({ children }: { children: ReactNode }) {
  return (
    <CommerceProvider>
      <ShellContent>{children}</ShellContent>
    </CommerceProvider>
  );
}


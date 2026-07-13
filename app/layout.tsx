import { ClientShell } from "@/src/components/layout/client-shell";
import { siteConfig } from "@/src/config/site";
import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import "./globals.css";

const manrope = Manrope({ display: "swap", subsets: ["latin"], variable: "--font-manrope" });
const cormorant = Cormorant_Garamond({ display: "swap", subsets: ["latin"], variable: "--font-cormorant" });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: { default: siteConfig.seo.title, template: `%s | ${siteConfig.name}` },
  description: siteConfig.seo.description,
  applicationName: siteConfig.name,
  category: "alimentos",
  keywords: ["kéfir artesanal", "kéfir Monterrey", "bebida fermentada", "kéfir refrigerado"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "es_MX", url: "/", siteName: siteConfig.name, title: siteConfig.seo.title, description: siteConfig.seo.description, images: [{ url: "/og.png", width: 1200, height: 630, alt: "KEFIRA, kéfir artesanal" }] },
  twitter: { card: "summary_large_image", title: siteConfig.seo.title, description: siteConfig.seo.description, images: ["/og.png"] },
  icons: { icon: "/favicon.png", shortcut: "/favicon.png" },
};

export const viewport: Viewport = { colorScheme: "light", themeColor: "#fdf9fa", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="es-MX"><body className={`${manrope.variable} ${cormorant.variable} antialiased`}><ClientShell>{children}</ClientShell></body></html>;
}

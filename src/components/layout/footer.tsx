"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { siteConfig } from "@/src/config/site";
import { Instagram, Mail, MapPin, MessageCircle } from "lucide-react";
import Link from "next/link";
import { Logo } from "./logo";

const legalLinks = [
  { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/entregas", label: "Política de entregas" },
  { href: "/devoluciones", label: "Política de devoluciones" },
  { href: "/#consumo-informado", label: "Aviso de alérgenos" },
  { href: "/#consumo-informado", label: "Descargo de salud" },
];

export function Footer() {
  const { openCoverage } = useCommerce();
  const year = new Date().getFullYear();
  const directWhatsAppHref = siteConfig.whatsapp.isConfigured
    ? `https://wa.me/${siteConfig.whatsapp.number}`
    : null;

  return (
    <footer className="border-t border-leaf/15 bg-leaf-dark text-milk" id="contacto">
      <div className="site-container grid gap-12 py-14 md:grid-cols-[1.25fr_0.8fr_1fr] md:py-20">
        <div className="max-w-md">
          <div className="[&_a]:text-milk [&_span:first-child]:bg-milk [&_span:first-child]:text-leaf-dark">
            <Logo />
          </div>
          <p className="mt-5 text-sm leading-6 text-milk/72">{siteConfig.slogan}.</p>
          <p className="mt-4 text-xs leading-5 text-milk/55">
            El kéfir es un alimento, no un medicamento ni un sustituto de atención médica.
            Consulta siempre la etiqueta y la información del producto.
          </p>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ferment">
            Explora
          </h2>
          <ul className="mt-5 grid gap-3 text-sm text-milk/76">
            {siteConfig.navigation.slice(1).map((item) => (
              <li key={item.href}>
                <Link className="rounded transition hover:text-white" href={`/${item.href}`}>
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-xs font-bold uppercase tracking-[0.14em] text-ferment">
            Hablemos
          </h2>
          <ul className="mt-5 grid gap-4 text-sm text-milk/76">
            <li className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-0.5 shrink-0 text-ferment" size={18} />
              <button className="rounded text-left transition hover:text-white" onClick={openCoverage} type="button">
                Cobertura demostrativa en {siteConfig.city}
              </button>
            </li>
            <li className="flex items-center gap-3">
              <Mail aria-hidden="true" className="shrink-0 text-ferment" size={18} />
              <a className="rounded transition hover:text-white" href={`mailto:${siteConfig.email}`}>
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Instagram aria-hidden="true" className="shrink-0 text-ferment" size={18} />
              <a
                className="rounded transition hover:text-white"
                href={siteConfig.instagram.url}
                rel="noreferrer"
                target="_blank"
              >
                {siteConfig.instagram.handle}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <MessageCircle aria-hidden="true" className="shrink-0 text-ferment" size={18} />
              {directWhatsAppHref ? (
                <a
                  className="rounded transition hover:text-white"
                  href={directWhatsAppHref}
                  rel="noreferrer"
                  target="_blank"
                >
                  WhatsApp
                </a>
              ) : (
                <span>WhatsApp por configurar</span>
              )}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="site-container flex flex-col gap-5 py-7 text-xs text-milk/58 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-x-5 gap-y-3">
            {legalLinks.map((link) => (
              <Link className="rounded transition hover:text-white" href={link.href} key={`${link.href}-${link.label}`}>
                {link.label}
              </Link>
            ))}
          </div>
          <p>© {year} {siteConfig.name}. Datos demostrativos hasta su validación.</p>
        </div>
      </div>
    </footer>
  );
}

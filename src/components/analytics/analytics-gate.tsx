"use client";

import { analyticsConfig } from "@/src/config/analytics";
import { Cookie, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Script from "next/script";
import { useEffect, useState } from "react";

type Consent = "accepted" | "rejected" | null;

export function AnalyticsGate() {
  const [consent, setConsent] = useState<Consent>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!analyticsConfig.enabled) return;
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      const saved = window.localStorage.getItem(analyticsConfig.cookieName);
      setConsent(saved === "accepted" || saved === "rejected" ? saved : null);
      setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!analyticsConfig.enabled) return null;

  const saveConsent = (value: Exclude<Consent, null>) => {
    window.localStorage.setItem(analyticsConfig.cookieName, value);
    setConsent(value);
  };

  return (
    <>
      {consent === "accepted" ? (
        <>
          <Script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(
              analyticsConfig.measurementId,
            )}`}
            strategy="afterInteractive"
          />
          <Script id="kefir-vivo-analytics" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${analyticsConfig.measurementId}',{'anonymize_ip':true});`}
          </Script>
        </>
      ) : null}

      {ready && consent === null ? (
        <aside
          aria-label="Preferencias de analítica"
          className="fixed inset-x-3 bottom-3 z-[90] mx-auto max-w-4xl rounded-3xl border border-white/70 bg-leaf-dark p-5 text-milk shadow-2xl sm:bottom-5 sm:p-6"
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white/10 text-ferment">
              <Cookie aria-hidden="true" size={21} />
            </span>
            <div className="flex-1">
              <h2 className="font-sans text-base font-bold">Analítica opcional y con consentimiento</h2>
              <p className="mt-1 text-sm leading-6 text-milk/72">
                Podemos usar analítica no esencial para entender el uso del sitio. No se carga ningún
                seguimiento hasta que aceptes. Consulta el{" "}
                <Link className="font-semibold underline underline-offset-4" href="/aviso-de-privacidad">
                  aviso de privacidad
                </Link>
                .
              </p>
            </div>
            <div className="flex shrink-0 flex-col gap-2 min-[460px]:flex-row sm:flex-col lg:flex-row">
              <button className="button-secondary !border-white/35 !bg-white/5 !text-white" onClick={() => saveConsent("rejected")} type="button">
                Solo esenciales
              </button>
              <button className="button-primary !border-milk !bg-milk !text-leaf-dark" onClick={() => saveConsent("accepted")} type="button">
                <ShieldCheck aria-hidden="true" size={17} />
                Aceptar analítica
              </button>
            </div>
          </div>
        </aside>
      ) : null}
    </>
  );
}

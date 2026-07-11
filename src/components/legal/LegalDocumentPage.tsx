import { AlertTriangle, ArrowLeft, CheckCircle2, FileText } from "lucide-react";
import Link from "next/link";

import type { LegalDocument } from "@/src/data/legal";

type LegalDocumentPageProps = {
  document: LegalDocument;
};

export function LegalDocumentPage({ document }: LegalDocumentPageProps) {
  return (
    <main className="min-h-screen bg-[#fbf8ef] text-[#18392f]">
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Migas de pan" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#557068]">
            <li>
              <Link
                href="/"
                className="inline-flex items-center gap-1.5 rounded-md font-medium transition-colors hover:text-[#225b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#225b45]"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-medium text-[#254c3e]">
              {document.title}
            </li>
          </ol>
        </nav>

        <header className="overflow-hidden rounded-[2rem] border border-[#dce6dc] bg-white shadow-[0_20px_70px_-45px_rgba(24,57,47,0.45)]">
          <div className="grid gap-8 p-6 sm:p-9 lg:grid-cols-[1fr_auto] lg:items-end lg:p-12">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.16em] text-[#3d765e]">
                {document.eyebrow}
              </p>
              <h1 className="text-balance text-4xl font-semibold tracking-[-0.035em] text-[#173c30] sm:text-5xl">
                {document.title}
              </h1>
              <p className="mt-5 max-w-2xl text-pretty text-base leading-7 text-[#526a62] sm:text-lg">
                {document.description}
              </p>
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-[#eef5ed] px-4 py-3 text-sm font-semibold text-[#315d4b]">
              <FileText aria-hidden="true" className="size-5 shrink-0" />
              Versión preliminar
            </div>
          </div>
          <div className="border-t border-[#dfe8df] bg-[#fff8e6] px-6 py-5 sm:px-9 lg:px-12">
            <div className="flex max-w-4xl items-start gap-3 text-sm leading-6 text-[#684f20]">
              <AlertTriangle aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
              <p>
                <strong>Plantilla informativa sujeta a revisión.</strong> Este
                contenido no constituye asesoría legal. El negocio debe
                completarlo y revisarlo con una persona profesional antes de
                publicarlo o aceptar pedidos.
              </p>
            </div>
          </div>
        </header>

        <div className="mt-10 grid gap-10 lg:grid-cols-[15rem_minmax(0,1fr)] lg:items-start">
          <aside className="lg:sticky lg:top-28">
            <nav
              aria-label={`Índice de ${document.title.toLowerCase()}`}
              className="rounded-3xl border border-[#dce5dc] bg-white p-5"
            >
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.13em] text-[#557068]">
                En esta página
              </p>
              <ol className="space-y-1">
                {document.sections.map((section) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="block rounded-xl px-3 py-2 text-sm leading-5 text-[#48635a] transition-colors hover:bg-[#eef5ed] hover:text-[#225b45] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#225b45]"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className="min-w-0 rounded-[2rem] border border-[#dce5dc] bg-white px-5 py-3 shadow-[0_18px_60px_-50px_rgba(24,57,47,0.5)] sm:px-9">
            {document.sections.map((section) => (
              <section
                id={section.id}
                key={section.id}
                className="scroll-mt-28 border-b border-[#e6ece5] py-8 last:border-0"
              >
                <h2 className="text-pretty text-2xl font-semibold tracking-[-0.02em] text-[#204a3b]">
                  {section.title}
                </h2>

                {section.paragraphs?.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="mt-4 text-base leading-7 text-[#4d655d]"
                  >
                    {paragraph}
                  </p>
                ))}

                {section.bullets ? (
                  <ul className="mt-5 space-y-3">
                    {section.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-start gap-3 text-base leading-7 text-[#4d655d]"
                      >
                        <CheckCircle2
                          aria-hidden="true"
                          className="mt-1 size-5 shrink-0 text-[#4f8067]"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}

                {section.note ? (
                  <div className="mt-5 rounded-2xl border border-[#ead9ad] bg-[#fff9e9] px-4 py-3 text-sm leading-6 text-[#6d5528]">
                    <strong>Nota de revisión:</strong> {section.note}
                  </div>
                ) : null}
              </section>
            ))}
          </article>
        </div>

        <section
          aria-labelledby="revision-heading"
          className="mt-10 rounded-[2rem] bg-[#1f513f] px-6 py-8 text-white sm:px-9 sm:py-10 lg:px-12"
        >
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#cde2d2]">
                Antes de publicar
              </p>
              <h2
                id="revision-heading"
                className="mt-3 text-3xl font-semibold tracking-[-0.025em]"
              >
                Datos que requieren validación
              </h2>
              <p className="mt-4 leading-7 text-[#dce9df]">
                La versión final debe describir exactamente cómo trabaja el
                negocio y coincidir con sus procesos, etiquetas y canales de
                atención.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {document.reviewItems.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-4 leading-6 text-[#f3f8f4]"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#cde2d2]"
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <nav aria-label="Políticas relacionadas" className="mt-10">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.13em] text-[#557068]">
            También puede interesarte
          </p>
          <div className="flex flex-wrap gap-3">
            {document.relatedLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full border border-[#cbdacb] bg-white px-5 py-3 text-sm font-semibold text-[#285441] transition-colors hover:border-[#78a289] hover:bg-[#eef5ed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#225b45]"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </main>
  );
}


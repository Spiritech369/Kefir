"use client";

import { ArrowRight, MessageCircle } from "lucide-react";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { finalCtaContent } from "@/src/data/content";

type FinalCtaSectionProps = {
  productsHref?: string;
};

export function FinalCtaSection({
  productsHref = "#productos",
}: FinalCtaSectionProps) {
  const { openCheckout } = useCommerce();

  return (
    <section
      id="comprar"
      aria-labelledby="cta-title"
      className="scroll-mt-28 bg-[#f8f5ec] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-[#173f30] px-6 py-12 text-center text-white shadow-[0_28px_80px_-48px_rgba(16,55,40,0.95)] sm:px-10 sm:py-16 lg:px-20">
          <span
            aria-hidden="true"
            className="absolute -top-32 -left-20 -z-10 size-72 rounded-full bg-[#396951]/70 blur-2xl"
          />
          <span
            aria-hidden="true"
            className="absolute -right-24 -bottom-36 -z-10 size-80 rounded-full bg-[#8ba678]/30 blur-3xl"
          />

          <div className="mx-auto max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#bed2bd] uppercase">
              {finalCtaContent.eyebrow}
            </p>
            <h2
              id="cta-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-balance sm:text-4xl lg:text-5xl"
            >
              {finalCtaContent.title}
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#d9e5d8] sm:text-lg">
              {finalCtaContent.description}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <a
                href={productsHref}
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#f3ecdc] px-6 py-3 font-semibold text-[#173f30] transition duration-200 hover:-translate-y-0.5 hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173f30] motion-reduce:transform-none motion-reduce:transition-none"
              >
                {finalCtaContent.productsLabel}
                <ArrowRight aria-hidden="true" className="size-4" />
              </a>
              <button
                aria-describedby="final-cta-note"
                onClick={openCheckout}
                type="button"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-white/35 bg-white/10 px-6 py-3 font-semibold text-white transition duration-200 hover:-translate-y-0.5 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#173f30] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <MessageCircle aria-hidden="true" className="size-5" />
                {finalCtaContent.whatsappLabel}
              </button>
            </div>

            <p
              id="final-cta-note"
              className="mx-auto mt-6 max-w-xl text-sm leading-6 text-[#bdd0bf]"
            >
              {finalCtaContent.availabilityNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

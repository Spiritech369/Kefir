import { Check, Minus } from "lucide-react";

import { claimsContent } from "@/src/data/content";

export function ClaimsSection() {
  return (
    <section
      id="lo-que-si-y-lo-que-no"
      aria-labelledby="afirmaciones-title"
      className="scroll-mt-28 bg-[#f8f5ec] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
            {claimsContent.eyebrow}
          </p>
          <h2
            id="afirmaciones-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
          >
            {claimsContent.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
            {claimsContent.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-2">
          <article className="rounded-[2rem] border border-[#bfd0c0] bg-[#e8f0e5] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#285b42] text-white">
                <Check aria-hidden="true" className="size-5" strokeWidth={2.2} />
              </span>
              <h3 className="text-xl font-semibold text-[#183c2d] sm:text-2xl">
                {claimsContent.supported.title}
              </h3>
            </div>
            <ul className="mt-7 space-y-4">
              {claimsContent.supported.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#355447]">
                  <Check
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-[#397050]"
                    strokeWidth={2.2}
                  />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="rounded-[2rem] border border-[#e2d3b9] bg-[#f6eddd] p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <span className="flex size-10 items-center justify-center rounded-full bg-[#806844] text-white">
                <Minus aria-hidden="true" className="size-5" strokeWidth={2.2} />
              </span>
              <h3 className="text-xl font-semibold text-[#57472f] sm:text-2xl">
                {claimsContent.unsupported.title}
              </h3>
            </div>
            <ul className="mt-7 space-y-4">
              {claimsContent.unsupported.items.map((item) => (
                <li key={item} className="flex items-start gap-3 text-[#68583f]">
                  <Minus
                    aria-hidden="true"
                    className="mt-1 size-4 shrink-0 text-[#8b7048]"
                    strokeWidth={2.2}
                  />
                  <span className="leading-7">{item}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}

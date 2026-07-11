import { Check, ShieldCheck } from "lucide-react";

import { safetyContent } from "@/src/data/content";

export function SafetySection() {
  return (
    <section
      id="consumo-informado"
      aria-labelledby="seguridad-title"
      className="scroll-mt-28 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-[2rem] bg-[#173f30] text-white shadow-[0_26px_70px_-45px_rgba(15,49,36,0.9)]">
          <div className="grid lg:grid-cols-[0.7fr_1.3fr]">
            <div className="relative overflow-hidden border-b border-white/10 p-7 sm:p-10 lg:border-r lg:border-b-0 lg:p-12">
              <span
                aria-hidden="true"
                className="absolute -right-16 -bottom-20 size-56 rounded-full bg-[#315f49]"
              />
              <div className="relative">
                <div className="flex size-14 items-center justify-center rounded-2xl bg-white/10 text-[#dbe8d6]">
                  <ShieldCheck
                    aria-hidden="true"
                    className="size-7"
                    strokeWidth={1.8}
                  />
                </div>
                <p className="mt-8 text-sm font-semibold tracking-[0.16em] text-[#b9cfba] uppercase">
                  {safetyContent.eyebrow}
                </p>
                <h2
                  id="seguridad-title"
                  className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
                >
                  {safetyContent.title}
                </h2>
                <p className="mt-5 leading-7 text-[#d6e1d7]">
                  {safetyContent.description}
                </p>
              </div>
            </div>

            <ul className="grid gap-x-8 gap-y-5 p-7 sm:grid-cols-2 sm:p-10 lg:p-12">
              {safetyContent.notices.map((notice) => (
                <li key={notice} className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#dbe8d6] text-[#214d38]">
                    <Check
                      aria-hidden="true"
                      className="size-3.5"
                      strokeWidth={2.4}
                    />
                  </span>
                  <span className="text-sm leading-6 text-[#eef3ec] sm:text-base">
                    {notice}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

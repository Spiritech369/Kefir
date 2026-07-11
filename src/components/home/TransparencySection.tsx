import { CircleDashed, ClipboardList, Info } from "lucide-react";

import { transparencyContent } from "@/src/data/content";

export function TransparencySection() {
  return (
    <section
      id="transparencia"
      aria-labelledby="transparencia-title"
      className="scroll-mt-28 bg-[#f2eee3] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
              {transparencyContent.eyebrow}
            </p>
            <h2
              id="transparencia-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
            >
              {transparencyContent.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
              {transparencyContent.description}
            </p>
          </div>
          <div className="hidden size-24 items-center justify-center rounded-[2rem] bg-[#dce8dc] text-[#2a5b42] lg:flex">
            <ClipboardList aria-hidden="true" className="size-10" strokeWidth={1.5} />
          </div>
        </div>

        <dl className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {transparencyContent.fields.map((field) => (
            <div
              key={field.label}
              className="rounded-2xl border border-[#dedfd6] bg-white/90 p-5 shadow-[0_16px_40px_-34px_rgba(24,60,45,0.42)]"
            >
              <dt className="min-h-12 text-sm font-semibold leading-6 text-[#294638]">
                {field.label}
              </dt>
              <dd className="mt-3 flex items-start gap-2 border-t border-[#e8e9e3] pt-3 text-sm leading-6 text-[#6b6c61]">
                <CircleDashed
                  aria-hidden="true"
                  className="mt-1 size-4 shrink-0 text-[#9a7b48]"
                />
                {field.value}
              </dd>
            </div>
          ))}
        </dl>

        <div
          role="note"
          className="mt-8 flex items-start gap-3 rounded-2xl bg-[#173f30] px-5 py-4 text-[#f4f6f0]"
        >
          <Info
            aria-hidden="true"
            className="mt-0.5 size-5 shrink-0 text-[#cfe0ca]"
          />
          <p className="text-sm leading-6 sm:text-base">
            {transparencyContent.note}
          </p>
        </div>
      </div>
    </section>
  );
}

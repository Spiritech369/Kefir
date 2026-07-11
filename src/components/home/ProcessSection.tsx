import {
  Clock3,
  Info,
  PackageCheck,
  Sprout,
  Truck,
  type LucideIcon,
} from "lucide-react";

import { processContent } from "@/src/data/content";
import { ProductImage } from "@/src/components/ui/product-image";

const processIcons: Record<string, LucideIcon> = {
  ingredients: PackageCheck,
  culture: Sprout,
  fermentation: Clock3,
  delivery: Truck,
};

export function ProcessSection() {
  return (
    <section
      id="proceso"
      aria-labelledby="proceso-title"
      className="scroll-mt-28 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:gap-16">
          <div className="max-w-xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
              {processContent.eyebrow}
            </p>
            <h2
              id="proceso-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
            >
              {processContent.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
              {processContent.description}
            </p>
            <ProductImage
              alt="Preparación demostrativa del proceso de fermentación del kéfir"
              className="mt-8 aspect-[4/3] rounded-[2rem]"
              sizes="(min-width: 1024px) 34vw, 100vw"
              src="/images/proceso-fermentacion.webp"
            />
          </div>

          <ol className="grid gap-4 sm:grid-cols-2">
            {processContent.steps.map((step, index) => {
              const Icon = processIcons[step.icon] ?? Sprout;

              return (
                <li
                  key={step.title}
                  className="relative rounded-3xl border border-[#dce5dd] bg-[#fbfcf8] p-6 shadow-[0_16px_40px_-34px_rgba(24,60,45,0.45)]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex size-11 items-center justify-center rounded-2xl bg-[#e6eee4] text-[#28573f]">
                      <Icon
                        aria-hidden="true"
                        className="size-5"
                        strokeWidth={1.8}
                      />
                    </span>
                    <span className="text-sm font-semibold tabular-nums text-[#84968a]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold text-[#193f30]">
                    {step.title}
                  </h3>
                  <p className="mt-3 leading-7 text-[#5a6a62]">
                    {step.description}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>

        <div
          role="note"
          className="mt-10 flex items-start gap-3 rounded-2xl border border-[#eadbbc] bg-[#fbf4e5] px-5 py-4 text-[#654f2f]"
        >
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm leading-6 sm:text-base">
            {processContent.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

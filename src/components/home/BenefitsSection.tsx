import {
  GlassWater,
  Info,
  Milk,
  Microscope,
  Utensils,
  type LucideIcon,
} from "lucide-react";

import { benefitsContent } from "@/src/data/content";
import { ProductImage } from "@/src/components/ui/product-image";

const benefitIcons: Record<string, LucideIcon> = {
  cultures: Microscope,
  nutrition: GlassWater,
  milk: Milk,
  versatile: Utensils,
};

export function BenefitsSection() {
  return (
    <section
      id="beneficios"
      aria-labelledby="beneficios-title"
      className="scroll-mt-28 bg-[#f8f5ec] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
              {benefitsContent.eyebrow}
            </p>
            <h2
              id="beneficios-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
            >
              {benefitsContent.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
              {benefitsContent.description}
            </p>
          </div>
          <ProductImage
            alt="Granos de kéfir utilizados como cultivo de fermentación"
            className="aspect-[16/10] rounded-[2rem]"
            sizes="(min-width: 1024px) 34vw, 100vw"
            src="/images/granos-kefir.webp"
          />
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {benefitsContent.items.map((benefit, index) => {
            const Icon = benefitIcons[benefit.icon] ?? Info;

            return (
              <article
                key={benefit.title}
                className="group relative overflow-hidden rounded-3xl border border-[#dce5dd] bg-white p-6 shadow-[0_18px_45px_-34px_rgba(24,60,45,0.45)] transition duration-300 motion-reduce:transition-none sm:p-8"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-[#edf3ea] transition-transform duration-300 group-hover:scale-110 motion-reduce:transition-none"
                />
                <div className="relative flex items-start gap-4">
                  <div className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[#e5eee5] text-[#24563f]">
                    <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                  </div>
                  <div>
                    <p className="text-xs font-semibold tracking-[0.14em] text-[#75907e] uppercase">
                      Aporte {String(index + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-2 text-xl font-semibold text-[#193f30]">
                      {benefit.title}
                    </h3>
                    <p className="mt-3 leading-7 text-[#5a6a62]">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div
          role="note"
          className="mt-8 flex items-start gap-3 rounded-2xl border border-[#cfdccc] bg-[#eaf1e7] px-5 py-4 text-[#284f3d]"
        >
          <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
          <p className="text-sm leading-6 sm:text-base">
            {benefitsContent.disclaimer}
          </p>
        </div>
      </div>
    </section>
  );
}

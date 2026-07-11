import {
  Blend,
  CakeSlice,
  Cherry,
  Flame,
  GlassWater,
  Snowflake,
  Soup,
  Wheat,
  type LucideIcon,
} from "lucide-react";

import { consumptionContent } from "@/src/data/content";
import { ProductImage } from "@/src/components/ui/product-image";

const consumptionIcons: Record<string, LucideIcon> = {
  cold: Snowflake,
  fruit: Cherry,
  oats: Wheat,
  smoothie: Blend,
  dressing: Soup,
  baking: CakeSlice,
};

export function ConsumptionSection() {
  return (
    <section
      id="formas-de-consumo"
      aria-labelledby="consumo-title"
      className="scroll-mt-28 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_0.72fr]">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
              {consumptionContent.eyebrow}
            </p>
            <h2
              id="consumo-title"
              className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
            >
              {consumptionContent.title}
            </h2>
            <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
              {consumptionContent.description}
            </p>
          </div>
          <ProductImage
            alt="Vaso de kéfir frío servido con fruta y avena"
            className="aspect-[16/10] rounded-[2rem]"
            sizes="(min-width: 1024px) 34vw, 100vw"
            src="/images/servir-kefir.webp"
          />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {consumptionContent.ideas.map((idea) => {
            const Icon = consumptionIcons[idea.icon] ?? GlassWater;

            return (
              <article
                key={idea.title}
                className="rounded-3xl border border-[#dce5dd] bg-[#fbfcf8] p-6 transition-colors duration-300 hover:border-[#b9ccbc] hover:bg-[#f6f9f3] motion-reduce:transition-none"
              >
                <div className="flex size-12 items-center justify-center rounded-2xl bg-[#e7efe5] text-[#28573f]">
                  <Icon aria-hidden="true" className="size-6" strokeWidth={1.8} />
                </div>
                <h3 className="mt-5 text-xl font-semibold text-[#193f30]">
                  {idea.title}
                </h3>
                <p className="mt-3 leading-7 text-[#5a6a62]">
                  {idea.description}
                </p>
              </article>
            );
          })}
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <div
            role="note"
            className="flex items-start gap-3 rounded-2xl border border-[#eadbbc] bg-[#fbf4e5] p-5 text-[#654f2f]"
          >
            <Flame aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
            <p className="text-sm leading-6 sm:text-base">
              {consumptionContent.heatNote}
            </p>
          </div>
          <div
            role="note"
            className="flex items-start gap-3 rounded-2xl border border-[#ccddce] bg-[#eaf1e7] p-5 text-[#284f3d]"
          >
            <GlassWater
              aria-hidden="true"
              className="mt-0.5 size-5 shrink-0"
            />
            <p className="text-sm leading-6 sm:text-base">
              {consumptionContent.portionNote}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

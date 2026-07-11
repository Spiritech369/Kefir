import { Quote } from "lucide-react";

import {
  testimonialsContent,
  type TestimonialContentItem,
} from "@/src/data/content";

type TestimonialsSectionProps = {
  enabled?: boolean;
  items?: ReadonlyArray<TestimonialContentItem>;
};

export function TestimonialsSection({
  enabled = true,
  items = testimonialsContent.items,
}: TestimonialsSectionProps) {
  if (!enabled) {
    return null;
  }

  return (
    <section
      id="testimonios"
      aria-labelledby="testimonios-title"
      className="scroll-mt-28 bg-[#f2eee3] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold tracking-[0.16em] text-[#4b705b] uppercase">
            {testimonialsContent.eyebrow}
          </p>
          <h2
            id="testimonios-title"
            className="mt-3 text-3xl font-semibold tracking-tight text-[#183c2d] sm:text-4xl lg:text-5xl"
          >
            {testimonialsContent.title}
          </h2>
          <p className="mt-5 text-base leading-7 text-[#56685f] sm:text-lg">
            {testimonialsContent.description}
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {/* Publicar únicamente reseñas reales y autorizadas por cada cliente. */}
          {items.map((item, index) => (
            <article
              key={`${item.quote}-${item.author ?? index}`}
              className="rounded-3xl border border-dashed border-[#bdc9bc] bg-white/70 p-6 text-center"
            >
              <span className="mx-auto flex size-11 items-center justify-center rounded-full bg-[#e6eee4] text-[#416b52]">
                <Quote aria-hidden="true" className="size-5" strokeWidth={1.8} />
              </span>
              <blockquote className="mt-5">
                <p className="leading-7 text-[#52645b]">{item.quote}</p>
              </blockquote>
              {item.author ? (
                <p className="mt-4 text-sm font-semibold text-[#294638]">
                  {item.author}
                </p>
              ) : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

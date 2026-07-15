import { siteConfig } from "@/src/config/site";
import { Heart, Leaf, MessageCircle, Snowflake, Sparkles } from "lucide-react";
import Image from "next/image";

const safeHighlights = [
  "Alimento fermentado con cultivos vivos",
  "Elaboración artesanal y cuidadosa",
  "Versátil para bebidas, fruta y recetas",
  "Mantener siempre entre 2 °C y 6 °C",
] as const;

export function BrandStorySection() {
  return (
    <section
      aria-labelledby="universo-kefira-title"
      className="section-shell overflow-hidden bg-[#fffafb]"
      id="universo-kefira"
    >
      <div className="site-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">
            <Heart aria-hidden="true" size={15} />
            El universo KEFIRA
          </p>
          <h2
            className="mt-4 text-[clamp(2.7rem,6vw,5rem)] font-semibold leading-[0.94] text-text"
            id="universo-kefira-title"
          >
            Rosa, natural y <em className="text-brand-deep">hecho con cariño</em>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg">
            Conoce el producto, descubre formas sencillas de disfrutarlo y confirma tu pedido
            directamente con nosotros.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.06fr_.94fr]">
          <figure className="group overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_18px_55px_rgba(75,56,49,.1)]">
            <Image
              alt="Botella de kéfir artesanal KEFIRA junto al mensaje Los beneficios del kéfir"
              className="h-auto w-full transition duration-300 group-hover:scale-[1.01] motion-reduce:transition-none"
              height={1047}
              sizes="(min-width: 1024px) 54vw, 100vw"
              src="/images/kefira-beneficios-portada.jpg"
              width={1039}
            />
          </figure>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-1">
            <article className="relative min-h-[20rem] overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_18px_55px_rgba(75,56,49,.08)]">
              {/* The original artwork is intentionally cropped to keep unverified nutrition copy out of the public UI. */}
              <Image
                alt="Granos de kéfir sobre una cuchara de madera y un recipiente con kéfir"
                className="absolute inset-0 size-full origin-right scale-[2.15] object-cover object-[86%_54%]"
                height={1190}
                sizes="(min-width: 1024px) 42vw, (min-width: 640px) 50vw, 100vw"
                src="/images/kefira-que-es.jpg"
                width={1123}
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#4b3831]/75 via-[#4b3831]/30 to-transparent px-6 pb-6 pt-24 text-white">
                <p className="text-xs font-extrabold uppercase tracking-[.18em]">¿Qué es el kéfir?</p>
                <p className="mt-2 max-w-sm text-sm leading-6 text-white/90">
                  Una bebida de leche fermentada mediante una comunidad de bacterias y levaduras.
                </p>
              </div>
            </article>

            <article className="rounded-[2rem] border border-line bg-white p-6 shadow-[0_18px_55px_rgba(75,56,49,.07)] sm:p-7">
              <div className="flex items-center gap-3 text-brand-deep">
                <span className="grid size-11 place-items-center rounded-full bg-surface-strong">
                  <Sparkles aria-hidden="true" size={20} />
                </span>
                <p className="text-xs font-extrabold uppercase tracking-[.16em]">Lo esencial</p>
              </div>
              <ul className="mt-5 grid gap-3 text-sm leading-6 text-text">
                {safeHighlights.map((item) => (
                  <li className="flex items-start gap-3" key={item}>
                    <Leaf aria-hidden="true" className="mt-1 shrink-0 text-brand" size={16} />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[.88fr_1.12fr]">
          <article className="overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_18px_55px_rgba(75,56,49,.07)]">
            {/* Only the neutral title band is shown; the source artwork contains health claims that require evidence. */}
            <div className="relative aspect-[4/1] overflow-hidden border-b border-line bg-surface">
              <Image
                alt="Encabezado editorial Seis beneficios del kéfir con decoración botánica rosa"
                className="size-full object-cover object-top"
                height={1058}
                sizes="(min-width: 1024px) 44vw, 100vw"
                src="/images/kefira-seis-beneficios-referencia.jpg"
                width={1170}
              />
            </div>
            <div className="p-6 sm:p-8">
              <h3 className="text-3xl font-semibold text-text">Beneficios, sin promesas exageradas</h3>
              <p className="mt-3 text-sm leading-6 text-muted">
                KEFIRA es un alimento fermentado que puede formar parte de una alimentación variada.
                La experiencia y la tolerancia pueden cambiar entre personas.
              </p>
              <div className="mt-5 flex items-center gap-3 rounded-2xl bg-surface px-4 py-3 text-sm font-semibold text-brand-deep">
                <Snowflake aria-hidden="true" size={19} />
                Mantener refrigerado de 2 °C a 6 °C
              </div>
            </div>
          </article>

          <figure className="group overflow-hidden rounded-[2rem] border border-line bg-surface shadow-[0_18px_55px_rgba(75,56,49,.1)]">
            <Image
              alt="Pieza de pedido KEFIRA con botella, vaso, WhatsApp e Instagram"
              className="h-auto w-full transition duration-300 group-hover:scale-[1.01] motion-reduce:transition-none"
              height={764}
              sizes="(min-width: 1024px) 56vw, 100vw"
              src="/images/kefira-haz-tu-pedido.jpg"
              width={899}
            />
            <figcaption className="flex flex-col gap-4 border-t border-line bg-white px-5 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-extrabold uppercase tracking-[.16em] text-brand-deep">
                  KEFIRA · 1 litro
                </p>
                <p className="mt-1 text-sm text-muted">Consulta disponibilidad directamente.</p>
              </div>
              <a
                className="button-primary min-h-11 shrink-0 shadow-[0_12px_28px_rgba(75,56,49,.16)]"
                href={siteConfig.announcement.href}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircle aria-hidden="true" size={18} />
                Hacer mi pedido
              </a>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

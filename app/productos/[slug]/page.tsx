import type { Metadata } from "next";
import {
  AlertTriangle,
  ArrowLeft,
  BadgeCheck,
  CheckCircle2,
  Info,
  PackageCheck,
  Refrigerator,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductImage } from "@/src/components/ui/product-image";
import { siteConfig } from "@/src/config/site";
import {
  PENDING_VALIDATION,
  getPricePerLiterMxn,
  getProductBySlug,
  isProductAvailable,
  products,
} from "@/src/data/products";
import { formatCurrency } from "@/src/lib/currency";
import { getVerifiedClaims } from "@/src/types/product";
import type { Product } from "@/src/types/product";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const transparencyFields: ReadonlyArray<{
  key: keyof Product["transparency"];
  label: string;
}> = [
  { key: "ingredients", label: "Ingredientes" },
  { key: "allergens", label: "Alérgenos" },
  { key: "nutrition", label: "Información nutricional" },
  { key: "netContent", label: "Contenido neto" },
  { key: "storage", label: "Condiciones de conservación" },
  { key: "bestBefore", label: "Consumo preferente" },
  { key: "cultures", label: "Cultivos utilizados" },
  { key: "addedSugars", label: "Azúcares añadidos" },
  { key: "lactose", label: "Lactosa" },
  {
    key: "fermentationAlcohol",
    label: "Alcohol derivado de la fermentación",
  },
  { key: "afterOpening", label: "Después de abrir" },
];

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado",
      robots: { index: false, follow: false },
    };
  }

  const pathname = `/productos/${product.slug}`;
  const description = `${product.description} ${product.presentation}. Consulta ingredientes, alérgenos y datos confirmados antes de pedir.`;

  return {
    title: product.name,
    description,
    alternates: { canonical: pathname },
    openGraph: {
      type: "website",
      url: pathname,
      title: `${product.name} | ${siteConfig.name}`,
      description,
      images: [
        {
          url: product.image.src,
          width: product.image.width,
          height: product.image.height,
          alt: product.image.alt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${product.name} | ${siteConfig.name}`,
      description,
      images: [product.image.src],
    },
  };
}

function buildProductStructuredData(product: Product) {
  const productUrl = new URL(`/productos/${product.slug}`, siteConfig.url).toString();
  const imageUrl = new URL(product.image.src, siteConfig.url).toString();
  const verifiedClaims = getVerifiedClaims(product);

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.longDescription,
    image: [imageUrl],
    sku: product.id,
    url: productUrl,
    category: "Kéfir de leche",
    size: product.presentation,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    additionalProperty: verifiedClaims.map((claim) => ({
      "@type": "PropertyValue",
      name: claim.label,
      value: "Confirmado en la ficha del producto",
    })),
    ...(!product.priceIsDemo
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: siteConfig.currency,
            price: product.priceMxn,
            availability: isProductAvailable(product)
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: productUrl,
          },
        }
      : {}),
  };
}

function buildBreadcrumbStructuredData(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Inicio",
        item: siteConfig.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Productos",
        item: new URL("/#productos", siteConfig.url).toString(),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: product.name,
        item: new URL(`/productos/${product.slug}`, siteConfig.url).toString(),
      },
    ],
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const available = isProductAvailable(product);
  const verifiedClaims = getVerifiedClaims(product);
  const pricePerLiter = getPricePerLiterMxn(product);
  const stockLabel = !available
    ? "Agotado por el momento"
    : product.inventory.tracked && product.inventory.isDemo
      ? "Disponibilidad de demostración"
      : "Disponible para solicitar";
  const structuredData = [
    buildProductStructuredData(product),
    buildBreadcrumbStructuredData(product),
  ];

  return (
    <main className="min-h-screen bg-[#fbf8ef] text-[#18392f]">
      <script
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
        type="application/ld+json"
      />

      <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <nav aria-label="Migas de pan" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-[#557068]">
            <li>
              <Link
                href="/"
                className="rounded-md font-medium transition-colors hover:text-[#225b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#225b45]"
              >
                Inicio
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/#productos"
                className="rounded-md font-medium transition-colors hover:text-[#225b45] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#225b45]"
              >
                Productos
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="font-semibold text-[#254c3e]">
              {product.name}
            </li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.04fr)_minmax(24rem,0.96fr)] lg:items-start lg:gap-12">
          <div className="relative">
            <ProductImage
              alt={product.image.alt}
              className="aspect-square rounded-[2rem] border border-[#dce5dc] shadow-[0_24px_75px_-52px_rgba(24,57,47,0.58)]"
              priority
              sizes="(min-width: 1024px) 52vw, 100vw"
              src={product.image.src}
            />
            {product.badge ? (
              <span className="absolute left-4 top-4 rounded-full bg-[#f4d78c] px-4 py-2 text-xs font-extrabold uppercase tracking-[0.1em] text-[#315342] shadow-sm sm:left-6 sm:top-6">
                {product.badge}
              </span>
            ) : null}
          </div>

          <article className="lg:py-5">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#47745f]">
              {product.presentation}
            </p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-[-0.04em] text-[#173c30] sm:text-5xl lg:text-[3.55rem] lg:leading-[1.05]">
              {product.name}
            </h1>
            <p className="mt-5 text-lg leading-8 text-[#50675f]">
              {product.longDescription}
            </p>

            {verifiedClaims.length > 0 ? (
              <ul aria-label="Atributos confirmados" className="mt-6 flex flex-wrap gap-2">
                {verifiedClaims.map((claim) => (
                  <li
                    key={claim.key}
                    className="inline-flex items-center gap-2 rounded-full border border-[#c8d9ca] bg-white px-3 py-2 text-sm font-semibold text-[#315d4b]"
                  >
                    <BadgeCheck aria-hidden="true" className="size-4 text-[#4d8067]" />
                    {claim.label}
                  </li>
                ))}
              </ul>
            ) : null}

            <div className="mt-7 rounded-3xl border border-[#dce5dc] bg-white p-5 shadow-[0_20px_60px_-50px_rgba(24,57,47,0.55)] sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-[#60756e]">Precio</p>
                  <p className="mt-1 text-3xl font-bold tracking-[-0.03em] text-[#1d4b3a]">
                    {formatCurrency(product.priceMxn)}
                  </p>
                  {product.volumeMl > 0 ? (
                    <p className="mt-1 text-sm text-[#60756e]">
                      {formatCurrency(pricePerLiter)} por litro
                    </p>
                  ) : null}
                </div>
                <div
                  className={`rounded-full px-3 py-2 text-sm font-bold ${
                    available
                      ? "bg-[#e9f3e8] text-[#315f4b]"
                      : "bg-[#f8e7df] text-[#854d39]"
                  }`}
                >
                  {stockLabel}
                </div>
              </div>

              {product.priceIsDemo ? (
                <div className="mt-5 flex items-start gap-3 rounded-2xl bg-[#fff7df] px-4 py-3 text-sm leading-6 text-[#6b5428]">
                  <Info aria-hidden="true" className="mt-0.5 size-5 shrink-0" />
                  <p>
                    <strong>Precio de demostración.</strong> El negocio debe
                    validarlo antes de publicar; el total final se confirma por
                    WhatsApp.
                  </p>
                </div>
              ) : null}

              {available ? (
                <Link
                  href="/#productos"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-[#215541] px-6 py-3 text-center text-base font-bold text-white shadow-sm transition hover:bg-[#173f31] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#215541]"
                >
                  Elegir cantidad en la tienda
                </Link>
              ) : (
                <Link
                  href="/#productos"
                  className="mt-5 inline-flex min-h-12 w-full items-center justify-center rounded-full border border-[#b8cbbd] bg-white px-6 py-3 text-center text-base font-bold text-[#315d4b] transition hover:bg-[#eef5ed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#215541]"
                >
                  Ver otras presentaciones
                </Link>
              )}
              <p className="mt-3 text-center text-xs leading-5 text-[#60756e]">
                El pedido queda sujeto a confirmación de disponibilidad,
                cobertura y horario.
              </p>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 rounded-2xl border border-[#dce5dc] bg-white p-4">
                <PackageCheck aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#4d8067]" />
                <div>
                  <p className="font-semibold text-[#244e3e]">Presentación</p>
                  <p className="mt-1 text-sm leading-6 text-[#5b7068]">
                    {product.presentation}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-2xl border border-[#dce5dc] bg-white p-4">
                <Refrigerator aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-[#4d8067]" />
                <div>
                  <p className="font-semibold text-[#244e3e]">Manejo</p>
                  <p className="mt-1 text-sm leading-6 text-[#5b7068]">
                    {product.handling.join(" · ")}
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>

        <section aria-labelledby="ingredients-heading" className="mt-16 sm:mt-20">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-[2rem] border border-[#dce5dc] bg-white p-6 sm:p-8">
              <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#47745f]">
                Composición
              </p>
              <h2
                id="ingredients-heading"
                className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#204a3b]"
              >
                Ingredientes resumidos
              </h2>
              <ul className="mt-6 space-y-3">
                {product.ingredientSummary.map((ingredient) => (
                  <li
                    key={ingredient}
                    className="flex items-start gap-3 text-base leading-7 text-[#4d655d]"
                  >
                    <CheckCircle2
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0 text-[#4f8067]"
                    />
                    {ingredient}
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-[2rem] border border-[#ead9ad] bg-[#fff9e9] p-6 sm:p-8">
              <div className="flex items-center gap-3 text-[#725725]">
                <AlertTriangle aria-hidden="true" className="size-6" />
                <p className="text-sm font-bold uppercase tracking-[0.14em]">
                  Revisa antes de pedir
                </p>
              </div>
              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.025em] text-[#5e481f]">
                Alérgenos
              </h2>
              <ul className="mt-6 space-y-3">
                {product.allergens.map((allergen) => (
                  <li
                    key={allergen}
                    className="flex items-start gap-3 text-base font-medium leading-7 text-[#684f20]"
                  >
                    <AlertTriangle
                      aria-hidden="true"
                      className="mt-1 size-5 shrink-0"
                    />
                    {allergen}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-sm leading-6 text-[#735d34]">
                El kéfir de leche no es apto para personas con alergia a la
                leche. La fermentación no elimina las proteínas responsables
                de esa alergia.
              </p>
            </div>
          </div>
        </section>

        <section aria-labelledby="transparency-heading" className="mt-16 sm:mt-20">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#47745f]">
              Transparencia
            </p>
            <h2
              id="transparency-heading"
              className="mt-3 text-balance text-3xl font-semibold tracking-[-0.03em] text-[#204a3b] sm:text-4xl"
            >
              Sabes qué estás tomando
            </h2>
            <p className="mt-4 text-base leading-7 text-[#526a62]">
              Cuando falta una ficha real, lo indicamos expresamente. Ningún
              espacio pendiente debe sustituirse por un valor estimado o
              inventado.
            </p>
          </div>

          <dl className="mt-8 grid overflow-hidden rounded-[2rem] border border-[#dce5dc] bg-white sm:grid-cols-2">
            {transparencyFields.map(({ key, label }) => {
              const value = product.transparency[key];
              const pending = value === PENDING_VALIDATION;

              return (
                <div
                  key={key}
                  className="border-b border-[#e4ebe4] p-5 last:border-b-0 sm:p-6 sm:[&:nth-last-child(2)]:border-b-0 sm:[&:nth-child(odd)]:border-r"
                >
                  <dt className="text-sm font-bold uppercase tracking-[0.1em] text-[#61766e]">
                    {label}
                  </dt>
                  <dd
                    className={`mt-2 text-base leading-7 ${
                      pending
                        ? "font-semibold text-[#856329]"
                        : "text-[#345548]"
                    }`}
                  >
                    {value}
                  </dd>
                </div>
              );
            })}
          </dl>
        </section>

        <section
          aria-labelledby="safety-heading"
          className="mt-16 overflow-hidden rounded-[2rem] bg-[#1f513f] p-6 text-white sm:mt-20 sm:p-10 lg:p-12"
        >
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
            <div>
              <ShieldCheck aria-hidden="true" className="size-9 text-[#d5e6d8]" />
              <p className="mt-5 text-sm font-bold uppercase tracking-[0.14em] text-[#cde2d2]">
                Consumo informado
              </p>
              <h2
                id="safety-heading"
                className="mt-3 text-3xl font-semibold tracking-[-0.025em] sm:text-4xl"
              >
                Antes de consumir
              </h2>
              <p className="mt-4 leading-7 text-[#deebe1]">
                Consulta siempre la etiqueta del envase entregado. La ficha del
                sitio debe actualizarse cuando cambie una receta, presentación
                o condición de conservación.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                ...product.handling,
                "No consumir si el envase está abierto o dañado",
                "La tolerancia individual a la lactosa puede variar",
                "El kéfir es un alimento, no un medicamento",
                "No sustituye tratamientos ni atención profesional",
              ].map((notice) => (
                <li
                  key={notice}
                  className="flex items-start gap-3 rounded-2xl bg-white/10 px-4 py-4 leading-6 text-[#f3f8f4]"
                >
                  <CheckCircle2
                    aria-hidden="true"
                    className="mt-0.5 size-5 shrink-0 text-[#cde2d2]"
                  />
                  {notice}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-[#dce5dc] pt-8">
          <Link
            href="/#productos"
            className="inline-flex items-center gap-2 rounded-full border border-[#c5d5c7] bg-white px-5 py-3 text-sm font-bold text-[#315d4b] transition hover:bg-[#eef5ed] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#215541]"
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            Ver todos los productos
          </Link>
          <p className="max-w-xl text-sm leading-6 text-[#5b7068]">
            Los datos demostrativos y pendientes deben reemplazarse con la
            ficha real del producto antes de publicar la tienda.
          </p>
        </div>
      </div>
    </main>
  );
}


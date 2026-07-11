import { ProductCard } from "@/src/components/products/product-card";
import { SectionHeading } from "@/src/components/ui/section-heading";
import { commerceConfig } from "@/src/config/commerce";
import { products } from "@/src/data/products";
import { Info } from "lucide-react";

export function ProductsSection() {
  return (
    <section className="section-shell bg-milk/70" id="productos">
      <div className="site-container">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            description="Elige una presentación, ajusta la cantidad y conserva tu selección en el carrito. Cada ficha distingue los datos confirmados de lo que aún debe validarse."
            eyebrow="Elige tu presentación"
            title="Kéfir para tu ritmo de cada día"
          />
          <div className="max-w-md rounded-2xl border border-ferment/35 bg-ferment/10 p-4 text-xs leading-5 text-leaf-dark">
            <div className="flex gap-2.5">
              <Info aria-hidden="true" className="mt-0.5 shrink-0" size={17} />
              <p>{commerceConfig.demoDataNotice}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-5 text-muted">
          La propuesta “sin lactosa” permanece oculta hasta contar con confirmación real de
          formulación y etiquetado. La fermentación por sí sola no garantiza ausencia de lactosa.
        </p>
      </div>
    </section>
  );
}


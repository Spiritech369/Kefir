import { ProductCard } from "@/src/components/products/product-card";
import { SectionHeading } from "@/src/components/ui/section-heading";
import { products } from "@/src/data/products";

export function ProductsSection() {
  return <section className="section-shell bg-white/70" id="productos"><div className="site-container"><SectionHeading description="Elige la presentación que mejor acompaña tus desayunos, bebidas y recetas. Conserva tu selección en el carrito y confirma disponibilidad por WhatsApp." eyebrow="Presentaciones KEFIRA" title="Un kéfir para cada momento" /><div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{products.map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>;
}

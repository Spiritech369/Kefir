import type { Product } from "@/src/types/product";

export const PENDING_VALIDATION = "Información pendiente de validación";

const milkAllergen = "Contiene leche y proteínas de leche";
const refrigeratedHandling = [
  "Mantener refrigerado",
  "No romper la cadena de frío",
] as const;

/**
 * Editable catalog. Prices, stock and unverified product facts are demo data.
 * The lactose-free proposal remains a draft until the owner has real support
 * for that claim.
 */
export const productCatalog = [
  {
    id: "kefir-natural-500",
    slug: "kefir-natural-500-ml",
    name: "Kéfir natural, 500 ml",
    description: "Sabor fresco y ligeramente ácido.",
    longDescription:
      "Una presentación práctica de kéfir de leche para disfrutar fría, sola o acompañada. Consulta la ficha antes de comprar: ingredientes y atributos pendientes no se publican como afirmaciones confirmadas.",
    presentation: "Botella de 500 ml",
    volumeMl: 500,
    priceMxn: 85,
    priceIsDemo: true,
    image: {
      src: "/images/kefir-natural.webp",
      alt: "Botella de kéfir natural KEFIRA de 500 mililitros",
      width: 900,
      height: 900,
    },
    ingredientSummary: [PENDING_VALIDATION],
    allergens: [milkAllergen],
    claims: [
      { key: "refrigerated", label: "Refrigerado", verified: true },
      { key: "containsMilk", label: "Contiene leche", verified: true },
      {
        key: "noAddedSugar",
        label: "Sin azúcar añadida",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar receta y etiquetado antes de publicar.",
      },
      {
        key: "pasteurizedMilk",
        label: "Leche pasteurizada",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar proveedor y proceso antes de publicar.",
      },
      {
        key: "liveCultures",
        label: "Cultivos vivos",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar proceso y vida útil antes de publicar.",
      },
    ],
    handling: refrigeratedHandling,
    badge: "Más vendido",
    featured: false,
    status: "active",
    inventory: { tracked: true, quantity: 24, isDemo: true },
    transparency: {
      ingredients: PENDING_VALIDATION,
      allergens: milkAllergen,
      nutrition: PENDING_VALIDATION,
      netContent: "500 ml",
      storage: "Mantener refrigerado. Temperatura pendiente de validación.",
      bestBefore: PENDING_VALIDATION,
      cultures: PENDING_VALIDATION,
      addedSugars: PENDING_VALIDATION,
      lactose: "Contiene lactosa; cantidad pendiente de validación.",
      fermentationAlcohol: PENDING_VALIDATION,
      afterOpening: PENDING_VALIDATION,
    },
  },
  {
    id: "kefir-natural-1000",
    slug: "kefir-natural-1-litro",
    name: "Kéfir natural, 1 litro",
    description: "Presentación familiar de sabor fresco y ligeramente ácido.",
    longDescription:
      "La presentación familiar del kéfir natural. Está pensada para compartir o integrar en desayunos y recetas, siempre bajo refrigeración.",
    presentation: "Botella de 1 litro",
    volumeMl: 1_000,
    priceMxn: 150,
    priceIsDemo: true,
    image: {
      src: "/images/kefir-natural.webp",
      alt: "Botella familiar de kéfir natural KEFIRA de un litro",
      width: 900,
      height: 900,
    },
    ingredientSummary: [PENDING_VALIDATION],
    allergens: [milkAllergen],
    claims: [
      { key: "refrigerated", label: "Refrigerado", verified: true },
      { key: "containsMilk", label: "Contiene leche", verified: true },
      {
        key: "noAddedSugar",
        label: "Sin azúcar añadida",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar receta y etiquetado antes de publicar.",
      },
      {
        key: "pasteurizedMilk",
        label: "Leche pasteurizada",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar proveedor y proceso antes de publicar.",
      },
      {
        key: "liveCultures",
        label: "Cultivos vivos",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar proceso y vida útil antes de publicar.",
      },
    ],
    handling: refrigeratedHandling,
    badge: "Mejor valor",
    featured: true,
    status: "active",
    inventory: { tracked: true, quantity: 16, isDemo: true },
    transparency: {
      ingredients: PENDING_VALIDATION,
      allergens: milkAllergen,
      nutrition: PENDING_VALIDATION,
      netContent: "1 litro",
      storage: "Mantener refrigerado. Temperatura pendiente de validación.",
      bestBefore: PENDING_VALIDATION,
      cultures: PENDING_VALIDATION,
      addedSugars: PENDING_VALIDATION,
      lactose: "Contiene lactosa; cantidad pendiente de validación.",
      fermentationAlcohol: PENDING_VALIDATION,
      afterOpening: PENDING_VALIDATION,
    },
  },
  {
    id: "kefir-fresa-500",
    slug: "kefir-fresa-500-ml",
    name: "Kéfir con fresa, 500 ml",
    description: "Kéfir de leche con preparación de fresa.",
    longDescription:
      "Una versión frutal cuya receta, ingredientes y contenido real de azúcares deben completarse con la ficha del producto antes de publicarse como datos confirmados.",
    presentation: "Botella de 500 ml",
    volumeMl: 500,
    priceMxn: 95,
    priceIsDemo: true,
    image: {
      src: "/images/kefir-fresa.webp",
      alt: "Botella de kéfir con preparación de fresa de 500 mililitros",
      width: 900,
      height: 900,
    },
    ingredientSummary: [PENDING_VALIDATION],
    allergens: [milkAllergen],
    claims: [
      { key: "refrigerated", label: "Refrigerado", verified: true },
      { key: "containsMilk", label: "Contiene leche", verified: true },
      {
        key: "pasteurizedMilk",
        label: "Leche pasteurizada",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar proveedor y proceso antes de publicar.",
      },
      {
        key: "liveCultures",
        label: "Cultivos vivos",
        verified: true,
        verificationNote: "Dato inicial proporcionado; validar proceso y vida útil antes de publicar.",
      },
    ],
    handling: refrigeratedHandling,
    status: "active",
    inventory: { tracked: true, quantity: 12, isDemo: true },
    transparency: {
      ingredients: PENDING_VALIDATION,
      allergens: milkAllergen,
      nutrition: PENDING_VALIDATION,
      netContent: "500 ml",
      storage: "Mantener refrigerado. Temperatura pendiente de validación.",
      bestBefore: PENDING_VALIDATION,
      cultures: PENDING_VALIDATION,
      addedSugars: PENDING_VALIDATION,
      lactose: "Contiene lactosa; cantidad pendiente de validación.",
      fermentationAlcohol: PENDING_VALIDATION,
      afterOpening: PENDING_VALIDATION,
    },
  },
  {
    id: "kefir-sin-lactosa-500",
    slug: "kefir-sin-lactosa-500-ml",
    name: "Kéfir sin lactosa, 500 ml",
    description:
      "Producto en borrador; no debe mostrarse hasta confirmar formalmente la condición sin lactosa.",
    longDescription:
      "Esta propuesta está desactivada. La fermentación por sí sola no permite llamar sin lactosa a un producto; el negocio debe validar la formulación y el etiquetado antes de publicarlo.",
    presentation: "Botella de 500 ml",
    volumeMl: 500,
    priceMxn: 95,
    priceIsDemo: true,
    image: {
      src: "/images/kefir-sin-lactosa.webp",
      alt: "Espacio reservado para una futura presentación de kéfir sin lactosa",
      width: 900,
      height: 900,
    },
    ingredientSummary: [PENDING_VALIDATION],
    allergens: [
      "Contiene proteínas de leche",
      "No apto para personas con alergia a la leche",
    ],
    claims: [
      { key: "refrigerated", label: "Refrigerado", verified: true },
      {
        key: "containsMilkProteins",
        label: "Contiene proteínas de leche",
        verified: true,
      },
      {
        key: "lactoseFree",
        label: "Sin lactosa",
        verified: false,
        verificationNote:
          "No publicar hasta contar con confirmación real de formulación y etiquetado.",
      },
    ],
    handling: refrigeratedHandling,
    status: "draft",
    inventory: { tracked: true, quantity: 0, isDemo: true },
    transparency: {
      ingredients: PENDING_VALIDATION,
      allergens:
        "Contiene proteínas de leche. No apto para alergia a la leche.",
      nutrition: PENDING_VALIDATION,
      netContent: "500 ml",
      storage: "Mantener refrigerado. Temperatura pendiente de validación.",
      bestBefore: PENDING_VALIDATION,
      cultures: PENDING_VALIDATION,
      addedSugars: PENDING_VALIDATION,
      lactose: PENDING_VALIDATION,
      fermentationAlcohol: PENDING_VALIDATION,
      afterOpening: PENDING_VALIDATION,
    },
  },
] as const satisfies readonly Product[];

/** Publicly renderable products. Draft claims/products are deliberately absent. */
export const products: readonly Product[] = productCatalog.filter(
  (product) => product.status !== "draft",
);

export const featuredProduct = products.find((product) => product.featured);

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getCatalogProductBySlug(slug: string): Product | undefined {
  return productCatalog.find((product) => product.slug === slug);
}

export function getPricePerLiterMxn(product: Product): number {
  if (product.volumeMl <= 0) {
    return 0;
  }

  return Math.round((product.priceMxn * 1_000 * 100) / product.volumeMl) / 100;
}

export function isProductAvailable(product: Product): boolean {
  if (product.status !== "active") {
    return false;
  }

  return !product.inventory.tracked || (product.inventory.quantity ?? 0) > 0;
}

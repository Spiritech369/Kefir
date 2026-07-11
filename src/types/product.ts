export const PRODUCT_CLAIM_KEYS = [
  "pasteurizedMilk",
  "refrigerated",
  "liveCultures",
  "noAddedSugar",
  "lactoseFree",
  "containsMilk",
  "containsMilkProteins",
] as const;

export type ProductClaimKey = (typeof PRODUCT_CLAIM_KEYS)[number];

export type ProductStatus = "active" | "sold-out" | "draft";

export interface ProductClaim {
  key: ProductClaimKey;
  label: string;
  /** Only verified claims may be rendered as badges or included in SEO. */
  verified: boolean;
  verificationNote?: string;
}

export interface ProductImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}

export interface ProductInventory {
  tracked: boolean;
  /** Integer units. Null means inventory is not tracked. */
  quantity: number | null;
  /** Demo inventory must be replaced before publishing. */
  isDemo: boolean;
}

export interface ProductTransparency {
  ingredients: string;
  allergens: string;
  nutrition: string;
  netContent: string;
  storage: string;
  bestBefore: string;
  cultures: string;
  addedSugars: string;
  lactose: string;
  fermentationAlcohol: string;
  afterOpening: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  presentation: string;
  volumeMl: number;
  /** Amount expressed in Mexican pesos, never in cents. */
  priceMxn: number;
  priceIsDemo: boolean;
  image: ProductImage;
  ingredientSummary: readonly string[];
  allergens: readonly string[];
  claims: readonly ProductClaim[];
  handling: readonly string[];
  badge?: string;
  featured?: boolean;
  status: ProductStatus;
  inventory: ProductInventory;
  transparency: ProductTransparency;
}

export function getVerifiedClaims(product: Product): readonly ProductClaim[] {
  return product.claims.filter((claim) => claim.verified);
}

export function hasVerifiedClaim(
  product: Product,
  key: ProductClaimKey,
): boolean {
  return product.claims.some(
    (claim) => claim.key === key && claim.verified,
  );
}

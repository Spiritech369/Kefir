import { siteConfig } from "@/src/config/site";
import type { FaqItem } from "@/src/data/faqs";
import { getVerifiedClaims } from "@/src/types/product";
import type { Product } from "@/src/types/product";

export type JsonLd = Record<string, unknown>;

export interface BreadcrumbItem {
  name: string;
  path: string;
}

function absoluteUrl(path: string): string {
  if (/^https?:\/\//i.test(path)) {
    return path;
  }

  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createOrganizationJsonLd(): JsonLd {
  const organization: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.city,
      addressCountry: siteConfig.countryCode,
    },
    sameAs: [siteConfig.instagram.url],
  };

  if (siteConfig.whatsapp.isConfigured) {
    organization.contactPoint = {
      "@type": "ContactPoint",
      telephone: `+${siteConfig.whatsapp.number}`,
      contactType: "sales",
      availableLanguage: "Spanish",
      areaServed: siteConfig.countryCode,
    };
  }

  return organization;
}

export function createFaqJsonLd(faqItems: readonly FaqItem[]): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function createBreadcrumbJsonLd(
  items: readonly BreadcrumbItem[],
): JsonLd {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function createProductJsonLd(product: Product): JsonLd {
  const verifiedClaims = getVerifiedClaims(product);
  const productData: JsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: [absoluteUrl(product.image.src)],
    sku: product.id,
    url: absoluteUrl(`/productos/${product.slug}`),
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: "Kéfir de leche",
  };

  if (verifiedClaims.length > 0) {
    productData.additionalProperty = verifiedClaims.map((claim) => ({
      "@type": "PropertyValue",
      name: claim.label,
      value: "Confirmado",
    }));
  }

  // Demo prices are intentionally withheld from search engines until validated.
  if (!product.priceIsDemo && product.status !== "draft") {
    const quantity = product.inventory.quantity ?? 0;
    const isAvailable =
      product.status === "active" &&
      (!product.inventory.tracked || quantity > 0);

    productData.offers = {
      "@type": "Offer",
      url: absoluteUrl(`/productos/${product.slug}`),
      priceCurrency: siteConfig.currency,
      price: product.priceMxn.toFixed(2),
      availability: isAvailable
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    };
  }

  return productData;
}

/** Escapes `<` so JSON-LD cannot terminate its script element. */
export function serializeJsonLd(data: JsonLd | readonly JsonLd[]): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

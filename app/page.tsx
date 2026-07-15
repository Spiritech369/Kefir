import {
  BenefitsSection,
  BrandStorySection,
  ClaimsSection,
  ConsumptionSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  ProcessSection,
  SafetySection,
  TestimonialsSection,
} from "@/src/components/home";
import { ProductsSection } from "@/src/components/products/products-section";
import { siteConfig } from "@/src/config/site";
import { products } from "@/src/data/products";
import {
  createBreadcrumbJsonLd,
  createOrganizationJsonLd,
  createProductJsonLd,
  serializeJsonLd,
} from "@/src/lib/structured-data";

export default function HomePage() {
  const structuredData = [
    createOrganizationJsonLd(),
    createBreadcrumbJsonLd([{ name: "Inicio", path: "/" }]),
    ...products.map(createProductJsonLd),
  ];

  return (
    <>
      <script
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(structuredData) }}
        type="application/ld+json"
      />
      <HeroSection />
      <BrandStorySection />
      <BenefitsSection />
      <ProductsSection />
      <ProcessSection />
      <ConsumptionSection />
      <ClaimsSection />
      <SafetySection />
      <TestimonialsSection enabled={siteConfig.testimonialsEnabled} />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}

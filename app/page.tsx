import {
  BenefitsSection,
  ClaimsSection,
  ConsumptionSection,
  FaqSection,
  FinalCtaSection,
  HeroSection,
  ProcessSection,
  SafetySection,
  TestimonialsSection,
  TransparencySection,
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
      <BenefitsSection />
      <ProductsSection />
      <ProcessSection />
      <TransparencySection />
      <ConsumptionSection />
      <ClaimsSection />
      <SafetySection />
      <TestimonialsSection enabled={siteConfig.testimonialsEnabled} />
      <FaqSection />
      <FinalCtaSection />
    </>
  );
}


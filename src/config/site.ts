const configuredWhatsAppNumber = (
  process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? ""
).replace(/\D/g, "");

const configuredSiteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://kefirvivo.mx"
).replace(/\/$/, "");

export const siteConfig = {
  name: "Kéfir Vivo",
  slogan: "Fermentado con tiempo, cuidado y cultivos vivos",
  country: "México",
  countryCode: "MX",
  locale: "es-MX",
  currency: "MXN",
  city: "Ciudad de México",
  email: "hola@kefirvivo.mx",
  instagram: {
    handle: "@kefirvivo",
    url: "https://www.instagram.com/kefirvivo/",
  },
  whatsapp: {
    number: configuredWhatsAppNumber,
    isConfigured: configuredWhatsAppNumber.length > 0,
  },
  url: configuredSiteUrl,
  announcement: {
    text: "Entrega refrigerada en zonas seleccionadas de Ciudad de México",
    linkLabel: "Consulta cobertura",
    href: "#cobertura",
  },
  navigation: [
    { label: "Inicio", href: "#inicio" },
    { label: "Beneficios", href: "#beneficios" },
    { label: "Productos", href: "#productos" },
    { label: "Cómo lo hacemos", href: "#proceso" },
    { label: "Preguntas frecuentes", href: "#preguntas-frecuentes" },
    { label: "Contacto", href: "#contacto" },
  ],
  seo: {
    title: "Kéfir artesanal en Ciudad de México | Kéfir Vivo",
    description:
      "Compra kéfir artesanal refrigerado, elaborado con leche pasteurizada y cultivos vivos. Presentaciones naturales, información transparente y pedidos por WhatsApp.",
  },
  testimonialsEnabled: true,
  /** Initial facts supplied by the owner; validate operational evidence before launch. */
  verifiedBrandClaims: {
    pasteurizedMilk: true,
    refrigerated: true,
    liveCultures: true,
    noAddedSugarNatural: true,
  },
  legalReview: {
    privacyNoticeReviewed: false,
    termsReviewed: false,
    deliveryPolicyReviewed: false,
    returnsPolicyReviewed: false,
  },
} as const;

export type SiteConfig = typeof siteConfig;

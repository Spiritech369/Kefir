const configuredWhatsAppNumber = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "528184698543").replace(/\D/g, "");
const configuredSiteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://kefir-green.vercel.app").replace(/\/$/, "");
const whatsappIntroMessage = "Hola, quiero información sobre el kéfir artesanal KEFIRA.";
const configuredWhatsAppHref = configuredWhatsAppNumber
  ? `https://wa.me/${configuredWhatsAppNumber}?text=${encodeURIComponent(whatsappIntroMessage)}`
  : "#contacto";

export const siteConfig = {
  name: "KEFIRA",
  descriptor: "KÉFIR ARTESANAL",
  slogan: "Natural, fresco y hecho con cariño",
  country: "México",
  countryCode: "MX",
  locale: "es-MX",
  currency: "MXN",
  city: "Monterrey, N.L.",
  email: "hola@kefira.mx",
  instagram: { handle: "@kefir_kefira_", url: "https://www.instagram.com/kefir_kefira_/" },
  whatsapp: { number: configuredWhatsAppNumber, isConfigured: configuredWhatsAppNumber.length > 0 },
  url: configuredSiteUrl,
  announcement: {
    text: "Hecho en Monterrey, N.L. · Mantener refrigerado de 2 °C a 6 °C",
    linkLabel: "Pedir por WhatsApp",
    href: configuredWhatsAppHref,
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
    title: "KEFIRA | Kéfir artesanal en Monterrey",
    description: "Kéfir artesanal natural, elaborado con leche de alta calidad y cultivos vivos. Presentación de 1 litro, hecho con cariño en Monterrey, N.L.",
  },
  testimonialsEnabled: false,
  verifiedBrandClaims: { pasteurizedMilk: true, refrigerated: true, liveCultures: true, noAddedSugarNatural: false },
  legalReview: { privacyNoticeReviewed: false, termsReviewed: false, deliveryPolicyReviewed: false, returnsPolicyReviewed: false },
} as const;

export type SiteConfig = typeof siteConfig;

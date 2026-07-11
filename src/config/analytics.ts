const analyticsRequested =
  process.env.NEXT_PUBLIC_ANALYTICS_ENABLED === "true";
const analyticsMeasurementId =
  process.env.NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID?.trim() ?? "";

export const analyticsConfig = {
  enabled: analyticsRequested && analyticsMeasurementId.length > 0,
  provider: "google-analytics" as const,
  measurementId: analyticsMeasurementId,
  consentRequired: true,
  loadBeforeConsent: false,
  cookieName: "kefir-vivo-analytics-consent",
} as const;

export type AnalyticsConfig = typeof analyticsConfig;

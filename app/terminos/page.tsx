import type { Metadata } from "next";

import { LegalDocumentPage } from "@/src/components/legal";
import { termsDocument } from "@/src/data/legal";

export const metadata: Metadata = {
  title: "Términos y condiciones",
  description:
    "Conoce el proceso propuesto para solicitar, confirmar y recibir pedidos. Plantilla comercial y legal pendiente de validación.",
  alternates: { canonical: "/terminos" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return <LegalDocumentPage document={termsDocument} />;
}


import type { Metadata } from "next";

import { LegalDocumentPage } from "@/src/components/legal";
import { privacyDocument } from "@/src/data/legal";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Consulta cómo se prepararían y utilizarían los datos de un pedido de kéfir por WhatsApp. Plantilla pendiente de revisión por el negocio.",
  alternates: { canonical: "/aviso-de-privacidad" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return <LegalDocumentPage document={privacyDocument} />;
}


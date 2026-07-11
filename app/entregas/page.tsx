import type { Metadata } from "next";

import { LegalDocumentPage } from "@/src/components/legal";
import { deliveriesDocument } from "@/src/data/legal";

export const metadata: Metadata = {
  title: "Política de entregas",
  description:
    "Consulta cómo se coordinan cobertura, horarios, recepción y refrigeración de los pedidos. Datos operativos sujetos a confirmación.",
  alternates: { canonical: "/entregas" },
  robots: { index: true, follow: true },
};

export default function DeliveriesPage() {
  return <LegalDocumentPage document={deliveriesDocument} />;
}


import type { Metadata } from "next";

import { LegalDocumentPage } from "@/src/components/legal";
import { returnsDocument } from "@/src/data/legal";

export const metadata: Metadata = {
  title: "Política de devoluciones",
  description:
    "Revisa el proceso propuesto para reportar un pedido incompleto, equivocado, dañado o fuera de condición.",
  alternates: { canonical: "/devoluciones" },
  robots: { index: true, follow: true },
};

export default function ReturnsPage() {
  return <LegalDocumentPage document={returnsDocument} />;
}


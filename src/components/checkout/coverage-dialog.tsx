"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { Dialog } from "@/src/components/ui/dialog";
import {
  checkDeliveryCoverage,
  normalizePostalCode,
  type DeliveryCoverageResult,
} from "@/src/data/delivery-zones";
import { CircleCheck, Info, MapPin, MessageCircle } from "lucide-react";
import { type FormEvent, useState } from "react";

export function CoverageDialog() {
  const { activePanel, closePanel, openCheckout } = useCommerce();
  const [postalCode, setPostalCode] = useState("");
  const [result, setResult] = useState<DeliveryCoverageResult | null>(null);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult(checkDeliveryCoverage(postalCode));
  };

  return (
    <Dialog
      description="Consulta una lista local de demostración. La cobertura real siempre se confirma antes de aceptar el pedido."
      onClose={closePanel}
      open={activePanel === "coverage"}
      size="md"
      title="Consulta cobertura"
    >
      <div className="overflow-y-auto px-5 py-6 sm:px-7">
        <div className="rounded-2xl border border-ferment/35 bg-ferment/10 p-4 text-sm leading-6 text-leaf-dark">
          <div className="flex gap-3">
            <Info aria-hidden="true" className="mt-0.5 shrink-0" size={19} />
            <p>
              Los códigos postales cargados son ejemplos editables. No representan cobertura
              comercial confirmada.
            </p>
          </div>
        </div>

        <form className="mt-6" onSubmit={submit}>
          <label className="field-label" htmlFor="coverage-postal-code">
            Código postal
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative flex-1">
              <MapPin
                aria-hidden="true"
                className="pointer-events-none absolute left-3 top-3.5 text-muted"
                size={19}
              />
              <input
                autoComplete="postal-code"
                className="field-input !pl-10"
                id="coverage-postal-code"
                inputMode="numeric"
                maxLength={5}
                onChange={(event) => {
                  setPostalCode(normalizePostalCode(event.target.value));
                  setResult(null);
                }}
                placeholder="Ej. 03100"
                value={postalCode}
              />
            </div>
            <button className="button-primary" type="submit">
              Consultar
            </button>
          </div>
        </form>

        <div aria-live="polite" className="mt-5 min-h-24">
          {result ? (
            <div
              className={`rounded-2xl border p-5 ${
                result.status === "listed-demo"
                  ? "border-leaf/25 bg-leaf-soft/55"
                  : result.status === "invalid"
                    ? "border-berry/35 bg-berry/8"
                    : "border-oat bg-cream"
              }`}
            >
              <div className="flex items-start gap-3">
                {result.status === "listed-demo" ? (
                  <CircleCheck aria-hidden="true" className="mt-0.5 shrink-0 text-leaf" size={21} />
                ) : (
                  <Info aria-hidden="true" className="mt-0.5 shrink-0 text-leaf" size={21} />
                )}
                <div>
                  <h3 className="font-sans text-base font-bold text-leaf-dark">{result.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-muted">{result.message}</p>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>

      <div className="safe-bottom border-t border-line bg-cream/70 px-5 py-4 sm:px-7">
        <button className="button-secondary w-full" onClick={openCheckout} type="button">
          <MessageCircle aria-hidden="true" size={18} />
          Continuar pedido por WhatsApp
        </button>
      </div>
    </Dialog>
  );
}


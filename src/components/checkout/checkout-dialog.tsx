"use client";

import { useCommerce } from "@/src/components/cart/commerce-provider";
import { Dialog } from "@/src/components/ui/dialog";
import { commerceConfig } from "@/src/config/commerce";
import { calculateOrderTotals } from "@/src/lib/cart";
import { formatCurrency } from "@/src/lib/currency";
import { checkoutSchema } from "@/src/lib/validation";
import type { CartItem, DeliveryMethod, PreparedOrder } from "@/src/types/order";
import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  LoaderCircle,
  LockKeyhole,
  MessageCircle,
  PackageCheck,
  Truck,
} from "lucide-react";
import Link from "next/link";
import {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

type CheckoutDraft = {
  name: string;
  phone: string;
  postalCode: string;
  neighborhood: string;
  address: string;
  references: string;
  preferredDeliveryDay: string;
  preferredTime: string;
  deliveryMethod: DeliveryMethod;
  notes: string;
  ingredientsAndAllergensAccepted: boolean;
  privacyAccepted: boolean;
};

type FieldErrors = Partial<Record<keyof CheckoutDraft, string>>;

type PrepareOrderResponse = {
  ok: boolean;
  order?: PreparedOrder;
  whatsappUrl?: string | null;
  whatsappConfigured?: boolean;
  message?: string | null;
  fieldErrors?: Record<string, string[]>;
};

const initialDraft: CheckoutDraft = {
  name: "",
  phone: "",
  postalCode: "",
  neighborhood: "",
  address: "",
  references: "",
  preferredDeliveryDay: "",
  preferredTime: "",
  deliveryMethod: "home-delivery",
  notes: "",
  ingredientsAndAllergensAccepted: false,
  privacyAccepted: false,
};

type TextFieldProps = {
  id: keyof CheckoutDraft;
  label: string;
  value: string;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: "text" | "tel" | "numeric";
  maxLength?: number;
  multiline?: boolean;
  required?: boolean;
};

function TextField({
  id,
  label,
  value,
  error,
  onChange,
  placeholder,
  autoComplete,
  inputMode = "text",
  maxLength,
  multiline = false,
  required = false,
}: TextFieldProps) {
  const describedBy = error ? `${id}-error` : undefined;
  const common = {
    "aria-describedby": describedBy,
    "aria-invalid": Boolean(error),
    autoComplete,
    className: "field-input",
    id,
    maxLength,
    name: id,
    onChange,
    placeholder,
    required,
    value,
  };

  return (
    <div>
      <label className="field-label" htmlFor={id}>
        {label} {required ? <span aria-hidden="true">*</span> : null}
      </label>
      {multiline ? (
        <textarea {...common} className="field-input min-h-24 resize-y" rows={3} />
      ) : (
        <input {...common} inputMode={inputMode} type={inputMode === "tel" ? "tel" : "text"} />
      )}
      {error ? (
        <p className="field-error" id={`${id}-error`}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function CheckoutDialog() {
  const { activePanel, closePanel, items, returnToCart } = useCommerce();
  const [draft, setDraft] = useState<CheckoutDraft>(initialDraft);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [generalError, setGeneralError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [step, setStep] = useState<"form" | "review">("form");
  const [preparedOrder, setPreparedOrder] = useState<PreparedOrder | null>(null);
  const [whatsappUrl, setWhatsappUrl] = useState<string | null>(null);
  const [whatsappMessage, setWhatsappMessage] = useState<string | null>(null);
  const reviewHeadingRef = useRef<HTMLHeadingElement>(null);
  const cartSignature = useMemo(() => JSON.stringify(items), [items]);

  useEffect(() => {
    let active = true;
    queueMicrotask(() => {
      if (!active) return;
      setStep("form");
      setPreparedOrder(null);
      setWhatsappUrl(null);
    });
    return () => {
      active = false;
    };
  }, [cartSignature]);

  useEffect(() => {
    if (step === "review") reviewHeadingRef.current?.focus();
  }, [step]);

  const updateText = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const key = event.target.name as keyof CheckoutDraft;
    let value = event.target.value;
    if (key === "postalCode") value = value.replace(/\D/g, "").slice(0, 5);
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
    setGeneralError("");
  };

  const prepareOrder = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setGeneralError("");
    setWhatsappMessage(null);

    const result = checkoutSchema.safeParse(draft);
    if (!result.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of result.error.issues) {
        const key = issue.path[0] as keyof CheckoutDraft | undefined;
        if (key && !fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      setGeneralError("Revisa los campos marcados antes de continuar.");
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items, customer: result.data }),
      });
      const payload = (await response.json()) as PrepareOrderResponse;
      if (!response.ok || !payload.ok || !payload.order) {
        setGeneralError(payload.message || "No pudimos preparar el pedido.");
        return;
      }

      setPreparedOrder(payload.order);
      setWhatsappUrl(payload.whatsappUrl ?? null);
      setWhatsappMessage(payload.message ?? null);
      setStep("review");
    } catch {
      setGeneralError("No pudimos conectar con el preparador del pedido. Revisa tu conexión e intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  const liveTotals = calculateOrderTotals(items as readonly CartItem[], draft.deliveryMethod);

  return (
    <Dialog
      description="Validaremos tus datos y te mostraremos el pedido completo antes de abrir WhatsApp."
      onClose={closePanel}
      open={activePanel === "checkout"}
      size="xl"
      title="Finaliza tu pedido"
    >
      {step === "form" ? (
        <form className="flex min-h-0 flex-1 flex-col" data-testid="checkout-form" onSubmit={prepareOrder}>
          <div className="no-scrollbar overflow-y-auto px-5 py-6 sm:px-7">
            <div className="mb-7 flex gap-3 rounded-2xl border border-leaf/20 bg-leaf-soft/45 p-4 text-sm leading-6 text-leaf-dark">
              <LockKeyhole aria-hidden="true" className="mt-0.5 shrink-0" size={19} />
              <p>
                Tus datos se usan únicamente para preparar este pedido. No recopilamos tarjetas ni
                enviamos la información a otro servicio antes de que tú abras WhatsApp.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <TextField
                autoComplete="name"
                error={errors.name}
                id="name"
                label="Nombre"
                onChange={updateText}
                placeholder="Tu nombre"
                required
                value={draft.name}
              />
              <TextField
                autoComplete="tel"
                error={errors.phone}
                id="phone"
                inputMode="tel"
                label="Teléfono"
                onChange={updateText}
                placeholder="55 1234 5678"
                required
                value={draft.phone}
              />
              <TextField
                autoComplete="postal-code"
                error={errors.postalCode}
                id="postalCode"
                inputMode="numeric"
                label="Código postal"
                maxLength={5}
                onChange={updateText}
                placeholder="03100"
                required
                value={draft.postalCode}
              />
              <TextField
                autoComplete="address-level3"
                error={errors.neighborhood}
                id="neighborhood"
                label="Colonia"
                onChange={updateText}
                placeholder="Nombre de tu colonia"
                required
                value={draft.neighborhood}
              />
              <div className="sm:col-span-2">
                <TextField
                  autoComplete="street-address"
                  error={errors.address}
                  id="address"
                  label="Dirección o punto de entrega"
                  multiline
                  onChange={updateText}
                  placeholder="Calle, número y detalles del punto de entrega"
                  required
                  value={draft.address}
                />
              </div>
              <div className="sm:col-span-2">
                <TextField
                  error={errors.references}
                  id="references"
                  label="Referencias"
                  multiline
                  onChange={updateText}
                  placeholder="Entre calles, color de fachada o indicaciones útiles"
                  value={draft.references}
                />
              </div>
              <TextField
                error={errors.preferredDeliveryDay}
                id="preferredDeliveryDay"
                label="Día de entrega preferido"
                onChange={updateText}
                placeholder="Ej. sábado 20"
                required
                value={draft.preferredDeliveryDay}
              />
              <TextField
                error={errors.preferredTime}
                id="preferredTime"
                label="Horario preferido"
                onChange={updateText}
                placeholder="Ej. 10:00 a 13:00"
                required
                value={draft.preferredTime}
              />
            </div>

            <fieldset className="mt-7">
              <legend className="field-label">Método de entrega *</legend>
              <div className="grid gap-3 sm:grid-cols-2">
                {([
                  {
                    value: "home-delivery" as const,
                    title: "Entrega a domicilio",
                    detail: `Costo demostrativo: ${formatCurrency(commerceConfig.deliveryFeeMxn)}`,
                    icon: Truck,
                  },
                  {
                    value: "pickup" as const,
                    title: "Recolección acordada",
                    detail: "Punto y horario sujetos a confirmación",
                    icon: PackageCheck,
                  },
                ]).map((option) => {
                  const Icon = option.icon;
                  return (
                    <label
                      className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 transition ${
                        draft.deliveryMethod === option.value
                          ? "border-leaf bg-leaf-soft/60"
                          : "border-line bg-milk hover:border-leaf/45"
                      }`}
                      key={option.value}
                    >
                      <input
                        checked={draft.deliveryMethod === option.value}
                        className="mt-1 accent-leaf"
                        name="deliveryMethod"
                        onChange={() => {
                          setDraft((current) => ({ ...current, deliveryMethod: option.value }));
                          setErrors((current) => ({ ...current, deliveryMethod: undefined }));
                        }}
                        type="radio"
                        value={option.value}
                      />
                      <Icon aria-hidden="true" className="mt-0.5 shrink-0 text-leaf" size={20} />
                      <span>
                        <span className="block text-sm font-bold text-leaf-dark">{option.title}</span>
                        <span className="mt-1 block text-xs leading-5 text-muted">{option.detail}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <div className="mt-5">
              <TextField
                error={errors.notes}
                id="notes"
                label="Notas"
                maxLength={500}
                multiline
                onChange={updateText}
                placeholder="Preferencias o información adicional no sensible"
                value={draft.notes}
              />
            </div>

            <div className="mt-7 grid gap-3">
              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream/55 p-4">
                <input
                  aria-describedby={errors.ingredientsAndAllergensAccepted ? "allergens-error" : undefined}
                  aria-invalid={Boolean(errors.ingredientsAndAllergensAccepted)}
                  checked={draft.ingredientsAndAllergensAccepted}
                  className="mt-1 size-4 accent-leaf"
                  name="ingredientsAndAllergensAccepted"
                  onChange={(event) => {
                    setDraft((current) => ({
                      ...current,
                      ingredientsAndAllergensAccepted: event.target.checked,
                    }));
                    setErrors((current) => ({ ...current, ingredientsAndAllergensAccepted: undefined }));
                  }}
                  type="checkbox"
                />
                <span className="text-sm leading-6 text-ink">
                  Confirmo que revisé los ingredientes, alérgenos y condiciones de conservación. *
                </span>
              </label>
              {errors.ingredientsAndAllergensAccepted ? (
                <p className="field-error !mt-0" id="allergens-error">
                  {errors.ingredientsAndAllergensAccepted}
                </p>
              ) : null}

              <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream/55 p-4">
                <input
                  aria-describedby={errors.privacyAccepted ? "privacy-error" : undefined}
                  aria-invalid={Boolean(errors.privacyAccepted)}
                  checked={draft.privacyAccepted}
                  className="mt-1 size-4 accent-leaf"
                  name="privacyAccepted"
                  onChange={(event) => {
                    setDraft((current) => ({ ...current, privacyAccepted: event.target.checked }));
                    setErrors((current) => ({ ...current, privacyAccepted: undefined }));
                  }}
                  type="checkbox"
                />
                <span className="text-sm leading-6 text-ink">
                  Acepto el{" "}
                  <Link className="font-semibold text-leaf underline underline-offset-4" href="/aviso-de-privacidad" target="_blank">
                    aviso de privacidad
                  </Link>
                  . *
                </span>
              </label>
              {errors.privacyAccepted ? (
                <p className="field-error !mt-0" id="privacy-error">
                  {errors.privacyAccepted}
                </p>
              ) : null}
            </div>

            <div aria-live="assertive" className="mt-5 min-h-6">
              {generalError ? (
                <p className="flex items-start gap-2 text-sm font-semibold text-berry">
                  <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={18} />
                  {generalError}
                </p>
              ) : null}
            </div>
          </div>

          <div className="safe-bottom border-t border-line bg-cream/70 px-5 py-4 sm:px-7">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <button className="button-ghost" onClick={returnToCart} type="button">
                <ArrowLeft aria-hidden="true" size={18} />
                Volver al carrito
              </button>
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
                <p className="text-right text-sm text-muted">
                  Total estimado{" "}
                  <strong className="text-base text-leaf-dark">{formatCurrency(liveTotals.totalMxn)}</strong>
                </p>
                <button className="button-primary" disabled={submitting} type="submit">
                  {submitting ? (
                    <LoaderCircle aria-hidden="true" className="animate-spin" size={18} />
                  ) : (
                    <CheckCircle2 aria-hidden="true" size={18} />
                  )}
                  {submitting ? "Preparando resumen…" : "Revisar pedido"}
                </button>
              </div>
            </div>
          </div>
        </form>
      ) : preparedOrder ? (
        <div className="flex min-h-0 flex-1 flex-col" data-testid="order-review">
          <div className="no-scrollbar overflow-y-auto px-5 py-6 sm:px-7">
            <h3
              className="text-3xl font-semibold text-leaf-dark outline-none"
              ref={reviewHeadingRef}
              tabIndex={-1}
            >
              Revisa antes de abrir WhatsApp
            </h3>
            <p className="mt-2 text-sm leading-6 text-muted">
              Nada se enviará hasta que pulses el botón final y confirmes el mensaje dentro de WhatsApp.
            </p>

            <div className="mt-7 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
              <section aria-labelledby="review-products" className="rounded-3xl border border-line bg-cream/55 p-5">
                <h4 className="font-sans text-sm font-bold text-leaf-dark" id="review-products">
                  Productos
                </h4>
                <ul className="mt-4 divide-y divide-line">
                  {preparedOrder.lines.map((line) => (
                    <li className="flex justify-between gap-4 py-3 text-sm" key={line.productId}>
                      <span className="text-ink">
                        <strong>{line.quantity} ×</strong> {line.productName}
                      </span>
                      <span className="shrink-0 font-semibold tabular-nums text-leaf-dark">
                        {formatCurrency(line.lineTotalMxn)}
                      </span>
                    </li>
                  ))}
                </ul>
                <dl className="mt-4 space-y-2 border-t border-line pt-4 text-sm">
                  <div className="flex justify-between text-muted">
                    <dt>Subtotal</dt>
                    <dd>{formatCurrency(preparedOrder.totals.subtotalMxn)}</dd>
                  </div>
                  <div className="flex justify-between text-muted">
                    <dt>Entrega estimada</dt>
                    <dd>{formatCurrency(preparedOrder.totals.deliveryMxn)}</dd>
                  </div>
                  <div className="flex justify-between pt-2 text-base font-bold text-leaf-dark">
                    <dt>Total estimado</dt>
                    <dd>{formatCurrency(preparedOrder.totals.totalMxn)}</dd>
                  </div>
                </dl>
              </section>

              <section aria-labelledby="review-delivery" className="rounded-3xl border border-line bg-milk p-5">
                <h4 className="font-sans text-sm font-bold text-leaf-dark" id="review-delivery">
                  Entrega y contacto
                </h4>
                <dl className="mt-4 grid gap-3 text-sm">
                  <div><dt className="text-xs font-semibold text-muted">Nombre</dt><dd className="mt-0.5 text-ink">{preparedOrder.customer.name}</dd></div>
                  <div><dt className="text-xs font-semibold text-muted">Teléfono</dt><dd className="mt-0.5 text-ink">{preparedOrder.customer.phone}</dd></div>
                  <div><dt className="text-xs font-semibold text-muted">Zona</dt><dd className="mt-0.5 text-ink">CP {preparedOrder.customer.postalCode}, {preparedOrder.customer.neighborhood}</dd></div>
                  <div><dt className="text-xs font-semibold text-muted">Dirección</dt><dd className="mt-0.5 text-ink">{preparedOrder.customer.address}</dd></div>
                  <div><dt className="text-xs font-semibold text-muted">Preferencia</dt><dd className="mt-0.5 text-ink">{preparedOrder.customer.preferredDeliveryDay}, {preparedOrder.customer.preferredTime}</dd></div>
                </dl>
              </section>
            </div>

            <div className="mt-6 rounded-2xl border border-ferment/35 bg-ferment/10 p-4 text-sm leading-6 text-leaf-dark">
              <strong>Confirmación final:</strong> el pedido queda sujeto a disponibilidad, cobertura y horario. El carrito no se borrará automáticamente.
            </div>

            {whatsappMessage ? (
              <div className="mt-4 flex gap-3 rounded-2xl border border-berry/30 bg-berry/8 p-4 text-sm leading-6 text-berry" role="alert">
                <AlertCircle aria-hidden="true" className="mt-0.5 shrink-0" size={19} />
                <p>{whatsappMessage}</p>
              </div>
            ) : null}
          </div>

          <div className="safe-bottom border-t border-line bg-cream/70 px-5 py-4 sm:px-7">
            <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="button-secondary"
                onClick={() => {
                  setStep("form");
                  setWhatsappMessage(null);
                }}
                type="button"
              >
                <ArrowLeft aria-hidden="true" size={18} />
                Editar datos
              </button>
              {whatsappUrl ? (
                <a
                  className="button-primary"
                  data-testid="whatsapp-link"
                  href={whatsappUrl}
                  rel="noreferrer"
                  target="_blank"
                >
                  <MessageCircle aria-hidden="true" size={19} />
                  Confirmar y abrir WhatsApp
                </a>
              ) : (
                <button className="button-primary opacity-55" disabled type="button">
                  <MessageCircle aria-hidden="true" size={19} />
                  WhatsApp no configurado
                </button>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </Dialog>
  );
}

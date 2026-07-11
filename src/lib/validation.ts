import { z } from "zod";

import { DELIVERY_METHODS, type CheckoutDetails } from "@/src/types/order";

const requiredText = (label: string, minimum = 2) =>
  z
    .string({ required_error: `${label} es obligatorio.` })
    .trim()
    .min(minimum, `${label} debe tener al menos ${minimum} caracteres.`);

export function normalizePhone(phone: string): string {
  return phone.replace(/\D/g, "");
}

export const checkoutSchema = z
  .object({
    name: requiredText("El nombre").max(
      100,
      "El nombre no puede superar 100 caracteres.",
    ),
    phone: z
      .string({ required_error: "El teléfono es obligatorio." })
      .trim()
      .refine(
        (value) => /^\d{10,15}$/.test(normalizePhone(value)),
        "Ingresa un teléfono válido de 10 a 15 dígitos, incluyendo lada.",
      ),
    postalCode: z
      .string({ required_error: "El código postal es obligatorio." })
      .trim()
      .regex(/^\d{5}$/, "Ingresa un código postal mexicano de 5 dígitos."),
    neighborhood: requiredText("La colonia").max(
      120,
      "La colonia no puede superar 120 caracteres.",
    ),
    address: requiredText("La dirección o punto de entrega", 5).max(
      240,
      "La dirección no puede superar 240 caracteres.",
    ),
    references: z
      .string()
      .trim()
      .max(300, "Las referencias no pueden superar 300 caracteres.")
      .optional(),
    preferredDeliveryDay: requiredText("El día de entrega preferido").max(
      80,
      "El día preferido no puede superar 80 caracteres.",
    ),
    preferredTime: requiredText("El horario preferido").max(
      80,
      "El horario preferido no puede superar 80 caracteres.",
    ),
    deliveryMethod: z.enum(DELIVERY_METHODS, {
      required_error: "Selecciona un método de entrega.",
      invalid_type_error: "Selecciona un método de entrega válido.",
    }),
    notes: z
      .string()
      .trim()
      .max(500, "Las notas no pueden superar 500 caracteres.")
      .optional(),
    ingredientsAndAllergensAccepted: z.literal(true, {
      errorMap: () => ({
        message: "Confirma que revisaste ingredientes y alérgenos.",
      }),
    }),
    privacyAccepted: z.literal(true, {
      errorMap: () => ({
        message: "Debes aceptar el aviso de privacidad para continuar.",
      }),
    }),
  })
  .strict() satisfies z.ZodType<CheckoutDetails>;

export type CheckoutFormValues = Omit<
  CheckoutDetails,
  "ingredientsAndAllergensAccepted" | "privacyAccepted"
> & {
  ingredientsAndAllergensAccepted: boolean;
  privacyAccepted: boolean;
};
export type ValidCheckoutDetails = z.output<typeof checkoutSchema>;

export function validateCheckoutForm(value: unknown) {
  return checkoutSchema.safeParse(value);
}

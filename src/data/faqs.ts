export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqs = [
  {
    id: "que-es-kefir",
    question: "¿Qué es el kéfir?",
    answer:
      "Es una bebida fermentada mediante una comunidad de bacterias y levaduras. Los llamados granos de kéfir son el cultivo utilizado para iniciar la fermentación, no un cereal.",
  },
  {
    id: "kefir-vs-yogur",
    question: "¿Es lo mismo que el yogur?",
    answer:
      "No. Ambos son lácteos fermentados, pero suelen utilizar cultivos y procesos diferentes. El kéfir normalmente incluye bacterias y levaduras y puede tener una textura más líquida.",
  },
  {
    id: "contiene-lactosa",
    question: "¿El kéfir contiene lactosa?",
    answer:
      "La fermentación reduce parte de la lactosa, pero no siempre la elimina. Las personas sensibles deben comenzar con poca cantidad o elegir un producto cuya condición sin lactosa esté confirmada.",
  },
  {
    id: "alergia-leche",
    question: "¿Puedo consumirlo si tengo alergia a la leche?",
    answer:
      "No el kéfir de leche. La fermentación no elimina las proteínas responsables de la alergia.",
  },
  {
    id: "en-ayunas",
    question: "¿Es mejor tomarlo en ayunas?",
    answer:
      "No se ha demostrado una ventaja consistente por consumirlo en ayunas.",
  },
  {
    id: "cantidad",
    question: "¿Cuánto puedo tomar?",
    answer:
      "No existe una cantidad obligatoria ni una dosis terapéutica. Como alimento, una porción de 100 a 250 ml puede ser práctica cuando se tolera.",
  },
  {
    id: "peso",
    question: "¿Sirve para bajar de peso?",
    answer:
      "No existe un efecto consistente. Puede formar parte de un patrón alimentario equilibrado, pero no produce pérdida de peso por sí solo.",
  },
  {
    id: "conservacion",
    question: "¿Cómo debo conservarlo?",
    answer:
      "Debe mantenerse refrigerado y consumirse de acuerdo con las instrucciones y la fecha indicadas en el envase.",
  },
  {
    id: "cultivos-vivos",
    question: "¿Qué significa que tenga cultivos vivos?",
    answer:
      "Significa que el producto contiene microorganismos viables al momento de su elaboración o durante su vida útil, según el proceso. Esto no equivale automáticamente a una afirmación terapéutica.",
  },
  {
    id: "entregas",
    question: "¿Hacen entregas a domicilio?",
    answer:
      "La cobertura, los días de entrega y el costo se calculan antes de confirmar el pedido.",
  },
] as const satisfies readonly FaqItem[];

export type ContentIconName =
  | "cultures"
  | "nutrition"
  | "milk"
  | "versatile"
  | "ingredients"
  | "culture"
  | "fermentation"
  | "delivery"
  | "cold"
  | "fruit"
  | "oats"
  | "smoothie"
  | "dressing"
  | "baking";

export const benefitsContent = {
  eyebrow: "Información sin exageraciones",
  title: "Lo que puede aportar el kéfir",
  description:
    "Conoce este alimento fermentado desde una perspectiva clara, práctica y basada en lo que realmente sabemos del producto.",
  items: [
    {
      title: "Fermentación con cultivos vivos",
      description:
        "El kéfir se obtiene mediante una comunidad de bacterias y levaduras que transforma parte de los componentes de la leche durante la fermentación.",
      icon: "cultures",
    },
    {
      title: "Proteína y calcio",
      description:
        "El kéfir de leche conserva nutrientes propios del lácteo, como proteína y calcio. Esta afirmación solo debe mostrarse cuando esté respaldada por la información nutricional del producto.",
      icon: "nutrition",
    },
    {
      title: "Puede tolerarse mejor que la leche",
      description:
        "La fermentación reduce parte de la lactosa. Algunas personas con intolerancia la toleran mejor, aunque el producto no debe considerarse automáticamente libre de lactosa.",
      icon: "milk",
    },
    {
      title: "Una alternativa versátil",
      description:
        "Puede consumirse solo, con fruta, avena, semillas, en batidos, aderezos o recetas.",
      icon: "versatile",
    },
  ] satisfies ReadonlyArray<{
    title: string;
    description: string;
    icon: ContentIconName;
  }>,
  disclaimer:
    "Los beneficios pueden variar entre personas. El kéfir es un alimento, no un medicamento ni un sustituto de atención médica.",
} as const;

export const processContent = {
  eyebrow: "Nuestro proceso",
  title: "Cómo lo hacemos",
  description:
    "Cada etapa busca cuidar el producto desde la selección de ingredientes hasta la entrega refrigerada.",
  steps: [
    {
      title: "Seleccionamos ingredientes",
      description:
        "Partimos de ingredientes controlados y leche pasteurizada.",
      icon: "ingredients",
    },
    {
      title: "Agregamos el cultivo",
      description:
        "Incorporamos el cultivo de kéfir en condiciones higiénicas.",
      icon: "culture",
    },
    {
      title: "Fermentamos con cuidado",
      description:
        "Controlamos el tiempo, la temperatura y la evolución del producto.",
      icon: "fermentation",
    },
    {
      title: "Refrigeramos y entregamos",
      description:
        "Conservamos el producto refrigerado hasta su entrega.",
      icon: "delivery",
    },
  ] satisfies ReadonlyArray<{
    title: string;
    description: string;
    icon: ContentIconName;
  }>,
  disclaimer:
    "Los textos del proceso deben ajustarse al procedimiento real del negocio antes de publicar el sitio.",
} as const;

export const PENDING_VALIDATION = "Información pendiente de validación";

export const transparencyContent = {
  eyebrow: "Transparencia antes de comprar",
  title: "Sabes qué estás tomando",
  description:
    "La etiqueta y la ficha de cada presentación deben concentrar los datos reales del producto. Cuando un dato todavía no ha sido confirmado, lo indicamos claramente.",
  fields: [
    { label: "Ingredientes", value: PENDING_VALIDATION },
    { label: "Alérgenos", value: PENDING_VALIDATION },
    { label: "Información nutricional", value: PENDING_VALIDATION },
    { label: "Contenido neto", value: PENDING_VALIDATION },
    {
      label: "Condiciones de conservación",
      value: PENDING_VALIDATION,
    },
    { label: "Fecha de consumo preferente", value: PENDING_VALIDATION },
    {
      label: "Cultivos utilizados, cuando estén identificados",
      value: PENDING_VALIDATION,
    },
    { label: "Azúcares añadidos", value: PENDING_VALIDATION },
    { label: "Lactosa", value: PENDING_VALIDATION },
    {
      label:
        "Posible presencia de cantidades variables de alcohol derivadas de la fermentación, cuando corresponda",
      value: PENDING_VALIDATION,
    },
    { label: "Instrucciones después de abrir", value: PENDING_VALIDATION },
  ],
  note:
    "Antes de publicar, sustituye cada dato pendiente con la información verificada del producto y su etiquetado vigente.",
} as const;

export const consumptionContent = {
  eyebrow: "Ideas cotidianas",
  title: "Formas sencillas de disfrutarlo",
  description:
    "El sabor ligeramente ácido del kéfir funciona tanto en preparaciones dulces como saladas.",
  ideas: [
    {
      title: "Solo y frío",
      description:
        "Sírvelo directamente del refrigerador y agítalo suavemente si el envase lo indica.",
      icon: "cold",
    },
    {
      title: "Con fruta y semillas",
      description:
        "Combínalo con fruta fresca y semillas para crear un tazón sencillo.",
      icon: "fruit",
    },
    {
      title: "Con avena",
      description:
        "Úsalo para acompañar o hidratar avena y añade los ingredientes que prefieras.",
      icon: "oats",
    },
    {
      title: "En batidos",
      description:
        "Mézclalo con fruta, cacao o especias, sin necesidad de ocultar su sabor natural.",
      icon: "smoothie",
    },
    {
      title: "En aderezos",
      description:
        "Intégralo con hierbas, limón o especias para preparar una base cremosa.",
      icon: "dressing",
    },
    {
      title: "En recetas horneadas",
      description:
        "Puede sustituir parte de los líquidos en algunas recetas; considera que el calor cambia sus características.",
      icon: "baking",
    },
  ] satisfies ReadonlyArray<{
    title: string;
    description: string;
    icon: ContentIconName;
  }>,
  heatNote:
    "Calentarlo reduce los microorganismos vivos, pero no elimina automáticamente su valor como alimento.",
  portionNote:
    "Una porción alimentaria frecuente puede encontrarse entre 100 y 250 ml, siempre que se tolere. No existe una dosis terapéutica universal.",
} as const;

export const claimsContent = {
  eyebrow: "Honestidad que da confianza",
  title: "Lo que sí y lo que no",
  description:
    "Preferimos explicar con claridad el lugar que puede tener el kéfir en tu alimentación, sin convertir un alimento en una promesa.",
  supported: {
    title: "Lo que sí podemos decir",
    items: [
      "Es un alimento fermentado.",
      "Puede contener cultivos vivos.",
      "El kéfir de leche puede aportar proteína y calcio.",
      "La fermentación reduce parte de la lactosa.",
      "Puede formar parte de una alimentación variada.",
      "Puede reemplazar bebidas o postres con más azúcar, según la elección del producto.",
    ],
  },
  unsupported: {
    title: "Lo que no prometemos",
    items: [
      "Curar enfermedades.",
      "Desintoxicar el organismo.",
      "Reparar completamente la microbiota.",
      "Provocar pérdida de peso.",
      "Sustituir medicamentos.",
      "Eliminar toda la lactosa.",
      "Ser apropiado para todas las personas.",
    ],
  },
} as const;

export const safetyContent = {
  eyebrow: "Antes de consumir",
  title: "Consumo informado",
  description:
    "Unos cuidados sencillos ayudan a elegir y conservar el producto de acuerdo con tus necesidades.",
  notices: [
    "Contiene proteínas de leche.",
    "No es apto para personas con alergia a la leche.",
    "La tolerancia a la lactosa varía.",
    "Mantener refrigerado.",
    "Empezar con una porción pequeña cuando no se consume habitualmente.",
    "Las personas con inmunosupresión grave, enfermedad crítica o dietas médicas deben consultar con su profesional de salud.",
    "Durante el embarazo, priorizar productos elaborados con leche pasteurizada y correctamente refrigerados.",
    "El kéfir no sustituye medicamentos ni tratamientos.",
  ],
} as const;

export type TestimonialContentItem = {
  quote: string;
  author?: string;
};

export const testimonialsContent = {
  eyebrow: "Experiencias de clientes",
  title: "Historias reales, con permiso",
  description:
    "Este espacio está preparado para compartir reseñas auténticas cuando contemos con autorización para publicarlas.",
  items: [
    { quote: "Testimonio pendiente de autorización" },
    { quote: "Testimonio pendiente de autorización" },
    { quote: "Testimonio pendiente de autorización" },
  ] satisfies ReadonlyArray<TestimonialContentItem>,
} as const;

export const faqContent = {
  eyebrow: "Resolvemos tus dudas",
  title: "Preguntas frecuentes",
  description:
    "Información breve para elegir, consumir y conservar tu kéfir con mayor claridad.",
  footer:
    "¿Tu duda es sobre una presentación o tu zona de entrega? Escríbenos antes de confirmar el pedido.",
} as const;

export const finalCtaContent = {
  eyebrow: "Tu próxima entrega",
  title: "Haz espacio para algo vivo en tu refrigerador",
  description:
    "Selecciona tu presentación, confirma tu zona de entrega y envía tu pedido por WhatsApp.",
  productsLabel: "Elegir mi kéfir",
  whatsappLabel: "Comprar por WhatsApp",
  availabilityNote:
    "Tu pedido queda sujeto a confirmación de disponibilidad, cobertura y horario.",
} as const;

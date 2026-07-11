export type LegalSection = {
  id: string;
  title: string;
  paragraphs?: readonly string[];
  bullets?: readonly string[];
  note?: string;
};

export type LegalRelatedLink = {
  href: string;
  label: string;
};

export type LegalDocument = {
  title: string;
  eyebrow: string;
  description: string;
  reviewItems: readonly string[];
  sections: readonly LegalSection[];
  relatedLinks: readonly LegalRelatedLink[];
};

const sharedRelatedLinks = [
  { href: "/terminos", label: "Términos y condiciones" },
  { href: "/entregas", label: "Política de entregas" },
  { href: "/devoluciones", label: "Política de devoluciones" },
] as const;

export const privacyDocument: LegalDocument = {
  title: "Aviso de privacidad",
  eyebrow: "Privacidad y uso responsable de datos",
  description:
    "Explica qué datos intervienen al solicitar un pedido, para qué se usan y qué debe confirmar el negocio antes de publicar este aviso.",
  reviewItems: [
    "Nombre o razón social y domicilio de la persona responsable",
    "Correo o canal definitivo para solicitudes sobre datos personales",
    "Plazos reales de conservación y eliminación",
    "Proveedores que tendrán acceso a datos, incluida la mensajería y la entrega",
    "Procedimiento y requisitos aplicables para ejercer derechos sobre los datos",
  ],
  sections: [
    {
      id: "responsable",
      title: "1. Quién es responsable",
      paragraphs: [
        "La identidad legal, el domicilio y los datos de contacto de la persona responsable del tratamiento deben ser completados y validados por el negocio antes de publicar este sitio.",
        "El nombre comercial mostrado en la tienda no sustituye la información de la persona física o moral responsable cuando la normativa aplicable exija identificarla.",
      ],
      note: "Pendiente: agregar identidad legal, domicilio y medio oficial de contacto.",
    },
    {
      id: "datos",
      title: "2. Datos que pueden solicitarse",
      paragraphs: [
        "Para preparar un pedido se pueden solicitar nombre, teléfono, código postal, colonia, dirección o punto de entrega, referencias, preferencias de día y horario, método de entrega y notas que la persona decida añadir.",
        "No se solicitan ni almacenan datos de tarjetas bancarias en este sitio. Evita incluir información sensible o innecesaria en el campo de notas.",
      ],
    },
    {
      id: "finalidades",
      title: "3. Para qué se utilizarían",
      bullets: [
        "Preparar el resumen del pedido solicitado.",
        "Consultar disponibilidad y cobertura de entrega.",
        "Contactar a la persona para confirmar productos, costo, horario y punto de entrega.",
        "Coordinar la entrega y atender aclaraciones relacionadas con el pedido.",
        "Cumplir obligaciones administrativas que resulten aplicables al negocio.",
      ],
      note:
        "Cualquier finalidad publicitaria o secundaria debe describirse por separado y contar con el mecanismo de elección que corresponda.",
    },
    {
      id: "whatsapp",
      title: "4. Pedidos por WhatsApp",
      paragraphs: [
        "El formulario prepara un mensaje para que la persona lo revise antes de abrir WhatsApp. El pedido no se envía hasta que la persona decide continuar en esa aplicación.",
        "Al usar WhatsApp, el mensaje y los datos incluidos son tratados también conforme a las condiciones y políticas de ese servicio. El negocio debe verificar que su uso comercial y sus prácticas de conservación sean consistentes con este aviso.",
      ],
    },
    {
      id: "terceros",
      title: "5. Acceso por proveedores y terceros",
      paragraphs: [
        "Los datos solo deberían compartirse cuando sea necesario para confirmar o entregar el pedido, o cuando exista una obligación aplicable. Si participa un servicio de mensajería, reparto, alojamiento o analítica, el negocio debe identificarlo y documentar el alcance real de su intervención.",
        "Este sitio no incorpora servicios de pago con tarjeta. La eventual forma de pago se acuerda al confirmar el pedido y debe explicarse antes de solicitar cualquier dato adicional.",
      ],
    },
    {
      id: "conservacion",
      title: "6. Conservación y seguridad",
      paragraphs: [
        "El negocio debe conservar únicamente la información necesaria durante el plazo definido para atender pedidos, obligaciones y aclaraciones, y establecer controles razonables para impedir acceso, uso o divulgación no autorizados.",
        "Los plazos, responsables internos, copias de respaldo y procesos de eliminación deben ajustarse a la operación real.",
      ],
      note: "Pendiente: documentar plazos y medidas reales de conservación y eliminación.",
    },
    {
      id: "derechos",
      title: "7. Solicitudes sobre datos personales",
      paragraphs: [
        "La persona debe contar con un canal para preguntar qué datos conserva el negocio, solicitar correcciones y presentar las solicitudes que reconozca la normativa aplicable.",
        "Antes de publicar, se debe definir el correo o domicilio receptor, el procedimiento, los requisitos de identificación y los plazos de respuesta con asesoría profesional adecuada.",
      ],
      note: "Pendiente: incorporar el procedimiento definitivo y el canal de atención.",
    },
    {
      id: "cookies",
      title: "8. Cookies y analítica",
      paragraphs: [
        "Las funciones esenciales del sitio pueden usar almacenamiento local para conservar el carrito en el dispositivo. La analítica no esencial está prevista como opcional y debe permanecer desactivada hasta que el negocio configure un mecanismo válido de información y consentimiento.",
        "Si se activa una herramienta de medición, este aviso debe identificarla, explicar las tecnologías utilizadas y permitir administrar el consentimiento antes de cargar seguimiento no esencial.",
      ],
    },
    {
      id: "cambios",
      title: "9. Cambios a este aviso",
      paragraphs: [
        "Las modificaciones relevantes deben publicarse en esta misma página, indicando una fecha de actualización y, cuando corresponda, comunicándose por un medio adicional.",
      ],
      note: "Pendiente: añadir fecha de entrada en vigor una vez aprobado el texto final.",
    },
  ],
  relatedLinks: sharedRelatedLinks,
};

export const termsDocument: LegalDocument = {
  title: "Términos y condiciones",
  eyebrow: "Condiciones de uso y compra",
  description:
    "Resume cómo se solicitan, confirman y entregan los pedidos, con campos pendientes para adaptar a la operación real.",
  reviewItems: [
    "Identidad y domicilio legal del vendedor",
    "Formas de pago aceptadas y momento de cobro",
    "Horarios de atención, cobertura y plazos reales",
    "Proceso de cancelación y criterios de reembolso",
    "Normativa, autoridades y jurisdicción aplicables",
  ],
  sections: [
    {
      id: "alcance",
      title: "1. Alcance y aceptación",
      paragraphs: [
        "Estos términos describen el uso del sitio y el proceso para solicitar productos. Deben completarse con los datos legales y comerciales reales del negocio antes de su publicación.",
        "Enviar un mensaje por WhatsApp expresa interés en comprar, pero no constituye por sí solo la aceptación definitiva del pedido. La disponibilidad, cobertura, costo de entrega y horario se confirman directamente con la persona compradora.",
      ],
    },
    {
      id: "informacion-productos",
      title: "2. Información de productos",
      paragraphs: [
        "Las presentaciones, ingredientes, alérgenos, características y condiciones de conservación deben coincidir con la etiqueta y el producto entregado. Las fotografías ayudan a identificar el producto, pero el envase o apariencia pueden variar sin alterar su contenido esencial.",
        "Los precios iniciales del sitio son datos editables de demostración hasta que el negocio los valide. El precio aplicable, los impuestos que correspondan y cualquier costo adicional deben informarse antes de confirmar la compra.",
      ],
    },
    {
      id: "pedido",
      title: "3. Solicitud y confirmación del pedido",
      bullets: [
        "La persona selecciona productos y revisa el resumen del carrito.",
        "Completa los datos necesarios para consultar la entrega.",
        "Revisa y decide si envía el mensaje preparado mediante WhatsApp.",
        "El negocio confirma disponibilidad, cobertura, horario, costo total y forma de pago.",
        "El pedido se considera aceptado únicamente cuando ambas partes reciben una confirmación clara.",
      ],
    },
    {
      id: "pago",
      title: "4. Pago y comprobantes",
      paragraphs: [
        "El sitio no captura datos de tarjetas. El negocio debe indicar los métodos de pago reales, cuándo se considera recibido el pago y cómo se emiten los comprobantes que correspondan.",
        "Nunca deben solicitarse contraseñas, códigos de seguridad ni números completos de tarjeta por el formulario del sitio o por mensajes.",
      ],
      note: "Pendiente: detallar formas de pago, referencias, impuestos y facturación reales.",
    },
    {
      id: "disponibilidad",
      title: "5. Disponibilidad y sustituciones",
      paragraphs: [
        "El kéfir es un producto refrigerado y su disponibilidad puede depender del lote y del calendario de elaboración. Si un producto no está disponible, el negocio debe informarlo y solicitar autorización antes de sustituir presentación, sabor o cantidad.",
        "No se realizará una sustitución ni un cargo adicional sin aceptación de la persona compradora.",
      ],
    },
    {
      id: "entrega",
      title: "6. Entrega y recepción",
      paragraphs: [
        "Las zonas, horarios y costos mostrados en el sitio son configurables y requieren confirmación. La persona compradora debe proporcionar un punto accesible y estar disponible para recibir el pedido en la ventana acordada.",
        "Al recibir, se recomienda comprobar que los envases estén cerrados, que el pedido coincida con lo confirmado y que el producto se encuentre frío. Cualquier incidencia debe reportarse siguiendo la política de devoluciones.",
      ],
    },
    {
      id: "seguridad-alimentaria",
      title: "7. Información alimentaria y consumo",
      paragraphs: [
        "La persona debe revisar ingredientes, alérgenos, fecha, conservación e instrucciones después de abrir. El kéfir de leche contiene proteínas de leche y no es apto para personas con alergia a la leche.",
        "El contenido informativo del sitio no sustituye diagnóstico, tratamiento ni atención de profesionales de salud. La tolerancia individual puede variar.",
      ],
    },
    {
      id: "uso-sitio",
      title: "8. Uso adecuado del sitio",
      paragraphs: [
        "No se permite intentar afectar el funcionamiento del sitio, usar información falsa para generar pedidos ni copiar contenidos o elementos de marca de manera que confunda sobre su origen.",
        "Los errores evidentes de precio o información se comunicarán antes de confirmar el pedido para que la persona pueda aceptar la corrección o cancelarlo sin penalización atribuible a ese error.",
      ],
    },
    {
      id: "responsabilidad",
      title: "9. Aclaraciones y límites",
      paragraphs: [
        "El negocio debe responder por sus obligaciones conforme a las reglas que resulten aplicables. Ninguna cláusula de esta plantilla pretende eliminar derechos que no puedan renunciarse ni excluir responsabilidades que legalmente correspondan.",
        "Las interrupciones ajenas al negocio, casos fortuitos y problemas de entrega deben gestionarse de buena fe, informando opciones razonables a la persona compradora.",
      ],
    },
    {
      id: "contacto-terminos",
      title: "10. Contacto, cambios y legislación aplicable",
      paragraphs: [
        "Antes de publicar se debe agregar el canal oficial de aclaraciones, la fecha de entrada en vigor y la información sobre legislación, autoridades o jurisdicción que corresponda al domicilio y operación del negocio.",
      ],
      note: "Pendiente de revisión legal profesional y de completar datos del vendedor.",
    },
  ],
  relatedLinks: [
    { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
    { href: "/entregas", label: "Política de entregas" },
    { href: "/devoluciones", label: "Política de devoluciones" },
  ],
};

export const deliveriesDocument: LegalDocument = {
  title: "Política de entregas",
  eyebrow: "Cobertura y cadena de frío",
  description:
    "Detalla el proceso propuesto para coordinar entregas refrigeradas sin presentar zonas, costos u horarios de demostración como definitivos.",
  reviewItems: [
    "Códigos postales, rutas y zonas realmente atendidas",
    "Costo de entrega y umbral vigente de entrega gratuita",
    "Días, horarios y tiempo mínimo para agendar",
    "Temperatura, empaque y procedimiento documentado de cadena de frío",
    "Protocolo para ausencias, retrasos e incidencias",
  ],
  sections: [
    {
      id: "cobertura",
      title: "1. Cobertura",
      paragraphs: [
        "La consulta por código postal utiliza una lista local de demostración. Un resultado en pantalla es orientativo y no garantiza la entrega hasta que el negocio confirme la dirección, la ruta y el horario por WhatsApp.",
        "Cuando un código postal no esté registrado, se puede solicitar una revisión manual. El negocio informará si puede realizar la entrega y si existe un costo especial antes de confirmar el pedido.",
      ],
      note: "Pendiente: reemplazar los códigos postales de demostración por la cobertura real.",
    },
    {
      id: "costos",
      title: "2. Costos y entrega gratuita",
      paragraphs: [
        "El costo y el monto mínimo para entrega gratuita se controlan desde la configuración de comercio. Ambos valores son demostrativos hasta que el negocio los valide.",
        "El resumen de WhatsApp muestra un total estimado. Cualquier cambio por zona o condición especial debe comunicarse y aceptarse antes de confirmar el pedido.",
      ],
    },
    {
      id: "agenda",
      title: "3. Días y horarios",
      paragraphs: [
        "La fecha y el horario elegidos en el formulario representan una preferencia. El negocio debe confirmar la ventana disponible según elaboración, inventario y ruta.",
        "Si una entrega se retrasa, se debe avisar tan pronto como sea posible y ofrecer una nueva ventana o la alternativa que corresponda según el estado del pedido.",
      ],
      note: "Pendiente: publicar calendario, horario de corte y tiempos reales de preparación.",
    },
    {
      id: "recepcion",
      title: "4. Recepción del pedido",
      bullets: [
        "Proporciona una dirección o punto de entrega completo y referencias útiles.",
        "Mantén disponible el teléfono indicado durante la ventana acordada.",
        "Revisa cantidad, presentación, cierre de los envases y temperatura al recibir.",
        "Guarda el producto en refrigeración inmediatamente.",
        "Reporta cuanto antes cualquier diferencia o daño visible.",
      ],
    },
    {
      id: "cadena-frio",
      title: "5. Conservación durante la entrega",
      paragraphs: [
        "El producto debe mantenerse refrigerado durante su preparación, traslado y recepción. El negocio debe validar y documentar el método real de empaque, control de temperatura y tiempo máximo de ruta antes de hacer afirmaciones específicas.",
        "No se debe consumir un producto si el envase está abierto, dañado, presenta una alteración no esperada o permaneció fuera de las condiciones indicadas en su etiqueta.",
      ],
      note: "Pendiente: incorporar parámetros de conservación confirmados para cada producto.",
    },
    {
      id: "ausencia",
      title: "6. Si nadie puede recibir",
      paragraphs: [
        "Cuando no haya una persona disponible en el punto acordado, se intentará contactar al teléfono proporcionado. Cualquier reintento, recolección o costo adicional debe comunicarse y aceptarse antes de realizarse.",
        "Por tratarse de un alimento refrigerado, no debe dejarse sin autorización en banquetas, accesos o lugares donde no pueda mantenerse la temperatura adecuada.",
      ],
      note: "Pendiente: definir tiempo de espera, número de intentos y cargos reales.",
    },
    {
      id: "incidencias-entrega",
      title: "7. Incidencias",
      paragraphs: [
        "Si el pedido llega incompleto, dañado o fuera de la condición acordada, conserva el producto refrigerado, toma evidencia del envase y contacta al negocio con los datos del pedido. La solución se evaluará conforme a la política de devoluciones y a los derechos aplicables.",
      ],
    },
  ],
  relatedLinks: [
    { href: "/terminos", label: "Términos y condiciones" },
    { href: "/devoluciones", label: "Política de devoluciones" },
    { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
  ],
};

export const returnsDocument: LegalDocument = {
  title: "Política de devoluciones",
  eyebrow: "Aclaraciones y cuidado del producto",
  description:
    "Propone un proceso claro para reportar productos dañados, incorrectos o en condición inadecuada, pendiente de validación comercial y legal.",
  reviewItems: [
    "Plazo máximo real para reportar una incidencia",
    "Canal y horario de atención",
    "Causas aceptadas y evidencia razonablemente necesaria",
    "Opciones de reposición, bonificación o reembolso",
    "Reglas de cancelación antes de preparar o despachar",
  ],
  sections: [
    {
      id: "naturaleza",
      title: "1. Naturaleza del producto",
      paragraphs: [
        "El kéfir es un alimento perecedero que requiere refrigeración. Por inocuidad, un producto entregado y abierto no debe reincorporarse al inventario ni ofrecerse a otra persona.",
        "Esto no impide reportar un producto equivocado, incompleto, dañado o que no cumpla con las condiciones confirmadas. Cada caso debe atenderse de manera clara y conforme a los derechos aplicables.",
      ],
    },
    {
      id: "reportables",
      title: "2. Situaciones que se pueden reportar",
      bullets: [
        "Falta un producto o la cantidad no coincide con la confirmación.",
        "Se entregó una presentación o sabor diferente sin autorización.",
        "El envase llegó abierto, roto, con fuga o con el sello comprometido.",
        "El producto no llegó refrigerado conforme a la condición acordada.",
        "La fecha o información del envase impide consumirlo en condiciones razonables.",
      ],
      note:
        "La acidez ligera, la separación natural o una variación razonable entre lotes fermentados no constituyen por sí solas un defecto; la etiqueta debe explicar cómo agitar y reconocer el producto.",
    },
    {
      id: "procedimiento",
      title: "3. Cómo solicitar una aclaración",
      bullets: [
        "Conserva el producto refrigerado y no lo consumas si sospechas un problema de inocuidad.",
        "Contacta al negocio por el canal oficial e identifica el pedido.",
        "Describe la incidencia y el momento en que la detectaste.",
        "Cuando sea razonable, adjunta fotografías del envase, lote, fecha y condición recibida.",
        "Espera la confirmación antes de desechar el producto, salvo que conservarlo represente un riesgo.",
      ],
      note: "Pendiente: definir canal, horario y plazo máximo para reportes.",
    },
    {
      id: "soluciones",
      title: "4. Soluciones posibles",
      paragraphs: [
        "Según la incidencia, disponibilidad y normativa aplicable, la solución puede consistir en completar el pedido, reemplazar el producto, otorgar una bonificación o realizar el reembolso que corresponda.",
        "El negocio debe informar el plazo, el método y cualquier condición necesaria antes de acordar la solución. No deben imponerse requisitos desproporcionados para acreditar una incidencia.",
      ],
      note: "Pendiente: confirmar responsables, plazos y métodos reales de reembolso.",
    },
    {
      id: "cambio-preferencia",
      title: "5. Cambios por preferencia personal",
      paragraphs: [
        "Una vez entregado correctamente y mantenido bajo control de la persona compradora, el producto no suele poder cambiarse solo por preferencia de sabor. Antes de confirmar, revisa presentación, ingredientes, alérgenos y descripción.",
        "Si existe una causa distinta, contacta al negocio para que evalúe el caso. Esta plantilla no limita derechos que resulten aplicables.",
      ],
    },
    {
      id: "cancelaciones",
      title: "6. Cancelaciones",
      paragraphs: [
        "Las cancelaciones deben solicitarse antes de la preparación o salida del pedido. El negocio debe informar con antelación el horario de corte y si existen costos ya incurridos que legalmente puedan aplicarse.",
        "Si el negocio no puede surtir el pedido confirmado, debe ofrecer una nueva fecha, una sustitución aceptada expresamente o la devolución correspondiente.",
      ],
      note: "Pendiente: establecer horario de corte y condiciones de cancelación reales.",
    },
    {
      id: "alergenos",
      title: "7. Ingredientes, alérgenos y tolerancia",
      paragraphs: [
        "El kéfir de leche contiene proteínas de leche. No es apto para personas con alergia a la leche, incluso cuando una presentación se describa como sin lactosa. La tolerancia a la lactosa y a alimentos fermentados varía entre personas.",
        "Si la información recibida no coincide con la etiqueta o faltan datos esenciales, no consumas el producto y solicita una aclaración.",
      ],
    },
    {
      id: "derechos-devolucion",
      title: "8. Revisión y derechos aplicables",
      paragraphs: [
        "Esta política debe revisarse para que sea consistente con las obligaciones del negocio y los derechos de las personas consumidoras. Ningún apartado pretende excluir garantías, devoluciones o compensaciones que no puedan limitarse.",
      ],
      note: "Pendiente de revisión legal profesional antes de publicación.",
    },
  ],
  relatedLinks: [
    { href: "/entregas", label: "Política de entregas" },
    { href: "/terminos", label: "Términos y condiciones" },
    { href: "/aviso-de-privacidad", label: "Aviso de privacidad" },
  ],
};


# Kéfir Vivo

Sitio de comercio electrónico en español para vender kéfir artesanal en México. Incluye catálogo, páginas de producto, carrito persistente, consulta demostrativa de cobertura, formulario validado y preparación de pedidos por WhatsApp. No integra cobros, no solicita datos de tarjetas y no usa un CMS.

> **Importante antes de publicar:** precios, inventario, costos de entrega, códigos postales, imágenes, ingredientes, información nutricional y varios datos operativos son demostrativos o están pendientes de validación. Reemplázalos con información real y revisada. En particular, el producto “Kéfir sin lactosa, 500 ml” está en estado `draft` y no se muestra públicamente.

## Funcionalidad incluida

- Next.js con App Router, React y TypeScript estricto.
- Tailwind CSS, componentes reutilizables y Lucide React.
- Catálogo editable con inventario, atributos verificados y precio por litro.
- Carrito lateral con cantidades limitadas por inventario, subtotal, entrega y umbral de entrega gratuita.
- Persistencia del carrito en `localStorage`.
- Formulario de pedido validado con Zod.
- Ruta interna `POST /api/order` que vuelve a validar y prepara el pedido.
- Mensaje estructurado y codificado para `wa.me`; el cliente decide cuándo abrir WhatsApp.
- Consulta local de cobertura por código postal sin afirmar cobertura real.
- Estados de carrito vacío, producto agotado, formulario inválido, cobertura manual y WhatsApp no configurado.
- Páginas legales editables, SEO, sitemap, robots y datos estructurados.
- Analítica opcional desactivada por defecto y bloqueada hasta obtener consentimiento.
- Pruebas unitarias y una prueba de flujo de compra.

## Tecnologías

- Next.js 16 (App Router) y React 19.
- TypeScript 5 en modo `strict`.
- Tailwind CSS 4.
- Zod para validación.
- Vitest y Testing Library.
- `vinext` y Cloudflare Workers/Vite como ruta de ejecución configurada en los scripts del proyecto.

`vinext` implementa la superficie de Next.js sobre Vite y está en evolución activa. La ruta de producción preferente de este repositorio es Cloudflare Workers o Sites. Si se elige otra plataforma, valida el adaptador y el build específico de esa plataforma antes de publicar.

## Requisitos

- Node.js `>=22.13.0`.
- npm incluido con Node.js.
- Git, recomendado para despliegue y control de cambios.

Comprueba las versiones:

```powershell
node --version
npm --version
```

Si PowerShell bloquea el script `npm.ps1`, usa `npm.cmd` en los mismos comandos o ajusta la política de ejecución conforme a las reglas de tu equipo.

## Instalación en Windows PowerShell

Desde la raíz del proyecto:

```powershell
Copy-Item .env.example .env.local
notepad .env.local
npm install
npm run dev
```

El servidor mostrará en la terminal la dirección local. Para detenerlo, presiona `Ctrl+C`.

Para probar el build de producción localmente:

```powershell
npm run build
npm run start
```

`npm run start` debe ejecutarse después de `npm run build`.

## Variables de entorno

Copia `.env.example` a `.env.local`. No publiques `.env.local` ni agregues secretos al repositorio.

| Variable | Obligatoria | Uso |
| --- | --- | --- |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Sí para recibir pedidos | Número de WhatsApp en formato internacional, solo dígitos. Para México: código de país `52` seguido del número, sin `+`, espacios ni guiones. Si queda vacío, el sitio muestra un estado de configuración pendiente y no genera un enlace válido. |
| `NEXT_PUBLIC_SITE_URL` | Sí en producción | Origen canónico absoluto, por ejemplo `https://dominio.example`, sin ruta. Alimenta metadata, Open Graph, sitemap, robots y JSON-LD. Sustituye el valor local al desplegar. |
| `NEXT_PUBLIC_ANALYTICS_ENABLED` | No | Usa `true` únicamente después de revisar privacidad y consentimiento. El valor seguro por defecto es `false`. |
| `NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID` | Solo si se activa analítica | Identificador de Google Analytics. Con ID vacío, la analítica permanece desactivada aunque la bandera sea `true`. |

Ejemplo local seguro:

```dotenv
NEXT_PUBLIC_WHATSAPP_NUMBER=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_ANALYTICS_ENABLED=false
NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID=
```

Todas son variables públicas compiladas en el cliente. No guardes API keys, contraseñas ni otros secretos en variables con prefijo `NEXT_PUBLIC_`.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm install` | Instala las versiones fijadas por `package-lock.json`. |
| `npm run dev` | Inicia el entorno de desarrollo con vinext. |
| `npm run test` | Ejecuta las pruebas Vitest una vez. |
| `npm run test:watch` | Ejecuta Vitest en modo interactivo. |
| `npm run typecheck` | Verifica TypeScript sin generar archivos. |
| `npm run lint` | Ejecuta ESLint. |
| `npm run build` | Genera el build de producción con vinext. |
| `npm run start` | Sirve localmente el build generado. |

Antes de publicar, ejecuta esta compuerta de calidad:

```powershell
npm run test
npm run typecheck
npm run lint
npm run build
```

## Configuración del negocio

### Marca, contacto y textos globales

Edita `src/config/site.ts` para cambiar:

- nombre, eslogan, país, ciudad, moneda y locale;
- correo e Instagram;
- aviso superior y navegación;
- título y descripción SEO;
- visibilidad de testimonios;
- afirmaciones verificadas de la marca;
- estado de revisión de cada documento legal.

El número de WhatsApp y la URL canónica proceden de las variables de entorno, no deben escribirse directamente en componentes.

### Precios, entrega y límites del carrito

Edita `src/config/commerce.ts` para cambiar:

- `deliveryFeeMxn`: costo normal de entrega;
- `freeDeliveryThresholdMxn`: subtotal para entrega gratuita;
- `maxQuantityPerItem`: límite máximo por producto;
- avisos comerciales y de disponibilidad;
- banderas que identifican precios y entrega como demostrativos.

Mantén `pricesAreDemo` y `deliveryValuesAreDemo` en `true` hasta verificar los valores reales. Los importes se expresan en pesos mexicanos, no en centavos.

### Productos, precios e inventario

Edita `src/data/products.ts`. Cada producto centraliza:

- `name`, `slug`, descripciones y presentación;
- `volumeMl` y `priceMxn`;
- imagen y texto alternativo;
- ingredientes resumidos y alérgenos;
- atributos en `claims`, cada uno con `verified`;
- conservación y manejo;
- `status`: `active`, `sold-out` o `draft`;
- inventario en unidades completas;
- ficha de transparencia.

No marques una afirmación como `verified: true` ni la incluyas en SEO sin respaldo real. Cambia `priceIsDemo` e `inventory.isDemo` solo después de validar el dato. Los productos con `status: "draft"` se excluyen del catálogo público.

#### Producto sin lactosa

`Kéfir sin lactosa, 500 ml` es una propuesta desactivada. La fermentación por sí sola no demuestra que un producto sea sin lactosa. Antes de cambiarlo a `active`:

1. confirma formulación, proceso y etiquetado aplicable;
2. documenta la evidencia que respalda la afirmación;
3. completa ingredientes, alérgenos, lactosa, nutrición y conservación;
4. conserva el aviso “Contiene proteínas de leche” y “No apto para personas con alergia a la leche” cuando corresponda;
5. reemplaza la fotografía de demostración y valida precio e inventario.

### Ingredientes, alérgenos y transparencia

En cada entrada de `src/data/products.ts`, sustituye `Información pendiente de validación` en el objeto `transparency` con datos del producto y de su etiquetado real:

- ingredientes;
- alérgenos;
- información nutricional;
- contenido neto;
- condiciones y temperatura de conservación;
- consumo preferente;
- cultivos identificados;
- azúcares añadidos;
- lactosa;
- posible alcohol derivado de la fermentación, cuando corresponda;
- instrucciones después de abrir.

Revisa también `ingredientSummary`, `allergens`, `handling` y `claims`. No inventes valores nutricionales, certificaciones, análisis de laboratorio, premios ni sellos sanitarios.

### Zonas de entrega

Edita `src/data/delivery-zones.ts`. La lista actual contiene únicamente códigos postales de demostración y un resultado en esa lista no garantiza cobertura.

Antes de publicar:

1. sustituye cada código postal y etiqueta por cobertura real;
2. elimina la condición demostrativa del modelo únicamente cuando el negocio la haya validado;
3. verifica costo, días, horarios y cadena de frío;
4. conserva la salida de confirmación manual para códigos no registrados.

Los costos y el umbral de envío gratuito se editan por separado en `src/config/commerce.ts`.

### Contenido, preguntas y testimonios

- `src/data/content.ts`: beneficios, proceso, consumo, seguridad, comparativa, llamadas a la acción y tarjetas de testimonios.
- `src/data/faqs.ts`: preguntas frecuentes utilizadas también para el JSON-LD `FAQPage`.
- `src/data/legal.ts`: plantillas de privacidad, términos, entregas y devoluciones.

Para ocultar todos los testimonios, establece `testimonialsEnabled: false` en `src/config/site.ts`. Para publicarlos, usa solamente reseñas reales y autorizadas; reemplaza las tarjetas “Testimonio pendiente de autorización” en `src/data/content.ts` y conserva evidencia del permiso. No inventes nombres, resultados ni citas.

## Imágenes que debe reemplazar el propietario

Los siete archivos están en `public/images/`, se sirven localmente y se usan con `next/image`. Sustituye cada archivo conservando exactamente el nombre y el formato WebP:

| Archivo | Fotografía real recomendada |
| --- | --- |
| `hero-kefir.webp` | Fotografía principal vertical (aprox. 4:5) con una botella real de Kéfir Vivo y un vaso servido, sobre una escena natural y limpia. |
| `kefir-natural.webp` | Fotografía de producto, de frente y bien iluminada, de la botella real de kéfir natural; debe permitir identificar etiqueta y presentación. |
| `kefir-fresa.webp` | Fotografía de la botella real de kéfir con fresa, con color y etiqueta fieles al producto entregado. |
| `kefir-sin-lactosa.webp` | Fotografía del producto real sin lactosa solo después de validar que puede publicarse con esa denominación; mientras siga en borrador, puede permanecer como recurso no público. |
| `proceso-fermentacion.webp` | Fotografía del proceso real en el espacio de elaboración, sin sugerir certificaciones o controles que no existan. |
| `servir-kefir.webp` | Fotografía del kéfir servido y una forma realista de consumo, por ejemplo con fruta, semillas o avena. |
| `granos-kefir.webp` | Primer plano nítido de los granos o cultivo de kéfir realmente utilizado, si el negocio autoriza mostrarlo. |

Recomendaciones:

- exporta en WebP con buena compresión y perfil sRGB;
- evita texto incrustado, marcas de agua y fondos que dificulten el contraste;
- conserva la relación de aspecto esperada o revisa el encuadre en móvil y escritorio;
- actualiza `width`, `height` y `alt` en los datos o componentes si cambian dimensiones o contenido;
- no uses fotos de terceros sin licencia ni imágenes que representen un producto distinto.

También reemplaza `public/og.png` si cambia la identidad visual o el producto mostrado.

## Analítica y consentimiento

La configuración vive en `src/config/analytics.ts` y está desactivada por defecto. Para activarla:

1. completa y revisa el aviso de privacidad;
2. configura `NEXT_PUBLIC_ANALYTICS_ENABLED=true`;
3. configura `NEXT_PUBLIC_ANALYTICS_MEASUREMENT_ID` con el ID real;
4. vuelve a compilar y comprueba el banner;
5. verifica en una sesión limpia que ningún script de analítica cargue antes de aceptar;
6. prueba tanto “Solo esenciales” como “Aceptar analítica”.

El consentimiento se conserva en `localStorage` con la clave configurada. Si la analítica está desactivada o falta el ID, no aparece el banner y no se carga seguimiento no esencial.

## Privacidad y manejo del pedido

- El carrito se conserva localmente en el navegador.
- El formulario se envía únicamente a la ruta interna `/api/order` para validar cantidades, recalcular importes y construir el enlace.
- El resumen no se envía a WhatsApp hasta que la persona revisa el pedido y decide abrir el enlace.
- Al abrir WhatsApp, los datos incluidos pasan a tratarse conforme a las políticas de ese servicio.
- El sitio no solicita ni almacena números de tarjeta, CVV, NIP, contraseñas ni datos de acceso bancario.
- No deben añadirse datos sensibles en “Notas” ni integraciones externas sin actualizar el aviso de privacidad y el mecanismo de consentimiento.
- El carrito no se borra automáticamente al abrir WhatsApp porque el pedido sigue sujeto a confirmación.

## Revisión legal y comercial obligatoria

Las páginas `/aviso-de-privacidad`, `/terminos`, `/entregas` y `/devoluciones` son plantillas informativas; **no constituyen asesoría legal**. Antes de publicar, una persona profesional y el negocio deben revisar como mínimo:

- identidad, razón social, domicilio y datos de la persona responsable;
- canal y procedimiento para solicitudes sobre datos personales;
- finalidades, conservación, proveedores y transferencias reales de datos;
- métodos de pago, impuestos, facturación y momento de confirmación;
- cobertura, costo, días, horarios, cadena de frío y manejo de incidencias;
- cancelaciones, devoluciones, reposiciones, reembolsos y derechos aplicables;
- ingredientes, alérgenos, etiquetado, lotes, fechas e inocuidad;
- fecha de vigencia y mecanismo para comunicar cambios.

No publiques afirmaciones de salud o producto sin respaldo suficiente. Entre otras, no añadas:

- “superalimento milagroso”;
- “sana el intestino”, “repara la microbiota”, “regenera la flora” o “restaura la flora intestinal”;
- “detox”, “desintoxica” o “elimina toxinas”;
- “fortalece las defensas” o “fortalece el sistema inmune”;
- “cura la gastritis”, “cura enfermedades” o “elimina el estreñimiento”;
- “controla la diabetes”, “controla la glucosa” o “reduce la presión arterial”;
- “hace bajar de peso”, “provoca pérdida de peso” o “previene el cáncer”;
- “garantiza una mejor digestión” o “digestión perfecta”;
- “cero lactosa” o “sin lactosa” sin confirmación real;
- “100 % probiótico”, “contiene cultivos vivos”, “fuente de proteína” o “fuente de calcio” sin evidencia aplicable al producto y su vida útil.

El contenido debe presentar el kéfir como alimento, no como medicamento ni sustituto de atención médica. La tolerancia y los resultados pueden variar entre personas.

## SEO

La URL de producción en `NEXT_PUBLIC_SITE_URL` es imprescindible para generar referencias canónicas correctas. El proyecto incluye:

- metadata general y por página;
- Open Graph y Twitter Card;
- `sitemap.xml` y `robots.txt` dinámicos;
- JSON-LD de organización, producto, breadcrumbs y preguntas frecuentes;
- títulos jerárquicos y textos alternativos.

Los productos con precios demostrativos no publican ofertas reales en el JSON-LD. Tras validar precios, revisa también la lógica de datos estructurados antes de exponer disponibilidad u ofertas a buscadores.

## Arquitectura

```text
app/
  api/order/route.ts           Validación y preparación del pedido
  productos/[slug]/page.tsx   Detalle dinámico de producto
  aviso-de-privacidad/        Página legal
  terminos/                   Página legal
  entregas/                   Página legal
  devoluciones/               Página legal
  layout.tsx                  Metadata y shell global
  page.tsx                    Página principal
  robots.ts                   Reglas para buscadores
  sitemap.ts                  Sitemap dinámico
src/
  components/
    analytics/                Consentimiento y carga opcional
    cart/                     Estado, persistencia y drawer
    checkout/                 Checkout y consulta de cobertura
    home/                     Secciones de la página principal
    layout/                   Header, footer y shell
    legal/                    Presentación de documentos legales
    products/                 Catálogo y tarjetas
    ui/                       Diálogo, imágenes y controles reutilizables
  config/
    analytics.ts              Analítica y consentimiento
    commerce.ts               Entrega, límites y avisos comerciales
    site.ts                   Marca, contacto, SEO y banderas globales
  data/
    content.ts                Contenido editorial
    delivery-zones.ts         Cobertura local demostrativa
    faqs.ts                   Preguntas frecuentes
    legal.ts                  Plantillas legales
    products.ts               Catálogo y transparencia
  lib/
    cart.ts                   Cálculos puros y saneamiento
    currency.ts               Formato MXN
    structured-data.ts        JSON-LD seguro
    validation.ts             Esquema Zod
    whatsapp.ts               Mensaje y URL de WhatsApp
  types/                      Tipos de producto y pedido
public/
  images/                     Imágenes locales WebP
tests/
  unit/                       Moneda, carrito, cobertura, SEO, Zod y WhatsApp
  flow/                       Flujo de compra con Testing Library
worker/index.ts               Entrada de Cloudflare Worker
vite.config.ts                vinext, Vite, Cloudflare y Sites
.openai/hosting.json          Metadatos de Sites; sin D1 ni R2 activos
```

La tienda no requiere base de datos: catálogo, contenido y zonas son archivos tipados. No se incluyen dependencias ni migraciones de base de datos en el flujo actual.

## Pruebas

`npm run test` ejecuta las pruebas Vitest `tests/**/*.test.ts` y `tests/**/*.test.tsx`.

Las pruebas unitarias cubren:

- formato y redondeo de moneda MXN;
- subtotal, costo de entrega y umbral gratuito;
- límites, cantidades negativas, inventario y restauración del carrito;
- códigos postales demostrativos y confirmación manual;
- validación del formulario y aceptaciones obligatorias;
- mensaje de WhatsApp y codificación de acentos, espacios, `#` y `&`;
- datos estructurados y protección al serializar JSON-LD.

La prueba de flujo agrega un producto, abre el carrito, aumenta la cantidad, continúa al checkout, completa los datos y comprueba el enlace generado para WhatsApp.

Para investigar una prueba concreta:

```powershell
npm run test:watch
```

## Despliegue

### Lista previa común

1. Sustituye todos los datos demostrativos y pendientes.
2. Configura un número real de WhatsApp y prueba el mensaje en un dispositivo.
3. Reemplaza las fotografías y revisa sus textos alternativos.
4. Completa la revisión legal, de inocuidad y de etiquetado.
5. Configura `NEXT_PUBLIC_SITE_URL` con el dominio final.
6. Ejecuta pruebas, typecheck, lint y build.

### Sites

Este repositorio ya incluye `.openai/hosting.json` y el complemento de build requerido por Sites. Desde Codex, solicita publicar el proyecto con Sites después de completar la lista previa. Sites crea o reutiliza el proyecto, guarda su identificador en `.openai/hosting.json`, empaqueta el build validado y permite configurar las variables de entorno del despliegue. Mantén D1 y R2 desactivados (`null`) mientras la tienda no los necesite. No publiques una versión compartida o pública sin confirmar primero la visibilidad deseada.

### Cloudflare Workers

La integración nativa de vinext es la ruta directa:

```powershell
npm run test
npm run typecheck
npm run lint
npm run build
npx wrangler login
$env:CLOUDFLARE_ACCOUNT_ID="TU_ACCOUNT_ID"
npx vinext deploy
```

Configura las cuatro variables públicas también en el entorno de producción de Cloudflare, en especial el dominio final y el número de WhatsApp. Para automatización usa un token con permisos mínimos en el entorno de CI; nunca lo guardes en `.env.example` ni en el repositorio. Después del despliegue, prueba rutas legales, productos, sitemap, robots, API de pedido, imágenes y flujo completo de WhatsApp.

### Vercel

El código de la aplicación usa la estructura App Router, pero los scripts del repositorio están orientados a vinext. Para Vercel usa el compilador nativo de Next.js:

1. importa el repositorio en Vercel;
2. selecciona el preset **Next.js** y Node.js 22;
3. usa `npm install` como instalación;
4. sobrescribe el comando de build con `npx next build`;
5. deja que Vercel detecte la salida de Next.js; no configures `dist` como directorio de salida;
6. añade las cuatro variables de entorno para Producción y, si aplica, Preview;
7. antes del primer despliegue, ejecuta localmente `npx next build` y corrige cualquier incompatibilidad específica del runtime.

Si se desea conservar vinext también en Vercel, primero debe añadirse y validarse un adaptador Nitro para Vercel; ese adaptador no forma parte del proyecto actual.

## Mantenimiento recomendado

- Ejecuta la compuerta de calidad después de cambiar productos, configuración o dependencias.
- Prueba en móvil, tableta y escritorio, con teclado y reducción de movimiento.
- Verifica periódicamente inventario, precios, cobertura, enlaces y fechas legales.
- Revisa que las afirmaciones visibles sigan coincidiendo con receta, proceso, etiqueta y evidencia vigentes.
- Conserva `package-lock.json` y revisa actualizaciones de dependencias antes de aplicarlas en producción.

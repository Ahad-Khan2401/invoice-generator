/* ─────────────────────────────────────────────────
   Spanish (es) landing pages — rendered by app/es/[slug]/page.tsx
   Each slug becomes a URL: /es/<slug>
   Target markets: Mexico, Spain, Colombia, Argentina, Chile
───────────────────────────────────────────────── */
export interface LandingEs {
  h1:       string;
  sub:      string;
  title:    string;
  desc:     string;
  keywords: string[];
  body:     { h2: string; p: string }[];
  faq:      { q: string; a: string }[];
}

export const LANDING_ES: Record<string, LandingEs> = {

  "generador-de-facturas-gratis": {
    h1:  "Generador de Facturas Gratis — Crea y Descarga en PDF",
    sub: "El generador de facturas online más rápido. Rellena los datos, agrega tus artículos y descarga una factura profesional en PDF al instante — gratis, sin registro.",
    title: "Generador de Facturas Gratis — Crea Facturas PDF Online",
    desc:  "Crea facturas profesionales en PDF gratis con nuestro generador de facturas online. Agrega tu logo, aplica impuestos y descarga al instante. Sin registro requerido.",
    keywords: ["generador de facturas gratis", "crear factura gratis", "factura en pdf gratis", "generador de facturas online", "hacer factura gratis"],
    body: [
      { h2: "¿Cómo crear una factura gratis?", p: "Con PDF Bill Builder puedes crear una factura profesional en menos de 2 minutos. Solo ingresa los datos de tu empresa y tu cliente, agrega los artículos o servicios, aplica el impuesto correspondiente y descarga el PDF. No necesitas crear una cuenta ni instalar ningún programa." },
      { h2: "¿Qué debe incluir una factura?", p: "Una factura completa debe incluir: nombre y datos de tu empresa, datos del cliente, número de factura, fecha de emisión y fecha de vencimiento, descripción detallada de los productos o servicios, subtotal, impuestos aplicables y total a pagar. También puedes agregar tus datos bancarios para facilitar el pago." },
      { h2: "¿Es legal una factura generada online?", p: "Sí. El formato de la factura no determina su validez legal — lo que importa es que contenga toda la información requerida por las leyes fiscales de tu país. Nuestro generador incluye todos los campos necesarios para que tu factura sea válida." },
      { h2: "¿Puedo crear recibos y cotizaciones también?", p: "Sí. Además de facturas, puedes crear recibos de pago y cotizaciones con el mismo generador. Solo selecciona el tipo de documento que necesitas al inicio del formulario." },
    ],
    faq: [
      { q: "¿El generador de facturas es completamente gratis?", a: "Sí, 100% gratis. Sin límite de facturas, sin marca de agua, sin necesidad de crear una cuenta. Solo crea y descarga." },
      { q: "¿Puedo agregar mi logo a la factura?", a: "Sí. Puedes subir el logo de tu empresa y aparecerá en la parte superior de la factura en el PDF descargado." },
      { q: "¿En qué moneda puedo facturar?", a: "El generador soporta múltiples monedas: USD ($), EUR (€), GBP (£), MXN, COP, ARS, y más. Selecciona la moneda de tu preferencia antes de agregar los artículos." },
      { q: "¿Los datos de mi factura se guardan en algún servidor?", a: "No. Todos los datos que ingresas permanecen en tu navegador. Ningún dato se envía a ningún servidor. Total privacidad." },
      { q: "¿Puedo imprimir la factura directamente?", a: "Sí. Además de descargar el PDF, tienes la opción de imprimir directamente desde el navegador con el botón 'Imprimir'." },
    ],
  },

  "factura-gratis": {
    h1:  "Factura Gratis — Crea tu Factura Profesional en PDF",
    sub: "Crea una factura gratis en segundos. Personaliza con tu logo y colores, aplica IVA o impuestos, y descarga un PDF impecable — sin registro, sin costo.",
    title: "Factura Gratis — Generador de Facturas PDF Online Gratuito",
    desc:  "Genera una factura gratis online. Personaliza los datos, aplica impuestos y descarga un PDF profesional al instante. Ideal para freelancers y pequeñas empresas.",
    keywords: ["factura gratis", "hacer una factura gratis", "factura online gratis", "crear factura pdf gratis", "generar factura gratis"],
    body: [
      { h2: "¿Por qué usar un generador de facturas online?", p: "Un generador de facturas online elimina la necesidad de descargar software o pagar suscripciones costosas. Solo abres el navegador, rellenas los datos y en segundos tienes una factura profesional lista para enviar a tu cliente." },
      { h2: "Factura para freelancers", p: "Si trabajas como freelancer o autónomo, emitir facturas profesionales es fundamental para cobrar tus servicios y llevar un control de tus ingresos. Puedes incluir tu nombre, dirección fiscal, número de identificación y descripción detallada de cada servicio prestado." },
      { h2: "¿Cómo calcular el IVA en una factura?", p: "El generador calcula el IVA automáticamente. Solo ingresa el porcentaje de IVA que aplica en tu país (por ejemplo, 16% en México, 21% en España, 19% en Colombia) y el sistema calculará el monto de impuesto y el total a pagar." },
    ],
    faq: [
      { q: "¿Puedo crear una factura sin RFC o número fiscal?", a: "Sí. El generador es flexible y no obliga a ingresar un número fiscal. Puedes incluirlo o dejarlo en blanco según tus necesidades." },
      { q: "¿Cómo envío la factura a mi cliente?", a: "Descarga el PDF y adjúntalo en un correo electrónico a tu cliente. El formato PDF garantiza que la factura se vea exactamente igual en cualquier dispositivo." },
      { q: "¿Puedo numerar mis facturas automáticamente?", a: "El generador tiene un campo para el número de factura (por ejemplo, FAC-001). Debes ingresar el número manualmente para cada factura." },
    ],
  },

  "plantilla-de-factura": {
    h1:  "Plantilla de Factura Gratis — Descarga en PDF",
    sub: "Usa nuestra plantilla de factura profesional online. Completa los datos en tu navegador y descarga un PDF perfecto en segundos — gratis, sin software.",
    title: "Plantilla de Factura Gratis — Rellena y Descarga PDF Online",
    desc:  "Plantilla de factura profesional gratis. Rellena los datos online y descarga el PDF al instante. Sin Word, sin Excel, sin registro. Perfecta para freelancers y pymes.",
    keywords: ["plantilla de factura", "plantilla factura gratis", "plantilla de factura pdf", "plantilla factura word gratis", "modelo de factura gratis"],
    body: [
      { h2: "¿Qué ventaja tiene una plantilla online sobre Word o Excel?", p: "Las plantillas de Word o Excel requieren ajustar márgenes, proteger fórmulas y guardar en PDF manualmente. Una plantilla online como PDF Bill Builder calcula los totales automáticamente, siempre cabe en una página A4 y genera el PDF con un solo clic." },
      { h2: "Plantilla de factura para servicios profesionales", p: "Si eres consultor, abogado, diseñador o cualquier profesional de servicios, esta plantilla te permite detallar cada servicio con descripción, horas trabajadas y tarifa por hora. El total se calcula automáticamente." },
      { h2: "Plantilla de factura con IVA", p: "La plantilla incluye campo de IVA configurable. Puedes ingresar el porcentaje correspondiente a tu país y la plantilla mostrará el desglose de base imponible, IVA y total en el documento PDF." },
    ],
    faq: [
      { q: "¿La plantilla tiene marca de agua o logo de PDF Bill Builder?", a: "La versión gratuita incluye un pequeño texto en el pie de página. Con la versión Pro puedes eliminarlo completamente para un documento 100% personalizado." },
      { q: "¿Puedo usar la misma plantilla para distintos clientes?", a: "Sí. El generador no guarda datos entre sesiones (para proteger tu privacidad), así que cada vez que abres la herramienta obtienes una plantilla en blanco lista para un nuevo cliente." },
      { q: "¿La plantilla funciona en celular o tablet?", a: "Sí. El generador es completamente responsive y funciona en cualquier dispositivo con navegador web." },
    ],
  },

  "generador-de-recibos": {
    h1:  "Generador de Recibos Gratis — PDF Profesional",
    sub: "Crea recibos de pago profesionales en segundos. Descarga el recibo en PDF al instante — gratis, sin registro ni software.",
    title: "Generador de Recibos Gratis — Crea Recibos PDF Online",
    desc:  "Genera recibos de pago en PDF gratis con nuestro generador online. Agrega los detalles del pago, fecha, monto y descarga al instante. Perfecto para cualquier tipo de negocio.",
    keywords: ["generador de recibos", "recibo de pago gratis", "crear recibo pdf", "recibo de pago online", "hacer recibo gratis"],
    body: [
      { h2: "¿Qué es un recibo de pago?", p: "Un recibo de pago es un documento que confirma que un pago ha sido realizado. A diferencia de una factura (que solicita el pago), el recibo lo confirma. Es fundamental para llevar un registro contable y para que el cliente tenga comprobante de su pago." },
      { h2: "¿Qué debe incluir un recibo de pago?", p: "Un recibo completo debe incluir: nombre y datos de quien recibe el pago, nombre y datos de quien paga, número de recibo, fecha, descripción del concepto pagado, monto pagado (con desglose de impuestos si aplica), y método de pago." },
      { h2: "Recibo de arrendamiento o renta", p: "Si eres propietario de inmuebles, puedes usar este generador para crear recibos de renta mensuales. Incluye el periodo correspondiente (por ejemplo, 'Renta correspondiente al mes de enero 2026'), el monto, el inmueble y los datos del inquilino." },
    ],
    faq: [
      { q: "¿En qué se diferencia un recibo de una factura?", a: "Una factura es un documento que solicita el pago (se emite antes de recibir el dinero). Un recibo confirma que el pago fue recibido (se emite después de cobrar). Ambos son documentos legales importantes." },
      { q: "¿Puedo crear recibos en pesos mexicanos o colombianos?", a: "Sí. El generador soporta múltiples monedas. Selecciona la moneda de tu país en el campo de moneda antes de ingresar los importes." },
    ],
  },

  "cotizacion-gratis": {
    h1:  "Generador de Cotizaciones Gratis — Descarga en PDF",
    sub: "Crea cotizaciones profesionales en segundos. Descarga en PDF y envía a tus clientes al instante — gratis, sin registro.",
    title: "Generador de Cotizaciones Gratis — Crear Cotización PDF Online",
    desc:  "Genera cotizaciones profesionales en PDF gratis. Agrega tus productos o servicios, aplica descuentos e impuestos y descarga al instante. Sin registro ni software.",
    keywords: ["generador de cotizaciones", "hacer cotizacion gratis", "cotizacion en pdf gratis", "crear cotizacion online", "formato de cotizacion gratis"],
    body: [
      { h2: "¿Qué es una cotización y para qué sirve?", p: "Una cotización (también llamada presupuesto o proforma) es un documento que presenta los precios de tus productos o servicios a un cliente potencial antes de confirmar la venta. Es la primera etapa del proceso de venta profesional." },
      { h2: "¿Cómo hacer una cotización profesional?", p: "Una cotización profesional debe incluir tus datos de contacto, los datos del cliente, una descripción clara de cada producto o servicio con su precio unitario, el subtotal, los impuestos aplicables, el total, la vigencia de la cotización y las condiciones de pago." },
      { h2: "Diferencia entre cotización y factura", p: "La cotización propone un precio y no genera obligación de pago. La factura exige el pago por un servicio ya prestado o producto entregado. Una cotización aprobada por el cliente se convierte en la base para emitir la factura." },
    ],
    faq: [
      { q: "¿Por cuánto tiempo es válida una cotización?", a: "Depende de tu negocio. Lo más común es indicar 'Vigencia: 30 días'. Puedes escribirlo en el campo de notas de la cotización." },
      { q: "¿Puedo convertir una cotización en factura?", a: "El generador no convierte automáticamente, pero puedes descargar la cotización como referencia y luego crear una nueva factura con los mismos datos cuando el cliente confirme." },
    ],
  },
};

export const LANDING_ES_SLUGS = Object.keys(LANDING_ES);

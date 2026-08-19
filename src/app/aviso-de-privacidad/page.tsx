import type { Metadata } from "next";
import { LegalPage, LegalBlock } from "@/components/legal-page";
import { site } from "@/content/site.config";

export const metadata: Metadata = {
  title: "Aviso de privacidad",
  description:
    "Qué datos recibimos cuando nos escribes, para qué los usamos y cómo pedir que los eliminemos.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Aviso de privacidad"
      intro="Lo único que hacemos con tus datos es responder tu solicitud y prepararte una propuesta de viaje."
    >
      <LegalBlock heading="Qué datos recibimos">
        <p>
          Los que tú escribes en el formulario de contacto: nombre, correo, WhatsApp o teléfono,
          país, fechas aproximadas, número de viajeros, destinos de interés, tipo de viaje y el
          mensaje que quieras dejarnos.
        </p>
        <p>
          Este sitio no crea cuentas, no procesa pagos y no pide datos bancarios ni documentos de
          identidad en ningún momento.
        </p>
      </LegalBlock>

      <LegalBlock heading="Para qué los usamos">
        <p>
          Únicamente para contactarte, entender qué viaje quieres y enviarte una propuesta con su
          costo. No vendemos ni compartimos tus datos con terceros con fines comerciales.
        </p>
        <p>
          Si tu viaje avanza, compartiremos con proveedores en India (hoteles, transporte) solo la
          información indispensable para reservar a tu nombre, y te lo diremos antes.
        </p>
      </LegalBlock>

      <LegalBlock heading="Cómo llega tu mensaje">
        <p>
          Según la configuración del sitio, tu solicitud puede enviarse a nuestro correo, llegar
          por WhatsApp o registrarse en el sistema de contacto que utilicemos. En todos los casos
          la recibe directamente el equipo que organiza los viajes.
        </p>
      </LegalBlock>

      <LegalBlock heading="Cuánto tiempo los guardamos">
        <p>
          Conservamos tu solicitud mientras exista una conversación activa y por un periodo
          razonable después, por si retomas el viaje más adelante. Puedes pedirnos que la
          eliminemos cuando quieras.
        </p>
      </LegalBlock>

      <LegalBlock heading="Tus derechos">
        <p>
          Puedes pedirnos acceso a los datos que tenemos sobre ti, su corrección o su eliminación
          escribiéndonos
          {site.contact.email ? ` a ${site.contact.email}` : " por el canal de contacto publicado"}.
          Respondemos a estas solicitudes sin condiciones.
        </p>
      </LegalBlock>

      <LegalBlock heading="Cookies y medición">
        <p>
          El sitio no instala cookies de publicidad ni de seguimiento de terceros. Si en el futuro
          se agrega alguna herramienta de medición, este aviso se actualizará antes.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}

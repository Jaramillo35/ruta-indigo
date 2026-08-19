import type { Metadata } from "next";
import { LegalPage, LegalBlock } from "@/components/legal-page";

export const metadata: Metadata = {
  title: "Términos de uso",
  description: "Qué es y qué no es este sitio, y cómo se acuerdan los viajes.",
  robots: { index: false, follow: true },
};

export default function Page() {
  return (
    <LegalPage
      title="Términos de uso"
      intro="Este sitio sirve para conocernos y pedir una propuesta de viaje. Todo lo que se acuerda, se acuerda por escrito y fuera de aquí."
    >
      <LegalBlock heading="Qué encuentras en este sitio">
        <p>
          Información sobre los viajes que organizamos y un formulario para solicitar una
          propuesta. No hay reservación en línea, ni creación de cuentas, ni pagos por la página.
        </p>
      </LegalBlock>

      <LegalBlock heading="Las rutas son ejemplos">
        <p>
          Los recorridos, duraciones y actividades que se describen son referencias para empezar a
          conversar. El itinerario que se aplique a tu viaje es el que quede por escrito en la
          propuesta que aceptes.
        </p>
      </LegalBlock>

      <LegalBlock heading="Precios">
        <p>
          No publicamos precios porque cada viaje se cotiza según fechas, número de personas,
          alojamiento y servicios incluidos. Cualquier cifra que recibas es válida en los términos
          y el periodo que indique la propuesta.
        </p>
      </LegalBlock>

      <LegalBlock heading="Servicios de terceros">
        <p>
          Los vuelos internacionales no forman parte de lo que organizamos. Hoteles, transporte y
          entradas se contratan con proveedores locales; cuando reservamos a tu nombre aplican
          además las condiciones de cada proveedor, que te compartiremos antes de confirmar.
        </p>
      </LegalBlock>

      <LegalBlock heading="Documentación de viaje">
        <p>
          Pasaporte, visa y requisitos de entrada a India son responsabilidad de cada viajero.
          Podemos orientarte sobre el proceso, pero no tramitamos documentos migratorios ni
          garantizamos su aprobación.
        </p>
      </LegalBlock>

      <LegalBlock heading="Cambios en el sitio">
        <p>
          Los contenidos pueden actualizarse en cualquier momento conforme crezca la oferta de
          destinos y servicios.
        </p>
      </LegalBlock>
    </LegalPage>
  );
}

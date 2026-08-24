import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("es", "privacy");

export default function Page() {
  return <LegalPage lang="es" doc="privacy" />;
}

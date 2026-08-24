import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("es", "terms");

export default function Page() {
  return <LegalPage lang="es" doc="terms" />;
}

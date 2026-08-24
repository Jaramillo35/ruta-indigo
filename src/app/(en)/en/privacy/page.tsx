import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <LegalPage lang="en" doc="privacy" />;
}

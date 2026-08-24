import { LegalPage } from "@/components/legal-page";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("en", "terms");

export default function Page() {
  return <LegalPage lang="en" doc="terms" />;
}

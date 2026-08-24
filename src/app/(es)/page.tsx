import { Home } from "@/components/home";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata("es");

export default function Page() {
  return <Home lang="es" />;
}

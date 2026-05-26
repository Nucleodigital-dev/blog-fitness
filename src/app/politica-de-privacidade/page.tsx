import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("politica-de-privacidade");

  return {
    title: page?.seoTitle || page?.title || "Política de privacidade",
    description:
      page?.seoDescription ||
      page?.description ||
      "Entenda como o Saúde em Foco trata dados, consentimento e solicitações de privacidade.",
    alternates: {
      canonical: "/politica-de-privacidade",
    },
  };
}

export default async function PoliticaDePrivacidadePage() {
  const page = await getSitePage("politica-de-privacidade");

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Política de privacidade"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

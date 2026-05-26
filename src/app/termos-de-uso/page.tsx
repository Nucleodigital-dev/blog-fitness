import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("termos-de-uso");

  return {
    title: page?.seoTitle || page?.title || "Termos de uso",
    description:
      page?.seoDescription ||
      page?.description ||
      "Conheça as condições gerais de acesso e uso do Saúde em Foco.",
    alternates: {
      canonical: "/termos-de-uso",
    },
  };
}

export default async function TermosDeUsoPage() {
  const page = await getSitePage("termos-de-uso");

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Termos de uso"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

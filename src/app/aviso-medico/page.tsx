import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("aviso-medico");

  return {
    title: page?.seoTitle || page?.title || "Aviso médico",
    description: page?.seoDescription || page?.description || "Aviso sobre o uso educativo dos conteúdos do Saúde em Foco.",
    alternates: {
      canonical: "/aviso-medico",
    },
  };
}

export default async function AvisoMedicoPage() {
  const page = await getSitePage("aviso-medico");

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Aviso médico"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

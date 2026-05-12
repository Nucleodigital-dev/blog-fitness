import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("politica-editorial");

  return {
    title: page?.seoTitle || page?.title || "Política editorial",
    description:
      page?.seoDescription || page?.description || "Entenda os critérios editoriais usados nos conteúdos do Saúde em Foco.",
    alternates: {
      canonical: "/politica-editorial",
    },
  };
}

export default async function PoliticaEditorialPage() {
  const page = await getSitePage("politica-editorial");

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Política editorial"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

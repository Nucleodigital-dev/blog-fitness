import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("sobre");

  return {
    title: page?.seoTitle || page?.title || "Sobre",
    description: page?.seoDescription || page?.description || "Conheça a missão editorial do Saúde em Foco.",
    alternates: {
      canonical: "/sobre",
    },
  };
}

export default async function SobrePage() {
  const page = await getSitePage("sobre");

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Saúde em Foco"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

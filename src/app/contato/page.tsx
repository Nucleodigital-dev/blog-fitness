import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";
import { getSitePage } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const page = await getSitePage("contato");

  return {
    title: page?.seoTitle || page?.title || "Contato",
    description: page?.seoDescription || page?.description || "Entre em contato com a equipe do Saúde em Foco.",
    alternates: {
      canonical: "/contato",
    },
  };
}

export default async function ContatoPage() {
  const page = await getSitePage("contato");

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Contato"}
      description={page?.description || ""}
      sections={page?.sections || []}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

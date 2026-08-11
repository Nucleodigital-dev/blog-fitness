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
  const publicCommitments = [
    {
      title: "Autoria e revisão técnica",
      body: "Todo artigo identifica seu autor e a data de publicação. Para pautas que envolvem sintomas, doenças, medicamentos, gestação, suplementação, risco de lesão ou decisões individualizadas, a publicação deve passar por revisão técnica compatível com o tema antes de ser tratada como orientação de saúde.",
    },
    {
      title: "Fontes e evidências",
      body: "Priorizamos diretrizes oficiais, órgãos de saúde, artigos científicos e bases reconhecidas. Quando uma afirmação técnica exigir apoio, as referências devem aparecer no próprio artigo para que o leitor possa conferir o contexto.",
    },
    {
      title: "Correções e transparência",
      body: "Erros factuais, referências incompletas e conteúdos desatualizados podem ser comunicados pelo canal de contato. A equipe avalia o relato e atualiza o material quando necessário; publicidade, parcerias e links com comissão são identificados de forma clara.",
    },
  ];
  const sections = [...(page?.sections || [])];

  for (const commitment of publicCommitments) {
    if (!sections.some((section) => section.title === commitment.title)) {
      sections.push(commitment);
    }
  }

  return (
    <InstitutionalPage
      eyebrow={page?.eyebrow || ""}
      title={page?.title || "Política editorial"}
      description={page?.description || ""}
      sections={sections}
      cta={page?.cta?.href ? { label: page.cta.label, href: page.cta.href } : undefined}
    />
  );
}

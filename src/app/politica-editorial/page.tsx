import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Politica editorial",
  description: "Entenda os criterios editoriais usados nos conteudos do Saude em Foco.",
  alternates: {
    canonical: "/politica-editorial",
  },
};

export default function PoliticaEditorialPage() {
  return (
    <InstitutionalPage
      eyebrow="Confianca e transparencia"
      title="Politica editorial"
      description="Nosso objetivo e publicar conteudo util, verificavel e facil de ler, com responsabilidade especial por tratar temas ligados a saude e bem-estar."
      sections={[
        {
          title: "Criterios de publicacao",
          body: "Cada artigo deve ter uma pergunta central clara, explicar conceitos com contexto suficiente e separar orientacao educativa de recomendacao medica individual.",
        },
        {
          title: "Fontes e referencias",
          body: "Quando o tema envolve afirmacoes tecnicas, priorizamos diretrizes oficiais, entidades de saude, artigos cientificos e bases reconhecidas como OMS, Ministerio da Saude, PubMed e SciELO.",
        },
        {
          title: "Atualizacoes",
          body: "Conteudos podem ser revisados conforme novas evidencias, mudancas de diretrizes ou melhorias editoriais. A data exibida no artigo ajuda o leitor a entender a recencia do material.",
        },
        {
          title: "Independencia editorial",
          body: "Nao publicamos promessas milagrosas, diagnosticos definitivos sem avaliacao ou incentivo a abandonar acompanhamento profissional.",
        },
      ]}
      cta={{ label: "Ver aviso medico", href: "/aviso-medico" }}
    />
  );
}

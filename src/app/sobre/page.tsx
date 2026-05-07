import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Sobre",
  description: "Conheca a missao editorial do Saude em Foco.",
  alternates: {
    canonical: "/sobre",
  },
};

export default function SobrePage() {
  return (
    <InstitutionalPage
      eyebrow="Sobre o projeto"
      title="Saude em Foco"
      description="Um blog educativo criado para traduzir temas de saude, fitness, nutricao e bem-estar em guias praticos, claros e responsaveis."
      sections={[
        {
          title: "Nossa missao",
          body: "Publicar conteudos que ajudem leitores a tomar melhores decisoes no dia a dia, sempre com linguagem simples, foco pratico e cuidado para nao substituir avaliacao individualizada.",
        },
        {
          title: "Como produzimos conteudo",
          body: "Os artigos sao organizados por temas, revisados editorialmente e estruturados com respostas diretas, alertas, perguntas frequentes e referencias quando o tema exige apoio cientifico.",
        },
        {
          title: "Compromisso com clareza",
          body: "Priorizamos orientacoes educativas, evitamos promessas exageradas e indicamos a busca por atendimento profissional quando ha sintomas persistentes, dor intensa ou duvidas clinicas.",
        },
      ]}
      cta={{ label: "Ler artigos", href: "/" }}
    />
  );
}

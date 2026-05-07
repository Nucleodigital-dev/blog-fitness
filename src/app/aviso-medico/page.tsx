import type { Metadata } from "next";
import { InstitutionalPage } from "@/components/InstitutionalPage";

export const metadata: Metadata = {
  title: "Aviso medico",
  description: "Aviso sobre o uso educativo dos conteudos do Saude em Foco.",
  alternates: {
    canonical: "/aviso-medico",
  },
};

export default function AvisoMedicoPage() {
  return (
    <InstitutionalPage
      eyebrow="Uso responsavel"
      title="Aviso medico"
      description="O conteudo do Saude em Foco tem finalidade exclusivamente educativa e informativa."
      sections={[
        {
          title: "Nao substitui consulta",
          body: "As informacoes publicadas no blog nao substituem consulta, diagnostico, tratamento ou acompanhamento feito por profissionais de saude habilitados.",
        },
        {
          title: "Procure ajuda quando necessario",
          body: "Em caso de dor forte, sintomas persistentes, piora rapida, uso de medicamentos, gravidez, doencas preexistentes ou duvidas individuais, procure atendimento profissional.",
        },
        {
          title: "Decisoes individuais",
          body: "Rotinas de treino, alimentacao e cuidados com a saude devem considerar historico, objetivos, exames, limitacoes e orientacao profissional quando aplicavel.",
        },
      ]}
      cta={{ label: "Voltar para o blog", href: "/" }}
    />
  );
}

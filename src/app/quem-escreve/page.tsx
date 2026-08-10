import type { Metadata } from "next";
import { AuthorCard } from "@/components/AuthorCard";
import { getAllAuthors } from "@/lib/authors";

export const metadata: Metadata = { title: "Quem escreve", description: "Conheça a equipe editorial e de revisão do Saúde em Foco.", alternates: { canonical: "/quem-escreve" } };

export default function QuemEscrevePage() {
  return <article style={{ maxWidth: 960, margin: "0 auto", padding: "24px 0 64px" }}><p style={{ color:"var(--primary)", fontWeight:800 }}>TRANSPARÊNCIA EDITORIAL</p><h1>Quem escreve no Saúde em Foco</h1><p style={{ color:"var(--text-muted)", lineHeight:1.7 }}>Conheça os profissionais que participam da produção, autoria e revisão dos conteúdos. Os artigos são informativos e não substituem avaliação individual de profissionais de saúde.</p><div style={{ display:"grid", gap:20, marginTop:32 }}>{getAllAuthors().map((author) => <AuthorCard author={author} key={author.slug} />)}</div></article>;
}

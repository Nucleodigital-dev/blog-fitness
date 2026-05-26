import type { AuthorProfile } from "./content-types";

const authors: AuthorProfile[] = [
  {
    slug: "redacao-saude-em-foco",
    name: "Redação Saúde em Foco",
    role: "Equipe editorial",
    shortBio:
      "Equipe responsável pela curadoria, redação e atualização dos guias educativos do Saúde em Foco.",
    bio: [
      "A Redação Saúde em Foco organiza, escreve e revisa conteúdos educativos voltados a saúde, treino, nutrição e bem-estar com linguagem prática e responsável.",
      "Nosso trabalho editorial prioriza clareza, contexto e apoio em fontes reconhecidas sempre que o tema envolve sintomas, suplementação, hábitos de saúde ou decisões que impactam o dia a dia do leitor.",
    ],
    credentials: [
      "Curadoria editorial com foco em conteúdo educativo e SEO",
      "Priorização de fontes institucionais e literatura científica quando aplicável",
      "Atualização contínua de textos conforme revisão editorial",
    ],
    expertise: [
      "Educação em saúde",
      "Treino e recuperação",
      "Nutrição fitness",
      "Hábitos e bem-estar",
    ],
    note:
      "Este perfil representa a equipe editorial do projeto até a publicação de perfis individuais de especialistas e autores convidados.",
    sameAs: [],
  },
];

export function getAllAuthors() {
  return authors;
}

export function getDefaultAuthor() {
  return authors[0];
}

export function getAuthorBySlug(slug: string) {
  return authors.find((author) => author.slug === slug) || null;
}

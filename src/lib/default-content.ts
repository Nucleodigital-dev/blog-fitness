import type { SitePage, SiteSettings } from "./content-types";

export const defaultSiteSettings: SiteSettings = {
  title: "Saúde em Foco",
  description: "Artigos educativos sobre saúde, fitness, nutrição, treino e bem-estar.",
  logo: "/logo.png",
  logoAlt: "Saúde em Foco",
  footerDescription: "Os melhores artigos sobre saúde, fitness e bem-estar. Transforme seu corpo e mente.",
  navigationItems: [
    { label: "Início", href: "/" },
    { label: "Nutrição Fitness", categorySlug: "nutricao-fitness" },
    { label: "Treino Fitness", categorySlug: "treino-fitness" },
    { label: "Mentalidade e Hábitos", categorySlug: "mentalidade-habitos" },
    { label: "Suplementação e Recuperação", categorySlug: "suplementacao-recuperacao" },
    { label: "Sobre", href: "/sobre" },
  ],
  footerColumns: [
    {
      title: "Categorias",
      links: [
        { label: "Nutrição Fitness", categorySlug: "nutricao-fitness" },
        { label: "Treino Fitness", categorySlug: "treino-fitness" },
        { label: "Mentalidade e Hábitos", categorySlug: "mentalidade-habitos" },
        { label: "Suplementação e Recuperação", categorySlug: "suplementacao-recuperacao" },
      ],
    },
    {
      title: "Institucional",
      links: [
        { label: "Sobre", href: "/sobre" },
        { label: "Política editorial", href: "/politica-editorial" },
        { label: "Política de cookies", href: "/politica-de-cookies" },
        { label: "Aviso médico", href: "/aviso-medico" },
      ],
    },
  ],
};

export const defaultPages: Record<string, SitePage> = {
  home: {
    slug: "home",
    title: "Transforme seu Corpo e Mente",
    titleEn: "Transform Your Body and Mind",
    description:
      "Descubra estratégias baseadas em ciência para ganho de massa, perda de gordura e uma vida mais saudável.",
    descriptionEn:
      "Discover science-based strategies for muscle building, fat loss, and living a healthier lifestyle.",
    seoTitle: "Saúde em Foco | Blog focado em SEO",
    seoDescription: "Os melhores artigos sobre saúde, fitness e bem-estar.",
  },
  sobre: {
    slug: "sobre",
    eyebrow: "Sobre o projeto",
    title: "Saúde em Foco",
    description:
      "Um blog educativo criado para traduzir temas de saúde, fitness, nutrição e bem-estar em guias práticos, claros e responsáveis.",
    seoTitle: "Sobre",
    seoDescription: "Conheça a missão editorial do Saúde em Foco.",
    sections: [
      {
        title: "Nossa missão",
        body: "Publicar conteúdos que ajudem leitores a tomar melhores decisões no dia a dia, sempre com linguagem simples, foco prático e cuidado para não substituir avaliação individualizada.",
      },
      {
        title: "Como produzimos conteúdo",
        body: "Os artigos são organizados por temas, revisados editorialmente e estruturados com respostas diretas, alertas, perguntas frequentes e referências quando o tema exige apoio científico.",
      },
      {
        title: "Compromisso com clareza",
        body: "Priorizamos orientações educativas, evitamos promessas exageradas e indicamos a busca por atendimento profissional quando há sintomas persistentes, dor intensa ou dúvidas clínicas.",
      },
      {
        title: "Para quem escrevemos",
        body: "Os conteúdos são pensados para pessoas que querem entender melhor treino, alimentação, recuperação, dor e hábitos de saúde sem precisar decifrar linguagem técnica. Também falamos com quem está começando, voltando depois de uma pausa ou tentando organizar uma rotina mais realista.",
      },
      {
        title: "O que você encontra nos guias",
        body: "Cada artigo busca responder uma dúvida prática, explicar os sinais mais importantes, mostrar caminhos seguros de adaptação e indicar quando vale procurar acompanhamento profissional. Sempre que possível, os textos incluem exemplos aplicáveis, cuidados comuns e perguntas frequentes.",
      },
      {
        title: "Limites do conteúdo online",
        body: "Informação de qualidade ajuda a tomar decisões melhores, mas não substitui avaliação individual. Idade, histórico, medicamentos, exames, lesões, sono, estresse e rotina mudam a melhor recomendação para cada pessoa.",
      },
    ],
    cta: { label: "Ler artigos", href: "/" },
  },
  "politica-editorial": {
    slug: "politica-editorial",
    eyebrow: "Confiança e transparência",
    title: "Política editorial",
    description:
      "Nosso objetivo é publicar conteúdo útil, verificável e fácil de ler, com responsabilidade especial por tratar temas ligados à saúde e bem-estar.",
    seoTitle: "Política editorial",
    seoDescription: "Entenda os critérios editoriais usados nos conteúdos do Saúde em Foco.",
    sections: [
      {
        title: "Critérios de publicação",
        body: "Cada artigo deve ter uma pergunta central clara, explicar conceitos com contexto suficiente e separar orientação educativa de recomendação médica individual.",
      },
      {
        title: "Fontes e referências",
        body: "Quando o tema envolve afirmações técnicas, priorizamos diretrizes oficiais, entidades de saúde, artigos científicos e bases reconhecidas como OMS, Ministério da Saúde, PubMed e SciELO.",
      },
      {
        title: "Atualizações",
        body: "Conteúdos podem ser revisados conforme novas evidências, mudanças de diretrizes ou melhorias editoriais. A data exibida no artigo ajuda o leitor a entender a recência do material.",
      },
      {
        title: "Independência editorial",
        body: "Não publicamos promessas milagrosas, diagnósticos definitivos sem avaliação ou incentivo a abandonar acompanhamento profissional.",
      },
      {
        title: "Como lidamos com temas de saúde",
        body: "Quando um assunto envolve dor, sintomas, suplementação, treino intenso ou alimentação, usamos linguagem cautelosa e evitamos transformar informação geral em prescrição individual. O leitor deve entender possibilidades, riscos e próximos passos seguros.",
      },
      {
        title: "Revisão e melhoria contínua",
        body: "Os conteúdos podem ser ampliados, reescritos ou atualizados quando identificamos lacunas, mudanças de entendimento ou oportunidade de tornar a orientação mais útil. Melhorar um texto faz parte do trabalho editorial, especialmente em temas que afetam decisões do dia a dia.",
      },
      {
        title: "Publicidade, afiliados e conflitos de interesse",
        body: "Quando houver parceria comercial, recomendação patrocinada ou link com potencial de comissão, isso deve ser apresentado de forma clara. A prioridade editorial é preservar utilidade, transparência e segurança do leitor.",
      },
      {
        title: "Responsabilidade do leitor",
        body: "O leitor deve usar os artigos como ponto de partida educativo. Em caso de dor persistente, doença diagnosticada, gravidez, uso de medicamentos ou dúvidas individuais, a decisão mais segura é conversar com profissional habilitado.",
      },
    ],
    cta: { label: "Ver aviso médico", href: "/aviso-medico" },
  },
  "politica-de-cookies": {
    slug: "politica-de-cookies",
    eyebrow: "Privacidade e preferências",
    title: "Política de cookies",
    description:
      "Esta página explica como usamos cookies e tecnologias semelhantes para manter o Saúde em Foco funcionando e lembrar escolhas feitas por você.",
    seoTitle: "Política de cookies",
    seoDescription: "Entenda quais cookies o Saúde em Foco usa e como controlar suas preferências.",
    sections: [
      {
        title: "O que são cookies",
        body: "Cookies são pequenos arquivos salvos no navegador para reconhecer preferências, manter recursos técnicos funcionando e melhorar a experiência de navegação.",
      },
      {
        title: "Cookies essenciais",
        body: "Usamos cookies essenciais para registrar suas escolhas de consentimento, manter recursos técnicos e preservar a sessão administrativa quando aplicável. Esses recursos ficam sempre ativos porque sustentam o funcionamento básico.",
      },
      {
        title: "Preferências",
        body: "Com sua permissão, salvamos idioma preferido, tema claro ou escuro, artigos salvos para depois, últimos artigos vistos e categorias favoritas. Esses dados ficam no seu navegador.",
      },
      {
        title: "Estatísticas",
        body: "Com consentimento, podemos carregar ferramentas como Google Analytics para entender páginas acessadas, desempenho e comportamento agregado. O carregamento só acontece quando a categoria de estatísticas está ativa e o ID está configurado.",
      },
      {
        title: "Marketing",
        body: "Com consentimento, podemos carregar ferramentas como Meta Pixel para medir campanhas e públicos. Essa categoria fica desligada até você permitir explicitamente.",
      },
      {
        title: "Notificações do navegador",
        body: "As notificações só são ativadas se você ligar essa categoria, clicar em permitir e confirmar a permissão nativa do navegador. Você pode bloquear ou remover essa permissão a qualquer momento nas configurações do navegador.",
      },
      {
        title: "Como controlar suas escolhas",
        body: "Você pode aceitar todos os opcionais ou recusá-los no aviso exibido pelo site. Depois disso, é possível limpar cookies, armazenamento local e permissões diretamente nas configurações do navegador.",
      },
      {
        title: "Atualizações desta política",
        body: "Esta política pode ser atualizada quando novos recursos forem adicionados, quando houver mudanças técnicas ou quando precisarmos explicar melhor o uso de dados e preferências.",
      },
    ],
    cta: { label: "Voltar para o blog", href: "/" },
  },
  "aviso-medico": {
    slug: "aviso-medico",
    eyebrow: "Uso responsável",
    title: "Aviso médico",
    description: "O conteúdo do Saúde em Foco tem finalidade exclusivamente educativa e informativa.",
    seoTitle: "Aviso médico",
    seoDescription: "Aviso sobre o uso educativo dos conteúdos do Saúde em Foco.",
    sections: [
      {
        title: "Não substitui consulta",
        body: "As informações publicadas no blog não substituem consulta, diagnóstico, tratamento ou acompanhamento feito por profissionais de saúde habilitados.",
      },
      {
        title: "Procure ajuda quando necessário",
        body: "Em caso de dor forte, sintomas persistentes, piora rápida, uso de medicamentos, gravidez, doenças preexistentes ou dúvidas individuais, procure atendimento profissional.",
      },
      {
        title: "Decisões individuais",
        body: "Rotinas de treino, alimentação e cuidados com a saúde devem considerar histórico, objetivos, exames, limitações e orientação profissional quando aplicável.",
      },
      {
        title: "Quando procurar atendimento com urgência",
        body: "Procure atendimento imediato em caso de dor no peito, falta de ar intensa, desmaio, fraqueza súbita, sinais neurológicos, trauma importante, febre persistente, dor muito forte ou piora rápida de sintomas. Nessas situações, conteúdo online não deve atrasar cuidado presencial.",
      },
      {
        title: "Uso de exercícios e orientações práticas",
        body: "Exercícios citados nos artigos devem ser adaptados ao nível de condicionamento, dor, mobilidade e orientação recebida. Se um movimento piora sintomas, causa instabilidade ou altera sua forma de andar, respirar ou se movimentar, interrompa e busque avaliação.",
      },
      {
        title: "Suplementos e alimentação",
        body: "Informações sobre suplementos, calorias, proteína, creatina, cafeína ou estratégias alimentares são educativas. Pessoas com doenças, uso de medicamentos, gestação, histórico de transtorno alimentar ou restrições clínicas precisam de orientação individual antes de mudanças importantes.",
      },
      {
        title: "Atualização das informações",
        body: "Buscamos manter os textos claros e responsáveis, mas recomendações podem mudar conforme novas evidências e diretrizes. Sempre confira datas, contexto e, quando necessário, confirme a conduta com profissional de saúde.",
      },
    ],
    cta: { label: "Voltar para o blog", href: "/" },
  },
};

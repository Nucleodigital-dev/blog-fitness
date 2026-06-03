import type { SitePage, SiteSettings } from "./content-types";
import { contactEmail } from "./site";

export const defaultSiteSettings: SiteSettings = {
  title: "Saúde em Foco",
  description: "Artigos educativos sobre saúde, fitness, nutrição, treino e bem-estar.",
  logo: "/logo.png",
  logoAlt: "Saúde em Foco",
  footerDescription: "Os melhores artigos sobre saúde, fitness e bem-estar. Transforme seu corpo e mente.",
  contactEmail,
  navigationItems: [
    { label: "Início", href: "/" },
    { label: "Nutrição Fitness", categorySlug: "nutricao-fitness" },
    { label: "Treino Fitness", categorySlug: "treino-fitness" },
    { label: "Mentalidade e Hábitos", categorySlug: "mentalidade-habitos" },
    { label: "Suplementação e Recuperação", categorySlug: "suplementacao-recuperacao" },
    { label: "Sobre", href: "/sobre" },
    { label: "Contato", href: "/contato" },
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
        { label: "Contato", href: "/contato" },
        { label: "Política editorial", href: "/politica-editorial" },
        { label: "Política de privacidade", href: "/politica-de-privacidade" },
        { label: "Política de cookies", href: "/politica-de-cookies" },
        { label: "Termos de uso", href: "/termos-de-uso" },
        { label: "Aviso médico", href: "/aviso-medico" },
        { label: "Autor", href: "/autor/redacao-saude-em-foco" },
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
    seoTitle: "Saúde em Foco | Fitness, Nutrição e Bem-Estar com Base Científica",
    seoDescription: "Guias práticos sobre treino, nutrição, emagrecimento, musculação e suplementação. Conteúdo educativo com base em ciência para sua rotina fitness.",
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
  contato: {
    slug: "contato",
    eyebrow: "Fale com a equipe",
    title: "Contato",
    description:
      "Este é o canal para dúvidas, correções, mensagens institucionais e assuntos relacionados ao conteúdo publicado no Saúde em Foco.",
    seoTitle: "Contato",
    seoDescription: "Entre em contato com a equipe editorial do Saúde em Foco.",
    sections: [
      {
        title: "Canal principal",
        body: `Você pode falar com a equipe pelo e-mail ${contactEmail}. Esse canal é usado para mensagens institucionais, dúvidas gerais, correções e temas relacionados ao conteúdo do site.`,
      },
      {
        title: "Correções e atualizações",
        body: "Se você identificou uma informação desatualizada, uma referência incompleta ou um trecho que mereça revisão editorial, envie a URL da página e explique o ponto observado. Isso ajuda a acelerar a análise.",
      },
      {
        title: "Tempo de resposta",
        body: "Buscamos responder contatos legítimos em prazo razoável, especialmente quando envolvem erros factuais, privacidade, uso de conteúdo, parcerias editoriais ou solicitação de remoção.",
      },
      {
        title: "O que este canal não substitui",
        body: "O e-mail de contato não substitui atendimento médico, nutricional, fisioterapêutico ou psicológico. Em caso de sintomas, dor intensa, urgência ou necessidade individual, procure um profissional habilitado.",
      },
    ],
    cta: { label: "Conhecer a política editorial", href: "/politica-editorial" },
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
  "politica-de-privacidade": {
    slug: "politica-de-privacidade",
    eyebrow: "Privacidade e proteção de dados",
    title: "Política de privacidade",
    description:
      "Esta política explica quais dados podem ser tratados pelo Saúde em Foco, em quais situações isso acontece e como você pode exercer seus direitos.",
    seoTitle: "Política de privacidade",
    seoDescription: "Saiba como o Saúde em Foco trata dados, cookies e solicitações ligadas à privacidade.",
    sections: [
      {
        title: "Quais dados podem ser tratados",
        body: "Podemos tratar dados técnicos e de navegação, como páginas acessadas, dispositivo, navegador, preferências salvas localmente e interações agregadas de uso quando você permite estatísticas ou marketing.",
      },
      {
        title: "Cookies e armazenamento local",
        body: "Usamos recursos técnicos para registrar consentimento, idioma, tema, favoritos, artigos salvos e preferências do site. Cookies não essenciais só devem ser ativados quando houver consentimento correspondente.",
      },
      {
        title: "Analytics, publicidade e terceiros",
        body: "Quando autorizado, o site pode carregar ferramentas como Google Analytics, Meta Pixel e, futuramente, soluções de publicidade como Google AdSense. Essas integrações podem usar cookies ou identificadores para medição, segurança, prevenção de fraude e personalização conforme a sua escolha.",
      },
      {
        title: "Seus direitos e solicitações",
        body: `Você pode solicitar esclarecimentos sobre privacidade, correção de informações e revisão de tratamento relacionado ao site pelo e-mail ${contactEmail}. Sempre que aplicável, analisaremos o pedido conforme a legislação vigente.`,
      },
      {
        title: "Atualizações desta política",
        body: "Esta política pode ser revisada quando houver mudança de ferramenta, base legal, forma de medição, publicidade, segurança ou funcionamento do projeto. Recomendamos consultar esta página periodicamente.",
      },
    ],
    cta: { label: "Gerenciar cookies", href: "/politica-de-cookies" },
  },
  "termos-de-uso": {
    slug: "termos-de-uso",
    eyebrow: "Regras de uso",
    title: "Termos de uso",
    description:
      "Estes termos estabelecem as condições gerais de acesso e uso dos conteúdos, páginas e recursos oferecidos pelo Saúde em Foco.",
    seoTitle: "Termos de uso",
    seoDescription: "Confira as condições de uso dos conteúdos e recursos publicados pelo Saúde em Foco.",
    sections: [
      {
        title: "Uso informativo e educativo",
        body: "Os conteúdos do site têm finalidade educativa e informativa. Eles não substituem consulta, diagnóstico, prescrição, tratamento ou acompanhamento individual feito por profissional habilitado.",
      },
      {
        title: "Responsabilidade do usuário",
        body: "Ao usar o site, o leitor concorda em avaliar contexto, limitações e adequação das informações para a própria realidade, buscando orientação profissional quando a decisão envolver sintomas, doença, suplementação, medicação ou risco individual.",
      },
      {
        title: "Propriedade intelectual",
        body: "Textos, estrutura editorial, identidade visual e materiais originais do projeto não podem ser copiados integralmente, republicados ou distribuídos como se fossem próprios sem autorização, salvo hipóteses legais e citações breves com atribuição adequada.",
      },
      {
        title: "Links, publicidade e parcerias",
        body: "O site pode exibir links externos, ferramentas de terceiros, publicidade, conteúdos patrocinados ou programas de monetização. Isso não elimina a responsabilidade do leitor de avaliar políticas, ofertas e decisões em ambientes externos.",
      },
      {
        title: "Contato e dúvidas",
        body: `Para dúvidas institucionais, notificações sobre uso de conteúdo ou temas legais ligados ao site, utilize o canal ${contactEmail}.`,
      },
    ],
    cta: { label: "Falar com a equipe", href: "/contato" },
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

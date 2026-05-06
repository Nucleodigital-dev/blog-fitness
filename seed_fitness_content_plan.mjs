import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';

const db = new Database('./data/blog.db');

try {
  db.exec('ALTER TABLE articles ADD COLUMN cover_alt TEXT');
} catch (e) {}

const pillars = [
  { slug: 'nutricao-fitness', name_pt: 'Nutrição Fitness', name_en: 'Fitness Nutrition' },
  { slug: 'treino-fitness', name_pt: 'Treino Fitness', name_en: 'Fitness Training' },
  { slug: 'mentalidade-habitos', name_pt: 'Mentalidade e Hábitos', name_en: 'Mindset and Habits' },
  { slug: 'suplementacao-recuperacao', name_pt: 'Suplementação e Recuperação', name_en: 'Supplements and Recovery' },
];

const categoryBySlug = new Map();
const upsertCategory = db.prepare(`
  INSERT INTO categories (id, name_pt, name_en, slug)
  VALUES (?, ?, ?, ?)
  ON CONFLICT(slug) DO UPDATE SET
    name_pt = excluded.name_pt,
    name_en = excluded.name_en
`);

for (const pillar of pillars) {
  const existing = db.prepare('SELECT id FROM categories WHERE slug = ?').get(pillar.slug);
  const id = existing?.id || randomUUID();
  upsertCategory.run(id, pillar.name_pt, pillar.name_en, pillar.slug);
  categoryBySlug.set(pillar.slug, id);
}

const sources = {
  nutrition: [
    '[OMS: alimentação saudável](https://www.who.int/news-room/fact-sheets/detail/healthy-diet)',
    '[Harvard Healthy Eating Plate](https://www.health.harvard.edu/questions-and-answers-about-the-healthy-eating-plate)',
    '[CDC: dicas de alimentação saudável](https://www.cdc.gov/nutrition/features/healthy-eating-tips.html)'
  ],
  training: [
    '[CDC: recomendações de atividade física para adultos](https://www.cdc.gov/physical-activity-basics/guidelines/adults.html)',
    '[OMS: recomendações de atividade física](https://www.who.int/initiatives/behealthy/physical-activity)'
  ],
  mindset: [
    '[CDC: sono e saúde](https://www.cdc.gov/sleep/about/index.html)',
    '[NIDDK: fatores que afetam peso e saúde](https://www.niddk.nih.gov/health-information/weight-management/adult-overweight-obesity/factors-affecting-weight-health)',
    '[CDC: adicionando atividade física à rotina](https://www.cdc.gov/physical-activity-basics/adding-adults/index.html)'
  ],
  supplements: [
    '[NIH ODS: suplementos para exercício e performance](https://ods.od.nih.gov/factsheets/ExerciseAndAthleticPerformance-Consumer/)',
    '[ISSN: proteína e exercício](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0177-8)',
    '[ISSN: segurança e eficácia da creatina](https://jissn.biomedcentral.com/articles/10.1186/s12970-017-0173-z)'
  ]
};

const images = {
  plate: '/uploads/prato-saudavel-emagrecer.jpg',
  calories: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1400',
  protein: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=1400',
  breakfast: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400',
  carbs: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1400',
  gym: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1400',
  strength: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1400',
  home: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1400',
  schedule: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=1400',
  mistake: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1400',
  discipline: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1400',
  mealprep: 'https://images.unsplash.com/photo-1498837167922-ddd27525d352?q=80&w=1400',
  sleep: 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?q=80&w=1400',
  comeback: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=1400',
  goals: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=1400',
  whey: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=1400',
  creatine: 'https://images.unsplash.com/photo-1622484212850-eb596d769edc?q=80&w=1400',
  fruit: 'https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?q=80&w=1400',
  recovery: 'https://images.unsplash.com/photo-1517344884509-a0c97ec11bcc?q=80&w=1400',
  rest: 'https://images.unsplash.com/photo-1540206395-68808572332f?q=80&w=1400'
};

const articles = [
  {
    slug: 'quantas-calorias-comer-por-dia-guia-simples-para-iniciantes',
    title: 'Quantas Calorias Você Deve Comer por Dia? Guia Simples para Iniciantes',
    keyword: 'quantas calorias comer por dia',
    pillar: 'nutricao-fitness',
    sourceKey: 'nutrition',
    image: images.calories,
    alt: 'Mesa com alimentos naturais variados para calcular quantas calorias comer por dia.',
    promise: 'entender calorias sem transformar sua rotina em uma planilha difícil',
    quick: 'Calorias são uma forma de medir energia. Para emagrecer, normalmente é preciso consumir menos energia do que se gasta, mas o melhor ponto de partida é criar um déficit moderado e sustentável.',
    sections: [
      ['Por que calorias importam', 'O peso corporal muda conforme a relação entre energia consumida e energia gasta. Isso não significa que qualidade alimentar seja irrelevante. Uma dieta com legumes, frutas, proteínas e grãos integrais tende a gerar mais saciedade do que uma dieta com ultraprocessados, mesmo com calorias parecidas.'],
      ['Como estimar sua necessidade', 'Aplicativos e calculadoras usam idade, sexo, peso, altura e nível de atividade para estimar o gasto diário. Use o número como referência, não como sentença. Depois observe peso, medidas, fome, energia e desempenho por duas a três semanas.'],
      ['Déficit inteligente', 'Para iniciantes, reduções pequenas costumam funcionar melhor do que cortes extremos. Um prato mais rico em proteína e fibras, junto com menos bebidas calóricas e porções mais organizadas, já pode criar diferença real sem sensação de punição.']
    ],
    steps: ['Estime seu gasto diário em uma calculadora confiável.', 'Registre três a sete dias de alimentação para entender seu padrão.', 'Reduza primeiro calorias líquidas, beliscos e porções repetidas.', 'Mantenha proteína em todas as refeições principais.', 'Revise o resultado a cada duas semanas, não a cada dia.'],
    table: [['Estratégia', 'Vantagem', 'Cuidado'], ['Contar calorias', 'Aumenta clareza sobre porções', 'Pode virar obsessão se usado sem flexibilidade'], ['Método do prato', 'Simples e visual', 'Menos preciso para metas muito específicas'], ['Diário alimentar', 'Revela padrões escondidos', 'Precisa de honestidade e constância']],
    mistakes: ['copiar calorias de outra pessoa', 'cortar demais e perder energia', 'ignorar bebidas, molhos e finais de semana'],
    cta: 'Use este guia junto com o artigo sobre prato saudável para transformar números em refeições reais.'
  },
  {
    slug: 'proteina-no-emagrecimento-quanto-comer-e-quais-alimentos-escolher',
    title: 'Proteína no Emagrecimento: Quanto Comer e Quais Alimentos Escolher',
    keyword: 'proteína para emagrecer',
    pillar: 'nutricao-fitness',
    sourceKey: 'nutrition',
    image: images.protein,
    alt: 'Refeição rica em proteína com vegetais coloridos em prato limpo.',
    promise: 'usar proteína para ter mais saciedade e preservar massa muscular',
    quick: 'Proteína ajuda a controlar a fome e participa da manutenção de músculos. Em emagrecimento, ela deve aparecer em porções distribuídas ao longo do dia, junto com vegetais, carboidratos de qualidade e hidratação.',
    sections: [
      ['O papel da proteína', 'Quando a pessoa reduz calorias, o corpo precisa de estímulo de treino e ingestão adequada de proteína para preservar massa magra. Isso importa porque músculo contribui para força, postura, autonomia e melhor aparência corporal.'],
      ['Quanto comer na prática', 'Pessoas fisicamente ativas costumam se beneficiar de ingestão maior do que sedentários, mas a necessidade varia. Uma forma simples é colocar uma porção de proteína do tamanho da palma da mão em almoço e jantar e incluir opções proteicas em lanches quando necessário.'],
      ['Fontes acessíveis', 'Ovos, frango, peixe, carnes magras, iogurte natural, leite, queijo cottage, feijão, lentilha, grão-de-bico, tofu e soja são boas opções. Não existe obrigação de usar whey se a comida já cobre a necessidade.']
    ],
    steps: ['Escolha uma proteína principal em cada refeição.', 'Combine proteína animal ou vegetal com legumes e salada.', 'Use feijão e lentilha também como aliados de fibras.', 'Planeje lanches proteicos para horários de maior fome.', 'Ajuste com nutricionista se você tem doença renal ou condição clínica.'],
    table: [['Fonte', 'Ponto forte', 'Como usar'], ['Ovos', 'Práticos e baratos', 'Café da manhã ou jantar rápido'], ['Frango', 'Magro e versátil', 'Marmitas e saladas'], ['Lentilha', 'Proteína vegetal e fibras', 'Ensopados e bowls'], ['Iogurte natural', 'Proteína e praticidade', 'Lanche com fruta']],
    mistakes: ['comer proteína só no almoço', 'trocar comida por suplemento sem necessidade', 'esquecer fibras e vegetais'],
    cta: 'Monte sua próxima refeição com proteína, salada e carboidrato na medida.'
  },
  {
    slug: 'cafe-da-manha-fitness-opcoes-praticas-para-ter-mais-energia',
    title: 'Café da Manhã Fitness: 7 Opções Práticas para Ter Mais Energia',
    keyword: 'café da manhã fitness',
    pillar: 'nutricao-fitness',
    sourceKey: 'nutrition',
    image: images.breakfast,
    alt: 'Café da manhã fitness com frutas, aveia e alimentos naturais em mesa clara.',
    promise: 'começar o dia com energia sem receitas complicadas',
    quick: 'Um café da manhã fitness deve combinar proteína, fibras e carboidratos de boa qualidade. Ele não precisa ser obrigatório para todos, mas pode ajudar muito quem sente fome cedo ou treina pela manhã.',
    sections: [
      ['O que torna o café da manhã melhor', 'A primeira refeição funciona melhor quando evita picos rápidos de fome. Para isso, inclua alimentos que exigem mastigação e têm nutrientes: frutas inteiras, ovos, iogurte natural, aveia, pão integral e sementes.'],
      ['Antes do treino', 'Se você treina cedo, escolha algo leve e tolerável. Banana com iogurte, pão com ovo ou aveia com fruta são opções comuns. O ideal é testar o que não pesa no estômago.'],
      ['Sem tempo de manhã', 'Deixe itens semi-prontos: ovos cozidos, frutas lavadas, aveia porcionada ou iogurte separado. O maior inimigo da consistência é decidir tudo com pressa.']
    ],
    steps: ['Defina se você precisa comer cedo ou pode esperar.', 'Escolha uma proteína: ovo, iogurte, queijo, leite ou tofu.', 'Inclua fibra com fruta, aveia ou pão integral.', 'Evite transformar café em sobremesa líquida.', 'Tenha duas opções reservas para dias corridos.'],
    table: [['Opção', 'Boa para', 'Ajuste possível'], ['Ovos com fruta', 'Saciedade', 'Adicionar pão integral'], ['Iogurte com aveia', 'Rapidez', 'Adicionar sementes'], ['Pão integral com queijo', 'Rotina corrida', 'Adicionar tomate'], ['Vitamina de banana', 'Pré-treino', 'Usar leite ou iogurte']],
    mistakes: ['tomar só café adoçado e sentir fome depois', 'usar granola em excesso', 'escolher suco no lugar da fruta inteira'],
    cta: 'Escolha duas opções e repita por uma semana para testar energia e fome.'
  },
  {
    slug: 'carboidrato-a-noite-engorda-entenda-o-que-realmente-importa',
    title: 'Carboidrato à Noite Engorda? Entenda o Que Realmente Importa',
    keyword: 'carboidrato à noite engorda',
    pillar: 'nutricao-fitness',
    sourceKey: 'nutrition',
    image: images.carbs,
    alt: 'Prato com carboidratos integrais e vegetais para jantar equilibrado.',
    promise: 'parar de temer o jantar e ajustar carboidratos com bom senso',
    quick: 'Carboidrato à noite não engorda sozinho. O ganho de peso depende do conjunto da dieta, das calorias totais, da qualidade dos alimentos e da rotina. O horário pode importar para sono e digestão, mas não é vilão isolado.',
    sections: [
      ['O mito do horário', 'Muita gente emagrece ao cortar carboidrato à noite porque também reduz calorias totais. O resultado vem do corte energético, não de uma regra mágica. Um jantar com arroz, feijão, legumes e proteína pode ser melhor do que petiscos sem controle.'],
      ['Quando reduzir faz sentido', 'Se você dorme mal quando come muito tarde ou exagera nas porções à noite, vale ajustar quantidade e horário. Reduzir não significa zerar. Significa escolher uma porção compatível com sua fome e seu gasto.'],
      ['Qualidade primeiro', 'Batata, arroz, feijão, mandioca, frutas e aveia são diferentes de doces, refrigerantes e ultraprocessados. O tipo de carboidrato muda saciedade, fibras e micronutrientes.']
    ],
    steps: ['Observe se sua fome à noite é física ou hábito.', 'Monte metade do prato com vegetais.', 'Inclua proteína para aumentar saciedade.', 'Use uma porção moderada de carboidrato.', 'Evite comer grandes volumes muito perto de deitar se isso piora seu sono.'],
    table: [['Jantar', 'Tende a ajudar', 'Tende a atrapalhar'], ['Arroz, feijão, frango e salada', 'Equilíbrio e saciedade', 'Excesso de óleo e repetição sem fome'], ['Sopa com legumes e carne', 'Volume e conforto', 'Pouca proteína'], ['Lanche caseiro', 'Praticidade', 'Molhos e recheios calóricos demais']],
    mistakes: ['culpar só o horário', 'cortar carboidrato e compensar com gordura', 'jantar pouco e beliscar depois'],
    cta: 'Teste um jantar equilibrado por sete dias antes de decidir cortar um grupo alimentar.'
  },
  {
    slug: 'treino-para-iniciantes-na-academia-como-comecar-com-seguranca',
    title: 'Treino para Iniciantes na Academia: Como Começar com Segurança',
    keyword: 'treino para iniciantes na academia',
    pillar: 'treino-fitness',
    sourceKey: 'training',
    image: images.gym,
    alt: 'Pessoa iniciante em academia treinando com pesos em ambiente limpo.',
    promise: 'entrar na academia com segurança, clareza e menos vergonha',
    quick: 'O melhor treino inicial é simples, repetível e progressivo. Comece com exercícios básicos, carga leve a moderada e foco em aprender movimento antes de buscar intensidade.',
    sections: [
      ['Primeiro objetivo', 'No primeiro mês, o objetivo não é destruir o corpo. É aprender técnica, criar hábito e sair do treino melhor do que entrou. A adaptação inicial prepara articulações, tendões e músculos para evoluir.'],
      ['Frequência realista', 'Duas a três sessões por semana já podem gerar progresso para iniciantes. O CDC recomenda atividade aeróbica semanal e fortalecimento em pelo menos dois dias, mas você pode chegar lá por etapas.'],
      ['Treino de corpo inteiro', 'Para quem está começando, treinar o corpo todo em cada sessão costuma ser eficiente. Agachar, empurrar, puxar, dobrar quadril e carregar são padrões úteis para saúde e estética.']
    ],
    steps: ['Faça 5 a 8 minutos de aquecimento leve.', 'Escolha um exercício para pernas, um para empurrar e um para puxar.', 'Use carga que permita terminar com técnica limpa.', 'Descanse de 60 a 90 segundos entre séries.', 'Anote cargas e repetições para progredir aos poucos.'],
    table: [['Exercício', 'Padrão', 'Opção iniciante'], ['Leg press', 'Pernas', 'Amplitude confortável'], ['Remada máquina', 'Puxar', 'Costas apoiadas'], ['Supino máquina', 'Empurrar', 'Carga leve'], ['Prancha', 'Core', 'Joelhos apoiados']],
    mistakes: ['copiar treino avançado', 'trocar exercícios toda semana', 'usar carga que desmonta a técnica'],
    cta: 'Comece com três treinos simples e evolua antes de complicar.'
  },
  {
    slug: 'musculacao-emagrece-como-usar-o-treino-de-forca-a-seu-favor',
    title: 'Musculação Emagrece? Como Usar o Treino de Força a Seu Favor',
    keyword: 'musculação emagrece',
    pillar: 'treino-fitness',
    sourceKey: 'training',
    image: images.strength,
    alt: 'Treino de musculação com halteres para emagrecimento e força.',
    promise: 'entender como musculação ajuda no emagrecimento além da balança',
    quick: 'Musculação ajuda no emagrecimento porque aumenta gasto energético, preserva massa muscular e melhora composição corporal. O efeito é maior quando o treino vem junto de alimentação adequada e rotina ativa.',
    sections: [
      ['Por que a balança engana', 'Ao começar musculação, algumas pessoas perdem gordura e ganham um pouco de massa magra. A balança pode mudar pouco, mas medidas, roupas e fotos mostram evolução. Por isso, acompanhe mais de um indicador.'],
      ['Força e déficit calórico', 'A dieta cria grande parte do déficit, enquanto a musculação protege o corpo de perder massa muscular. Essa combinação tende a deixar o resultado mais firme e sustentável do que apenas cortar comida.'],
      ['Cardio ainda importa', 'Musculação e cardio não precisam competir. Caminhadas, bicicleta ou corrida leve aumentam gasto calórico e saúde cardiovascular. O melhor plano é aquele que você consegue repetir.']
    ],
    steps: ['Treine força duas a quatro vezes por semana.', 'Priorize exercícios multiarticulares.', 'Progrida carga ou repetições com técnica.', 'Inclua caminhada em dias alternados.', 'Mantenha proteína e sono como parte do plano.'],
    table: [['Método', 'Ajuda em', 'Limitação'], ['Musculação', 'Massa magra e força', 'Gasto por sessão pode variar'], ['Cardio', 'Condicionamento e calorias', 'Não substitui força'], ['Dieta', 'Déficit calórico', 'Sem treino pode perder massa magra']],
    mistakes: ['achar que suor é resultado', 'fazer só aparelhos isolados sem progressão', 'abandonar o treino quando o peso trava'],
    cta: 'Use musculação como base e ajuste dieta para o resultado aparecer.'
  },
  {
    slug: 'treino-em-casa-para-emagrecer-plano-simples-sem-equipamentos',
    title: 'Treino em Casa para Emagrecer: Plano Simples Sem Equipamentos',
    keyword: 'treino em casa para emagrecer',
    pillar: 'treino-fitness',
    sourceKey: 'training',
    image: images.home,
    alt: 'Pessoa fazendo treino em casa sem equipamentos em sala organizada.',
    promise: 'treinar em casa com pouco espaço e sem depender de aparelhos',
    quick: 'Treino em casa pode ajudar no emagrecimento quando combina força, cardio de baixo impacto e progressão. O segredo é controlar intensidade e repetir o plano toda semana.',
    sections: [
      ['O que dá resultado em casa', 'Você precisa de movimentos básicos: agachar, empurrar, puxar com toalha ou mochila, elevar quadril e caminhar ou marchar. Sem equipamentos, a progressão vem por repetições, tempo, amplitude e controle.'],
      ['Baixo impacto', 'Para quem está acima do peso ou tem dor no joelho, saltos não são obrigatórios. Marcha acelerada, polichinelo adaptado, step baixo e agachamento em cadeira podem elevar frequência cardíaca com menos impacto.'],
      ['Plano semanal', 'Três dias por semana já são suficientes para começar. Em dias livres, caminhe ou faça mobilidade. A meta inicial é terminar bem e manter consistência.']
    ],
    steps: ['Aqueça com marcha no lugar por 3 minutos.', 'Faça agachamento na cadeira.', 'Inclua flexão na parede ou bancada.', 'Faça ponte de glúteos no chão.', 'Finalize com caminhada leve ou marcha por 5 minutos.'],
    table: [['Exercício', 'Séries', 'Repetições'], ['Agachamento na cadeira', '2 a 3', '8 a 12'], ['Flexão na parede', '2 a 3', '8 a 12'], ['Ponte de glúteos', '2 a 3', '10 a 15'], ['Marcha acelerada', '3', '1 minuto']],
    mistakes: ['começar com saltos demais', 'não registrar progresso', 'parar por achar que treino curto não conta'],
    cta: 'Faça este treino três vezes na semana e aumente uma variável por vez.'
  },
  {
    slug: 'quantas-vezes-por-semana-devo-treinar-para-ver-resultados',
    title: 'Quantas Vezes por Semana Devo Treinar para Ver Resultados?',
    keyword: 'quantas vezes treinar por semana',
    pillar: 'treino-fitness',
    sourceKey: 'training',
    image: images.schedule,
    alt: 'Agenda de treino semanal com tênis e garrafa de água.',
    promise: 'definir frequência de treino sem exagerar nem desistir',
    quick: 'A maioria dos iniciantes pode começar com 2 a 4 treinos por semana. O ideal depende de objetivo, recuperação, sono, trabalho e experiência. Frequência boa é a que você sustenta.',
    sections: [
      ['O mínimo eficiente', 'Diretrizes de saúde indicam fortalecimento em pelo menos dois dias por semana e atividade aeróbica regular. Para resultados estéticos, três a quatro sessões bem feitas costumam ser um bom alvo.'],
      ['Recuperação conta', 'Treinar todos os dias sem dormir bem, comer pouco e sentir dor persistente pode piorar desempenho. O músculo se adapta entre sessões, não apenas durante o treino.'],
      ['Escolha por fase', 'Iniciantes se beneficiam de treinos mais simples e frequentes o suficiente para aprender técnica. Intermediários podem dividir grupos musculares e aumentar volume com mais cuidado.']
    ],
    steps: ['Comece com três dias alternados.', 'Inclua caminhada em dois dias leves.', 'Mantenha um dia livre para descanso real.', 'Aumente frequência só se estiver recuperando bem.', 'Revise sono, fome e dores antes de adicionar treino.'],
    table: [['Frequência', 'Para quem serve', 'Observação'], ['2x semana', 'Iniciantes ocupados', 'Melhor do que esperar rotina perfeita'], ['3x semana', 'Maioria dos iniciantes', 'Equilíbrio ótimo'], ['4x semana', 'Mais disponibilidade', 'Exige recuperação'], ['5x ou mais', 'Avançados', 'Planejamento cuidadoso']],
    mistakes: ['fazer seis dias na primeira semana', 'confundir dor com qualidade', 'não ter dia de descanso'],
    cta: 'Monte uma semana que você consiga repetir por um mês.'
  },
  {
    slug: 'erros-comuns-na-academia-que-atrasam-seus-resultados',
    title: 'Erros Comuns na Academia que Atrasam Seus Resultados',
    keyword: 'erros na academia',
    pillar: 'treino-fitness',
    sourceKey: 'training',
    image: images.mistake,
    alt: 'Pessoa ajustando halteres na academia para evitar erros de treino.',
    promise: 'corrigir detalhes que fazem você treinar muito e evoluir pouco',
    quick: 'Os erros mais comuns são falta de progressão, técnica ruim, excesso de volume, descanso mal planejado e dieta desalinhada. Resultado vem de treino repetível, mensurável e recuperável.',
    sections: [
      ['Treinar sem plano', 'Entrar na academia e escolher aparelhos aleatórios impede comparação. Você precisa repetir exercícios por algumas semanas para medir carga, repetições, técnica e evolução.'],
      ['Carga sem controle', 'Peso alto com amplitude curta e postura ruim não é progresso real. Carga deve desafiar, mas permitir execução limpa. O músculo não sabe o número no aparelho; ele responde ao estímulo bem aplicado.'],
      ['Ignorar hábitos fora da academia', 'Sono, alimentação, hidratação e estresse influenciam força e recuperação. Uma hora de treino não compensa vinte e três horas caóticas todos os dias.']
    ],
    steps: ['Escolha um treino e mantenha por 6 a 8 semanas.', 'Anote carga, repetições e percepção de esforço.', 'Filme um exercício quando tiver dúvida técnica.', 'Descanse o suficiente entre séries importantes.', 'Ajuste alimentação para seu objetivo.'],
    table: [['Erro', 'Sinal', 'Correção'], ['Trocar treino sempre', 'Sem progresso mensurável', 'Manter base por semanas'], ['Carga exagerada', 'Roubo de movimento', 'Reduzir e controlar'], ['Volume demais', 'Cansaço constante', 'Diminuir séries'], ['Pouca proteína', 'Fome e baixa recuperação', 'Planejar refeições']],
    mistakes: ['copiar influenciador avançado', 'buscar exaustão em toda série', 'ignorar dores articulares persistentes'],
    cta: 'Escolha um erro da lista e corrija já no próximo treino.'
  },
  {
    slug: 'como-criar-disciplina-para-treinar-mesmo-sem-motivacao',
    title: 'Como Criar Disciplina para Treinar Mesmo Sem Motivação',
    keyword: 'disciplina para treinar',
    pillar: 'mentalidade-habitos',
    sourceKey: 'mindset',
    image: images.discipline,
    alt: 'Pessoa amarrando o tênis antes do treino como símbolo de disciplina.',
    promise: 'treinar com consistência mesmo nos dias sem vontade',
    quick: 'Disciplina não é sentir vontade todos os dias. É reduzir fricção, criar gatilhos e ter um plano mínimo para cumprir mesmo em dias difíceis.',
    sections: [
      ['Motivação oscila', 'Motivação costuma ser alta no início e baixa quando a rotina aperta. Por isso, depender dela é frágil. O hábito precisa caber na vida real, com horário, local e treino definido.'],
      ['Plano mínimo viável', 'Em vez de desistir quando não dá para fazer tudo, tenha uma versão curta: 10 minutos de caminhada, duas séries de exercícios ou mobilidade. Isso preserva identidade e continuidade.'],
      ['Ambiente vence força de vontade', 'Roupa separada, garrafa pronta, treino anotado e horário bloqueado removem pequenas decisões. Quanto menos você negocia, mais fácil fica cumprir.']
    ],
    steps: ['Escolha dias fixos de treino.', 'Deixe roupa e tênis prontos na noite anterior.', 'Defina uma versão mínima de 10 minutos.', 'Marque no calendário cada treino feito.', 'Recomece no próximo dia após qualquer falha.'],
    table: [['Barreira', 'Solução simples', 'Por que funciona'], ['Falta de tempo', 'Treino mínimo', 'Evita abandono total'], ['Preguiça', 'Roupa pronta', 'Reduz decisão'], ['Cansaço', 'Intensidade menor', 'Mantém hábito'], ['Esquecimento', 'Alarme fixo', 'Cria gatilho']],
    mistakes: ['esperar vontade aparecer', 'prometer treino perfeito', 'desistir por falhar um dia'],
    cta: 'Crie hoje sua versão mínima de treino e mantenha a sequência viva.'
  },
  {
    slug: 'por-que-voce-desiste-da-dieta-estrategias-para-manter-a-constancia',
    title: 'Por Que Você Desiste da Dieta? 6 Estratégias para Manter a Constância',
    keyword: 'como manter a dieta',
    pillar: 'mentalidade-habitos',
    sourceKey: 'mindset',
    image: images.mealprep,
    alt: 'Marmitas saudáveis organizadas para manter a dieta com constância.',
    promise: 'parar o ciclo de segunda-feira perfeita e desistência no fim de semana',
    quick: 'A dieta falha quando é rígida demais, pouco prática ou desconectada da fome real. Constância nasce de planejamento simples, flexibilidade e refeições que você gosta.',
    sections: [
      ['Restrição extrema cobra preço', 'Cortar tudo que você gosta pode funcionar por poucos dias, mas aumenta chance de episódios de exagero. Um plano sustentável inclui comida de verdade e margem para vida social.'],
      ['Fome mal planejada', 'Pular refeições, comer pouca proteína e evitar carboidratos sem critério pode aumentar fome à noite. Muitas desistências são apenas falta de estrutura, não falta de caráter.'],
      ['Rotina decide', 'Se sua casa só tem opções ultraprocessadas, será difícil escolher diferente cansado. Planejamento alimentar é organizar o ambiente para a decisão saudável ficar fácil.']
    ],
    steps: ['Defina três refeições base para repetir.', 'Compre proteínas e vegetais para a semana.', 'Tenha lanches práticos planejados.', 'Inclua uma margem flexível para eventos.', 'Avalie constância semanal, não perfeição diária.'],
    table: [['Problema', 'Estratégia', 'Exemplo'], ['Fome à noite', 'Mais proteína no almoço', 'Frango, ovos ou lentilha'], ['Sem tempo', 'Marmita base', 'Arroz, feijão e carne'], ['Vontade de doce', 'Porção planejada', 'Iogurte com fruta'], ['Fim de semana', 'Regra 80/20', 'Uma refeição livre, não dois dias livres']],
    mistakes: ['zerar carboidrato', 'não planejar mercado', 'confundir deslize com fracasso'],
    cta: 'Escolha uma refeição base e repita por cinco dias.'
  },
  {
    slug: 'sono-e-emagrecimento-como-dormir-melhor-pode-ajudar-nos-resultados',
    title: 'Sono e Emagrecimento: Como Dormir Melhor Pode Ajudar nos Resultados',
    keyword: 'sono e emagrecimento',
    pillar: 'mentalidade-habitos',
    sourceKey: 'mindset',
    image: images.sleep,
    alt: 'Quarto escuro e organizado para melhorar sono e emagrecimento.',
    promise: 'entender por que dormir bem também faz parte do plano fitness',
    quick: 'Adultos geralmente precisam de pelo menos 7 horas de sono. Dormir pouco pode afetar fome, energia, humor, treino e escolhas alimentares.',
    sections: [
      ['Sono regula comportamento', 'Quando você dorme mal, fica mais difícil treinar, preparar comida e resistir a alimentos muito palatáveis. O problema não é apenas hormonal; é também decisão cansada.'],
      ['Impacto no treino', 'Força, coordenação e disposição caem com noites ruins. Se você insiste em treinar pesado sem recuperação, o risco de dor e queda de performance aumenta.'],
      ['Rotina de sono', 'Horário consistente, luz baixa à noite, quarto fresco e menos cafeína no fim do dia são medidas simples. Não resolvem todos os casos, mas melhoram a base.']
    ],
    steps: ['Defina um horário-alvo para dormir.', 'Desligue telas ou reduza luz 30 minutos antes.', 'Evite cafeína no fim da tarde.', 'Jante sem exagerar no volume perto da cama.', 'Procure ajuda se ronco intenso ou insônia persistirem.'],
    table: [['Hábito', 'Ajuda em', 'Como aplicar'], ['Luz natural cedo', 'Ritmo circadiano', 'Caminhada matinal'], ['Quarto escuro', 'Qualidade do sono', 'Cortina ou máscara'], ['Horário regular', 'Consistência', 'Mesmo no fim de semana'], ['Menos álcool', 'Sono profundo', 'Evitar antes de dormir']],
    mistakes: ['dormir pouco e cortar mais calorias', 'usar treino pesado para compensar cansaço', 'ignorar ronco e sonolência diurna'],
    cta: 'Escolha uma mudança de sono para aplicar esta noite.'
  },
  {
    slug: 'como-voltar-a-rotina-fitness-depois-de-parar-por-muito-tempo',
    title: 'Como Voltar à Rotina Fitness Depois de Parar por Muito Tempo',
    keyword: 'voltar à rotina fitness',
    pillar: 'mentalidade-habitos',
    sourceKey: 'mindset',
    image: images.comeback,
    alt: 'Pessoa caminhando ao ar livre para voltar à rotina fitness aos poucos.',
    promise: 'recomeçar sem culpa, excesso ou lesões por pressa',
    quick: 'Voltar à rotina fitness exige dose menor do que o ego gostaria. Comece com treinos curtos, alimentação simples e metas semanais para reconstruir confiança.',
    sections: [
      ['O corpo destreina, mas reaprende', 'Depois de semanas ou meses parado, força e fôlego caem. Isso é normal. A boa notícia é que a memória de treino facilita a retomada quando você respeita progressão.'],
      ['Culpa atrapalha', 'Tentar compensar tudo na primeira semana é uma armadilha. O objetivo inicial é voltar ao ciclo de comparecer, terminar bem e repetir.'],
      ['Plano de retorno', 'Use duas semanas de readaptação antes de buscar recordes. Treine com margem, caminhe mais e organize refeições básicas.']
    ],
    steps: ['Escolha três dias fixos na semana.', 'Reduza cargas antigas pela metade se necessário.', 'Faça menos séries do que fazia antes.', 'Caminhe em dias alternados.', 'Aumente volume apenas se não houver dor persistente.'],
    table: [['Semana', 'Foco', 'Meta'], ['1', 'Reativar hábito', 'Treinos leves'], ['2', 'Técnica', 'Repetir exercícios'], ['3', 'Progressão', 'Subir um pouco carga'], ['4', 'Consistência', 'Manter rotina completa']],
    mistakes: ['querer compensar meses em dias', 'ignorar dor articular', 'mudar dieta e treino de forma radical ao mesmo tempo'],
    cta: 'Marque os três primeiros treinos de retorno antes de pensar no plano perfeito.'
  },
  {
    slug: 'metas-fitness-realistas-como-definir-objetivos-sem-frustracao',
    title: 'Metas Fitness Realistas: Como Definir Objetivos Sem Frustração',
    keyword: 'metas fitness realistas',
    pillar: 'mentalidade-habitos',
    sourceKey: 'mindset',
    image: images.goals,
    alt: 'Caderno com metas fitness realistas e planejamento semanal.',
    promise: 'transformar desejo em plano acompanhável',
    quick: 'Meta boa é específica, mensurável e ligada a hábitos. Em vez de prometer mudar tudo, defina ações semanais que apontam para o resultado desejado.',
    sections: [
      ['Resultado e processo', 'Perder peso, ganhar massa ou melhorar condicionamento são metas de resultado. Treinar três vezes, caminhar 150 minutos e preparar marmitas são metas de processo. Você controla melhor o processo.'],
      ['Prazo honesto', 'Mudanças sustentáveis levam semanas e meses. Prazos agressivos aumentam frustração e favorecem medidas extremas. Um bom plano deixa espaço para trabalho, família e imprevistos.'],
      ['Métricas úteis', 'Use peso, medidas, fotos, cargas de treino, passos, horas de sono e percepção de energia. Uma métrica isolada pode enganar.']
    ],
    steps: ['Escreva uma meta de resultado.', 'Converta em três hábitos semanais.', 'Defina quando e onde cada hábito acontece.', 'Escolha uma métrica para revisar no domingo.', 'Ajuste a meta se ela não couber na vida real.'],
    table: [['Meta vaga', 'Meta melhor', 'Hábito ligado'], ['Emagrecer', 'Perder 2 kg em 8 semanas', 'Treinar 3x e montar prato saudável'], ['Ter disciplina', 'Treinar seg, qua e sex', 'Roupa pronta'], ['Comer melhor', 'Levar almoço 4x', 'Marmita no domingo']],
    mistakes: ['mirar só na balança', 'definir prazo impossível', 'abandonar tudo ao sair do plano'],
    cta: 'Escreva uma meta de processo para esta semana e deixe visível.'
  },
  {
    slug: 'whey-protein-vale-a-pena-quando-usar-e-como-escolher',
    title: 'Whey Protein Vale a Pena? Quando Usar e Como Escolher',
    keyword: 'whey protein vale a pena',
    pillar: 'suplementacao-recuperacao',
    sourceKey: 'supplements',
    image: images.whey,
    alt: 'Whey protein em pote com colher medidora em bancada limpa.',
    promise: 'decidir se whey faz sentido sem cair em propaganda',
    quick: 'Whey protein é uma fonte prática de proteína. Vale a pena quando ajuda a bater a meta diária, mas não é obrigatório se sua alimentação já fornece proteína suficiente.',
    sections: [
      ['O que é whey', 'Whey é proteína do soro do leite, geralmente usada pela praticidade. Pode ser útil em lanches, pós-treino ou dias corridos, mas continua sendo alimento em pó, não solução mágica.'],
      ['Quando usar', 'Use quando falta proteína na rotina ou quando uma opção rápida evita escolhas piores. Se você já come ovos, carnes, laticínios ou leguminosas suficientes, talvez não precise.'],
      ['Como escolher', 'Observe quantidade de proteína por dose, lista de ingredientes, adoçantes, tolerância digestiva e certificações. Pessoas com alergia ao leite ou restrições específicas precisam de cuidado.']
    ],
    steps: ['Calcule sua proteína diária aproximada.', 'Veja se há lacunas nos lanches.', 'Compare proteína por dose e preço.', 'Teste tolerância com porção menor.', 'Não use suplemento para compensar dieta desorganizada.'],
    table: [['Tipo', 'Característica', 'Para quem pode servir'], ['Concentrado', 'Mais comum e acessível', 'Quem tolera lactose'], ['Isolado', 'Mais proteína por dose', 'Quem busca menor lactose'], ['Vegetal', 'Sem leite', 'Veganos ou alérgicos']],
    mistakes: ['comprar pelo sabor apenas', 'tomar várias doses sem necessidade', 'achar que whey emagrece sozinho'],
    cta: 'Revise sua alimentação antes de decidir comprar o suplemento.'
  },
  {
    slug: 'creatina-para-que-serve-como-tomar-e-quem-pode-usar',
    title: 'Creatina: Para Que Serve, Como Tomar e Quem Pode Usar',
    keyword: 'creatina como tomar',
    pillar: 'suplementacao-recuperacao',
    sourceKey: 'supplements',
    image: images.creatine,
    alt: 'Creatina em pó com copo de água em bancada minimalista.',
    promise: 'usar creatina com segurança e expectativa realista',
    quick: 'Creatina monohidratada é um dos suplementos mais estudados para força e potência. A dose comum de manutenção é simples, mas pessoas com doenças renais ou condições clínicas devem buscar orientação profissional.',
    sections: [
      ['Para que serve', 'A creatina participa do sistema de energia rápida do músculo. Ela tende a ajudar mais em esforços intensos e curtos, como musculação, sprints e esportes de potência.'],
      ['Como tomar', 'Muitas pessoas usam dose diária constante. Fase de saturação não é obrigatória para todos; ela apenas acelera o enchimento dos estoques. O mais importante é tomar com regularidade.'],
      ['O que esperar', 'Você pode notar aumento de força, repetições e peso corporal por retenção de água intramuscular. Isso não é gordura. O suplemento funciona melhor junto com treino progressivo.']
    ],
    steps: ['Escolha creatina monohidratada.', 'Tome diariamente no horário mais fácil de lembrar.', 'Misture com água ou refeição.', 'Beba água ao longo do dia.', 'Converse com profissional se tiver doença renal ou usar medicamentos.'],
    table: [['Dúvida', 'Resposta prática', 'Observação'], ['Precisa ciclar?', 'Geralmente não', 'Regularidade importa mais'], ['Retém líquido?', 'Pode aumentar peso', 'Normalmente dentro do músculo'], ['Dá energia imediata?', 'Não como cafeína', 'Efeito é acumulativo']],
    mistakes: ['esperar efeito no primeiro treino', 'comprar fórmulas caras sem necessidade', 'usar apesar de contraindicação médica'],
    cta: 'Se fizer sentido para você, escolha uma creatina simples e acompanhe seu treino.'
  },
  {
    slug: 'pre-treino-natural-alimentos-que-ajudam-na-energia-sem-exageros',
    title: 'Pré-Treino Natural: Alimentos que Ajudam na Energia Sem Exageros',
    keyword: 'pré-treino natural',
    pillar: 'suplementacao-recuperacao',
    sourceKey: 'supplements',
    image: images.fruit,
    alt: 'Frutas e alimentos naturais usados como pré-treino em mesa clara.',
    promise: 'ter energia para treinar sem depender de estimulantes fortes',
    quick: 'Um bom pré-treino natural combina carboidrato fácil de digerir, um pouco de proteína se houver tempo e hidratação. Cafeína pode ajudar, mas não deve mascarar sono ruim.',
    sections: [
      ['Energia vem de contexto', 'Treino bom depende do que você comeu ao longo do dia, não só 20 minutos antes. Se a dieta inteira está fraca, nenhum pré-treino resolve totalmente.'],
      ['Antes de treinar cedo', 'Banana, pão com geleia, iogurte, aveia pequena ou café com fruta podem funcionar. Quanto mais perto do treino, mais simples deve ser a refeição.'],
      ['Cafeína com cautela', 'Café pode melhorar disposição em algumas pessoas, mas exagero causa ansiedade, taquicardia e piora do sono. Evite usar estimulante para compensar rotina ruim.']
    ],
    steps: ['Veja quanto tempo falta para o treino.', 'Se faltar menos de 60 minutos, escolha algo leve.', 'Inclua água antes e durante.', 'Teste alimentos em treinos comuns, não em dias importantes.', 'Evite gordura e fibras em excesso muito perto do treino se isso pesa.'],
    table: [['Tempo antes', 'Opção', 'Por que funciona'], ['30 min', 'Banana ou fruta', 'Digestão simples'], ['60 min', 'Pão com ovo', 'Energia e proteína'], ['90 min', 'Aveia com iogurte', 'Mais sustância'], ['Qualquer horário', 'Água', 'Hidratação básica']],
    mistakes: ['treinar em jejum forçado sem tolerar', 'tomar estimulante tarde da noite', 'comer pesado e culpar o treino'],
    cta: 'Teste duas opções e escolha a que melhora seu treino sem desconforto.'
  },
  {
    slug: 'dor-muscular-pos-treino-o-que-e-normal-e-como-recuperar-melhor',
    title: 'Dor Muscular Pós-Treino: O Que é Normal e Como Recuperar Melhor',
    keyword: 'dor muscular pós treino',
    pillar: 'suplementacao-recuperacao',
    sourceKey: 'training',
    image: images.recovery,
    alt: 'Pessoa fazendo recuperação muscular com alongamento leve após treino.',
    promise: 'diferenciar adaptação normal de sinal de exagero',
    quick: 'Dor muscular tardia pode acontecer após treino novo ou mais intenso. Ela deve melhorar em poucos dias. Dor forte, articular, com inchaço importante ou perda de função merece atenção.',
    sections: [
      ['Dor não é troféu', 'Sentir dor não prova que o treino foi bom. Progresso vem de estímulo adequado e recuperação. Se toda sessão deixa você destruído, talvez o volume esteja alto demais.'],
      ['O que ajuda', 'Sono, alimentação suficiente, hidratação, caminhada leve e progressão gradual são melhores do que buscar soluções milagrosas. Alongamento leve pode aliviar, mas não apaga exageros.'],
      ['Quando se preocupar', 'Dor pontuda em articulação, inchaço, hematoma, perda de força incomum ou dor que piora por vários dias pedem avaliação. Não force o mesmo músculo intensamente se ele ainda não recuperou.']
    ],
    steps: ['Reduza intensidade no treino seguinte se a dor estiver alta.', 'Faça caminhada leve para aumentar circulação.', 'Priorize sono de qualidade.', 'Coma proteína e carboidrato adequados.', 'Aumente carga semanal aos poucos.'],
    table: [['Sintoma', 'Provável cenário', 'Conduta'], ['Dor muscular difusa', 'Adaptação', 'Treino leve ou descanso'], ['Dor articular pontuda', 'Possível irritação', 'Reduzir e avaliar'], ['Inchaço importante', 'Sinal de alerta', 'Procurar profissional'], ['Melhora em 48-72h', 'Recuperação normal', 'Retomar progressão']],
    mistakes: ['treinar pesado o músculo muito dolorido', 'tomar remédio para mascarar carga ruim', 'aumentar volume rápido demais'],
    cta: 'Na próxima semana, progrida menos e observe se a recuperação melhora.'
  },
  {
    slug: 'descanso-tambem-da-resultado-como-a-recuperacao-melhora-seu-treino',
    title: 'Descanso Também Dá Resultado: Como a Recuperação Melhora Seu Treino',
    keyword: 'recuperação muscular',
    pillar: 'suplementacao-recuperacao',
    sourceKey: 'mindset',
    image: images.rest,
    alt: 'Pessoa descansando após treino para melhorar recuperação muscular.',
    promise: 'entender descanso como parte ativa do progresso',
    quick: 'Recuperação muscular depende de sono, alimentação, hidratação, intervalo entre treinos e controle de estresse. Descansar bem permite treinar melhor, não significa falta de disciplina.',
    sections: [
      ['Adaptação acontece depois', 'O treino cria estímulo; a recuperação permite adaptação. Se você acumula fadiga sem dar tempo ao corpo, a performance cai e a chance de dor aumenta.'],
      ['Descanso ativo', 'Nem todo dia leve precisa ser sofá. Caminhadas, mobilidade e alongamentos suaves podem ajudar sem competir com o treino pesado. A chave é sair melhor, não mais cansado.'],
      ['Sinais de recuperação ruim', 'Sono pior, irritação, queda de carga, dores persistentes e falta de vontade constante podem indicar excesso. Às vezes, o melhor avanço é reduzir uma semana.']
    ],
    steps: ['Durma o máximo possível dentro de rotina regular.', 'Tenha pelo menos um dia leve na semana.', 'Alterne grupos musculares ou intensidades.', 'Coma proteína e calorias compatíveis com a meta.', 'Faça semana mais leve quando desempenho cair por muitos treinos.'],
    table: [['Pilar', 'Como ajuda', 'Ação simples'], ['Sono', 'Reparo e energia', 'Horário regular'], ['Alimentação', 'Substrato para adaptação', 'Proteína diária'], ['Hidratação', 'Função muscular', 'Água ao longo do dia'], ['Carga planejada', 'Evita excesso', 'Progressão gradual']],
    mistakes: ['achar que descanso atrasa resultado', 'treinar pesado todo dia', 'não adaptar treino em semanas estressantes'],
    cta: 'Planeje seu próximo dia leve com a mesma seriedade do treino forte.'
  }
];

const featuredSlugs = new Set([
  'como-montar-um-prato-saudavel-para-emagrecer-sem-passar-fome',
  'treino-para-iniciantes-na-academia-como-comecar-com-seguranca',
  'creatina-para-que-serve-como-tomar-e-quem-pode-usar'
]);

function buildContent(article) {
  const sourceList = sources[article.sourceKey].map(item => `- ${item}`).join('\n');
  const sectionText = article.sections.map(([title, body]) => `## ${title}\n\n${body}`).join('\n\n');
  const steps = article.steps.map((step, index) => `${index + 1}. **${step.split('.')[0]}.**${step.includes('.') ? step.slice(step.indexOf('.') + 1) : ''}`).join('\n\n');
  const table = ['|' + article.table[0].join('|') + '|', '|' + article.table[0].map(() => '---').join('|') + '|', ...article.table.slice(1).map(row => '|' + row.join('|') + '|')].join('\n');
  const mistakes = article.mistakes.map(item => `- ${item}.`).join('\n');

  return `Se você já pesquisou por **${article.keyword}**, provavelmente encontrou respostas extremas demais: de um lado, promessas rápidas; do outro, explicações tão técnicas que parecem feitas para profissionais. A verdade costuma estar no meio. Dá para evoluir com método, sem transformar saúde em sofrimento.

Este artigo foi escrito para ajudar você a ${article.promise}. O foco é prático: entender o conceito, aplicar no dia a dia e evitar erros comuns que atrasam resultados. Use como guia educativo, não como substituto de acompanhamento médico, nutricional ou de educação física quando houver dor, doença, uso de medicamentos ou histórico clínico importante.

## Resumo rápido

${article.quick}

O ponto central é consistência. Um plano simples, repetido por semanas, costuma vencer estratégias agressivas que só duram alguns dias.

${sectionText}

## Passo a passo prático

${steps}

## Comparativo rápido

${table}

## Erros comuns que você deve evitar

${mistakes}

Além desses erros, cuidado com qualquer promessa de resultado garantido em poucos dias. Corpo humano responde a sono, alimentação, treino, estresse, genética, idade e rotina. Por isso, o melhor plano é aquele que melhora sua vida em vez de competir com ela.

## Como saber se está funcionando?

Acompanhe sinais objetivos e subjetivos. Peso, medidas, cargas no treino e fotos ajudam, mas fome, energia, sono, humor e adesão também importam. Se o plano só funciona quando sua rotina está perfeita, ele provavelmente precisa ser simplificado.

Uma boa revisão semanal inclui três perguntas: consegui repetir o básico? minha energia ficou aceitável? estou mais perto do objetivo sem piorar minha relação com comida, treino ou descanso? Se a resposta for não, ajuste a dose antes de desistir.

## Plano simples de 7 dias

Use os próximos sete dias como teste, não como sentença. No primeiro dia, escolha uma ação pequena ligada ao tema do artigo. No segundo e terceiro dias, repita a mesma ação para reduzir a necessidade de decidir tudo de novo. No quarto dia, observe o que atrapalhou: falta de tempo, fome, cansaço, compras, ambiente ou excesso de expectativa.

No quinto e sexto dias, ajuste apenas uma variável. Pode ser diminuir a duração do treino, deixar uma refeição pré-planejada, dormir 20 minutos mais cedo ou trocar uma opção pouco prática por outra mais simples. No sétimo dia, revise o que foi sustentável. A meta não é provar força de vontade; é descobrir o formato que você consegue repetir.

## Checklist antes de avançar

- O básico foi repetido na maior parte dos dias.
- A estratégia não piorou seu sono, humor ou relação com comida.
- Você sabe qual será o próximo passo pequeno.
- O plano cabe na sua rotina comum, não apenas em uma semana perfeita.

## Quando procurar orientação profissional

Procure um médico, nutricionista ou profissional de educação física se você tem doença crônica, dor persistente, tontura, histórico de transtorno alimentar, gestação, uso de medicamentos ou qualquer sintoma que piore com dieta ou exercício. Conteúdo educativo ajuda a organizar ideias, mas não substitui avaliação individual.

## Conclusão

${article.title} não precisa ser um tema complicado. Comece pelo básico, aplique por tempo suficiente e ajuste com base em resposta real do corpo. Resultado sustentável vem da soma de pequenas decisões bem repetidas.

**Próximo passo:** ${article.cta}

## Fontes e referências

${sourceList}
`;
}

const insertArticle = db.prepare(`
  INSERT INTO articles (
    id, slug, title_pt, content_pt, title_en, content_en, cover_image, cover_alt, category_id, is_featured, status, created_at
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(slug) DO UPDATE SET
    title_pt = excluded.title_pt,
    content_pt = excluded.content_pt,
    cover_image = excluded.cover_image,
    cover_alt = excluded.cover_alt,
    category_id = excluded.category_id,
    is_featured = excluded.is_featured,
    status = excluded.status
`);

const firstArticleId = db.prepare('SELECT id FROM articles WHERE slug = ?').get('como-montar-um-prato-saudavel-para-emagrecer-sem-passar-fome')?.id;
db.prepare('UPDATE articles SET is_featured = 0').run();
if (firstArticleId) {
  db.prepare('UPDATE articles SET category_id = ?, status = ?, is_featured = ? WHERE id = ?').run(
    categoryBySlug.get('nutricao-fitness'),
    'published',
    featuredSlugs.has('como-montar-um-prato-saudavel-para-emagrecer-sem-passar-fome') ? 1 : 0,
    firstArticleId
  );
}

articles.forEach((article, index) => {
  const existing = db.prepare('SELECT id FROM articles WHERE slug = ?').get(article.slug);
  const id = existing?.id || randomUUID();
  const date = new Date(Date.UTC(2026, 4, 4 - Math.floor(index / 3), 12, 0, 0)).toISOString().slice(0, 19).replace('T', ' ');
  insertArticle.run(
    id,
    article.slug,
    article.title,
    buildContent(article),
    '',
    '',
    article.image,
    article.alt,
    categoryBySlug.get(article.pillar),
    featuredSlugs.has(article.slug) ? 1 : 0,
    'published',
    date
  );
});

console.log(`Plano de conteúdo inserido/atualizado: ${articles.length + (firstArticleId ? 1 : 0)} artigos nos 4 pilares.`);

import type { ArticleBlock } from "./content-types";

type SupplementSeed = {
  topic: string;
  intent: string;
  practical: string;
  checklist: string[];
  pitfalls: string[];
  support: string;
  faqs: Array<{ q: string; a: string }>;
};

export const supplementalContentUpdatedAt = "2026-05-11";

const supplements: Record<string, SupplementSeed> = {
  "ansiedade-para-ir-a-academia": {
    topic: "Ansiedade para ir à academia",
    intent: "ajudar quem sente vergonha, medo de julgamento ou insegurança para começar a treinar com mais calma",
    practical:
      "O objetivo não é virar uma pessoa confiante da noite para o dia, e sim reduzir o tamanho do primeiro passo. Em vez de imaginar um treino perfeito, pense em uma visita curta, com poucos exercícios conhecidos e um horário mais tranquilo. A repetição de experiências pequenas e previsíveis costuma diminuir a sensação de ameaça.",
    checklist: [
      "Escolha três exercícios simples antes de sair de casa.",
      "Vá em horários menos cheios nas primeiras semanas.",
      "Leve uma anotação no celular para não depender da memória.",
      "Combine a meta mínima: entrar, aquecer e fazer uma série já conta.",
      "Peça orientação profissional se você não sabe ajustar máquinas ou cargas.",
    ],
    pitfalls: [
      "Comparar seu início com o treino de pessoas experientes.",
      "Tentar compensar meses parado com um treino longo demais.",
      "Evitar pedir ajuda por medo de parecer iniciante.",
      "Usar dor ou falta de ar intensa como se fossem sinais normais de esforço.",
    ],
    support:
      "Se a ansiedade impede você de sair de casa, causa crises frequentes ou vem acompanhada de sintomas físicos intensos, vale buscar apoio psicológico ou médico. Treino pode ajudar na rotina, mas não substitui cuidado em saúde mental.",
    faqs: [
      {
        q: "É normal ter vergonha de treinar no começo?",
        a: "Sim. A maioria das pessoas fica mais preocupada com o próprio treino do que observando iniciantes. Começar com um plano curto reduz a exposição e ajuda o cérebro a perceber que o ambiente é mais seguro do que parecia.",
      },
      {
        q: "O que fazer se eu não souber usar os aparelhos?",
        a: "Peça uma orientação inicial, escolha máquinas mais simples e anote ajustes de banco, carga e posição. Aprender a regular os equipamentos faz parte do processo e evita compensações que aumentam risco de dor.",
      },
      {
        q: "Treinar em casa antes ajuda?",
        a: "Ajuda quando o objetivo é ganhar familiaridade com movimentos básicos, como agachar, empurrar, puxar e caminhar. Depois, a academia pode entrar como continuação, não como um salto assustador.",
      },
    ],
  },
  "cafe-da-manha-fitness-opcoes-praticas-para-ter-mais-energia": {
    topic: "Café da manhã fitness",
    intent: "montar uma primeira refeição prática, saciante e coerente com treino, trabalho e rotina corrida",
    practical:
      "Um bom café da manhã não precisa ser grande nem cheio de ingredientes caros. Ele deve combinar proteína, fibras e alguma fonte de energia de digestão adequada ao seu horário. Quem treina cedo pode preferir algo leve antes e uma refeição mais completa depois; quem sente muita fome de manhã costuma se beneficiar de ovos, iogurte, frutas e aveia.",
    checklist: [
      "Inclua uma fonte de proteína, como ovos, iogurte natural, leite, queijo, tofu ou whey quando fizer sentido.",
      "Adicione fibra com fruta, aveia, chia, pão integral ou sementes.",
      "Evite começar o dia só com café adoçado se isso gera fome forte depois.",
      "Prepare uma opção de emergência para dias corridos.",
      "Observe energia, fome e digestão por uma semana antes de trocar tudo.",
    ],
    pitfalls: [
      "Copiar cardápios de atleta sem considerar sua rotina.",
      "Cortar carboidrato e ficar sem energia para treinar.",
      "Transformar vitaminas em bebidas muito calóricas sem perceber.",
      "Chamar qualquer alimento de fitness só porque tem embalagem bonita.",
    ],
    support:
      "Pessoas com diabetes, refluxo importante, compulsão alimentar ou uso de medicamentos devem ajustar horários e composição com profissional de saúde. A refeição ideal depende do contexto, não apenas da lista de alimentos.",
    faqs: [
      {
        q: "Preciso tomar café da manhã para emagrecer?",
        a: "Não obrigatoriamente. O que mais importa é o conjunto do dia. Porém, para muitas pessoas, uma refeição matinal com proteína e fibras reduz beliscos e melhora a organização alimentar.",
      },
      {
        q: "Banana com aveia antes do treino é suficiente?",
        a: "Pode ser suficiente para treinos leves ou moderados. Para treinos longos ou intensos, talvez seja necessário ajustar quantidade, proteína e hidratação.",
      },
      {
        q: "Pão pode entrar em um café da manhã fitness?",
        a: "Pode. O problema raramente é o pão isolado, mas a combinação e a quantidade. Pão com ovos, queijo branco ou pasta de amendoim em porção adequada pode ser uma opção prática.",
      },
    ],
  },
  "carboidrato-a-noite-engorda-entenda-o-que-realmente-importa": {
    topic: "Carboidrato à noite",
    intent: "explicar por que o horário não engorda sozinho e como organizar a última refeição sem exageros",
    practical:
      "Carboidrato à noite não vira gordura automaticamente. O ganho ou perda de peso depende do balanço energético e da consistência da rotina. O que costuma atrapalhar é chegar à noite com muita fome, comer sem atenção ou combinar grandes porções de carboidrato, gordura e sobremesa todos os dias.",
    checklist: [
      "Avalie o total do dia antes de culpar apenas o jantar.",
      "Monte o prato com legumes, proteína e uma porção medida de carboidrato.",
      "Prefira arroz, batata, mandioca, feijão, aveia ou pão em porções coerentes.",
      "Evite jantar tarde demais se isso piora sono ou refluxo.",
      "Planeje lanche da tarde para não chegar faminto à noite.",
    ],
    pitfalls: [
      "Cortar carboidrato e compensar com excesso de gordura.",
      "Confundir retenção de líquido com ganho de gordura.",
      "Beliscar enquanto cozinha e depois contar só o prato.",
      "Usar regras rígidas que levam a episódios de exagero no fim de semana.",
    ],
    support:
      "Se há refluxo, diabetes, compulsão alimentar ou alteração importante de sono, o ajuste do jantar precisa ser mais individualizado. Nesses casos, acompanhamento nutricional ajuda mais do que regras genéricas.",
    faqs: [
      {
        q: "Comer arroz no jantar atrapalha emagrecimento?",
        a: "Não necessariamente. Arroz pode fazer parte do jantar se a porção estiver alinhada ao seu gasto, fome e objetivo. Combinar com feijão, proteína e salada tende a melhorar saciedade.",
      },
      {
        q: "É melhor dormir com fome?",
        a: "Não. Dormir com fome pode piorar sono e aumentar chance de exageros no dia seguinte. O ideal é ajustar quantidade e qualidade da refeição, não transformar fome em estratégia.",
      },
      {
        q: "Carboidrato à noite prejudica o sono?",
        a: "Depende da pessoa, do volume e do horário. Refeições muito pesadas podem atrapalhar, mas uma porção moderada de carboidrato pode até deixar o jantar mais confortável.",
      },
    ],
  },
  "como-criar-disciplina-para-treinar-mesmo-sem-motivacao": {
    topic: "Disciplina para treinar",
    intent: "transformar treino em rotina previsível mesmo nos dias sem vontade",
    practical:
      "Disciplina não é acordar sempre animado. É reduzir o número de decisões até o treino acontecer. Roupa separada, horário definido, treino escrito e uma meta mínima diminuem o atrito. Nos dias ruins, manter o ritual com menos volume vale mais do que abandonar tudo esperando motivação voltar.",
    checklist: [
      "Defina dias e horários fixos, como se fossem compromissos.",
      "Separe roupa, garrafa e fone na noite anterior.",
      "Use uma ficha simples, com início e fim claros.",
      "Tenha uma versão curta para dias corridos.",
      "Registre presença, carga ou repetição para enxergar progresso.",
    ],
    pitfalls: [
      "Depender de motivação alta todos os dias.",
      "Criar treinos longos demais para sua agenda real.",
      "Recomeçar sempre do zero depois de uma falta.",
      "Confundir disciplina com punição corporal.",
    ],
    support:
      "Se a falta de energia vem junto com tristeza persistente, alterações de sono, dor frequente ou cansaço extremo, investigue causas além da disciplina. Corpo e mente precisam de recuperação para sustentar constância.",
    faqs: [
      {
        q: "Quantos dias preciso treinar para criar hábito?",
        a: "Não existe número mágico. O hábito surge quando o comportamento fica repetível no seu contexto. Duas ou três sessões semanais bem sustentadas costumam funcionar melhor do que uma promessa diária irreal.",
      },
      {
        q: "Treino curto conta?",
        a: "Conta. Um treino de 20 a 30 minutos pode manter o vínculo com a rotina e gerar resultado quando é bem planejado. O pior treino é aquele que nunca acontece.",
      },
      {
        q: "Como voltar depois de faltar uma semana?",
        a: "Volte com volume menor e foco em presença. Evite compensar faltas com excesso, porque isso aumenta dor, frustração e nova interrupção.",
      },
    ],
  },
  "como-voltar-a-rotina-fitness-depois-de-parar-por-muito-tempo": {
    topic: "Voltar à rotina fitness",
    intent: "retomar treino e alimentação sem exagerar no começo",
    practical:
      "Depois de uma pausa longa, o corpo não volta exatamente do ponto onde parou. Força, fôlego, mobilidade e tolerância à dor muscular precisam de readaptação. O melhor retorno combina metas pequenas, cargas conservadoras e uma rotina alimentar simples, sem tentar consertar meses em uma semana.",
    checklist: [
      "Comece com duas ou três sessões semanais.",
      "Use cargas mais leves do que as antigas nas primeiras semanas.",
      "Priorize técnica, amplitude confortável e regularidade.",
      "Inclua caminhadas se o condicionamento caiu muito.",
      "Organize sono e refeições básicas antes de buscar estratégias avançadas.",
    ],
    pitfalls: [
      "Treinar pesado no primeiro dia para provar que ainda consegue.",
      "Comparar seu retorno com fotos ou marcas antigas.",
      "Mudar treino, dieta e rotina inteira ao mesmo tempo.",
      "Ignorar dor articular persistente.",
    ],
    support:
      "Se a pausa aconteceu por lesão, cirurgia, gravidez, doença ou dor recorrente, procure liberação e orientação profissional. A volta certa é aquela que respeita o motivo da parada.",
    faqs: [
      {
        q: "Quanto tempo demora para recuperar condicionamento?",
        a: "Depende do tempo parado e da rotina anterior. Muitas pessoas percebem melhora em poucas semanas, mas recuperar marcas antigas pode levar meses. A progressão precisa ser gradual.",
      },
      {
        q: "Posso treinar com dor muscular?",
        a: "Dor muscular leve pode ser normal no retorno, mas dor forte, articular ou que altera movimento pede redução de carga e avaliação.",
      },
      {
        q: "É melhor voltar com musculação ou cardio?",
        a: "Os dois podem entrar. Musculação ajuda força e massa magra; cardio melhora fôlego. O ideal é combinar em doses pequenas e progressivas.",
      },
    ],
  },
  "creatina-para-que-serve-como-tomar-e-quem-pode-usar": {
    topic: "Creatina",
    intent: "explicar uso, dose e expectativas realistas sobre suplementação",
    practical:
      "Creatina é um dos suplementos mais estudados para desempenho em exercícios de alta intensidade e força. Ela não substitui treino, alimentação e sono, mas pode ajudar na disponibilidade de energia para séries, tiros e esforços repetidos. O efeito costuma aparecer com uso diário e constância, não como estimulante imediato.",
    checklist: [
      "Use todos os dias se a creatina fizer sentido para seu objetivo.",
      "Misture em água, suco ou refeição, conforme tolerância.",
      "Mantenha hidratação adequada ao longo do dia.",
      "Não espere efeito de pré-treino logo após tomar.",
      "Escolha produto simples, com creatina monohidratada e boa procedência.",
    ],
    pitfalls: [
      "Tomar doses muito altas achando que acelera resultado.",
      "Confundir aumento de peso por água intramuscular com gordura.",
      "Comprar blends caros sem necessidade.",
      "Usar suplemento para compensar treino inconsistente.",
    ],
    support:
      "Pessoas com doença renal, uso de medicamentos contínuos, gestação ou condições clínicas devem conversar com profissional de saúde antes de suplementar. Segurança depende do contexto individual.",
    faqs: [
      {
        q: "Creatina engorda?",
        a: "Ela pode aumentar peso na balança por maior retenção de água dentro do músculo, mas isso não é o mesmo que ganho de gordura.",
      },
      {
        q: "Precisa fazer fase de saturação?",
        a: "Não é obrigatório. Doses diárias menores também elevam os estoques com o tempo. A melhor estratégia é a que você consegue manter com segurança.",
      },
      {
        q: "Creatina serve para iniciantes?",
        a: "Pode servir, mas iniciantes geralmente têm mais resultado ajustando treino, técnica, alimentação e sono. O suplemento é complemento, não base do progresso.",
      },
    ],
  },
  "descanso-tambem-da-resultado-como-a-recuperacao-melhora-seu-treino": {
    topic: "Descanso e recuperação",
    intent: "mostrar como recuperação melhora resultado e reduz risco de estagnação",
    practical:
      "O treino dá o estímulo; o descanso permite adaptação. Sem recuperação suficiente, força, coordenação, sono e disposição podem cair, mesmo com muito esforço. Descansar não é falta de disciplina: é parte do plano para continuar progredindo.",
    checklist: [
      "Durma em horário regular sempre que possível.",
      "Distribua treinos pesados e leves ao longo da semana.",
      "Evite treinar o mesmo grupo muscular pesado todos os dias.",
      "Coma proteína e energia suficiente para reparar tecidos.",
      "Use caminhadas leves e mobilidade como recuperação ativa.",
    ],
    pitfalls: [
      "Achar que mais treino sempre gera mais resultado.",
      "Ignorar queda persistente de desempenho.",
      "Dormir pouco e tentar compensar com cafeína.",
      "Voltar pesado mesmo com dor articular.",
    ],
    support:
      "Cansaço extremo, insônia, irritabilidade, dor persistente e queda de rendimento por semanas podem indicar excesso de carga, estresse ou problema de saúde. Ajuste o treino e procure avaliação se o quadro não melhora.",
    faqs: [
      {
        q: "Preciso descansar quantos dias por semana?",
        a: "Depende do treino e da recuperação. Muitas pessoas evoluem bem com um ou dois dias sem treino intenso, além de alternância entre grupos musculares.",
      },
      {
        q: "Caminhada em dia de descanso atrapalha?",
        a: "Geralmente não. Caminhada leve pode ajudar circulação, humor e recuperação, desde que não vire outro treino exaustivo.",
      },
      {
        q: "Dor muscular significa que o treino funcionou?",
        a: "Não necessariamente. Dor pode aparecer após estímulos novos, mas resultado depende de progressão, técnica, alimentação e recuperação, não de sofrer mais.",
      },
    ],
  },
};

const quickSeeds: Record<string, SupplementSeed> = {
  "dor-muscular-pos-treino-o-que-e-normal-e-como-recuperar-melhor": {
    topic: "Dor muscular pós-treino",
    intent: "diferenciar desconforto esperado de sinais de alerta",
    practical: "Dor muscular tardia costuma aparecer após estímulo novo, aumento de volume ou exercícios excêntricos. Ela deve reduzir com movimento leve, sono e alimentação adequada. Dor pontual, articular, com inchaço importante ou perda de força não deve ser tratada como adaptação normal.",
    checklist: ["Faça aquecimento progressivo.", "Aumente carga aos poucos.", "Use caminhada leve para reduzir rigidez.", "Priorize proteína, água e sono.", "Reduza volume se a dor atrapalha movimentos básicos."],
    pitfalls: ["Treinar pesado em cima de dor intensa.", "Alongar agressivamente para tentar acelerar recuperação.", "Ignorar dor em articulação.", "Mudar todos os exercícios ao mesmo tempo."],
    support: "Procure avaliação se houver dor aguda, hematoma, inchaço, formigamento, febre, urina escura ou limitação importante. Esses sinais não combinam com dor muscular comum.",
    faqs: [
      { q: "Posso treinar dolorido?", a: "Pode, se a dor for leve e não alterar técnica. Prefira carga menor ou outro grupo muscular." },
      { q: "Dor forte é sinal de treino bom?", a: "Não. Dor forte pode indicar excesso. O progresso vem de consistência, não de incapacidade no dia seguinte." },
      { q: "Massagem ajuda?", a: "Pode aliviar sensação de rigidez, mas não substitui progressão adequada, sono e nutrição." },
    ],
  },
  "erros-comuns-na-academia-que-atrasam-seus-resultados": {
    topic: "Erros comuns na academia",
    intent: "identificar falhas simples que reduzem resultado e aumentam risco de dor",
    practical: "A maioria dos erros não vem de preguiça, mas de falta de método: trocar treino toda semana, usar carga sem técnica, pular aquecimento ou não registrar progresso. Corrigir o básico costuma gerar mais resultado do que buscar exercícios secretos.",
    checklist: ["Mantenha uma ficha por algumas semanas.", "Registre cargas e repetições.", "Aqueça antes de séries pesadas.", "Controle a descida dos movimentos.", "Descanse o suficiente entre séries difíceis."],
    pitfalls: ["Copiar treino aleatório da internet.", "Fazer todas as séries até falhar.", "Usar amplitude curta sem motivo.", "Não ajustar alimentação ao objetivo."],
    support: "Se você sente dor recorrente ou não sabe executar movimentos básicos, vale pedir correção presencial. Técnica bem aprendida economiza meses de tentativa e erro.",
    faqs: [
      { q: "Preciso trocar de treino todo mês?", a: "Não obrigatoriamente. Manter exercícios por tempo suficiente ajuda a medir progresso." },
      { q: "Carga alta é sempre melhor?", a: "Não. Carga útil é aquela que desafia sem destruir técnica." },
      { q: "Cardio atrapalha musculação?", a: "Em dose adequada, não. O problema é excesso mal distribuído, sem recuperação e alimentação." },
    ],
  },
  "metas-fitness-realistas-como-definir-objetivos-sem-frustracao": {
    topic: "Metas fitness realistas",
    intent: "definir objetivos mensuráveis sem cair em promessas impossíveis",
    practical: "Uma meta boa orienta comportamento, não apenas desejo. Em vez de buscar transformação extrema, defina ações semanais: treinar três vezes, caminhar quatro dias, preparar refeições e dormir melhor. Resultado físico vem como consequência de metas executáveis.",
    checklist: ["Escolha uma meta principal por fase.", "Defina indicadores de processo.", "Use prazos de 4 a 8 semanas.", "Acompanhe medidas além do peso.", "Revise a meta sem se punir."],
    pitfalls: ["Querer perder gordura e ganhar muito músculo ao mesmo tempo sem planejamento.", "Usar fotos irreais como referência.", "Mudar tudo após um dia ruim.", "Medir progresso só pela balança."],
    support: "Frustração constante pode indicar meta incompatível com rotina, sono, orçamento ou saúde. Ajustar o plano é sinal de inteligência, não fracasso.",
    faqs: [
      { q: "Quanto peso é realista perder por semana?", a: "Varia, mas perdas graduais tendem a ser mais sustentáveis do que cortes extremos." },
      { q: "Como saber se estou evoluindo?", a: "Observe força, disposição, medidas, roupas, fotos e constância, não apenas peso diário." },
      { q: "Posso ter metas estéticas?", a: "Pode, desde que elas não apaguem saúde, prazer e rotina possível." },
    ],
  },
  "musculacao-emagrece-como-usar-o-treino-de-forca-a-seu-favor": {
    topic: "Musculação para emagrecimento",
    intent: "usar treino de força para preservar massa magra e melhorar composição corporal",
    practical: "Musculação não queima calorias apenas durante o treino. Ela ajuda a preservar massa muscular durante déficit calórico, melhora força e favorece um corpo mais funcional. Para emagrecer, precisa caminhar junto com alimentação, sono e atividade diária.",
    checklist: ["Treine grandes grupos musculares.", "Progrida carga ou repetições aos poucos.", "Combine força com caminhada ou cardio.", "Consuma proteína suficiente.", "Evite transformar cada treino em exaustão máxima."],
    pitfalls: ["Abandonar musculação para fazer só cardio.", "Usar treino leve demais sem progressão.", "Comer muito mais porque treinou.", "Não descansar entre sessões pesadas."],
    support: "Pessoas com dor, hipertensão, lesões ou muito tempo sedentárias devem começar com orientação. O treino de força é adaptável, mas precisa respeitar limites iniciais.",
    faqs: [
      { q: "Musculação emagrece sozinha?", a: "Ajuda, mas emagrecimento depende principalmente de balanço energético e constância." },
      { q: "Preciso fazer cardio também?", a: "Não é obrigatório, mas ajuda saúde cardiovascular e gasto calórico semanal." },
      { q: "Vou ficar muito musculoso sem querer?", a: "Não. Ganhar grande volume muscular exige anos de treino, dieta e progressão específica." },
    ],
  },
  "por-que-voce-desiste-da-dieta-estrategias-para-manter-a-constancia": {
    topic: "Constância na dieta",
    intent: "evitar ciclos de restrição, exagero e culpa",
    practical: "Muita gente desiste porque começa com regras impossíveis. Uma dieta sustentável precisa incluir comida de verdade, flexibilidade e margem para vida social. O plano deve reduzir decisões difíceis, não criar uma prova diária de força de vontade.",
    checklist: ["Planeje refeições principais antes de lanches.", "Inclua alimentos que você gosta em porções conscientes.", "Tenha opções rápidas para dias corridos.", "Não pule refeições para compensar exageros.", "Volte na próxima refeição, não na próxima segunda."],
    pitfalls: ["Cortar grupos alimentares sem necessidade.", "Usar culpa como motivação.", "Comprar alimentos que disparam compulsão sem estratégia.", "Ignorar fome física por muitas horas."],
    support: "Se há episódios frequentes de compulsão, sofrimento intenso ou medo de comer, procure nutricionista e psicólogo. Relação com comida também é saúde.",
    faqs: [
      { q: "Posso comer doce e ainda emagrecer?", a: "Pode, se houver planejamento e porção adequada. Proibição total costuma aumentar desejo em muitas pessoas." },
      { q: "Jacar um dia estraga tudo?", a: "Não. O que define resultado é o padrão repetido. Retomar rápido reduz o impacto." },
      { q: "Como lidar com fim de semana?", a: "Planeje refeições-chave, mantenha proteína e evite chegar faminto aos eventos." },
    ],
  },
  "pre-treino-natural-alimentos-que-ajudam-na-energia-sem-exageros": {
    topic: "Pré-treino natural",
    intent: "escolher alimentos que dão energia sem desconforto gastrointestinal",
    practical: "Um bom pré-treino depende do tempo até o exercício. Quanto mais perto do treino, mais simples e leve deve ser. Carboidratos fáceis de digerir costumam ajudar; refeições grandes, gordurosas ou muito fibrosas podem pesar.",
    checklist: ["Use banana, pão, tapioca, aveia ou fruta conforme tolerância.", "Inclua proteína se houver mais tempo antes do treino.", "Hidrate-se antes de sentir sede.", "Teste alimentos em treinos comuns, não em dias importantes.", "Ajuste quantidade ao tipo e duração do treino."],
    pitfalls: ["Exagerar em cafeína.", "Treinar em jejum mesmo sentindo fraqueza.", "Comer muito perto de treino intenso.", "Achar que suplemento resolve sono ruim."],
    support: "Tontura, náusea frequente, queda de pressão ou hipoglicemia percebida durante treino merecem avaliação. Energia baixa pode ter causa alimentar, de sono ou clínica.",
    faqs: [
      { q: "Café serve como pré-treino?", a: "Pode ajudar disposição, mas deve ser usado com tolerância individual e sem exagerar na dose." },
      { q: "Preciso comer antes de treinar cedo?", a: "Depende. Se você treina bem em jejum, pode funcionar. Se sente fraqueza, teste uma opção leve." },
      { q: "Quanto tempo antes devo comer?", a: "Lanches leves podem funcionar entre 30 e 60 minutos antes; refeições maiores pedem mais tempo." },
    ],
  },
  "proteina-no-emagrecimento-quanto-comer-e-quais-alimentos-escolher": {
    topic: "Proteína no emagrecimento",
    intent: "aumentar saciedade e preservar massa magra durante déficit calórico",
    practical: "Proteína ajuda porque demora mais para digerir, contribui para manutenção muscular e torna a refeição mais completa. O ideal é distribuir ao longo do dia, em vez de concentrar tudo no jantar.",
    checklist: ["Inclua proteína no café, almoço e jantar.", "Use ovos, frango, peixe, iogurte, leite, tofu, feijão ou lentilha.", "Combine proteína vegetal com grãos quando possível.", "Ajuste porções ao seu peso, fome e treino.", "Use suplemento apenas quando comida não cobre a rotina."],
    pitfalls: ["Comer proteína e esquecer vegetais.", "Trocar refeições por shakes sem necessidade.", "Achar que mais proteína sempre é melhor.", "Ignorar contraindicações individuais."],
    support: "Quem tem doença renal, histórico clínico específico ou restrições importantes deve definir quantidade com profissional. Necessidade proteica não é igual para todo mundo.",
    faqs: [
      { q: "Whey é obrigatório para emagrecer?", a: "Não. Whey é uma ferramenta prática, mas comida comum pode atender muito bem." },
      { q: "Feijão conta como proteína?", a: "Conta, embora também tenha carboidratos. Com arroz, lentilha ou grão-de-bico, pode compor boas refeições." },
      { q: "Proteína tira totalmente a fome?", a: "Ajuda, mas saciedade também depende de fibras, volume, sono e emoções." },
    ],
  },
  "quantas-calorias-comer-por-dia-guia-simples-para-iniciantes": {
    topic: "Calorias por dia",
    intent: "entender energia sem transformar alimentação em obsessão",
    practical: "Calorias são uma ferramenta de orientação, não uma sentença. Estimativas ajudam a começar, mas o ajuste real vem da resposta do corpo: peso médio, medidas, fome, energia e desempenho ao longo de semanas.",
    checklist: ["Estime seu gasto com calculadora confiável.", "Registre alguns dias para entender padrão.", "Reduza primeiro bebidas calóricas e beliscos.", "Mantenha proteína e vegetais nas refeições.", "Revise médias semanais, não oscilações diárias."],
    pitfalls: ["Copiar meta calórica de outra pessoa.", "Cortar demais e abandonar em poucos dias.", "Ignorar fins de semana.", "Achar que qualidade alimentar não importa."],
    support: "Histórico de transtorno alimentar, ansiedade intensa com números ou compulsão pede abordagem sem contagem rígida. Existem métodos visuais e comportamentais mais seguros.",
    faqs: [
      { q: "Preciso contar calorias para emagrecer?", a: "Não. Contar ajuda algumas pessoas, mas método do prato, rotina e porções também funcionam." },
      { q: "Déficit maior emagrece mais rápido?", a: "Até certo ponto, mas cortes extremos aumentam fome, perda de massa magra e abandono." },
      { q: "Calorias de alimentos saudáveis contam?", a: "Sim. Qualidade importa para saúde e saciedade, mas energia total ainda influencia peso." },
    ],
  },
  "quantas-vezes-por-semana-devo-treinar-para-ver-resultados": {
    topic: "Frequência de treino",
    intent: "definir uma rotina semanal que gere resultado e seja sustentável",
    practical: "A melhor frequência é aquela que você consegue repetir com qualidade. Para iniciantes, duas a quatro sessões semanais bem feitas costumam ser suficientes. Depois, volume e intensidade podem subir conforme recuperação.",
    checklist: ["Comece com frequência realista.", "Distribua grupos musculares ao longo da semana.", "Inclua descanso entre treinos mais pesados.", "Some caminhada ou cardio leve nos dias livres.", "Aumente volume apenas quando a rotina estiver estável."],
    pitfalls: ["Treinar todos os dias no começo e parar por dor.", "Fazer só exercícios favoritos.", "Não dormir o suficiente.", "Avaliar resultado em poucos dias."],
    support: "Se há dor persistente, fadiga exagerada ou queda de desempenho, reduza volume. Treinar mais não compensa recuperação insuficiente.",
    faqs: [
      { q: "Três vezes por semana dá resultado?", a: "Sim, especialmente se o treino é bem organizado e há progressão." },
      { q: "Posso treinar o mesmo músculo mais de uma vez?", a: "Pode, desde que volume e recuperação estejam adequados." },
      { q: "Quanto tempo até ver resultado?", a: "Algumas mudanças de disposição surgem rápido; mudanças visuais costumam exigir semanas ou meses." },
    ],
  },
  "sono-e-emagrecimento-como-dormir-melhor-pode-ajudar-nos-resultados": {
    topic: "Sono e emagrecimento",
    intent: "mostrar como sono influencia fome, energia e adesão à rotina",
    practical: "Sono ruim não impede emagrecimento matematicamente, mas torna tudo mais difícil. Aumenta fome, reduz energia para treinar, piora decisões alimentares e dificulta recuperação. Dormir melhor é uma estratégia de adesão.",
    checklist: ["Defina horário aproximado para dormir e acordar.", "Reduza telas e luz forte antes de deitar.", "Evite cafeína tarde se ela atrapalha seu sono.", "Deixe refeições noturnas mais leves se há refluxo.", "Use o quarto como ambiente de descanso."],
    pitfalls: ["Dormir pouco e tentar compensar com estimulantes.", "Treinar muito tarde se isso te deixa alerta.", "Comer por cansaço sem perceber.", "Ignorar ronco intenso e sonolência diurna."],
    support: "Ronco alto, pausas na respiração, insônia persistente ou sonolência excessiva merecem avaliação. Sono é saúde, não apenas produtividade.",
    faqs: [
      { q: "Dormir pouco engorda?", a: "Pode favorecer ganho de peso indiretamente por fome, cansaço e pior recuperação, mas não atua sozinho." },
      { q: "Quantas horas preciso dormir?", a: "Muitos adultos funcionam melhor entre 7 e 9 horas, mas qualidade e regularidade também importam." },
      { q: "Cochilo ajuda?", a: "Pode ajudar se for curto e não atrapalhar o sono da noite." },
    ],
  },
  "treino-em-casa-para-emagrecer-plano-simples-sem-equipamentos": {
    topic: "Treino em casa para emagrecer",
    intent: "criar uma rotina sem equipamentos com segurança e progressão",
    practical: "Treino em casa funciona quando tem estrutura: aquecimento, exercícios principais, controle de descanso e progressão. O espaço pequeno não impede resultado; a falta de regularidade e intensidade adequada costuma pesar mais.",
    checklist: ["Escolha 4 a 6 movimentos básicos.", "Use temporizador para séries e descansos.", "Progrida repetições, tempo ou variações.", "Combine com caminhada quando possível.", "Mantenha técnica antes de acelerar."],
    pitfalls: ["Pular aquecimento.", "Fazer saltos se há dor no joelho ou sobrepeso sem adaptação.", "Treinar aleatoriamente sem medir evolução.", "Achar que suor é o único indicador."],
    support: "Se exercícios causam dor articular, falta de ar desproporcional ou tontura, pare e ajuste. Impacto pode ser substituído por variações de baixo impacto.",
    faqs: [
      { q: "Dá para emagrecer treinando só em casa?", a: "Dá, se houver consistência e alimentação alinhada. O treino ajuda gasto e condicionamento." },
      { q: "Preciso pular corda ou fazer burpee?", a: "Não. Existem opções de baixo impacto eficientes." },
      { q: "Quantos minutos por dia?", a: "20 a 40 minutos bem planejados já podem ajudar, especialmente para iniciantes." },
    ],
  },
  "treino-para-iniciantes-na-academia-como-comecar-com-seguranca": {
    topic: "Treino para iniciantes na academia",
    intent: "começar musculação com técnica, progressão e menos risco de lesão",
    practical: "O começo deve ensinar movimento, não testar limite. Máquinas, halteres leves e exercícios básicos ajudam a criar coordenação. O progresso vem quando você repete bem, aumenta aos poucos e respeita recuperação.",
    checklist: ["Faça avaliação ou orientação inicial.", "Aprenda ajustes de máquinas.", "Treine corpo todo nas primeiras semanas.", "Use cargas que permitam técnica estável.", "Anote exercícios para repetir e evoluir."],
    pitfalls: ["Começar com treino avançado dividido demais.", "Copiar cargas de outras pessoas.", "Prender respiração sem orientação.", "Ignorar aquecimento."],
    support: "Dor forte, tontura, pressão no peito ou falta de ar intensa exigem pausa e avaliação. Segurança vem antes de intensidade.",
    faqs: [
      { q: "Qual melhor treino para iniciante?", a: "Geralmente um treino simples de corpo todo ou divisão leve, com exercícios fáceis de aprender." },
      { q: "Preciso sentir dor para crescer?", a: "Não. Dor não é requisito. Progressão e execução importam mais." },
      { q: "Quando aumentar carga?", a: "Quando você completa as repetições com boa técnica e sem compensar movimento." },
    ],
  },
  "whey-protein-vale-a-pena-quando-usar-e-como-escolher": {
    topic: "Whey protein",
    intent: "decidir quando o suplemento ajuda e quando comida já resolve",
    practical: "Whey é proteína em pó, útil pela praticidade. Ele pode ajudar quem não consegue bater proteína com comida, mas não tem efeito especial de emagrecimento. A qualidade da dieta e o treino continuam sendo a base.",
    checklist: ["Calcule se sua proteína diária está baixa.", "Use whey como lanche ou complemento, não obrigação.", "Confira lista de ingredientes.", "Escolha tipo conforme tolerância à lactose.", "Compare custo por dose de proteína."],
    pitfalls: ["Comprar whey esperando queimar gordura.", "Trocar almoço por shake sem planejamento.", "Ignorar desconforto digestivo.", "Usar produtos com muito açúcar sem perceber."],
    support: "Pessoas com alergia à proteína do leite, intolerância intensa, doença renal ou restrições clínicas precisam de orientação antes de usar.",
    faqs: [
      { q: "Whey engorda?", a: "Ele tem calorias. Pode caber em emagrecimento ou ganho de massa, dependendo do total do dia." },
      { q: "Qual o melhor horário?", a: "O horário é menos importante que a quantidade total de proteína no dia." },
      { q: "Whey substitui comida?", a: "Pode quebrar galho, mas refeições completas entregam fibras, micronutrientes e saciedade." },
    ],
  },
  "dor-no-joelho-ao-subir-escadas": {
    topic: "Dor no joelho ao subir escadas",
    intent: "entender causas comuns e reduzir sobrecarga sem ignorar sinais importantes",
    practical: "Subir escadas exige força de quadríceps, controle do quadril e boa tolerância da articulação patelofemoral. Dor nessa situação pode aparecer por aumento repentino de carga, fraqueza muscular, técnica, excesso de peso corporal, artrose, condromalácia ou irritação de tendões. O primeiro passo é reduzir o gatilho e observar padrão da dor.",
    checklist: ["Reduza volume de escadas por alguns dias se a dor aumentou.", "Use corrimão e suba mais devagar.", "Fortaleça coxa e quadril com exercícios sem dor forte.", "Evite saltos e agachamentos profundos no pico da dor.", "Procure avaliação se houver inchaço, travamento ou falseio."],
    pitfalls: ["Continuar subindo correndo apesar da dor.", "Achar que todo estalo é lesão grave.", "Fazer repouso absoluto por semanas sem fortalecer.", "Usar anti-inflamatório para mascarar sobrecarga repetida."],
    support: "Dor persistente no joelho merece avaliação com fisioterapeuta ou médico, especialmente se limita caminhada, vem com inchaço ou começou após torção. Exercícios ajudam muito, mas precisam ser escolhidos conforme a causa provável.",
    faqs: [
      { q: "Dor no joelho ao subir escada é sempre artrose?", a: "Não. Pode envolver cartilagem, tendões, força muscular, controle de movimento ou aumento recente de carga." },
      { q: "Devo parar totalmente de subir escadas?", a: "Nem sempre. Muitas vezes basta reduzir volume, usar apoio e fortalecer. Parar totalmente por muito tempo pode piorar condicionamento." },
      { q: "Agachamento é proibido?", a: "Não necessariamente. A amplitude, carga e variação precisam ser ajustadas para não piorar sintomas." },
    ],
  },
  "dor-no-ombro-ao-levantar-o-braco": {
    topic: "Dor no ombro ao levantar o braço",
    intent: "diferenciar sobrecarga comum de sinais que pedem avaliação",
    practical: "Levantar o braço exige coordenação entre escápula, manguito rotador, coluna torácica e músculos do pescoço. Dor pode surgir por tendinopatia, impacto subacromial, rigidez, fraqueza, excesso de treino acima da cabeça ou trauma. O foco inicial é evitar movimentos que irritam e recuperar controle gradual.",
    checklist: ["Evite carga acima da cabeça se isso reproduz dor forte.", "Teste movimentos em amplitude menor e sem pressa.", "Fortaleça costas e rotadores externos com carga leve.", "Ajuste postura de trabalho e pausas se passa horas sentado.", "Procure avaliação após queda, perda de força ou dor noturna intensa."],
    pitfalls: ["Forçar alongamento doloroso.", "Treinar ombro pesado em todos os treinos.", "Ignorar formigamento no braço.", "Achar que repouso absoluto resolve toda dor no ombro."],
    support: "Se a dor veio após trauma, impede elevar o braço, piora à noite ou causa perda clara de força, procure avaliação. Ombro melhora melhor quando a causa é identificada cedo.",
    faqs: [
      { q: "Dor no ombro é sempre manguito rotador?", a: "Não. O manguito é comum, mas dor pode envolver cápsula, bursa, cervical, escápula ou técnica de treino." },
      { q: "Posso continuar treinando peito e costas?", a: "Depende. Exercícios sem dor podem continuar com ajustes; movimentos que pioram precisam ser reduzidos temporariamente." },
      { q: "Gelo ou calor ajuda?", a: "Pode aliviar sintomas em alguns casos, mas não substitui ajuste de carga e fortalecimento progressivo." },
    ],
  },
  "treino-em-casa-para-quem-esta-acima-do-peso": {
    topic: "Treino em casa para quem está acima do peso",
    intent: "começar com baixo impacto, segurança articular e progressão possível",
    practical: "Quem está acima do peso pode treinar em casa com bons resultados, mas precisa respeitar impacto, articulações e condicionamento inicial. A prioridade é criar tolerância: movimentos simples, pausas suficientes e progressão lenta. Treino eficiente não precisa destruir joelhos, lombar ou fôlego.",
    checklist: ["Comece com exercícios de baixo impacto.", "Use cadeira, parede ou apoio para adaptar movimentos.", "Faça blocos curtos de 10 a 20 minutos.", "Prefira caminhar parado, sentar e levantar, remadas com elástico e mobilidade.", "Aumente tempo antes de aumentar intensidade."],
    pitfalls: ["Começar com saltos e burpees sem preparo.", "Treinar até ficar tonto.", "Ignorar dor no joelho, lombar ou tornozelo.", "Achar que só exercício intenso emagrece."],
    support: "Se há hipertensão, diabetes, dor importante, falta de ar intensa ou muito tempo parado, uma avaliação inicial traz segurança. O treino deve ser adaptado ao corpo atual, não a um padrão de internet.",
    faqs: [
      { q: "Treino de baixo impacto emagrece?", a: "Ajuda, principalmente quando combinado com alimentação e constância. Impacto alto não é obrigatório para gastar energia." },
      { q: "Quantas vezes por semana começar?", a: "Duas a quatro vezes por semana pode ser um bom início, com dias de descanso ou caminhada leve." },
      { q: "Como proteger os joelhos?", a: "Use apoio, reduza amplitude dolorosa, fortaleça coxas e quadril e evite saltos no começo." },
    ],
  },
};

Object.assign(supplements, quickSeeds);

export function getArticleSupplement(slug: string): ArticleBlock[] {
  const item = supplements[slug];
  if (!item) return [];

  return [
    {
      type: "intro",
      title: `${item.topic}: o que realmente importa`,
      content: `${item.practical}\n\nEste complemento foi escrito para ${item.intent}. A ideia é transformar orientação geral em decisões práticas, com atenção a sinais do corpo, rotina possível e limites individuais.`,
      isHtml: false,
    },
    {
      type: "checklist",
      title: "Plano prático para aplicar hoje",
      content: item.checklist.map((line) => `- ${line}`).join("\n"),
      isHtml: false,
    },
    {
      type: "what_to_avoid",
      title: "Erros comuns e cuidados",
      content: `${item.pitfalls.map((line) => `- ${line}`).join("\n")}\n\n${item.support}`,
      isHtml: false,
    },
    {
      type: "faq",
      title: `Dúvidas comuns sobre ${item.topic.toLowerCase()}`,
      faqs: item.faqs,
    },
  ];
}

export function hasArticleSupplement(slug: string) {
  return Boolean(supplements[slug]);
}

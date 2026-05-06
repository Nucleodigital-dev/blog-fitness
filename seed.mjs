import Database from 'better-sqlite3';
import { v4 as uuidv4 } from 'uuid';

const db = new Database('./data/blog.db');

const categories = [
  { id: uuidv4(), name_pt: 'Saúde Lombar', name_en: 'Lower Back Health', slug: 'saude-lombar' },
  { id: uuidv4(), name_pt: 'Saúde do Joelho', name_en: 'Knee Health', slug: 'saude-joelho' },
  { id: uuidv4(), name_pt: 'Ombro e Mobilidade', name_en: 'Shoulder & Mobility', slug: 'ombro-mobilidade' },
  { id: uuidv4(), name_pt: 'Treino em Casa', name_en: 'Home Workouts', slug: 'treino-em-casa' },
  { id: uuidv4(), name_pt: 'Mente e Ansiedade', name_en: 'Mind & Anxiety', slug: 'mente-ansiedade' }
];

// Insert categories
const insertCat = db.prepare('INSERT OR IGNORE INTO categories (id, name_pt, name_en, slug) VALUES (?, ?, ?, ?)');
categories.forEach(c => insertCat.run(c.id, c.name_pt, c.name_en, c.slug));

const articles = [
  {
    id: uuidv4(),
    slug: 'dor-lombar-ao-acordar-o-que-ajuda',
    title_pt: 'Dor na lombar ao acordar / ciática: o que costuma ajudar',
    title_en: 'Lower back pain when waking up: what helps',
    content_pt: `Muitas pessoas relatam acordar com uma sensação de rigidez ou pontada na base das costas que, aos poucos, vai aliviando. Se este é o seu caso, saiba que movimentos lentos e progressivos são a melhor resposta imediata para "destravar" a lombar de forma segura.

## Para quem este guia serve
Este guia foi feito para quem sofre com dores lombares matinais ou dor ciática crônica que melhora com o movimento leve e não possui histórico de trauma recente.

## Quando não é para exercício imediato
Se a dor for resultado de uma queda, se vier acompanhada de perda de força extrema nas pernas ou alterações intestinais repentinas, não faça exercícios. Procure um médico.

## Red flags que pedem avaliação
- Dor insuportável que não melhora com nenhuma posição.
- Formigamento ou dormência que desce pela perna.

## O que pode estar acontecendo
A coluna passa horas em uma única posição durante o sono. Os discos intervertebrais se hidratam e inflam, deixando a região mais rígida pela manhã.

## Como diferenciar dor local, irradiada e rigidez
A dor local fica pontual na coluna. A dor irradiada (ciática) desce pelo glúteo até a perna. A rigidez é apenas uma sensação de peso que passa após 15 minutos de movimento.

## Regra de dor 0–10 para treinar com segurança
Mantenha a dor no nível 3 ou 4. Se passar disso ou se no dia seguinte a dor for pior, você exagerou na dose.

## Rotina fase irritada
- Respiração diafragmática (deitado).
- Movimento pélvico suave (gato-vaca deitado).

## Rotina fase de melhora
- Prancha adaptada.
- Ponte de glúteos.

## Como voltar a agachar, puxar, carregar e correr
A progressão é chave. Comece com agachamentos sem peso (usando uma cadeira) e evolua 10% da carga por semana.

## Erros comuns que mantêm a lombar sensível
- Ficar em total repouso absoluto na cama.
- Alongar excessivamente a lombar puxando os joelhos para o peito o dia todo.

## Checklist de 7 dias
- [ ] Dia 1: Caminhada de 10 min.
- [ ] Dia 2: Gato-vaca e respiração.

## FAQ realista
**É normal doer nos primeiros dias?** Sim, um leve incômodo de adaptação é esperado.

## Referências e revisão técnica
- Atualizado em: 2026.
- Baseado em diretrizes clínicas de lombalgia inespecífica.`,
    content_en: 'English content coming soon. Stay tuned for translations.',
    cover_image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=1000',
    category_id: categories[0].id,
    is_featured: 1
  },
  {
    id: uuidv4(),
    slug: 'dor-no-joelho-ao-subir-escadas',
    title_pt: 'Dor no joelho ao subir escadas / artrose / condromalácia',
    title_en: 'Knee pain when climbing stairs',
    content_pt: `Sentir dor no joelho ao usar as escadas é um dos relatos mais comuns em consultórios. A boa notícia é que fortalecer a musculatura ao redor é frequentemente a solução definitiva.

## Resumo rápido: o que fazer hoje
Evite sobrecarga excessiva, mas não pare de se mover. Fortaleça o quadríceps e ajuste o ângulo da sua caminhada.

## Sinais de alerta
Joelho muito inchado, quente ao toque ou que "trava" completamente durante o movimento.

## Onde dói e em qual movimento piora
Geralmente a dor patelofemoral piora mais ao **descer** escadas do que ao subir.

## Hipóteses mais comuns por padrão de dor
- Dor na frente: Condromalácia ou sobrecarga patelar.
- Dor profunda: Pode ser indicativo de artrose inicial em pessoas mais velhas.

## O papel de quadríceps, glúteos, panturrilha e carga
O quadríceps fraco faz o joelho absorver todo o impacto. O glúteo fraco faz o joelho "cair" para dentro (valgo). 

## Exercícios fase inicial
- Isometria de quadríceps na parede.
- Elevação pélvica.

## Exercícios fase intermediária
- Agachamento isométrico (cadeira chinesa).
- Subida em degrau baixo.

## Volta ao agachamento, escada e caminhada
Comece usando o corrimão e diminua a ajuda aos poucos ao longo de 4 semanas.

## Movimentos a reduzir temporariamente
Agachamentos muito profundos com peso e corridas em ladeira descendo.

## Exemplo de progressão semanal
Semana 1: Isometria. Semana 2: Degrau baixo. Semana 3: Degrau normal.

## FAQ
**Posso fazer musculação?** Sim, a musculação é o melhor remédio, desde que adaptada.

## Referências
Baseado em diretrizes do Colégio Americano de Medicina do Esporte.`,
    content_en: 'English content coming soon.',
    cover_image: 'https://images.unsplash.com/photo-1584464457692-05452f1e6702?q=80&w=1000',
    category_id: categories[1].id,
    is_featured: 1
  },
  {
    id: uuidv4(),
    slug: 'treino-em-casa-para-quem-esta-acima-do-peso',
    title_pt: 'Treino em casa para quem está acima do peso e sente o corpo travado',
    title_en: 'Home workouts for overweight individuals',
    content_pt: `Começar a se exercitar quando o corpo já dói e o fôlego falta pode ser intimidador. Este guia é para você começar de forma segura, no seu ritmo, e sem impacto.

## Abertura acolhedora e sem julgamento
O corpo precisa de tempo para entender que vai começar a se mover. Não existe cobrança por performance, apenas por consistência.

## Quando começar leve é a melhor estratégia
Se você for muito rápido, o risco de dores nos joelhos aumenta. O foco inicial é apenas criar o hábito.

## Como medir esforço sem relógio ou app
Use o teste da fala. Você deve conseguir dizer uma frase curta sem perder o ar completamente.

## Aquecimento sentado ou com apoio
- Rotações de tronco na cadeira.
- Elevação de calcanhares apoiado na parede.

## Bloco cardiovascular sem impacto
Marcha no lugar por 5 minutos, aumentando os braços para elevar a frequência.

## Bloco de força com cadeira, parede e chão opcional
- Sentar e levantar da cadeira (10 repetições).
- Flexão na parede.

## Bloco de mobilidade simples
Alongamentos gentis para pescoço e ombros.

## Plano de 3 dias por semana
Segunda, Quarta e Sexta. 15 minutos são melhores que zero minutos.

## O que fazer se joelho/lombar reclamarem
Reduza a amplitude do movimento. Não precisa agachar até o fim.

## Checklist da primeira semana
- [ ] Consegui fazer 3x na semana.
- [ ] Bebo água suficiente.

## FAQ
**Estou muito gordo para treinar?** Não. Todo corpo pode e deve se mover.

## Referências
Diretrizes de Obesidade e Exercício 2025.`,
    content_en: 'English content coming soon.',
    cover_image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?q=80&w=1000',
    category_id: categories[3].id,
    is_featured: 1
  },
  {
    id: uuidv4(),
    slug: 'ansiedade-para-ir-a-academia',
    title_pt: 'Ansiedade para ir à academia / vergonha de treinar / medo de lesão',
    title_en: 'Gym anxiety and fear of injury',
    content_pt: `A sensação de que todos estão olhando para você na academia é real, mas você não está sozinho. A maioria das pessoas sente ou já sentiu isso no início.

## Resposta curta e validando a experiência
É normal ter medo. O ambiente de academia pode ser intimidador, mas o seu foco deve ser na sua saúde.

## O que costuma alimentar esse medo
O medo de fazer o exercício errado, a percepção corporal e o barulho excessivo do ambiente.

## Quando ansiedade e exercício merecem ajuda profissional
Se a ansiedade te causa pânico severo ao sair de casa, um terapeuta é essencial.

## Ritual de 5 minutos antes do treino
Coloque sua playlist favorita, arrume sua garrafa e lembre do seu "porquê".

## Plano de exposição gradual em 3 semanas
- Semana 1: Vá apenas para caminhar na esteira por 10 min.
- Semana 2: Use um ou dois aparelhos sentados.
- Semana 3: Explore os pesos livres.

## Treino mínimo viável para o primeiro mês
Apenas empurre, puxe e agache de forma leve. A meta é entrar e sair da academia com sucesso.

## Como usar a regra “sair melhor do que entrou”
Se o treino for piorar seu estresse, faça menos. O importante é a endorfina final.

## Frases-guia e checklist de segurança
"Eu mereço ocupar este espaço."

## Erros comuns no retorno
Tentar compensar os dias perdidos fazendo o treino mais difícil de todos.

## FAQ
**E se rirem de mim?** Na realidade, 99% das pessoas estão preocupadas demais consigo mesmas para olhar para os outros.

## Referências
Psicologia do Exercício, 2024.`,
    content_en: 'English content coming soon.',
    cover_image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1000',
    category_id: categories[4].id,
    is_featured: 0
  },
  {
    id: uuidv4(),
    slug: 'dor-no-ombro-ao-levantar-o-braco',
    title_pt: 'Dor no ombro ao levantar o braço / ombro congelado / manguito',
    title_en: 'Shoulder pain when raising arm',
    content_pt: `Um leve pinçamento no ombro pode limitar todo o seu treino de membros superiores. Entender como evitar esse atrito é o primeiro passo para a recuperação.

## Resposta curta para o leitor apavorado
Nem toda dor no ombro é um rompimento de tendão. A grande maioria é apenas uma inflamação que melhora com controle de carga.

## Quando evitar insistir no movimento
Se doer de forma "fina" e pontiaguda ao levantar acima de 90 graus, pare.

## Como diferenciar dor ao elevar, à noite e rigidez global
Dor noturna é sinal clássico de inflamação de manguito rotador. Rigidez que impede você de pentear o cabelo pode ser Ombro Congelado.

## O que o ombro costuma tolerar no início
Puxadas geralmente são mais bem toleradas que empurradas (supino).

## Plano fase dolorosa
Isometria. Empurrar a parede sem se mover para gerar tensão leve.

## Plano fase de mobilidade
Rotações externas leves com elástico.

## Plano fase de retorno à força
Desenvolvimento com halteres leves em posição neutra.

## Como adaptar supino, desenvolvimento e puxadas
Faça flexões inclinadas. Use a puxada pela frente, nunca por trás da nuca.

## Erros de mobilidade agressiva
Pendurar-se na barra fixa na primeira semana de dor achando que vai "abrir" a articulação.

## Checklist de progressão
- [ ] Dor < 3 no dia a dia.
- [ ] Mobilidade completa retornando.

## FAQ
**Posso tomar remédio e treinar?** O remédio esconde a dor, você pode se machucar mais. Cuidado.

## Referências
Guidelines de Fisioterapia Ortopédica.`,
    content_en: 'English content coming soon.',
    cover_image: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1000',
    category_id: categories[2].id,
    is_featured: 0
  }
];

const insertArt = db.prepare('INSERT OR IGNORE INTO articles (id, slug, title_pt, content_pt, title_en, content_en, cover_image, category_id, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)');
articles.forEach(a => insertArt.run(a.id, a.slug, a.title_pt, a.content_pt, a.title_en, a.content_en, a.cover_image, a.category_id, a.is_featured));

console.log('Seed completo!');

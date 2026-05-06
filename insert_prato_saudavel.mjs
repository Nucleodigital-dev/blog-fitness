import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';

const db = new Database('./data/blog.db');

try {
  db.exec('ALTER TABLE articles ADD COLUMN cover_alt TEXT');
} catch (e) {}

const categorySlug = 'nutricao-fitness';
let category = db.prepare('SELECT id FROM categories WHERE slug = ?').get(categorySlug);

if (!category) {
  const categoryId = randomUUID();
  db.prepare('INSERT INTO categories (id, name_pt, name_en, slug) VALUES (?, ?, ?, ?)').run(
    categoryId,
    'Nutrição Fitness',
    'Fitness Nutrition',
    categorySlug
  );
  category = { id: categoryId };
}

const slug = 'como-montar-um-prato-saudavel-para-emagrecer-sem-passar-fome';
const title = 'Como Montar um Prato Saudável para Emagrecer Sem Passar Fome';
const coverImage = '/uploads/prato-saudavel-emagrecer.jpg';
const coverAlt = 'Prato saudável para emagrecer com frango grelhado, grãos integrais e vegetais em vista superior.';

const content = `Emagrecer não precisa significar comer pouco, cortar todos os carboidratos ou viver de salada sem graça. Na prática, muita gente desiste da dieta porque tenta compensar anos de hábitos ruins com restrições impossíveis de manter.

A estratégia mais eficiente é aprender a montar um prato saudável para emagrecer: equilibrado, rico em nutrientes, com boa quantidade de proteína, fibras e alimentos que aumentam a saciedade. Assim, você reduz calorias sem sentir que está brigando com a comida todos os dias.

Este guia mostra uma forma simples de organizar almoço e jantar com alimentos comuns, sem fórmulas milagrosas e sem depender de produtos caros.

## O que é um prato saudável para emagrecer?

Um prato saudável para emagrecer é aquele que combina alimentos naturais ou minimamente processados em proporções inteligentes. Ele não depende de receitas complicadas, mas de consistência.

A base é simples: vegetais, proteína, carboidrato de boa qualidade e uma pequena porção de gordura saudável. Essa combinação ajuda porque entrega volume, mastigação, nutrientes e saciedade. Para quem treina, também favorece energia e preservação de massa muscular durante o processo de perda de peso.

Organizações de saúde como a OMS reforçam que uma alimentação saudável deve priorizar frutas, vegetais, leguminosas, grãos integrais e menor consumo de açúcar, sódio e gorduras de baixa qualidade. Ou seja: o foco não é perfeição, é repetir boas escolhas na maior parte das refeições.

## A fórmula visual do prato equilibrado

Uma forma prática de começar é dividir mentalmente o prato em partes. Você não precisa pesar tudo na primeira semana. Use a divisão visual como ponto de partida e ajuste conforme fome, rotina, treino e evolução.

| Parte do prato | O que colocar | Exemplos práticos |
|---|---|---|
| 1/2 do prato | Vegetais e legumes | Alface, rúcula, brócolis, cenoura, abobrinha, tomate |
| 1/4 do prato | Proteína | Frango, ovos, peixe, carne magra, tofu, feijão, lentilha |
| 1/4 do prato | Carboidrato de qualidade | Arroz integral, batata-doce, mandioca, aveia, quinoa |
| Pequena porção | Gordura saudável | Azeite, abacate, castanhas, sementes |

Essa divisão aumenta o volume da refeição sem exagerar nas calorias. Vegetais têm água, fibras e micronutrientes. Proteínas e carboidratos bem escolhidos deixam a refeição mais completa e reduzem a chance de beliscar logo depois.

## Passo a passo para montar seu prato saudável

1. **Comece pelos vegetais.** Preencha metade do prato com verduras e legumes. Quanto mais cores, melhor. Um prato com folhas verdes, tomate, cenoura e brócolis tende a oferecer mais fibras, vitaminas e minerais do que uma refeição baseada apenas em arroz e carne.

2. **Escolha uma boa fonte de proteína.** A proteína ajuda na saciedade e contribui para manutenção da massa muscular. Boas opções incluem ovos, frango, peixe, patinho moído, iogurte natural, tofu, feijão, grão-de-bico e lentilha.

3. **Inclua carboidrato sem medo.** Carboidrato não é inimigo do emagrecimento. O problema costuma estar na quantidade, na frequência e no tipo escolhido. Arroz, batata, mandioca, milho e aveia podem fazer parte de uma rotina saudável quando entram em porções adequadas.

4. **Use gordura com controle.** Gorduras boas são importantes, mas calóricas. Um fio de azeite, algumas castanhas ou uma pequena porção de abacate já são suficientes para melhorar sabor e saciedade.

5. **Capriche no tempero, não no molho pronto.** Molhos industrializados, frituras, queijos muito gordurosos e grandes quantidades de óleo podem multiplicar as calorias da refeição. Prefira limão, ervas, alho, cebola, páprica, pimenta, vinagre e cheiro-verde.

## Alimentos densos em nutrientes vs. alimentos vazios

Nem toda caloria entrega o mesmo valor nutricional. Dois alimentos podem ter calorias parecidas, mas efeitos muito diferentes na fome, na energia e na qualidade da dieta.

| Melhor escolha | Por que ajuda mais? | Troca menos interessante |
|---|---|---|
| Arroz, feijão e salada | Combina fibras, proteína vegetal e energia | Macarrão instantâneo |
| Fruta inteira | Tem fibras, mastigação e maior saciedade | Suco adoçado |
| Batata cozida ou assada | Dá energia e costuma saciar bem | Batata frita |
| Iogurte natural com fruta | Entrega proteína e micronutrientes | Sobremesa láctea açucarada |
| Frango grelhado ou ovos | Boa fonte de proteína | Embutidos frequentes |
| Castanhas em pequena porção | Oferecem gorduras boas | Salgadinhos industrializados |

O objetivo não é proibir alimentos, mas entender quais escolhas ajudam você a ficar satisfeito por mais tempo. Quando a maior parte do prato vem de comida de verdade, fica mais fácil manter déficit calórico sem sofrimento.

## Exemplos de pratos saudáveis para o dia a dia

### Prato brasileiro equilibrado

Arroz, feijão, frango grelhado, salada de folhas, tomate e cenoura. É simples, acessível e eficiente. O feijão melhora a saciedade, o frango oferece proteína e a salada aumenta o volume da refeição.

### Prato com batata-doce

Batata-doce cozida, ovos mexidos, brócolis e salada de pepino. É uma boa opção para quem treina e quer energia sem depender de alimentos ultraprocessados.

### Prato vegetariano

Lentilha, arroz integral, tofu grelhado, abobrinha refogada e salada colorida. A combinação de leguminosas e grãos ajuda a compor uma refeição nutritiva e rica em fibras.

## Erros comuns ao tentar montar um prato para emagrecer

### Comer só salada

Salada é ótima, mas uma refeição apenas com folhas pode deixar fome pouco tempo depois. Inclua proteína e uma fonte de carboidrato adequada.

### Cortar carboidratos sem necessidade

Muitas pessoas até perdem peso rápido no início, mas depois sentem cansaço, compulsão ou dificuldade de manter a rotina. O mais importante é ajustar porções e qualidade.

### Exagerar nos alimentos saudáveis

Azeite, pasta de amendoim, granola e castanhas podem ser bons alimentos, mas em excesso dificultam o déficit calórico. Saudável também precisa de contexto e porção.

## Como adaptar o prato se você sente muita fome

Se a fome aparece pouco tempo depois da refeição, não reduza tudo de uma vez. Primeiro aumente vegetais, inclua uma boa fonte de proteína e verifique se você está bebendo água ao longo do dia. Depois, observe se o carboidrato está muito baixo para seu nível de atividade.

Outra dica prática é mastigar com calma e montar pratos visualmente cheios com alimentos de menor densidade calórica, como legumes cozidos, saladas e verduras. Isso ajuda o cérebro a registrar melhor a refeição.

## Conclusão

Montar um prato saudável para emagrecer não exige perfeição. Exige método. Quando você combina vegetais, proteína, carboidrato de qualidade e gordura em porções adequadas, fica mais fácil controlar a fome, manter energia e seguir a rotina por mais tempo.

Comece pela próxima refeição: escolha uma proteína, preencha metade do prato com vegetais e ajuste o carboidrato sem culpa. Pequenas escolhas repetidas todos os dias constroem resultados mais sólidos do que dietas extremas de curta duração.

**Próximo passo:** continue aprendendo com o guia sobre quantas calorias comer por dia para emagrecer com segurança.

## Fontes e referências

- [Organização Mundial da Saúde: alimentação saudável](https://www.who.int/news-room/fact-sheets/detail/healthy-diet)
- [Harvard Healthy Eating Plate](https://www.health.harvard.edu/questions-and-answers-about-the-healthy-eating-plate)
- [CDC: dicas de alimentação saudável](https://www.cdc.gov/nutrition/features/healthy-eating-tips.html)
`;

const existing = db.prepare('SELECT id FROM articles WHERE slug = ?').get(slug);
const articleId = existing?.id || randomUUID();

db.prepare(`
  INSERT INTO articles (
    id, slug, title_pt, content_pt, title_en, content_en, cover_image, cover_alt, category_id, is_featured, status
  )
  VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  ON CONFLICT(slug) DO UPDATE SET
    title_pt = excluded.title_pt,
    content_pt = excluded.content_pt,
    cover_image = excluded.cover_image,
    cover_alt = excluded.cover_alt,
    category_id = excluded.category_id,
    status = excluded.status
`).run(
  articleId,
  slug,
  title,
  content,
  '',
  '',
  coverImage,
  coverAlt,
  category.id,
  0,
  'published'
);

console.log(`Artigo publicado: /blog/${slug}`);

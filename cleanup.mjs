import Database from 'better-sqlite3';

const db = new Database('./data/blog.db');

const goodSlugs = [
  'dor-lombar-ao-acordar-o-que-ajuda',
  'dor-no-joelho-ao-subir-escadas',
  'treino-em-casa-para-quem-esta-acima-do-peso',
  'ansiedade-para-ir-a-academia',
  'dor-no-ombro-ao-levantar-o-braco'
];

const stmt = db.prepare(`DELETE FROM articles WHERE slug NOT IN (?, ?, ?, ?, ?)`);
const info = stmt.run(...goodSlugs);

console.log(`Deletados \${info.changes} artigos antigos.`);

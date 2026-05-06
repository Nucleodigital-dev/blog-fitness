import Database from 'better-sqlite3';

const db = new Database('./data/blog.db');

const newUrl = 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000';

db.prepare("UPDATE articles SET cover_image = ? WHERE slug = 'dor-no-joelho-ao-subir-escadas'").run(newUrl);

console.log('Capa do joelho atualizada!');

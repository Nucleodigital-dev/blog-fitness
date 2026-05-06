"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2 } from "lucide-react";

type Article = {
  id: string;
  slug: string;
  title_pt: string;
  title_en: string;
  created_at: string;
};

export default function AdminDashboard() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/articles")
      .then((res) => res.json())
      .then((data) => {
        if (data.articles) setArticles(data.articles);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Tem certeza que deseja excluir este artigo permanentemente?')) return;
    
    try {
      const res = await fetch(`/api/articles/${id}`, {
        method: 'DELETE',
      });
      
      if (res.ok) {
        setArticles(articles.filter(a => a.id !== id));
      } else {
        alert('Erro ao excluir artigo.');
      }
    } catch (error) {
      alert('Erro ao excluir artigo.');
    }
  };

  return (
    <div className="admin-container" style={{ maxWidth: 900, margin: '0 auto', paddingTop: 40 }}>
      <div className="admin-header">
        <h1>CMS | Artigos</h1>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/admin/categories" className="btn btn-secondary">
            Gerenciar Categorias
          </Link>
          <Link href="/admin/new" className="btn btn-primary">
            <Plus size={20} /> Novo Artigo
          </Link>
        </div>
      </div>

      {loading ? (
        <p>Carregando...</p>
      ) : (
        <div className="article-grid" style={{ marginTop: 32 }}>
          {articles.map((article) => (
            <div key={article.id} className="article-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px' }}>
              <div>
                <h2 style={{ fontSize: '1.25rem', marginBottom: 8 }}>{article.title_pt}</h2>
                <div className="article-meta">
                  <span>/{article.slug}</span>
                  <span>{new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: 12 }}>
                <Link href={`/admin/edit/${article.id}`} className="btn btn-secondary" style={{ padding: '8px 16px' }}>
                  <Edit size={16} /> Editar
                </Link>
                <button onClick={() => handleDelete(article.id)} className="btn btn-secondary" style={{ padding: '8px 16px', color: '#ef4444' }}>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {articles.length === 0 && (
            <p style={{ color: 'var(--text-muted)' }}>Nenhum artigo encontrado. Crie o primeiro!</p>
          )}
        </div>
      )}
    </div>
  );
}

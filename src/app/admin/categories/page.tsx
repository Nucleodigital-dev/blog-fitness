"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Trash2, Loader2 } from "lucide-react";

type Category = {
  id: string;
  name_pt: string;
  name_en: string;
  slug: string;
  parent_id: string | null;
};

export default function CategoriesAdmin() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [formData, setFormData] = useState({
    name_pt: "",
    name_en: "",
    slug: "",
    parent_id: "",
    config_json: ""
  });

  const fetchCategories = () => {
    setLoading(true);
    fetch("/api/categories")
      .then((res) => res.json())
      .then((data) => {
        if (data.categories) setCategories(data.categories);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const generateSlug = (text: string) => {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setFormData(prev => ({
      ...prev,
      name_pt: name,
      slug: prev.slug || generateSlug(name)
    }));
  };

  const handleTranslate = async () => {
    if (!formData.name_pt) return;
    try {
      const resTitle = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: formData.name_pt, targetLang: 'en' })
      });
      const dataTitle = await resTitle.json();
      if (dataTitle.translatedText) {
        setFormData(prev => ({ ...prev, name_en: dataTitle.translatedText }));
      }
    } catch (error) {
      alert("Erro ao traduzir");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (formData.config_json) {
        try {
          JSON.parse(formData.config_json);
        } catch (err) {
          alert("O JSON de configuração é inválido. Por favor, verifique a sintaxe.");
          setSaving(false);
          return;
        }
      }

      const res = await fetch('/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, parent_id: formData.parent_id || null })
      });
      if (res.ok) {
        setFormData({ name_pt: "", name_en: "", slug: "", parent_id: "", config_json: "" });
        fetchCategories();
      } else {
        const err = await res.json();
        alert(err.error || 'Erro ao salvar');
      }
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza?")) return;
    try {
      await fetch(`/api/categories?id=${id}`, { method: 'DELETE' });
      fetchCategories();
    } catch (e) {
      alert("Erro ao deletar");
    }
  };

  return (
    <div className="admin-editor-page" style={{ maxWidth: 900, margin: '0 auto', paddingTop: 40, paddingBottom: 60 }}>
      <div className="admin-header">
        <h1>Categorias</h1>
        <Link href="/admin" className="btn btn-secondary">Voltar para Artigos</Link>
      </div>

      <div className="admin-two-column" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
        <form className="admin-card" onSubmit={handleSubmit} style={{ background: 'var(--card-bg)', padding: 24, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: 24 }}>Nova Categoria</h2>
          
          <div className="form-group">
            <label>Nome (PT-BR)</label>
            <div className="admin-inline-control" style={{ display: 'flex', gap: 8 }}>
              <input required value={formData.name_pt} onChange={handleNameChange} placeholder="Ex: Musculação" />
              <button type="button" onClick={handleTranslate} className="btn btn-secondary" style={{ padding: '0 16px' }}>Traduzir</button>
            </div>
          </div>

          <div className="form-group">
            <label>Nome (EN-US)</label>
            <input value={formData.name_en} onChange={e => setFormData({...formData, name_en: e.target.value})} placeholder="Ex: Bodybuilding" />
          </div>

          <div className="form-group">
            <label>Slug</label>
            <input required value={formData.slug} onChange={e => setFormData({...formData, slug: e.target.value})} placeholder="ex: musculacao" />
          </div>

          <div className="form-group">
            <label>Categoria Pai (Opcional)</label>
            <select value={formData.parent_id} onChange={e => setFormData({...formData, parent_id: e.target.value})}>
              <option value="">Nenhuma (Categoria Principal)</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name_pt}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>Configuração da Categoria (JSON de Blocos Opcional)</label>
            <textarea 
               value={formData.config_json} 
               onChange={e => setFormData({...formData, config_json: e.target.value})} 
               placeholder={`Exemplo: \n{\n  "required": ["intro", "quick_answer"],\n  "optional": ["faq"]\n}`}
               style={{ minHeight: 120, fontFamily: 'monospace', fontSize: '0.85rem' }}
            />
            <small style={{ color: 'var(--text-muted)' }}>Você pode pedir para uma IA gerar a estrutura padrão desta categoria e colar aqui.</small>
          </div>

          <button type="submit" disabled={saving} className="btn btn-primary" style={{ width: '100%' }}>
            {saving ? <Loader2 className="animate-spin" /> : <Plus />}
            Salvar Categoria
          </button>
        </form>

        <div className="admin-card" style={{ background: 'var(--card-bg)', padding: 24, borderRadius: 'var(--radius)', border: '1px solid var(--border)' }}>
          <h2 style={{ marginBottom: 24 }}>Categorias Existentes</h2>
          {loading ? <p>Carregando...</p> : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {categories.map(c => {
                const parent = categories.find(p => p.id === c.parent_id);
                return (
                  <div className="admin-category-row" key={c.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)' }}>
                    <div>
                      <strong>{c.name_pt}</strong> <span style={{ color: 'var(--text-muted)' }}>({c.name_en})</span>
                      <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                        /{c.slug} {parent && ` • Dentro de: ${parent.name_pt}`}
                      </div>
                    </div>
                    <button onClick={() => handleDelete(c.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                      <Trash2 size={20} />
                    </button>
                  </div>
                )
              })}
              {categories.length === 0 && <p style={{ color: 'var(--text-muted)' }}>Nenhuma categoria criada.</p>}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

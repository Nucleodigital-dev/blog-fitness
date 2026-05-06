"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ImagePlus, Loader2, Plus, Save, Trash2 } from "lucide-react";

type Category = {
  id: string;
  name_pt: string;
};

type Article = {
  id: string;
  slug: string;
  title_pt: string;
  content_pt: string;
  title_en: string;
  content_en: string;
  cover_image: string;
  cover_alt: string;
  category_id: string;
  is_featured: number | boolean;
  status: "draft" | "published";
};

type FaqItem = {
  q: string;
  a: string;
};

type SmartBlock = {
  type: string;
  title: string;
  content?: string;
  faqs?: FaqItem[] | null;
  isHtml?: boolean;
};

const makeSlug = (value: string) =>
  value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");

function parseBlocks(content: string): SmartBlock[] | null {
  try {
    if (!content.trim().startsWith("[")) return null;
    const parsed = JSON.parse(content);
    if (!Array.isArray(parsed)) return null;

    return parsed.map((block: any, index: number) => ({
      type: block.type || `block_${index + 1}`,
      title: block.title || `Bloco ${index + 1}`,
      content: block.content || "",
      faqs: Array.isArray(block.faqs) ? block.faqs : block.type === "faq" ? [] : null,
      isHtml: !!block.isHtml
    }));
  } catch (error) {
    return null;
  }
}

export default function EditArticlePage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [categories, setCategories] = useState<Category[]>([]);
  const [article, setArticle] = useState<Article | null>(null);
  const [rawContent, setRawContent] = useState("");
  const [blocks, setBlocks] = useState<SmartBlock[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [error, setError] = useState("");

  const isBlockMode = useMemo(() => blocks !== null, [blocks]);

  useEffect(() => {
    async function load() {
      try {
        const [articleRes, categoriesRes] = await Promise.all([
          fetch(`/api/articles/${params.id}`),
          fetch("/api/categories")
        ]);

        const articleData = await articleRes.json();
        const categoriesData = await categoriesRes.json();

        if (!articleRes.ok) {
          throw new Error(articleData.error || "Artigo não encontrado.");
        }

        setArticle(articleData.article);
        setRawContent(articleData.article.content_pt || "");
        setBlocks(parseBlocks(articleData.article.content_pt || ""));
        if (categoriesData.categories) setCategories(categoriesData.categories);
      } catch (err: any) {
        setError(err.message || "Erro ao carregar artigo.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [params.id]);

  const updateArticle = (field: keyof Article, value: string | boolean) => {
    setArticle(prev => prev ? { ...prev, [field]: value } : prev);
  };

  const updateBlock = (index: number, patch: Partial<SmartBlock>) => {
    setBlocks(prev => {
      if (!prev) return prev;
      return prev.map((block, i) => i === index ? { ...block, ...patch } : block);
    });
  };

  const updateFaq = (blockIndex: number, faqIndex: number, field: keyof FaqItem, value: string) => {
    setBlocks(prev => {
      if (!prev) return prev;
      return prev.map((block, i) => {
        if (i !== blockIndex) return block;
        const faqs = [...(block.faqs || [])];
        faqs[faqIndex] = { ...faqs[faqIndex], [field]: value };
        return { ...block, faqs };
      });
    });
  };

  const addFaq = (blockIndex: number) => {
    setBlocks(prev => {
      if (!prev) return prev;
      return prev.map((block, i) => (
        i === blockIndex ? { ...block, faqs: [...(block.faqs || []), { q: "", a: "" }] } : block
      ));
    });
  };

  const removeFaq = (blockIndex: number, faqIndex: number) => {
    setBlocks(prev => {
      if (!prev) return prev;
      return prev.map((block, i) => {
        if (i !== blockIndex) return block;
        const faqs = (block.faqs || []).filter((_, idx) => idx !== faqIndex);
        return { ...block, faqs };
      });
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const body = new FormData();
    body.append("file", file);

    try {
      setUploadingCover(true);
      const res = await fetch("/api/upload", { method: "POST", body });
      const data = await res.json();
      if (data.url) updateArticle("cover_image", data.url);
      else alert(data.error || "Erro no upload da imagem.");
    } catch (err) {
      alert("Erro no upload da imagem.");
    } finally {
      setUploadingCover(false);
    }
  };

  const saveArticle = async (status?: "draft" | "published") => {
    if (!article) return;
    if (!article.title_pt.trim()) return alert("Informe o título.");
    if (!article.slug.trim()) return alert("Informe o slug.");

    const contentPt = isBlockMode ? JSON.stringify(blocks, null, 2) : rawContent;
    if (!contentPt.trim()) return alert("O conteúdo não pode ficar vazio.");

    setSaving(true);
    try {
      const res = await fetch(`/api/articles/${article.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...article,
          status: status || article.status || "published",
          content_pt: contentPt,
          is_featured: !!article.is_featured
        })
      });

      const data = await res.json();
      if (!res.ok) {
        alert(data.error || "Erro ao salvar artigo.");
        return;
      }

      router.push("/admin");
    } catch (err) {
      alert("Erro ao salvar artigo.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
        <p>Carregando editor...</p>
      </div>
    );
  }

  if (error || !article) {
    return (
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
        <p style={{ color: "#ef4444", marginBottom: 24 }}>{error || "Artigo não encontrado."}</p>
        <Link href="/admin" className="btn btn-secondary">
          <ArrowLeft size={18} /> Voltar
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 960, margin: "0 auto", padding: "40px 24px 80px" }}>
      <div className="admin-header">
        <div>
          <Link href="/admin" style={{ color: "var(--primary)", fontWeight: 600, display: "inline-flex", gap: 8, alignItems: "center", marginBottom: 16 }}>
            <ArrowLeft size={18} /> Voltar para artigos
          </Link>
          <h1>Editar Artigo</h1>
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          <button className="btn btn-secondary" onClick={() => saveArticle("draft")} disabled={saving}>
            {saving ? <Loader2 size={18} /> : <Save size={18} />} Salvar rascunho
          </button>
          <button className="btn btn-primary" onClick={() => saveArticle("published")} disabled={saving}>
            {saving ? <Loader2 size={18} /> : <Save size={18} />} Publicar
          </button>
        </div>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 32, marginBottom: 32 }}>
        <div className="form-group">
          <label>Título (H1)</label>
          <input
            value={article.title_pt}
            onChange={e => updateArticle("title_pt", e.target.value)}
            onBlur={() => {
              if (!article.slug) updateArticle("slug", makeSlug(article.title_pt));
            }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          <div className="form-group">
            <label>Slug</label>
            <input value={article.slug} onChange={e => updateArticle("slug", makeSlug(e.target.value))} />
          </div>
          <div className="form-group">
            <label>Categoria</label>
            <select value={article.category_id || ""} onChange={e => updateArticle("category_id", e.target.value)}>
              <option value="">Sem categoria</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>{category.name_pt}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Imagem de capa</label>
          {article.cover_image && (
            <div style={{ width: "100%", height: 260, position: "relative", borderRadius: 12, overflow: "hidden", marginBottom: 16, border: "1px solid var(--border)" }}>
              <Image src={article.cover_image} alt={article.cover_alt || article.title_pt} fill style={{ objectFit: "cover" }} />
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 12, alignItems: "center" }}>
            <input value={article.cover_image || ""} onChange={e => updateArticle("cover_image", e.target.value)} placeholder="/uploads/imagem.png ou URL" />
            <label className="btn btn-secondary" style={{ whiteSpace: "nowrap" }}>
              {uploadingCover ? <Loader2 size={18} /> : <ImagePlus size={18} />} Upload
              <input type="file" accept="image/*" hidden onChange={handleImageUpload} />
            </label>
          </div>
        </div>

        <div className="form-group">
          <label>Alt-text da imagem</label>
          <input value={article.cover_alt || ""} onChange={e => updateArticle("cover_alt", e.target.value)} placeholder="Descreva a imagem para SEO e acessibilidade" />
        </div>

        <label style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
          <input
            type="checkbox"
            checked={!!article.is_featured}
            onChange={e => updateArticle("is_featured", e.target.checked)}
            style={{ width: "auto" }}
          />
          Destacar na home
        </label>
      </div>

      <div style={{ background: "var(--card-bg)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 32 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 16, alignItems: "center", marginBottom: 24 }}>
          <div>
            <h2 style={{ marginBottom: 4 }}>Conteúdo</h2>
            <p style={{ color: "var(--text-muted)", margin: 0 }}>
              {isBlockMode ? "Editando blocos inteligentes do artigo." : "Editando conteúdo em Markdown ou JSON bruto."}
            </p>
          </div>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              if (isBlockMode) {
                setRawContent(JSON.stringify(blocks, null, 2));
                setBlocks(null);
              } else {
                const parsed = parseBlocks(rawContent);
                if (!parsed) return alert("Este conteúdo não é um JSON válido de blocos.");
                setBlocks(parsed);
              }
            }}
          >
            {isBlockMode ? "Editar JSON bruto" : "Voltar para blocos"}
          </button>
        </div>

        {isBlockMode && blocks ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {blocks.map((block, index) => (
              <section key={`${block.type}-${index}`} style={{ border: "1px solid var(--border)", borderRadius: 12, padding: 24 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div className="form-group">
                    <label>Nome do bloco</label>
                    <input value={block.title} onChange={e => updateBlock(index, { title: e.target.value })} />
                  </div>
                  <div className="form-group">
                    <label>Tipo</label>
                    <input value={block.type} onChange={e => updateBlock(index, { type: makeSlug(e.target.value).replace(/-/g, "_") })} />
                  </div>
                </div>

                {block.faqs ? (
                  <div>
                    <label style={{ display: "block", marginBottom: 12, fontWeight: 600 }}>Perguntas frequentes</label>
                    {block.faqs.map((faq, faqIndex) => (
                      <div key={faqIndex} style={{ border: "1px solid var(--border)", borderRadius: 8, padding: 16, marginBottom: 16 }}>
                        <div className="form-group">
                          <label>Pergunta</label>
                          <input value={faq.q} onChange={e => updateFaq(index, faqIndex, "q", e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>Resposta</label>
                          <textarea rows={4} value={faq.a} onChange={e => updateFaq(index, faqIndex, "a", e.target.value)} />
                        </div>
                        <button type="button" className="btn btn-secondary" style={{ color: "#ef4444" }} onClick={() => removeFaq(index, faqIndex)}>
                          <Trash2 size={16} /> Remover pergunta
                        </button>
                      </div>
                    ))}
                    <button type="button" className="btn btn-secondary" onClick={() => addFaq(index)}>
                      <Plus size={16} /> Adicionar pergunta
                    </button>
                  </div>
                ) : (
                  <div className="form-group">
                    <label>Conteúdo do bloco</label>
                    <textarea
                      rows={10}
                      value={block.content || ""}
                      onChange={e => updateBlock(index, { content: e.target.value })}
                    />
                  </div>
                )}
              </section>
            ))}
          </div>
        ) : (
          <textarea
            rows={28}
            value={rawContent}
            onChange={e => setRawContent(e.target.value)}
            style={{ fontFamily: "monospace", lineHeight: 1.6 }}
          />
        )}
      </div>
    </div>
  );
}

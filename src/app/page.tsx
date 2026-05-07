import Image from "next/image";
import Link from "next/link";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { formatArticleTitle } from "@/lib/text";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }: { searchParams: { lang?: string, category?: string } }) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const params = await searchParams;
  const lang = params.lang === "en" ? "en" : "pt";
  const categorySlug = params.category;
  const isEn = lang === "en";

  const { data: articlesData, error: articlesError } = await supabase
    .from('articles')
    .select('id, slug, title_pt, title_en, created_at, content_pt, content_en, cover_image, cover_alt, is_featured, category_id')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  let allArticles = articlesData || [];

  if (articlesError) {
    // Fallback se a coluna status ainda não existir
    const { data: fallbackData } = await supabase
      .from('articles')
      .select('id, slug, title_pt, title_en, created_at, content_pt, content_en, cover_image, cover_alt, is_featured, category_id')
      .order('created_at', { ascending: false });
    allArticles = fallbackData || [];
  }
  
  const { data: categoriesData } = await supabase
    .from('categories')
    .select('id, name_pt, name_en, slug');
  const categories = categoriesData || [];
  const mainCategorySlugs = [
    'nutricao-fitness',
    'treino-fitness',
    'mentalidade-habitos',
    'suplementacao-recuperacao'
  ];
  const sidebarCategories = categories
    .filter(cat => mainCategorySlugs.includes(cat.slug))
    .sort((a, b) => mainCategorySlugs.indexOf(a.slug) - mainCategorySlugs.indexOf(b.slug));

  let displayedArticles = allArticles;
  let categoryName = "";

  if (categorySlug) {
    const category = categories.find(c => c.slug === categorySlug);
    if (category) {
      displayedArticles = allArticles.filter(a => a.category_id === category.id);
      categoryName = isEn && category.name_en ? category.name_en : category.name_pt;
    }
  }

  let featuredArticles: any[] = [];
  let regularArticles: any[] = [];

  if (categorySlug) {
    // Se estivermos em uma categoria, mostra TODOS os artigos na lista comum
    regularArticles = displayedArticles;
  } else {
    // Na home principal, separa os destaques
    featuredArticles = displayedArticles.filter(a => a.is_featured === 1).slice(0, 3);
    const featuredIds = featuredArticles.map(a => a.id);
    regularArticles = displayedArticles.filter(a => !featuredIds.includes(a.id));
  }

  return (
    <>
      <div className="hero" style={{ marginBottom: categorySlug ? 48 : 64 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 24 }}>
          <div className="lang-toggle">
            <Link href={`?lang=pt${categorySlug ? '&category='+categorySlug : ''}`}>
              <button className={!isEn ? "active" : ""}>PT-BR</button>
            </Link>
            <Link href={`?lang=en${categorySlug ? '&category='+categorySlug : ''}`}>
              <button className={isEn ? "active" : ""}>EN-US</button>
            </Link>
          </div>
        </div>
        {categorySlug ? (
          <h1>{categoryName}</h1>
        ) : (
          <>
            <h1>{isEn ? "Transform Your Body and Mind" : "Transforme seu Corpo e Mente"}</h1>
            <p>
              {isEn 
                ? "Discover science-based strategies for muscle building, fat loss, and living a healthier lifestyle." 
                : "Descubra estratégias baseadas em ciência para ganho de massa, perda de gordura e uma vida mais saudável."}
            </p>
          </>
        )}
      </div>

      {!categorySlug && featuredArticles.length > 0 && (
        <div className="bento-grid">
          {featuredArticles[0] && (
            <Link href={`/blog/${featuredArticles[0].slug}?lang=${lang}`} className="featured-main">
              {featuredArticles[0].cover_image && (
                <Image src={featuredArticles[0].cover_image} alt={featuredArticles[0].cover_alt || (isEn && featuredArticles[0].title_en ? featuredArticles[0].title_en : featuredArticles[0].title_pt)} fill style={{ objectFit: 'cover', zIndex: 0 }} />
              )}
              <h2>{formatArticleTitle(isEn && featuredArticles[0].title_en ? featuredArticles[0].title_en : featuredArticles[0].title_pt, lang)}</h2>
              <p>{new Date(featuredArticles[0].created_at).toLocaleDateString(isEn ? 'en-US' : 'pt-BR')}</p>
            </Link>
          )}
          <div className="featured-side">
            {featuredArticles.slice(1, 3).map(article => (
              <Link href={`/blog/${article.slug}?lang=${lang}`} key={article.id} className="featured-side-item">
                {article.cover_image && (
                  <Image src={article.cover_image} alt={article.cover_alt || (isEn && article.title_en ? article.title_en : article.title_pt)} fill style={{ objectFit: 'cover', zIndex: 0 }} />
                )}
                <h2>{formatArticleTitle(isEn && article.title_en ? article.title_en : article.title_pt, lang)}</h2>
              </Link>
            ))}
          </div>
        </div>
      )}

      <div className="layout-with-sidebar">
        <div>
          {categorySlug && <h2 style={{ marginBottom: 32, fontSize: '2rem' }}>Últimos Artigos</h2>}
          <div className="article-grid">
            {regularArticles.map((article) => {
              const title = formatArticleTitle(isEn && article.title_en ? article.title_en : article.title_pt, lang);
              const content = isEn && article.content_en ? article.content_en : article.content_pt;
              let excerpt = "";
              if (content) {
                if (content.trim().startsWith('[')) {
                   try {
                     const blocks = JSON.parse(content);
                     const textBlock = blocks.find((b: any) => (b.type === 'quick_answer' || b.type === 'intro') && b.content) || blocks.find((b: any) => b.content) || {};
                     const cleanText = (textBlock.content || "").replace(/<[^>]*>?/gm, '').replace(/[*_#]/g, '');
                     excerpt = cleanText.substring(0, 150) + "...";
                   } catch(e) {}
                } else {
                   excerpt = content.replace(/[*_#>`]/g, '').substring(0, 150) + "...";
                }
              }

              return (
                <Link href={`/blog/${article.slug}?lang=${lang}`} key={article.id} className="article-card" style={{ padding: 0, overflow: 'hidden' }}>
                  {article.cover_image && (
                    <div style={{ width: '100%', height: 240, position: 'relative' }}>
                      <Image src={article.cover_image} alt={article.cover_alt || title} fill style={{ objectFit: 'cover' }} />
                    </div>
                  )}
                  <div style={{ padding: 32 }}>
                    <h2 style={{ fontSize: '1.5rem', marginBottom: 12 }}>{title}</h2>
                    <p style={{ marginBottom: 24 }}>{excerpt}</p>
                    <div className="article-meta">
                      <span>{new Date(article.created_at).toLocaleDateString(isEn ? 'en-US' : 'pt-BR', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </Link>
              );
            })}
            {regularArticles.length === 0 && (
              <div style={{ padding: '64px 0', color: 'var(--text-muted)' }}>
                <p>{isEn ? "No articles published yet." : "Nenhum artigo publicado ainda."}</p>
              </div>
            )}
          </div>
        </div>

        <aside className="sidebar">
          <h3>{isEn ? "Categories" : "Categorias Populares"}</h3>
          <div>
            {sidebarCategories.map(cat => {
              // Optionally count articles
              const count = allArticles.filter(a => a.category_id === cat.id).length;
              return (
                <Link href={`/?category=${cat.slug}&lang=${lang}`} key={cat.id} className="category-pill">
                  <span>{isEn && cat.name_en ? cat.name_en : cat.name_pt}</span>
                  <span style={{ background: 'var(--background)', padding: '2px 8px', borderRadius: 999, fontSize: '0.8rem' }}>{count}</span>
                </Link>
              );
            })}
            {categories.length === 0 && <p style={{ color: 'var(--text-muted)' }}>Nenhuma categoria.</p>}
          </div>
        </aside>
      </div>
    </>
  );
}

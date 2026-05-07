import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar, Info, AlertTriangle, CheckCircle2, ChevronRight, BookOpen } from "lucide-react";
import type { Metadata } from "next";
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { marked } from "marked";
import Image from "next/image";
import { absoluteUrl, organizationName, siteName, siteUrl } from "@/lib/site";
import { formatArticleTitle } from "@/lib/text";

export const dynamic = "force-dynamic";

type BlogPostProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string | string[] }>;
};

type FaqItem = {
  q: string;
  a: string;
};

type ArticleBlock = {
  type?: string;
  title?: string;
  content?: string;
  isHtml?: boolean;
  faqs?: FaqItem[] | null;
};

function stripMarkup(value: string) {
  return value
    .replace(/<[^>]*>?/gm, " ")
    .replace(/[*_#>`[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function parseBlocks(content: string | null | undefined): ArticleBlock[] {
  if (!content || !content.trim().startsWith("[")) return [];

  try {
    const blocks = JSON.parse(content);
    return Array.isArray(blocks) ? blocks : [];
  } catch {
    return [];
  }
}

function getPlainArticleText(content: string | null | undefined) {
  const blocks = parseBlocks(content);

  if (blocks.length > 0) {
    return stripMarkup(
      blocks
        .map((block) => {
          const faqText = block.faqs?.map((faq) => `${faq.q} ${faq.a}`).join(" ") || "";
          return `${block.title || ""} ${block.content || ""} ${faqText}`;
        })
        .join(" ")
    );
  }

  return stripMarkup(content || "");
}

function getMetaDescription(content: string | null | undefined) {
  const text = getPlainArticleText(content);
  if (!text) return "";
  return text.length > 157 ? `${text.substring(0, 157)}...` : text;
}

function getReadingTime(content: string | null | undefined, lang: "pt" | "en") {
  const words = getPlainArticleText(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return lang === "en" ? `${minutes} min read` : `Leitura: ${minutes} min`;
}

function getArticleImage(image: string | null | undefined) {
  return image ? absoluteUrl(image) : absoluteUrl("/logo.png");
}

function getReferenceLines(blocks: ArticleBlock[]) {
  const referenceBlock = blocks.find((block) => block.type === "references" && block.content);
  if (!referenceBlock?.content) return [];

  return referenceBlock.content
    .split(/\n+/)
    .map((line) => stripMarkup(line).replace(/^[-\d.]+\s*/, ""))
    .filter(Boolean);
}

const englishUnavailableContent = `## English version coming soon

This article is not available in English yet. We are preparing a complete English version written specifically for English readers, and it will be published soon.

In the meantime, you can switch back to the Portuguese version to read the full guide.`;

const uiCopy = {
  pt: {
    home: "Inicio",
    reading: "Leitura: 8 min",
    updated: "Atualizado",
    educational: "Conteudo Educativo",
    summary: "Resumo em 30 segundos",
    toc: "Neste artigo:",
    faq: "Tire suas duvidas",
    related: "Proximos passos recomendados",
    readLater: "Leia depois",
    readArticle: "Acessar artigo",
    switchLabel: "Idioma do artigo",
    portuguese: "PT",
    english: "EN",
    preTitle: {
      intro: "Contexto",
      causes: "Diagnostico rapido",
      exercise_routine: "Passo a passo",
      references: "Ciencia",
      default: "Guia pratico",
    },
  },
  en: {
    home: "Home",
    reading: "Read: 8 min",
    updated: "Updated",
    educational: "Educational Content",
    summary: "30-second summary",
    toc: "In this article:",
    faq: "Questions",
    related: "Recommended next steps",
    readLater: "Read later",
    readArticle: "Read article",
    switchLabel: "Article language",
    portuguese: "PT",
    english: "EN",
    preTitle: {
      intro: "Context",
      causes: "Quick diagnosis",
      exercise_routine: "Step by step",
      references: "Science",
      default: "Practical guide",
    },
  },
};

function resolveLang(searchParams: { lang?: string | string[] }) {
  const lang = Array.isArray(searchParams.lang) ? searchParams.lang[0] : searchParams.lang;
  return lang === "en" ? "en" : "pt";
}

function hasUsableEnglish(article: any) {
  const content = typeof article.content_en === "string" ? article.content_en.trim() : "";
  return Boolean(
    article.title_en?.trim() &&
    content.length >= 600 &&
    !/coming soon|stay tuned|not available in english yet/i.test(content)
  );
}

function getLocalizedTitle(article: any, isEn: boolean, hasEnglish: boolean) {
  return formatArticleTitle(
    isEn && hasEnglish && article.title_en ? article.title_en : article.title_pt,
    isEn ? "en" : "pt"
  );
}

function getLocalizedContent(article: any, isEn: boolean, hasEnglish: boolean) {
  if (isEn) return hasEnglish ? article.content_en : englishUnavailableContent;
  return article.content_pt;
}

export async function generateMetadata({ params, searchParams }: BlogPostProps): Promise<Metadata> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const lang = resolveLang(resolvedSearchParams);
  const isEn = lang === "en";

  const { data } = await supabase.from('articles').select('slug, title_pt, title_en, content_pt, content_en, cover_image, cover_alt, created_at').eq('slug', resolvedParams.slug).single();
  const article = data as any;
  if (!article) return { title: "Not Found" };

  const hasEnglish = hasUsableEnglish(article);
  const title = getLocalizedTitle(article, isEn, hasEnglish);
  const content = getLocalizedContent(article, isEn, hasEnglish);
  const description = getMetaDescription(content);
  const canonicalPath = `/blog/${article.slug}`;
  const image = getArticleImage(article.cover_image);

  return {
    title: `${title} | Saúde em Foco`,
    description,
    alternates: {
      canonical: canonicalPath,
      languages: {
        "pt-BR": canonicalPath,
        "en-US": `${canonicalPath}?lang=en`,
      },
    },
    openGraph: {
      title,
      description,
      url: absoluteUrl(canonicalPath),
      siteName,
      images: [
        {
          url: image,
          alt: article.cover_alt || title,
        },
      ],
      locale: isEn ? "en_US" : "pt_BR",
      type: "article",
      publishedTime: article.created_at || undefined,
      authors: [organizationName],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

// --- Premium Block Components ---
const SectionHeader = ({ preTitle, title }: { preTitle: string, title: string }) => (
  <div style={{ margin: '56px 0 32px 0' }}>
    <p style={{ margin: '0 0 8px 0', color: 'var(--primary)', fontSize: '1rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.05em' }}>
      {preTitle}
    </p>
    <h2 style={{ margin: 0, fontSize: '2.5rem', lineHeight: 1.2, color: 'var(--foreground)' }}>
      {title}
    </h2>
  </div>
);

export default async function BlogPost({ 
  params,
  searchParams 
}: BlogPostProps) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const { slug } = resolvedParams;
  const lang = resolveLang(resolvedSearchParams);
  const isEn = lang === "en";
  const copy = uiCopy[lang];

  const { data } = await supabase
    .from('articles')
    .select(`
      *,
      categories (
        name_pt,
        name_en,
        slug
      )
    `)
    .eq('slug', slug)
    .single();

  let article: any = null;
  if (data) {
    article = {
      ...data,
      cat_name_pt: data.categories?.name_pt,
      cat_name_en: data.categories?.name_en,
      cat_slug: data.categories?.slug
    };
  }

  if (!article) notFound();

  const hasEnglish = hasUsableEnglish(article);
  const title = getLocalizedTitle(article, isEn, hasEnglish);
  const coverAlt = article.cover_alt || title;
  const catName = isEn && article.cat_name_en ? article.cat_name_en : article.cat_name_pt;
  const contentRaw = getLocalizedContent(article, isEn, hasEnglish);
  const readingTime = getReadingTime(contentRaw, lang);
  
  let isJsonBlocks = false;
  let blocksArray: ArticleBlock[] = [];
  try {
    if (contentRaw && contentRaw.trim().startsWith('[')) {
      blocksArray = JSON.parse(contentRaw);
      isJsonBlocks = Array.isArray(blocksArray);
    }
  } catch (e) {
    // legacy markdown
  }

  const legacyHtml = !isJsonBlocks ? marked(contentRaw || "") : "";
  
  // Extrai o Quick Answer para o "Resumo" do artigo, se existir
  const quickAnswerBlock = blocksArray.find(b => b.type === 'quick_answer');
  const otherBlocks = blocksArray.filter(b => b.type !== 'quick_answer');

  const { data: relatedCatData } = await supabase
    .from('articles')
    .select('id, slug, title_pt, title_en, cover_image, cover_alt')
    .eq('category_id', article.category_id)
    .eq('status', 'published')
    .neq('id', article.id)
    .order('created_at', { ascending: false })
    .limit(2);

  let related = relatedCatData || [];

  if (related.length === 0) {
    const { data: relatedAnyData } = await supabase
      .from('articles')
      .select('id, slug, title_pt, title_en, cover_image, cover_alt')
      .eq('status', 'published')
      .neq('id', article.id)
      .order('created_at', { ascending: false })
      .limit(2);
    related = relatedAnyData || [];
  }

  const canonicalUrl = absoluteUrl(`/blog/${slug}`);
  const articleDescription = getMetaDescription(contentRaw);
  const articleImage = getArticleImage(article.cover_image);
  const faqBlocks = blocksArray.filter((block) => block.type === "faq" && block.faqs?.length);
  const faqItems = faqBlocks.flatMap((block) => block.faqs || []);
  const citations = getReferenceLines(blocksArray);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        name: organizationName,
        url: siteUrl,
        logo: absoluteUrl("/logo.png"),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Inicio",
            item: siteUrl,
          },
          ...(catName
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: catName,
                  item: absoluteUrl(`/?category=${article.cat_slug || article.category_id}`),
                },
              ]
            : []),
          {
            "@type": "ListItem",
            position: catName ? 3 : 2,
            name: title,
            item: canonicalUrl,
          },
        ],
      },
      {
        "@type": "BlogPosting",
        "@id": `${canonicalUrl}#article`,
        headline: title,
        description: articleDescription,
        image: articleImage,
        datePublished: article.created_at,
        dateModified: article.created_at,
        author: {
          "@type": "Organization",
          name: organizationName,
          url: siteUrl,
        },
        publisher: {
          "@id": `${siteUrl}/#organization`,
        },
        mainEntityOfPage: canonicalUrl,
        inLanguage: isEn ? "en-US" : "pt-BR",
        articleSection: catName || undefined,
        citation: citations.length > 0 ? citations : undefined,
      },
      ...(faqItems.length > 0
        ? [
            {
              "@type": "FAQPage",
              "@id": `${canonicalUrl}#faq`,
              mainEntity: faqItems.map((faq) => ({
                "@type": "Question",
                name: stripMarkup(faq.q),
                acceptedAnswer: {
                  "@type": "Answer",
                  text: stripMarkup(faq.a),
                },
              })),
            },
          ]
        : []),
    ],
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        /* Premium CSS for Markdown Elements scoped to blocks */
        .block-causes ul, .block-pain_location_map ul, .block-movement_adaptations ul {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 16px;
          padding: 0;
        }
        .block-causes li, .block-pain_location_map li, .block-movement_adaptations li {
          background: var(--card-bg);
          padding: 20px;
          border-radius: 12px;
          border: 1px solid var(--border);
          list-style: none;
          margin: 0;
          box-shadow: 0 2px 8px rgba(0,0,0,0.02);
        }
        .block-causes li strong, .block-pain_location_map li strong {
          display: block;
          font-size: 1.1rem;
          color: var(--primary);
          margin-bottom: 8px;
        }
        
        .block-exercise_routine ul {
          display: flex;
          flex-direction: column;
          gap: 16px;
          padding: 0;
        }
        .block-exercise_routine li {
          background: var(--card-bg);
          padding: 24px;
          border-radius: 12px;
          border-left: 4px solid var(--primary);
          list-style: none;
          margin: 0;
          box-shadow: 0 4px 12px rgba(0,0,0,0.04);
        }
        
        .block-what_to_avoid ul {
          padding-left: 20px;
        }
        .block-what_to_avoid li {
          margin-bottom: 12px;
        }
        .block-what_to_avoid li::marker {
          color: #ef4444;
          font-weight: bold;
        }

        .block-references {
          background: #f8fafc;
          border: 1px solid var(--border);
          border-radius: 12px;
          padding: 24px;
          font-size: 1rem;
          line-height: 1.65;
        }

        .block-references p:last-child,
        .block-references ul:last-child,
        .block-references ol:last-child {
          margin-bottom: 0;
        }
        
        .faq-details {
          background: var(--card-bg);
          border: 1px solid var(--border);
          border-radius: 12px;
          overflow: hidden;
          margin-bottom: 12px;
          transition: all 0.2s;
        }
        .faq-details[open] {
          border-color: var(--primary);
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
        }
      `}} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article lang={isEn ? "en" : "pt-BR"} style={{ maxWidth: 860, margin: '0 auto', paddingTop: 40, paddingBottom: 80 }}>
        
        {/* Premium Hero */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', flexWrap: 'wrap', marginBottom: 24, fontSize: '0.875rem', color: 'var(--text-muted)' }}>
            <Link href="/" style={{ color: 'var(--primary)', fontWeight: 600 }}>Início</Link>
            <ChevronRight size={14} />
            {catName && (
              <>
                <Link href={`/?category=${article.cat_slug || article.category_id}`} style={{ color: 'var(--primary)', fontWeight: 600 }}>{catName}</Link>
                <ChevronRight size={14} />
              </>
            )}
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Clock size={14} /> {readingTime}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><Calendar size={14} /> Atualizado: {new Date(article.created_at).toLocaleDateString('pt-BR')}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, background: '#f0fdf4', color: '#166534', padding: '4px 8px', borderRadius: 6, fontWeight: 600 }}><BookOpen size={14} /> Conteúdo Educativo</span>
          </div>

          <nav aria-label={copy.switchLabel} style={{ display: 'inline-flex', gap: 4, border: '1px solid var(--border)', borderRadius: 999, padding: 4, background: 'var(--card-bg)', marginBottom: 24 }}>
            <Link href={`/blog/${slug}?lang=pt`} style={{ padding: '6px 12px', borderRadius: 999, fontWeight: 800, color: !isEn ? 'white' : 'var(--primary)', background: !isEn ? 'var(--primary)' : 'transparent', textDecoration: 'none' }}>{copy.portuguese}</Link>
            <Link href={`/blog/${slug}?lang=en`} style={{ padding: '6px 12px', borderRadius: 999, fontWeight: 800, color: isEn ? 'white' : 'var(--primary)', background: isEn ? 'var(--primary)' : 'transparent', textDecoration: 'none' }}>{copy.english}</Link>
          </nav>

          <h1 style={{ fontSize: '3rem', lineHeight: 1.1, marginBottom: 24, color: 'var(--foreground)' }}>{title}</h1>
          
          {quickAnswerBlock && (
            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: 1.6, marginBottom: 32 }}>
              {/* Omitimos marcações HTML cruas do excerpt, apenas pegamos as primeiras palavras */}
              {(quickAnswerBlock.content || "").replace(/<[^>]*>?/gm, '').substring(0, 200)}...
            </p>
          )}
        </div>

        {article.cover_image && (
          <div style={{ width: '100%', height: 460, position: 'relative', borderRadius: 24, overflow: 'hidden', marginBottom: 48, boxShadow: '0 12px 32px rgba(0,0,0,0.1)' }}>
            <Image src={article.cover_image} alt={coverAlt} fill style={{ objectFit: 'cover' }} priority />
          </div>
        )}

        {/* Resumo do Artigo (Quick Answer como Card Destaque) */}
        {isJsonBlocks && quickAnswerBlock && (
          <div style={{ margin: '40px 0 56px 0', padding: 40, border: '1px solid var(--border)', background: 'linear-gradient(135deg, var(--card-bg), var(--background))', borderRadius: 24, boxShadow: '0 8px 24px rgba(0,0,0,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20, color: 'var(--primary)' }}>
              <Info size={28} />
              <h3 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 800 }}>Resumo em 30 segundos</h3>
            </div>
            <div dangerouslySetInnerHTML={{ __html: quickAnswerBlock.isHtml ? (quickAnswerBlock.content || "") : marked(quickAnswerBlock.content || "") }} style={{ fontSize: '1.25rem', lineHeight: 1.8 }} />
          </div>
        )}

        <div className="article-content">
          {isJsonBlocks ? (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              
              {/* Sumário Clicável (Table of Contents) */}
              {otherBlocks.length > 0 && (
                <div style={{ background: 'var(--card-bg)', padding: 32, borderRadius: 20, border: '1px solid var(--border)', marginBottom: 56 }}>
                  <p style={{ fontWeight: 800, marginBottom: 20, fontSize: '1.25rem' }}>Neste artigo:</p>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {otherBlocks.map((b, i) => (
                      <li key={i} style={{ margin: 0 }}>
                        <a href={`#block-${i}`} style={{ color: 'var(--primary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, fontSize: '1.15rem' }}>
                          <span style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: 600 }}>0{i+1}.</span> <span style={{ fontWeight: 500 }}>{b.title}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Renderização dos Blocos Dinâmicos */}
              {otherBlocks.map((block: any, i: number) => {
                 if (!block.content && !block.faqs) return null;
                 
                 const sectionId = `block-${i}`;

                 // Warning box (Red Flags / O que evitar)
                 if (block.type === 'red_flags' || block.type === 'what_to_avoid') {
                   return (
                     <div key={i} id={sectionId} style={{ background: '#fef2f2', border: '1px solid #fecaca', padding: 32, borderRadius: 16, color: '#991b1b', marginBottom: 48 }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                         <AlertTriangle size={28} />
                         <h2 style={{ fontSize: '1.75rem', color: '#991b1b', margin: 0 }}>{block.title}</h2>
                       </div>
                       <div className={`block-${block.type}`} dangerouslySetInnerHTML={{ __html: block.isHtml ? (block.content || "") : marked(block.content || "") }} />
                     </div>
                   );
                 }

                 // Checklists / Who is for
                 if (block.type === 'who_is_for' || block.type === 'checklist') {
                   return (
                     <div key={i} id={sectionId} style={{ background: '#f0fdfa', border: '1px solid #ccfbf1', padding: 32, borderRadius: 16, color: '#0f766e', marginBottom: 48 }}>
                       <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
                         <CheckCircle2 size={28} />
                         <h2 style={{ fontSize: '1.75rem', color: '#0f766e', margin: 0 }}>{block.title}</h2>
                       </div>
                       <div className={`block-${block.type}`} dangerouslySetInnerHTML={{ __html: block.isHtml ? (block.content || "") : marked(block.content || "") }} />
                     </div>
                   );
                 }

                 // FAQ Accordion
                 if (block.type === 'faq' && block.faqs) {
                   return (
                     <div key={i} id={sectionId} style={{ marginBottom: 48 }}>
                       <SectionHeader preTitle="Tire suas dúvidas" title={block.title} />
                       <div style={{ display: 'flex', flexDirection: 'column' }}>
                         {block.faqs.map((faq: any, idx: number) => (
                           <details key={idx} className="faq-details">
                             <summary style={{ padding: '24px', fontSize: '1.15rem', fontWeight: 600, cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                               {faq.q}
                               <span style={{ fontSize: '1.5rem', color: 'var(--primary)', lineHeight: 0 }}>+</span>
                             </summary>
                             <div style={{ padding: '0 24px 24px 24px', fontSize: '1.05rem', color: 'var(--text-muted)' }}>
                               <div dangerouslySetInnerHTML={{ __html: marked(faq.a) }} />
                             </div>
                           </details>
                         ))}
                       </div>
                     </div>
                   );
                 }

                 // Standard Blocks with Specific Pre-Titles and Grids
                 let preTitle = "Guia Prático";
                 if (block.type === 'intro') preTitle = "Contexto";
                 if (block.type === 'causes') preTitle = "Diagnóstico Rápido";
                 if (block.type === 'exercise_routine') preTitle = "Passo a passo";
                 if (block.type === 'references') preTitle = "Ciência";

                 return (
                   <div key={i} id={sectionId} style={{ marginBottom: 48 }}>
                     <SectionHeader preTitle={preTitle} title={block.title} />
                     <div className={`block-${block.type}`} dangerouslySetInnerHTML={{ __html: block.isHtml ? (block.content || "") : marked(block.content || "") }} />
                   </div>
                 );
              })}
            </div>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: legacyHtml }} />
          )}
        </div>

        <hr style={{ margin: '64px 0', borderColor: 'var(--border)' }} />

        {/* Premium Related Articles */}
        <div className="related-articles">
          <h3 style={{ fontSize: '1.75rem', marginBottom: 32, color: 'var(--foreground)' }}>{isEn ? "Keep Reading" : "Próximos Passos recomendados"}</h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 24 }}>
            {related.map(rel => {
                const relTitle = formatArticleTitle(isEn && rel.title_en ? rel.title_en : rel.title_pt, lang);
                return (
                  <Link href={`/blog/${rel.slug}?lang=${lang}`} key={rel.id} style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', transition: 'all 0.2s', background: 'var(--card-bg)' }} className="related-card-premium">
                    {rel.cover_image && (
                      <div style={{ width: '100%', height: 200, position: 'relative' }}>
                        <Image src={rel.cover_image} alt={rel.cover_alt || relTitle} fill style={{ objectFit: 'cover' }} />
                        <div style={{ position: 'absolute', top: 16, left: 16, background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: 999, fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase' }}>Leia Depois</div>
                      </div>
                    )}
                    <div style={{ padding: 24 }}>
                      <h4 style={{ fontSize: '1.25rem', margin: '0 0 8px 0', color: 'var(--foreground)' }}>{relTitle}</h4>
                      <p style={{ margin: 0, color: 'var(--primary)', fontWeight: 600, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: 4 }}>
                        Acessar artigo <ChevronRight size={16} />
                      </p>
                    </div>
                  </Link>
                );
              })}
          </div>
        </div>
      </article>
    </>
  );
}

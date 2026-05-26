import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FavoriteCategoryButton } from "@/components/ReadingMemory";
import { getAllArticles, getCategories, getCategoryBySlug } from "@/lib/content";
import { getContentExcerpt } from "@/lib/content-utils";
import { absoluteUrl, siteName } from "@/lib/site";
import { formatArticleTitle } from "@/lib/text";

export const dynamic = "force-dynamic";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ lang?: string }>;
};

function getCategoryHref(slug: string, lang: "pt" | "en") {
  return `/categoria/${slug}?lang=${lang}`;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: "Categoria não encontrada" };

  const categoryName = category.name_pt || slug;
  const canonicalPath = `/categoria/${category.slug}`;

  return {
    title: `${categoryName} | ${siteName}`,
    description: `Artigos da categoria ${categoryName} no Saúde em Foco.`,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${categoryName} | ${siteName}`,
      description: `Artigos da categoria ${categoryName} no Saúde em Foco.`,
      url: absoluteUrl(canonicalPath),
      siteName,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const [{ slug }, resolvedSearchParams] = await Promise.all([params, searchParams]);
  const lang = resolvedSearchParams.lang === "en" ? "en" : "pt";
  const isEn = lang === "en";

  const [category, categories, allArticles] = await Promise.all([
    getCategoryBySlug(slug),
    getCategories(),
    getAllArticles(),
  ]);

  if (!category) notFound();

  const articles = allArticles.filter((article) => article.category_id === category.id);
  const categoryName = isEn && category.name_en ? category.name_en : category.name_pt || category.slug;
  const mainCategorySlugs = [
    "nutricao-fitness",
    "treino-fitness",
    "mentalidade-habitos",
    "suplementacao-recuperacao",
  ];
  const sidebarCategories = categories
    .filter((cat) => mainCategorySlugs.includes(cat.slug))
    .sort((a, b) => mainCategorySlugs.indexOf(a.slug) - mainCategorySlugs.indexOf(b.slug));

  const canonicalUrl = absoluteUrl(`/categoria/${category.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: categoryName,
        description: `Artigos da categoria ${categoryName} no Saúde em Foco.`,
        inLanguage: isEn ? "en-US" : "pt-BR",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Início",
            item: absoluteUrl("/"),
          },
          {
            "@type": "ListItem",
            position: 2,
            name: categoryName,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="hero" style={{ marginBottom: 48 }}>
        <h1>{categoryName}</h1>
        <p>
          {isEn
            ? `Explore the latest articles about ${categoryName.toLowerCase()}.`
            : `Explore os artigos mais recentes sobre ${categoryName.toLowerCase()}.`}
        </p>
      </div>

      <div className="layout-with-sidebar">
        <div>
          <h2 style={{ marginBottom: 32, fontSize: "2rem" }}>{isEn ? "Latest articles" : "Últimos artigos"}</h2>

          <div className="article-grid">
            {articles.map((article) => {
              const title = formatArticleTitle(isEn && article.title_en ? article.title_en : article.title_pt, lang);
              const content = isEn && article.content_en ? article.content_en : article.content_pt;
              const excerpt = getContentExcerpt(content);

              return (
                <Link
                  href={`/blog/${article.slug}?lang=${lang}`}
                  key={article.id}
                  className="article-card"
                  style={{ padding: 0, overflow: "hidden" }}
                >
                  {article.cover_image && (
                    <div style={{ width: "100%", height: 240, position: "relative" }}>
                      <Image src={article.cover_image} alt={article.cover_alt || title} fill style={{ objectFit: "cover" }} />
                    </div>
                  )}
                  <div style={{ padding: 32 }}>
                    <h2 style={{ fontSize: "1.5rem", marginBottom: 12 }}>{title}</h2>
                    <p style={{ marginBottom: 24 }}>{excerpt}</p>
                    <div className="article-meta">
                      <span>
                        {new Date(article.created_at || "").toLocaleDateString(isEn ? "en-US" : "pt-BR", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}

            {articles.length === 0 && (
              <div style={{ padding: "64px 0", color: "var(--text-muted)" }}>
                <p>{isEn ? "No articles published in this category yet." : "Nenhum artigo publicado nesta categoria ainda."}</p>
              </div>
            )}
          </div>
        </div>

        <aside className="sidebar">
          <h3>{isEn ? "Categories" : "Categorias Populares"}</h3>
          <div>
            {sidebarCategories.map((cat) => {
              const count = allArticles.filter((article) => article.category_id === cat.id).length;

              return (
                <div key={cat.id} className="category-preference-row">
                  <Link href={getCategoryHref(cat.slug, lang)} className="category-pill">
                    <span>{isEn && cat.name_en ? cat.name_en : cat.name_pt}</span>
                    <span
                      style={{
                        background: "var(--background)",
                        padding: "2px 8px",
                        borderRadius: 999,
                        fontSize: "0.8rem",
                      }}
                    >
                      {count}
                    </span>
                  </Link>
                  <FavoriteCategoryButton slug={cat.slug} label={cat.name_pt || cat.slug} />
                </div>
              );
            })}
          </div>
        </aside>
      </div>
    </>
  );
}

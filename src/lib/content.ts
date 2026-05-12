import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { defaultPages, defaultSiteSettings } from "./default-content";
import type { Article, Category, SitePage, SiteSettings, SitemapArticle } from "./content-types";

const hasSupabaseConfig = Boolean(
  process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
);

const categoryNameOverrides: Record<string, Pick<Category, "name_pt" | "name_en">> = {
  "nutricao-fitness": { name_pt: "Nutrição Fitness", name_en: "Fitness Nutrition" },
  "treino-fitness": { name_pt: "Treino Fitness", name_en: "Fitness Training" },
  "mentalidade-habitos": { name_pt: "Mentalidade e Hábitos", name_en: "Mindset and Habits" },
  "suplementacao-recuperacao": { name_pt: "Suplementação e Recuperação", name_en: "Supplements and Recovery" },
};

async function getSupabase() {
  if (!hasSupabaseConfig) return null;
  const cookieStore = await cookies();
  return createClient(cookieStore);
}

function normalizeCategory(category: Category): Category {
  const override = categoryNameOverrides[category.slug];
  return override ? { ...category, ...override } : category;
}

function attachCategory(article: Article, categoryById: Map<string, Category>): Article {
  const category = article.category_id ? categoryById.get(article.category_id) : undefined;

  if (!category) return article;

  return {
    ...article,
    cat_name_pt: category.name_pt,
    cat_name_en: category.name_en,
    cat_slug: category.slug,
    categories: {
      name_pt: category.name_pt,
      name_en: category.name_en,
      slug: category.slug,
    },
  };
}

async function withCategories(articles: Article[]) {
  const categories = await getCategories();
  const categoryById = new Map(categories.map((category) => [category.id, category]));
  return articles.map((article) => attachCategory(article, categoryById));
}

export async function getCategories(): Promise<Category[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase.from("categories").select("*").order("name_pt", { ascending: true });
    if (error) throw error;
    return (data || []).map(normalizeCategory);
  } catch (error) {
    console.error("Supabase categories fetch failed:", error);
    return [];
  }
}

export async function getAllArticles(): Promise<Article[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("articles")
      .select(
        "id, slug, title_pt, title_en, content_pt, content_en, cover_image, cover_alt, category_id, is_featured, status, created_at"
      )
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return withCategories(data || []);
  } catch (error) {
    console.error("Supabase articles fetch failed:", error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const supabase = await getSupabase();
  if (!supabase) return null;

  try {
    const { data, error } = await supabase
      .from("articles")
      .select(
        "id, slug, title_pt, title_en, content_pt, content_en, cover_image, cover_alt, category_id, is_featured, status, created_at"
      )
      .eq("slug", slug)
      .eq("status", "published")
      .single();
    if (error) throw error;
    const [article] = await withCategories(data ? [data] : []);
    return article || null;
  } catch (error) {
    console.error("Supabase article fetch failed:", error);
    return null;
  }
}

export async function getRelatedArticles(articleId: string, categoryId?: string | null): Promise<Article[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];

  try {
    let query = supabase
      .from("articles")
      .select(
        "id, slug, title_pt, title_en, content_pt, content_en, cover_image, cover_alt, category_id, is_featured, status, created_at"
      )
      .eq("status", "published")
      .neq("id", articleId)
      .order("created_at", { ascending: false })
      .limit(2);

    if (categoryId) query = query.eq("category_id", categoryId);

    const { data, error } = await query;
    if (error) throw error;
    if (data?.length) return withCategories(data);

    if (!categoryId) return [];

    const { data: latest, error: latestError } = await supabase
      .from("articles")
      .select(
        "id, slug, title_pt, title_en, content_pt, content_en, cover_image, cover_alt, category_id, is_featured, status, created_at"
      )
      .eq("status", "published")
      .neq("id", articleId)
      .order("created_at", { ascending: false })
      .limit(2);
    if (latestError) throw latestError;
    return withCategories(latest || []);
  } catch (error) {
    console.error("Supabase related articles fetch failed:", error);
    return [];
  }
}

export async function getSitemapArticles(): Promise<SitemapArticle[]> {
  const supabase = await getSupabase();
  if (!supabase) return [];

  try {
    const { data, error } = await supabase
      .from("articles")
      .select("slug, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error("Supabase sitemap fetch failed:", error);
    return [];
  }
}

export async function getSiteSettings(): Promise<SiteSettings> {
  return defaultSiteSettings;
}

export async function getSitePage(slug: string): Promise<SitePage | null> {
  return defaultPages[slug] || null;
}

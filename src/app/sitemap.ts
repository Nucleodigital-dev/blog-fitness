import type { MetadataRoute } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export const dynamic = "force-dynamic";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://saudeemfoco.nucleodigitalofc.com"
).replace(/\/$/, "");

type SitemapArticle = {
  slug: string | null;
  created_at: string | null;
};

async function getPublishedArticles() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("articles")
    .select("slug, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (!error) {
    return (data || []) as SitemapArticle[];
  }

  const { data: fallbackData } = await supabase
    .from("articles")
    .select("slug, created_at")
    .order("created_at", { ascending: false });

  return (fallbackData || []) as SitemapArticle[];
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const articles = await getPublishedArticles();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug)
    .map((article) => ({
      url: `${SITE_URL}/blog/${encodeURIComponent(article.slug!)}`,
      lastModified: article.created_at ? new Date(article.created_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...articleRoutes];
}

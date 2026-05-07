import type { MetadataRoute } from "next";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { siteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

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
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${siteUrl}/sobre`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${siteUrl}/politica-editorial`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/aviso-medico`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => article.slug)
    .map((article) => ({
      url: `${siteUrl}/blog/${encodeURIComponent(article.slug!)}`,
      lastModified: article.created_at ? new Date(article.created_at) : new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

  return [...staticRoutes, ...articleRoutes];
}

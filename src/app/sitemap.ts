import type { MetadataRoute } from "next";
import { absoluteUrl, siteUrl } from "@/lib/site";
import { getCategories, getSitemapArticles } from "@/lib/content";
import { hasArticleSupplement, supplementalContentUpdatedAt } from "@/lib/article-supplements";
import { getAllAuthors } from "@/lib/authors";
import type { SitemapArticle } from "@/lib/content-types";

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, categories] = await Promise.all([getSitemapArticles(), getCategories()]);
  const authors = getAllAuthors();

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
      url: `${siteUrl}/contato`,
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
      url: `${siteUrl}/politica-de-privacidade`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/politica-de-cookies`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${siteUrl}/termos-de-uso`,
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
    .map((article) => {
      const lastModified = hasArticleSupplement(article.slug!)
        ? new Date(supplementalContentUpdatedAt)
        : article.created_at
          ? new Date(article.created_at)
          : new Date();

      const baseEntry = {
        url: `${siteUrl}/blog/${article.slug!}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      };

      // Adiciona imagem de capa ao sitemap para indexação no Google Images
      if (article.cover_image) {
        return { ...baseEntry, images: [absoluteUrl(article.cover_image)] };
      }

      return baseEntry;
    });

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categoria/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const authorRoutes: MetadataRoute.Sitemap = authors.map((author) => ({
    url: `${siteUrl}/autor/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...articleRoutes];
}

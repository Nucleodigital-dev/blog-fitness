"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useEffect, useState } from "react";
import {
  RECENT_ARTICLES_KEY,
  SAVED_ARTICLES_KEY,
  dispatchPreferenceUpdate,
} from "@/lib/privacy";

export type StoredArticle = {
  slug: string;
  title: string;
  href: string;
  image?: string | null;
  savedAt?: string;
  viewedAt?: string;
};

type ArticleEngagementProps = {
  article: StoredArticle;
};

function readArticles(key: string): StoredArticle[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeArticles(key: string, articles: StoredArticle[]) {
  localStorage.setItem(key, JSON.stringify(articles.slice(0, 12)));
  dispatchPreferenceUpdate();
}

export function ArticleEngagement({ article }: ArticleEngagementProps) {
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const savedArticles = readArticles(SAVED_ARTICLES_KEY);
      const recentArticles = readArticles(RECENT_ARTICLES_KEY);
      const currentArticle = { ...article, viewedAt: new Date().toISOString() };

      setIsSaved(savedArticles.some((item) => item.slug === article.slug));
      writeArticles(RECENT_ARTICLES_KEY, [
        currentArticle,
        ...recentArticles.filter((item) => item.slug !== article.slug),
      ]);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [article]);

  const toggleSaved = () => {
    const savedArticles = readArticles(SAVED_ARTICLES_KEY);

    if (savedArticles.some((item) => item.slug === article.slug)) {
      writeArticles(SAVED_ARTICLES_KEY, savedArticles.filter((item) => item.slug !== article.slug));
      setIsSaved(false);
      return;
    }

    writeArticles(SAVED_ARTICLES_KEY, [
      { ...article, savedAt: new Date().toISOString() },
      ...savedArticles,
    ]);
    setIsSaved(true);
  };

  return (
    <button type="button" className="article-save-button" onClick={toggleSaved}>
      {isSaved ? <BookmarkCheck size={18} aria-hidden="true" /> : <Bookmark size={18} aria-hidden="true" />}
      {isSaved ? "Salvo para depois" : "Salvar para depois"}
    </button>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { Bell, Star } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  CONSENT_UPDATED_EVENT,
  FAVORITE_CATEGORIES_KEY,
  LATEST_ARTICLE_NOTIFIED_KEY,
  LATEST_ARTICLE_SEEN_KEY,
  PrivacyPreferences,
  RECENT_ARTICLES_KEY,
  SAVED_ARTICLES_KEY,
  dispatchPreferenceUpdate,
  readStoredPrivacyPreferences,
} from "@/lib/privacy";
import type { StoredArticle } from "./ArticleEngagement";

type LatestArticle = StoredArticle & {
  createdAt?: string | null;
};

type ReadingMemoryProps = {
  latestArticle?: LatestArticle | null;
};

function readArticles(key: string): StoredArticle[] {
  try {
    const parsed = JSON.parse(localStorage.getItem(key) || "[]");
    return Array.isArray(parsed) ? parsed.slice(0, 4) : [];
  } catch {
    return [];
  }
}

function allowsPreferenceMemory(preferences: PrivacyPreferences | null) {
  return Boolean(preferences?.preferences);
}

function allowsNotifications(preferences: PrivacyPreferences | null) {
  return Boolean(preferences?.notifications) && "Notification" in window && Notification.permission === "granted";
}

export function ReadingMemory({ latestArticle }: ReadingMemoryProps) {
  const [savedArticles, setSavedArticles] = useState<StoredArticle[]>([]);
  const [recentArticles, setRecentArticles] = useState<StoredArticle[]>([]);
  const [showLatestNotice, setShowLatestNotice] = useState(false);
  const [memoryAllowed, setMemoryAllowed] = useState(false);

  const refresh = useCallback(() => {
    const preferences = readStoredPrivacyPreferences();
    const canRemember = allowsPreferenceMemory(preferences);
    setMemoryAllowed(canRemember);

    if (!canRemember) {
      setSavedArticles([]);
      setRecentArticles([]);
      setShowLatestNotice(false);
      return;
    }

    setSavedArticles(readArticles(SAVED_ARTICLES_KEY));
    setRecentArticles(readArticles(RECENT_ARTICLES_KEY));

    if (!latestArticle) {
      setShowLatestNotice(false);
      return;
    }

    const latestSeen = localStorage.getItem(LATEST_ARTICLE_SEEN_KEY);
    if (latestSeen !== latestArticle.slug) {
      setShowLatestNotice(true);

      const latestNotified = localStorage.getItem(LATEST_ARTICLE_NOTIFIED_KEY);
      if (latestNotified !== latestArticle.slug && allowsNotifications(preferences)) {
        new Notification("Novo artigo no Saúde em Foco", {
          body: latestArticle.title,
          icon: latestArticle.image || "/logo.png",
        });
        localStorage.setItem(LATEST_ARTICLE_NOTIFIED_KEY, latestArticle.slug);
      }
    } else {
      setShowLatestNotice(false);
    }
  }, [latestArticle]);

  useEffect(() => {
    const timer = window.setTimeout(refresh, 0);
    window.addEventListener(CONSENT_UPDATED_EVENT, refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.clearTimeout(timer);
      window.removeEventListener(CONSENT_UPDATED_EVENT, refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [refresh]);

  const displayArticles = useMemo(() => {
    const recentOnly = recentArticles.filter(
      (recent) => !savedArticles.some((saved) => saved.slug === recent.slug)
    );
    return { saved: savedArticles.slice(0, 3), recent: recentOnly.slice(0, 3) };
  }, [recentArticles, savedArticles]);

  const dismissLatestNotice = () => {
    if (latestArticle) {
      localStorage.setItem(LATEST_ARTICLE_SEEN_KEY, latestArticle.slug);
      dispatchPreferenceUpdate();
    }
    setShowLatestNotice(false);
  };

  if (!memoryAllowed && !showLatestNotice) return null;

  return (
    <section className="reading-memory" aria-label="Preferências de leitura">
      {showLatestNotice && latestArticle && (
        <div className="latest-article-notice">
          <div>
            <span>
              <Bell size={16} aria-hidden="true" />
              Novo artigo
            </span>
            <h2>{latestArticle.title}</h2>
          </div>
          <div>
            <Link href={latestArticle.href} className="btn btn-primary" onClick={dismissLatestNotice}>
              Ler agora
            </Link>
            <button type="button" className="btn btn-secondary" onClick={dismissLatestNotice}>
              Dispensar
            </button>
          </div>
        </div>
      )}

      {memoryAllowed && (displayArticles.saved.length > 0 || displayArticles.recent.length > 0) && (
        <div className="reading-memory-grid">
          {displayArticles.saved.length > 0 && (
            <ReadingList title="Salvos para depois" articles={displayArticles.saved} />
          )}
          {displayArticles.recent.length > 0 && (
            <ReadingList title="Vistos recentemente" articles={displayArticles.recent} />
          )}
        </div>
      )}
    </section>
  );
}

function ReadingList({ title, articles }: { title: string; articles: StoredArticle[] }) {
  return (
    <div>
      <h2>{title}</h2>
      <div className="reading-memory-list">
        {articles.map((article) => (
          <Link href={article.href} key={article.slug} className="reading-memory-item">
            {article.image && (
              <span>
                <Image src={article.image} alt="" fill sizes="64px" style={{ objectFit: "cover" }} />
              </span>
            )}
            <strong>{article.title}</strong>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function FavoriteCategoryButton({ slug, label }: { slug: string; label: string }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const favorites = JSON.parse(localStorage.getItem(FAVORITE_CATEGORIES_KEY) || "[]");
        setIsFavorite(Array.isArray(favorites) && favorites.includes(slug));
      } catch {
        setIsFavorite(false);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [slug]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem(FAVORITE_CATEGORIES_KEY) || "[]");
    const normalized = Array.isArray(favorites) ? favorites : [];
    const next = normalized.includes(slug)
      ? normalized.filter((item) => item !== slug)
      : [slug, ...normalized];

    localStorage.setItem(FAVORITE_CATEGORIES_KEY, JSON.stringify(next));
    setIsFavorite(next.includes(slug));
    dispatchPreferenceUpdate();
  };

  return (
    <button
      type="button"
      className={isFavorite ? "favorite-category-button active" : "favorite-category-button"}
      onClick={toggleFavorite}
      aria-label={isFavorite ? `Remover ${label} das favoritas` : `Favoritar ${label}`}
    >
      <Star size={16} aria-hidden="true" />
    </button>
  );
}

import { marked } from "marked";
import type { ArticleBlock, ArticleContent } from "./content-types";

export function stripMarkup(value: string) {
  return value
    .replace(/<[^>]*>?/gm, " ")
    .replace(/[*_#>`[\]()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseBlocks(content: ArticleContent): ArticleBlock[] {
  if (Array.isArray(content)) return content;
  if (!content || typeof content !== "string" || !content.trim().startsWith("[")) return [];

  try {
    const blocks = JSON.parse(content);
    return Array.isArray(blocks) ? blocks : [];
  } catch {
    return [];
  }
}

export function getPlainArticleText(content: ArticleContent) {
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

  return stripMarkup(typeof content === "string" ? content : "");
}

export function getMetaDescription(content: ArticleContent) {
  const text = getPlainArticleText(content);
  if (!text) return "";
  return text.length > 157 ? `${text.substring(0, 157)}...` : text;
}

export function getReadingTime(content: ArticleContent, lang: "pt" | "en") {
  const words = getPlainArticleText(content).split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return lang === "en" ? `${minutes} min read` : `Leitura: ${minutes} min`;
}

export function getContentExcerpt(content: ArticleContent, length = 150) {
  const text = getPlainArticleText(content);
  if (!text) return "";
  return text.length > length ? `${text.substring(0, length)}...` : text;
}

export function contentToHtml(content: ArticleContent) {
  return typeof content === "string" ? marked(content) : "";
}

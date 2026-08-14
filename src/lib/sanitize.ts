import sanitizeHtml from "sanitize-html";

/**
 * The article body is managed in the CMS. Treat it as untrusted input even for
 * authenticated editors: Markdown parsers intentionally do not sanitize HTML.
 */
export function sanitizeRichText(html: string) {
  return sanitizeHtml(html, {
    allowedTags: [
      "a",
      "abbr",
      "b",
      "blockquote",
      "br",
      "code",
      "del",
      "details",
      "div",
      "em",
      "figcaption",
      "figure",
      "h2",
      "h3",
      "h4",
      "hr",
      "i",
      "img",
      "li",
      "ol",
      "p",
      "pre",
      "span",
      "strong",
      "sub",
      "summary",
      "sup",
      "table",
      "tbody",
      "td",
      "th",
      "thead",
      "tr",
      "ul",
    ],
    allowedAttributes: {
      a: ["href", "title", "target", "rel"],
      abbr: ["title"],
      img: ["src", "alt", "width", "height", "loading"],
      ol: ["start"],
      td: ["colspan", "rowspan"],
      th: ["colspan", "rowspan", "scope"],
    },
    allowedSchemes: ["http", "https", "mailto"],
    allowedSchemesByTag: { img: ["http", "https"] },
    transformTags: {
      a: sanitizeHtml.simpleTransform("a", { rel: "noopener noreferrer nofollow" }, true),
    },
  });
}

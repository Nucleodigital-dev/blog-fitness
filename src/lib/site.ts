export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://saudeemfoco.nucleodigitalofc.com"
).replace(/\/$/, "");

export const siteName = "Saude em Foco";

export const siteDescription =
  "Artigos educativos sobre saude, fitness, nutricao, treino e bem-estar.";

export const organizationName = "Saude em Foco";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

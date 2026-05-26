export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://saudeemfoco.nucleodigitalofc.com"
).replace(/\/$/, "");

export const siteName = "Saúde em Foco";

export const siteDescription =
  "Artigos educativos sobre saúde, fitness, nutrição, treino e bem-estar.";

export const organizationName = "Saúde em Foco";

export const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contato@saudeemfoco.com.br";

export const absoluteUrl = (path = "/") => {
  if (/^https?:\/\//i.test(path)) return path;
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export type FaqItem = {
  q: string;
  a: string;
};

export type ArticleBlock = {
  type?: string;
  title?: string;
  content?: string;
  isHtml?: boolean;
  faqs?: FaqItem[] | null;
};

export type ArticleContent = string | ArticleBlock[] | null | undefined;

export type Category = {
  id: string;
  name_pt: string | null;
  name_en?: string | null;
  slug: string;
  parent_id: string | null;
};

export type Article = {
  id: string;
  slug: string;
  title_pt: string;
  title_en?: string | null;
  content_pt?: ArticleContent;
  content_en?: ArticleContent;
  cover_image?: string | null;
  cover_alt?: string | null;
  category_id?: string | null;
  cat_name_pt?: string | null;
  cat_name_en?: string | null;
  cat_slug?: string | null;
  categories?: {
    name_pt?: string | null;
    name_en?: string | null;
    slug?: string | null;
  } | null;
  is_featured?: boolean | number | null;
  status?: string | null;
  created_at?: string | null;
};

export type SitemapArticle = {
  slug: string | null;
  created_at: string | null;
};

export type SiteLink = {
  label: string;
  href?: string | null;
  categorySlug?: string | null;
};

export type FooterColumn = {
  title: string;
  links: SiteLink[];
};

export type SiteSettings = {
  title: string;
  description?: string | null;
  logo?: string | null;
  logoAlt?: string | null;
  footerDescription?: string | null;
  navigationItems?: SiteLink[];
  footerColumns?: FooterColumn[];
};

export type SitePageSection = {
  title: string;
  body: string;
};

export type SitePage = {
  slug: string;
  eyebrow?: string | null;
  title: string;
  titleEn?: string | null;
  description?: string | null;
  descriptionEn?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  sections?: SitePageSection[];
  cta?: SiteLink | null;
};

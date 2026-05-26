import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AuthorCard } from "@/components/AuthorCard";
import { getAuthorBySlug } from "@/lib/authors";
import { absoluteUrl, organizationName, siteName, siteUrl } from "@/lib/site";

type AuthorPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return { title: "Autor não encontrado" };

  const canonicalPath = `/autor/${author.slug}`;

  return {
    title: `${author.name} | ${siteName}`,
    description: author.shortBio,
    alternates: {
      canonical: canonicalPath,
    },
    openGraph: {
      title: `${author.name} | ${siteName}`,
      description: author.shortBio,
      url: absoluteUrl(canonicalPath),
      siteName,
      type: "profile",
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);

  if (!author) notFound();

  const canonicalUrl = absoluteUrl(`/autor/${author.slug}`);
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${canonicalUrl}#person`,
        name: author.name,
        description: author.shortBio,
        url: canonicalUrl,
        jobTitle: author.role,
        knowsAbout: author.expertise,
        worksFor: {
          "@type": "Organization",
          name: organizationName,
          url: siteUrl,
        },
        sameAs: author.sameAs,
      },
      {
        "@type": "ProfilePage",
        "@id": `${canonicalUrl}#page`,
        url: canonicalUrl,
        name: `${author.name} | ${siteName}`,
        mainEntity: {
          "@id": `${canonicalUrl}#person`,
        },
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <article style={{ maxWidth: 920, margin: "0 auto", padding: "24px 0 64px" }}>
        <p
          style={{
            color: "var(--primary)",
            fontWeight: 800,
            textTransform: "uppercase",
            fontSize: "0.85rem",
            letterSpacing: ".04em",
            marginBottom: 12,
          }}
        >
          Autor e equipe editorial
        </p>
        <h1 style={{ fontSize: "3rem", marginBottom: 20 }}>{author.name}</h1>
        <p style={{ fontSize: "1.15rem", color: "var(--text-muted)", maxWidth: 760, marginBottom: 40 }}>
          {author.shortBio}
        </p>
        <AuthorCard author={author} />
      </article>
    </>
  );
}

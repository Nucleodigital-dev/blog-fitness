import Link from "next/link";

type Section = {
  title: string;
  body: string;
};

type InstitutionalPageProps = {
  eyebrow: string;
  title: string;
  description: string;
  sections: Section[];
  cta?: {
    label: string;
    href: string;
  };
};

export function InstitutionalPage({
  eyebrow,
  title,
  description,
  sections,
  cta,
}: InstitutionalPageProps) {
  return (
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
        {eyebrow}
      </p>
      <h1 style={{ fontSize: "3rem", marginBottom: 20 }}>{title}</h1>
      <p style={{ fontSize: "1.2rem", color: "var(--text-muted)", maxWidth: 760, marginBottom: 40 }}>
        {description}
      </p>

      <div style={{ display: "grid", gap: 20 }}>
        {sections.map((section) => (
          <section
            key={section.title}
            style={{
              background: "var(--card-bg)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: 28,
            }}
          >
            <h2 style={{ fontSize: "1.55rem", marginBottom: 12 }}>{section.title}</h2>
            <p style={{ color: "var(--text-muted)", fontSize: "1.05rem", margin: 0 }}>{section.body}</p>
          </section>
        ))}
      </div>

      {cta && (
        <div style={{ marginTop: 36 }}>
          <Link href={cta.href} className="btn btn-primary">
            {cta.label}
          </Link>
        </div>
      )}
    </article>
  );
}

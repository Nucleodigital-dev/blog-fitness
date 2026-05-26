import Link from "next/link";
import type { AuthorProfile } from "@/lib/content-types";

type AuthorCardProps = {
  author: AuthorProfile;
  compact?: boolean;
};

function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() || "")
    .join("");
}

export function AuthorCard({ author, compact = false }: AuthorCardProps) {
  return (
    <section
      style={{
        display: "grid",
        gap: 20,
        gridTemplateColumns: compact ? "72px 1fr" : "96px 1fr",
        alignItems: compact ? "center" : "start",
        padding: compact ? 24 : 32,
        borderRadius: 20,
        border: "1px solid var(--border)",
        background: "var(--card-bg)",
      }}
      aria-label={`Sobre ${author.name}`}
    >
      <div
        aria-hidden="true"
        style={{
          width: compact ? 72 : 96,
          height: compact ? 72 : 96,
          borderRadius: "50%",
          background: "linear-gradient(135deg, var(--primary), #14532d)",
          color: "#fff",
          display: "grid",
          placeItems: "center",
          fontSize: compact ? "1.2rem" : "1.6rem",
          fontWeight: 800,
        }}
      >
        {getInitials(author.name)}
      </div>

      <div>
        <p
          style={{
            margin: 0,
            color: "var(--primary)",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: ".04em",
            fontSize: "0.8rem",
          }}
        >
          Autoria e revisão editorial
        </p>
        <h2 style={{ margin: "8px 0 6px", fontSize: compact ? "1.3rem" : "2rem" }}>{author.name}</h2>
        <p style={{ margin: "0 0 14px", color: "var(--text-muted)", fontWeight: 600 }}>{author.role}</p>
        <p style={{ margin: 0, color: "var(--text-muted)", lineHeight: 1.7 }}>
          {compact ? author.shortBio : author.bio[0]}
        </p>

        {!compact && (
          <>
            <div style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10, fontSize: "1rem" }}>Atuação editorial</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {author.credentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 20 }}>
              <h3 style={{ marginBottom: 10, fontSize: "1rem" }}>Temas acompanhados</h3>
              <ul style={{ margin: 0, paddingLeft: 18, color: "var(--text-muted)", lineHeight: 1.7 }}>
                {author.expertise.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>

            {author.note && (
              <p style={{ margin: "20px 0 0", color: "var(--text-muted)", lineHeight: 1.7 }}>
                {author.note}
              </p>
            )}
          </>
        )}

        <p style={{ margin: compact ? "14px 0 0" : "22px 0 0" }}>
          <Link href={`/autor/${author.slug}`} style={{ fontWeight: 700 }}>
            Ver perfil completo do autor
          </Link>
        </p>
      </div>
    </section>
  );
}

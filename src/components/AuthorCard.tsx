import Link from "next/link";
import Image from "next/image";
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
        {author.image ? (
          <Image src={author.image} alt={author.imageAlt || `Foto de ${author.name}`} width={compact ? 72 : 96} height={compact ? 72 : 96} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : getInitials(author.name)}
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

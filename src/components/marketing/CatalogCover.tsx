type Props = {
  slug: string;
  name: string;
  locale?: "pt" | "en";
  className?: string;
};

// Hash slug → deterministic accent hue so each catalog reads slightly different.
function hueFor(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h << 5) - h + slug.charCodeAt(i);
  return Math.abs(h) % 360;
}

const palette: Record<string, { from: string; to: string; accent: string }> = {
  pistao: { from: "#8a2f1c", to: "#1f0d08", accent: "#E0A56A" },
  plastico: { from: "#1f3a4d", to: "#0c171f", accent: "#C9D9E5" },
  solda: { from: "#3a1f12", to: "#170a06", accent: "#FFB36B" },
  metais: { from: "#4a3a23", to: "#1c150c", accent: "#E2C68A" },
  manutencao: { from: "#1f3527", to: "#0c1610", accent: "#A8D0B6" },
  geral: { from: "#2a2a35", to: "#0f0f15", accent: "#C97B4B" },
  aco: { from: "#383838", to: "#111111", accent: "#B0B0B0" },
};

export function CatalogCover({ slug, name, locale = "pt", className = "" }: Props) {
  const eyebrow = locale === "pt" ? "CATÁLOGO TÉCNICO" : "TECHNICAL CATALOG";
  const wordmark = "BRONZE METAL";
  const subhint = locale === "pt" ? "BM-21 · Edição técnica" : "BM-21 · Technical edition";
  const colors = palette[slug] ?? {
    from: `hsl(${hueFor(slug)} 22% 22%)`,
    to: `hsl(${hueFor(slug)} 30% 8%)`,
    accent: "#B08D57",
  };
  const gradId = `cat-${slug}-bg`;
  const accentId = `cat-${slug}-accent`;

  return (
    <svg
      viewBox="0 0 300 400"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label={`${eyebrow} — ${name}`}
      className={className}
    >
      <defs>
        <linearGradient id={gradId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={colors.from} />
          <stop offset="1" stopColor={colors.to} />
        </linearGradient>
        <linearGradient id={accentId} x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor={colors.accent} stopOpacity="0.95" />
          <stop offset="1" stopColor={colors.accent} stopOpacity="0.55" />
        </linearGradient>
        <pattern
          id={`cat-${slug}-grid`}
          width="14"
          height="14"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(0)"
        >
          <path d="M 14 0 L 0 0 0 14" fill="none" stroke="#ffffff" strokeOpacity="0.05" strokeWidth="0.6" />
        </pattern>
      </defs>

      {/* Background */}
      <rect width="300" height="400" fill={`url(#${gradId})`} />
      <rect width="300" height="400" fill={`url(#cat-${slug}-grid)`} />

      {/* Accent corner ribbon */}
      <path
        d="M 0 0 L 300 0 L 300 12 L 0 60 Z"
        fill={`url(#${accentId})`}
        opacity="0.85"
      />

      {/* Top eyebrow + slug badge */}
      <g transform="translate(28, 88)">
        <text
          x="0"
          y="0"
          fill="rgba(255,255,255,0.55)"
          fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
          fontSize="9.5"
          fontWeight="500"
          letterSpacing="3.5"
        >
          {eyebrow}
        </text>
        <line x1="0" y1="14" x2="34" y2="14" stroke={colors.accent} strokeWidth="2" />
      </g>

      {/* Big catalog name */}
      <g transform="translate(28, 168)">
        <text
          x="0"
          y="0"
          fill="#ffffff"
          fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
          fontSize="46"
          fontWeight="800"
          letterSpacing="-0.5"
        >
          {name}
        </text>
      </g>

      {/* Sub-hint */}
      <g transform="translate(28, 210)">
        <text
          x="0"
          y="0"
          fill="rgba(255,255,255,0.6)"
          fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
          fontSize="9"
          letterSpacing="2"
        >
          {subhint}
        </text>
      </g>

      {/* Decorative number stack */}
      <g transform="translate(28, 268)" fill="rgba(255,255,255,0.35)" fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace" fontSize="9" letterSpacing="1.5">
        <text x="0" y="0">— LIGAS</text>
        <text x="0" y="14">— PROPRIEDADES</text>
        <text x="0" y="28">— APLICAÇÕES</text>
        <text x="0" y="42">— PROCESSOS</text>
      </g>

      {/* Diagonal accent shape (bottom right) */}
      <path
        d="M 220 300 L 300 220 L 300 400 L 200 400 Z"
        fill={colors.accent}
        opacity="0.14"
      />
      <path
        d="M 240 320 L 300 260 L 300 400 L 220 400 Z"
        fill={colors.accent}
        opacity="0.10"
      />

      {/* Bronze Metal wordmark bottom */}
      <g transform="translate(28, 372)">
        <line x1="0" y1="-12" x2="20" y2="-12" stroke={colors.accent} strokeWidth="2" />
        <text
          x="0"
          y="0"
          fill="#ffffff"
          fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
          fontSize="11"
          fontWeight="700"
          letterSpacing="2.5"
        >
          {wordmark}
        </text>
      </g>
    </svg>
  );
}

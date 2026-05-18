type Props = {
  locale?: "pt" | "en";
  size?: number;
  className?: string;
};

export function IsoStamp({ locale = "pt", size = 160, className = "" }: Props) {
  const topLabel = locale === "pt" ? "· SISTEMA DE QUALIDADE ·" : "· QUALITY MANAGEMENT ·";
  const bottomLabel = locale === "pt" ? "CERTIFICADO" : "CERTIFIED";
  const aria = locale === "pt" ? "Certificado ISO 9001" : "ISO 9001 certified";

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      role="img"
      aria-label={aria}
      className={className}
    >
      <defs>
        <linearGradient id="isoBronze" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#C97B4B" />
          <stop offset="1" stopColor="#765A30" />
        </linearGradient>
        <path
          id="isoTopArc"
          d="M 24 100 A 76 76 0 0 1 176 100"
          fill="none"
        />
      </defs>

      <circle cx="100" cy="100" r="96" fill="#fdfaf3" stroke="url(#isoBronze)" strokeWidth="3" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#B08D57" strokeWidth="1" opacity="0.35" />

      {/* Top arc — QUALITY MANAGEMENT */}
      <text
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontSize="10.5"
        fontWeight="700"
        fill="#765A30"
        letterSpacing="2.4"
      >
        <textPath href="#isoTopArc" startOffset="50%" textAnchor="middle">
          {topLabel}
        </textPath>
      </text>

      {/* ISO */}
      <text
        x="100"
        y="105"
        textAnchor="middle"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontSize="42"
        fontWeight="800"
        fill="#0F141A"
        letterSpacing="2"
      >
        ISO
      </text>

      {/* 9001 */}
      <text
        x="100"
        y="135"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
        fontSize="22"
        fontWeight="600"
        fill="#95743F"
        letterSpacing="3"
      >
        9001
      </text>

      {/* Bottom label */}
      <text
        x="100"
        y="160"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
        fontSize="9.5"
        fontWeight="600"
        fill="#765A30"
        letterSpacing="3.5"
      >
        {bottomLabel}
      </text>

      {/* Bottom decorative dots */}
      <circle cx="68" cy="172" r="1.5" fill="#B08D57" />
      <circle cx="100" cy="176" r="1.5" fill="#B08D57" />
      <circle cx="132" cy="172" r="1.5" fill="#B08D57" />
    </svg>
  );
}

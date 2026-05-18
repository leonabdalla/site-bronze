import { company } from "@/data/company";

type Props = {
  locale?: "pt" | "en";
  size?: number;
  className?: string;
};

export function YearsStamp({ locale = "pt", size = 160, className = "" }: Props) {
  const years = new Date().getFullYear() - company.foundedYear;
  const yearsLabel = locale === "pt" ? "ANOS" : "YEARS";
  const sinceLabel = locale === "pt"
    ? `· DESDE ${company.foundedYear} ·`
    : `· SINCE ${company.foundedYear} ·`;
  const aria = locale === "pt"
    ? `${years} anos de operação desde ${company.foundedYear}`
    : `${years} years in operation since ${company.foundedYear}`;

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
        <linearGradient id="yearsBronze" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0" stopColor="#C97B4B" />
          <stop offset="1" stopColor="#765A30" />
        </linearGradient>
        <path
          id="yearsTopArc"
          d="M 24 100 A 76 76 0 0 1 176 100"
          fill="none"
        />
        <path
          id="yearsBottomArc"
          d="M 28 110 A 72 72 0 0 0 172 110"
          fill="none"
        />
      </defs>

      <circle cx="100" cy="100" r="96" fill="#fdfaf3" stroke="url(#yearsBronze)" strokeWidth="3" />
      <circle cx="100" cy="100" r="86" fill="none" stroke="#B08D57" strokeWidth="1" opacity="0.35" />

      {/* Top arc — DESDE/SINCE YEAR */}
      <text
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontSize="11"
        fontWeight="700"
        fill="#765A30"
        letterSpacing="2.4"
      >
        <textPath href="#yearsTopArc" startOffset="50%" textAnchor="middle">
          {sinceLabel}
        </textPath>
      </text>

      {/* Big year number */}
      <text
        x="100"
        y="118"
        textAnchor="middle"
        fontFamily="var(--font-inter), Inter, sans-serif"
        fontSize="68"
        fontWeight="800"
        fill="#0F141A"
      >
        {years}
      </text>

      {/* ANOS / YEARS label */}
      <text
        x="100"
        y="142"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains-mono), JetBrains Mono, monospace"
        fontSize="13"
        fontWeight="600"
        fill="#95743F"
        letterSpacing="6.5"
      >
        {yearsLabel}
      </text>

      {/* Bottom arc decoration — small dot accents */}
      <circle cx="60" cy="156" r="1.6" fill="#B08D57" />
      <circle cx="100" cy="162" r="1.6" fill="#B08D57" />
      <circle cx="140" cy="156" r="1.6" fill="#B08D57" />
    </svg>
  );
}

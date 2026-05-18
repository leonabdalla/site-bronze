type Props = {
  className?: string;
  variant?: "light" | "dark";
};

export function Logo({ className = "", variant = "light" }: Props) {
  const textColor = variant === "dark" ? "#F7F7F5" : "#0F141A";
  const subColor = variant === "dark" ? "#DDC391" : "#95743F";
  const accent = variant === "dark" ? "#DDC391" : "#B08D57";

  return (
    <svg
      viewBox="0 0 240 56"
      role="img"
      aria-label="Bronze Metal"
      className={className}
      preserveAspectRatio="xMinYMid meet"
    >
      <defs>
        <linearGradient id="bmMark" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#C97B4B" />
          <stop offset="0.6" stopColor="#B08D57" />
          <stop offset="1" stopColor="#765A30" />
        </linearGradient>
      </defs>

      {/* Bronze mark */}
      <g>
        <rect x="0" y="6" width="44" height="44" rx="9" fill="url(#bmMark)" />
        <path
          d="M11 17 h13 a6 6 0 0 1 0 12 h-8 v-3 h8 a3 3 0 0 0 0-6 h-10 v18 h-3 V17z M22 30 h6 a6 6 0 0 1 0 12 h-9 v-3 h9 a3 3 0 0 0 0-6 h-6 v-3z"
          fill={variant === "dark" ? "#0F141A" : "#F7F7F5"}
          opacity="0.95"
        />
        <circle cx="22" cy="50" r="1.6" fill={accent} opacity="0.9" />
      </g>

      {/* Wordmark */}
      <g>
        <text
          x="58"
          y="26"
          fill={textColor}
          fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
          fontSize="17"
          fontWeight="800"
          letterSpacing="0.6"
        >
          BRONZE
        </text>
        <text
          x="58"
          y="44"
          fill={subColor}
          fontFamily="var(--font-inter), Inter, system-ui, sans-serif"
          fontSize="12"
          fontWeight="500"
          letterSpacing="6.8"
        >
          METAL
        </text>
      </g>
    </svg>
  );
}

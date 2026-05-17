export function Logo({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 220 48"
      role="img"
      aria-label="Bronze Metal"
      className={className}
    >
      <defs>
        <linearGradient id="logoBronze" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#C97B4B" />
          <stop offset="1" stopColor="#B08D57" />
        </linearGradient>
      </defs>
      <g>
        <path
          d="M6 6h28a14 14 0 0 1 0 28H6V6Zm8 8v12h16a4 4 0 1 0 0-8h-8a4 4 0 1 0 0-4h-8Z"
          fill="url(#logoBronze)"
        />
        <text
          x="48"
          y="22"
          fill="currentColor"
          fontFamily="Inter, sans-serif"
          fontSize="14"
          fontWeight="700"
          letterSpacing="0.6"
        >
          BRONZE
        </text>
        <text
          x="48"
          y="38"
          fill="currentColor"
          fontFamily="Inter, sans-serif"
          fontSize="14"
          fontWeight="400"
          letterSpacing="6"
        >
          METAL
        </text>
      </g>
    </svg>
  );
}

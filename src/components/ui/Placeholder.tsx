type Props = {
  seed: string;
  className?: string;
  label?: string;
};

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export function Placeholder({ seed, className = "", label }: Props) {
  const h = hash(seed);
  const hue1 = 28 + (h % 24); // warm bronze hue
  const hue2 = 200 + ((h >> 3) % 30); // cool slate hue
  const angle = h % 360;
  return (
    <div
      aria-hidden={!label}
      role={label ? "img" : undefined}
      aria-label={label}
      className={`relative overflow-hidden bg-slate-200 ${className}`}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, hsl(${hue1} 40% 55% / 0.85), hsl(${hue2} 14% 22%))`,
      }}
    >
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(120% 80% at 20% 0%, rgb(255 255 255 / 0.18), transparent 60%), radial-gradient(80% 60% at 90% 100%, rgb(15 20 26 / 0.45), transparent 50%)",
          mixBlendMode: "overlay",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "repeating-linear-gradient(135deg, rgb(15 20 26 / 0.18) 0 1px, transparent 1px 18px)",
        }}
      />
    </div>
  );
}

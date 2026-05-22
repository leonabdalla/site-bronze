import Image from "next/image";

const ASPECT = 1048 / 499;

type Props = {
  className?: string;
  variant?: "light" | "dark";
  priority?: boolean;
  height?: number;
};

export function Logo({ className = "", variant = "light", priority, height = 40 }: Props) {
  const width = Math.round(height * ASPECT);
  return (
    <Image
      src="/images/brand/logo.png"
      alt="Bronze Metal"
      width={width}
      height={height}
      priority={priority}
      className={`${className} ${
        variant === "dark" ? "brightness-110 contrast-110" : ""
      }`.trim()}
    />
  );
}

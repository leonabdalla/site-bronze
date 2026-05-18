import Image from "next/image";

export function Logo({
  className = "",
  variant = "light",
}: {
  className?: string;
  variant?: "light" | "dark";
}) {
  return (
    <span
      className={`inline-flex items-center ${className} ${
        variant === "dark" ? "bg-paper rounded-md px-2 py-1" : ""
      }`}
    >
      <Image
        src="/images/brand/logo.jpg"
        alt="Bronze Metal"
        width={180}
        height={56}
        priority
        className="h-full w-auto object-contain"
      />
    </span>
  );
}

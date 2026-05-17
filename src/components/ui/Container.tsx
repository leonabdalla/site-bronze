import * as React from "react";

export function Container({
  className = "",
  children,
  as: As = "div",
}: {
  className?: string;
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
}) {
  return <As className={`container-prose ${className}`}>{children}</As>;
}

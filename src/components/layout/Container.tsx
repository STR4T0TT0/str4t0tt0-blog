import * as React from "react";

/** Force le contenu à rester organisé sur écrans ultrawide */
export default function Container({
  as,
  className = "",
  children,
}: React.PropsWithChildren<{ as?: React.ElementType; className?: string }>) {
  const Tag = (as ?? "div") as React.ElementType;
  return (
    <Tag className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>
      {children}
    </Tag>
  );
}
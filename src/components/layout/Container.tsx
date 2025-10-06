/**
 * L'idée du container est de :
 * - Centrer le contenu
 * - Limiter la largeur max, pour éviter des rendus étranges sur des écrans ultra-wide
 * - Ajouter des marges intérieures
 */
import * as React from "react";

type Element = React.ElementType;

type ContainerProps<E extends Element = "div"> = {
  as?: E;
  className?: string;
  children: React.ReactNode;
} & Omit<React.ComponentPropsWithoutRef<E>, "as" | "className" | "children">;

export default function Container<E extends Element = "div">(
  props: ContainerProps<E>
) {
  const { as, className = "", children, ...rest } = props;
  const Tag = (as || "div") as Element;

  return (
    <Tag
      className={[
        "mx-auto w-full max-w-7xl 2xl:max-w-[88rem]",
        "px-4 sm:px-6 lg:px-8",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...rest}
    >
      {children}
    </Tag>
  );
}
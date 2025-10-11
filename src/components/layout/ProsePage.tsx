/* wrapper pour les themes de prose */
import type { PropsWithChildren } from "react";
import Container from "./Container";

export default function ProsePage({ children }: PropsWithChildren) {
  return (
    <Container>
      <article className="prose max-w-none">{children}</article>
    </Container>
  );
}

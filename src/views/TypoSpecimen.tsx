import { useTranslation } from "react-i18next";

export default function TypoSpecimen() {
  const { t } = useTranslation("common");

  const samples = [
    { cls: "font-str4t0tt0-orbitron", label: "Orbitron" },
    { cls: "font-str4t0tt0-roboto", label: "Roboto" },
    { cls: "font-str4t0tt0-prag", label: "Pragmatica" },
  ];

  return (
    <main className="mx-auto max-w-screen-sm p-4 space-y-8">
      <h1 className="text-2xl font-str4t0tt0-orbitron mb-6">
        {t("info")} · Typo Specimen
      </h1>

      {samples.map((s) => (
        <section key={s.cls} className="space-y-2">
          <h2 className="text-lg font-bold text-str4t0tt0-primary">
            {s.label}
          </h2>
          <p className={`${s.cls} text-base`}>
            Normal 400 — Portez un whisky à ce juge blond qui fume!
          </p>
          <p className={`${s.cls} text-medium font-medium`}>
            Medium 500 — Portez un whisky à ce juge blond qui fume!
          </p>
          <p className={`${s.cls} text-bold font-bold`}>
            Bold 700 — Portez un whisky à ce juge blond qui fume!
          </p>
          <p className={`${s.cls} italic`}>Italic — Accents é è à ò ù î ü ç</p>
        </section>
      ))}

      {/* --- Test les classes proses  --- */}
      <section className="border-t border-white/10 pt-6">
        <h2 className="prose prose-brand max-w-none font-body dark">
          Prose / Typography
        </h2>
        <article className="prose prose-invert max-w-none">
          <h1>Heading 1</h1>
          <p>
            Paragraphe avec <strong>gras</strong>, <em>italique</em>, et
            <code> inline code()</code>. La largeur devrait être confortable,
            les interlignes harmonisés.
          </p>
          <h2>Heading 2</h2>
          <p>Liste à puces: </p>
          <ul>
            <li>item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
          </ul>
          <blockquote>
            “Security is a process, not a product.” — Bruce Schneier
          </blockquote>
          <pre>
            <code>
              # Exemple de code Python numbers = [1, 2, 3, 4, 5] squares = []
              for n in numbers: squares.append(n * n) print(squares) # Résultat
              : [1, 4, 9, 16, 25]
            </code>
          </pre>
          <p>
            Lien de test : <a href="https://example.com">example.com</a>
          </p>
        </article>
      </section>
    </main>
  );
}

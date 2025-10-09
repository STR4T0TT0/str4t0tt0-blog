---
title: "Test de rendu MDX (FR)"
slug: "mdx-rendering-test"
date: "2025-10-09"
category: "cybersecurity"
tags: ["test", "rendu", "mdx"]
excerpt: "Page longue pour vérifier le rendu MDX en français (titres, listes, code, tableaux, images, liens)."
image: ""
draft: false
lang: "fr"
---

# Test de rendu MDX (Français)

Cette page sert à **valider le rendu complet** du blog : typographies, citations, code, listes, tableaux, images et liens.  
Si tout s’affiche correctement, ton pipeline MDX est opérationnel.

## 1) Titres, emphase & code inline

- **Gras**, _italique_, et `codeInline()` doivent respecter ta charte.
- Les paragraphes longs testent l’interlignage, les marges et la lisibilité.

### Paragraphe d’exemple

Les dirigeants sont submergés par les outils, acronymes et “meilleures pratiques”. Ton blog doit offrir des **repères clairs**, des checklists utiles et des positions assumées.  
Ce paragraphe rallonge volontairement la page pour vérifier le défilement et l’ancrage des titres.

## 2) Citation

> « La sécurité est un processus, pas un produit. »  
> — Bruce Schneier

## 3) Blocs de code

```ts
type Risk = "low" | "medium" | "high";

export function rate(cvss: number): Risk {
  if (cvss >= 7) return "high";
  if (cvss >= 4) return "medium";
  return "low";
}
```

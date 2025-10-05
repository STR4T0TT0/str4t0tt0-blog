import YAML from 'yaml';

export type Frontmatter = Record<string, any>;

/**
 * Parse un front-matter YAML pour  fichier Markdown.
 * Retourne un objet { data, body }.
 */
export function parseFrontmatter(raw: string): { data: Frontmatter; body: string } {
  // front-matter doit commencer en tout début de fichier par ---
  if (!raw.startsWith('---')) return { data: {}, body: raw };

  // capture tout entre le 1er --- (ligne seule) et le prochain --- (ligne seule)
  const match = raw.match(/^---\s*[\r\n]+([\s\S]*?)[\r\n]+---\s*[\r\n]?([\s\S]*)$/m);
  if (!match) return { data: {}, body: raw };

  const [, yamlBlock, body] = match;
  let data: Frontmatter = {};
  try {
    data = YAML.parse(yamlBlock) ?? {};
  } catch {
    data = {};
  }
  return { data, body: body ?? '' };
}
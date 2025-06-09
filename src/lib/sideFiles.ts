export interface FileInfo {
  news?: string;
  archive?: string;
}

export const fileMap: Record<string, FileInfo> = {
  MUUN: { news: "Aktuelles zu MINT und UNESCO.md", archive: "Archiv zu MINT und UNESCO.md" },
  mintEvents: { news: "Aktuelles zu Events.md", archive: "Archiv zu Events.md" },
  mintSpezial: { news: "Aktuelles zu Spezial.md", archive: "Archiv zu Spezial.md" },
};

export function splitArticles(text: string): string[] {
  return text.split(/\n(?=##\s)/g).filter((p) => p.trim() !== "");
}

export function articleIntro(article: string) {
  const headingMatch = article.match(/^##\s*(.+)/);
  const heading = headingMatch ? headingMatch[1].trim() : "";
  let rest = article.replace(/^##\s*.+\n?/, "");
  const imageMatch = rest.match(/!\[[^\]]*\]\(([^)]+)\)/);
  const image = imageMatch ? imageMatch[1] : undefined;
  rest = rest.replace(/!\[[^\]]*\]\([^)]*\)/g, "");
  const snippet = rest.trim().replace(/\n+/g, " ").slice(0, 40);
  return { heading, snippet, image };
}

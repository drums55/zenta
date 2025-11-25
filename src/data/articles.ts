import type { PatternPersonaKey } from "./patterns";

export type ArticleCategory =
  | "intro"
  | "material-knowledge"
  | "business-outcome"
  | "maintenance"
  | "design-ideas";

export interface Article {
  id: string;
  slug: string;
  title: string;
  category: ArticleCategory;
  personas: PatternPersonaKey[];
  /** Short summary used on cards/listing */
  summary: string;
  /** ISO date string; can be refined later to Date if needed */
  publishedAt?: string;
}

export const demoArticles: Article[] = [
  {
    id: "what-is-interior-film-basic",
    slug: "what-is-interior-film",
    title: "Interior Film คืออะไร? เข้าใจวัสดุรีโนเวทง่าย ๆ ในไม่กี่นาที",
    category: "intro",
    personas: ["businessOwner", "designer", "homeowner"],
    summary:
      "บทความ introdution สำหรับคนที่ยังไม่รู้จักฟิล์มตกแต่งภายใน ว่าคืออะไร แตกต่างจากการเปลี่ยนวัสดุจริงอย่างไร และควรใช้เมื่อไหร่",
    publishedAt: "2025-11-25",
  },
];

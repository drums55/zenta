import type { PatternPersonaKey } from "./patterns";

export type CaseStudySector =
  | "restaurant-cafe"
  | "retail"
  | "clinic-hospital"
  | "hotel"
  | "office"
  | "residential";

export interface CaseStudyImage {
  src: string;
  alt: string;
  kind?: "before" | "after" | "detail";
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  sector: CaseStudySector;
  location?: string;
  /** Which persona this case will resonate with the most */
  primaryPersona: PatternPersonaKey;
  /** Short teaser for cards */
  summary: string;
  /** Optional explicit patterns (by id) used in this case */
  patternIds?: string[];
  /** Business/experience outcome to highlight on the website */
  outcomes: string[];
  images: CaseStudyImage[];
}

export const demoCaseStudies: CaseStudy[] = [
  {
    id: "zenta-demo-cafe-01",
    slug: "cafe-bar-refresh-with-wood-film",
    title: "รีโนเวทคาเฟ่ย่านเมือง ด้วยฟิล์มลายไม้แทนการเปลี่ยนเฟอร์นิเจอร์",
    sector: "restaurant-cafe",
    location: "กรุงเทพฯ",
    primaryPersona: "businessOwner",
    summary:
      "เปลี่ยนเคาน์เตอร์และผนังเดิมให้เป็นลายไม้โทนอุ่น โดยไม่ต้องรื้อเฟอร์นิเจอร์ ลด downtime ของร้าน",
    patternIds: ["zenta-wood-01"],
    outcomes: [
      "ปิดร้านเพียง 1 วันสำหรับติดตั้ง",
      "ภาพลักษณ์ร้านดูอุ่นและทันสมัยขึ้น",
    ],
    images: [
      {
        src: "/images/demo/case-studies/cafe-wood-film-before.jpg",
        alt: "ภาพก่อนติดตั้งฟิล์มบริเวณเคาน์เตอร์คาเฟ่",
        kind: "before",
      },
      {
        src: "/images/demo/case-studies/cafe-wood-film-after.jpg",
        alt: "ภาพหลังติดตั้งฟิล์มลายไม้บริเวณเคาน์เตอร์คาเฟ่",
        kind: "after",
      },
    ],
  },
];

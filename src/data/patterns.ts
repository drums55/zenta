export type PatternSeries =
  | "wood"
  | "stone"
  | "concrete"
  | "metal"
  | "solid"
  | "soft-matte"
  | "gloss";

export type PatternSurface =
  | "wall"
  | "door"
  | "cabinet"
  | "countertop"
  | "column"
  | "other";

export type PatternPersonaKey = "businessOwner" | "designer" | "homeowner";

export interface PatternImage {
  /** public path or remote URL; will later be wired into next/image config */
  src: string;
  alt: string;
}

export interface Pattern {
  /** Stable unique id used internally */
  id: string;
  /** Short human-friendly code that may appear on site (e.g. ZW-102) */
  code: string;
  slug: string;
  name: string;
  series: PatternSeries;
  /** Suggested primary surfaces this pattern works well on */
  surfaces: PatternSurface[];
  /** Example: "warm-wood", "cool-stone", "white", etc. */
  colorFamily: string;
  finish: "matte" | "satin" | "gloss" | "texture";
  /** High-level selling points e.g. scratch-resistance, easy-cleaning */
  features: string[];
  /** Which personas this pattern is especially suitable for */
  recommendedFor: PatternPersonaKey[];
  thumbnail: PatternImage;
}

/**
 * TEMP: minimal dummy data so components can be wired up during early development.
 * Real catalogue data will replace this later.
 */
export const demoPatterns: Pattern[] = [
  {
    id: "zenta-wood-01",
    code: "ZW-101",
    slug: "warm-oak-soft-matte",
    name: "Warm Oak Soft Matte",
    series: "wood",
    surfaces: ["wall", "cabinet", "door"],
    colorFamily: "warm-wood",
    finish: "matte",
    features: [
      "ช่วยสร้างบรรยากาศไม้จริงแบบอบอุ่น",
      "พื้นผิวด้าน ลดแสงสะท้อน",
    ],
    recommendedFor: ["businessOwner", "designer", "homeowner"],
    thumbnail: {
      src: "/images/demo/patterns/warm-oak-soft-matte.jpg",
      alt: "ตัวอย่างลายฟิล์มไม้โทนอุ่นพื้นผิวด้าน",
    },
  },
];

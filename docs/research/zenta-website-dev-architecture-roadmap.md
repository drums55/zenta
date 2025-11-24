# Zenta Website – Dev Architecture & Roadmap

_Updated: 2025-11-24_

อ้างอิง tech stack จาก `filmpro2032` + requirement ของเว็บ Zenta

---

## 1. Target stack & principles

### 1.1 Tech stack (proposed)

- **Framework:** Next.js (App Router) – ตามแนวทาง `filmpro2032` (Next 15.x)
- **Language:** TypeScript
- **UI:** React, Tailwind CSS, component primitives แนว shadcn/ui
- **Styling:** Tailwind + CSS variables สำหรับ theme (light/dark optional)
- **Build & tooling:**
  - ESLint + TypeScript strict
  - PostCSS + Autoprefixer
  - Vitest สำหรับ unit test (ตาม filmpro2032)

### 1.2 Architecture principles

- **Content‑driven + file‑based data** ในระยะแรก (ไม่พึ่ง CMS ทันที)
- **Separation of concerns**
  - `app/` = routing + page composition
  - `components/` = UI + layout primitives
  - `lib/` = domain logic เช่น filter, search, mapping data
  - `data/` = typed data models (products, patterns, case studies, articles)
- **Incremental enhancement** – เริ่มจาก static/SSR ง่าย ๆ ก่อน เพิ่ม dynamic tools ทีหลัง
- **Performant & SEO‑friendly** – use metadata API, optimized images, semantic HTML

---

## 2. Project structure (proposed)

ภายใน `G:/Webs/Zenta` (หลังเริ่ม skeleton ภายหลังรีวิวเอกสาร)

- `package.json`
- `tsconfig.json`
- `next.config.ts`
- `postcss.config.mjs`
- `tailwind.config.js`
- `src/`
  - `app/`
    - `(marketing)/`
      - `layout.tsx`
      - `page.tsx` (Home)
      - `products/`
      - `solutions/`
      - `case-studies/`
      - `knowledge/`
      - `professionals/`
      - `about/`
      - `contact/`
    - `api/` (for forms, maybe email sending)
  - `components/`
    - `ui/` (buttons, inputs, typography, layout primitives)
    - `layout/` (header, footer, nav, container, section wrappers)
    - `catalog/` (product cards, filters, compare tables)
    - `case-study/`
  - `data/`
    - `products.ts`
    - `patterns.ts`
    - `industries.ts`
    - `case-studies.ts`
    - `articles.ts`
  - `lib/`
    - `filters/`
    - `seo/`
    - `forms/`
  - `styles/` (globals, tailwind base)
- `public/`
  - `images/`
  - `patterns/`
  - `case-studies/`

---

## 3. Data modelling (Phase 1 – file based)

### 3.1 Product / Pattern

```ts
export type PatternCategory = "wood" | "stone" | "solid" | "metal" | "special";

export type ApplicationTag =
  | "wall"
  | "furniture"
  | "door"
  | "ceiling"
  | "wet-area"
  | "exterior";

export interface Pattern {
  id: string; // code
  name: string;
  category: PatternCategory;
  colorFamily: "white" | "light" | "medium" | "dark" | "black" | "colorful";
  applications: ApplicationTag[];
  recommendedFor: ("retail" | "restaurant" | "hospitality" | "office" | "residential")[];
  specs: {
    thicknessMm?: number;
    fireRating?: string;
    vocClass?: string;
    warrantyYears?: number;
  };
  images: {
    swatch: string;
    inSituation?: string;
  };
}
```

> Phase 1: hardcode/seed ใน `data/patterns.ts` แล้วค่อย migrate ไป CMS หรือฐานข้อมูลถ้าจำเป็นในอนาคต

### 3.2 Case Study

```ts
export interface CaseStudy {
  slug: string;
  title: string;
  sector: "retail" | "restaurant" | "hospitality" | "clinic" | "office" | "residential";
  location?: string;
  areaSqm?: number;
  summary: string;
  challenges: string[];
  solutions: string[];
  outcomes: string[];
  usedPatterns: string[]; // ref Pattern.id
  heroImage: string;
  gallery: string[];
}
```

### 3.3 Article / Knowledge Hub

สามารถใช้ Markdown + MDX หรือเก็บใน TS struct ในระยะแรก แล้วต่อยอดไป CMS ได้ในอนาคต

---

## 4. Feature roadmap by phase

### Phase 0 – Design system & foundation (ก่อนเริ่ม dev หนัก)

- ตั้ง design tokens (สี, spacing, typography) ให้รองรับ brand ของ Zenta
- ออกแบบ component primitives: Button, Input, Card, Section, Container, Typography
- วาง global layout: Header, Footer, Nav (desktop + mobile)

### Phase 1 – Marketing MVP (Static + Basic Forms)

**Scope**
- Implement pages ตาม IA พื้นฐาน:
  - Home
  - Products (listing + detail แบบ basic filter client-side)
  - Solutions (2–3 sectors แรก)
  - Case studies (list + detail, 5–10 jobs)
  - Knowledge (3–5 บทความ)
  - Professionals (download + contact)
  - About, Contact
- Implement lead forms
  - ใช้ Next.js API route + Nodemailer หรือ external email service (เช่น SendGrid)
  - Basic validation + spam protection (honeypot/reCAPTCHA v3 ในภายหลัง)

**Tech details**
- Use **static generation (SSG)** สำหรับหน้าส่วนใหญ่
- ISR / revalidate เมื่อมี content เปลี่ยน (ภายหลังถ้าเชื่อม CMS)

### Phase 2 – Enhanced Catalogue & SEO

**Features**
- Advanced filter & search สำหรับ products/patterns
- Compare patterns (เปรียบเทียบ 2–4 patterns side by side)
- Expand knowledge hub (10–20 บทความ, SEO‑optimized)
- Schema.org markup สำหรับ product/case study

**Tech**
- client-side filtering (React state) + pre-generated data JSON
- อาจเริ่มพิจารณา lightweight CMS (เช่น headless CMS) แต่ยังไม่จำเป็นถ้า volume ไม่เยอะ

### Phase 3 – Tools & B2B Enablement

**Features**
- Simple visualizer / room presets (เลือก pattern แปะบนภาพ template)
- Partner/installer portal (login + download center + training content)
- Multiple language (TH/EN)

**Tech options**
- ใช้ canvas/HTML overlay หรือ lib เบา ๆ สำหรับ visualizer
- Auth: NextAuth.js หรือ lightweight JWT-based (ถ้าต้องการ portal จริง)

---

## 5. Non-functional requirements

- **Performance**: Lighthouse score สูง, image optimization, lazy loading sections
- **Accessibility**: semantic HTML, keyboard navigation, ARIA
- **SEO**: meta, OG tags, structured data, clean URL
- **Security**: basic hardening ของ forms/API, input validation, rate limit (ถ้าจำเป็น)

---

## 6. Next steps

1. Review เอกสารนี้ + IA plan
2. Lock scope Phase 1 (page list + feature list)
3. จากนั้นค่อยเริ่มสร้าง Next.js skeleton ภายใต้ `G:/Webs/Zenta` ตามโครงที่ระบุ
4. เตรียม initial dataset (products, patterns, 5–10 case studies, 3–5 articles) เพื่อนำเข้าใน Phase 1

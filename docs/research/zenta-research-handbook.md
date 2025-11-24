# Zenta Research Handbook

_Updated: 2025-11-24_

คู่มือรวมทุกเอกสาร research สำหรับโปรเจกต์ Zenta – ตั้งแต่การเข้าใจตลาด/คู่แข่ง ไปจนถึงแผนเว็บและสถาปัตยกรรม dev

---

## 1. โครงภาพรวมของ “คัมภีร์”

เอกสารใน `docs/research` แบ่งออกเป็น 3 กลุ่มหลัก:

1. **Competitor & Market** – เข้าใจตลาดและคู่แข่ง
2. **Zenta Strategy** – ตำแหน่งของ Zenta ในตลาด และ gap/opportunity
3. **Website & Dev Architecture** – แผนเว็บและโครงสร้างระบบที่จะ build

อ่านจบชุดนี้แล้วควรตอบได้ว่า:
- ตลาดฟิล์มตกแต่งภายในในไทยมีหน้าตาอย่างไร
- คู่แข่งหลักคือใคร และแต่ละรายเก่ง/อ่อนตรงไหน
- Zenta ควรยืนตรงไหน และต้องทำเว็บแบบใดให้ “ชนะ”

---

## 2. Competitor & Market Docs

### 2.1 Hyundaifilm / BODAQ

- **ไฟล์**: `hyundaifilm-competitor-analysis.md`
- **เนื้อหา**:
  - Business overview & positioning ของ BODAQ/Hyundai L&C ในไทย
  - Offering & value prop (One Stop Service, eco/safety, 400+ patterns)
  - Digital IA/UX ของ hyundaifilm.com
  - จุดแข็ง/จุดอ่อน และ implication สำหรับ Zenta
- **ใช้เมื่อ**:
  - จะ define ว่า Zenta ต่างจาก “leader เจ้าเดิม” อย่างไร
  - ต้องการ benchmark โครง content/IA ขั้นพื้นฐาน

### 2.2 Goodfilm / 3M

- **ไฟล์**: `goodfilm-3m-competitor-analysis.md`
- **เนื้อหา**:
  - Goodfilm ในฐานะตัวแทน 3M ฟิล์มอาคาร (window + decorative)
  - Focus เรื่องของแท้, ใบรับประกัน, ทีมช่างมาตรฐาน 3M, nationwide service
  - วิเคราะห์ว่าทำไม Goodfilmแข็งมากในมุม trust & service แต่ไม่ได้โฟกัส interior film
- **ใช้เมื่อ**:
  - จะออกแบบ narrative ด้านบริการ/ทีมช่าง/ความน่าเชื่อถือของ Zenta
  - ต้องการหลีกเลี่ยงการ “กลายเป็นแค่บริษัทติดฟิล์มรวม” แบบเดียวกัน

### 2.3 Interiorfilmthailand / Younglim

- **ไฟล์**: `interiorfilmthailand-younglim-competitor-analysis.md`
- **เนื้อหา**:
  - Younglim Interior Film จากเกาหลี: luxury design & trendy color
  - Stock ในไทย, project references (คอนโด, รพ. ฯลฯ)
  - จุดแข็งด้าน design-led positioning และข้อจำกัดของ product explorer/knowledge
- **ใช้เมื่อ**:
  - จะออกแบบ image ด้าน “ดีไซน์/ลาย/โทนสี” ของ Zenta
  - จะวาง UX product browser ของ Zenta ให้เหนือกว่า design-brand ปัจจุบัน

### 2.4 XSurface / ZEITGERBER

- **ไฟล์**: `xsurface-zeitgerber-competitor-analysis.md`
- **เนื้อหา**:
  - XSurface ในฐานะ platform รวมวัสดุ, ZEITGERBER เป็น product หนึ่ง
  - product page messaging: AirBubble Free, กันน้ำ, ทนความร้อน ฯลฯ
  - จุดแข็งด้านการอธิบายคุณสมบัติ และข้อจำกัดเพราะไม่ใช่ interior film hub
- **ใช้เมื่อ**:
  - จะออกแบบหน้ารายละเอียดผลิตภัณฑ์ (pattern/spec page) ของ Zenta
  - ต้องการ inspiration ว่าจะเล่า property ของฟิล์มแบบ practical อย่างไร

### 2.5 Market Landscape

- **ไฟล์**: `thai-interior-film-market-landscape.md`
- **เนื้อหา**:
  - แบ่งผู้เล่นในตลาดเป็นกลุ่ม: principal, importer/stockist, dealer, platform, material explainer
  - Snapshot ของ Hyundaifilm, 3M/Goodfilm, Younglim, ZEITGERBER(XSurface), BC1982
  - ระบุ gaps ใหญ่ระดับตลาด เช่น lack of Thai hub, weak product discovery, absence of persona journey
- **ใช้เมื่อ**:
  - จะคุยเรื่องกลยุทธ์ระดับบริษัท/แบรนด์ (ไม่ใช่แค่เว็บ)
  - จะ pitch ว่า Zenta เข้าไป occupy ช่องว่างไหนของตลาด

---

## 3. Zenta Strategy Docs

### 3.1 Gaps & Opportunities vs Competitors

- **ไฟล์**: `zenta-gap-opportunities-vs-competitors.md`
- **เนื้อหา**:
  - สังเคราะห์จาก competitor docs + landscape
  - ตัวเลือก positioning (Digital-first hub, B2B renovation partner, hybrid)
  - Gap → Opportunity mapping (hub ภาษาไทย, tools, storytelling, persona journey, brand story)
  - Feature/content priority แบ่ง Phase 1–3
- **ใช้เมื่อ**:
  - จะ lock ว่า Zenta จะยืนตรงไหนในใจลูกค้า
  - จะ define MVP scope ว่าต้องมี feature/หน้าอะไรในเฟสแรก

---

## 4. Website & Dev Architecture Docs

### 4.1 Content & IA Plan

- **ไฟล์**: `zenta-website-content-ia-plan.md`
- **เนื้อหา**:
  - Personas: เจ้าของธุรกิจ, นักออกแบบ/สถาปนิก, เจ้าของบ้าน
  - Key journeys ของแต่ละ persona
  - Top-level IA (เมนูหลัก/หน้า): Home, Products, Solutions, Case Studies, Knowledge, For Professionals, About, Contact
  - Blueprint รายหน้า (purpose + key sections)
  - Phase rollout ของ content (MVP → Growth → Advanced tools)
- **ใช้เมื่อ**:
  - ทำ UX/wireframe
  - สื่อสารกับ team design / content writer ว่าแต่ละหน้าต้องมีอะไร

### 4.2 Dev Architecture & Roadmap

- **ไฟล์**: `zenta-website-dev-architecture-roadmap.md`
- **เนื้อหา**:
  - Tech stack: Next.js(App Router) + TS + Tailwind + shadcn-style components
  - Proposed project structure (`src/app`, `components`, `data`, `lib`, etc.)
  - Data model example: Pattern, CaseStudy, Article
  - Feature roadmap Phase 0–3 (design system → marketing MVP → enhanced catalogue/SEO → tools/portal)
  - Non-functional requirements (performance, SEO, accessibility, security)
- **ใช้เมื่อ**:
  - เตรียม setup โปรเจกต์, ตั้งโครง folder
  - วางแผน dev sprint / roadmap

---

## 5. แนะนำลำดับการอ่าน/ใช้งาน

### 5.1 ถ้าเพิ่งเริ่มเข้าใจตลาด

1. `thai-interior-film-market-landscape.md`
2. `hyundaifilm-competitor-analysis.md`
3. `goodfilm-3m-competitor-analysis.md`
4. `interiorfilmthailand-younglim-competitor-analysis.md`
5. `xsurface-zeitgerber-competitor-analysis.md`

### 5.2 ถ้าจะกำหนดกลยุทธ์ Zenta

1. ทบทวนผลจากข้อ 5.1 แบบสั้น ๆ
2. อ่าน `zenta-gap-opportunities-vs-competitors.md`

### 5.3 ถ้าจะเริ่มออกแบบเว็บ/ระบบ

1. อ่าน `zenta-website-content-ia-plan.md` → สำหรับ UX/IA
2. อ่าน `zenta-website-dev-architecture-roadmap.md` → สำหรับทีม dev

---

## 6. การใช้คัมภีร์นี้ระหว่างทำโปรเจกต์

- ระหว่างออกแบบ UX → เปิดคู่กับ `zenta-website-content-ia-plan.md` และ competitor docs ที่เกี่ยวข้อง
- ระหว่างเขียนโค้ด → อ้างอิง `zenta-website-dev-architecture-roadmap.md` เป็น spec หลัก
- ตอนต้องตัดสินใจเชิงกลยุทธ์/feature ใหม่ → กลับมาเช็ก `zenta-gap-opportunities-vs-competitors.md` + `thai-interior-film-market-landscape.md`

ถ้าจะเพิ่ม research ใหม่ (เช่น คู่แข่งเจ้าใหม่ หรือ insight จาก user test) ให้สร้างไฟล์ใหม่ในโฟลเดอร์นี้ แล้วอัปเดตทั้ง `research-index.md` และ section ที่เกี่ยวข้องใน handbook นี้ให้สอดคล้องกันเสมอ

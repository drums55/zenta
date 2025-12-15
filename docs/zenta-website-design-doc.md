# (ฉบับภาษาไทย)
# Zenta Website – Design Doc (MVP Phase 1)

_Updated: 2025-12-15_

เอกสารนี้สรุป “ดีไซน์/สเปกของเว็บ” ที่ต้องทำ เพื่อให้เว็บไซต์ Zenta รองรับ positioning **Option C (Blend)** และเป้าหมาย 30 วันแรก (validate + ปิดงานธุรกิจ) โดยแปลงจาก `docs/zenta-mvp-go-to-market-website-guide.md` ให้กลายเป็นสิ่งที่ทีม dev/content ทำตามได้ทันที

---

## 1) Scope / หลักการ

### 1.1 เป้าหมายของเว็บ (Phase 1)
- **Lead generation ที่มีคุณภาพสูง** (นัดสำรวจ/ขอใบเสนอราคา/ขอคำปรึกษา)
- **สร้างความมั่นใจ** ด้วย case studies ที่เล่า outcome + timeline + ความเสี่ยง/ข้อจำกัด
- **ทำให้เลือก “ลาย/แนวทาง” ได้ง่ายขึ้น** (pattern explorer ขั้นพื้นฐาน)
- **เป็น knowledge hub ภาษาไทย** เพื่อ educate ตลาดและลดคำถามซ้ำ
- **รองรับเส้นทางมืออาชีพ (Architect/ID/Contractor)** แบบ “เข้าถึงสเปก/ติดต่อทีมเทคนิคได้เร็ว”

### 1.2 Non-goals (ไม่ทำใน Phase 1)
- ระบบล็อกอิน/พอร์ทัล partner
- Visualizer แปะลายลงบนรูปห้องจริง
- CMS เต็มรูปแบบ (Phase 1 ใช้ file-based data)
- ระบบราคาอัตโนมัติ/คำนวณราคาหน้างานแบบจริงจัง (ให้ทำเป็น “budget band”)

### 1.3 Decision: เก็บ/โละโค้ดปัจจุบัน?
- **แนะนำ “เก็บ” โครงเดิม** เพราะ:
  - Tech stack ตรงกับ roadmap: **Next.js App Router + TS + Tailwind**
  - IA route หลักครบแล้ว (`/products`, `/solutions`, `/case-studies`, `/knowledge`, `/professionals`, `/about`, `/contact`)
  - มี data model seed (`patterns`, `case-studies`, `articles`) พร้อมต่อยอด
- สิ่งที่จะ “เปลี่ยน/เติม” คือ:
  - เพิ่ม page templates (list/detail) ที่ขาด
  - เพิ่ม components สำหรับ filter/search, cards, form
  - เติม content model ให้รองรับ requirement (spec, outcomes, timeline)

---

## 2) Reference docs

- `docs/zenta-mvp-go-to-market-website-guide.md` (ตัวแม่: positioning + funnel + MVP requirements)
- `docs/research/zenta-website-content-ia-plan.md` (IA + page blueprint)
- `docs/research/zenta-website-dev-architecture-roadmap.md` (stack + phase roadmap)
- `docs/content/IMAGERY_GUIDELINES.md` (แนวทางภาพ)

---

## 3) Positioning & Messaging (Option C)

### 3.1 One-liner (แกนข้อความ)
“รีโนเวทพื้นที่ธุรกิจให้ดูใหม่ในเวลาอันสั้น ด้วยฟิล์มตกแต่งภายใน—ไม่ฝุ่น ไม่ปิดร้านนาน พร้อมทีมติดตั้งมืออาชีพ และคลังลายให้เลือกง่ายที่สุดในไทย”

### 3.2 Value pillars (4 เสาหลัก)
- **Design & Inspiration**: ช่วยเลือก/ช่วยเห็นภาพ
- **Clarity & Transparency**: อธิบายการเลือก การใช้งาน ขั้นตอน ปัจจัยราคา แบบตรงไปตรงมา
- **Reliability & Performance**: สเปค/ข้อจำกัด/การดูแล/รับประกัน ชัด
- **Service & Partnership**: ทีมติดตั้ง + QC + aftercare ทำให้โปรเจกต์คาดการณ์ได้

### 3.3 Tone of voice
- ภาษาไทยเป็นหลัก: “ชัด, มนุษย์, ไม่ขายฝัน”
- ใช้คำที่ลดความเสี่ยงในใจลูกค้า: timeline, downtime, QC, aftercare, warranty
- หลีกเลี่ยง claim ที่ตรวจสอบไม่ได้ (Phase validate ยังเน้น “บริการ + การคัดเลือก + การติดตั้ง”)

---

## 4) Personas & Key Journeys

### 4.1 Personas
- **P1: Business Owner / Brand Manager**
  - เป้าหมาย: รีโนเวทไว, downtime ต่ำ, ไม่ปวดหัวเรื่องช่าง
  - ต้องการ: ตัวอย่างงาน sector เดียวกัน, process, timeline, budget band, trust
- **P2: Interior Designer / Architect**
  - เป้าหมาย: เลือกวัสดุให้ตรง concept + มีข้อมูลสเปกชัด
  - ต้องการ: pattern explorer, spec/download, sample request, technical contact
- **P3: Homeowner (รองใน Phase 1)**
  - เป้าหมาย: เปลี่ยนบรรยากาศแบบไม่ต้องทุบ
  - ต้องการ: before/after, FAQ, care/maintenance, budget band

### 4.2 Journeys (สิ่งที่เว็บต้อง “พาไปให้ได้”)
- **J1 (Business)**: Home/Ads → Solutions (sector) → Case study → Contact/Quote
- **J2 (Professional)**: Home → Professionals → Products (filters) → Pattern detail → Sample/Technical contact
- **J3 (Home)**: Home → Knowledge → Case study → Contact

---

## 5) Information Architecture (IA)

### 5.1 Main navigation (Phase 1)
- **หน้าแรก** `/`
- **ผลิตภัณฑ์** `/products`
- **โซลูชัน** `/solutions`
- **ผลงาน** `/case-studies`
- **ความรู้** `/knowledge`
- **สำหรับมืออาชีพ** `/professionals`
- **เกี่ยวกับ Zenta** `/about`
- **ติดต่อ / ขอใบเสนอราคา** `/contact`

### 5.2 Utility (Phase 1–2)
- **ขอ sample kit** (เริ่มด้วย CTA ไป `/contact?type=professional`)
- **ดาวน์โหลดแคตตาล็อก/สเปก** (Phase 1 วาง placeholder ใน `/professionals`)
- **FAQ / Warranty / Aftercare** (Phase 1 อาจทำเป็น section ใน About/Contact ก่อน แล้วค่อยแยกหน้า)

---

## 6) Design System (UI direction)

อิงจาก token ที่มีอยู่ใน `tailwind.config.js`
- **Background**: `#f5f0e8` (ครีมอุ่น)
- **Foreground**: `#1f2933` (ดำอมเทา)
- **Brand**:
  - `brand.DEFAULT`: `#c8b18a` (beige gold)
  - `brand.soft`: `#f3e7d8`
  - `brand.accent`: `#3f5143` (เขียวเข้ม)
- **Typography**: Sarabun (รองรับไทย/ละติน)

แนวทาง:
- ใช้ layout แบบ **air + whitespace** (ดู premium/clean)
- Cards ใช้ border บาง + background ขาวโปร่งเพื่ออ่านง่าย
- CTA หลักใช้ `brand.accent` (ปุ่มพื้นเข้ม อ่านชัด) และ/หรือ accent inverse ตามดีไซน์จริง

---

## 7) Page Templates (MVP Spec)

### 7.1 Home (`/`)
**Goal**: บอกให้ชัดว่า “ช่วยรีโนเวทธุรกิจไว” + ให้เลือกเส้นทาง persona + ปิดให้กรอก lead

**Sections (ลำดับแนะนำ)**
- **Hero**
  - Headline: รีโนเวทไว/ไม่ฝุ่น/ไม่ปิดร้านนาน
  - Subcopy: ครอบคลุม 3 persona แบบสั้น
  - Primary CTA: ไป `/contact`
  - Secondary CTA: ไป `/case-studies` หรือ `/solutions`
- **Persona entry blocks (3 columns)**
  - Business → `/solutions`
  - Professional → `/professionals`
  - Home → `/knowledge`
- **Why Zenta (value pillars)**
  - เร็ว & สะอาด
  - ดีไซน์หลากหลาย
  - ระบบ & ความรู้
- **Solutions highlight (2–3 sectors)**
  - Restaurant/Cafe, Clinic, Office/Retail (เลือกตามแผน validate)
- **Pattern showcase**
  - แยก series/โทน (wood/stone/solid/metal/special)
- **Case highlights (3–6)**
  - card ต้องมี outcome 1 บรรทัด (downtime / เปลี่ยนภาพลักษณ์)
- **Process overview (4 steps)**
  - Brief → สำรวจ/เลือก → ติดตั้ง → aftercare
- **Trust signals**
  - รีวิว/มาตรฐาน/ประสบการณ์ทีม (Phase 1: placeholders ได้)

Acceptance (Phase 1):
- มี CTA ที่ชัดและกดได้จริงอย่างน้อย 2 จุด
- มีทางไป sector pages + case studies

### 7.2 Products – Pattern Explorer (`/products`)
**Goal**: เลือก “แนว/ลาย” ได้เร็ว + มี detail ที่ช่วยตัดสินใจ + ดึงไปขอคำปรึกษา

**Listing requirements**
- Filter ขั้นพื้นฐาน:
  - series (wood/stone/solid/metal/...)
  - surfaces (wall/door/cabinet/countertop/...)
  - color family
  - recommended for persona
- Search (Phase 1 optional ถ้าข้อมูลยังน้อย)

**Pattern card**
- Thumbnail/placeholder
- Code + series
- Name
- tags สั้น ๆ: color/finish/surfaces

**Detail page (Phase 1)**
- รูป swatch/texture (ถ้ายังไม่มี ใช้ placeholder)
- Features (selling points)
- Suitable surfaces + limitations
- Recommended for (persona/sector)
- CTA: “ขอคำปรึกษา/ขอตัวอย่าง” → `/contact`

Acceptance:
- เข้าใจได้ว่าลายนี้เหมาะกับอะไร/ไม่เหมาะกับอะไร (อย่างน้อย 3 bullet)

### 7.3 Solutions (`/solutions` + sector pages)
**Goal**: เป็น “หัวใจของ Option C” → ขาย outcome สำหรับธุรกิจ

**Phase 1 sectors (เริ่ม 2–3)**
- Restaurant/Cafe
- Clinic
- Office หรือ Retail (เลือก 1)

**Sector page template**
- Hero: promise + CTA นัดสำรวจ
- Pain points ของ sector
- Recommended patterns (6–12 ลาย)
- Case highlights 2–4
- Process + timeline expectation (เชิงทั่วไป)
- FAQ เฉพาะ sector (3–6 ข้อ)

Acceptance:
- มี case references + มี CTA ชัด

### 7.4 Case Studies (`/case-studies`)
**Goal**: สร้าง trust ด้วย story + outcome

**List page**
- Filter: sector (Phase 1 ทำแค่ chips)
- Card ต้องมี:
  - sector
  - summary
  - outcomes (1–2 bullet)

**Detail page format**
- Background + objective
- Constraints (เวลา/การใช้งาน/ความเสี่ยง)
- Solution (พื้นที่ที่ทำ + ลาย/แนวทาง)
- Timeline & downtime (ถ้าไม่มี ให้ใส่เป็นช่วง)
- Outcome + before/after (Phase 1 ใช้ภาพ placeholder ได้)
- CTA ปิดท้าย: ขอคำปรึกษา

Acceptance:
- ทุกเคสต้องมี outcome ที่เป็น “ผลลัพธ์เชิงธุรกิจ/ประสบการณ์” ไม่ใช่แค่สวย

### 7.5 Knowledge (`/knowledge`)
**Goal**: educate + SEO + ลด friction

**Phase 1 topics (3–5)**
- Interior film คืออะไร
- เทียบกับทาสี/ลามิเนต/เปลี่ยนวัสดุจริง
- การดูแลรักษา/ทำความสะอาด
- ข้อจำกัด/พื้นผิวที่ไม่เหมาะ
- (Optional) วางแผนรีโนเวทให้ปิดร้านน้อยที่สุด

**Article template**
- Summary ชัด
- CTA แทรก 1–2 จุด: ขอคำปรึกษา/ส่งรูป

### 7.6 Professionals (`/professionals`)
**Goal**: ให้มืออาชีพ “เชื่อและติดต่อได้ไว”

**Sections**
- What you get: material library + support
- Download center (Phase 1: placeholder + รายการไฟล์ที่จะมี)
- Sample kit request CTA → `/contact?type=professional`
- Technical support CTA

### 7.7 About (`/about`)
**Goal**: ทำให้เชื่อว่า “ทีมทำงานเป็นระบบ”

**Sections**
- Brand story (สั้น)
- ทำไมฟิล์มตกแต่งภายใน/why now
- Process + QC mindset
- Aftercare / warranty (สรุป)
- Trust: ประสบการณ์ทีม, ภาพหน้างาน

### 7.8 Contact / Quote (`/contact`)
**Goal**: เก็บ lead ให้ครบพอจะนัดสำรวจได้โดยไม่เสียเวลา

**Form UX**
- Type selector:
  - ธุรกิจ
  - มืออาชีพ
  - บ้าน
- Fields (Phase 1 minimum)
  - ประเภทพื้นที่
  - จุดที่จะทำ (ผนัง/บาน/ตู้/เคาน์เตอร์/อื่น)
  - โลเคชัน
  - ช่วงเวลาที่อยากให้เสร็จ
  - งบประมาณเป็นช่วง (budget band)
  - แนบรูปหน้างาน (optional ถ้า implement ยาก ให้ทำภายหลัง)
  - ช่องทางติดต่อ (โทร/ไลน์/อีเมล)

**After submit**
- ขอบคุณ + แจ้ง SLA (เช่น ตอบภายใน 24–48 ชม.)
- ปุ่มลัด: เปิด Line / โทร

---

## 8) Components checklist (สำหรับ dev)

### 8.1 Layout
- Header (desktop + mobile)
- Footer
- Container / Section wrapper
- Page header (title + intro)

### 8.2 Content UI
- Card (base)
- Badge/Chip
- CTA button variants
- Accordion (FAQ)

### 8.3 Catalogue UI
- Filter bar (chips/select)
- Pattern card
- Case study card

### 8.4 Forms
- Type selector
- Input/Select/Textarea
- Form validation + error states
- Success state

---

## 9) Content model (Phase 1: file-based)

### 9.1 Pattern (ปรับจาก `src/data/patterns.ts`)
ควรรองรับเพิ่ม (optional ใน Phase 1 แต่ design ต้องเผื่อ):
- `description` (ไทย)
- `specs` (ถ้ามี): thickness, width, fire rating, VOC, warranty
- `gallery` (ภาพเพิ่ม)
- `limitations` (ข้อจำกัด/ไม่ควรใช้)

### 9.2 Case Study (ปรับจาก `src/data/case-studies.ts`)
ควรรองรับเพิ่ม:
- `objective` / `constraints`
- `timeline` / `downtime`
- `usedSurfaces` (ผนัง/ตู้/...) เพื่อ map ไป solutions

### 9.3 Article (จาก `src/data/articles.ts`)
Phase 1 ทำได้ 2 ทาง:
- เก็บเป็น TS struct แบบเดิม แล้ว render เป็น “บทความสั้น”
- หรือเริ่มทำ markdown/MDX (Phase 2)

---

## 10) SEO / Analytics (Phase 1)

### 10.1 SEO basics
- URL สั้น/สื่อความ: `/solutions/clinic`, `/case-studies/<slug>`, `/products/<slug>`
- Meta title/description ต่อหน้า
- OG image (ใช้ default ก่อน)

### 10.2 Analytics events (ขั้นต่ำ)
- `lead_submit` (type=business/pro/home)
- `click_line`
- `click_tel`
- `view_pattern_detail`
- `view_case_study_detail`

### 10.3 Measurement loop (ผูกกับ Win/Loss log)
- ทุก lead จากเว็บต้องได้:
  - persona/type
  - sector
  - use case
  - budget band
  - source/utm (ถ้าใช้ ads)

---

## 11) MVP readiness checklist (ก่อนปล่อยเว็บ)

- Patterns อย่างน้อย 20–30 ลาย (มี code + name + tags)
- Case study อย่างน้อย 3 เคส (มี outcome + timeline)
- Knowledge 3–5 บทความ
- Contact form ใช้งานได้จริง + SLA copy
- ภาพ (อย่างน้อย placeholder) ตาม `docs/content/IMAGERY_GUIDELINES.md`

---

## 12) Open questions (ให้คุณตอบเพื่อ lock scope)

- จะ “เรียกสินค้า” บนเว็บว่าอะไรในช่วง validate (ยังไม่ import)?
  - (A) เรียกเป็น “Zenta Interior Film” เลย
  - (B) เรียกเป็น “Interior Film Library by Zenta (บริการคัดเลือก+ติดตั้ง)”
- Sector priority 2–3 อันดับแรกที่จะทำหน้า solutions คืออะไร (Restaurant/Clinic/Office/Retail?)
- CTA หลักจะให้ไปช่องทางไหนเป็น default: Line OA / โทร / ฟอร์ม?

---

## 13) Next actions (หลัง approve doc)

- Lock scope Phase 1 (pages + sectors + form fields)
- ออกแบบ UI components (card/filter/form) ให้ consistent
- เติม data model + seed dataset (patterns/case/articles)
- Implement pages ตาม acceptance criteria

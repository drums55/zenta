# Zenta Docs Structure Plan

_Updated: 2025-11-25_

โครงนี้อธิบายว่าโฟลเดอร์ `docs/` ของโปรเจกต์ Zenta ควรถูกใช้ยังไง เพื่อให้ไม่รก และหาอะไรเจอง่าย

ปัจจุบันมี:
- `docs/research/`
- `docs/rules/`
- เอกสารแผนเว็บ/ระบบในราก `docs/`

---

## 1. เป้าหมายของ docs/

- เป็นที่รวม:
  - **Research & Strategy** (ตลาด, คู่แข่ง, positioning)
  - **Project Rules** (สำหรับ AI/มนุษย์)
  - **Architecture & System Design**
  - **Content / IA Specs**
- ต้อง **lean, practical, discoverable** – ใช้อ้างอิงและตัดสินใจ ไม่ใช่ที่ dump โน้ตมั่ว ๆ

---

## 2. โครงที่แนะนำ

```text
docs/
  DOCS_STRUCTURE.md          ← ไฟล์นี้
  zenta-research-handbook.md ← คัมภีร์รวม research
  zenta-website-content-ia-plan.md
  zenta-website-dev-architecture-roadmap.md

  research/                  ← งาน research ทั้งหมด
    ... (competitor, market, strategy docs)

  rules/                     ← กฎและ guideline ระดับโปรเจกต์
    AI_AGENT_RULES.md        ← กฎสำหรับ AI ทุกตัวในโปรเจกต์
    (สามารถเพิ่ม DEV_RULES.md หรือ HUMAN_WORKFLOW.md ภายหลังได้)

  (optional ภายหลัง)
  architecture/              ← ถ้าระบบโตขึ้น แยกเอกสารสถาปัตยกรรมย่อยได้
  content/                   ← ถ้ามี spec content/copy ละเอียด แยกมาโฟลเดอร์นี้
```

ตอนนี้เราใช้แค่ `research/` + `rules/` + root docs พื้นฐาน ซึ่งเพียงพอสำหรับ Phase 1

---

## 3. แนวทางการเพิ่มเอกสารใหม่

1. **ถามตัวเองก่อนสร้าง doc ใหม่:**
   - ใครจะใช้? (dev / design / content / business)
   - ใช้เพื่อตัดสินใจอะไร?
   - เนื้อหาซ้ำกับ doc ที่มีอยู่แล้วหรือเปล่า?

2. **วางที่ให้ถูกที่:**
   - ถ้าเป็น **การวิเคราะห์ตลาด/คู่แข่ง/กลยุทธ์** → `docs/research/`
   - ถ้าเป็น **กฎ, process, guideline** → `docs/rules/`
   - ถ้าเป็น **รายละเอียดสถาปัตยกรรมเชิงเทคนิค** → ตอนนี้ใส่ที่ root (`zenta-website-dev-architecture-roadmap.md`)  
     - ถ้ามีหลายไฟล์ในอนาคต → ย้ายไป `docs/architecture/`
   - ถ้าเป็น **content spec, tone of voice, messaging** → สามารถสร้าง `docs/content/` ภายหลัง

3. **ตั้งชื่อไฟล์ให้สื่อชัดเจน**
   - ใช้ pattern: `TOPIC-DESCRIPTION.md` หรือ `topic-description.md`
   - เลี่ยงชื่อ generic เช่น `notes.md`, `temp.md`, `draft.md`

---

## 4. วิธีใช้ร่วมกับ AI agents

- เวลามี AI ตัวใหม่เข้ามาทำงานในโปรเจกต์:
  - ให้เริ่มจากอ่าน:
    - `docs/DOCS_STRUCTURE.md` (เข้าใจโครง docs)
    - `docs/rules/AI_AGENT_RULES.md` (เข้าใจกฎ)
    - `docs/zenta-research-handbook.md` (เข้าใจ research & strategy)
- เวลา AI จะสร้าง doc ใหม่ ควรตรวจ `DOCS_STRUCTURE.md` ว่าเหมาะจะวางที่ไหน

---

## 5. การ evolve โครง docs ในอนาคต

เมื่อโปรเจกต์โตขึ้น อาจทำสิ่งเหล่านี้:

- สร้าง `docs/architecture/` แยกเอกสารเช่น `SYSTEM_OVERVIEW.md`, `DATA_MODEL.md`, `INTEGRATIONS.md`
- สร้าง `docs/content/` สำหรับ tone of voice, messaging guideline, page-level copy spec
- สร้าง `docs/process/` ถ้าทีมเริ่มมี workflow เฉพาะ (เช่น QA checklist, release process)

หลักการสำคัญคือ: **ต้องมั่นใจว่าทุก doc จะถูกใช้จริง และคนใหม่สามารถเข้าใจโปรเจกต์จาก docs ได้ภายในเวลาไม่นาน**

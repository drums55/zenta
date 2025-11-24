# Zenta Imagery Guidelines

_Updated: 2025-11-25_

เว็บ Zenta จะพึ่งพา "ภาพสวย" อย่างมาก ทั้ง hero, section background, และภาพผลงานจริง จึงต้องวางหลักการเรื่องภาพตั้งแต่ต้น

---

## 1. ประเภทภาพหลัก

1. **Hero / Key Visuals**
   - ใช้ภาพที่สื่อถึง:
     - การรีโนเวท space ด้วยฟิล์ม (before/after)
     - บรรยากาศ interior ที่อบอุ่น/modern (hotel, café, office, home)
   - Mood & tone: clean, modern, natural light, คอนทราสต์ไม่จัดเกินไป

2. **Sector-specific imagery** (สำหรับหน้า Solutions)
   - ร้านอาหาร & คาเฟ่, รีเทล, คลินิก/โรงพยาบาล, โรงแรม, สำนักงาน, บ้าน/คอนโด
   - แต่ละ sector ควรมีภาพตัวแทน 2–4 ภาพต่อ sector

3. **Case Study / Project Images**
   - ภาพจริงจากหน้างานของ Zenta หรือ partner
   - เน้น before/after, detail shot (texture film) และ wide shot (space)

4. **Detail / Texture Shots**
   - close-up ผิวฟิล์ม (ไม้, หิน, cement, fabric ฯลฯ)
   - ใช้ประกอบ product/pattern page หรือ section ที่อธิบาย material

---

## 2. แหล่งภาพ (Source Options)

### 2.1 Stock – iStockPhoto (มี account อยู่แล้ว)

**Use cases:**
- Hero background (โดยเฉพาะช่วงแรกที่ยังไม่มีภาพงานจริงมากพอ)
- ภาพ reference สำหรับ sector-specific (ร้านอาหาร, office ฯลฯ)
- Mood imagery สำหรับบทความ/knowledge

**Guideline:**
- เลือกรูปที่ **ไม่ระบุ brand/โลโก้ชัด** เพื่อลดปัญหา legal/branding
- ถ้าเป็นภาพห้อง → พยายามเลือกมุมที่สามารถจินตนาการว่า "ติดฟิล์ม" ได้
- หลีกเลี่ยงภาพที่รู้สึก stocky เกินไป (คนโพสท่าทางไม่เป็นธรรมชาติ)

**Resolution & Aspect:**
- Hero desktop:
  - **แนะนำ**: อย่างน้อย 2400×1350 px, aspect 16:9 หรือ 21:9
  - จะถูกครอป responsive ด้วย CSS/`object-fit: cover`
- Section background / banner ย่อย:
  - ~1920×1080 px เพียงพอสำหรับ full-width section
- Card / thumbnail:
  - 800×600 px ขึ้นไป (4:3 หรือ 3:2) แล้วให้ Next/Image scale ลง

เมื่อนาย (AI) แนะนำภาพจาก iStock ในอนาคต:
- แนะนำ **keyword ค้นหา + brief mood/angle**
- ระบุ usage (เช่น "Hero Home", "Solutions – Restaurant section")
- ระบุ **min size** ที่ควรดาวน์โหลด (เช่น "ใช้เวอร์ชัน Large 2400px+")

### 2.2 ภาพจากงานจริง / ถ่ายเพิ่ม

ใช้เมื่อ:
- Case study ของ Zenta (ต้องชัดว่า "นี่คืองานเรา")
- หน้า About / Company / Team
- ภาพหน้างานที่ต้องโชว์ความน่าเชื่อถือ (เช่น เจ้าของธุรกิจ/ช่างกำลังทำงาน)

Guideline สำหรับการถ่าย/สร้างภาพ:
- เน้น **แสงธรรมชาติ** ถ้าเป็นไปได้ (ลด noise และสีเพี้ยน)
- ถ่ายทั้ง:
  - Wide shot – เห็นทั้ง space เพื่อเล่า context
  - Medium shot – โฟกัสบริเวณที่ติดฟิล์ม (เช่น ตู้, ผนัง, เคาน์เตอร์)
  - Detail shot – เห็น texture ใกล้ ๆ
- ถ้าเป็น before/after:
  - พยายามใช้มุมกล้องและแสงใกล้เคียงกันมากที่สุด

Resolution recommendation:
- ถ่ายที่อย่างน้อย **3000px กว้างขึ้นไป** เพื่อรองรับ crop หลายแบบ
- บันทึกเป็น JPEG คุณภาพสูง หรือ RAW → export ภายหลัง

---

## 3. การใช้งานภาพใน Next.js

ใช้ `next/image` เป็นหลัก:
- ตั้งค่า `sizes` และ `fill`/`width`/`height` ให้เหมาะกับ layout
- ให้โหลดภาพจาก:
  - `/public/images/...` สำหรับภาพที่จัดการเอง
  - external domains (เช่น iStock CDN หรือ storage อื่น) ที่ต้องเพิ่มใน `next.config.ts` `images.domains`

แนวคิดคร่าว ๆ:
- Hero: ใช้ background layer (CSS) หรือ `<Image fill>` + overlay gradient
- Card/thumbnail: ใช้ `<Image width={x} height={y} />` เพื่อล็อก aspect

---

## 4. ไอเดีย mapping ภาพ → sections

ตัวอย่าง mapping ระดับสูง (ใช้ตอน implement หน้า):

- **Home**
  - Hero: ภาพ interior modern/soft minimal ที่สื่อถึง apartment/retail space รีโนเวทแล้ว
  - Persona blocks: iconography + small imagery/texture background
  - Case highlight: ภาพจากงานจริง (ถ้ายังไม่มี ให้ใช้ stock ที่ mood ใกล้เคียง)

- **Solutions (แต่ละ sector)**
  - Hero per sector: ภาพ stock หรือภาพจริงที่ match sector นั้น
  - Gallery ย่อย: 3–6 ภาพต่อ sector

- **Products / Patterns**
  - Detail shot per pattern (เมื่อพร้อม)
  - สามารถใช้ mockup/visualization ภายหลัง (Phase 2+)

- **Case Studies**
  - อย่างน้อย 3 ภาพต่อเคส (ก่อน, หลัง, detail)

---

## 5. Workflow แนะนำ

1. ระหว่างออกแบบ/implement section ไหน ให้ AI แนะนำ:
   - ประเภทภาพที่เหมาะ
   - keyword สำหรับค้นใน iStock
   - ขนาดขั้นต่ำที่ควรใช้
2. ทีมคุณจะ:
   - ไปโหลดภาพจาก iStock หรือจัดการถ่าย/สร้าง
   - วางไฟล์ลงใน `public/images/...` หรือ storage อื่น
3. เมื่อมีภาพจริงแล้ว ให้ update component/section ให้ใช้ภาพจริงแทน stock

แนวคิดคือ: **เริ่มด้วย stock ที่ mood ถูก แล้วค่อย ๆ replace ด้วยภาพงานจริงของ Zenta เมื่อเวลาผ่านไป**

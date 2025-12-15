"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import { demoCaseStudies, type CaseStudySector } from "@/data/case-studies";

const sectorLabels: Record<CaseStudySector, string> = {
  "restaurant-cafe": "ร้านอาหาร & คาเฟ่",
  retail: "ร้านค้า & รีเทล",
  "clinic-hospital": "คลินิก & โรงพยาบาล",
  hotel: "โรงแรม & รีสอร์ต",
  office: "สำนักงาน & Co-working",
  residential: "บ้าน & คอนโด",
};

export default function CaseStudiesPage() {
  const [selectedSector, setSelectedSector] = useState<CaseStudySector | null>(
    null,
  );

  const availableSectors = useMemo(
    () => Array.from(new Set(demoCaseStudies.map((cs) => cs.sector))),
    [],
  );

  const filteredCaseStudies = useMemo(() => {
    return demoCaseStudies.filter((cs) => {
      if (selectedSector && cs.sector !== selectedSector) {
        return false;
      }

      return true;
    });
  }, [selectedSector]);

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ผลงาน / Case Studies
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          ดูตัวอย่างงานรีโนเวทที่ใช้ฟิล์มตกแต่งภายในจาก Zenta ทั้งภาพก่อน–หลัง และเรื่องราวของโปรเจกต์
          เพื่อให้เห็นว่าฟิล์มช่วยเปลี่ยนบรรยากาศและประสบการณ์ของ space ได้อย่างไร
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200/80 bg-white/80 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
              ประเภทงาน
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSelectedSector(null)}
                className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                  selectedSector === null
                    ? "border-brand-accent bg-brand-accent text-slate-50"
                    : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                }`}
              >
                ทั้งหมด
              </button>
              {availableSectors.map((sector) => (
                <button
                  key={sector}
                  type="button"
                  onClick={() =>
                    setSelectedSector((current) =>
                      current === sector ? null : sector,
                    )
                  }
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                    selectedSector === sector
                      ? "border-brand-accent bg-brand-accent text-slate-50"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  {sectorLabels[sector]}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="text-xs text-slate-600">
              แสดง <span className="font-semibold">{filteredCaseStudies.length}</span> รายการ
            </p>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {filteredCaseStudies.map((cs) => (
          <Link
            key={cs.id}
            href={`/case-studies/${cs.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
          >
            <div className="mb-4 h-32 w-full rounded-xl bg-gradient-to-br from-brand-soft via-white to-brand/40" />
            <div className="flex items-center justify-between text-xs text-slate-600">
              <span className="uppercase tracking-[0.18em]">
                {sectorLabels[cs.sector]}
              </span>
              {cs.location ? (
                <span className="text-[11px] text-slate-500">{cs.location}</span>
              ) : null}
            </div>
            <h2 className="mt-2 text-base font-semibold leading-snug text-slate-900">
              {cs.title}
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-700">
              {cs.summary}
            </p>
            {cs.outcomes.length > 0 && (
              <ul className="mt-3 space-y-1 text-[11px] leading-relaxed text-slate-700">
                {cs.outcomes.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            )}
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              ดูรายละเอียด
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

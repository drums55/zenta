"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  demoPatterns,
  type PatternPersonaKey,
  type PatternSeries,
  type PatternSurface,
} from "@/data/patterns";

const seriesLabels: Record<PatternSeries, string> = {
  wood: "ลายไม้",
  stone: "ลายหิน",
  concrete: "ลายปูน",
  metal: "ลายโลหะ",
  solid: "สีพื้น",
  "soft-matte": "Soft matte",
  gloss: "Gloss",
};

const surfaceLabels: Record<PatternSurface, string> = {
  wall: "ผนัง",
  door: "ประตู/บาน",
  cabinet: "ตู้",
  countertop: "เคาน์เตอร์",
  column: "เสา",
  other: "อื่น ๆ",
};

const personaLabels: Record<PatternPersonaKey, string> = {
  businessOwner: "เจ้าของธุรกิจ",
  designer: "นักออกแบบ/สถาปนิก",
  homeowner: "เจ้าของบ้าน",
};

const finishLabels = {
  matte: "ด้าน",
  satin: "ซาติน",
  gloss: "เงา",
  texture: "เท็กซ์เจอร์",
} as const;

export default function ProductsPage() {
  const [selectedSeries, setSelectedSeries] = useState<PatternSeries | null>(null);
  const [selectedSurface, setSelectedSurface] = useState<PatternSurface | null>(null);
  const [selectedPersona, setSelectedPersona] = useState<PatternPersonaKey | null>(null);

  const availableSeries = useMemo(
    () => Array.from(new Set(demoPatterns.map((pattern) => pattern.series))),
    [],
  );

  const availableSurfaces = useMemo(() => {
    const surfaces = demoPatterns.flatMap((pattern) => pattern.surfaces);
    return Array.from(new Set(surfaces));
  }, []);

  const availablePersonas = useMemo(() => {
    const personas = demoPatterns.flatMap((pattern) => pattern.recommendedFor);
    return Array.from(new Set(personas));
  }, []);

  const filteredPatterns = useMemo(() => {
    return demoPatterns.filter((pattern) => {
      if (selectedSeries && pattern.series !== selectedSeries) {
        return false;
      }

      if (selectedSurface && !pattern.surfaces.includes(selectedSurface)) {
        return false;
      }

      if (selectedPersona && !pattern.recommendedFor.includes(selectedPersona)) {
        return false;
      }

      return true;
    });
  }, [selectedPersona, selectedSeries, selectedSurface]);

  const hasActiveFilters = Boolean(
    selectedSeries || selectedSurface || selectedPersona,
  );

  function clearFilters() {
    setSelectedSeries(null);
    setSelectedSurface(null);
    setSelectedPersona(null);
  }

  return (
    <div className="container space-y-6 py-10">
      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          ผลิตภัณฑ์ Zenta Interior Film
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-slate-700 md:text-base">
          เลือกดูตัวอย่างลายฟิล์มตกแต่งภายในจาก Zenta พร้อมโทนสี พื้นผิว และประเภทงานที่เหมาะสม
          ใช้ตัวกรองเพื่อคัดลายให้ตรงกับพื้นที่ของคุณ
        </p>
      </header>

      <section className="rounded-2xl border border-slate-200/80 bg-white/80 p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                ซีรีส์
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSeries(null)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                    selectedSeries === null
                      ? "border-brand-accent bg-brand-accent text-slate-50"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  ทั้งหมด
                </button>
                {availableSeries.map((series) => (
                  <button
                    key={series}
                    type="button"
                    onClick={() =>
                      setSelectedSeries((current) =>
                        current === series ? null : series,
                      )
                    }
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                      selectedSeries === series
                        ? "border-brand-accent bg-brand-accent text-slate-50"
                        : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {seriesLabels[series]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                พื้นผิว
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedSurface(null)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                    selectedSurface === null
                      ? "border-brand-accent bg-brand-accent text-slate-50"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  ทั้งหมด
                </button>
                {availableSurfaces.map((surface) => (
                  <button
                    key={surface}
                    type="button"
                    onClick={() =>
                      setSelectedSurface((current) =>
                        current === surface ? null : surface,
                      )
                    }
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                      selectedSurface === surface
                        ? "border-brand-accent bg-brand-accent text-slate-50"
                        : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {surfaceLabels[surface]}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-600">
                สำหรับใคร
              </p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setSelectedPersona(null)}
                  className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                    selectedPersona === null
                      ? "border-brand-accent bg-brand-accent text-slate-50"
                      : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                >
                  ทั้งหมด
                </button>
                {availablePersonas.map((persona) => (
                  <button
                    key={persona}
                    type="button"
                    onClick={() =>
                      setSelectedPersona((current) =>
                        current === persona ? null : persona,
                      )
                    }
                    className={`rounded-full border px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] transition ${
                      selectedPersona === persona
                        ? "border-brand-accent bg-brand-accent text-slate-50"
                        : "border-slate-200/80 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {personaLabels[persona]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 md:items-end">
            <p className="text-xs text-slate-600">
              แสดง <span className="font-semibold">{filteredPatterns.length}</span> รายการ
            </p>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="rounded-full border border-slate-200/80 bg-white px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 transition hover:border-slate-300"
              >
                ล้างตัวกรอง
              </button>
            ) : null}
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {filteredPatterns.map((pattern) => (
          <Link
            key={pattern.id}
            href={`/products/${pattern.slug}`}
            className="group flex flex-col rounded-xl border border-slate-200/80 bg-white/90 p-5 text-sm text-slate-800 transition hover:border-slate-300 hover:bg-white"
          >
            <div className="mb-4 h-32 w-full rounded-xl bg-gradient-to-br from-brand-soft via-white to-brand/40" />
            <div className="mb-2 flex items-center justify-between text-xs text-slate-600">
              <span className="font-mono text-[11px] uppercase tracking-[0.18em]">
                {pattern.code}
              </span>
              <span className="rounded-full bg-slate-900/70 px-2 py-[2px] text-[10px] uppercase tracking-[0.18em] text-slate-100">
                {seriesLabels[pattern.series]}
              </span>
            </div>
            <h2 className="text-base font-semibold leading-snug text-slate-900">
              {pattern.name}
            </h2>
            <p className="mt-1 text-xs text-slate-700">
              โทนสี: {pattern.colorFamily} • ผิว: {finishLabels[pattern.finish]}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-slate-700">
              เหมาะกับพื้นผิว: {pattern.surfaces.map((surface) => surfaceLabels[surface]).join(", ")}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-slate-600">
              เหมาะสำหรับ: {pattern.recommendedFor.map((persona) => personaLabels[persona]).join(", ")}
            </p>
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-accent">
              ดูรายละเอียด
            </p>
          </Link>
        ))}
      </section>
    </div>
  );
}

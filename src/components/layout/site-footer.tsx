export function SiteFooter() {
  return (
    <footer className="border-t border-white/5 bg-background/90">
      <div className="container flex flex-col gap-3 py-6 text-xs text-slate-400 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-slate-200">Zenta</p>
          <p className="max-w-md">
            Interior film experience for modern Thai spaces. Research-driven, design-first, and built for fast, clean renovation.
          </p>
        </div>
        <p className="text-[11px] text-slate-500">
          © {new Date().getFullYear()} Zenta. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

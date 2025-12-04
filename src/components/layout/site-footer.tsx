export function SiteFooter() {
  return (
    <footer className="border-t border-slate-200/80 bg-background">
      <div className="container flex flex-col gap-3 py-6 text-xs text-slate-600 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <p className="font-medium text-slate-900">Zenta</p>
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

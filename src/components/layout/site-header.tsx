import Link from "next/link";

const navItems = [
  { href: "/", label: "หน้าแรก" },
  { href: "/products", label: "ผลิตภัณฑ์" },
  { href: "/solutions", label: "โซลูชัน" },
  { href: "/case-studies", label: "ผลงาน" },
  { href: "/knowledge", label: "ความรู้" },
  { href: "/professionals", label: "สำหรับมืออาชีพ" },
  { href: "/about", label: "เกี่ยวกับ Zenta" },
  { href: "/contact", label: "ติดต่อ" },
];

export function SiteHeader() {
  return (
    <header className="border-b border-white/5 bg-background/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-[0.2em] uppercase">
          <span className="inline-block h-5 w-5 rounded-full bg-brand-accent" aria-hidden="true" />
          <span>Zenta</span>
        </Link>
        <nav className="hidden items-center gap-5 text-xs text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

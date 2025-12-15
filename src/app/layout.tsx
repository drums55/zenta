 import type { Metadata } from "next";
import { Suspense, type ReactNode } from "react";
import { Sarabun } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { RouteAnalytics } from "@/components/analytics/route-analytics";

const sarabun = Sarabun({
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700"],
  variable: "--font-sarabun",
});

export const metadata: Metadata = {
  title: {
    default: "Zenta",
    template: "%s | Zenta",
  },
  description:
    "รีโนเวทพื้นที่ธุรกิจด้วยฟิล์มตกแต่งภายใน—เร็ว สะอาด ไม่ต้องปิดร้านนาน พร้อมตัวอย่างผลงานและคลังลายจาก Zenta",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;

  return (
    <html lang="th" className={sarabun.variable}>
      <body className="min-h-screen bg-background text-foreground antialiased font-sans">
        {gaId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
function gtag(){window.dataLayer.push(arguments);}
window.gtag = window.gtag || gtag;
gtag('js', new Date());
gtag('config', '${gaId}', { send_page_view: false });`}
            </Script>
          </>
        ) : null}
        <div className="flex min-h-screen flex-col">
          <SiteHeader />
          <Suspense fallback={null}>
            <RouteAnalytics />
          </Suspense>
          <main className="flex-1">
            {children}
          </main>
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}

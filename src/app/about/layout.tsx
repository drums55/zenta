import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "เกี่ยวกับ Zenta",
  description:
    "เรื่องราวและแนวคิดของ Zenta: แบรนด์ฟิล์มตกแต่งภายในสำหรับการรีโนเวทที่เร็ว สะอาด และควบคุมงบได้",
};

export default function AboutLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

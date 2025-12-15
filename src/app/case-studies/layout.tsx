import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ผลงาน / Case Studies",
  description:
    "ดูตัวอย่างงานรีโนเวทด้วยฟิล์มตกแต่งภายในของ Zenta ทั้งก่อน–หลัง ข้อจำกัดหน้างาน และผลลัพธ์ที่ได้",
};

export default function CaseStudiesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

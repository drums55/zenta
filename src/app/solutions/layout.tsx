import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "โซลูชันตามประเภทงาน",
  description:
    "เลือกโซลูชันตาม sector เพื่อเห็นปัญหาที่พบบ่อย แนวทางแก้ และผลงานที่เกี่ยวข้อง เหมาะสำหรับเจ้าของธุรกิจ (Option C)",
};

export default function SolutionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

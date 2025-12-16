import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "โซลูชันตามประเภทงาน",
  description:
    "เลือกโซลูชันตามประเภทงานเพื่อเห็นปัญหาที่พบบ่อย แนวทางแก้ และผลงานที่เกี่ยวข้อง",
};

export default function SolutionsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

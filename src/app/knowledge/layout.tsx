import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ความรู้เรื่องฟิล์มตกแต่งภายใน",
  description:
    "บทความและคู่มือพื้นฐานเกี่ยวกับฟิล์มตกแต่งภายใน: การเลือกวัสดุ การดูแลรักษา และไอเดียการออกแบบ",
};

export default function KnowledgeLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

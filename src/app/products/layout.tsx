import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ลายฟิล์ม / ผลิตภัณฑ์",
  description:
    "สำรวจลายฟิล์มตกแต่งภายในของ Zenta เลือกซีรีส์ โทนสี และพื้นผิวที่เหมาะกับผนัง ประตู ตู้ และเคาน์เตอร์",
};

export default function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

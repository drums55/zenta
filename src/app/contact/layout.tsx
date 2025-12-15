import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ติดต่อ / ขอใบเสนอราคา",
  description:
    "ส่งรายละเอียดพื้นที่และข้อจำกัด (เวลา/พื้นผิว/โลเคชัน) เพื่อให้ทีม Zenta แนะนำลายและนัดสำรวจ พร้อมประเมินแนวทางรีโนเวท",
};

export default function ContactLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

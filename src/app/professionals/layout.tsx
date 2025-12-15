import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "สำหรับมืออาชีพ (Architect / ID / Contractor)",
  description:
    "พื้นที่สำหรับสถาปนิกและนักออกแบบ: catalogue, spec sheet และช่องทางติดต่อทีมเทคนิคของ Zenta",
};

export default function ProfessionalsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <>{children}</>;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Zenta",
  description: "Zenta – Next-generation interior film brand for Thailand",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}

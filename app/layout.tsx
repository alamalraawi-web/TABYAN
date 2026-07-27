import type { Metadata } from "next";
import "./globals.css";
import { TibyanShell } from "../components/tibyan-shell";

export const metadata: Metadata = {
  title: {
    default: "تبيان | منصة صحية ذكية",
    template: "%s | تبيان",
  },
  description: "منصة صحية تجمع الطب والهندسة والذكاء الاصطناعي في تجربة عربية حديثة.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        <TibyanShell>{children}</TibyanShell>
      </body>
    </html>
  );
}

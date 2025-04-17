import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "스토리메이커 - AI와 함께 당신의 소설을 완성하세요",
  description: "하루 1시간만 투자해도 퀄리티 높은 소설을 쓰고 수익화까지 가능한 AI 소설 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        {children}
      </body>
    </html>
  );
}

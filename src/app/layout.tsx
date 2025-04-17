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
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <a href="/" className="font-bold text-xl">스토리메이커</a>
                </div>
                <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                  <a href="/" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                    홈
                  </a>
                </div>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:items-center">
                <a href="/register" className="px-3 py-2 mx-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  시작하기
                </a>
              </div>
            </div>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}

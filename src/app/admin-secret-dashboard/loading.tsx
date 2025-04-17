export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mb-4"></div>
        <p className="text-xl font-medium">데이터를 불러오는 중...</p>
        <p className="text-gray-500 mt-2">잠시만 기다려주세요</p>
      </div>
    </div>
  );
} 
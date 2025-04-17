'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // 오류 로깅
    console.error('대시보드 오류:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto text-center py-20">
        <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-bold text-red-600 mb-4">대시보드 로딩 오류</h2>
          <p className="text-gray-700 dark:text-gray-300 mb-6">
            데이터를 불러오는 중 오류가 발생했습니다. 
            {error.message && (
              <span className="block mt-2 text-sm bg-red-50 dark:bg-red-900 p-2 rounded">
                오류 메시지: {error.message}
              </span>
            )}
          </p>
          <div className="space-x-4">
            <button
              onClick={() => reset()}
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg"
            >
              다시 시도
            </button>
            <Link 
              href="/" 
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-2 px-4 rounded-lg"
            >
              홈으로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
} 
export default function DashboardLoading() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div className="h-8 w-48 bg-gray-300 animate-pulse rounded-md"></div>
          <div className="h-8 w-32 bg-blue-300 animate-pulse rounded-lg"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-32">
              <div className="h-4 w-32 bg-gray-300 animate-pulse rounded-md mb-3"></div>
              <div className="h-8 w-16 bg-gray-300 animate-pulse rounded-md mb-3"></div>
              <div className="h-3 w-48 bg-gray-300 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-96">
              <div className="h-6 w-40 bg-gray-300 animate-pulse rounded-md mb-8"></div>
              <div className="h-80 w-full bg-gray-200 animate-pulse rounded-md"></div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((item) => (
            <div key={item} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm h-64">
              <div className="h-6 w-36 bg-gray-300 animate-pulse rounded-md mb-4"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4].map((row) => (
                  <div key={row} className="h-8 w-full bg-gray-200 animate-pulse rounded-md"></div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 
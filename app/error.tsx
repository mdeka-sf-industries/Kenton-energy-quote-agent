'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong!</h2>
        <button
          onClick={reset}
          className="bg-kenton-primary hover:bg-kenton-secondary text-white px-6 py-3 rounded-3xl font-medium transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  )
}




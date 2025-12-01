'use client'

import { useState } from 'react'
import { useQuoteStore } from '@/lib/stores/quoteStore'

export default function PostcodeStep() {
  const { postcode, setPostcode, nextStep } = useQuoteStore()
  const [localPostcode, setLocalPostcode] = useState(postcode)
  const [error, setError] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    // Basic validation
    const trimmedPostcode = localPostcode.trim().toUpperCase()
    if (!trimmedPostcode) {
      setError('Please enter a postcode')
      return
    }

    // UK postcode format validation (basic)
    const postcodeRegex = /^[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2}$/i
    if (!postcodeRegex.test(trimmedPostcode)) {
      setError('Please enter a valid UK postcode')
      return
    }

    setError('')
    setPostcode(trimmedPostcode)
    nextStep()
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Enter your postcode
        </h2>
        <p className="text-gray-600">
          We'll use this to find available energy plans in your area
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="postcode"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Postcode <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              id="postcode"
              value={localPostcode}
              onChange={(e) => {
                setLocalPostcode(e.target.value.toUpperCase())
                setError('')
              }}
              placeholder="e.g., SW10 9AS"
              className={`w-full pl-12 pr-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent ${
                error ? 'border-red-500' : 'border-gray-300'
              }`}
              style={{ textTransform: 'uppercase' }}
            />
          </div>
          {error && (
            <p className="mt-2 text-sm text-red-500">{error}</p>
          )}
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => useQuoteStore.getState().previousStep()}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-kenton-primary text-white rounded-xl font-medium hover:bg-kenton-secondary transition-colors"
          >
            Next
          </button>
        </div>
      </form>
    </div>
  )
}


'use client'

import { useQuoteStore } from '@/lib/stores/quoteStore'

export default function CustomerTypeStep() {
  const { customerType, setCustomerType, nextStep } = useQuoteStore()

  const handleSelect = (type: 'residential' | 'small-business') => {
    setCustomerType(type)
    // Auto-advance to next step after selection
    setTimeout(() => nextStep(), 300)
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What type of customer are you?
        </h2>
        <p className="text-gray-600">
          Select the option that best describes you
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Residential Option */}
        <button
          onClick={() => handleSelect('residential')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            customerType === 'residential'
              ? 'border-kenton-primary bg-kenton-primary-light'
              : 'border-gray-200 hover:border-kenton-primary hover:bg-gray-50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                customerType === 'residential'
                  ? 'border-kenton-primary bg-kenton-primary'
                  : 'border-gray-300'
              }`}
            >
              {customerType === 'residential' && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Residential
              </h3>
              <p className="text-sm text-gray-600">
                For home and personal use
              </p>
            </div>
          </div>
        </button>

        {/* Small Business Option */}
        <button
          onClick={() => handleSelect('small-business')}
          className={`p-6 rounded-xl border-2 transition-all text-left ${
            customerType === 'small-business'
              ? 'border-kenton-primary bg-kenton-primary-light'
              : 'border-gray-200 hover:border-kenton-primary hover:bg-gray-50'
          }`}
        >
          <div className="flex items-start space-x-4">
            <div
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-1 ${
                customerType === 'small-business'
                  ? 'border-kenton-primary bg-kenton-primary'
                  : 'border-gray-300'
              }`}
            >
              {customerType === 'small-business' && (
                <svg
                  className="w-4 h-4 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                Small Business
              </h3>
              <p className="text-sm text-gray-600">
                For small businesses and commercial use
              </p>
            </div>
          </div>
        </button>
      </div>
    </div>
  )
}


'use client'

import { useState, useEffect } from 'react'
import { useQuoteStore, Address } from '@/lib/stores/quoteStore'

export default function AddressStep() {
  const { postcode, selectedAddress, setSelectedAddress, nextStep } = useQuoteStore()
  const [addresses, setAddresses] = useState<Address[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  // Mock addresses for now - will be replaced with API call
  useEffect(() => {
    if (postcode) {
      setLoading(true)
      // Simulate API call
      setTimeout(() => {
        setAddresses([
          {
            id: '1',
            line1: 'Flat A, 93 Ifield Road',
            city: 'London',
            postcode: postcode,
            country: 'UK',
          },
          {
            id: '2',
            line1: 'Flat B, 93 Ifield Road',
            city: 'London',
            postcode: postcode,
            country: 'UK',
          },
          {
            id: '3',
            line1: 'Flat C, 93 Ifield Road',
            city: 'London',
            postcode: postcode,
            country: 'UK',
          },
          {
            id: '4',
            line1: '93 Ifield Road',
            city: 'London',
            postcode: postcode,
            country: 'UK',
          },
        ])
        setLoading(false)
      }, 500)
    }
  }, [postcode])

  const handleSelect = (address: Address) => {
    setSelectedAddress(address)
  }

  const handleNext = () => {
    if (!selectedAddress) {
      setError('Please select an address')
      return
    }
    setError('')
    nextStep()
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Select your address
        </h2>
        <p className="text-gray-600">
          We found the following addresses for {postcode}
        </p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-kenton-primary"></div>
          <p className="mt-4 text-gray-600">Loading addresses...</p>
        </div>
      ) : (
        <>
          <div className="space-y-2">
            {addresses.map((address) => (
              <button
                key={address.id}
                onClick={() => handleSelect(address)}
                className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                  selectedAddress?.id === address.id
                    ? 'border-kenton-primary bg-kenton-primary-light'
                    : 'border-gray-200 hover:border-kenton-primary hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                      selectedAddress?.id === address.id
                        ? 'border-kenton-primary bg-kenton-primary'
                        : 'border-gray-300'
                    }`}
                  >
                    {selectedAddress?.id === address.id && (
                      <svg
                        className="w-3 h-3 text-white"
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
                    <p className="font-medium text-gray-900">{address.line1}</p>
                    {address.line2 && (
                      <p className="text-sm text-gray-600">{address.line2}</p>
                    )}
                    <p className="text-sm text-gray-600">
                      {address.city}, {address.postcode}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {error && (
            <p className="text-sm text-red-500 text-center">{error}</p>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={() => useQuoteStore.getState().previousStep()}
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleNext}
              disabled={!selectedAddress}
              className="px-6 py-3 bg-kenton-primary text-white rounded-xl font-medium hover:bg-kenton-secondary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}


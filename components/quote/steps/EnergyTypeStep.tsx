'use client'

import { useQuoteStore } from '@/lib/stores/quoteStore'

export default function EnergyTypeStep() {
  const { energyType, setEnergyType } = useQuoteStore()

  const handleSelect = (type: 'electricity' | 'gas' | 'dual-fuel') => {
    setEnergyType(type)
    // Auto-advance to next step after selection
    setTimeout(() => useQuoteStore.getState().nextStep(), 300)
  }

  const energyTypes = [
    {
      id: 'electricity' as const,
      label: 'Electricity',
      description: 'Electricity only',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      id: 'gas' as const,
      label: 'Gas',
      description: 'Gas only',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 2 16.09 2.09 18 4c1.9 1.9 2 4 2 6s-1 4-2.343 5.657z" />
        </svg>
      ),
    },
    {
      id: 'dual-fuel' as const,
      label: 'Dual Fuel',
      description: 'Electricity and Gas',
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      ),
    },
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          What type of energy do you need?
        </h2>
        <p className="text-gray-600">
          Select the energy type for your property
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {energyTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => handleSelect(type.id)}
            className={`p-6 rounded-xl border-2 transition-all text-center ${
              energyType === type.id
                ? 'border-kenton-primary bg-kenton-primary-light'
                : 'border-gray-200 hover:border-kenton-primary hover:bg-gray-50'
            }`}
          >
            <div className="flex flex-col items-center space-y-3">
              <div
                className={`${
                  energyType === type.id
                    ? 'text-kenton-primary'
                    : 'text-gray-400'
                }`}
              >
                {type.icon}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">
                  {type.label}
                </h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </div>
              {energyType === type.id && (
                <div className="w-6 h-6 rounded-full bg-kenton-primary flex items-center justify-center">
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
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  )
}


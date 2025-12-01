'use client'

import { useState } from 'react'
import { useQuoteStore } from '@/lib/stores/quoteStore'

export default function ConsumptionStep() {
  const { consumption, setConsumption, energyType, nextStep } = useQuoteStore()
  const [localConsumption, setLocalConsumption] = useState(consumption)
  const [error, setError] = useState('')

  const handleUnknownUsage = () => {
    setLocalConsumption({
      ...localConsumption,
      unknown: true,
    })
    setConsumption({
      ...localConsumption,
      unknown: true,
    })
    nextStep()
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (localConsumption.unknown) {
      nextStep()
      return
    }

    // Validate based on energy type
    if (energyType === 'electricity' || energyType === 'dual-fuel') {
      if (!localConsumption.electricity?.annual && !localConsumption.electricity?.monthly) {
        setError('Please enter electricity consumption or select "I don\'t know my usage"')
        return
      }
    }

    if (energyType === 'gas' || energyType === 'dual-fuel') {
      if (!localConsumption.gas?.annual && !localConsumption.gas?.monthly) {
        setError('Please enter gas consumption or select "I don\'t know my usage"')
        return
      }
    }

    setError('')
    setConsumption(localConsumption)
    nextStep()
  }

  const updateElectricity = (field: 'annual' | 'monthly', value: string) => {
    const numValue = value === '' ? null : parseFloat(value)
    setLocalConsumption({
      ...localConsumption,
      electricity: {
        ...localConsumption.electricity,
        [field]: numValue,
      },
    })
  }

  const updateGas = (field: 'annual' | 'monthly', value: string) => {
    const numValue = value === '' ? null : parseFloat(value)
    setLocalConsumption({
      ...localConsumption,
      gas: {
        ...localConsumption.gas,
        [field]: numValue,
      },
    })
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Enter your energy consumption
        </h2>
        <p className="text-gray-600">
          Help us provide you with the most accurate quote
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {(energyType === 'electricity' || energyType === 'dual-fuel') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Electricity Consumption
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="electricity-annual"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Annual (kWh)
                </label>
                <input
                  type="number"
                  id="electricity-annual"
                  value={localConsumption.electricity?.annual || ''}
                  onChange={(e) => updateElectricity('annual', e.target.value)}
                  placeholder="e.g., 3500"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="electricity-monthly"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Monthly (kWh)
                </label>
                <input
                  type="number"
                  id="electricity-monthly"
                  value={localConsumption.electricity?.monthly || ''}
                  onChange={(e) => updateElectricity('monthly', e.target.value)}
                  placeholder="e.g., 292"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {(energyType === 'gas' || energyType === 'dual-fuel') && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Gas Consumption
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="gas-annual"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Annual (kWh)
                </label>
                <input
                  type="number"
                  id="gas-annual"
                  value={localConsumption.gas?.annual || ''}
                  onChange={(e) => updateGas('annual', e.target.value)}
                  placeholder="e.g., 12000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                />
              </div>
              <div>
                <label
                  htmlFor="gas-monthly"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Monthly (kWh)
                </label>
                <input
                  type="number"
                  id="gas-monthly"
                  value={localConsumption.gas?.monthly || ''}
                  onChange={(e) => updateGas('monthly', e.target.value)}
                  placeholder="e.g., 1000"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent"
                />
              </div>
            </div>
          </div>
        )}

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        <div className="pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={handleUnknownUsage}
            className="w-full py-3 px-4 border-2 border-gray-300 text-gray-700 rounded-xl font-medium hover:bg-gray-50 transition-colors"
          >
            I don't know my usage
          </button>
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


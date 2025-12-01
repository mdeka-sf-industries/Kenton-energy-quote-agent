'use client'

interface FuelTypeSelectorProps {
  electricity: boolean
  gas: boolean
  ev: boolean
  solar: boolean
  onElectricityChange: (checked: boolean) => void
  onGasChange: (checked: boolean) => void
  onEvChange: (checked: boolean) => void
  onSolarChange: (checked: boolean) => void
}

export default function FuelTypeSelector({
  electricity,
  gas,
  ev,
  solar,
  onElectricityChange,
  onGasChange,
  onEvChange,
  onSolarChange,
}: FuelTypeSelectorProps) {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:gap-8">
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700 mb-3">I'm looking for</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={electricity}
              onChange={(e) => onElectricityChange(e.target.checked)}
              className="w-5 h-5 text-kenton-primary border-gray-300 rounded focus:ring-kenton-primary focus:ring-2"
            />
            <span className="text-gray-700">Electricity</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={gas}
              onChange={(e) => onGasChange(e.target.checked)}
              className="w-5 h-5 text-kenton-primary border-gray-300 rounded focus:ring-kenton-primary focus:ring-2"
            />
            <span className="text-gray-700">Gas</span>
          </label>
        </div>
      </div>
      <div className="flex-1">
        <p className="text-sm font-medium text-gray-700 mb-3">I have</p>
        <div className="flex flex-wrap gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={ev}
              onChange={(e) => onEvChange(e.target.checked)}
              className="w-5 h-5 text-kenton-primary border-gray-300 rounded focus:ring-kenton-primary focus:ring-2"
            />
            <span className="text-gray-700">EV</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={solar}
              onChange={(e) => onSolarChange(e.target.checked)}
              className="w-5 h-5 text-kenton-primary border-gray-300 rounded focus:ring-kenton-primary focus:ring-2"
            />
            <span className="text-gray-700">Solar</span>
          </label>
        </div>
      </div>
    </div>
  )
}


'use client'

interface EstimateTabsProps {
  selectedPeriod: 'monthly' | 'quarterly' | 'annually'
  onPeriodChange: (period: 'monthly' | 'quarterly' | 'annually') => void
}

export default function EstimateTabs({ selectedPeriod, onPeriodChange }: EstimateTabsProps) {
  const tabs = [
    { id: 'monthly' as const, label: 'Monthly' },
    { id: 'quarterly' as const, label: 'Quarterly' },
    { id: 'annually' as const, label: 'Annually' },
  ]

  return (
    <div className="mb-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
        View Estimates
      </h2>
      <div className="flex gap-2 border-b border-gray-200 justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onPeriodChange(tab.id)}
            className={`px-6 py-3 font-medium text-sm transition-colors relative ${
              selectedPeriod === tab.id
                ? 'text-kenton-primary'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
            {selectedPeriod === tab.id && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kenton-primary"></span>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}


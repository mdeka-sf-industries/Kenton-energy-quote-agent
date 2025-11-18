'use client'

export interface TariffPlan {
  id: string
  name: string
  icon: string
  description: string
  features: string[]
  estimatedMonthly: string
  estimatedYearly: string
  recommended?: boolean
  isSelected?: boolean
  onSelect: () => void
}

interface TariffCardProps {
  plan: TariffPlan
}

export default function TariffCard({ plan }: TariffCardProps) {
  const isSelected = plan.isSelected || false
  
  return (
    <div className={`bg-white rounded-3xl border-2 ${isSelected ? 'border-kenton-primary' : 'border-gray-200'} p-6 transition-all flex flex-col`}>
      {plan.recommended && (
        <div className="text-xs font-medium px-3 py-1 rounded-full mb-4 inline-flex items-center gap-1 w-fit" style={{ backgroundColor: '#ACF3E4', color: '#056764' }}>
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 20 20">
            <path d="M16.707 5.293l-8 8-4-4" />
          </svg>
          Recommended
        </div>
      )}
      
      <h3 className="font-semibold text-gray-900 text-xl mb-4">
        {plan.name}
      </h3>
      
      <div className="mb-4">
        <div className="text-3xl font-bold text-gray-900 mb-1">
          {plan.estimatedYearly}
        </div>
        <div className="text-sm text-gray-500 mb-2">yearly estimate</div>
        <div className="text-base font-semibold text-gray-900">
          {plan.estimatedMonthly} monthly estimate
        </div>
      </div>
      
      <ul className="text-sm text-gray-700 mb-6 space-y-2 flex-1">
        {plan.features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            {plan.icon === '⚡' || plan.icon === '☀️' ? (
              <svg className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-gray-900 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <div className="flex items-center gap-3">
        <button
          onClick={plan.onSelect}
          className={`flex-1 py-3 px-4 rounded-3xl font-medium text-sm transition-colors ${
            isSelected
              ? 'bg-kenton-primary hover:bg-kenton-secondary text-white'
              : 'bg-white border-2 border-kenton-primary text-kenton-primary hover:bg-kenton-primary-light'
          }`}
        >
          {isSelected ? 'Tariff Selected' : 'Select Tariff'}
        </button>
        
        <button className="text-sm text-gray-500 hover:text-gray-700 underline whitespace-nowrap">
          Tariff info
        </button>
      </div>
    </div>
  )
}


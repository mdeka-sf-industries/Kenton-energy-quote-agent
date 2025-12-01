'use client'

export interface Plan {
  id: string
  name: string
  description: string
  discount: string
  monthlyPrice: number
  quarterlyPrice: number
  yearlyPrice: number
  badge?: string
  badgeText?: string
  isEVPlan?: boolean
  isSolarPlan?: boolean
}

interface PlanCardProps {
  plan: Plan
  estimatePeriod: 'monthly' | 'quarterly' | 'annually'
  electricity: boolean
  gas: boolean
  ev: boolean
  solar: boolean
}

export default function PlanCard({ plan, estimatePeriod, electricity, gas, ev, solar }: PlanCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-AU', {
      style: 'currency',
      currency: 'AUD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  // Determine fuel selection state
  const isDualFuel = electricity && gas
  const isElectricityOnly = electricity && !gas
  const isGasOnly = !electricity && gas

  // Generate plan name based on fuel selection
  const getPlanName = () => {
    // Special plans (EV, Solar, Netflix) don't change names as they're product-specific
    if (plan.isEVPlan || plan.isSolarPlan || plan.badge === 'netflix') {
      return plan.name
    }

    // For standard plans, adjust name based on fuel selection
    if (isGasOnly) {
      // Handle different name patterns for Gas
      if (plan.name.includes('Saver')) {
        return plan.name.replace('Saver', 'Gas Saver')
      }
      if (plan.name.includes('Kenton')) {
        // Insert "Gas" after "Kenton"
        return plan.name.replace('Kenton', 'Kenton Gas')
      }
      // Fallback: append "Gas"
      return plan.name + ' Gas'
    } else if (isElectricityOnly) {
      // For electricity-only, add "Electricity" to the name
      if (plan.name.includes('Saver')) {
        return plan.name.replace('Saver', 'Electricity Saver')
      }
      if (plan.name.includes('Kenton')) {
        // Insert "Electricity" after "Kenton"
        return plan.name.replace('Kenton', 'Kenton Electricity')
      }
      // Fallback: append "Electricity"
      return plan.name + ' Electricity'
    }
    
    // Dual fuel - keep original name
    return plan.name
  }

  // Get description based on fuel selection
  const getDescription = () => {
    if (isGasOnly && !plan.isEVPlan && !plan.isSolarPlan && plan.badge !== 'netflix') {
      return plan.description.replace('Low variable rates', 'Low variable gas rates')
        .replace('electricity plan', 'gas plan')
    } else if (isElectricityOnly && !plan.isEVPlan && !plan.isSolarPlan && plan.badge !== 'netflix') {
      // For electricity-only, ensure description mentions electricity
      return plan.description.replace('gas plan', 'electricity plan')
        .replace('gas rates', 'electricity rates')
    }
    return plan.description
  }

  // Adjust pricing for single fuel (typically 60-70% of dual fuel)
  const getAdjustedPrice = (basePrice: number) => {
    if (isGasOnly || isElectricityOnly) {
      // Single fuel plans are typically cheaper (about 65% of dual fuel)
      return Math.round(basePrice * 0.65)
    }
    return basePrice
  }

  const getPrice = () => {
    const adjustedMonthly = getAdjustedPrice(plan.monthlyPrice)
    const adjustedQuarterly = getAdjustedPrice(plan.quarterlyPrice)
    const adjustedYearly = getAdjustedPrice(plan.yearlyPrice)
    
    switch (estimatePeriod) {
      case 'monthly':
        return formatPrice(adjustedMonthly)
      case 'quarterly':
        return formatPrice(adjustedQuarterly)
      case 'annually':
        return formatPrice(adjustedYearly)
      default:
        return formatPrice(adjustedYearly)
    }
  }

  const getPeriodLabel = () => {
    switch (estimatePeriod) {
      case 'monthly':
        return 'per month'
      case 'quarterly':
        return 'per quarter'
      case 'annually':
        return 'per year'
      default:
        return 'per year'
    }
  }

  // Get fuel type label for display
  const getFuelTypeLabel = () => {
    if (isGasOnly) return 'Gas'
    if (isElectricityOnly) return 'Electricity'
    if (isDualFuel) return 'Electricity & Gas'
    return 'Electricity'
  }

  // Get discount text based on fuel selection
  const getDiscountText = () => {
    if (isGasOnly && !plan.isEVPlan && !plan.isSolarPlan && plan.badge !== 'netflix') {
      // For gas-only, adjust the discount text
      return plan.discount.replace('Reference Price', 'Gas Reference Price')
    } else if (isElectricityOnly && !plan.isEVPlan && !plan.isSolarPlan && plan.badge !== 'netflix') {
      // For electricity-only, ensure discount text mentions electricity
      return plan.discount.replace('Gas Reference Price', 'Electricity Reference Price')
    }
    return plan.discount
  }

  // Determine if badge should be shown based on checkbox selections
  const shouldShowBadge = () => {
    if (!plan.badge) return false
    
    // Netflix badge always shows
    if (plan.badge === 'netflix') return true
    
    // EV badge shows when EV checkbox is selected
    if (plan.badge === 'ev' && plan.isEVPlan) return ev
    
    // Solar badge shows when Solar checkbox is selected
    if (plan.badge === 'solar' && plan.isSolarPlan) return solar
    
    // Best Value badge shows when dual fuel is selected (both electricity and gas)
    if (plan.badge === 'best-value') return isDualFuel
    
    return false
  }

  return (
    <div className="bg-white rounded-xl border-2 border-gray-200 hover:border-kenton-primary transition-all flex flex-col h-full overflow-hidden">
      {shouldShowBadge() && (
        <div 
          className={`px-4 py-2 text-sm font-medium ${
            plan.badge === 'ev' 
              ? 'bg-green-600 text-white' 
              : plan.badge === 'solar'
              ? 'bg-yellow-400 text-gray-900 font-semibold'
              : plan.badge === 'best-value'
              ? 'bg-blue-600 text-white'
              : 'bg-blue-600 text-white'
          }`}
        >
          {plan.badgeText || plan.badge}
        </div>
      )}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold text-gray-900 mb-2 min-h-[2rem]">
          {getPlanName()}
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 min-h-[1.5rem]">
          {plan.description ? getDescription() : '\u00A0'}
        </p>
        
        <div className="mt-auto space-y-3">
          <div className="min-h-[3rem]">
            <p className="text-sm text-gray-600 mb-1">{getFuelTypeLabel()}</p>
            <p className="text-base font-semibold text-gray-900 leading-tight">
              {getDiscountText()}
            </p>
          </div>
          
          <div className="pt-4 border-t border-gray-200">
            <p className="text-2xl font-bold text-gray-900 mb-1">
              {getPrice()}
            </p>
            <p className="text-sm text-gray-500">{getPeriodLabel()}</p>
          </div>
          
          <button className="w-full mt-4 bg-kenton-primary hover:bg-kenton-secondary text-white py-3 px-6 rounded-3xl font-medium transition-colors">
            View Plan Details
          </button>
        </div>
      </div>
    </div>
  )
}


'use client'

import PlanCard, { Plan } from './PlanCard'

interface PlanResultsProps {
  electricity: boolean
  gas: boolean
  ev: boolean
  solar: boolean
  estimatePeriod: 'monthly' | 'quarterly' | 'annually'
}

// Mock JSON data for plans
// Prices calculated: Monthly = Yearly/12, Quarterly = Yearly/4
const mockPlans: Plan[] = [
  {
    id: '1',
    name: 'Kenton Saver',
    description: 'Low variable rates',
    discount: '16% less than the Reference Price',
    monthlyPrice: 129.25, // $1,551 / 12
    quarterlyPrice: 387.75, // $1,551 / 4
    yearlyPrice: 1551,
    badge: 'best-value',
    badgeText: 'Best Value - Lowest rates',
  },
  {
    id: '2',
    name: 'Kenton Netflix Bundle',
    description: 'Great value electricity plan including Netflix',
    discount: '14% less than the Reference Price',
    monthlyPrice: 131.08, // $1,573 / 12
    quarterlyPrice: 393.25, // $1,573 / 4
    yearlyPrice: 1573,
    badge: 'netflix',
    badgeText: 'Includes $120/yr RRP of Netflix value',
  },
  {
    id: '3',
    name: 'Kenton Solar Boost',
    description: 'Up to 8c/kWh solar FiT',
    discount: '8% less than the Reference Price',
    monthlyPrice: 142.33, // $1,708 / 12
    quarterlyPrice: 427, // $1,708 / 4
    yearlyPrice: 1708,
    isSolarPlan: true,
  },
  {
    id: '4',
    name: 'Kenton EV Charge',
    description: 'Off-peak rates for EV charging (11 PM - 6 AM)',
    discount: '12% less than the Reference Price',
    monthlyPrice: 130.42, // $1,565 / 12
    quarterlyPrice: 391.25, // $1,565 / 4
    yearlyPrice: 1565,
    isEVPlan: true,
  },
]

export default function PlanResults({
  electricity,
  gas,
  ev,
  solar,
  estimatePeriod,
}: PlanResultsProps) {
  // Show plans when at least one fuel type is selected
  const shouldShowPlans = electricity || gas

  if (!shouldShowPlans) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Please select at least one fuel type to view plans.</p>
      </div>
    )
  }

  // Show all plans (as per AGL example where all plans are visible)
  const filteredPlans = [...mockPlans]
  
  // Prioritize plans based on selections
  filteredPlans.sort((a, b) => {
    // If EV is selected, prioritize EV plans first
    if (ev) {
      const aIsEV = a.isEVPlan || false
      const bIsEV = b.isEVPlan || false
      if (aIsEV && !bIsEV) return -1
      if (!aIsEV && bIsEV) return 1
    }
    
    // If Solar is selected (and EV not selected or already sorted), prioritize solar plans
    if (solar && !ev) {
      const aIsSolar = a.isSolarPlan || false
      const bIsSolar = b.isSolarPlan || false
      if (aIsSolar && !bIsSolar) return -1
      if (!aIsSolar && bIsSolar) return 1
    }
    
    // If both EV and Solar are selected, prioritize EV first, then Solar
    if (ev && solar) {
      const aIsEV = a.isEVPlan || false
      const bIsEV = b.isEVPlan || false
      const aIsSolar = a.isSolarPlan || false
      const bIsSolar = b.isSolarPlan || false
      
      // EV plans first
      if (aIsEV && !bIsEV) return -1
      if (!aIsEV && bIsEV) return 1
      
      // Then solar plans
      if (aIsSolar && !bIsSolar) return -1
      if (!aIsSolar && bIsSolar) return 1
    }
    
    return 0
  })

  if (filteredPlans.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">No plans available for your selection.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
      {filteredPlans.map((plan) => (
        <PlanCard 
          key={plan.id} 
          plan={plan} 
          estimatePeriod={estimatePeriod}
          electricity={electricity}
          gas={gas}
          ev={ev}
          solar={solar}
        />
      ))}
    </div>
  )
}


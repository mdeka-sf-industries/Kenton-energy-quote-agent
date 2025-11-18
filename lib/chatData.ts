import { TariffPlan } from '@/components/TariffCard'

export interface ChatMessage {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
  addresses?: Array<{
    id: string
    address: string
    city: string
    state: string
    postalCode: string
  }>
  isAddressMessage?: boolean
  address?: {
    id: string
    address: string
    city: string
    state: string
    postalCode: string
  }
  isDisclaimer?: boolean
  isEVPromotion?: boolean
}

export const FAQ_ANSWERS: Record<string, string> = {
  'How are plans priced?':
    'Our plans are priced based on your location, energy usage patterns, and the type of plan you choose. Fixed-rate plans offer stable pricing for 12 months, while variable plans adjust with market rates. Smart meter plans use time-of-day pricing to help you save during off-peak hours.',
  'Can I get a Smart Meter?':
    'Yes! If you select our Kenton Smart Eco+ plan, we can arrange for a smart meter installation at your property. Smart meters help you track your energy usage in real-time and can save you money with dynamic pricing based on time of day.',
  "What's a fixed rate plan?":
    'A fixed-rate plan locks in your energy rate for a set period (typically 12 months). This means your rate stays the same regardless of market fluctuations, giving you predictable monthly bills. Perfect if you prefer stability and want to avoid surprises.',
}

export const TARIFF_PLANS: Omit<TariffPlan, 'onSelect' | 'isSelected'>[] = [
  {
    id: 'standard-domestic',
    name: 'Standard Domestic Tariff',
    icon: '✓',
    description: '100% renewable, fixed 12-month rate, stable pricing',
    features: [
      '$12 Fixed Charges',
      'No standing charges',
      'Energy Charges below 0.15/kWh',
    ],
    estimatedMonthly: '$27.80',
    estimatedYearly: '$334.66',
    recommended: true,
  },
  {
    id: 'day-night',
    name: 'Day Night Tariff',
    icon: '⚡',
    description: 'Variable pricing, adjusts monthly with market',
    features: [
      'No exit fees',
      '100% renewable energy',
      'Award winning service',
    ],
    estimatedMonthly: '$37.50',
    estimatedYearly: '$451.25',
  },
  {
    id: 'green-energy',
    name: 'Green Energy Tariff',
    icon: '⚡',
    description: 'Smart meter enabled, dynamic pricing by time of day',
    features: [
      'No exit fees',
      '100% renewable energy',
      'Award winning service',
    ],
    estimatedMonthly: '$40.80',
    estimatedYearly: '$488.80',
  },
]


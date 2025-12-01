import { create } from 'zustand'

export type CustomerType = 'residential' | 'small-business' | null
export type EnergyType = 'electricity' | 'gas' | 'dual-fuel' | null

export interface Address {
  id: string
  line1: string
  line2?: string
  city: string
  postcode: string
  country: string
}

export interface ConsumptionData {
  electricity?: {
    annual: number | null
    monthly: number | null
  }
  gas?: {
    annual: number | null
    monthly: number | null
  }
  unknown: boolean
}

export interface QuoteState {
  // Step 1: Customer Type
  customerType: CustomerType
  
  // Step 2: Postcode
  postcode: string
  
  // Step 3: Address
  selectedAddress: Address | null
  
  // Step 4: Energy Type
  energyType: EnergyType
  
  // Step 5: Consumption
  consumption: ConsumptionData
  
  // Step 6: Tariff Selection (will be populated later)
  selectedTariff: any | null
  
  // Step 7: Enrollment Data (will be populated later)
  enrollmentData: any | null
  
  // Navigation
  currentStep: number
  totalSteps: number
  
  // Actions
  setCustomerType: (type: CustomerType) => void
  setPostcode: (postcode: string) => void
  setSelectedAddress: (address: Address | null) => void
  setEnergyType: (type: EnergyType) => void
  setConsumption: (consumption: ConsumptionData) => void
  setSelectedTariff: (tariff: any) => void
  setEnrollmentData: (data: any) => void
  setCurrentStep: (step: number) => void
  nextStep: () => void
  previousStep: () => void
  reset: () => void
}

const initialState = {
  customerType: null,
  postcode: '',
  selectedAddress: null,
  energyType: null,
  consumption: {
    electricity: { annual: null, monthly: null },
    gas: { annual: null, monthly: null },
    unknown: false,
  },
  selectedTariff: null,
  enrollmentData: null,
  currentStep: 1,
  totalSteps: 8,
}

export const useQuoteStore = create<QuoteState>((set) => ({
  ...initialState,
  
  setCustomerType: (type) => set({ customerType: type }),
  setPostcode: (postcode) => set({ postcode }),
  setSelectedAddress: (address) => set({ selectedAddress: address }),
  setEnergyType: (type) => set({ energyType: type }),
  setConsumption: (consumption) => set({ consumption }),
  setSelectedTariff: (tariff) => set({ selectedTariff: tariff }),
  setEnrollmentData: (data) => set({ enrollmentData: data }),
  setCurrentStep: (step) => set({ currentStep: step }),
  nextStep: () => set((state) => ({ 
    currentStep: Math.min(state.currentStep + 1, state.totalSteps) 
  })),
  previousStep: () => set((state) => ({ 
    currentStep: Math.max(state.currentStep - 1, 1) 
  })),
  reset: () => set(initialState),
}))


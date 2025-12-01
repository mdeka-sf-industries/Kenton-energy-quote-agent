'use client'

import QuoteFlowLayout from '@/components/quote/QuoteFlowLayout'
import CustomerTypeStep from '@/components/quote/steps/CustomerTypeStep'
import PostcodeStep from '@/components/quote/steps/PostcodeStep'
import AddressStep from '@/components/quote/steps/AddressStep'
import EnergyTypeStep from '@/components/quote/steps/EnergyTypeStep'
import ConsumptionStep from '@/components/quote/steps/ConsumptionStep'
import TariffsStep from '@/components/quote/steps/TariffsStep'
import EnrollmentStep from '@/components/quote/steps/EnrollmentStep'
import ConfirmationStep from '@/components/quote/steps/ConfirmationStep'
import { useQuoteStore } from '@/lib/stores/quoteStore'

export default function QuotePage() {
  const { currentStep } = useQuoteStore()

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <CustomerTypeStep />
      case 2:
        return <PostcodeStep />
      case 3:
        return <AddressStep />
      case 4:
        return <EnergyTypeStep />
      case 5:
        return <ConsumptionStep />
      case 6:
        return <TariffsStep />
      case 7:
        return <EnrollmentStep />
      case 8:
        return <ConfirmationStep />
      default:
        return <CustomerTypeStep />
    }
  }

  return <QuoteFlowLayout>{renderStep()}</QuoteFlowLayout>
}


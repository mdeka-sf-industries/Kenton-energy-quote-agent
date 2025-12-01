'use client'

import { useState } from 'react'
import Image from 'next/image'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import AddressInput from './AddressInput'
import FuelTypeSelector from './FuelTypeSelector'
import EstimateTabs from './EstimateTabs'
import PlanResults from './PlanResults'

export default function ComparePage() {
  const [address, setAddress] = useState('')
  const [electricity, setElectricity] = useState(true)
  const [gas, setGas] = useState(true)
  const [ev, setEv] = useState(false)
  const [solar, setSolar] = useState(false)
  const [estimatePeriod, setEstimatePeriod] = useState<'monthly' | 'quarterly' | 'annually'>('annually')

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-white via-kenton-primary-light to-blue-50 py-16 relative overflow-hidden">
          {/* Background Illustration - Right Corner */}
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-2xl opacity-20 lg:opacity-30 pointer-events-none">
            <div className="relative w-full h-full">
              <Image
                src="/energy-ecosystem.png"
                alt="Sustainable energy ecosystem"
                fill
                className="object-contain object-right"
                priority
              />
            </div>
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                  Compare electricity and gas plans
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Find the perfect energy plan for your home. Enter your address to see personalized estimates.
                </p>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] p-8 border border-kenton-primary-light">
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-4">
                        Enter your street address to see estimates
                      </h2>
                      <AddressInput value={address} onChange={setAddress} />
                    </div>
                    
                    <FuelTypeSelector
                      electricity={electricity}
                      gas={gas}
                      ev={ev}
                      solar={solar}
                      onElectricityChange={setElectricity}
                      onGasChange={setGas}
                      onEvChange={setEv}
                      onSolarChange={setSolar}
                    />

                    {/* Info Message - Only show when address is entered */}
                    {address && (
                      <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-xl">
                        <svg
                          className="w-5 h-5 text-kenton-primary mt-0.5 flex-shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <p className="text-sm text-gray-700">
                          There's no digital meter at this address. We're showing plans available for your current meter type.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Plans Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              {/* Estimate Tabs */}
              <EstimateTabs
                selectedPeriod={estimatePeriod}
                onPeriodChange={setEstimatePeriod}
              />

              {/* Plan Results */}
              <PlanResults
                electricity={electricity}
                gas={gas}
                ev={ev}
                solar={solar}
                estimatePeriod={estimatePeriod}
              />
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}


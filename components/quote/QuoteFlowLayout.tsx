'use client'

import { ReactNode } from 'react'
import Stepper from './Stepper'

interface QuoteFlowLayoutProps {
  children: ReactNode
}

export default function QuoteFlowLayout({ children }: QuoteFlowLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Stepper />
          <div className="mt-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}


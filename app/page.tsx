'use client'

import Image from 'next/image'
import ChatButton from '@/components/ChatButton'
import ChatWidget from '@/components/ChatWidget'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Testimonials from '@/components/Testimonials'
import FAQs from '@/components/FAQs'
import { useState } from 'react'

export default function Home() {
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [postalCode, setPostalCode] = useState('')
  const [chatViewMode, setChatViewMode] = useState<'modal' | 'panel'>('modal')

  const handleGetQuote = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault()
      e.stopPropagation()
    }
    // Open chat in panel mode with the postal code
    setChatViewMode('panel')
    setIsChatOpen(true)
  }

  const handleChatButtonClick = () => {
    setChatViewMode('modal')
    setIsChatOpen(!isChatOpen)
  }

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
                  Get the best energy plan to suit your needs.
                </h1>
                <p className="text-lg text-gray-600 mb-8">
                  Enter your pin code or click on the chat to get started with a
                  personalized quote.
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] p-8 border border-kenton-primary-light">
                  <div className="space-y-4">
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                      </div>
                      <input
                        type="text"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value.toUpperCase())}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault()
                            handleGetQuote()
                          }
                        }}
                        placeholder="Your Postal Code"
                        className="w-full pl-12 pr-4 py-3 border border-kenton-primary-light rounded-3xl focus:outline-none focus:ring-2 focus:ring-kenton-primary focus:border-transparent postcode-input"
                        style={{ textTransform: 'uppercase' }}
                      />
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        handleGetQuote(e)
                      }}
                      className="w-full bg-kenton-primary hover:bg-kenton-secondary text-white py-3 px-6 rounded-3xl font-medium transition-colors"
                    >
                      Get Personalised Quote
                    </button>
                    <p className="text-center text-sm text-gray-500">
                      In less than 30 seconds
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enroll in 3 Easy Steps */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
                Enroll in 3 Easy Steps
              </h2>
              <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="flex-1 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-white overflow-hidden">
                    <Image
                      src="/step-1-share-details.png"
                      alt="Share your details"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Share your details to get quote.
                  </p>
                </div>
                <div className="hidden md:block w-16 h-0.5 bg-gray-300 border-dashed border-t-2"></div>
                <div className="flex-1 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-white overflow-hidden">
                    <Image
                      src="/step-2-select-plan.png"
                      alt="Select tariff plan"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600">
                    Select tariff plan and add-ons.
                  </p>
                </div>
                <div className="hidden md:block w-16 h-0.5 bg-gray-300 border-dashed border-t-2"></div>
                <div className="flex-1 text-center">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center bg-white overflow-hidden">
                    <Image
                      src="/step-3-sign-up.png"
                      alt="Sign up and enroll"
                      width={80}
                      height={80}
                      className="object-contain"
                    />
                  </div>
                  <p className="text-sm text-gray-600">Sign up and enrol.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content with Sidebar */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2 space-y-8">
                {/* Featured Services */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Featured services
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] p-6 border border-kenton-primary-light">
                      <div className="h-48 rounded-3xl mb-4 overflow-hidden relative">
                        <Image
                          src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&auto=format"
                          alt="Energy calculator and savings"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-700 mb-4">
                        Thinking about switching your energy tariff? We are here
                        to help you! All we need is your locality and bit of
                        information about you.
                      </p>
                      <button className="w-full border-2 border-kenton-primary text-kenton-primary hover:bg-kenton-primary hover:text-white py-2 px-4 rounded-3xl font-medium transition-colors">
                        Check Serviceability
                      </button>
                    </div>
                    <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] p-6 border border-kenton-primary-light">
                      <div className="h-48 rounded-3xl mb-4 overflow-hidden relative">
                        <Image
                          src="https://images.unsplash.com/photo-1466611653911-95081537e5b7?w=600&h=400&fit=crop&auto=format"
                          alt="Renewable energy and sustainability"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <p className="text-gray-700 mb-4">
                        Choose energy that is sustainably generated from renewable
                        resources. No gimmicks. No carbon offsetting.
                      </p>
                      <button className="w-full border-2 border-kenton-primary text-kenton-primary hover:bg-kenton-primary hover:text-white py-2 px-4 rounded-3xl font-medium transition-colors">
                        Check Serviceability
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <Testimonials />
                <FAQs />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <ChatButton onClick={handleChatButtonClick} />
      {isChatOpen && (
        <ChatWidget
          key={`${chatViewMode}-${postalCode}`}
          onClose={() => setIsChatOpen(false)}
          initialPostcode={postalCode.trim() || undefined}
          initialViewMode={chatViewMode}
        />
      )}
    </div>
  )
}

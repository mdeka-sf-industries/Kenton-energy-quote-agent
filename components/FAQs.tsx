'use client'

import { useState } from 'react'

interface FAQ {
  question: string
  answer: string
}

const faqs: FAQ[] = [
  {
    question: 'Is it easy to switch to another energy plan?',
    answer: '',
  },
  {
    question: 'Do you have customer support to guide us?',
    answer: '',
  },
  {
    question: 'Is Green Energy 100% sustainable source?',
    answer:
      'Yes, our Green Energy plans are sourced from 100% renewable resources including solar, wind, and hydroelectric power. We are committed to providing truly sustainable energy without any carbon offsetting gimmicks.',
  },
  {
    question: 'How to find add-on products for Green Energy?',
    answer: '',
  },
]

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState<number | null>(2) // Third FAQ open by default

  return (
    <div className="bg-white rounded-3xl shadow-[0_2px_8px_rgba(1,118,211,0.15)] p-6 border border-kenton-primary-light mt-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">FAQs</h2>
      <div className="space-y-2">
        {faqs.map((faq, idx) => (
          <div key={idx} className="border-b border-gray-200 last:border-0">
            <button
              onClick={() =>
                setOpenIndex(openIndex === idx ? null : idx)
              }
              className="w-full flex items-center justify-between py-3 text-left text-kenton-primary hover:text-kenton-secondary transition-colors"
            >
              <span className="text-sm font-medium">{faq.question}</span>
              <svg
                className={`w-5 h-5 transition-transform ${
                  openIndex === idx ? 'rotate-90' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
            {openIndex === idx && faq.answer && (
              <div className="pb-4 text-sm text-gray-600">
                <p className="mb-2">{faq.answer}</p>
                {idx === 2 && (
                  <div className="mt-4 space-y-2 pl-4 border-l-2 border-kenton-primary-light">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        How to update your Address?
                      </h4>
                      <p className="text-gray-600">
                        You can update your address by logging into your account
                        and navigating to the Profile section. Alternatively,
                        you can contact our customer support team for assistance.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-1">
                        How to apply for solar panel?
                      </h4>
                      <p className="text-gray-600">
                        To apply for solar panel installation, visit our website
                        and fill out the solar panel application form. Our team
                        will assess your property and provide a customized quote
                        within 48 hours.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

